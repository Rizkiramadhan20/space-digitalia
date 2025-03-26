import React from 'react'
import { motion } from 'framer-motion'

import Link from 'next/link'

import { IoLocation } from "react-icons/io5"

import { CgMail } from "react-icons/cg";

export default function TopBar() {
    return (
        <div className="w-full sticky top-0 bg-gray-50 shadow-sm z-40">
            <div className='container mx-auto px-4 lg:px-6'>
                <div className="flex items-center justify-between py-3 text-sm">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="group"
                    >
                        <Link href="mailto:spacedigitalia@gmail.com"
                            className='flex items-center gap-2.5 text-gray-700 group-hover:text-orange-700 underline text-xs md:text-sm font-medium transition-all duration-300'>
                            <motion.span
                                whileHover={{ rotate: 15 }}
                                className="text-lg text-orange-700 no-underline"
                            >
                                <CgMail />
                            </motion.span>
                            <span>spacedigitalia@gmail.com</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-2.5 group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="text-lg text-orange-700"
                        >
                            <IoLocation />
                        </motion.div>
                        <p className="text-xs md:text-sm text-gray-700">
                            Leuwiliang, Bogor
                            <Link href="#" className="ml-2 text-orange-700 hover:text-orange-800 underline transition-all duration-300">
                                Change
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}