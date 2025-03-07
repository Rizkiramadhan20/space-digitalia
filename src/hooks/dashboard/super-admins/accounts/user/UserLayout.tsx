"use client"

import React, { useState } from 'react'

import UserSkelaton from './UserSkelaton'

import Image from 'next/image'

import { toast } from 'react-hot-toast'

import { auth } from '@/utils/firebase'

import { motion, AnimatePresence } from 'framer-motion'

import { Pagination } from '@/base/helper/Pagination'

import {
    tableRowVariants,
    containerVariants,
    modalBackdropVariants,
    modalContentVariants,
    modalTitleVariants,
    modalFormVariants,
    sectionVariants
} from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'

import { useUsers } from '@/hooks/dashboard/super-admins/accounts/user/lib/FetchUsers'

import { formatPhoneNumberForDisplay } from '@/hooks/dashboard/super-admins/accounts/user/lib/Formatter'

import { UserAccount } from '@/hooks/dashboard/super-admins/accounts/user/lib/users'

export default function UserLayout() {
    const { users, setUsers, loading } = useUsers()
    const [deletingUsers, setDeletingUsers] = useState<string[]>([])
    const [userToDelete, setUserToDelete] = useState<string | null>(null)
    const [updatingStatus, setUpdatingStatus] = useState<string[]>([])
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        displayName: '',
        phoneNumber: '',
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10

    const handleDeleteUser = async (uid: string) => {
        try {
            setDeletingUsers(prev => [...prev, uid])
            const idToken = await auth.currentUser?.getIdToken()
            if (!idToken) {
                toast.error('Authentication required')
                return
            }

            const response = await fetch(`/api/admins/users/${uid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to delete user')
            }

            setUsers(users.filter(user => user.uid !== uid))
            toast.success('User deleted successfully')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete user')
        } finally {
            setDeletingUsers(prev => prev.filter(id => id !== uid))
            setUserToDelete(null)
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
        }
    }

    const handleToggleStatus = async (uid: string, currentStatus: boolean) => {
        if (currentStatus) {
            const user = users.find(u => u.uid === uid);
            setSelectedUser(user || null);
            setShowStatusModal(true);
            return;
        }

        await updateUserStatus(uid, currentStatus);
    }

    const updateUserStatus = async (uid: string, currentStatus: boolean) => {
        try {
            setUpdatingStatus(prev => [...prev, uid])
            const idToken = await auth.currentUser?.getIdToken()
            if (!idToken) {
                toast.error('Authentication required')
                return
            }

            const response = await fetch(`/api/admins/users/${uid}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !currentStatus })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to update user status')
            }

            setUsers(users.map(user =>
                user.uid === uid ? { ...user, isActive: !currentStatus } : user
            ))
            toast.success('User status updated successfully')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update user status')
        } finally {
            setUpdatingStatus(prev => prev.filter(id => id !== uid))
            setShowStatusModal(false)
            setSelectedUser(null)
        }
    }

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsCreating(true);
            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                toast.error('Authentication required');
                return;
            }

            const response = await fetch('/api/admins/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create user');
            }

            const { user } = await response.json();
            setUsers(prev => [...prev, user]);
            toast.success('User created successfully');
            setShowAddModal(false);
            setNewUser({ email: '', password: '', displayName: '', phoneNumber: '' });
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create user');
        } finally {
            setIsCreating(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase()
        const matchesSearch = (
            user.displayName?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.phoneNumber?.toLowerCase().includes(query)
        )

        const matchesStatus =
            statusFilter === 'all' ? true :
                statusFilter === 'active' ? user.isActive :
                    !user.isActive

        return matchesSearch && matchesStatus
    })

    // Calculate pagination
    const offset = currentPage * itemsPerPage
    const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage)
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    }

    if (loading) {
        return <UserSkelaton />
    }

    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className='flex flex-col gap-1.5'>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Users List</h1>
                    <p className="text-sm md:text-base text-gray-500">Manage and track your users</p>
                </div>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center md:justify-start gap-2 hover:shadow-indigo-100 hover:shadow-lg active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add User
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or phone..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="w-full md:w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white backdrop-blur-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200/80">
                        <thead className="bg-gray-50/50 backdrop-blur-sm">
                            <tr>
                                <th className="px-4 sm:px-6 py-5 text-left text-xs sm:text-sm font-semibold text-gray-600 tracking-wider">Name</th>
                                <th className="px-4 sm:px-6 py-5 text-left text-xs sm:text-sm font-semibold text-gray-600 tracking-wider">Email</th>
                                <th className="hidden lg:table-cell px-4 sm:px-6 py-5 text-left text-xs sm:text-sm font-semibold text-gray-600 tracking-wider">Phone</th>
                                <th className="px-4 sm:px-6 py-5 text-left text-xs sm:text-sm font-semibold text-gray-600 tracking-wider">Status</th>
                                <th className="px-4 sm:px-6 py-5 text-xs sm:text-sm font-semibold text-gray-600 tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="divide-y divide-gray-100/80 bg-white"
                        >
                            {paginatedUsers.map((user, index) => (
                                <motion.tr
                                    key={user.uid}
                                    variants={tableRowVariants}
                                    custom={index}
                                    className="hover:bg-gray-50/80 transition-colors duration-200"
                                >
                                    <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            {user.photoURL ? (
                                                <Image
                                                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl object-cover border border-gray-100/80 shadow-sm"
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    width={48}
                                                    height={48}
                                                />
                                            ) : (
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shadow-sm border border-gray-100/80">
                                                    <span className="text-gray-600 text-base sm:text-lg font-medium">{user.displayName?.[0]}</span>
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm sm:text-base font-medium text-gray-900">{user.displayName}</div>
                                                <div className="text-xs text-gray-500 lg:hidden">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 sm:px-6 py-5 whitespace-nowrap hidden lg:table-cell">
                                        <span className="text-sm text-gray-600">{user.email}</span>
                                    </td>

                                    <td className="hidden lg:table-cell px-4 sm:px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{formatPhoneNumberForDisplay(user.phoneNumber || '')}</span>
                                    </td>

                                    <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                                        <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-medium rounded-full transition-colors duration-200 ${user.isActive
                                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                                            : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                                            }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-4 sm:px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="form-control">
                                                <select
                                                    value={user.isActive ? 'active' : 'inactive'}
                                                    onChange={() => handleToggleStatus(user.uid, user.isActive)}
                                                    disabled={updatingStatus.includes(user.uid)}
                                                    className={`select select-bordered select-sm ${updatingStatus.includes(user.uid)
                                                        ? 'select-disabled'
                                                        : ''
                                                        }`}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setUserToDelete(user.uid);
                                                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                                    deleteModal?.showModal();
                                                }}
                                                disabled={deletingUsers.includes(user.uid)}
                                                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${deletingUsers.includes(user.uid)
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                                                    }`}
                                            >
                                                {deletingUsers.includes(user.uid) ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>

                {/* Add Pagination component */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Status Update Modal */}
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

            {/* Delete Modal - Modern styling */}
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

            {/* Add User Modal - Enhanced animation */}
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
                                            onChange={(e) => setNewUser(prev => ({ ...prev, displayName: e.target.value }))}
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
                                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
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
                                                const formattedNumber = formatPhoneNumberForDisplay(e.target.value);
                                                setNewUser(prev => ({ ...prev, phoneNumber: formattedNumber }));
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
        </motion.section>
    )
}
