import React from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import StarField from '../components/3d/StarField.jsx'
import FloatingHeart from '../components/3d/FloatingHeart.jsx'
import SceneTransitionWrapper from '../components/ui/SceneTransitionWrapper.jsx'
import Button from '../components/ui/Button.jsx'
import { ABOUT, META } from '../config/content.js'

function AboutCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.12} color="#200010" />
      <pointLight color="#b3002d" intensity={2.2} position={[2, 2, 3]} distance={14} />
      <pointLight color="#FF4060" intensity={0.6} position={[-2, -1, 2]} distance={8} />
      <StarField count={600} speed={0.00012} />
      <FloatingHeart position={[0, 0.5, 0]} scale={1.7} glowing />
    </Canvas>
  )
}

export default function AboutScene({ onRestart }) {
  return (
    <SceneTransitionWrapper>
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <AboutCanvas />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(8,5,8,0.35) 0%, rgba(8,5,8,0.90) 100%)',
          }}
        />

        {/* Cherry glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(179,0,45,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-8 gap-7">
          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-5xl"
              style={{ color: '#e8003d', textShadow: '0 0 20px rgba(179,0,45,0.8)' }}
            >
              ∿
            </span>
          </motion.div>

          {/* MAIN NAME — WASSIM X MOLK — highly visible */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="flex flex-col items-center gap-2"
          >
            <h1
              className="font-display text-5xl md:text-6xl font-light tracking-tight"
              style={{
                color: '#F5EFE6',
                textShadow: '0 0 40px rgba(179,0,45,0.5), 0 2px 30px rgba(245,239,230,0.15)',
                lineHeight: 1.1,
              }}
            >
              Wassim
            </h1>
            <span
              className="font-serif text-xl italic"
              style={{
                color: '#e8003d',
                textShadow: '0 0 16px rgba(179,0,45,0.7)',
                letterSpacing: '0.3em',
              }}
            >
              × 
            </span>
            <h1
              className="font-display text-5xl md:text-6xl font-light tracking-tight"
              style={{
                color: '#F5EFE6',
                textShadow: '0 0 40px rgba(179,0,45,0.5), 0 2px 30px rgba(245,239,230,0.15)',
                lineHeight: 1.1,
              }}
            >
              Molk
            </h1>
          </motion.div>

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-serif text-lg md:text-xl italic max-w-xs leading-relaxed"
            style={{ color: 'rgba(245,239,230,0.55)' }}
          >
            {ABOUT.body}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="w-20 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(179,0,45,0.6), transparent)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <Button variant="ghost" onClick={onRestart} className="text-sm tracking-widest">
              ↩ Begin again
            </Button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 text-xs tracking-[0.25em] font-mono"
          style={{ color: 'rgba(179,0,45,0.4)' }}
        >
          {ABOUT.footer}
        </motion.div>
      </div>
    </SceneTransitionWrapper>
  )
}
