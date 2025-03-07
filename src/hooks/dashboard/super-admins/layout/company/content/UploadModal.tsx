import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { UploadModalProps } from '@/hooks/dashboard/super-admins/layout/company/lib/company';

export default function UploadModal({
    isEditMode,
    imagePreview,
    isSubmitting,
    handleFileChange,
    handleSubmit,
    resetForm
}: UploadModalProps) {
    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-2xl p-8"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {isEditMode ? 'Edit Image' : 'Upload Image'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Add a new image to your company gallery
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
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

                        <form method="dialog" onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-8">
                            {/* Form Fields */}
                            <div className="flex items-center justify-center w-full">
                                {imagePreview ? (
                                    <div className="w-full flex flex-col items-center">
                                        <div className="relative w-full max-w-[300px] aspect-video">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                width={500}
                                                height={500}
                                                className="object-contain rounded-lg w-full h-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    resetForm();
                                                }}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('file-input')?.click()}
                                            className="mt-4 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
                                        >
                                            Change Image
                                        </button>
                                        <input
                                            id="file-input"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </div>
                                ) : (
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-xl border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
                                        modal?.close();
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{isEditMode ? 'Update' : 'Upload'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </dialog>
    );
}