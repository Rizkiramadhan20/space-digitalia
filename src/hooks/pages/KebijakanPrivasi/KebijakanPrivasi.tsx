"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function page() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-base-200 to-base-300">
            <div className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <svg className="w-12 h-12 mx-auto mb-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" className="stroke-primary" strokeWidth="2" />
                        <path d="M12 8V12L15 15" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <h1 className="text-4xl font-bold mb-6 text-primary">Kebijakan Privasi</h1>
                    <div className="flex justify-center gap-3">
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">Dokumen Resmi</span>
                        <span className="px-4 py-2 bg-base-200 rounded-lg text-sm font-medium">v1.0</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            title: "1. Informasi yang Kami Kumpulkan",
                            icon: (
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ),
                            content: (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="card-body">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            className="text-base-content mb-4 text-lg"
                                        >
                                            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
                                        </motion.p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { text: "Nama lengkap", icon: "👤" },
                                                { text: "Alamat email", icon: "📧" },
                                                { text: "Nomor telepon", icon: "📱" },
                                                { text: "Alamat", icon: "🏠" }
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                                    className="stats shadow hover:shadow-lg transition-all duration-300"
                                                >
                                                    <div className="stat">
                                                        <div className="stat-figure text-primary text-2xl">
                                                            {item.icon}
                                                        </div>
                                                        <div className="stat-value text-lg">{item.text}</div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        },
                        {
                            title: "2. Penggunaan Informasi",
                            icon: (
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ),
                            content: (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="card-body">
                                        <div className="steps steps-vertical">
                                            {[
                                                "Menyediakan dan memelihara layanan kami",
                                                "Memberitahu Anda tentang perubahan layanan kami",
                                                "Memungkinkan Anda berpartisipasi dalam fitur interaktif",
                                                "Memberikan dukungan pelanggan"
                                            ].map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                                    className="step step-primary"
                                                >
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        },
                        {
                            title: "3. Keamanan Data",
                            icon: (
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ),
                            content: (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="card-body">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            className="alert alert-info shadow-lg"
                                        >
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <span>Keamanan data Anda penting bagi kami. Kami menggunakan prosedur dan fitur keamanan yang sesuai untuk mencoba melindungi data Anda dari akses yang tidak sah.</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        },
                        {
                            title: "4. Cookie",
                            icon: (
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ),
                            content: (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="card-body">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            className="alert shadow-lg"
                                        >
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <span>Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di layanan kami dan menyimpan informasi tertentu.</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        },
                        {
                            title: "5. Perubahan Kebijakan Privasi",
                            icon: (
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ),
                            content: (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="card-body">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            className="alert alert-warning shadow-lg"
                                        >
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun.</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        }
                    ].map((section, index) => (
                        <div
                            key={index}
                            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                            </div>

                            <div className="mt-4">
                                {section.content}
                            </div>
                        </div>
                    ))}

                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center px-6 py-3 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
                            <span className="text-sm text-gray-600 mr-2">Terakhir diperbarui:</span>
                            <span className="text-primary font-medium">
                                {new Date().toLocaleDateString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
