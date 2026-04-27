import React from 'react'
import { motion } from 'framer-motion'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) {
  const base =
    'inline-flex items-center justify-center font-serif text-lg tracking-wide rounded-full cursor-pointer select-none transition-all duration-300 min-h-[52px] px-8'

  const variants = {
    primary:
      'bg-transparent border border-cream/30 text-cream hover:border-cream/70 hover:text-cream active:scale-95',
    glow:
      'bg-transparent border border-cherry/60 text-soft hover:border-cherry hover:shadow-[0_0_24px_rgba(179,0,45,0.5),0_0_48px_rgba(179,0,45,0.2)] active:scale-95',
    ghost:
      'bg-transparent text-cream/50 hover:text-cream active:scale-95',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {children}
    </motion.button>
  )
}
