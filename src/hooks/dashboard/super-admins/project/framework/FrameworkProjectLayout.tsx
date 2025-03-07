"use client"

import React, { useState, useEffect } from 'react'

import { format } from 'date-fns'

import { useFrameworkOperations } from './lib/FetchFramework'

import LicenceProjectSkelaton from './FrameworkProjectSkelaton'

import { Pagination } from '@/base/helper/Pagination'

import { collection, query, orderBy, getDocs } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { toast } from 'react-hot-toast'

import { FrameworkContent, CategoryProject } from './lib/schema'

import { FrameworkModal } from './content/FrameworkModal'

import Image from 'next/image'

export default function FrameworkProjectLayout() {
    const [formData, setFormData] = useState<FrameworkContent>({
        title: '',
        categoryId: '',
        categoryTitle: '',
        imageUrl: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState<CategoryProject[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const itemsPerPage = 10;

    const {
        isLoading,
        frameworks,
        fetchFrameworks,
        createFramework,
        updateFramework,
        deleteFramework
    } = useFrameworkOperations();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string);
                const q = query(categoriesRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const categoriesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as CategoryProject[];
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        fetchFrameworks();
    }, [fetchFrameworks]);

    const filteredFrameworks = frameworks.filter(framework =>
        selectedCategory ? framework.categoryId === selectedCategory : true
    );

    const offset = currentPage * itemsPerPage;
    const currentFrameworks = filteredFrameworks.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredFrameworks.length / itemsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            if (isEditing && editingId) {
                await updateFramework(editingId, formData, formData.image);
            } else {
                if (!formData.image) {
                    toast.error('Please select an image');
                    return;
                }
                await createFramework(formData, formData.image);
            }

            await fetchFrameworks();

            // Reset form data and states
            setIsEditing(false);
            setEditingId(null);
            setFormData({
                title: '',
                categoryId: '',
                categoryTitle: '',
                imageUrl: ''
            });

            // Close modal properly
            closeModal();
        } catch (error) {
            console.error('Error submitting framework:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (framework: FrameworkContent) => {
        setIsEditing(true);
        setEditingId(framework.id || null);
        setFormData({
            title: framework.title,
            categoryId: framework.categoryId,
            categoryTitle: framework.categoryTitle,
            imageUrl: framework.imageUrl,
            image: undefined
        });
        const modal = document.getElementById('framework_modal') as HTMLDialogElement | null;
        modal?.showModal();
    }

    const openModal = () => {
        setIsEditing(false);
        setEditingId(null);
        const websiteCategory = categories.find(c => c.title.toLowerCase() === 'website');
        setFormData({
            title: '',
            categoryId: websiteCategory?.id || '',
            categoryTitle: websiteCategory?.title || '',
            imageUrl: ''
        });
        const modal = document.getElementById('framework_modal') as HTMLDialogElement | null;
        modal?.showModal();
    }

    const closeModal = () => {
        setFormData({
            title: '',
            categoryId: '',
            categoryTitle: '',
            imageUrl: ''
        });
        const modal = document.getElementById('framework_modal') as HTMLDialogElement | null;
        if (modal) {
            modal.addEventListener('close', () => {
                document.body.classList.remove('modal-open');
            }, { once: true });
            modal.close();
        }
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
                            Frameworks
                        </h1>
                        <p className='text-gray-500'>Manage and organize your frameworks</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={openModal}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Framework
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Added Date
                                    </div>
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Framework Title
                                    </div>
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {currentFrameworks.map((framework) => (
                                <tr key={framework.id} className="hover:bg-gray-50/50 transition-all duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {framework.createdAt && format(framework.createdAt.toDate(), 'MMM dd, yyyy HH:mm')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {framework.imageUrl && (
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 p-1">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={framework.imageUrl}
                                                        alt={framework.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-gray-700">
                                                {framework.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(framework)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteFramework(framework.id!)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Showing {filteredFrameworks.length} framework{filteredFrameworks.length !== 1 ? 's' : ''}
                {selectedCategory ? ` in ${categories.find(c => c.id === selectedCategory)?.title || 'selected category'}` : ' across all categories'}
            </div>

            <FrameworkModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                categories={categories}
            />

            {pageCount > 1 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </section>
    );
} 