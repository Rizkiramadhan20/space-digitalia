import Link from 'next/link';

import { motion } from 'framer-motion';

import { HeroContentProps } from '@/components/ui/home/types/schema';

import { heroContentAnimations } from '@/components/ui/home/animation/animation';

export default function HeroContent({ item }: HeroContentProps) {
    return (
        <motion.div
            className='flex flex-col gap-8 lg:gap-10 items-center text-center lg:text-start lg:items-start'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroContentAnimations.container}
        >
            <motion.h1
                className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent'
                style={{ lineHeight: '1.2' }}
                variants={heroContentAnimations.item}
            >
                {item.title}
            </motion.h1>

            <motion.p
                className='text-lg md:text-xl text-gray-600/90 leading-relaxed max-w-2xl'
                variants={heroContentAnimations.item}
            >
                {item.description}
            </motion.p>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto'>
                <motion.div
                    variants={heroContentAnimations.buttonLeft}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <Link
                        href={item.button1.link}
                        className='group relative px-8 py-4 rounded-full bg-blue-600 text-white font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 block w-full sm:w-fit'
                    >
                        <span className='relative z-10'>{item.button1.text}</span>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400 ease-out'></div>
                    </Link>
                </motion.div>

                <motion.div
                    variants={heroContentAnimations.buttonRight}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <Link
                        href={item.button2.link}
                        className='group px-8 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-semibold transition-all duration-500 hover:bg-blue-50/80 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm block w-full sm:w-fit'
                    >
                        {item.button2.text}
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}