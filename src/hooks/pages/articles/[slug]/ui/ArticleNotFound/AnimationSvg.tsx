import React from 'react'

import { motion } from 'framer-motion'

export function AnimatedSVG() {
    return (
        <motion.div
            className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto relative"
            animate={{
                y: [0, -20, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <svg className="absolute inset-0 text-purple-500/20" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" className="animate-pulse" />
            </svg>
            <svg className="absolute inset-0 text-blue-500/20" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="35" className="animate-pulse delay-75" />
            </svg>
            <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none" stroke="url(#gradient)" strokeWidth="2">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
                <path d="M20,50 L50,20 L80,50 L50,80 Z" className="animate-pulse" />
                <path d="M50,20 L50,80" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="5" fill="url(#gradient)" className="animate-ping" />
            </svg>
        </motion.div>
    )
}