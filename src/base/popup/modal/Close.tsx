import { motion } from "framer-motion";

export const AnimatedX = () => {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
            <motion.path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
            />
        </svg>
    );
};