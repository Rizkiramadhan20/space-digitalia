import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

interface DeleteUserModalProps {
    userToDelete: string | null
    onClose: () => void
    onConfirm: (uid: string) => Promise<void>
    deleting: string[]
}

export function DeleteUserModal({
    userToDelete,
    onClose,
    onConfirm,
    deleting
}: DeleteUserModalProps) {
    const isDeleting = userToDelete ? deleting.includes(userToDelete) : false

    return (
        <AnimatePresence>
            {userToDelete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            Confirm Deletion
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                                onClick={onClose}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2
                                    ${isDeleting
                                        ? 'bg-red-400 text-white cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                                    }`}
                                onClick={() => userToDelete && onConfirm(userToDelete)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Deleting...</span>
                                    </div>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}