import React, { useState } from 'react';

import { z } from 'zod';

import toast from 'react-hot-toast';

import { database } from '@/utils/firebase';

import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database';

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

interface Subscriber {
    email: string;
    timestamp: string;
}

export default function Newsletter() {
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

            const subscribersRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_SUBSCRIBERS);
            const emailQuery = query(subscribersRef, orderByChild('email'), equalTo(email));
            const snapshot = await get(emailQuery);

            if (snapshot.exists()) {
                const subscribers = snapshot.val();
                const existingEmails = Object.values(subscribers as Record<string, Subscriber>)
                    .map((sub) => sub.email.toLowerCase());

                if (existingEmails.includes(email.toLowerCase())) {
                    toast.error('Email already registered!');
                    return;
                }
            }

            await push(subscribersRef, {
                email: email.toLowerCase(),
                timestamp: new Date().toISOString()
            });

            setError('');
            setEmail('');
            toast.success('Thank you for subscribing!');
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
    );
}