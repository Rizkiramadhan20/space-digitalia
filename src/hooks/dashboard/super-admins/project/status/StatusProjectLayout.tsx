"use client"

import React, { useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

import { CategoryContent } from '@/hooks/dashboard/super-admins/project/category/lib/schema'

import { categoryService } from '@/hooks/dashboard/super-admins/project/category/lib/FetchCategory'

import { CategoryModal } from '@/hooks/dashboard/super-admins/project/category/content/CategoryModal'

import { CategoryTable } from '@/hooks/dashboard/super-admins/project/category/content/CategoryTable'

import CategoryProjectSkelaton from '@/hooks/dashboard/super-admins/project/category/CategoryProjectSkelaton'

export default function CategoryProjectLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<CategoryContent[]>([])
    const [formData, setFormData] = useState<CategoryContent>({
        title: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const data = await categoryService.fetchCategories()
            setCategories(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching categories:', error)
            setIsLoading(false)
        }
    }

    // Create/Update category
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await categoryService.updateCategory(editingId, formData)
                toast.success('Category updated successfully!')
            } else {
                await categoryService.createCategory(formData)
                toast.success('Category created successfully!')
            }

            // Reset form
            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            fetchCategories()

            // Close modal
            const modal = document.getElementById('category_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting category:', error)
            toast.error('Failed to save category. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await categoryService.deleteCategory(id)
            fetchCategories()
            toast.success('Category deleted successfully!')
        } catch (error) {
            console.error('Error deleting category:', error)
            toast.error('Failed to delete category. Please try again.')
        }
    }

    const handleEdit = (category: CategoryContent) => {
        setIsEditing(true)
        setEditingId(category.id || null)
        setFormData({ title: category.title })
        const modal = document.getElementById('category_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('category_modal') as HTMLDialogElement | null
        modal?.showModal()
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
                            Categories
                        </h1>
                        <p className='text-gray-500'>Manage and organize your categories</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>
                </div>
            </div>

            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CategoryModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                onSubmit={handleSubmit}
                onClose={() => {
                    const modal = document.getElementById('category_modal') as HTMLDialogElement | null
                    modal?.close()
                    setFormData({ title: '' })
                }}
                onChange={(value) => setFormData({ title: value })}
            />
        </section>
    )
}
