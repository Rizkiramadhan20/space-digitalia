export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            {/* Decorative background */}
            <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-5">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-100 to-sky-100"></div>
            </div>

            <div className="relative flex flex-col items-center text-center">
                {/* Modern icon with animation */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-indigo-50 rounded-full animate-pulse"></div>
                    <div className="relative p-6 bg-white rounded-full shadow-2xl">
                        <svg
                            className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text content */}
                <h3 className="mb-3 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Transaksi Dibatalkan
                </h3>
                <p className="max-w-md mb-6 text-base sm:text-lg text-gray-500">
                    Tidak ada transaksi yang dibatalkan saat ini.
                </p>

                {/* Action button */}
                <button
                    onClick={() => window.location.href = '/dashboard/user'}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                    </svg>
                    Kembali ke Dashboard
                </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-40"></div>
                <div className="grid grid-cols-3 gap-8 px-8 py-6 text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                        <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                        Transaksi Aman
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                        Pengiriman Terpantau
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                        Dukungan 24/7
                    </div>
                </div>
            </div>
        </div>
    )
}