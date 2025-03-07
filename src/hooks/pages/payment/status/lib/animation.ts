import { Variants } from "framer-motion";

// Loading animations
export const loadingSpinnerAnimations = {
  scale: {
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  rotate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
  innerScale: {
    scale: [1.05, 0.95, 1.05],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  innerRotate: {
    rotate: -360,
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
  },
  centerDot: {
    scale: [0.8, 1.2, 0.8],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// Background animations
export const backgroundAnimations = {
  gradient: {
    background: [
      "linear-gradient(to bottom right, rgba(99,102,241,0.3), transparent, rgba(168,85,247,0.3))",
      "linear-gradient(to bottom right, rgba(168,85,247,0.3), transparent, rgba(99,102,241,0.3))",
    ],
    scale: [1, 1.05, 1],
    transition: {
      background: { duration: 10, repeat: Infinity, repeatType: "reverse" },
      scale: { duration: 20, repeat: Infinity, repeatType: "reverse" },
    },
  },
  grid: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

// Content animations
export const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// Particle animations
export const particleAnimation = {
  y: ["-20%", "120%"],
  opacity: [0, 1, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};

// Shine effect animation
export const shineAnimation = {
  x: ["100%", "-100%"],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 3,
  },
};
