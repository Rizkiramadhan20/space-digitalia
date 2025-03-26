import React from 'react';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import { lineChartOptions } from '../utils/ChartConfig';
import { SalesDataItem } from '../types/dashboard';

interface SalesChartSectionProps {
    salesData: SalesDataItem[];
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    selectedPeriod: string;
    setSelectedPeriod: (period: string) => void;
    filterSalesByDate: (date: Date | null, period: string) => void;
}

export default function SalesChartSection({
    salesData,
    startDate,
    setStartDate,
    selectedPeriod,
    setSelectedPeriod,
    filterSalesByDate
}: SalesChartSectionProps) {
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

    return (
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
    );
}