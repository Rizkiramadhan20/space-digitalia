import { motion } from 'framer-motion';

import Image from 'next/image';

import { CompanyTableProps } from '@/hooks/dashboard/super-admins/layout/company/lib/company';

export default function CompanyTable({ contents, onEdit, onDelete }: CompanyTableProps) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200"
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <motion.thead
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="bg-slate-50 border-b border-slate-200"
                    >
                        <tr>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-24">Image</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">URL</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-24">Actions</th>
                        </tr>
                    </motion.thead>
                    <tbody className="divide-y divide-slate-200">
                        {contents.map((content, index) => (
                            <motion.tr
                                key={content.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ backgroundColor: 'rgba(241, 245, 249, 0.5)' }}
                                className="hover:bg-slate-50/50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <motion.div
                                        className="flex justify-center"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                                            <Image
                                                src={content.imageUrl}
                                                alt="Company image"
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </motion.div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                        className="text-sm text-slate-700 truncate max-w-[300px] sm:max-w-md mx-auto"
                                    >
                                        {content.imageUrl}
                                    </motion.div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                                        className="flex justify-center gap-3"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                                            onClick={() => onEdit(content)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                                            onClick={() => content.id && onDelete(content.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}