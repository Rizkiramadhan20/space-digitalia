'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from "@/utils/context/AuthContext";

import CardSkelaton from '@/hooks/dashboard/user/card/CardSkelaton';

import { MdManageAccounts } from "react-icons/md";

import WeatherCard from '@/hooks/dashboard/user/card/components/WeatherCard';

import StatCard from '@/hooks/dashboard/user/card/components/StatCard';

export default function UserDashboardPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [currentTime, setCurrentTime] = useState(new Date());

    const isLoading = authLoading || !user;

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
                </div>
            </div>
        </section>
    );
}