import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ background: 'rgba(4, 0, 8, 0.85)' }}
            onClick={onClose}
          />

          {/* Paper modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
            style={{ transformOrigin: 'top center', perspective: '800px' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(30,0,12,0.92) 0%, rgba(8,5,8,0.95) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(179,0,45,0.25)',
                boxShadow: '0 0 40px rgba(179,0,45,0.15), 0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Cherry glow top line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(179,0,45,0.6), transparent)' }}
              />

              {/* Top bar */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4"
                style={{ borderBottom: '1px solid rgba(179,0,45,0.15)' }}
              >
                <span
                  className="font-serif text-sm tracking-widest uppercase"
                  style={{ color: 'rgba(232, 0, 61, 0.8)', textShadow: '0 0 12px rgba(179,0,45,0.4)' }}
                >
                  {title}
                </span>
                <button
                  onClick={onClose}
                  className="transition-colors w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ color: 'rgba(245,239,230,0.4)' }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[60vh] scrollbar-none">
                {children}
              </div>

              {/* Cherry glow bottom line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(179,0,45,0.3), transparent)' }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
