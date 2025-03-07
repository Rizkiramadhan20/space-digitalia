import { NextResponse } from "next/server";

import { db } from "@/utils/firebase";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const notification = await request.json();
    const orderId = notification.order_id;

    // Find the transaction in Firestore
    const transactionsRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!
    );
    const q = query(transactionsRef, where("orderId", "==", orderId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Get status message based on transaction_status
    const getStatusMessage = (status: string, fraudStatus: string | null) => {
      if (fraudStatus === "deny")
        return "Payment denied due to fraud detection";

      switch (status) {
        case "success":
          return "Payment completed successfully";
        case "pending":
          return "Waiting for payment";
        case "deny":
          return "Payment denied";
        case "cancel":
          return "Payment cancelled";
        case "expire":
          return "Payment expired";
        case "failure":
          return "Payment failed";
        default:
          return "Unknown status";
      }
    };

    // Update the transaction status
    const transactionDoc = querySnapshot.docs[0];

    const statusMessage = getStatusMessage(
      notification.transaction_status,
      notification.fraud_status
    );

    const updateData = {
      status:
        notification.transaction_status === "success"
          ? "success"
          : notification.transaction_status,
      updatedAt: Timestamp.now(),
      ...(transactionDoc.data().deliveryMethod === "delivery" && {
        statusDelivery: "pending",
      }),
      transactionStatus: {
        status:
          notification.transaction_status === "success"
            ? "success"
            : notification.transaction_status,
        message: statusMessage,
        time: Timestamp.now(),
        paymentType: notification.payment_type,
        transactionId: notification.transaction_id,
        fraudStatus: notification.fraud_status,
        grossAmount: notification.gross_amount,
        paymentMethod: notification.payment_type,
        imageUrl: transactionDoc.data().imageUrl,
        bank: notification.bank || null,
        vaNumber: notification.va_numbers?.[0]?.va_number || null,
        store: notification.store || null,
        maskedCard: notification.masked_card || null,
        paymentCode: notification.payment_code || null,
        billKey: notification.bill_key || null,
        billerCode: notification.biller_code || null,
        shippingStatus:
          transactionDoc.data().deliveryMethod === "delivery"
            ? "pending"
            : null,
      },
      isProcessing: false,
    };

    await updateDoc(transactionDoc.ref, updateData);

    return NextResponse.json({
      success: true,
      message: statusMessage,
      transactionId: transactionDoc.id,
      status:
        notification.transaction_status === "success"
          ? "success"
          : notification.transaction_status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process notification",
      },
      { status: 500 }
    );
  }
}
