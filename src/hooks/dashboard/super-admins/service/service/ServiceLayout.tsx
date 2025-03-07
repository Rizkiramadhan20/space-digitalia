"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import { motion } from "framer-motion"

import { ServiceContent, ServiceFormData } from '@/hooks/dashboard/super-admins/service/service/lib/schema'

import { containerVariants } from '@/hooks/dashboard/super-admins/service/service/lib/animation'

import { useServices } from '@/hooks/dashboard/super-admins/service/service/lib/FetchService'

import ServiceSkeleton from "@/hooks/dashboard/super-admins/service/service/ServiceSkelaton"

import { toast } from 'react-hot-toast'

import { ServiceCard } from '@/hooks/dashboard/super-admins/service/service/content/ServiceCard'

export default function ServiceLayout() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceContent | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
    const [formData, setFormData] = useState<ServiceFormData>({
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        image: null
    });

    const {
        services,
        isLoading,
        loading,
        deleteLoading,
        saveService,
        deleteService
    } = useServices();

    const handleEdit = (service: ServiceContent) => {
        setIsEditing(true);
        setSelectedService(service);
        setFormData({
            title: service.title,
            description: service.description,
            buttonText: service.buttonText,
            buttonLink: service.buttonLink,
            image: null
        });
        (document.getElementById('service_modal') as HTMLDialogElement)?.showModal();
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.buttonText || !formData.buttonLink) {
            toast.error("Please fill all required fields");
            return;
        }

        const success = await saveService(formData, selectedService?.id);
        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', buttonText: '', buttonLink: '', image: null });
        setIsEditing(false);
        setSelectedService(null);
        (document.getElementById('service_modal') as HTMLDialogElement)?.close();
    };

    const handleDeleteImage = (serviceId: string) => {
        setServiceToDelete(serviceId);
        (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
    };

    const confirmDelete = async () => {
        if (!serviceToDelete) return;

        const success = await deleteService(serviceToDelete);
        if (success) {
            setServiceToDelete(null);
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
        }
    };

    if (isLoading) {
        return <ServiceSkeleton />;
    }

    return (
        <motion.section
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header section */}
            {services.length === 0 && (
                <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                    <motion.div className="space-y-1">
                        <motion.h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Services
                        </motion.h1>
                        <motion.p className='text-gray-500'>
                            Manage your services content
                        </motion.p>
                    </motion.div>

                    <motion.button
                        onClick={() => {
                            setIsEditing(false);
                            setSelectedService(null);
                            setFormData({ title: '', description: '', buttonText: '', buttonLink: '', image: null });
                            (document.getElementById('service_modal') as HTMLDialogElement)?.showModal();
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-medium">Add Service</span>
                    </motion.button>
                </motion.div>
            )}

            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={handleEdit}
                    onDelete={handleDeleteImage}
                />
            ))}

            {/* Service Modal */}
            <dialog id="service_modal" className="modal">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {isEditing ? 'Edit Service' : 'Add New Service'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Fill in the information below to {isEditing ? 'update' : 'create'} your service
                                    </p>
                                </div>

                                <button
                                    onClick={resetForm}
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
                                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                        placeholder="Enter title"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                                    <textarea
                                                        value={formData.description}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all duration-200 resize-none"
                                                        placeholder="Enter description..."
                                                        required
                                                    />
                                                </div>

                                                <div className="flex gap-4">
                                                    <div className="form-control flex-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Text</label>
                                                        <input
                                                            type="text"
                                                            value={formData.buttonText}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                            placeholder="Enter button text"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-control flex-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Link</label>
                                                        <input
                                                            type="text"
                                                            value={formData.buttonLink}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                            placeholder="Enter button link"
                                                            required
                                                        />
                                                    </div>
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
                                                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : selectedService?.imageUrl ? (
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                                                <Image
                                                    src={selectedService.imageUrl}
                                                    alt="Current content"
                                                    className="object-cover w-full h-full"
                                                    width={500}
                                                    height={500}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedService(null)}
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
                                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
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
                                        onClick={resetForm}
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

            {/* Delete Confirmation Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
                            <svg className="mx-auto mb-4 text-red-500 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>

                            <h3 className="mb-5 text-lg font-semibold text-gray-800">
                                Are you sure you want to delete this service?
                            </h3>
                            <p className="mb-6 text-sm text-gray-500">
                                This action cannot be undone. This will permanently delete the service.
                            </p>

                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setServiceToDelete(null);
                                        (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
                                    }}
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <span>Yes, Delete</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </motion.section>
    )
}
