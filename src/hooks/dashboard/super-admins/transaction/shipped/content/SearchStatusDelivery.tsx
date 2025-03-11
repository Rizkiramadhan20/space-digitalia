import React from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onReset?: () => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChange,
    onReset,
    placeholder = "Search by project title or order ID..."
}: SearchBarProps) {
    return (
        <div className="relative group">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-100 
                             focus:border-indigo-500/20 rounded-2xl outline-none transition-all 
                             duration-300 placeholder:text-gray-400 text-gray-600
                             hover:border-gray-200 focus:bg-indigo-50/30 focus:shadow-lg
                             focus:shadow-indigo-50"
                />

                {/* Clear Button - Only show when there's input */}
                {value && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => {
                            onChange('');
                            onReset?.();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
                                 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg
                            className="w-4 h-4 text-gray-400 hover:text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </motion.button>
                )}
            </div>

            {/* Search Suggestions - Can be expanded later */}
            {value && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-2 py-2 bg-white rounded-xl shadow-lg 
                             border border-gray-100 z-50"
                >
                    <div className="px-4 py-2">
                        <p className="text-sm text-gray-500">
                            Searching for &quot;{value}&quot;
                        </p>
                    </div>
                    {/* Can add search suggestions here */}
                </motion.div>
            )}

            {/* Focus Ring Animation */}
            <div className="absolute inset-0 rounded-2xl transition-transform duration-300 
                          group-hover:scale-105 group-focus-within:scale-105 
                          bg-gradient-to-r from-indigo-500/10 to-purple-500/10 -z-10 
                          opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            />
        </div>
    );
}