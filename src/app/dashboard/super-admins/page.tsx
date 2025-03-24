'use client';

import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import {
    FiBarChart2,
    FiShoppingCart,
    FiUsers,
    FiSun,
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
    FiMessageCircle,
    FiFileText
} from 'react-icons/fi';

import { MdManageAccounts } from "react-icons/md";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    ChartOptions,
    Scale,
    CoreScaleOptions,
    TooltipItem as ChartTooltipItem,
    Filler
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

import { useStats } from '@/hooks/dashboard/super-admins/card/lib/useStats';

import { useChartData } from '@/hooks/dashboard/super-admins/card/lib/useChartData';

import Image from 'next/image';

import { useRecapAnalytics } from '@/hooks/dashboard/super-admins/card/lib/useRecapAnalytics';

import { useAuth } from '@/utils/context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Filler
);

interface WeatherState {
    temp: number | null;
    condition: string;
    city: string;
    error: string | null;
}

import CardSkelaton from '@/hooks/dashboard/super-admins/card/CardSkelaton';

const DEFAULT_IMAGE = '/placeholder-image.jpg'; // Add a default placeholder image to your public folder

export default function SuperAdminDashboardPage() {
    const { stats, loading: statsLoading } = useStats();
    const { salesData, categoryData, topSellingItems, loading: chartLoading, filterSalesByDate } = useChartData();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState('Minggu Ini');
    const [weather, setWeather] = useState<WeatherState>({
        temp: null,
        condition: 'Loading...',
        city: 'Loading...',
        error: null
    });
    const [currentTime, setCurrentTime] = useState(new Date());
    const { recapStats, loading: recapLoading } = useRecapAnalytics();
    const { user } = useAuth();

    // Update loading state (removed authLoading and user check)
    const isLoading = statsLoading || chartLoading || recapLoading;

    useEffect(() => {
        // Fetch weather data
        const getWeather = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
                    throw new Error('Weather API key not configured');
                }

                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Jakarta&aqi=no`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Weather service unavailable');
                }

                const data = await response.json();
                setWeather({
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    city: data.location.name,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeather({
                    temp: null,
                    condition: 'Error',
                    city: 'Error',
                    error: 'Unable to load weather data'
                });
            }
        };

        getWeather();
    }, []);

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

    // Chart.js data configuration for line chart
    const lineChartData = {
        labels: salesData.map(item => item.name),
        datasets: [
            {
                label: 'Total Pembelian (Rp)',
                data: salesData.map(item => item.value),
                borderColor: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                fill: true,
            }
        ]
    };

    // Chart.js data configuration for doughnut chart
    const doughnutChartData = {
        labels: categoryData.map(item => item.name),
        datasets: [
            {
                data: categoryData.map(item => item.value),
                backgroundColor: categoryData.map(item => item.color),
            }
        ]
    };

    const lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    callback: function (
                        this: Scale<CoreScaleOptions>,
                        tickValue: string | number
                    ): string {
                        return 'Rp ' + Number(tickValue).toLocaleString('id-ID');
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const
            },
            tooltip: {
                callbacks: {
                    label: function (
                        tooltipItem: ChartTooltipItem<'line'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return 'Rp ' + value.toLocaleString('id-ID');
                    }
                }
            }
        }
    } as const;

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (
                        tooltipItem: ChartTooltipItem<'doughnut'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return `${tooltipItem.label}: ${value}%`;
                    }
                }
            }
        }
    } as const;

    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col gap-8">
                {/* Welcome Message with Digital Clock */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between gap-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Halo, selamat datang {user?.displayName} 👋
                        </h1>
                        <div className="text-2xl font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-xl">
                            {currentTime.toLocaleTimeString('id-ID')}
                        </div>
                    </div>
                </div>

                {/* Top Stats Row */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {/* Weather Card */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-blue-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiSun className="w-7 h-7 text-blue-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-blue-100/50 backdrop-blur text-blue-600 text-sm font-medium rounded-full">Cuaca</span>
                        </div>
                        {weather.error ? (
                            <div className="mt-4">
                                <p className="text-red-500 text-sm">{weather.error}</p>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    {weather.temp !== null ? `${weather.temp}°C` : '--°C'}
                                </h3>
                                <p className="text-slate-600 text-sm font-medium">{weather.condition}</p>
                                <p className="text-slate-500 text-sm">{weather.city}</p>
                            </div>
                        )}
                    </div>

                    {/* Stats Cards */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-amber-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiBarChart2 className="w-7 h-7 text-amber-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Total</span>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-3xl font-bold mb-2">{stats.totalTransactions}</h3>
                            <p className="text-slate-600 text-sm font-medium">Total Transaksi</p>
                        </div>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-emerald-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiShoppingCart className="w-7 h-7 text-emerald-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Produk</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalProducts}</h3>
                        <p className="text-slate-600 text-sm font-medium">Total Produk</p>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-violet-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiUsers className="w-7 h-7 text-violet-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Users</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalAccounts}</h3>
                        <p className="text-slate-600 text-sm font-medium">Total Users</p>
                    </div>

                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-sky-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <MdManageAccounts className="w-7 h-7 text-sky-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Admin</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">Super Admin</h3>
                        <p className="text-slate-600 text-sm font-medium">Status Akun</p>
                    </div>

                    {/* Testimonials Card */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-pink-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiMessageCircle className="w-7 h-7 text-pink-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Testimonials</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalTestimonials}</h3>
                        <p className="text-slate-600 text-sm font-medium">Total Testimonials</p>
                    </div>

                    {/* Articles Card */}
                    <div className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
                        <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-indigo-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                <FiFileText className="w-7 h-7 text-indigo-600" />
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100/50 backdrop-blur text-emerald-600 text-sm font-medium rounded-full">Articles</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-6 mb-2">{stats.totalArticles}</h3>
                        <p className="text-slate-600 text-sm font-medium">Total Articles</p>
                    </div>
                </div>

                {/* Recap Analysis Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Analisis Rekap Transaksi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Total Transaction Value Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-blue-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiBarChart2 className="w-7 h-7 text-blue-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-blue-100/50 backdrop-blur text-blue-600 text-sm font-medium rounded-full">
                                    Total Value
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Rp {recapStats.totalAmount.toLocaleString('id-ID')}
                                </h3>
                                <p className="text-slate-600 text-sm">Total Nilai Transaksi</p>
                            </div>
                        </div>

                        {/* Successful Transactions Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-green-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiTrendingUp className="w-7 h-7 text-green-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-green-100/50 backdrop-blur text-green-600 text-sm font-medium rounded-full">
                                    Success
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Rp {recapStats.successAmount.toLocaleString('id-ID')}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {recapStats.successTransactions} Transaksi Sukses
                                </p>
                            </div>
                        </div>

                        {/* Average Transaction Value Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-purple-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiBarChart2 className="w-7 h-7 text-purple-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-purple-100/50 backdrop-blur text-purple-600 text-sm font-medium rounded-full">
                                    Average
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Rp {recapStats.averageTransactionValue.toLocaleString('id-ID')}
                                </h3>
                                <p className="text-slate-600 text-sm">Rata-rata Transaksi</p>
                            </div>
                        </div>

                        {/* Pending Transactions Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-yellow-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiTrendingDown className="w-7 h-7 text-yellow-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-yellow-100/50 backdrop-blur text-yellow-600 text-sm font-medium rounded-full">
                                    Pending
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Rp {recapStats.pendingAmount.toLocaleString('id-ID')}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {recapStats.pendingTransactions} Transaksi Pending
                                </p>
                            </div>
                        </div>

                        {/* Failed Transactions Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-red-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiTrendingDown className="w-7 h-7 text-red-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-red-100/50 backdrop-blur text-red-600 text-sm font-medium rounded-full">
                                    Failed
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Rp {recapStats.failedAmount.toLocaleString('id-ID')}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {recapStats.failedTransactions} Transaksi Gagal
                                </p>
                            </div>
                        </div>

                        {/* Total Transactions Count Card */}
                        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-indigo-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                                    <FiBarChart2 className="w-7 h-7 text-indigo-600" />
                                </div>
                                <span className="px-4 py-1.5 bg-indigo-100/50 backdrop-blur text-indigo-600 text-sm font-medium rounded-full">
                                    Total
                                </span>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    {recapStats.totalTransactions}
                                </h3>
                                <p className="text-slate-600 text-sm">Total Jumlah Transaksi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Transaction Summary Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-6">Transaksi per Pengguna</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recapStats.userTransactions.map((user) => (
                            <div key={`user-${user.userId}`} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src={user.photoURL}
                                        alt={user.fullName}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <FiShoppingCart className="text-primary w-5 h-5" />
                                            <span className="text-sm font-medium">Total Transaksi</span>
                                        </div>
                                        <span className="font-semibold">{user.transactions.length}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <FiDollarSign className="text-green-600 w-5 h-5" />
                                            <span className="text-sm font-medium">Total Pembelian</span>
                                        </div>
                                        <span className="font-semibold">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(user.totalAmount)}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-sm font-medium text-gray-600">Riwayat Transaksi:</h4>
                                            <select
                                                className="text-xs border rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                                onChange={(e) => {
                                                    const sortedTransactions = [...user.transactions].sort((a, b) => {
                                                        if (e.target.value === 'newest') {
                                                            return new Date(b.date).getTime() - new Date(a.date).getTime();
                                                        } else {
                                                            return new Date(a.date).getTime() - new Date(b.date).getTime();
                                                        }
                                                    });
                                                    user.transactions = sortedTransactions;
                                                }}
                                            >
                                                <option value="newest">Terbaru</option>
                                                <option value="oldest">Terlama</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {user.transactions.map((transaction) => (
                                                <div
                                                    key={`${user.userId}-transaction-${transaction.id}`}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={transaction.productDetails.image}
                                                            alt={transaction.productDetails.title}
                                                            width={32}
                                                            height={32}
                                                            className="rounded-lg"
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium truncate">
                                                                {transaction.productDetails.title}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {transaction.date.toLocaleDateString('id-ID')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-medium text-green-600">
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR'
                                                            }).format(transaction.amount)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-4">
                                        Transaksi terakhir: {user.lastTransactionDate.toLocaleDateString('id-ID')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Transaksi</h2>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="flex flex-wrap w-full md:w-auto gap-4 items-center">
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date | null) => {
                                    setStartDate(date);
                                    filterSalesByDate(date, selectedPeriod);
                                }}
                                className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Pilih tanggal"
                            />
                            <select
                                className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                value={selectedPeriod}
                                onChange={(e) => {
                                    setSelectedPeriod(e.target.value);
                                    filterSalesByDate(startDate, e.target.value);
                                }}
                            >
                                <option>Minggu Ini</option>
                                <option>Minggu Lalu</option>
                                <option>Bulan Ini</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative w-full h-[350px]">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori Pembelian</h2>
                    <div className="relative h-[280px] flex justify-center">
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                    <div className="mt-6 space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                        {categoryData.map((item, index) => (
                            <div key={`category-${item.name}-${index}`} className="flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                </div>
                                <span className="text-sm font-semibold">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Items */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Pembelian Terakhir</h2>
                    <div className="flex flex-wrap gap-4">
                        {topSellingItems.map((item) => (
                            <div key={`top-selling-${item.id}`} className="flex-1 min-w-[300px] flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name || 'Product image'}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 64px) 100vw, 64px"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = DEFAULT_IMAGE;
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src={DEFAULT_IMAGE}
                                                alt="Placeholder image"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 64px) 100vw, 64px"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-gray-800">{item.name || 'Untitled Product'}</p>
                                        <p className="text-sm text-gray-500 mt-1">{item.sales} item</p>
                                    </div>
                                </div>
                                <span className="text-green-500 text-sm font-semibold">{item.trend}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}