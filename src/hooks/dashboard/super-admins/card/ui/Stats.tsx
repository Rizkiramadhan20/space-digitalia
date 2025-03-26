import React from 'react';

import { FiBarChart2, FiShoppingCart, FiUsers, FiSun, FiMessageCircle, FiFileText } from 'react-icons/fi';

import { MdManageAccounts } from "react-icons/md";

import { StatsSectionProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function StatsSection({ stats, weather }: StatsSectionProps) {
    return (
        <div className="flex flex-wrap gap-4">
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

            {/* Weather Card */}
            <div className="flex-1 min-w-[500px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
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

            <div className="flex-1 min-w-[500px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
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
    );
}