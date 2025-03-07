"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import { format } from 'date-fns'

import CategoryProjectSkelaton from '@/hooks/dashboard/super-admins/project/category/CategoryProjectSkelaton'

import { TypeFormModal } from '@/hooks/dashboard/super-admins/project/type/content/TypeFormModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/project/type/content/DeleteModal'

import { typeService } from '@/hooks/dashboard/super-admins/project/type/lib/FetchType'

import { TypeContent } from '@/hooks/dashboard/super-admins/project/type/lib/schema'

import { CategoryContent } from '@/hooks/dashboard/super-admins/project/category/lib/schema'

import { collection } from 'firebase/firestore'

import { getDocs } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Pagination } from '@/base/helper/Pagination'

export default function TypeProjectLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [types, setTypes] = useState<TypeContent[]>([])
    const [categories, setCategories] = useState<CategoryContent[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const ITEMS_PER_PAGE = 10
    const [formData, setFormData] = useState<TypeContent>({
        title: '',
        category: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchInitialData = useCallback(async () => {
        try {
            setIsLoading(true);
            const categoriesSnapshot = await getDocs(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string)
            );
            const categoriesData = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                ...doc.data(),
            })) as CategoryContent[];

            const { types: fetchedTypes, totalCount } = await typeService.fetchTypes(
                ITEMS_PER_PAGE,
                currentPage
            );

            setCategories(categoriesData);
            setTypes(fetchedTypes);
            setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        void fetchInitialData();
    }, [fetchInitialData]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.category) {
            toast.error('Please select a category')
            return
        }

        try {
            setIsSubmitting(true)

            const existingType = types.find(
                type => type.title.toLowerCase() === formData.title.toLowerCase() &&
                    (!isEditing || type.id !== editingId)
            )

            if (existingType) {
                toast.error('A type with this title already exists!')
                return
            }

            if (isEditing && editingId) {
                await typeService.updateType(editingId, formData)
                toast.success('Type updated successfully!')
            } else {
                await typeService.createType(formData)
                toast.success('Type created successfully!')
            }

            closeModal()
            resetForm()
            fetchInitialData()
        } catch (error) {
            console.error('Error submitting type:', error)
            toast.error('Failed to save type')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return

        try {
            setIsDeleting(true)
            await typeService.deleteType(deleteId)
            await fetchInitialData()
            toast.success('Type deleted successfully!')
            closeDeleteModal()
        } catch (error) {
            console.error('Error deleting type:', error)
            toast.error('Failed to delete type')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = (type: TypeContent) => {
        setIsEditing(true)
        setEditingId(type.id || null)
        setFormData({ title: type.title, category: type.category })
        openModal()
    }

    const openModal = () => {
        const modal = document.getElementById('type_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const closeModal = () => {
        const modal = document.getElementById('type_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const resetForm = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '', category: '' })
    }

    const openDeleteModal = (id: string) => {
        setDeleteId(id)
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
        deleteModal?.showModal()
    }

    const closeDeleteModal = () => {
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
        deleteModal?.close()
        setDeleteId(null)
    }

    if (isLoading) {
        return <CategoryProjectSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Types
                        </h1>
                        <p className='text-gray-500'>Manage and organize your types</p>
                    </div>

                    <button
                        onClick={() => {
                            resetForm()
                            openModal()
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Type
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Added
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {types.map((type) => (
                                <tr key={type.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
                                        {type.createdAt && format(type.createdAt.toDate(), 'PPpp')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center capitalize">
                                        {type.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex justify-center">
                                        <button
                                            onClick={() => handleEdit(type)}
                                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg mr-2 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(type.id!)}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {types.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                        No types found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <TypeFormModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                categories={categories}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
            />

            <DeleteModal
                isDeleting={isDeleting}
                onDelete={handleDelete}
                onClose={closeDeleteModal}
            />
        </section>
    )
}
