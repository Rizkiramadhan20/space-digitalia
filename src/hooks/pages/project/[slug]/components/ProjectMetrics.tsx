import React from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

interface ProjectMetricsProps {
    project: ProjectType
    viewCount: number
}

export default function ProjectMetrics({ project, viewCount }: ProjectMetricsProps) {
    return (
        <div className="space-y-6 mb-8">
            {/* Rating Card */}
            <div className="bg-primary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => {
                            const rating = project.averageRating || 0;
                            const isFilled = i < Math.floor(rating);
                            const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5;

                            return (
                                <svg key={i}
                                    className={`w-5 h-5 ${isFilled
                                        ? 'text-yellow-500'
                                        : isHalf
                                            ? 'text-yellow-500'
                                            : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                    fill={isHalf ? "url(#half-star)" : "currentColor"}
                                    viewBox="0 0 24 24"
                                >
                                    {isHalf ? (
                                        <defs>
                                            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="50%" stopColor="currentColor" />
                                                <stop offset="50%" stopColor="rgb(209 213 219)" />
                                            </linearGradient>
                                        </defs>
                                    ) : null}
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            );
                        })}
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">{(project.averageRating || 0).toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">
                        ({project.ratingCount || 0} ratings)
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span>Verified</span>
                    </div>
                </div>
            </div>

            {/* Project Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    {
                        label: 'Downloads',
                        value: project.downloads,
                        icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    },
                    {
                        label: 'Views',
                        value: viewCount,
                        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    },
                    {
                        label: 'Stock',
                        value: project.stock,
                        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                    },
                    {
                        label: 'Sold',
                        value: project.sold,
                        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    },
                    {
                        label: 'Delivery',
                        value: project.delivery,
                        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                    }
                ].map((stat) => (
                    <div key={stat.label}
                        className="group relative bg-card/50 rounded-xl p-4 
                            hover:bg-primary/5 transition-all duration-300
                            border border-border/50 hover:border-primary/20">
                        <div className="flex items-center gap-2 mb-2 text-primary/80">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                            </svg>
                            <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold text-foreground">
                            {stat.value?.toLocaleString() || 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
} 