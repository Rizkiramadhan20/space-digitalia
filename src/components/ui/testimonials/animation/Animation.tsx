import { MotionProps } from 'framer-motion';

export const getInitialAnimation = (index: number): MotionProps => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
        duration: 0.6,
        delay: index * 0.1
    }
});

export const getHoverAnimation = (showAll: boolean, index: number, totalDisplayed: number): MotionProps => ({
    whileHover:
        (!showAll && index >= totalDisplayed - 3) ? {} : {
            scale: 1.02,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
});

export const handleMouseMove = (e: React.MouseEvent, showAll: boolean, index: number, totalDisplayed: number) => {
    if (!showAll && index >= totalDisplayed - 3) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 30;
    const rotateY = -(x - rect.width / 2) / 30;

    const target = e.currentTarget as HTMLElement;
    target.style.transition = 'transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    target.style.transform = `
    perspective(1000px)
    scale(1.1)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;

    const parent = target.parentElement;
    if (parent) {
        Array.from(parent.children).forEach((child) => {
            if (child !== target) {
                (child as HTMLElement).style.opacity = '0.4';
                (child as HTMLElement).style.transform = 'scale(0.9)';
                (child as HTMLElement).style.filter = 'blur(3px)';
            }
        });
    }
};

export const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transition = 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    target.style.transform = `
    perspective(1000px)
    scale(1)
    rotateX(0deg)
    rotateY(0deg)
  `;

    const parent = target.parentElement;
    if (parent) {
        Array.from(parent.children).forEach((child) => {
            (child as HTMLElement).style.opacity = '1';
            (child as HTMLElement).style.transform = 'scale(1)';
            (child as HTMLElement).style.filter = 'blur(0px)';
        });
    }
};