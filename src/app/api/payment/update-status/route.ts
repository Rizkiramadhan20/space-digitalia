import { NextResponse } from "next/server";

import { db } from "@/utils/firebase/firebase-admin";

import { Timestamp } from "firebase-admin/firestore";

import {
  FirestoreUpdateData,
  ProjectData,
  TransactionData,
} from "@/hooks/pages/api/payment/update/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.orderId || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get transaction reference
    const transactionRef = db.collection("transactions").doc(body.orderId);
    const transactionSnap = await transactionRef.get();

    if (!transactionSnap.exists) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    const transactionData = transactionSnap.data() as TransactionData;

    // Update transaction status
    await transactionRef.update({
      status: body.status === "success" ? "success" : body.status,
      transactionId: body.transactionId || null,
      updatedAt: Timestamp.now(),
      ...(transactionData.deliveryMethod === "delivery" && {
        statusDelivery: "pending",
      }),
      ...(body.paymentDetails && {
        paymentDetails: {
          ...body.paymentDetails,
          transaction_status:
            body.paymentDetails.transaction_status === "success"
              ? "success"
              : body.paymentDetails.transaction_status,
        },
      }),
    });

    // If payment is successful, update project statistics
    if (body.status === "success" && transactionData) {
      const projectRef = db
        .collection("projects")
        .doc(transactionData.projectId);
      const projectSnap = await projectRef.get();

      if (projectSnap.exists) {
        const projectData = projectSnap.data() as ProjectData;
        const updateData: FirestoreUpdateData = {};

        // Update download or delivery count based on delivery method
        if (transactionData.deliveryMethod === "download") {
          updateData.downloads = (projectData?.downloads || 0) + 1;
          // If it's download type, also update downloadUrl
          if (projectData?.downloadUrl) {
            await transactionRef.update({
              downloadUrl: projectData.downloadUrl,
            });
          }
        } else if (transactionData.deliveryMethod === "delivery") {
          updateData.delivery = (projectData?.delivery || 0) + 1;
        }

        // Only update if we have changes
        if (Object.keys(updateData).length > 0) {
          // Update project statistics
          await projectRef.update(updateData);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      {
        error: "Failed to update payment status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
