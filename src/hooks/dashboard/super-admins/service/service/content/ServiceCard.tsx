import Image from 'next/image'

import { motion } from 'framer-motion'

import { ServiceCardProps } from '@/hooks/dashboard/super-admins/service/service/lib/schema'

import { itemVariants } from '@/hooks/dashboard/super-admins/service/service/lib/animation'

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl border border-gray-100 max-w-6xl mx-auto shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-300 p-4 sm:p-6"
        >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="w-full md:w-1/2 aspect-[4/3] relative rounded-2xl overflow-hidden shadow-inner ring-1 ring-black/5">
                    <Image
                        src={service.imageUrl}
                        alt={service.title}
                        className="object-cover transform hover:scale-105 transition-transform duration-500"
                        fill
                        priority
                    />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 line-clamp-2">{service.title}</h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed line-clamp-4">{service.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 md:pt-6">
                        <button
                            onClick={() => onEdit(service)}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
                        >
                            Edit Service
                        </button>
                        <button
                            onClick={() => onDelete(service.id)}
                            className="flex-1 px-6 py-3 border-2 border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
                        >
                            Delete Service
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}