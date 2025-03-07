import { motion } from "framer-motion"

import { headerVariants, buttonVariants } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/animation"

import { HeaderProps } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/schema"

export const Header = ({ onAddNew }: HeaderProps) => {
    return (
        <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            variants={headerVariants}
        >
            <motion.div className="space-y-1">
                <motion.h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                    Count Testimonials
                </motion.h1>
                <motion.p className='text-gray-500'>
                    Manage your count testimonials
                </motion.p>
            </motion.div>

            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onAddNew}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Add Count Testimonial</span>
            </motion.button>
        </motion.div>
    )
}