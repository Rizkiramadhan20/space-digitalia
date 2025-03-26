export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export const titleAnimation = {
    initial: { opacity: 0, y: -20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
        duration: 0.7,
        ease: "easeOut"
    }
}

export const descriptionAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut"
    }
}

export const headerContainerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 }
}

export const companyLogoContainerAnimation = {
    initial: { opacity: 0.6 },
    whileInView: { opacity: 1 },
    viewport: { once: true }
}

export const companyLogoAnimation = {
    initial: { scale: 0.9 },
    whileInView: { scale: 1 },
    viewport: { once: true },
    transition: { type: "spring", stiffness: 100 }
}

export const backgroundImageAnimation = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 0.1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
}