import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import {
    modalBackdropVariants,
    modalContentVariants,
    modalTitleVariants,
    modalFormVariants
} from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'

import { formatPhoneNumberForDisplay } from '@/hooks/dashboard/super-admins/accounts/user/lib/Formatter'

import { AddUserModalProps, DeleteModalProps, StatusModalProps } from '@/hooks/dashboard/super-admins/accounts/user/types/users'

export const AddUserModal: React.FC<AddUserModalProps> = ({
    showAddModal,
    setShowAddModal,
    newUser,
    setNewUser,
    isCreating,
    handleCreateUser
}) => {
    return (
        <dialog id="add_user_modal" className={`modal ${showAddModal ? 'modal-open' : ''}`}>
            <AnimatePresence>
                {showAddModal && (
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
                                onSubmit={handleCreateUser}
                                variants={modalFormVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        value={newUser.displayName}
                                        onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={newUser.phoneNumber}
                                        onChange={(e) => {
                                            const formattedNumber = formatPhoneNumberForDisplay(e.target.value);
                                            setNewUser({ ...newUser, phoneNumber: formattedNumber });
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
                                            setShowAddModal(false);
                                            setNewUser({ email: '', password: '', displayName: '', phoneNumber: '' });
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
        </dialog>
    )
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    userToDelete,
    setUserToDelete,
    handleDeleteUser,
    deletingUsers
}) => {
    return (
        <dialog id="delete_modal" className="modal">
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
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                                    onClick={() => {
                                        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                        deleteModal?.close();
                                        setUserToDelete(null);
                                    }}
                                    disabled={Boolean(userToDelete && deletingUsers.includes(userToDelete))}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2
                                        ${userToDelete && deletingUsers.includes(userToDelete)
                                            ? 'bg-red-400 text-white cursor-not-allowed'
                                            : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                                        }`}
                                    onClick={() => userToDelete && handleDeleteUser(userToDelete)}
                                    disabled={Boolean(userToDelete && deletingUsers.includes(userToDelete))}
                                >
                                    {userToDelete && deletingUsers.includes(userToDelete) ? (
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
        </dialog>
    )
}

export const StatusModal: React.FC<StatusModalProps> = ({
    showStatusModal,
    setShowStatusModal,
    selectedUser,
    setSelectedUser,
    updateUserStatus,
    updatingStatus
}) => {
    return (
        <dialog id="status_modal" className={`modal ${showStatusModal ? 'modal-open' : ''}`}>
            <AnimatePresence>
                {showStatusModal && (
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
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Confirm Status Change</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to deactivate this user? They will not be able to access their account while inactive.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    className={`px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500/20 ${selectedUser && updatingStatus.includes(selectedUser.uid)
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-gray-200'
                                        }`}
                                    onClick={() => {
                                        setShowStatusModal(false);
                                        setSelectedUser(null);
                                    }}
                                    disabled={Boolean(selectedUser && updatingStatus.includes(selectedUser.uid))}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 flex items-center gap-2 ${selectedUser && updatingStatus.includes(selectedUser.uid)
                                        ? 'bg-red-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                    onClick={() => selectedUser && updateUserStatus(selectedUser.uid, selectedUser.isActive)}
                                    disabled={Boolean(selectedUser && updatingStatus.includes(selectedUser.uid))}
                                >
                                    {selectedUser && updatingStatus.includes(selectedUser.uid) ? (
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
        </dialog>
    )
}