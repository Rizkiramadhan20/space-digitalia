import React from 'react'

interface ProjectMetricsProps {
    viewCount: number
}

export default function ProjectMetrics({ viewCount }: ProjectMetricsProps) {
    return (
        <div className="space-y-6 mb-8">
            {/* Project Metrics Grid */}
            <div className="grid grid-cols-1 gap-4">
                {[
                    {
                        label: 'Views',
                        value: viewCount,
                        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
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