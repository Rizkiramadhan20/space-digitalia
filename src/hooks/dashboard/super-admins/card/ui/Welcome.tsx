import React from 'react';

import { WelcomeSectionProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function WelcomeSection({ user, currentTime }: WelcomeSectionProps) {
    return (
        <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between gap-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Halo, selamat datang {user?.displayName} 👋
                </h1>
                <div className="text-2xl font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-xl">
                    {currentTime.toLocaleTimeString('id-ID')}
                </div>
            </div>
        </div>
    );
}