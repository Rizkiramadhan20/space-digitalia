import { Variants } from "framer-motion";

// Text animation variants
export const textVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

// Character animation variants
export const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    y: 5,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

// Modal animation variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// Button container animation
export const buttonContainerVariants = {
  initial: { x: 100, opacity: 0 },
  exit: { x: 100, opacity: 0 },
};

export const buttonContainerTransition = {
  duration: 0.6,
  type: "spring",
  stiffness: 100,
  damping: 20,
};

// Text container animation
export const textContainerVariants = {
  initial: { width: 0 },
  animate: { width: "auto" },
};

export const textContainerTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  delay: 0.2,
};

// WhatsApp icon animation
export const whatsappIconVariants = {
  initial: { backgroundColor: "#26d466" },
  animate: {
    backgroundColor: "#26d466",
    scale: [1, 1.1, 1],
  },
  whileTap: { scale: 0.95 },
};

export const whatsappIconTransition = {
  duration: 0.5,
  scale: {
    repeat: 0,
    duration: 1.2,
  },
};

// Modal overlay animation
export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
