import React, { useState } from 'react'

import { FrameworkContent, CategoryProject } from '../lib/schema'

import Image from 'next/image'

import { motion } from 'framer-motion'

interface FrameworkModalProps {
    isEditing: boolean;
    isSubmitting: boolean;
    formData: FrameworkContent;
    setFormData: (data: FrameworkContent) => void;
    handleSubmit: () => Promise<void>;
    closeModal: () => void;
    categories: CategoryProject[];
}

export const FrameworkModal: React.FC<FrameworkModalProps> = ({
    isEditing,
    isSubmitting,
    formData,
    setFormData,
    handleSubmit,
    closeModal,
    categories
}) => {
    const [isImageLoading, setIsImageLoading] = useState(false);

    const handleFileChange = async (file: File) => {
        try {
            setIsImageLoading(true);

            // Get just the filename without extension
            const filename = file.name.split('.').slice(0, -1).join('.');

            // Use the filename as the framework name
            setFormData({
                ...formData,
                image: file,
                title: filename
            });
        } catch (error) {
            console.error('Error processing image:', error);
        } finally {
            setIsImageLoading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            await handleFileChange(files[0]);
        }
    };

    return (
        <dialog id="framework_modal" className="modal">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl shadow-xl w-[90%] max-w-2xl p-8 border border-gray-100"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1.5">
                                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                    {isEditing ? 'Edit Framework' : 'Add Framework'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {isEditing ? 'Update existing framework' : 'Add a new framework to your projects'}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form method="dialog" onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }} className="space-y-8">
                            <div className="space-y-6">
                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Framework Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        placeholder="Enter framework title"
                                        required
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Category
                                    </label>
                                    <select
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Framework Image
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        {(formData.imageUrl || formData.image) ? (
                                            <div className="w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                                                <div className="relative w-full max-w-[300px] aspect-video bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                                    <Image
                                                        src={formData.image ? URL.createObjectURL(formData.image) : formData.imageUrl}
                                                        alt="Preview"
                                                        width={500}
                                                        height={500}
                                                        className="object-contain rounded-lg w-full h-full"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setFormData({ ...formData, image: undefined, imageUrl: '' });
                                                        }}
                                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition-all duration-200"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label
                                                className="w-full flex flex-col items-center px-6 py-8 bg-gray-50 rounded-2xl border-2 border-gray-200 border-dashed cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {isImageLoading ? (
                                                        <div className="flex flex-col items-center gap-3">
                                                            <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                            <p className="text-sm text-gray-600">Processing image...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-600">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            await handleFileChange(file);
                                                        }
                                                    }}
                                                    accept="image/*"
                                                    required={!isEditing}
                                                    disabled={isImageLoading}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                                    disabled={isSubmitting}
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 disabled:opacity-50 disabled:shadow-none font-medium flex items-center gap-2"
                                    disabled={
                                        isSubmitting ||
                                        !formData.title ||
                                        !formData.categoryId ||
                                        (!isEditing && !formData.image && !formData.imageUrl)
                                    }
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </dialog>
    )
}