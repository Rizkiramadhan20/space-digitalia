import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/service/lib/service';

export const ContentModal: React.FC<ContentModalProps> = ({
    isEditing,
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    selectedProfileImage,
    setSelectedProfileImage,
    handleSubmit,
    isSubmitting,
    onClose
}) => {
    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? 'Edit Content' : 'Create New Content'}
                                </h3>
                                <p className="text-sm text-gray-500">Fill in the information below to {isEditing ? 'update' : 'create'} your content</p>
                            </div>
                            <button
                                onClick={onClose}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column - Basic Information */}
                                <div className="space-y-8">
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                        <div className="space-y-5">
                                            <div className="form-control">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    placeholder="Enter title"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Text</label>
                                                <textarea
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] resize-y transition-all duration-200"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="Enter text..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <div className="space-y-8">
                                    {/* Image Preview */}
                                    {(selectedImage || formData.imageUrl) ? (
                                        <div className="space-y-4">
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                                                <Image
                                                    src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                                    alt="Content preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    setFormData({ ...formData, imageUrl: '' });
                                                }}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Remove image
                                            </button>
                                        </div>
                                    ) : (
                                        /* Upload Input */
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
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setSelectedImage(file);
                                                        }
                                                    }}
                                                    accept="image/*"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Information */}
                            <div className="space-y-8">
                                <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                    <h4 className="text-lg font-semibold text-gray-900">Profile Information</h4>
                                    <div className="space-y-5">
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Title</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                value={formData.profile.title}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    profile: { ...formData.profile, title: e.target.value }
                                                })}
                                                placeholder="Enter profile title"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Text</label>
                                            <textarea
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] resize-y transition-all duration-200"
                                                value={formData.profile.text}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    profile: { ...formData.profile, text: e.target.value }
                                                })}
                                                placeholder="Enter profile text..."
                                            />
                                        </div>

                                        {/* Profile Image Preview */}
                                        {(selectedProfileImage || formData.profile.image) ? (
                                            <div className="space-y-4">
                                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={selectedProfileImage ? URL.createObjectURL(selectedProfileImage) : formData.profile.image}
                                                        alt="Profile preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedProfileImage(null);
                                                        setFormData({
                                                            ...formData,
                                                            profile: { ...formData.profile, image: '' }
                                                        });
                                                    }}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove profile image
                                                </button>
                                            </div>
                                        ) : (
                                            /* Profile Image Upload */
                                            <div className="flex items-center justify-center w-full">
                                                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-xl border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Upload profile image</span></p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setSelectedProfileImage(file);
                                                            }
                                                        }}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                    disabled={isSubmitting}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg font-medium flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
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
                                            <span>{isEditing ? 'Save Changes' : 'Create'}</span>
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
};