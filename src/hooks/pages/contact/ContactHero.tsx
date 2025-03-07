"use client"
import { motion } from 'framer-motion'

import Image from 'next/image'

import avatar from "@/base/assets/pages/contact/avatar.png"

import location from "@/base/assets/pages/contact/location.png"

export default function ContactHero() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 place-items-center">
            <motion.div
                className="col-span-1 flex flex-col gap-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-full flex xl:justify-start xl:items-start justify-center items-center">
                    <Image
                        src={avatar}
                        alt="Contact Us"
                        priority
                    />
                </div>

                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <h2 className="text-4xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-gray-600 bg-clip-text text-transparent">
                        Transformasi Digital Untuk Bisnis Anda
                    </h2>

                    <p className="text-gray-600 text-xl leading-relaxed">
                        Kami menyediakan jasa pembuatan website profesional, desain grafis, dan solusi digital marketing yang inovatif. Dengan pengalaman dan keahlian kami, kami siap membantu mengembangkan presence digital bisnis Anda ke level berikutnya.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="col-span-1 w-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-full">
                    <Image
                        src={location}
                        alt="Our Location"
                        priority
                    />
                </div>
            </motion.div>
        </div>
    )
}