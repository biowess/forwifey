import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import StarField from '../components/3d/StarField.jsx'
import FloatingHeart from '../components/3d/FloatingHeart.jsx'
import SceneTransitionWrapper from '../components/ui/SceneTransitionWrapper.jsx'
import Button from '../components/ui/Button.jsx'
import { INTRO, META } from '../config/content.js'

function IntroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.15} color="#200010" />
      <pointLight color="#b3002d" intensity={2.5} position={[2, 2, 3]} distance={16} />
      <pointLight color="#FF4060" intensity={0.8} position={[-3, -1, 2]} distance={10} />
      <pointLight color="#E8C4B8" intensity={0.3} position={[0, -3, 4]} distance={8} />
      <StarField />
      <FloatingHeart position={[0, 0.2, 0]} scale={2.2} glowing />
    </Canvas>
  )
}

export default function IntroScene({ onNext }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <SceneTransitionWrapper>
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <IntroCanvas />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, transparent 30%, rgba(8,5,8,0.88) 100%)',
          }}
        />

        {/* Cherry ambient glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(179,0,45,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl mb-6 animate-pulse-soft"
            style={{ color: '#e8003d', textShadow: '0 0 20px rgba(179,0,45,0.8), 0 0 40px rgba(179,0,45,0.3)' }}
          >
            {INTRO.sparkle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl font-light tracking-tight leading-none mb-4"
            style={{
              color: '#F5EFE6',
              textShadow: '0 2px 40px rgba(179,0,45,0.2)',
            }}
          >
            {INTRO.greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-lg md:text-xl italic mb-12 max-w-xs"
            style={{ color: 'rgba(245,239,230,0.5)' }}
          >
            {INTRO.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Button variant="glow" onClick={onNext} className="text-xl px-12">
              {INTRO.cta}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 text-xs tracking-[0.3em] uppercase font-mono"
          style={{ color: 'rgba(179,0,45,0.35)' }}
        >
          {META.title}
        </motion.div>
      </div>
    </SceneTransitionWrapper>
  )
}
