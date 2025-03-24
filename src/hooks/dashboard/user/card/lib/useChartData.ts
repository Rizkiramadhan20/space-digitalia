import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    QuerySnapshot,
    DocumentData
} from "firebase/firestore";

import { useAuth } from "@/utils/context/AuthContext";

interface Transaction {
    amount: number;
    createdAt: { seconds: number; nanoseconds: number };
    imageUrl: string;
    projectTitle: string;
    paymentDetails: {
        payment_type: string;
        transaction_status: string;
        gross_amount: string;
    };
    status: string;
    statusDelivery: string;
    orderId: string;
    licenseType: string;
    deliveryMethod: string;
}

export interface TopSellingItem {
    id: string;
    name: string;
    amount: number;
    paymentType: string;
    status: string;
    image: string;
}

export interface PaymentMethodStats {
    download: number;
    delivery: number;
}

export function useChartData() {
    const [salesData, setSalesData] = useState<
        Array<{ name: string; value: number }>
    >([]);
    const [categoryData, setCategoryData] = useState<
        Array<{ name: string; value: number; color: string }>
    >([]);
    const [topSellingItems, setTopSellingItems] = useState<TopSellingItem[]>([]);
    const [paymentMethodStats, setPaymentMethodStats] = useState<PaymentMethodStats>({
        download: 0,
        delivery: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const { user } = useAuth();

    useEffect(() => {
        const fetchChartData = async () => {
            if (!user) return;

            try {
                setLoading(true);
                setError(undefined);

                const transactionsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
                );

                // Try the indexed query first
                try {
                    const fullQuery = query(
                        transactionsRef,
                        where("userId", "==", user.uid),
                        where("status", "==", "success"),
                        orderBy("createdAt", "desc"),
                        limit(7)
                    );

                    const snapshot = await getDocs(fullQuery);
                    processTransactions(snapshot);
                } catch {
                    // Fallback to a simpler query if index doesn't exist
                    console.warn("Using fallback query. Please create the suggested index.");
                    const simpleQuery = query(
                        transactionsRef,
                        where("userId", "==", user.uid),
                        where("status", "==", "success"),
                        limit(7)
                    );
                    const snapshot = await getDocs(simpleQuery);
                    processTransactions(snapshot);
                }
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setError("Failed to load chart data");
            } finally {
                setLoading(false);
            }
        };

        // Helper function to process transactions
        const processTransactions = (snapshot: QuerySnapshot<DocumentData>) => {
            const transactions = snapshot.docs.map(doc => doc.data() as Transaction);

            // Sort transactions by createdAt manually if using fallback query
            transactions.sort((a, b) =>
                b.createdAt.seconds - a.createdAt.seconds
            );

            // Process sales data
            const salesByDay = new Map<string, number>();
            transactions.forEach((transaction) => {
                const date = new Date(
                    transaction.createdAt.seconds * 1000
                ).toLocaleDateString("en-US", { weekday: "short" });
                salesByDay.set(
                    date,
                    (salesByDay.get(date) || 0) + transaction.amount
                );
            });

            // Process license types
            const licenseCount = new Map<string, number>();
            transactions.forEach((transaction) => {
                const licenseType = transaction.licenseType || "Standard";
                licenseCount.set(
                    licenseType,
                    (licenseCount.get(licenseType) || 0) + 1
                );
            });

            const colors = ["#f43f5e", "#0ea5e9", "#8b5cf6", "#10b981"];

            // Process top items
            const topItems: TopSellingItem[] = transactions.slice(0, 3).map((transaction) => ({
                id: transaction.orderId,
                name: transaction.projectTitle,
                amount: transaction.amount,
                paymentType: transaction.paymentDetails?.payment_type?.replace('_', ' ').toUpperCase() || 'N/A',
                status: transaction.statusDelivery,
                image: transaction.imageUrl,
            }));

            setSalesData(
                Array.from(salesByDay, ([name, value]) => ({
                    name,
                    value,
                }))
            );

            const totalTransactions = transactions.length;
            setCategoryData(
                Array.from(licenseCount, ([name, value], index) => ({
                    name,
                    value: Math.round((value / totalTransactions) * 100),
                    color: colors[index % colors.length],
                }))
            );

            setTopSellingItems(topItems);

            // Calculate payment method stats
            const methodStats = transactions.reduce((acc, transaction) => {
                if (transaction.deliveryMethod === 'delivery') {
                    acc.delivery += 1;
                } else {
                    acc.download += 1;
                }
                return acc;
            }, { download: 0, delivery: 0 });

            setPaymentMethodStats(methodStats);
        };

        fetchChartData();
    }, [user]);

    return { salesData, categoryData, topSellingItems, paymentMethodStats, loading, error };
}