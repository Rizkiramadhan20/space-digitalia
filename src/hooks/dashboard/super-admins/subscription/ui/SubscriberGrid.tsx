import { motion } from 'framer-motion'

import { SubscriberGridProps } from '@/hooks/dashboard/super-admins/subscription/lib/subscriber'

export const SubscriberGrid = ({ subscribers }: SubscriberGridProps) => {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribers.map((subscriber, index) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                    key={index}
                    className="p-6 border border-gray-100 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                            className="flex items-start justify-between"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-3 bg-primary/10 rounded-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 17.5L12 22L2 17.5V6.5L12 2L22 6.5V17.5Z" />
                                    <path d="M12 22V12" />
                                    <path d="M22 6.5L12 12L2 6.5" />
                                </svg>
                            </motion.div>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                                className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full"
                            >
                                Active
                            </motion.span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                            className="space-y-3"
                        >
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    {subscriber.email}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    {new Date(subscriber.timestamp).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}