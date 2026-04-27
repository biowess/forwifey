import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TERMINAL } from '../../config/content.js'

const lineStyles = {
  system: { color: 'rgba(245,239,230,0.5)' },
  value: { color: 'rgba(232,196,184,0.9)' },
  highlight: { color: '#e8003d', textShadow: '0 0 10px rgba(179,0,45,0.7)' },
  detail: { color: 'rgba(245,239,230,0.7)' },
  divider: { color: 'rgba(179,0,45,0.3)' },
  final: { color: '#FFB3C1', textShadow: '0 0 12px rgba(255,179,193,0.5)' },
}

export default function TerminalText({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const bottomRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const timers = TERMINAL.scanLines.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, line.delay)
    )

    const lastDelay =
      TERMINAL.scanLines[TERMINAL.scanLines.length - 1].delay

    const doneTimer = setTimeout(() => {
      if (onDone) onDone()
    }, lastDelay + 1200)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  // Auto-scroll ONLY within container (safe mobile behavior)
  useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120

    // Only auto-scroll if user is already near bottom
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [visibleLines])

  return (
    <div
      ref={containerRef}
      className="font-mono text-sm leading-relaxed space-y-2 overflow-y-auto scrollbar-none"
      style={{
        maxHeight: '220px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <AnimatePresence>
        {visibleLines.map((line, i) => (
          <motion.div
            key={`${line.text}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={
              lineStyles[line.type] || {
                color: 'rgba(245,239,230,0.6)',
              }
            }
          >
            {line.type === 'divider' ? (
              <span style={{ color: 'rgba(179,0,45,0.4)' }}>
                {'─'.repeat(24)}
              </span>
            ) : (
              <>
                {(line.type === 'system' || line.type === 'value') && (
                  <span
                    style={{
                      color: 'rgba(179,0,45,0.5)',
                      marginRight: '0.5rem',
                    }}
                  >
                    ›
                  </span>
                )}

                {line.type === 'highlight' && (
                  <span
                    style={{
                      color: 'rgba(179,0,45,0.7)',
                      marginRight: '0.5rem',
                    }}
                  >
                    ✦
                  </span>
                )}

                {line.text}
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 👇 hard anchor so scroll never breaks */}
      <div ref={bottomRef} />
    </div>
  )
}