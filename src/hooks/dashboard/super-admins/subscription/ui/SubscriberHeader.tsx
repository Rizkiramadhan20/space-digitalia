import { motion } from 'framer-motion'

import { SubscriberHeaderProps } from '@/hooks/dashboard/super-admins/subscription/lib/subscriber'

export const SubscriberHeader = ({ showFilter, setShowFilter }: SubscriberHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 transition-all duration-300 z-10"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div className="space-y-2">
                    <h1 className='text-2xl md:text-3xl font-bold'>
                        Subscription
                    </h1>
                    <p className='text-slate-600 text-sm md:text-base'>
                        Kelola dan organisir subscription berdasarkan tanggal
                    </p>
                </div>

                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="group w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary/90 to-primary rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                    {showFilter ? 'Hide Filter' : 'Show Filter'}
                </button>
            </div>
        </motion.div>
    )
}