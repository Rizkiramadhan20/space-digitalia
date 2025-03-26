import { motion } from "framer-motion";

export default function TestimonialHeader() {
    return (
        <motion.div
            className="text-center mb-16 sm:mb-24 md:mb-32 relative max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <motion.p
                className="text-sm font-medium text-blue-600 tracking-wider mb-3 sm:mb-5 uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Testimonials
            </motion.p>

            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                Kepercayaan Klien, Bukti Nyata <span className="relative">
                    <span className="relative z-10">Kualitas</span>
                    <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-[#BBFF00]/50 -rotate-1"></span>
                </span>
            </motion.h2>
        </motion.div>
    )
}