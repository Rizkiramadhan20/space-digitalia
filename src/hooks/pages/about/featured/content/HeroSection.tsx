import { motion } from 'framer-motion'

import Link from 'next/link'

export const FetchHero = {
    title: 'Layanan Digital Lengkap untuk Kebutuhan Bisnis',
    description: 'Kami menyediakan solusi digital terpadu meliputi SEO, UI/UX Design, Mobile Applications, dan Web Application untuk mengembangkan bisnis Anda',
    buttonText: 'Contact us',
    buttonLink: '/contact-us'
}

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='flex flex-col gap-6 w-full relative'
        >
            <div className='absolute inset-0 w-20 sm:w-24 h-2 rounded-full -top-4 sm:-top-6 bg-gradient-to-r from-gray-900 to-blue-900 opacity-50'></div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight'
            >
                {FetchHero.title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-sm sm:text-base text-gray-600 leading-relaxed'
            >
                {FetchHero.description}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link
                    href={FetchHero.buttonLink}
                    className='inline-flex w-fit px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300'
                >
                    {FetchHero.buttonText}
                </Link>
            </motion.div>
        </motion.div>
    )
}