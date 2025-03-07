"use client"

import React, { useState, useEffect } from 'react'

import { format } from 'date-fns'

import { LicenceContent } from "@/hooks/dashboard/super-admins/project/license/lib/schema"

import { useLicenceOperations } from '@/hooks/dashboard/super-admins/project/license/lib/FetchLicence'

import { LicenceModal } from '@/hooks/dashboard/super-admins/project/license/content/LicenceModal'

import LicenceProjectSkelaton from './LicenceProjectSkelaton'

import { Pagination } from '@/base/helper/Pagination'

export default function LicenceProjectLayout() {
    const [formData, setFormData] = useState<LicenceContent>({ title: '' })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10

    const {
        isLoading,
        licences,
        fetchLicences,
        createLicence,
        updateLicence,
        deleteLicence
    } = useLicenceOperations()

    const offset = currentPage * itemsPerPage
    const currentLicences = licences.slice(offset, offset + itemsPerPage)
    const pageCount = Math.ceil(licences.length / itemsPerPage)

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    }

    useEffect(() => {
        fetchLicences()
    }, [fetchLicences])

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await updateLicence(editingId, formData)
            } else {
                await createLicence(formData)
            }

            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            await fetchLicences()

            const modal = document.getElementById('licence_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting licence:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (licence: LicenceContent) => {
        setIsEditing(true)
        setEditingId(licence.id || null)
        setFormData({ title: licence.title })
        const modal = document.getElementById('licence_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('licence_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const closeModal = () => {
        setFormData({ title: '' })
        const modal = document.getElementById('licence_modal') as HTMLDialogElement | null
        modal?.close()
    }

    if (isLoading) {
        return <LicenceProjectSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Licences
                        </h1>
                        <p className='text-gray-500'>Manage and organize your licences</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Licence
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ditambahkan
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
                            {currentLicences.map((licence) => (
                                <tr key={licence.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
                                        {licence.createdAt && format(licence.createdAt.toDate(), 'PPpp')}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center capitalize">
                                        {licence.title}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex justify-center">
                                        <button
                                            onClick={() => handleEdit(licence)}
                                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg mr-2 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteLicence(licence.id!)}
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
                            {licences.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                                        No licences found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {licences.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <LicenceModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
            />
        </section>
    )
}
