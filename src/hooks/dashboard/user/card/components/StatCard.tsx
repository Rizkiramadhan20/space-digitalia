'use client';

import React from 'react';

import { StatCardProps } from "@/hooks/dashboard/user/card/types/types";

export default function StatCard({
    icon,
    iconBgColor,
    iconColor,
    value,
    label,
    badgeText = '',
    badgeBgColor = 'bg-emerald-100/50',
    badgeTextColor = 'text-emerald-600'
}: StatCardProps) {
    return (
        <div className="flex flex-col bg-white backdrop-blur-lg rounded-3xl p-6 transition-all duration-300 border border-gray-300">
            <div className="flex items-center justify-between">
                <div className={`w-14 h-14 ${iconBgColor} backdrop-blur rounded-2xl flex items-center justify-center`}>
                    <div className={`w-7 h-7 ${iconColor}`}>{icon}</div>
                </div>
                {badgeText && (
                    <span className={`px-4 py-1.5 ${badgeBgColor} backdrop-blur ${badgeTextColor} text-sm font-medium rounded-full`}>
                        {badgeText}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <h3 className="text-3xl font-bold mb-2">{value}</h3>
                <p className="text-slate-600 text-sm font-medium">{label}</p>
            </div>
        </div>
    );
} 