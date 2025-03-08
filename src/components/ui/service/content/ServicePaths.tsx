import { motion } from 'framer-motion';

import { ServicePathsProps } from '@/components/ui/service/lib/schema';

export default function ServicePaths({ serviceLength, visibleSections }: ServicePathsProps) {
    return (
        <svg
            className="absolute top-0 left-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
        >
            {serviceLength > 1 && (
                <motion.path
                    d="M 50,60 Q 50,190 50,250 T 500,320 T 950,320 Q 950,400 950,450"
                    strokeDasharray="8,12"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{
                        pathLength: visibleSections.includes(1) ? 1 : 0,
                        opacity: visibleSections.includes(1) ? 1 : 0.3,
                        stroke: "url(#gradient1)"
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            )}
            {serviceLength > 2 && (
                <motion.path
                    d="M 950,450 Q 950,520 950,580 T 500,640 T 50,640 Q 50,700 50,720"
                    strokeDasharray="8,12"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{
                        pathLength: visibleSections.includes(2) ? 1 : 0,
                        opacity: visibleSections.includes(2) ? 1 : 0.3,
                        stroke: "url(#gradient2)"
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            )}
            {serviceLength > 2 && (
                <motion.path
                    d="M 50,720 Q 50,780 50,820 T 500,900 T 950,900 Q 950,920 950,980"
                    strokeDasharray="8,12"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{
                        pathLength: visibleSections.includes(3) ? 1 : 0,
                        opacity: visibleSections.includes(3) ? 1 : 0.3,
                        stroke: "url(#gradient3)"
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            )}

            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DB2777" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
            </defs>
        </svg>
    );
}