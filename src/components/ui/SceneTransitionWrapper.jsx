import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function SceneTransitionWrapper({ children, className = '' }) {
  return (
    <motion.div
      className={`scene-wrapper ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
