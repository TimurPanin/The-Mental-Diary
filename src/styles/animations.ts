export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

export const floatingAnimation = {
  animate: {
    y: [0, -100, 0],
    opacity: [0, 1, 0],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export const statusMessageAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
}

