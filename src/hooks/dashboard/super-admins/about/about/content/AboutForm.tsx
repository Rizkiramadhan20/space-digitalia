"use client"
import React from 'react';

import Image from 'next/image';

import { AboutFormProps } from '@/hooks/dashboard/super-admins/about/about/lib/schema';

export default function AboutForm({
    formData,
    setFormData,
    loading,
    handleFormSubmit,
    isEditing,
    selectedImage,
    setSelectedImage
}: AboutFormProps) {
    return (
        <dialog id="about_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? 'Edit Content' : 'Add New Content'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Fill in the information below to {isEditing ? 'update' : 'create'} your content
                                </p>
                            </div>

                            <button
                                onClick={() => (document.getElementById('about_modal') as HTMLDialogElement)?.close()}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column - Basic Information */}
                                <div className="space-y-8">
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                        <div className="space-y-5">
                                            <div className="form-control">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                    placeholder="Enter title"
                                                    required
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Text</label>
                                                <textarea
                                                    value={formData.text}
                                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all duration-200 resize-none"
                                                    placeholder="Enter text..."
                                                    required
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                                <textarea
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all duration-200 resize-none"
                                                    placeholder="Enter description..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <div className="space-y-8">
                                    {formData.image ? (
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                                            <Image
                                                src={URL.createObjectURL(formData.image)}
                                                alt="Content preview"
                                                className="object-cover w-full h-full"
                                                width={500}
                                                height={500}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: null })}
                                                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : selectedImage?.imageUrl ? (
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                                            <Image
                                                src={selectedImage.imageUrl}
                                                alt="Current content"
                                                className="object-cover w-full h-full"
                                                width={500}
                                                height={500}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-full">
                                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-xl border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                                    accept="image/*"
                                                    required={!isEditing}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                    disabled={loading}
                                    onClick={() => (document.getElementById('about_modal') as HTMLDialogElement)?.close()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving Changes...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{isEditing ? 'Update' : 'Create'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
}