import { LoadMoreButtonProps } from '@/components/ui/testimonials/types/schema'

export default function LoadMoreButton({ showAll, onClick }: LoadMoreButtonProps) {
    return (
        <div className="flex justify-center relative w-full">
            <button
                onClick={onClick}
                className="group absolute -top-14 inline-flex items-center gap-2 sm:gap-3 
                         px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full 
                         hover:scale-105 transform
                         transition-all duration-300 font-medium text-base sm:text-lg
                         shadow-[0_0_20px_rgba(255,255,255,0.7)]
                         hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]"
            >
                {/* Simplified background effect */}
                <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-xl 
                              border border-white/50
                              shadow-[0_0_15px_rgba(255,255,255,0.5)]
                              after:absolute after:inset-0 after:rounded-full 
                              after:bg-gradient-to-r after:from-transparent after:via-white/90 after:to-transparent
                              after:animate-light-beam" />

                <span className="relative z-10 text-gray-900">
                    {showAll ? 'Show less' : 'View all testimonials'}
                </span>
                <svg
                    className={`relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 
                             text-gray-900 ${showAll ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                {/* Simplified hover effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100/50 via-white/70 to-pink-100/50 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        </div>
    )
}