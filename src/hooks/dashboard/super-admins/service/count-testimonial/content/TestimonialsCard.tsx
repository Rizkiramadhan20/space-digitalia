import { motion } from "framer-motion"

import { cardVariants, numberVariants } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/animation"

import { TestimonialCardProps } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/schema"

export const TestimonialCard = ({ testimonial, onEdit, onDelete }: TestimonialCardProps) => {
    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
        >
            <motion.div
                className="flex items-center gap-4 mb-6"
                variants={numberVariants}
            >
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <motion.span
                        className="relative text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.1 }}
                    >
                        {testimonial.number}
                    </motion.span>
                </div>
                <div className="h-10 w-[1px] bg-gradient-to-b from-gray-200 to-transparent"></div>
                <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">Count</span>
            </motion.div>

            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-lg font-medium leading-relaxed text-gray-800 line-clamp-2 group-hover:text-gray-900 transition-colors duration-200">
                    {testimonial.description}
                </h3>
                <div className="flex items-center gap-2 mt-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">
                        {testimonial.createdAt?.toDate().toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <button
                    onClick={() => onEdit(testimonial)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow group/btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-80 group-hover/btn:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="font-medium">Edit</span>
                </button>
                <button
                    onClick={() => onDelete(testimonial.id)}
                    className="flex-1 px-4 py-2.5 border-2 border-red-100 bg-white text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-200 flex items-center justify-center gap-2 group/del"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-80 group-hover/del:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="font-medium">Delete</span>
                </button>
            </motion.div>
        </motion.div>
    )
}