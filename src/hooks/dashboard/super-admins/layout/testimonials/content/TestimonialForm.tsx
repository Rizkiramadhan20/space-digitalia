import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/schema';
import { Timestamp } from 'firebase/firestore';
interface Props {
    testimonial?: Testimonial;
    onSubmit: (data: Omit<Testimonial, 'id'>, imageFile: File) => Promise<void>;
    onClose: () => void;
}

export default function TestimonialForm({ testimonial, onSubmit, onClose }: Props) {
    const [formData, setFormData] = useState({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        company: testimonial?.company || '',
        message: testimonial?.message || '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }, []);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (files: FileList | null) => {
        if (files && files[0]) {
            setImageFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile && !testimonial) {
            alert('Please select an image');
            return;
        }

        setLoading(true);
        try {
            const formDataWithRequired = {
                ...formData,
                imageUrl: testimonial?.imageUrl || '',
                createdAt: testimonial?.createdAt || Timestamp.now()
            };
            await onSubmit(formDataWithRequired, imageFile!);
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-white max-w-6xl p-0 overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="font-bold text-xl text-gray-900">
                        {testimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Basic Information</h4>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                        <textarea
                                            name="message"
                                            className="textarea textarea-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg h-24"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Image</h4>
                            </div>

                            <div className="form-control">
                                {(imageFile || testimonial?.imageUrl) ? (
                                    <div className="relative rounded-lg overflow-hidden group">
                                        <Image
                                            src={imageFile ? URL.createObjectURL(imageFile) : testimonial!.imageUrl}
                                            alt="Image preview"
                                            width={400}
                                            height={300}
                                            className="w-full h-[200px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-0"
                                                onClick={() => {
                                                    const input = document.getElementById('image-input') as HTMLInputElement;
                                                    input?.click();
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                                                }}
                                                className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-0"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <input
                                            id="image-input"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e.target.files)}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative border-2 border-dashed border-gray-200 rounded-lg hover:border-green-500 transition-all">
                                        <input
                                            id="image-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e.target.files)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            required={!testimonial}
                                        />
                                        <div className="flex flex-col items-center justify-center h-[200px] p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm text-gray-500">Add Image</p>
                                            <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
                                        </div>
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
                                onClick={handleClose}
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
                                        <span>{testimonial ? 'Save Changes' : 'Create'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}