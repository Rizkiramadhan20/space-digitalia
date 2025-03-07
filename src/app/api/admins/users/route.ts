import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/utils/firebase/firebase-admin";
import { Role, UserAccount } from "@/utils/context/interface/Auth";

// Helper function to format phone number to E.164 standard
function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters except '+'
  const cleaned = phoneNumber.replace(/[^\d+]/g, "");

  // If number already starts with '+', return it as is
  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  // If number starts with '00' (international format), replace with '+'
  if (cleaned.startsWith("00")) {
    return `+${cleaned.slice(2)}`;
  }

  // For Indonesian numbers
  if (cleaned.startsWith("0")) {
    return `+62${cleaned.slice(1)}`; // Convert 08xx to +628xx
  }

  // If no country code is provided, assume it's an Indonesian number
  if (cleaned.length <= 11) {
    return `+62${cleaned}`;
  }

  // If it's already a full number without '+', add it
  return `+${cleaned}`;
}

// Helper function to validate phone number
function isValidPhoneNumber(phoneNumber: string): boolean {
  // E.164 format validation:
  // - Must start with '+'
  // - Followed by 1-3 digits (country code)
  // - Followed by 6-12 digits (local number)
  // Total length should be between 8-15 characters
  const e164Regex = /^\+[1-9]\d{1,2}\d{6,12}$/;
  return e164Regex.test(phoneNumber);
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    const adminDoc = await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(decodedToken.uid)
      .get();

    if (!adminDoc.exists || adminDoc.data()?.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const { email, password, displayName, phoneNumber } = await request.json();
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    if (!isValidPhoneNumber(formattedPhoneNumber)) {
      return NextResponse.json(
        {
          error:
            "Invalid phone number format. Please use a valid international phone number (e.g., +1234567890, +628123456789)",
        },
        { status: 400 }
      );
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      phoneNumber: formattedPhoneNumber,
    });

    const now = new Date();

    const userData: UserAccount = {
      uid: userRecord.uid,
      email,
      displayName,
      phoneNumber: formattedPhoneNumber,
      role: Role.USER,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      photoURL: "",
    };

    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(userRecord.uid)
      .set(userData);

    return NextResponse.json({
      message: "User created successfully",
      user: userData,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create user";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
