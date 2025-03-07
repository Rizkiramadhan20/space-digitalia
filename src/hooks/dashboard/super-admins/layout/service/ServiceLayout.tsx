"use client"

import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { useServiceData } from '@/hooks/dashboard/super-admins/layout/service/lib/FetchService';

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/service/content/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/service/content/DeleteModal';

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/layout/featured/FeaturedSkelaton';

import { ServiceFormData } from '@/hooks/dashboard/super-admins/layout/service/lib/service';

import Image from 'next/image';

import { initialFormData } from '@/hooks/dashboard/super-admins/layout/service/lib/service';

import { containerVariants, itemVariants, headerAnimations } from '@/hooks/dashboard/super-admins/layout/service/lib/animation';

export default function ServiceLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        createContent,
        updateContent,
        deleteContent,
        fetchContents
    } = useServiceData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null);
    const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch data on mount
    useEffect(() => {
        fetchContents();
    }, [fetchContents]);

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    const handleSubmit = async () => {
        const success = isEditing && editingId
            ? await updateContent(editingId, formData, selectedImage, selectedProfileImage)
            : await createContent(formData, selectedImage, selectedProfileImage);

        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData(initialFormData);
        setSelectedImage(null);
        setSelectedProfileImage(null);
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.close();
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteContent(deleteId);
            setDeleteId(null);
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
        }
    };

    const openModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    if (isLoading) {
        return <FeaturedSkelaton />;
    }

    return (
        <motion.section
            {...headerAnimations.section}
            className='min-h-full px-0 sm:px-4'
        >
            {/* Header Section */}
            <motion.div
                {...headerAnimations.header}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-8"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="space-y-1"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                        >
                            Service Gallery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='text-gray-500'
                        >
                            Manage and organize your service images
                        </motion.p>
                    </motion.div>

                    <motion.button
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            resetForm()
                            openModal()
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                    >
                        <motion.svg
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </motion.svg>
                        Add Service
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Featured Content Display */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {contents.map((content, index) => (
                    <motion.div
                        key={content.id}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.03,
                            y: -5,
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                            }
                        }}
                        className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        <motion.div
                            className="relative aspect-[4/3] w-full overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={content.imageUrl}
                                alt={content.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                            className="p-3 sm:p-5 space-y-2 sm:space-y-3"
                        >
                            <motion.h2
                                className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 * index, duration: 0.5 }}
                            >
                                {content.title}
                            </motion.h2>
                            <motion.p
                                className="text-xs sm:text-sm text-gray-600 line-clamp-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 * index, duration: 0.5 }}
                            >
                                {content.description}
                            </motion.p>
                            <motion.div
                                className="pt-2 sm:pt-3 flex flex-col sm:flex-row gap-2 justify-end"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 * index, duration: 0.5 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setIsEditing(true);
                                        setEditingId(content.id || null);
                                        setFormData({
                                            title: content.title,
                                            description: content.description,
                                            imageUrl: content.imageUrl,
                                            profile: content.profile
                                        });
                                        openModal();
                                    }}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <motion.svg
                                        whileHover={{ rotate: 15 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </motion.svg>
                                    Edit
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setDeleteId(content.id || null);
                                        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                        deleteModal?.showModal();
                                    }}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <motion.svg
                                        whileHover={{ rotate: 15 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </motion.svg>
                                    Delete
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Modal */}
            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                selectedProfileImage={selectedProfileImage}
                setSelectedProfileImage={setSelectedProfileImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={resetForm}
            />

            {/* Delete Modal */}
            <DeleteModal
                onConfirm={handleDelete}
                onClose={() => {
                    setDeleteId(null);
                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                    deleteModal?.close();
                }}
            />
        </motion.section>
    );
}