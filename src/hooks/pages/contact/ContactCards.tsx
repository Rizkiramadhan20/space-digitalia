"use client"
import { motion } from 'framer-motion'

import Link from 'next/link'

import { IoCall, IoLocation } from "react-icons/io5"

import { socialMedia } from '@/hooks/pages/contact/lib/data'

export default function ContactCards() {
    return (
        <div className="flex flex-col gap-12 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 lg:gap-12">
                {/* Social Media Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-10">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                            Hubungi Kami
                        </h3>
                        <div className="flex gap-8 items-center">
                            {socialMedia.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-white/90 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    <span className="text-3xl text-gray-800">
                                        <social.icon />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex items-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-10 flex items-center gap-8">
                        <div className="p-5 bg-white/90 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                            <IoCall className="text-4xl text-emerald-600" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-base text-gray-500 font-medium">Hubungi Kami</span>
                            <Link
                                href="tel:+6281298632939"
                                className="text-xl text-gray-800 font-semibold hover:text-emerald-600 transition-colors duration-300"
                            >
                                +62 812 9863 2939
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Location Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex items-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-10 flex items-center gap-8">
                        <div className="p-5 bg-white/90 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                            <IoLocation className="text-4xl text-orange-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-base text-gray-500 font-medium">Kunjungi Kami</span>
                            <Link
                                href="https://maps.app.goo.gl/Tu2aTBAHaxSvbDeL8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-gray-800 font-semibold hover:text-orange-600 transition-colors duration-300"
                            >
                                Jl. Babakan, Leuwiliang, Bogor, Jawa Barat
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}