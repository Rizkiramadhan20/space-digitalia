"use client"

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import HomeSkelaton from '@/hooks/dashboard/super-admins/layout/home/HomeSkelaton'

import { HomeContent } from '@/hooks/dashboard/super-admins/layout/home/lib/home'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/home/content/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/home/content/DeleteModal'

import { useHomeData } from '@/hooks/dashboard/super-admins/layout/home/lib/FetchHome'

const initialFormData: HomeContent = {
    title: '',
    description: '',
    button1: { text: '', link: '' },
    button2: { text: '', link: '' },
    imageUrl: ''
};

export default function HomeLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useHomeData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const [formData, setFormData] = useState<HomeContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            let imageUrl = formData.imageUrl
            if (selectedImage) {
                imageUrl = await handleImageUpload(selectedImage)
            }

            if (isEditing && editingId) {
                await handleUpdate(editingId, {
                    ...formData,
                    imageUrl: selectedImage ? imageUrl : formData.imageUrl
                })
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData, imageUrl)
                toast.success('Content created successfully!')
            }

            resetForm()
            closeContentModal()
        } catch (error) {
            console.error('Error submitting content:', error)
            toast.error('Failed to save content. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData(initialFormData)
        setSelectedImage(null)
    }

    const closeContentModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const closeDeleteModal = () => {
        const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            await handleDelete(deleteId)
            closeDeleteModal()
        }
    }

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    if (isLoading) {
        return <HomeSkelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
        >
            <AnimatePresence mode="wait">
                {contents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm"
                    >
                        <div className="space-y-2">
                            <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
                                Home
                            </h1>
                            <p className='text-gray-600'>Manage your home page hero section</p>
                        </div>

                        <button
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                            onClick={() => {
                                setIsEditing(false)
                                setEditingId(null)
                                setFormData(initialFormData)
                                setSelectedImage(null)
                                const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                modal?.showModal()
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create Content
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Content Display */}
            <AnimatePresence mode="wait">
                {contents.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                            staggerChildren: 0.1
                        }}
                        className='w-full bg-white rounded-2xl shadow-sm overflow-hidden'
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="p-8 lg:p-12 flex flex-col justify-center"
                            >
                                <div className="space-y-8 max-w-xl">
                                    <div className="space-y-6">
                                        <h2 className='text-3xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
                                            {contents[0].title}
                                        </h2>
                                        <p className='text-sm xl:text-base text-gray-600 leading-relaxed'>{contents[0].description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={contents[0].button1.link}
                                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 text-center min-w-[160px] shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                                        >
                                            {contents[0].button1.text}
                                        </a>
                                        <a
                                            href={contents[0].button2.link}
                                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 text-center min-w-[160px] border border-gray-200 hover:border-gray-300"
                                        >
                                            {contents[0].button2.text}
                                        </a>
                                    </div>

                                    <div className="flex gap-3 pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                setDeleteId(contents[0].id!)
                                                const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                                deleteModal?.showModal()
                                            }}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormData(contents[0])
                                                setIsEditing(true)
                                                setEditingId(contents[0].id || null)
                                                const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                                modal?.showModal()
                                            }}
                                            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Image Section */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative h-[400px] lg:h-full min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200"
                            >
                                <Image
                                    src={contents[0].imageUrl}
                                    alt={contents[0].title}
                                    fill
                                    className="object-cover transition-all duration-700 hover:scale-105"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        className="bg-white rounded-2xl shadow-sm p-8 text-center"
                    >
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">No Content Yet</h3>
                            <p className="text-gray-600">Create your first hero section content to get started.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContentModal
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={closeDeleteModal}
            />
        </motion.section>
    );
}
