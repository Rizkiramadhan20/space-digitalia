'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from "@/utils/context/AuthContext";

import { useStats } from '@/hooks/dashboard/user/card/lib/useStats';

import { useChartData } from '@/hooks/dashboard/user/card/lib/useChartData';

import CardSkelaton from '@/hooks/dashboard/user/card/CardSkelaton';

import {
    FiBarChart2,
    FiShoppingCart
} from 'react-icons/fi';

import { MdManageAccounts } from "react-icons/md";

import WeatherCard from '@/hooks/dashboard/user/card/components/WeatherCard';

import StatCard from '@/hooks/dashboard/user/card/components/StatCard';

import SalesChart from '@/hooks/dashboard/user/card/components/SalesChart';

import CategoryChart from '@/hooks/dashboard/user/card/components/CategoryChart';

import RecentPurchases from '@/hooks/dashboard/user/card/components/RecentPurchases';

export default function UserDashboardPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { stats, loading: statsLoading } = useStats();
    const {
        salesData,
        categoryData,
        topSellingItems,
        paymentMethodStats,
        loading: chartLoading
    } = useChartData();
    const [currentTime, setCurrentTime] = useState(new Date());

    // Combine all loading states
    const isLoading = authLoading || statsLoading || chartLoading || !user;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return <CardSkelaton />;
    }

    return (
        <section>
            <div className="flex flex-col gap-8">
                {/* Welcome Message with Digital Clock */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 border border-gray-300">
                    <div className="flex items-center justify-between gap-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Halo, selamat datang {user.displayName}! 👋
                        </h1>
                        <div className="text-2xl font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-xl">
                            {currentTime.toLocaleTimeString('id-ID')}
                        </div>
                    </div>
                </div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Weather Card */}
                    <WeatherCard />

                    {/* Account Type Card */}
                    <StatCard
                        icon={<MdManageAccounts />}
                        iconBgColor="bg-sky-100/50"
                        iconColor="text-sky-600"
                        value={user.role || 'User'}
                        label="Status Akun"
                        badgeText={user.role || 'User'}
                        badgeBgColor="bg-emerald-100/50"
                        badgeTextColor="text-emerald-600"
                    />

                    {/* Stats Cards */}
                    <StatCard
                        icon={<FiBarChart2 />}
                        iconBgColor="bg-amber-100/50"
                        iconColor="text-amber-600"
                        value={stats.totalTransactions}
                        label="Total Transaksi Sukses"
                        badgeText="Sukses"
                        badgeBgColor="bg-emerald-100/50"
                        badgeTextColor="text-emerald-600"
                    />

                    <StatCard
                        icon={<FiShoppingCart />}
                        iconBgColor="bg-emerald-100/50"
                        iconColor="text-emerald-600"
                        value={stats.totalProducts}
                        label="Produk Dibeli"
                        badgeText="Produk"
                        badgeBgColor="bg-emerald-100/50"
                        badgeTextColor="text-emerald-600"
                    />

                    {/* Payment Method Cards */}
                    <StatCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        }
                        iconBgColor="bg-purple-100/50"
                        iconColor="text-purple-600"
                        value={paymentMethodStats.download}
                        label="Total Download"
                        badgeText="Download"
                        badgeBgColor="bg-purple-100/50"
                        badgeTextColor="text-purple-600"
                    />

                    {/* Delivery Method Card */}
                    <StatCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="8" x2="8" y2="8" />
                                <line x1="16" y1="12" x2="8" y2="12" />
                                <line x1="16" y1="16" x2="8" y2="16" />
                            </svg>
                        }
                        iconBgColor="bg-orange-100/50"
                        iconColor="text-orange-600"
                        value={paymentMethodStats.delivery}
                        label="Total Delivery"
                        badgeText="Delivery"
                        badgeBgColor="bg-orange-100/50"
                        badgeTextColor="text-orange-600"
                    />
                </div>

                {/* Main Content Row */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {/* Sales Chart */}
                    <SalesChart salesData={salesData} />

                    {/* Category Distribution */}
                    <CategoryChart categoryData={categoryData} />

                    {/* Top Selling Items */}
                    <RecentPurchases items={topSellingItems} />
                </div>
            </div>
        </section>
    );
}