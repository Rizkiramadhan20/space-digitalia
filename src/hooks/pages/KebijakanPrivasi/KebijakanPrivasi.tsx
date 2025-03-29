"use client"
import React from 'react'
import { PolicyHeader } from '@/hooks/pages/KebijakanPrivasi/ui/PolicyHeader'

import { PolicySection } from '@/hooks/pages/KebijakanPrivasi/ui/PolicySection'

import { policyData } from '@/hooks/pages/KebijakanPrivasi/ui/PollicyData'

export default function KebijakanPrivasi() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
            <div className="container mx-auto px-4 sm:px-8 py-8 sm:py-24 max-w-5xl relative z-10">
                <PolicyHeader />

                <div className="space-y-8">
                    {policyData.map((section, index) => (
                        <PolicySection
                            key={index}
                            title={section.title}
                            icon={section.icon}
                            content={section.content}
                        />
                    ))}

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                            <span className="text-sm text-gray-400 mr-3">Terakhir diperbarui:</span>
                            <span className="text-primary font-semibold">
                                {new Date().toLocaleDateString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
