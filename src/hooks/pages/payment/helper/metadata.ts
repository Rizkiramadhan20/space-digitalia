import { Metadata } from "next";

import { TransactionData } from "@/hooks/pages/payment/status/lib/schema";

import { cookies } from "next/headers";

import { auth, db } from "@/utils/firebase/firebase-admin";

import { Role } from "@/utils/context/interface/Auth";

async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    return await auth.verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

async function getTransaction(
  transactionId: string,
  userId?: string
): Promise<TransactionData | null> {
  try {
    const docRef = db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!)
      .doc(transactionId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) return null;

    const transaction = docSnap.data() as TransactionData;

    // If there's a userId, verify ownership unless user is admin
    if (userId) {
      const userDoc = await db
        .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!)
        .doc(userId)
        .get();
      const userData = userDoc.data();
      const userRole = userData?.role;

      if (
        userRole !== Role.ADMIN &&
        userRole !== Role.SUPER_ADMIN &&
        transaction.userId !== userId
      ) {
        console.error("Unauthorized access attempt");
        return null;
      }
    }

    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { transactionId: string };
}): Promise<Metadata> {
  const user = await getCurrentUser();
  const transaction = await getTransaction(params.transactionId, user?.uid);

  const title = transaction
    ? `Transaction #${transaction.orderId} - ${transaction.projectTitle}`
    : "Transaction Not Found";

  const description = transaction
    ? `Check status for transaction #${transaction.orderId} - ${transaction.projectTitle}`
    : "Transaction details not found";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: transaction?.imageUrl ? [transaction.imageUrl] : [],
    },
  };
}
