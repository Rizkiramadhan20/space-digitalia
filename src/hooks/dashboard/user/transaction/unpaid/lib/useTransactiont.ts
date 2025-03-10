import { useState, useEffect } from "react";

import { collection, query, where, onSnapshot, doc } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Transaction } from "@/hooks/dashboard/user/transaction/unpaid/lib";

export const useTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    []
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for pending transactions
  useEffect(() => {
    const transactionRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
    );
    const q = query(transactionRef, where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const transactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        const sortedTransactions = transactions.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        );

        setPendingTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error in transaction listener:", error);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Update selected transaction when its data changes
  useEffect(() => {
    if (!selectedTransaction) return;

    const transactionRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string,
      selectedTransaction.id
    );
    const unsubscribe = onSnapshot(transactionRef, (doc) => {
      if (doc.exists()) {
        const updatedTransaction = {
          id: doc.id,
          ...doc.data(),
        } as Transaction;

        setSelectedTransaction(updatedTransaction);

        if (updatedTransaction.status !== "pending") {
          setIsModalOpen(false);
          setPendingTransactions((prev) =>
            prev.filter((t) => t.id !== updatedTransaction.id)
          );
        }

        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [selectedTransaction]);

  return {
    pendingTransactions,
    setPendingTransactions,
    selectedTransaction,
    setSelectedTransaction,
    isModalOpen,
    setIsModalOpen,
    isLoading,
  };
};
