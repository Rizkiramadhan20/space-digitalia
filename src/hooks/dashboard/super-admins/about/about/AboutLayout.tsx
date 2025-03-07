"use client"

import React, { useEffect } from 'react'

import { motion } from "framer-motion"

import Image from 'next/image'

import AboutSkeleton from "@/hooks/dashboard/super-admins/about/about/AboutSkelaton"

import { containerVariants, itemVariants } from '@/hooks/dashboard/super-admins/about/about/lib/animations'

import AboutForm from '@/hooks/dashboard/super-admins/about/about/content/AboutForm'

import DeleteModal from '@/hooks/dashboard/super-admins/about/about/content/DeleteModal'

import { useAbout } from '@/hooks/dashboard/super-admins/about/about/lib/FetchAbout'

export default function AboutLayout() {
    const {
        images,
        loading,
        isLoading,
        isEditing,
        selectedImage,
        deleteLoading,
        formData,
        setIsEditing,
        setSelectedImage,
        setImageToDelete,
        setFormData,
        fetchImages,
        handleEdit,
        handleFormSubmit,
        handleDeleteImage,
        confirmDelete,
    } = useAbout();

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    if (isLoading) {
        return <AboutSkeleton />;
    }

    return (
        <motion.section
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {images.length === 0 && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8"
                >
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-1"
                    >
                        <motion.h1
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                        >
                            About Us
                        </motion.h1>
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className='text-gray-500'
                        >
                            Manage your about us content
                        </motion.p>
                    </motion.div>

                    <motion.button
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        onClick={() => {
                            setIsEditing(false);
                            setSelectedImage(null);
                            setFormData({ title: '', text: '', description: '', image: null });
                            (document.getElementById('about_modal') as HTMLDialogElement)?.showModal();
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-blue-100 hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-medium">Add Content</span>
                    </motion.button>
                </motion.div>
            )}

            {images.map((item) => {
                return (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                    >
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0 place-items-center'>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full aspect-video lg:aspect-square rounded-2xl overflow-hidden group"
                            >
                                <Image
                                    src={item?.imageUrl || "/placeholder.jpg"}
                                    alt="Team working"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </motion.div>

                            <motion.div
                                className="flex flex-col"
                                variants={itemVariants}
                            >
                                <div className="space-y-4">
                                    <motion.span
                                        className="text-sm font-semibold text-blue-600"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item?.text}
                                    </motion.span>

                                    <motion.h2
                                        className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {item?.title}
                                    </motion.h2>

                                    <motion.p
                                        className="text-gray-600 text-lg leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        {item?.description}
                                    </motion.p>
                                </div>

                                {/* Action Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-100 hover:shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span className="font-medium">Edit Content</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleDeleteImage(item.id)}
                                        className="flex-1 px-6 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 hover:border-red-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="font-medium">Delete Content</span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )
            })}

            <AboutForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                handleFormSubmit={handleFormSubmit}
                isEditing={isEditing}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />

            <DeleteModal
                deleteLoading={deleteLoading}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setImageToDelete(null);
                    (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
                }}
            />
        </motion.section>
    )
}
