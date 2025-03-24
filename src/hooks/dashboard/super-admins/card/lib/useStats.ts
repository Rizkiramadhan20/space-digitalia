import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import { collection, query, where, getDocs } from "firebase/firestore";

export function useStats() {
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalProducts: 0,
        totalAccounts: 0,
        totalTestimonials: 0,
        totalArticles: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log('Fetching stats...');
                // Using correct collection names from env
                const transactionsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
                );
                const productsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string
                );
                const accountsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
                );
                const testimonialsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIALS as string
                );
                const articlesRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
                );

                // Simple queries that match security rules
                const transactionsQuery = query(
                    transactionsRef,
                    where("status", "==", "success")
                );

                const [
                    transactionsSnapshot,
                    productsSnapshot,
                    accountsSnapshot,
                    testimonialsSnapshot,
                    articlesSnapshot,
                ] = await Promise.all([
                    getDocs(transactionsQuery),
                    getDocs(productsRef),
                    getDocs(accountsRef),
                    getDocs(testimonialsRef),
                    getDocs(articlesRef),
                ]);

                console.log('Products snapshot size:', productsSnapshot.size);
                console.log('Products data:', productsSnapshot.docs.map(doc => doc.data()));

                setStats({
                    totalTransactions: transactionsSnapshot.size,
                    totalProducts: productsSnapshot.size,
                    totalAccounts: accountsSnapshot.size,
                    totalTestimonials: testimonialsSnapshot.size,
                    totalArticles: articlesSnapshot.size,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    totalTransactions: 0,
                    totalProducts: 0,
                    totalAccounts: 0,
                    totalTestimonials: 0,
                    totalArticles: 0,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading };
}