"use client"

import { useState, useEffect } from 'react';

import { db } from '@/utils/firebase';

import { addDoc, collection, doc, updateDoc, Timestamp, getDocs } from 'firebase/firestore';

import { toast } from 'react-hot-toast';

import { CategoryProps, TagProps } from '@/hooks/dashboard/super-admins/article/tags/lib/schema';

export default function TagsModal({ selectedTag, onClose }: {
    selectedTag?: TagProps,
    onClose?: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [tagData, setTagData] = useState({
        id: '',
        nameTags: '',
        categoryId: '',
        category: ''
    });

    useEffect(() => {
        fetchCategories();
        if (selectedTag) {
            setTagData({
                id: selectedTag.id,
                nameTags: selectedTag.nameTags,
                categoryId: selectedTag.categoryId || '',
                category: selectedTag.category || ''
            });
            setIsEditMode(true);
        }
    }, [selectedTag]);

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE as string));
            const categoriesData: CategoryProps[] = [];
            querySnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, name: doc.data().name });
            });
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        }
    };

    const resetForm = () => {
        setTagData({ id: '', nameTags: '', categoryId: '', category: '' });
        setIsEditMode(false);
        onClose?.();
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

        setTagData({
            ...tagData,
            categoryId: selectedCategoryId,
            category: selectedCategory?.name || '',
            nameTags: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tagData.categoryId) {
            toast.error('Please select a category first');
            return;
        }

        setIsSubmitting(true);

        try {
            if (isEditMode) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TAGS_ARTICLE as string, tagData.id), {
                    nameTags: tagData.nameTags,
                    category: tagData.category
                });
                toast.success('Tag updated successfully');
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TAGS_ARTICLE as string), {
                    nameTags: tagData.nameTags,
                    category: tagData.category,
                    createdAt: Timestamp.now()
                });
                toast.success('Tag created successfully');
            }

            const modal = document.getElementById('tags_modal') as HTMLDialogElement | null;
            modal?.close();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save tag. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <dialog id="tags_modal" className="modal">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-2xl p-8">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {isEditMode ? 'Edit Tag' : 'Add Tag'}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {isEditMode ? 'Update your tag details' : 'Create a new tag for your article'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    const modal = document.getElementById('tags_modal') as HTMLDialogElement | null;
                                    modal?.close();
                                    resetForm();
                                }}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Form Fields */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-gray-900">Tag Details</h4>
                                        <p className="text-sm text-gray-500">Enter the basic information for your tag</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                                            Select Category *
                                        </label>
                                        <select
                                            value={tagData.categoryId}
                                            onChange={handleCategoryChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                                            Tag Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={tagData.nameTags}
                                            onChange={(e) => setTagData({ ...tagData, nameTags: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder={tagData.categoryId ? "Enter tag name" : "Please select a category first"}
                                            required
                                            disabled={!tagData.categoryId}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium inline-flex items-center gap-2"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        const modal = document.getElementById('tags_modal') as HTMLDialogElement | null;
                                        modal?.close();
                                        resetForm();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 font-medium inline-flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{isEditMode ? 'Update Tag' : 'Save Tag'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
} 