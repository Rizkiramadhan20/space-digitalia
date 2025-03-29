import React from 'react';

interface PolicySectionProps {
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

export function PolicySection({ title, icon, content }: PolicySectionProps) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-xl 
                       hover:shadow-2xl transition-all duration-500 border border-white/20 
                       hover:bg-white/20 hover:-translate-y-1">
            <div className="flex items-center gap-6 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
            </div>

            <div className="mt-6">
                {content}
            </div>
        </div>
    );
}