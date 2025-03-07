import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

export async function PUT(request: Request) {
  try {
    const { uid, displayName, email, phoneNumber } = await request.json();

    // Update in Firebase Auth
    await auth.updateUser(uid, {
      displayName,
      email,
      phoneNumber,
    });

    // Update in Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .update({
        displayName,
        email,
        phoneNumber,
        updatedAt: new Date(),
      });

    return NextResponse.json({ message: "Super Admin updated successfully" });
  } catch (error) {
    console.error("Error updating super admin:", error);
    return NextResponse.json(
      { error: "Failed to update super admin" },
      { status: 500 }
    );
  }
}
