import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

export async function DELETE(request: Request) {
  try {
    const { uid } = await request.json();

    // Delete from Firebase Auth
    await auth.deleteUser(uid);

    // Delete from Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .delete();

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}
