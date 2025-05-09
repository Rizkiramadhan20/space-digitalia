"use client"

import React, { useState, useEffect } from 'react'

import { FaWhatsapp } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";

import { AnimatedX } from "@/base/popup/modal/Close";

import ViewModal from "@/base/popup/modal/ViewModal";

import {
    textVariants,
    characterVariants,
    buttonContainerVariants,
    buttonContainerTransition,
    textContainerVariants,
    textContainerTransition,
    whatsappIconVariants,
    whatsappIconTransition
} from "@/base/popup/animation/animation";

export default function WhatsApp() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const fullText = "Hubungi kami sekarang";

    // Add scroll event listener to show button after scrolling
    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 200px
            const scrollPosition = window.scrollY;
            const scrollThreshold = 200;

            // Calculate scroll progress between 0 and 1
            const progress = Math.min(scrollPosition / scrollThreshold, 1);
            setScrollProgress(progress);

            if (progress >= 0.5) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll);

        // Check initial scroll position
        handleScroll();

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleButtonClick = () => {
        if (isModalOpen) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showButton && (
                    <motion.div
                        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
                        initial={buttonContainerVariants.initial}
                        animate={{ x: 0, opacity: scrollProgress * 2 - 1 }}
                        exit={buttonContainerVariants.exit}
                        transition={buttonContainerTransition}
                        onClick={handleButtonClick}
                    >
                        <motion.div
                            className='overflow-hidden'
                            initial={textContainerVariants.initial}
                            animate={textContainerVariants.animate}
                            transition={textContainerTransition}
                        >
                            <motion.span
                                className='text-sm md:text-base font-medium text-gray-700 whitespace-nowrap inline-block'
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {fullText.split("").map((char, index) => (
                                    <motion.span
                                        key={`${char}-${index}`}
                                        variants={characterVariants}
                                        className="inline-block"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </motion.div>

                        <motion.div
                            className='p-2 md:p-3 rounded-full flex items-center justify-center shadow-md'
                            initial={whatsappIconVariants.initial}
                            animate={whatsappIconVariants.animate}
                            whileTap={whatsappIconVariants.whileTap}
                            transition={whatsappIconTransition}
                        >
                            {isModalOpen ?
                                <AnimatedX /> :
                                <FaWhatsapp className="text-2xl md:text-3xl" color='white' />
                            }
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Popup Modal */}
            <ViewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}