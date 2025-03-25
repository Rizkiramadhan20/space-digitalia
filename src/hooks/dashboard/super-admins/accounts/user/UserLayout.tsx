"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import { auth } from '@/utils/firebase'

import { sectionVariants } from '@/hooks/dashboard/super-admins/accounts/user/lib/animation'

import { useUsers } from '@/hooks/dashboard/super-admins/accounts/user/lib/FetchUsers'

import { UserAccount, NewUser } from '@/hooks/dashboard/super-admins/accounts/user/types/users'

import { UserHeader } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/Header'

import { UserFilters } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/userFilters'

import { UserTable } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/UserTable'

import { AddUserModal } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/modal/AddUserModal'

import { DeleteUserModal } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/modal/DeleteUserModal'

import { StatusUpdateModal } from '@/hooks/dashboard/super-admins/accounts/user/content/ui/modal/StatusUpdateModal'

import { Pagination } from '@/base/helper/Pagination'

import UserSkelaton from '@/hooks/dashboard/super-admins/accounts/user/UserSkelaton'

import User from "@/hooks/dashboard/super-admins/accounts/user/content/user"

import { useRouter } from 'next/navigation'

export default function UserLayout() {
    const { users, setUsers, loading } = useUsers()
    const [deletingUsers, setDeletingUsers] = useState<string[]>([])
    const [userToDelete, setUserToDelete] = useState<string | null>(null)
    const [updatingStatus, setUpdatingStatus] = useState<string[]>([])
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const router = useRouter()

    const handleBack = () => {
        router.push('/dashboard/super-admins');
    }

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
        }
    }

    const handleToggleStatus = async (uid: string, currentStatus: boolean) => {
        if (currentStatus) {
            const user = users.find(u => u.uid === uid)
            setSelectedUser(user || null)
            setShowStatusModal(true)
            return
        }

        await updateUserStatus(uid, currentStatus)
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

    const handleCreateUser = async (newUser: NewUser): Promise<void> => {
        try {
            const idToken = await auth.currentUser?.getIdToken()
            if (!idToken) {
                toast.error('Authentication required')
                return
            }

            const response = await fetch('/api/admins/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to create user')
            }

            const { user } = await response.json()
            setUsers(prev => [...prev, user])
            toast.success('User created successfully')
            setShowAddModal(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create user')
        }
    }

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

    const offset = currentPage * itemsPerPage
    const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage)
    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

    if (loading) {
        return <UserSkelaton />
    }

    if (users.length === 0) {
        return <User handleBack={handleBack} />
    }

    return (
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
        >
            <UserHeader onAddUser={() => setShowAddModal(true)} />

            <UserFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            <UserTable
                users={paginatedUsers}
                onDelete={setUserToDelete}
                onStatusChange={handleToggleStatus}
                deletingUsers={deletingUsers}
                updatingStatus={updatingStatus}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
            />

            <StatusUpdateModal
                show={showStatusModal}
                user={selectedUser}
                onClose={() => {
                    setShowStatusModal(false)
                    setSelectedUser(null)
                }}
                onConfirm={updateUserStatus}
                updating={updatingStatus}
            />

            <DeleteUserModal
                userToDelete={userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleDeleteUser}
                deleting={deletingUsers}
            />

            <AddUserModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateUser}
            />
        </motion.section>
    )
}