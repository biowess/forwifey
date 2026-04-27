import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import WallScene from '../components/3d/WallScene.jsx'
import StarField from '../components/3d/StarField.jsx'
import SceneTransitionWrapper from '../components/ui/SceneTransitionWrapper.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'

function LetterContent({ letter }) {
  const lines = letter.content.split('\n')
  return (
    <div className="font-serif leading-relaxed space-y-3" style={{ color: 'rgba(245,239,230,0.9)' }}>
      {lines.map((line, i) =>
        line === '' ? (
          <div key={i} className="h-3" />
        ) : (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="text-base md:text-lg italic"
          >
            {line}
          </motion.p>
        )
      )}
    </div>
  )
}

function WallCanvas({ onLetterOpen }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      shadows
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#1A0010" />
      <directionalLight
        position={[3, 5, 5]}
        intensity={0.9}
        color="#F5EFE6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#b3002d" intensity={1.2} position={[-3, 2, 3]} distance={14} />
      <pointLight color="#C4847A" intensity={0.5} position={[4, -2, 2]} distance={10} />
      {/* Cherry rim light */}
      <pointLight color="#e8003d" intensity={0.3} position={[0, 0, 5]} distance={8} />
      {/* Back rim */}
      <directionalLight position={[-4, 0, -2]} intensity={0.12} color="#b3002d" />

      <fog attach="fog" args={['#040204', 9, 24]} />

      <StarField count={500} speed={0.0001} />
      <WallScene onLetterOpen={onLetterOpen} />
    </Canvas>
  )
}

export default function LetterScene({ onNext }) {
  const [openLetter, setOpenLetter] = useState(null)

  return (
    <SceneTransitionWrapper>
      <div className="relative w-full h-full overflow-hidden">
        <WallCanvas onLetterOpen={setOpenLetter} />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,5,8,0.72) 100%)',
          }}
        />

        {/* Cherry glow overlay at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(179,0,45,0.07) 100%)',
          }}
        />

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-6 left-0 right-0 text-center pointer-events-none"
        >
          <span
            className="text-xs tracking-[0.35em] uppercase font-mono"
            style={{ color: 'rgba(179,0,45,0.5)' }}
          >
            Letters
          </span>
        </motion.div>

        {/* Hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-20 left-0 right-0 text-center pointer-events-none"
        >
          <p className="text-xs tracking-widest font-mono italic" style={{ color: 'rgba(245,239,230,0.2)' }}>
            touch a letter to open
          </p>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
        >
          <Button variant="ghost" onClick={onNext} className="text-sm tracking-widest">
            Continue →
          </Button>
        </motion.div>

        {/* Letter modal */}
        <Modal
          isOpen={!!openLetter}
          onClose={() => setOpenLetter(null)}
          title={openLetter?.label || ''}
        >
          {openLetter && <LetterContent letter={openLetter} />}
        </Modal>
      </div>
    </SceneTransitionWrapper>
  )
}
