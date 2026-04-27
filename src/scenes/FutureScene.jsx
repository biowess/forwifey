import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import SpaceWarp from '../components/3d/SpaceWarp.jsx'
import SceneTransitionWrapper from '../components/ui/SceneTransitionWrapper.jsx'
import TerminalText from '../components/ui/TerminalText.jsx'
import Button from '../components/ui/Button.jsx'
import { TERMINAL } from '../config/content.js'

function WarpCanvas({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.2]}
      style={{ position: 'absolute', inset: 0, background: '#040204' }}
    >
      <ambientLight intensity={0.04} />
      <SpaceWarp progress={progress} />
    </Canvas>
  )
}

function LaunchPhase({ onPeak }) {
  const [progress, setProgress] = useState(0)
  const calledRef = useRef(false)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 3400

    let rafId
    const tick = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(eased)

      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      } else if (!calledRef.current) {
        calledRef.current = true
        setTimeout(onPeak, 450)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [onPeak])

  return (
    <>
      <WarpCanvas progress={progress} />

      {/* Cherry bloom overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, rgba(179,0,45,${progress * 0.18}) 0%, transparent 70%)`,
          transition: 'none',
        }}
      />

      {/* Speed vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 50% 50%, transparent 0%, rgba(4,2,4,${0.25 + progress * 0.55}) 100%)`,
        }}
      />

      {/* Cherry streaks at high speed */}
      {progress > 0.6 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 20% 20% at 50% 50%, rgba(232,0,61,${(progress - 0.6) * 0.12}) 0%, transparent 100%)`,
          }}
        />
      )}
    </>
  )
}

function TerminalPhase({ onNext }) {
  const [terminalDone, setTerminalDone] = useState(false)
  const [showNext, setShowNext] = useState(false)

  const handleTerminalDone = () => {
    setTerminalDone(true)
    setTimeout(() => setShowNext(true), 650)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3, ease: 'easeInOut' }}
      className="relative z-10 w-full h-full flex flex-col items-center px-6"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* CENTER AREA (terminal) */}
      <div className="flex-1 flex items-center justify-center w-full py-6">
        <div className="w-full max-w-md">
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-t-xl"
            style={{
              border: '1px solid rgba(179,0,45,0.25)',
              borderBottom: 'none',
              background: 'rgba(20,0,8,0.6)',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(179,0,45,0.7)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(179,0,45,0.35)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(179,0,45,0.15)' }} />
            <span
              className="ml-3 font-mono text-xs tracking-widest"
              style={{ color: 'rgba(179,0,45,0.5)' }}
            >
              future.projection
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="px-6 py-6 rounded-b-xl min-h-[200px]"
            style={{
              background: 'rgba(6, 2, 8, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(179,0,45,0.2)',
              borderTop: 'none',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(179,0,45,0.08)',
            }}
          >
            <div
              className="mb-4 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(179,0,45,0.5), transparent)',
              }}
            />
            <TerminalText onDone={handleTerminalDone} />
          </div>
        </div>
      </div>

      {/* CTA FOOTER (always pinned) */}
      <div className="flex-shrink-0 pb-8 flex items-center justify-center min-h-[72px] w-full">
        <AnimatePresence>
          {showNext && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Button variant="ghost" onClick={onNext}>
                {TERMINAL.cta}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
export default function FutureScene({ onNext }) {
  const [phase, setPhase] = useState('launch')

  return (
    <SceneTransitionWrapper>
      <div className="relative w-full h-full overflow-hidden" style={{ background: '#040204' }}>
        <AnimatePresence mode="wait">
          {phase === 'launch' && (
            <motion.div
              key="launch"
              className="absolute inset-0"
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}
            >
              <LaunchPhase onPeak={() => setPhase('terminal')} />
            </motion.div>
          )}

          {phase === 'terminal' && (
            <motion.div
              key="terminal"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6 }}
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(16,4,12,1) 0%, rgba(4,2,4,1) 100%)',
              }}
            >
              {/* Static star dots */}
              <div className="absolute inset-0 opacity-25">
                {Array.from({ length: 55 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() > 0.8 ? '2px' : '1px',
                      height: Math.random() > 0.8 ? '2px' : '1px',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: Math.random() > 0.7 ? '#b3002d' : '#F5EFE6',
                      opacity: Math.random() * 0.7 + 0.2,
                    }}
                  />
                ))}
              </div>

              <TerminalPhase onNext={onNext} />
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'terminal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute top-6 left-0 right-0 text-center pointer-events-none"
          >
            <span className="text-xs tracking-[0.35em] uppercase font-mono" style={{ color: 'rgba(179,0,45,0.35)' }}>
              Future
            </span>
          </motion.div>
        )}
      </div>
    </SceneTransitionWrapper>
  )
}
