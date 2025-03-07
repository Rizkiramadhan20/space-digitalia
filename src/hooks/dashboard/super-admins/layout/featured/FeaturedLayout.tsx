"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/layout/featured/FeaturedSkelaton'

import { useFeaturedContent } from '@/hooks/dashboard/super-admins/layout/featured/lib/FetchFeatured'

import { Pagination } from '@/base/helper/Pagination'

import { useModal } from '@/hooks/dashboard/super-admins/layout/featured/lib/FetchFeatured'

import { FeaturedHeader } from '@/hooks/dashboard/super-admins/layout/featured/content/FeaturedHeader'

import { FeaturedGrid } from '@/hooks/dashboard/super-admins/layout/featured/content/FeaturedGrid'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/featured/content/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/featured/content/DeleteModal'

export default function FeaturedLayout() {
    const {
        isLoading,
        contents,
        handleSubmit,
        handleDelete,
        isSubmitting,
        formData,
        setFormData,
        selectedImage,
        setSelectedImage,
        isEditing,
        setIsEditing,
        editingId,
        setEditingId,
    } = useFeaturedContent()

    const { openContentModal, openDeleteModal } = useModal()
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 8

    // Calculate pagination
    const totalPages = Math.ceil(contents.length / itemsPerPage)
    const paginatedContents = contents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    }

    if (isLoading) {
        return <FeaturedSkelaton />
    }

    return (
        <section className='min-h-full py-0 px-0 sm:py-4 sm:px-4'>
            <FeaturedHeader onCreateClick={() => {
                setIsEditing(false);
                setEditingId(null);
                setFormData({
                    title: '',
                    text: '',
                    imageUrl: ''
                });
                openContentModal();
            }} />

            <FeaturedGrid
                contents={paginatedContents}
                onEdit={(content) => {
                    setIsEditing(true);
                    setEditingId(content.id || null);
                    setFormData({
                        title: content.title,
                        text: content.text,
                        imageUrl: content.imageUrl
                    });
                    openContentModal();
                }}
                onDelete={(content) => {
                    setEditingId(content.id || null);
                    openDeleteModal();
                }}
            />

            {contents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </motion.div>
            )}

            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onCancel={() => {
                    const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
                    modal?.close();
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                        title: '',
                        text: '',
                        imageUrl: ''
                    });
                    setSelectedImage(null);
                }}
            />

            <DeleteModal
                onConfirm={handleDelete}
                editingId={editingId}
            />
        </section>
    )
}
