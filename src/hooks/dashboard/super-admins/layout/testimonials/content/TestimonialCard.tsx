import React, { useState } from 'react';

import { Props } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/schema';

import TestimonialForm from './TestimonialForm';

import Image from 'next/image';

export default function TestimonialCard({ testimonial, onUpdate, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(testimonial.id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-30" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover ring-2 ring-indigo-50 w-16 h-16 sm:w-[64px] sm:h-[64px]"
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>

            {isEditing && (
                <TestimonialForm
                    testimonial={testimonial}
                    onSubmit={async (data, imageFile) => {
                        await onUpdate(testimonial.id, data, imageFile);
                        setIsEditing(false);
                    }}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </>
    );
}