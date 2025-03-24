"use client"

import { motion } from 'framer-motion'

import React from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Line } from 'react-chartjs-2';

import { collection, query, orderBy, where, Timestamp, onSnapshot } from 'firebase/firestore';

import { db } from '@/utils/firebase';

import Image from 'next/image';

import RekapSkeleton from '@/hooks/dashboard/super-admins/rekap/RekapSkelaton';

import { ChartData, Transaction } from '@/hooks/dashboard/super-admins/rekap/lib/rekap';

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Tambahkan style container untuk chart
const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '400px'
};

// Update options chart dengan maintainAspectRatio: false
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                font: {
                    size: 12,
                    family: "'Inter', sans-serif"
                },
                usePointStyle: true,
                padding: 20
            }
        },
        title: {
            display: true,
            text: 'Grafik Transaksi',
            color: '#334155',
            font: {
                size: 16,
                weight: 'bold' as const,
                family: "'Inter', sans-serif"
            },
            padding: 20
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false,
                drawTicks: true
            },
            border: {
                display: false
            },
            ticks: {
                padding: 10,
                font: {
                    size: 11,
                    family: "'Inter', sans-serif"
                }
            }
        },
        x: {
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false,
                tickLength: 10
            },
            border: {
                display: false
            },
            ticks: {
                padding: 10,
                font: {
                    size: 11,
                    family: "'Inter', sans-serif"
                }
            }
        },
    },
    elements: {
        line: {
            tension: 0.4
        },
        point: {
            radius: 4,
            borderWidth: 2,
            backgroundColor: 'white'
        }
    }
};

export default function RekapLayout() {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [chartData, setChartData] = React.useState<ChartData>({
        labels: [],
        datasets: [],
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [dateRange, setDateRange] = React.useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null
    });
    const [showFilter, setShowFilter] = React.useState(false);
    const [sortOption, setSortOption] = React.useState('total-desc');
    const [searchQuery, setSearchQuery] = React.useState('');

    const fetchTransactions = React.useCallback((start: Date | null, end: Date | null) => {
        try {
            setIsLoading(true);
            const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);

            const startDate = start || new Date(new Date().setDate(1));
            const endDate = end || new Date();

            const q = query(
                transactionsRef,
                where('createdAt', '>=', Timestamp.fromDate(startDate)),
                where('createdAt', '<=', Timestamp.fromDate(endDate)),
                orderBy('createdAt', 'asc')
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const transactionData: Transaction[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Omit<Transaction, 'id'>;
                    if (data.status === 'success') {
                        transactionData.push(data);
                    }
                });

                setTransactions(transactionData);

                const dailyData = transactionData.reduce<Record<string, number>>((acc, transaction) => {
                    const date = transaction.createdAt.toDate();
                    const dayStr = date.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short'
                    });

                    if (!acc[dayStr]) {
                        acc[dayStr] = 0;
                    }
                    acc[dayStr] += transaction.amount;
                    return acc;
                }, {});

                const userDailyData = transactionData.reduce<Record<string, Record<string, number>>>((acc, transaction) => {
                    const date = transaction.createdAt.toDate();
                    const dayStr = date.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short'
                    });

                    const userName = transaction.userName;

                    if (!acc[userName]) {
                        acc[userName] = {};
                    }

                    if (!acc[userName][dayStr]) {
                        acc[userName][dayStr] = 0;
                    }

                    acc[userName][dayStr] += transaction.amount;
                    return acc;
                }, {});

                const labels = Object.keys(dailyData);
                const userDatasets = Object.entries(userDailyData).map(([userName, data], index) => ({
                    label: `Transaksi ${userName}`,
                    data: labels.map(day => data[day] || 0),
                    borderColor: getColorByIndex(index),
                    backgroundColor: getBackgroundColorByIndex(index),
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: getColorByIndex(index),
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: getColorByIndex(index),
                }));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Semua Transaksi',
                            data: Object.values(dailyData),
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 2,
                            pointBackgroundColor: '#ffffff',
                            pointBorderColor: '#2563eb',
                            pointHoverRadius: 6,
                            pointHoverBorderWidth: 3,
                            pointHoverBackgroundColor: '#ffffff',
                            pointHoverBorderColor: '#2563eb',
                        },
                        ...userDatasets
                    ]
                });
                setIsLoading(false);
            }, (error) => {
                console.error('Error fetching transactions:', error);
                setIsLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error setting up real-time listener:', error);
            setIsLoading(false);
            return () => { }; // Return empty function in case of error
        }
    }, []);

    React.useEffect(() => {
        const unsubscribe = fetchTransactions(dateRange.startDate, dateRange.endDate);

        // Clean up listener when component unmounts or dependencies change
        return () => {
            unsubscribe();
        };
    }, [dateRange, fetchTransactions]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value ? new Date(value) : null
        }));
    };

    // Fungsi untuk menghasilkan warna berbeda untuk setiap user
    const getColorByIndex = (index: number): string => {
        const colors = [
            '#2563eb', // blue
            '#16a34a', // green
            '#dc2626', // red
            '#9333ea', // purple
            '#ea580c', // orange
            '#0d9488', // teal
        ];
        return colors[index % colors.length];
    };

    const getBackgroundColorByIndex = (index: number): string => {
        const colors = [
            'rgba(37, 99, 235, 0.1)',
            'rgba(22, 163, 74, 0.1)',
            'rgba(220, 38, 38, 0.1)',
            'rgba(147, 51, 234, 0.1)',
            'rgba(234, 88, 12, 0.1)',
            'rgba(13, 148, 136, 0.1)',
        ];
        return colors[index % colors.length];
    };

    const userSummary = transactions.reduce<Record<string, {
        count: number;
        total: number;
        lastTransaction: Date;
        products: Record<string, { count: number, title: string }>;
        userName: string;
        userEmail: string;
        userPhotoURL: string;
    }>>((acc, t) => {
        const userId = t.userId;

        if (!acc[userId]) {
            acc[userId] = {
                count: 0,
                total: 0,
                lastTransaction: t.createdAt.toDate(),
                products: {},
                userName: t.userName,
                userEmail: t.userEmail,
                userPhotoURL: t.userPhotoURL
            };
        }
        acc[userId].count += 1;
        acc[userId].total += t.amount;

        const projectId = t.projectId;
        if (!acc[userId].products[projectId]) {
            acc[userId].products[projectId] = {
                count: 0,
                title: t.projectTitle
            };
        }
        acc[userId].products[projectId].count += 1;

        // Update last transaction date if this one is more recent
        if (t.createdAt.toDate() > acc[userId].lastTransaction) {
            acc[userId].lastTransaction = t.createdAt.toDate();
        }

        return acc;
    }, {});

    // Fungsi untuk mengurutkan dan memfilter user
    const getSortedAndFilteredUsers = () => {
        // Filter berdasarkan kueri pencarian
        let filteredUsers = Object.entries(userSummary);

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filteredUsers = filteredUsers.filter(([, data]) => {
                const fullName = data.userName?.toLowerCase() || '';
                const email = data.userEmail?.toLowerCase() || '';
                return fullName.includes(query) || email.includes(query);
            });
        }

        // Urutkan berdasarkan opsi yang dipilih
        return filteredUsers.sort((a, b) => {
            const [, userA] = a;
            const [, userB] = b;

            switch (sortOption) {
                case 'total-desc':
                    return userB.total - userA.total;
                case 'total-asc':
                    return userA.total - userB.total;
                case 'count-desc':
                    return userB.count - userA.count;
                case 'count-asc':
                    return userA.count - userB.count;
                case 'recent':
                    return userB.lastTransaction.getTime() - userA.lastTransaction.getTime();
                default:
                    return 0;
            }
        });
    };

    if (isLoading) {
        return <RekapSkeleton />
    }

    if (transactions.length === 0) {
        return <div className="flex justify-center items-center h-full">
            <div className="text-gray-500 text-center">
                Tidak ada transaksi
            </div>
        </div>
    }

    return (
        <section className='min-h-full px-0 space-y-6'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 z-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
                            Rekap Transaksi
                        </h1>
                        <p className='text-slate-600 text-sm md:text-base'>Kelola dan organisir transaksi berdasarkan tanggal</p>
                    </div>

                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="group w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary/90 to-primary rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="font-medium">Filter Tanggal</span>
                    </button>
                </div>

                {/* Date Filter */}
                {showFilter && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tanggal Awal</label>
                            <input
                                type="date"
                                name="startDate"
                                value={dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : ''}
                                onChange={handleDateChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tanggal Akhir</label>
                            <input
                                type="date"
                                name="endDate"
                                value={dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : ''}
                                onChange={handleDateChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            />
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg w-full"
            >
                <div style={containerStyle}>
                    <Line
                        options={options}
                        data={chartData}
                        className="w-full h-full"
                    />
                </div>
            </motion.div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg"
            >
                <h3 className="text-xl font-semibold mb-6">Daftar Transaksi Terbaru</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Pembeli</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Produk</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>

                            {transactions.map((transaction) => (
                                <tr key={transaction.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {transaction.createdAt.toDate().toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {transaction.orderId}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={transaction.userPhotoURL}
                                                alt={transaction.userName}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            {transaction.userName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={transaction.imageUrl}
                                                alt={transaction.projectTitle}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 rounded"
                                            />
                                            {transaction.projectTitle}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'success'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-right">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(transaction.amount)}
                                    </td>
                                </tr>
                            ))}
                            {/* Total per User */}
                            <tr className="bg-gray-50 font-semibold">
                                <td colSpan={5} className="px-6 py-4 text-sm text-gray-700">
                                    Total Transaksi ({transactions.length} transaksi)
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 text-right">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    }).format(transactions.reduce((sum, t) => sum + t.amount, 0))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Summary per User */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">Ringkasan per Pengguna</h3>
                    <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 bg-primary/10 rounded-2xl">
                            <span className="text-sm font-medium text-primary">
                                {Object.keys(userSummary).length} Pengguna Aktif
                            </span>
                        </div>
                        <div className="px-4 py-2 bg-green-100 rounded-2xl">
                            <span className="text-sm font-medium text-green-600">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(transactions.reduce((sum, t) => sum + t.amount, 0))} Total Transaksi
                            </span>
                        </div>
                    </div>
                </div>

                {/* User sorting and filtering options */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <select
                        className="px-4 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="total-desc">Total Transaksi (Tertinggi)</option>
                        <option value="total-asc">Total Transaksi (Terendah)</option>
                        <option value="count-desc">Jumlah Transaksi (Terbanyak)</option>
                        <option value="count-asc">Jumlah Transaksi (Tersedikit)</option>
                        <option value="recent">Transaksi Terbaru</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    />
                </div>

                {/* Tampilkan hasil filter dan pencarian */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getSortedAndFilteredUsers().length > 0 ? (
                        getSortedAndFilteredUsers().map(([userId, data]) => {
                            return (
                                <motion.div
                                    key={userId}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="relative">
                                            <Image
                                                src={data.userPhotoURL || '/default-avatar.png'}
                                                alt={data.userName || 'User'}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 rounded-2xl object-cover"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-800 truncate">
                                                {data.userName || 'Unknown User'}
                                            </h4>
                                            <p className="text-sm text-gray-500 truncate">
                                                {data.userEmail || 'No email'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Terakhir transaksi: {data.lastTransaction.toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">
                                                    Transaksi
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800">
                                                {data.count}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">
                                                    Total
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                }).format(data.total)}
                                            </span>
                                        </div>

                                        {/* Top purchased products */}
                                        {Object.entries(data.products).length > 0 && (
                                            <div className="mt-4">
                                                <h5 className="text-xs font-medium text-gray-500 mb-2">Produk yang Dibeli:</h5>
                                                <div className="max-h-20 overflow-y-auto pr-2 space-y-1.5">
                                                    {Object.entries(data.products).map(([productId, product]) => (
                                                        <div key={productId} className="flex items-center justify-between">
                                                            <span className="text-xs text-gray-600 truncate max-w-[70%]">
                                                                {product.title}
                                                            </span>
                                                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                                                {product.count}x
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-3 text-center py-8 text-gray-500">
                            Tidak ada pengguna yang cocok dengan pencarian
                        </div>
                    )}
                </div>

                {/* Tampilkan summary jumlah hasil pencarian jika ada filter */}
                {searchQuery && (
                    <div className="mt-4 text-sm text-gray-600">
                        Menampilkan {getSortedAndFilteredUsers().length} dari {Object.keys(userSummary).length} pengguna
                    </div>
                )}
            </motion.div>
        </section>
    )
}