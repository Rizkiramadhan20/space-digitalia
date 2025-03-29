import React from 'react';

export function PolicyHeader() {
    return (
        <div className="text-center mb-16">
            <svg className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" className="stroke-primary" strokeWidth="2" />
                <path d="M12 8V12L15 15" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-primary bg-clip-text bg-gradient-to-r from-primary to-primary-focus">Kebijakan Privasi</h1>
            <div className="flex justify-center gap-4">
                <span className="px-6 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold backdrop-blur-sm">Dokumen Resmi</span>
                <span className="px-6 py-2 bg-base-200/50 rounded-full text-sm font-semibold backdrop-blur-sm">v1.0</span>
            </div>
        </div>
    );
}