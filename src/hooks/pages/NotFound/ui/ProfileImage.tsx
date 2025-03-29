import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import profile from "@/base/assets/pages/notfound/greg-WWVTIQGY.svg"

export default function ProfileImage() {
    return (
        <motion.div
            className='max-w-md mx-auto sm:mx-0'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <Image
                src={profile}
                alt="image"
                className='w-full h-auto drop-shadow-xl animate-float'
                priority
            />
        </motion.div>
    )
}