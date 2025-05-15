import { motion } from 'framer-motion';
import { useState } from 'react';

interface SocialMediaModalProps {
    showSocialModal: boolean;
    setShowSocialModal: (show: boolean) => void;
    isProcessing: boolean;
    processFreeTransaction: () => Promise<void>;
}

export default function SocialMediaModal({
    showSocialModal,
    setShowSocialModal,
    isProcessing,
    processFreeTransaction
}: SocialMediaModalProps) {
    const [socialVerification, setSocialVerification] = useState({
        tiktok: false,
        instagram: false,
        youtube: false
    });

    // Helper function to check if all socials are verified
    const allSocialsVerified = () => socialVerification.tiktok && socialVerification.instagram && socialVerification.youtube;

    if (!showSocialModal) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[1000] flex items-center justify-center"
            onClick={() => setShowSocialModal(false)}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md p-6 bg-gradient-to-b from-gray-900/80 to-black/80 
                    rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl"
            >
                {/* Modal Header */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent 
                        bg-gradient-to-r from-cyan-400 to-indigo-400">
                        Follow Us to Continue
                    </h3>
                    <p className="text-gray-400 mt-2">
                        Please follow our social media accounts to download this free resource
                    </p>
                </div>

                {/* Social Media Buttons */}
                <div className="space-y-4">
                    {/* TikTok Button */}
                    <a
                        href="https://www.tiktok.com/@rzkir.20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between w-full p-4 
                            rounded-xl transition-all duration-300
                            ${socialVerification.tiktok
                                ? 'bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-pink-500/50'
                                : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50'
                            } border hover:from-pink-500/20 hover:to-cyan-500/20
                            hover:border-pink-500/50`}
                        onClick={() => setSocialVerification(prev => ({ ...prev, tiktok: true }))}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 015.17-2.39V2h-3.45v3.32a4.83 4.83 0 01-3.77 4.25v3.45a8.2 8.2 0 004.86-2.07 8.2 8.2 0 004.86 2.07V6.69z" />
                                </svg>
                            </div>
                            <span className="font-medium text-white">Follow on TikTok</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {socialVerification.tiktok && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                    Verified
                                </span>
                            )}
                            <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>

                    {/* Instagram Button */}
                    <a
                        href="https://www.instagram.com/rzkir.20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between w-full p-4 
                            rounded-xl transition-all duration-300
                            ${socialVerification.instagram
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                                : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50'
                            } border hover:from-purple-500/20 hover:to-pink-500/20
                            hover:border-purple-500/50`}
                        onClick={() => setSocialVerification(prev => ({ ...prev, instagram: true }))}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <span className="font-medium text-white">Follow on Instagram</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {socialVerification.instagram && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                    Verified
                                </span>
                            )}
                            <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>

                    {/* YouTube Button */}
                    <a
                        href="https://www.youtube.com/channel/UCnwO87RT9K-5WmhtgCTRuJA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between w-full p-4 
                            rounded-xl transition-all duration-300
                            ${socialVerification.youtube
                                ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50'
                                : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50'
                            } border hover:from-red-500/20 hover:to-red-600/20
                            hover:border-red-500/50`}
                        onClick={() => setSocialVerification(prev => ({ ...prev, youtube: true }))}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <span className="font-medium text-white">Subscribe on YouTube</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {socialVerification.youtube && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                    Verified
                                </span>
                            )}
                            <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Continue Button with Verification Status */}
                <button
                    onClick={processFreeTransaction}
                    disabled={!allSocialsVerified() || isProcessing}
                    className={`w-full mt-6 p-4 rounded-xl font-medium transition-all duration-300
                        ${allSocialsVerified() && !isProcessing
                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-600 hover:to-indigo-600'
                            : 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <span>
                                {allSocialsVerified() ? 'Continue Download' : 'Follow All Accounts to Continue'}
                            </span>
                            {!allSocialsVerified() && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className={socialVerification.tiktok ? 'text-green-400' : 'text-gray-500'}>
                                        TikTok {socialVerification.tiktok ? '✓' : '○'}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span className={socialVerification.instagram ? 'text-green-400' : 'text-gray-500'}>
                                        Instagram {socialVerification.instagram ? '✓' : '○'}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span className={socialVerification.youtube ? 'text-green-400' : 'text-gray-500'}>
                                        YouTube {socialVerification.youtube ? '✓' : '○'}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </button>
            </motion.div>
        </motion.div>
    );
}
