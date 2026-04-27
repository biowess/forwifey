import React from 'react'
import { motion } from 'framer-motion'

const LABELS = {
  intro: '✦',
  letters: '◇',
  quiz: '○',
  future: '◎',
  about: '∿',
}

export default function NavDots({ scenes, current, onNavigate }) {
  const visibleScenes = scenes.filter(s => s !== 'intro')

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3"
      aria-label="Scene navigation"
    >
      {visibleScenes.map((s) => {
        const isActive = s === current
        return (
          <motion.button
            key={s}
            onClick={() => onNavigate(s)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${s}`}
            title={s}
          >
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className="text-xs"
              style={{
                color: isActive ? '#e8003d' : '#F5EFE6',
                textShadow: isActive ? '0 0 12px rgba(179,0,45,0.9), 0 0 24px rgba(179,0,45,0.4)' : 'none',
              }}
            >
              {LABELS[s] || '·'}
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  )
}
