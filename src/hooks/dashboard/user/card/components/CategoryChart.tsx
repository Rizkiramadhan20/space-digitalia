'use client';

import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import { ChartOptions, TooltipItem } from 'chart.js';

import { CategoryChartProps } from "@/hooks/dashboard/user/card/types/types";

export default function CategoryChart({ categoryData }: CategoryChartProps) {
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
                        tooltipItem: TooltipItem<'doughnut'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return `${tooltipItem.label}: ${value}%`;
                    }
                }
            }
        }
    } as const;

    return (
        <div className="flex-1 min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-gray-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Kategori Pembelian</h3>
            {categoryData.length > 0 ? (
                <>
                    <div className="relative h-[280px] flex justify-center">
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                    <div className="mt-6 space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                        {categoryData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
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
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-[350px] p-4 my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-600 mb-2">Tidak ada data kategori</p>
                    <p className="text-sm text-gray-500 text-center">Belum ada transaksi atau kategorisasi pembelian</p>
                </div>
            )}
        </div>
    );
} 