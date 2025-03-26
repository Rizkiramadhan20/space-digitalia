"use client"

import { useState } from "react";

import toast from 'react-hot-toast';

import { UrlBarProps } from "@/components/ui/project/types/project";

export const UrlBar = ({ linkPreview }: UrlBarProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(linkPreview);
            setIsCopied(true);
            toast.success('URL copied to clipboard!', {
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                iconTheme: {
                    primary: '#4ade80',
                    secondary: '#333',
                },
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy URL', {
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
        }
    };

    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 overflow-x-auto sm:overflow-x-hidden scrollbar-none">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 flex items-center px-4 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <span className="opacity-75 truncate">{linkPreview}</span>
                    </div>
                </div>
                <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                    {isCopied ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};