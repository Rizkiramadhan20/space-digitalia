'use client';

import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Scale,
    CoreScaleOptions,
    ChartOptions,
    TooltipItem,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

import { SalesChartProps } from "@/hooks/dashboard/user/card/types/types";

export default function SalesChart({ salesData }: SalesChartProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

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
                        tooltipItem: TooltipItem<'line'>
                    ): string {
                        const value = Number(tooltipItem.raw);
                        return 'Rp ' + value.toLocaleString('id-ID');
                    }
                }
            }
        }
    } as const;

    return (
        <div className="flex-[2] min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Riwayat Transaksi</h3>
                <div className="flex flex-wrap w-full md:w-auto gap-4 items-center">
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Pilih tanggal"
                    />
                    <select className="w-full md:w-auto text-sm border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50">
                        <option>Minggu Ini</option>
                        <option>Minggu Lalu</option>
                        <option>Bulan Ini</option>
                    </select>
                </div>
            </div>
            <div className="relative w-full h-[350px]">
                {salesData.length > 0 ? (
                    <Line data={lineChartData} options={lineChartOptions} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-[350px] p-4 my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xl font-medium text-gray-600 mb-2">Tidak ada riwayat transaksi</p>
                        <p className="text-sm text-gray-500 text-center">Belum ada transaksi yang tercatat</p>
                    </div>
                )}
            </div>
        </div>
    );
} 