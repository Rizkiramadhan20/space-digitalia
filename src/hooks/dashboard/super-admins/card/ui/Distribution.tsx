import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import { doughnutOptions } from '@/hooks/dashboard/super-admins/card/utils/ChartConfig';

import { CategoryDistributionSectionProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function CategoryDistributionSection({ categoryData }: CategoryDistributionSectionProps) {
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

    return (
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
    );
}