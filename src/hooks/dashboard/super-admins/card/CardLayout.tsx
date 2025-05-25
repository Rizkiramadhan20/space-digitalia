'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import "react-datepicker/dist/react-datepicker.css";

import { registerChartComponents } from '@/hooks/dashboard/super-admins/card/utils/ChartRegistration';

import WelcomeSection from '@/hooks/dashboard/super-admins/card/ui/Welcome';

import StatsSection from '@/hooks/dashboard/super-admins/card/ui/Stats';

import { useStats } from '@/hooks/dashboard/super-admins/card/lib/useStats';

import { useChartData } from '@/hooks/dashboard/super-admins/card/lib/useChartData';

import { useRecapAnalytics } from '@/hooks/dashboard/super-admins/card/lib/useRecapAnalytics';

import { useWeather } from '@/hooks/dashboard/super-admins/card/utils/Weather';

import CardSkelaton from '@/hooks/dashboard/super-admins/card/CardSkelaton';

registerChartComponents();

export default function SuperAdminDashboardPage() {
    const { stats, loading: statsLoading } = useStats();
    const { loading: chartLoading } = useChartData();
    const [currentTime, setCurrentTime] = useState(new Date());
    const { loading: recapLoading } = useRecapAnalytics();
    const { user } = useAuth();
    const { weather } = useWeather();

    const isLoading = statsLoading || chartLoading || recapLoading;

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
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col gap-8">
                <WelcomeSection user={user} currentTime={currentTime} />

                <StatsSection stats={stats} weather={weather} />
            </div>
        </section>
    );
}