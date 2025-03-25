import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { UserAccount } from '@/hooks/dashboard/super-admins/accounts/user/types/users'

import { modalBackdropVariants, modalContentVariants } from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'

interface StatusUpdateModalProps {
    show: boolean
    user: UserAccount | null
    onClose: () => void
    onConfirm: (uid: string, currentStatus: boolean) => Promise<void>
    updating: string[]
}

export function StatusUpdateModal({
    show,
    user,
    onClose,
    onConfirm,
    updating
}: StatusUpdateModalProps) {
    const isUpdating = user ? updating.includes(user.uid) : false

    return (
        <AnimatePresence>
            {show && user && (
                <motion.div
                    variants={modalBackdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        variants={modalContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            Confirm Status Change
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to deactivate this user? They will not be able to access their account while inactive.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className={`px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                                    }`}
                                onClick={onClose}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 flex items-center gap-2 ${isUpdating
                                    ? 'bg-red-400 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                onClick={() => onConfirm(user.uid, user.isActive)}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-white">Deactivating...</span>
                                    </>
                                ) : (
                                    <span className="text-white">Deactivate</span>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}