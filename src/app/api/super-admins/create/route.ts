import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

import { Role } from "@/utils/context/interface/Auth";

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json();

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Add user data to Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(userRecord.uid)
      .set({
        uid: userRecord.uid,
        email,
        displayName,
        role: Role.SUPER_ADMIN,
        createdAt: new Date(),
        photoURL: "",
      });

    return NextResponse.json({ message: "Super Admin created successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to create super admin" },
      { status: 500 }
    );
  }
}
