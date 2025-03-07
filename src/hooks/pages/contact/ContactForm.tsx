"use client"

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { motion } from 'framer-motion'

import toast from 'react-hot-toast'

import { db } from "@/utils/firebase"

import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"

import { contactFormSchema, ContactFormData } from '@/hooks/pages/contact/lib/data'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Check if email already exists
            const messagesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_MESSAGES as string);
            const q = query(messagesRef, where("email", "==", data.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.error('Email ini telah mengirimkan pesan. Harap tunggu tanggapan kami.', {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        background: '#FEE2E2',
                        color: '#991B1B',
                        border: '1px solid #FCA5A5',
                    },
                    icon: '⚠️',
                });
                return;
            }

            // Send data to Firestore
            await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_MESSAGES as string), {
                ...data,
                createdAt: serverTimestamp(),
                status: "unread"
            });

            // Reset form
            reset();

            toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#DCFCE7',
                    color: '#166534',
                    border: '1px solid #86EFAC',
                },
                icon: '✅',
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Gagal mengirim pesan. Silakan coba lagi.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#FEE2E2',
                    color: '#991B1B',
                    border: '1px solid #FCA5A5',
                },
                icon: '❌',
            });
        }
    }

    return (
        <section className='min-h-screen bg-gradient-to-b from-[#e8f4fa] to-white/80 relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Vertical Lines */}
                <div className="absolute inset-0 flex justify-around">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-px h-full bg-gradient-to-b from-purple-200/0 via-purple-200/20 to-purple-200/0"
                        />
                    ))}
                </div>

                {/* Horizontal Lines */}
                <div className="absolute inset-0 flex flex-col justify-around">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-px bg-gradient-to-r from-purple-200/0 via-purple-200/20 to-purple-200/0"
                        />
                    ))}
                </div>

                {/* Diagonal Lines */}
                <div className="absolute -inset-[100%] opacity-20">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 transform"
                            style={{
                                transform: `rotate(${45 + i * 45}deg)`,
                                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(147, 51, 234, 0.1) 50px, rgba(147, 51, 234, 0.1) 51px, transparent 51px, transparent 100px)'
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container relative mx-auto px-4 xl:px-10 py-16 lg:py-24">
                <motion.div
                    className='flex flex-col items-center justify-center text-center gap-8 mb-12 lg:mb-16 max-w-4xl mx-auto'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className='text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        Mari Berdiskusi Bersama Kami
                    </h2>

                    <p className='text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl'>
                        Tim kami siap membantu mengembangkan kehadiran digital bisnis Anda ke tingkat yang lebih tinggi. Silakan isi formulir di bawah untuk berkonsultasi.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="backdrop-blur-xl bg-white/30 border border-white/30 rounded-[2.5rem] shadow-2xl p-8 md:p-12 lg:p-16">
                        {/* Form Header */}
                        <div className="flex flex-col gap-4 mb-12 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Sampaikan Kebutuhan Anda
                            </h3>
                            <p className="text-gray-600">
                                Lengkapi formulir berikut dan tim kami akan segera menghubungi Anda.
                            </p>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Name Input */}
                            <label className="group relative flex flex-col gap-2 w-full">
                                <span className="text-sm font-medium text-gray-700 ml-1">Full Name</span>
                                <div className="relative flex items-center gap-3 w-full overflow-hidden rounded-2xl border border-white/50 bg-white/80 px-5 py-4 shadow-lg transition-all duration-300 hover:border-purple-200 focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-purple-200">
                                    <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </g>
                                    </svg>
                                    <input
                                        {...register('fullName')}
                                        type="text"
                                        className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none text-base"
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.fullName && (
                                    <span className="text-red-500 text-sm ml-1 mt-1 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        {errors.fullName.message}
                                    </span>
                                )}
                            </label>

                            {/* Email Input */}
                            <label className="group relative flex flex-col gap-2 w-full">
                                <span className="text-sm font-medium text-gray-700 ml-1">Email Address</span>
                                <div className="relative flex items-center gap-3 w-full overflow-hidden rounded-2xl border border-white/50 bg-white/80 px-5 py-4 shadow-lg transition-all duration-300 hover:border-purple-200 focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-purple-200">
                                    <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </g>
                                    </svg>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none text-base"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-red-500 text-sm ml-1 mt-1 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* Message Textarea */}
                        <label className="group relative flex flex-col gap-2 w-full mb-8">
                            <span className="text-sm font-medium text-gray-700 ml-1">Your Message</span>
                            <div className="relative flex gap-3 w-full overflow-hidden rounded-2xl border border-white/50 bg-white/80 px-5 py-4 shadow-lg transition-all duration-300 hover:border-purple-200 focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-purple-200">
                                <div className="flex flex-col items-center pt-1">
                                    <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <textarea
                                    {...register('message')}
                                    className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 text-base"
                                    placeholder="Write your message here..."
                                    rows={6}
                                ></textarea>
                            </div>
                            {errors.message && (
                                <span className="text-red-500 text-sm ml-1 mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {errors.message.message}
                                </span>
                            )}
                        </label>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 bg-pos-0 px-8 py-4 min-w-[200px] transition-all duration-300 hover:bg-pos-100 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="relative flex items-center justify-center gap-3 text-white font-medium">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <svg
                                                className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </section>
    )
}