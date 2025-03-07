import { motion } from "framer-motion"

import { searchBarVariants } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/animation"

import { SearchBarProps } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/schema"

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
    return (
        <motion.div
            className="bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            variants={searchBarVariants}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <input
                        type="text"
                        placeholder="Search by description..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}