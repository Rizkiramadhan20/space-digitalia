"use client"

import React, { useState, useEffect, useCallback } from 'react';

import { Testimonial } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/schema';

import { testimonialService } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/FetchTestimonial';

import TestimonialForm from '@/hooks/dashboard/super-admins/layout/testimonials/content/TestimonialForm';

import TestimonialCard from '@/hooks/dashboard/super-admins/layout/testimonials/content/TestimonialCard';

import TestimonialSkelaton from '@/hooks/dashboard/super-admins/layout/testimonials/TestimonialSkelaton';

import { toast } from 'react-hot-toast';

import { Pagination } from '@/base/helper/Pagination';

export default function TestimonialsLayout() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCompany, setFilterCompany] = useState('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Show 6 testimonials per page

    const handleError = useCallback((err: unknown) => {
        console.error('Error:', err);
        toast.error('An error occurred. Please try again.');
    }, []);

    const loadTestimonials = useCallback(async () => {
        try {
            const data = await testimonialService.getAll();
            setTestimonials(data);
            setFilteredTestimonials(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, [handleError]);

    useEffect(() => {
        loadTestimonials();
    }, [loadTestimonials]);

    // Update useEffect for filtering and searching
    useEffect(() => {
        let result = [...testimonials];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(testimonial =>
                testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testimonial.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testimonial.message.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply company filter
        if (filterCompany !== 'all') {
            result = result.filter(testimonial =>
                testimonial.company.toLowerCase() === filterCompany.toLowerCase()
            );
        }

        setFilteredTestimonials(result);
        setCurrentPage(0); // Reset to first page when filtering
    }, [testimonials, searchQuery, filterCompany]);

    // Menyederhanakan fungsi CRUD
    const handleCreate = async (testimonial: Omit<Testimonial, 'id'>, imageFile: File) => {
        try {
            const newTestimonial = await testimonialService.create(testimonial, imageFile);
            setTestimonials(prev => [...prev, newTestimonial]);
            setIsFormOpen(false);
            toast.success('Testimonial created successfully!');
        } catch (err) {
            handleError(err);
        }
    };

    const handleUpdate = async (id: string, testimonial: Partial<Testimonial>, newImageFile?: File) => {
        try {
            await testimonialService.update(id, testimonial, newImageFile);
            await loadTestimonials();
            toast.success('Testimonial updated successfully!');
        } catch (err) {
            handleError(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await testimonialService.delete(id);
            setTestimonials(prev => prev.filter(t => t.id !== id));
            setDeleteModal({ isOpen: false, id: null });
            toast.success('Testimonial deleted successfully!');
        } catch (err) {
            handleError(err);
        }
    };

    const openDeleteModal = async (id: string): Promise<void> => {
        setDeleteModal({ isOpen: true, id });
    };

    // Update pagination calculation to use filtered testimonials
    const paginatedTestimonials = filteredTestimonials.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    if (loading) {
        return <TestimonialSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Testimonials
                        </h1>
                        <p className='text-gray-500'>Manage and organize your testimonials</p>
                    </div>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Testimonial
                    </button>
                </div>

                {/* Update search and filter controls */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search testimonials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <select
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Companies</option>
                        {/* Create unique list of companies */}
                        {Array.from(new Set(testimonials.map(t => t.company))).map(company => (
                            <option key={company} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTestimonials.map(testimonial => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        onUpdate={handleUpdate}
                        onDelete={openDeleteModal}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredTestimonials.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />

            {isFormOpen && (
                <TestimonialForm
                    onSubmit={handleCreate}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold text-gray-900">Confirm Delete</h3>
                        <p className="mt-2 text-gray-600">
                            Are you sure you want to delete this testimonial? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteModal.id && handleDelete(deleteModal.id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
