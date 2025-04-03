"use client"

import React, { useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

import { StatusProjectContent } from '@/hooks/dashboard/super-admins/project/status/lib/schema'

import { statusProjectService } from '@/hooks/dashboard/super-admins/project/status/lib/FetchStatus'

import { StatusProjectModal } from '@/hooks/dashboard/super-admins/project/status/content/StatusModal'

import { StatusTable } from '@/hooks/dashboard/super-admins/project/status/content/StatusTable'

import StatusProjectSkelaton from '@/hooks/dashboard/super-admins/project/status/StatusProjectSkelaton'

export default function CategoryProjectLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [statusProject, setStatusProject] = useState<StatusProjectContent[]>([])
    const [formData, setFormData] = useState<StatusProjectContent>({
        title: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        fetchStatusProject()
    }, [])

    const fetchStatusProject = async () => {
        try {
            const data = await statusProjectService.fetchStatusProject()
            setStatusProject(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching status project:', error)
            setIsLoading(false)
        }
    }

    // Create/Update category
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await statusProjectService.updateStatusProject(editingId, formData)
                toast.success('Status project updated successfully!')
            } else {
                await statusProjectService.createStatusProject(formData)
                toast.success('Status project created successfully!')
            }

            // Reset form
            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            fetchStatusProject()

            // Close modal
            const modal = document.getElementById('status_project_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting status project:', error)
            toast.error('Failed to save status project. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await statusProjectService.deleteStatusProject(id)
            fetchStatusProject()
            toast.success('Status project deleted successfully!')
        } catch (error) {
            console.error('Error deleting status project:', error)
            toast.error('Failed to delete status project. Please try again.')
        }
    }

    const handleEdit = (statusProject: StatusProjectContent) => {
        setIsEditing(true)
        setEditingId(statusProject.id || null)
        setFormData({ title: statusProject.title })
        const modal = document.getElementById('status_project_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('status_project_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    if (isLoading) {
        return <StatusProjectSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Status Project
                        </h1>
                        <p className='text-gray-500'>Manage and organize your status project</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Status Project
                    </button>
                </div>
            </div>

            <StatusTable
                status={statusProject}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <StatusProjectModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                onSubmit={handleSubmit}
                onClose={() => {
                    const modal = document.getElementById('status_project_modal') as HTMLDialogElement | null
                    modal?.close()
                    setFormData({ title: '' })
                }}
                onChange={(value: string) => setFormData({ title: value })}
            />
        </section>
    )
}
