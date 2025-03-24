import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import { collection, query, where, getDocs } from "firebase/firestore";

import { useAuth } from "@/utils/context/AuthContext";

interface Transaction {
    amount: number;
    createdAt: { seconds: number; nanoseconds: number };
    deliveryMethod: string;
    downloadUrl: string | null;
    imageUrl: string;
    licenseType: string;
    orderId: string;
    paymentDetails: {
        transaction_status: string;
        gross_amount: string;
        payment_type: string;
    };
    projectTitle: string;
    status: string;
    statusDelivery: string;
    transactionId: string;
}

export function useStats() {
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalProducts: 0,
        totalAccounts: 0,
    });
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;

            try {
                // Mengambil total transaksi sukses user
                const transactionsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
                );
                const transactionsQuery = query(
                    transactionsRef,
                    where("userId", "==", user.uid),
                    where("status", "==", "success")
                );
                const transactionsSnapshot = await getDocs(transactionsQuery);
                const transactions = transactionsSnapshot.docs.map(doc => doc.data() as Transaction);

                // Menghitung total produk yang dibeli (setiap transaksi = 1 produk)
                const totalProducts = transactions.length;

                setStats({
                    totalTransactions: transactions.length,
                    totalProducts: totalProducts,
                    totalAccounts: 1, // User's own account
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    return { stats, loading };
}