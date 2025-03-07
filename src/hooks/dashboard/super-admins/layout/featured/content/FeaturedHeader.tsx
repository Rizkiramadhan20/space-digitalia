import { motion } from 'framer-motion'

import { headerVariants } from '@/hooks/dashboard/super-admins/layout/featured/lib/animation'

import { FeaturedHeaderProps } from '@/hooks/dashboard/super-admins/layout/featured/lib/featured'

export const FeaturedHeader = ({ onCreateClick }: FeaturedHeaderProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="bg-white rounded-2xl border border-gray-100 p-6 mb-8"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                        Featured
                    </h1>
                    <p className='text-gray-500'>Manage and organize your featured content</p>
                </div>

                <button
                    onClick={onCreateClick}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Content
                </button>
            </div>
        </motion.div>
    )
}