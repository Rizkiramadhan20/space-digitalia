import React from 'react'
import Link from 'next/link'

interface InactiveAccountModalProps {
    show: boolean;
    onClose: () => void;
}

export default function InactiveAccountModal({ show, onClose }: InactiveAccountModalProps) {
    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-all">
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl max-w-md w-full mx-auto shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 animate-fade-in">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-tl from-amber-50 to-amber-100 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-amber-100/50 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-transparent rounded-3xl"></div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-amber-500 relative z-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                        Account Inactive
                    </h3>

                    <p className="text-gray-600 mb-8 text-base leading-relaxed max-w-sm">
                        Your account is currently inactive. Please contact our support team for assistance in reactivating your account.
                    </p>

                    <div className="flex flex-col w-full gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-sm text-gray-500 font-medium">
                                    Contact Support Via
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="mailto:spacedigitalia@gmail.com"
                                className="group relative overflow-hidden rounded-2xl border border-gray-100 p-4 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex flex-col items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">Email</span>
                                </div>
                            </Link>

                            <Link
                                href="https://wa.me/6281398632939?text=Hello%20Admin,%20I%20need%20help%20with%20my%20inactive%20account."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-2xl border border-gray-100 p-4 hover:border-green-600/20 hover:shadow-lg hover:shadow-green-600/5 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex flex-col items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">WhatsApp</span>
                                </div>
                            </Link>
                        </div>

                        <button
                            onClick={onClose}
                            className="relative w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-700 transition-all"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Close Message</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}