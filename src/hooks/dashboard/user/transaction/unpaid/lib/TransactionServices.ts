import { doc, updateDoc, Timestamp } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Transaction } from "@/hooks/dashboard/user/transaction/unpaid/lib";

interface PaymentDetails {
  status_code: string;
  status_message: string;
  transaction_status: string;
  transaction_id: string;
  transaction_time: string;
  payment_type: string;
  gross_amount: string;
  fraud_status?: string;
  va_numbers?: Array<{ bank: string; va_number: string }>;
}

export const updateTransactionStatus = async (
  transactionId: string,
  result: MidtransResult,
  isCompleted: boolean = false
) => {
  try {
    let status = "pending";
    let statusMessage = "Your Transaction is being processed";

    if (isCompleted && result.transaction_status === "settlement") {
      status = "success";
      statusMessage = "Success, transaction is found";
    } else if (
      result.transaction_status === "deny" ||
      result.transaction_status === "cancel" ||
      result.transaction_status === "expire"
    ) {
      status = "failed";
      statusMessage = result.status_message;
    }

    const transactionRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string,
      transactionId
    );

    const paymentDetails: PaymentDetails = {
      status_code: result.status_code,
      status_message: statusMessage,
      transaction_status: result.transaction_status,
      transaction_id: result.transaction_id,
      transaction_time: result.transaction_time,
      payment_type: result.payment_type,
      gross_amount: result.gross_amount,
      fraud_status: result.fraud_status,
    };

    // Only add va_numbers if it exists in the result
    if (result.va_numbers) {
      paymentDetails.va_numbers = result.va_numbers;
    }

    await updateDoc(transactionRef, {
      status: status,
      updatedAt: Timestamp.now(),
      paymentDetails: paymentDetails,
    });
  } catch (error) {
    throw error;
  }
};

export const cancelTransaction = async (transactionId: string) => {
  try {
    const collectionPath =
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS || "transactions";
    const transactionRef = doc(db, collectionPath, transactionId);

    await updateDoc(transactionRef, {
      status: "cancelled",
      updatedAt: Timestamp.now(),
      "paymentDetails.transaction_status": "cancelled",
      "paymentDetails.status_message": "Transaction cancelled by user",
      statusDelivery: "cancelled",
    });
  } catch (error) {
    throw error;
  }
};

export const handleContinuePayment = (
  transaction: Transaction,
  onTransactionUpdate: (
    transactionId: string,
    result: MidtransResult,
    isCompleted: boolean
  ) => Promise<void>
) => {
  if (!transaction.paymentToken) {
    alert("Payment token not found");
    return;
  }

  const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY as string;

  if (!clientKey) {
    return;
  }

  const script = document.createElement("script");
  script.src = snapScript;
  script.setAttribute("data-client-key", clientKey);
  script.onload = () => {
    window.snap.pay(transaction.paymentToken as string, {
      onSuccess: async (result) => {
        await onTransactionUpdate(transaction.id, result, true);
        window.location.href = `/payment/status/${transaction.id}`;
      },
      onPending: (result) => {
        void onTransactionUpdate(transaction.id, result, false);
      },
      onError: (result) => {
        void onTransactionUpdate(transaction.id, result, false);
      },
      onClose: () => {},
    });
  };
  document.body.appendChild(script);
};
