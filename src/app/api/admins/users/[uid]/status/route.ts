import { NextResponse } from "next/server";

import admin, { adminDb } from "@/utils/firebase/admin";

import { Role } from "@/utils/context/interface/Auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Get user's role from Firestore
    const userDoc = await adminDb
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(decodedToken.uid)
      .get();

    const userData = userDoc.data();

    // Check if user is a super admin
    if (!userData || userData.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin access required" },
        { status: 403 }
      );
    }

    // Get request body
    const { isActive } = await request.json();
    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body: isActive must be a boolean" },
        { status: 400 }
      );
    }

    const resolvedParams = await context.params;

    // Update user in Firebase Auth
    await admin.auth().updateUser(resolvedParams.uid, {
      disabled: !isActive,
    });

    // Update user in Firestore
    const userRef = adminDb
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(resolvedParams.uid);
    await userRef.update({
      isActive: isActive,
    });

    return NextResponse.json(
      { message: "User status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
