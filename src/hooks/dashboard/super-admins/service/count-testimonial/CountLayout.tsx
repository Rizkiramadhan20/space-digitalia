"use client"

import React from 'react';

import { motion } from "framer-motion";

import CountSkeleton from "@/hooks/dashboard/super-admins/service/count-testimonial/CountSkelaton";

import { Pagination } from "@/base/helper/Pagination";

import { Header } from "@/hooks/dashboard/super-admins/service/count-testimonial/content/HeaderCount";

import { SearchBar } from "@/hooks/dashboard/super-admins/service/count-testimonial/content/SearchBar";

import { TestimonialCard } from "@/hooks/dashboard/super-admins/service/count-testimonial/content/TestimonialsCard";

import { TestimonialModal } from "@/hooks/dashboard/super-admins/service/count-testimonial/content/TestimonialModal";

import { DeleteModal } from "@/hooks/dashboard/super-admins/service/count-testimonial/content/DeleteModal";

import { containerVariants, gridVariants } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/animation";

import { useTestimonialManagement } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/FetchTestimonialCount";

export default function CountTestimonialLayout() {
    const {
        currentTestimonials,
        filteredTestimonials,
        pageCount,
        currentPage,
        searchQuery,
        loading,
        isLoading,
        isEditing,
        formData,
        deleteLoading,
        setSearchQuery,
        handlePageChange,
        handleEdit,
        handleFormSubmit,
        handleDeleteImage,
        confirmDelete,
        setFormData,
    } = useTestimonialManagement();

    if (isLoading) {
        return <CountSkeleton />;
    }

    return (
        <motion.section
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <Header
                onAddNew={() => {
                    (document.getElementById('testimonial_modal') as HTMLDialogElement)?.showModal();
                }}
            />

            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={(value) => setSearchQuery(value)}
            />

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
            >
                {currentTestimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        onEdit={handleEdit}
                        onDelete={handleDeleteImage}
                    />
                ))}
            </motion.div>

            {filteredTestimonials.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}

            {filteredTestimonials.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No testimonials found matching your criteria.</p>
                </div>
            )}

            <TestimonialModal
                isEditing={isEditing}
                loading={loading}
                formData={formData}
                onSubmit={handleFormSubmit}
                onFormDataChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
                onClose={() => (document.getElementById('testimonial_modal') as HTMLDialogElement)?.close()}
            />

            <DeleteModal
                deleteLoading={deleteLoading}
                onConfirm={confirmDelete}
                onCancel={() => {
                    (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
                }}
            />
        </motion.section>
    );
}
