import React from 'react'

export function BackgroundPattern() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            {/* Animated Circles */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgb(226 232 240 / 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(226 232 240 / 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)'
                }}
            />
        </div>
    )
}