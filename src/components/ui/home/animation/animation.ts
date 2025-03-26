// Animations for HeroImage
export const heroImageAnimations = {
    container: {
        hidden: {
            opacity: 0,
            scale: 1.1,
            rotate: 2
        },
        show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    },

    innerContent: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { delay: 0.8, duration: 0.8 }
        }
    }
};

// Animations for HeroContent
export const heroContentAnimations = {
    container: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    },

    item: {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20
            }
        }
    },

    buttonLeft: {
        hidden: { opacity: 0, x: -50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: 0.6
            }
        }
    },

    buttonRight: {
        hidden: { opacity: 0, x: 50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: 0.6
            }
        }
    }
};