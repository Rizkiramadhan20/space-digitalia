import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { UserAccount } from '@/hooks/dashboard/super-admins/accounts/user/types/users'
import { tableRowVariants, containerVariants } from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'
import { formatPhoneNumberForDisplay } from '@/hooks/dashboard/super-admins/accounts/user/lib/Formatter'

interface UserTableProps {
    users: UserAccount[]
    onDelete: (uid: string) => void
    onStatusChange: (uid: string, isActive: boolean) => void
    deletingUsers: string[]
    updatingStatus: string[]
}

export function UserTable({
    users,
    onDelete,
    onStatusChange,
    deletingUsers,
    updatingStatus
}: UserTableProps) {
    return (
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
                        {users.map((user, index) => (
                            <UserTableRow
                                key={user.uid}
                                user={user}
                                index={index}
                                onDelete={onDelete}
                                onStatusChange={onStatusChange}
                                isDeleting={deletingUsers.includes(user.uid)}
                                isUpdating={updatingStatus.includes(user.uid)}
                            />
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    )
}

interface UserTableRowProps {
    user: UserAccount
    index: number
    onDelete: (uid: string) => void
    onStatusChange: (uid: string, isActive: boolean) => void
    isDeleting: boolean
    isUpdating: boolean
}

function UserTableRow({
    user,
    index,
    onDelete,
    onStatusChange,
    isDeleting,
    isUpdating
}: UserTableRowProps) {
    return (
        <motion.tr
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
                            onChange={() => onStatusChange(user.uid, user.isActive)}
                            disabled={isUpdating}
                            className={`select select-bordered select-sm ${isUpdating ? 'select-disabled' : ''
                                }`}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        onClick={() => onDelete(user.uid)}
                        disabled={isDeleting}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${isDeleting
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                            }`}
                    >
                        {isDeleting ? (
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
    )
}