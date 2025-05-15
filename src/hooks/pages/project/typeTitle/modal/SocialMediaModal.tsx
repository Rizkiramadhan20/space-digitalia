import React from 'react';

import { motion } from 'framer-motion';

interface SocialMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    socialVerification: {
        instagram: boolean;
        tiktok: boolean;
        youtube: boolean;
    };
    onSocialVerification: (platform: 'instagram' | 'tiktok' | 'youtube') => void;
    onContinue: () => void;
}

export default function SocialMediaModal({
    isOpen,
    onClose,
    socialVerification,
    onSocialVerification,
    onContinue
}: SocialMediaModalProps) {
    if (!isOpen) return null;

    const allSocialsVerified = () => socialVerification.tiktok && socialVerification.instagram && socialVerification.youtube;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[1000] flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md p-6 bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">Follow Us!</h3>
                    <p className="text-gray-400">
                        To download this free resource, please follow us on social media first
                    </p>

                    <div className="space-y-4 mt-6">
                        {/* Instagram Button */}
                        <a
                            href="https://www.instagram.com/rzkir.20"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onSocialVerification('instagram')}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border 
                                transition-all duration-300 ${socialVerification.instagram
                                    ? 'bg-pink-600/20 border-pink-500/50 text-pink-400'
                                    : 'bg-gray-800/30 border-gray-700/30 hover:border-pink-500/30 text-gray-300 hover:text-pink-400'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="font-medium">Follow on Instagram</span>
                            </div>
                            {socialVerification.instagram && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </a>

                        {/* TikTok Button */}
                        <a
                            href="https://www.tiktok.com/@rzkir.20"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onSocialVerification('tiktok')}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border 
                                transition-all duration-300 ${socialVerification.tiktok
                                    ? 'bg-black border-white/50 text-white'
                                    : 'bg-gray-800/30 border-gray-700/30 hover:border-white/30 text-gray-300 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                                <span className="font-medium">Follow on TikTok</span>
                            </div>
                            {socialVerification.tiktok && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </a>

                        {/* YouTube Button */}
                        <a
                            href="https://www.youtube.com/channel/UCnwO87RT9K-5WmhtgCTRuJA"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onSocialVerification('youtube')}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border 
                                transition-all duration-300 ${socialVerification.youtube
                                    ? 'bg-red-600/20 border-red-500/50 text-red-400'
                                    : 'bg-gray-800/30 border-gray-700/30 hover:border-red-500/30 text-gray-300 hover:text-red-400'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                <span className="font-medium">Subscribe on YouTube</span>
                            </div>
                            {socialVerification.youtube && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </a>
                    </div>

                    <button
                        onClick={onContinue}
                        className={`w-full mt-6 px-6 py-3 rounded-xl font-medium transition-all duration-300
                            ${allSocialsVerified()
                                ? 'bg-primary text-white hover:bg-primary/90'
                                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!allSocialsVerified()}
                    >
                        {allSocialsVerified() ? 'Continue to Download' : 'Follow Both Platforms to Continue'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
