import { useState, useEffect, useCallback } from "react";

import { db } from "@/utils/firebase";

import {
    collection,
    getDocs,
} from "firebase/firestore";

interface DeliveryAddress {
    city: string;
    details: string;
    district: string;
    fullName: string;
    phone: string;
    postalCode: string;
    province: string;
    streetAddress: string;
}

interface PaymentDetails {
    bca_va_number: string;
    finish_redirect_url: string;
    fraud_status: string;
    gross_amount: string;
    order_id: string;
    payment_type: string;
    pdf_url: string;
    status_code: string;
    status_message: string;
    transaction_id: string;
    transaction_status: string;
    transaction_time: string;
    va_numbers: Array<{
        bank: string;
        va_number: string;
    }>;
}

interface Transaction {
    id: string;
    amount: number;
    createdAt: {
        toDate: () => Date;
    };
    deliveryAddress: DeliveryAddress;
    deliveryMethod: string;
    downloadUrl: string | null;
    imageUrl: string;
    licenseType: string;
    linkTransaction: string;
    orderId: string;
    paymentDetails: PaymentDetails;
    paymentMethod: string;
    paymentToken: string;
    projectId: string;
    projectTitle: string;
    rating: number;
    redirectUrl: string;
    review: string;
    status: string;
    statusDelivery: string;
    transactionId: string;
    updatedAt: {
        toDate: () => Date;
    };
    userEmail: string;
    userId: string;
    userName: string;
    userPhotoURL: string;
}

export function useChartData() {
    const [salesData, setSalesData] = useState<Array<{ name: string; value: number }>>([]);
    const [categoryData, setCategoryData] = useState<Array<{ name: string; value: number; color: string }>>([]);
    const [topSellingItems, setTopSellingItems] = useState<Array<{
        id: string;
        name: string;
        image: string;
        sales: number;
        trend: string;
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchTransactionData = useCallback(async () => {
        try {
            setLoading(true);
            const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
            const snapshot = await getDocs(transactionsRef);
            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[];

            if (transactions.length > 0) {
                // Process sales data
                const groupedByDate = transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
                    const date = transaction.createdAt.toDate().toISOString().split('T')[0];
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(transaction);
                    return acc;
                }, {});

                const processedSalesData = Object.entries(groupedByDate).map(([date, transactions]) => ({
                    name: date,
                    value: transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0)
                }));

                // Process category data (using licenseType instead of category)
                const categoryTotals = transactions.reduce<Record<string, number>>((acc, transaction) => {
                    const category = transaction.licenseType || 'Uncategorized';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
                const totalTransactions = transactions.length;

                const processedCategoryData = Object.entries(categoryTotals).map(([category, count], index) => ({
                    name: category,
                    value: Math.round((count / totalTransactions) * 100),
                    color: colors[index % colors.length]
                }));

                // Process top selling items
                const productSales = transactions.reduce<Record<string, { count: number; details: { title: string; image: string } }>>(
                    (acc, transaction) => {
                        if (!acc[transaction.projectId]) {
                            acc[transaction.projectId] = {
                                count: 0,
                                details: {
                                    title: transaction.projectTitle,
                                    image: transaction.imageUrl
                                }
                            };
                        }
                        acc[transaction.projectId].count += 1;
                        return acc;
                    },
                    {}
                );

                const processedTopSelling = Object.entries(productSales)
                    .map(([id, { count, details }]) => ({
                        id,
                        name: details.title,
                        image: details.image,
                        sales: count,
                        trend: '+' + Math.round(Math.random() * 100) + '%'
                    }))
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5);

                setSalesData(processedSalesData);
                setCategoryData(processedCategoryData);
                setTopSellingItems(processedTopSelling);
            }
        } catch (error) {
            setError("Failed to fetch transaction data. Please try again later.");
            console.error("Error fetching transaction data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactionData();
    }, [fetchTransactionData]);

    const filterSalesByDate = useCallback((date: Date | null, period: string) => {
        const fetchFilteredData = async () => {
            try {
                setLoading(true);
                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const snapshot = await getDocs(transactionsRef);
                const transactions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                // Filter transactions based on date and period
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDate = transaction.createdAt.toDate();

                    if (!date) return true; // If no date selected, return all transactions

                    const startDate = new Date(date);
                    const endDate = new Date(date);

                    switch (period) {
                        case 'Minggu Ini':
                            startDate.setDate(date.getDate() - date.getDay()); // Start of week
                            endDate.setDate(startDate.getDate() + 6); // End of week
                            break;
                        case 'Minggu Lalu':
                            startDate.setDate(date.getDate() - date.getDay() - 7); // Start of last week
                            endDate.setDate(startDate.getDate() + 6); // End of last week
                            break;
                        case 'Bulan Ini':
                            startDate.setDate(1); // Start of month
                            endDate.setMonth(date.getMonth() + 1, 0); // End of month
                            break;
                        default:
                            return true;
                    }

                    return transactionDate >= startDate && transactionDate <= endDate;
                });

                // Process filtered transactions
                if (filteredTransactions.length > 0) {
                    // Process sales data
                    const groupedByDate = filteredTransactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
                        const date = transaction.createdAt.toDate().toISOString().split('T')[0];
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(transaction);
                        return acc;
                    }, {});

                    const processedSalesData = Object.entries(groupedByDate).map(([date, transactions]) => ({
                        name: date,
                        value: transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0)
                    }));

                    // Process category data
                    const categoryTotals = filteredTransactions.reduce<Record<string, number>>((acc, transaction) => {
                        const category = transaction.licenseType || 'Uncategorized';
                        acc[category] = (acc[category] || 0) + 1;
                        return acc;
                    }, {});

                    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
                    const totalTransactions = filteredTransactions.length;

                    const processedCategoryData = Object.entries(categoryTotals).map(([category, count], index) => ({
                        name: category,
                        value: Math.round((count / totalTransactions) * 100),
                        color: colors[index % colors.length]
                    }));

                    // Update state with filtered data
                    setSalesData(processedSalesData);
                    setCategoryData(processedCategoryData);
                }
            } catch {
                setError("Failed to filter transaction data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredData();
    }, []);

    return {
        salesData,
        categoryData,
        topSellingItems,
        loading,
        error,
        filterSalesByDate
    };
}