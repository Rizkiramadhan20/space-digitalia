'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import "react-datepicker/dist/react-datepicker.css";

import { registerChartComponents } from '@/hooks/dashboard/super-admins/card/utils/ChartRegistration';

import WelcomeSection from '@/hooks/dashboard/super-admins/card/ui/Welcome';

import StatsSection from '@/hooks/dashboard/super-admins/card/ui/Stats';

import RecapAnalysisSection from '@/hooks/dashboard/super-admins/card/ui/RecapAnalysis';

import UserTransactionSection from '@/hooks/dashboard/super-admins/card/ui/userTransaction';

import SalesChartSection from '@/hooks/dashboard/super-admins/card/ui/SalesChart';

import CategoryDistributionSection from '@/hooks/dashboard/super-admins/card/ui/Distribution';

import TopSellingSection from '@/hooks/dashboard/super-admins/card/ui/TopSelling';

import { useStats } from '@/hooks/dashboard/super-admins/card/lib/useStats';

import { useChartData } from '@/hooks/dashboard/super-admins/card/lib/useChartData';

import { useRecapAnalytics } from '@/hooks/dashboard/super-admins/card/lib/useRecapAnalytics';

import { useWeather } from '@/hooks/dashboard/super-admins/card/utils/Weather';

import CardSkelaton from '@/hooks/dashboard/super-admins/card/CardSkelaton';

registerChartComponents();

export default function SuperAdminDashboardPage() {
    const { stats, loading: statsLoading } = useStats();
    const { salesData, categoryData, topSellingItems, loading: chartLoading, filterSalesByDate } = useChartData();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState('Minggu Ini');
    const [currentTime, setCurrentTime] = useState(new Date());
    const { recapStats, loading: recapLoading } = useRecapAnalytics();
    const { user } = useAuth();
    const { weather } = useWeather();

    const isLoading = statsLoading || chartLoading || recapLoading;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        filterSalesByDate(startDate, selectedPeriod);
    }, [startDate, selectedPeriod, filterSalesByDate]);

    if (isLoading) {
        return <CardSkelaton />;
    }

    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col gap-8">
                <WelcomeSection user={user} currentTime={currentTime} />

                <StatsSection stats={stats} weather={weather} />

                <RecapAnalysisSection recapStats={recapStats} />

                <UserTransactionSection userTransactions={recapStats.userTransactions} />

                <SalesChartSection
                    salesData={salesData}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    filterSalesByDate={filterSalesByDate}
                />

                <CategoryDistributionSection categoryData={categoryData} />

                <TopSellingSection topSellingItems={topSellingItems} />
            </div>
        </section>
    );
}