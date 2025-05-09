import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedX } from "@/base/popup/modal/Close";
import {
    modalVariants,
    overlayVariants
} from "@/base/popup/animation/animation";

interface ViewModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ViewModal({ isModalOpen, setIsModalOpen }: ViewModalProps) {
    return (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    <motion.div
                        className="fixed z-50"
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <motion.div
                        className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[320px] md:w-[380px] max-w-[90vw] overflow-hidden shadow-xl rounded-xl"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="relative bg-green-500 p-4 rounded-t-xl">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-white/20">
                                    <FaWhatsapp className="text-3xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-lg">Space Digitalia</h3>
                                    <p className="text-white/90 text-sm">Pembuatan Website harga UMKM</p>
                                </div>
                            </div>
                            <button
                                className="absolute top-3 right-3 bg-white/20 rounded-full p-1.5"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <AnimatedX />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="bg-gray-50 p-4 space-y-1">
                            <p className="text-gray-600 text-sm">
                                Jasa pembuatan website profesional dengan harga terjangkau untuk UMKM
                            </p>
                            <p className="text-gray-400 text-xs italic">
                                The team typically replies in a few minutes.
                            </p>
                        </div>

                        {/* Promo Items */}
                        <div className="bg-white">
                            {/* Promo Item 1 */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FaWhatsapp className="text-xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Website Toko Online</h4>
                                        <p className="text-gray-600 text-sm">Website e-commerce dengan fitur lengkap untuk bisnis online Anda</p>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Item 2 */}
                            <div className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FaWhatsapp className="text-xl text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Website Company Profile</h4>
                                        <p className="text-gray-600 text-sm">Website profesional untuk meningkatkan kredibilitas bisnis Anda</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="bg-white p-4 border-t border-gray-100">
                            <button
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                onClick={() => window.open('https://wa.me/+6281398632939?text=Halo%20Space%20Digitalia!%20Saya%20tertarik%20dengan%20layanan%20pembuatan%20website%20Anda.%20Boleh%20tahu%20lebih%20lanjut%20tentang%20paket%20dan%20harganya%3F', '_blank')}
                            >
                                <FaWhatsapp className="text-xl" />
                                <span>Hubungi Kami Sekarang</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
