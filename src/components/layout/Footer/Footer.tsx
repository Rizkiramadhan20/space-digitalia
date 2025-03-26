"use client"

import React, { useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { z } from 'zod'

import toast from 'react-hot-toast'

import { database } from '@/utils/firebase'

import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database'

import logo from "@/base/assets/logo/logo.jpg"

import { footerNavLinks, footerSocialLinks, services, contactInfo } from '@/components/layout/Footer/data/Footer'

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})

interface Subscriber {
    email: string;
    timestamp: string;
}

export default function Footer() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        try {
            emailSchema.parse({ email: newEmail });
            setError('');
        } catch {
        }
    };

    const handleSubscribe = async () => {
        try {
            setIsLoading(true);
            emailSchema.parse({ email });

            const subscribersRef = ref(database, 'subscribers');
            const emailQuery = query(subscribersRef, orderByChild('email'), equalTo(email));
            const snapshot = await get(emailQuery);

            if (snapshot.exists()) {
                const subscribers = snapshot.val();
                const existingEmails = Object.values(subscribers as Record<string, Subscriber>)
                    .map((sub) => sub.email.toLowerCase());

                if (existingEmails.includes(email.toLowerCase())) {
                    toast.error('Email already registered!', {
                        duration: 3000,
                        position: 'top-center',
                    });
                    return;
                }
            }

            await push(subscribersRef, {
                email: email.toLowerCase(),
                timestamp: new Date().toISOString()
            });

            setError('');
            setEmail('');
            toast.success('Thank you for subscribing!', {
                duration: 3000,
                position: 'top-center',
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError('Invalid email format');
            } else {
                console.error('Subscribe error:', err);
                setError('Failed to subscribe. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Newsletter Section */}
                <div className="border-b border-gray-800 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">Tetap Update</h2>
                            <p className="text-gray-400">Berlangganan untuk informasi terbaru dari kami</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Enter your email"
                                        className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        disabled={isLoading}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            'Subscribe'
                                        )}
                                    </button>
                                </div>
                                {error && <span className="text-sm text-red-500">{error}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-10 px-6">
                    {/* Brand Section */}
                    <div>
                        <Image
                            src={logo}
                            alt="logo"
                            width={120}
                            height={120}
                            className="mb-8 rounded-lg"
                        />
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Space Digitalia – Inovasi Digital, Solusi Tanpa Batas! 🚀
                        </p>
                        <div className="flex gap-8">
                            {footerSocialLinks.map((social) => (
                                <Link
                                    key={social.href}
                                    href={social.href}
                                    className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit Space Digitalia on ${social.name}`}
                                >
                                    <social.icon className="text-2xl" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-8">Tautan Cepat</h3>
                        <ul className="space-y-4">
                            {footerNavLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-8">Layanan</h3>
                        <ul className="space-y-4">
                            {services.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-8">Hubungi Kami</h3>
                        <div className="space-y-4 flex flex-col">
                            {contactInfo.map((item) => (
                                <Link key={item.label} href={item.href} className="text-gray-400 hover:text-white transition-colors" style={{ lineHeight: "1.8" }}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-8 px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Space Digitalia. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
