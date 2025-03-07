import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

export async function PUT(request: Request) {
  try {
    const { uid, displayName, email } = await request.json();

    // Update in Firebase Auth
    await auth.updateUser(uid, {
      displayName,
      email,
    });

    // Update in Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .update({
        displayName,
        email,
        updatedAt: new Date(),
      });

    return NextResponse.json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { error: "Failed to update admin" },
      { status: 500 }
    );
  }
}
