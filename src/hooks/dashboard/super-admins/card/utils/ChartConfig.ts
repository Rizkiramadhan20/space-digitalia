import { ChartOptions, TooltipItem } from 'chart.js';

export const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            type: 'linear',
            beginAtZero: true,
            ticks: {
                callback: function (tickValue: string | number): string {
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
                label: function (tooltipItem: TooltipItem<'line'>): string {
                    const value = Number(tooltipItem.raw);
                    return 'Rp ' + value.toLocaleString('id-ID');
                }
            }
        }
    }
} as const;

export const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem: TooltipItem<'doughnut'>): string {
                    const value = Number(tooltipItem.raw);
                    return `${tooltipItem.label}: ${value}%`;
                }
            }
        }
    }
} as const;