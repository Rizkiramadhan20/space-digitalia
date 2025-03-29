"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { Header } from '@/hooks/pages/TermsofService/ui/Header'

import { SectionItem } from '@/hooks/pages/TermsofService/ui/Item'

import { Footer } from '@/hooks/pages/TermsofService/ui/Footer'

import { termsOfServiceData } from '@/hooks/pages/TermsofService/data/TermsofService'

export default function TermsOfService() {
    return (
        <section className="min-h-screen py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <Header />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>

                    <div className="bg-white/80 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 relative border border-white/20 hover:border-white/30 transition-all duration-300">
                        <div className="space-y-8 md:space-y-10">
                            {termsOfServiceData.map((section, index) => (
                                <SectionItem
                                    key={index}
                                    {...section}
                                    index={index}
                                />
                            ))}
                        </div>

                        <Footer />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
