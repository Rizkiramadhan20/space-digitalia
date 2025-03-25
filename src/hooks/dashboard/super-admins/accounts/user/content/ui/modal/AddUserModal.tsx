import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { modalBackdropVariants, modalContentVariants, modalTitleVariants, modalFormVariants } from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'

import { NewUser } from '@/hooks/dashboard/super-admins/accounts/user/types/users'

import { formatPhoneNumberForDisplay } from '@/hooks/dashboard/super-admins/accounts/user/lib/Formatter'

interface AddUserModalProps {
    show: boolean
    onClose: () => void
    onSubmit: (user: NewUser) => Promise<void>
}

export function AddUserModal({ show, onClose, onSubmit }: AddUserModalProps) {
    const [isCreating, setIsCreating] = useState(false)
    const [newUser, setNewUser] = useState<NewUser>({
        email: '',
        password: '',
        displayName: '',
        phoneNumber: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        try {
            await onSubmit(newUser)
            onClose()
            setNewUser({ email: '', password: '', displayName: '', phoneNumber: '' })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <AnimatePresence>
            {show && (
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
                        <motion.h3
                            variants={modalTitleVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-lg sm:text-xl font-semibold text-gray-900 mb-4"
                        >
                            Add New User
                        </motion.h3>
                        <motion.form
                            onSubmit={handleSubmit}
                            variants={modalFormVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    value={newUser.displayName}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, displayName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={newUser.phoneNumber}
                                    onChange={(e) => {
                                        const formattedNumber = formatPhoneNumberForDisplay(e.target.value)
                                        setNewUser(prev => ({ ...prev, phoneNumber: formattedNumber }))
                                    }}
                                    placeholder="+1234567890"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Enter number with country code (e.g., +1 for US, +44 for UK, +62 for Indonesia)
                                </p>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose()
                                        setNewUser({ email: '', password: '', displayName: '', phoneNumber: '' })
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                                    disabled={isCreating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white
                                        ${isCreating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                                    `}
                                >
                                    {isCreating ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating...</span>
                                        </div>
                                    ) : (
                                        'Create User'
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}