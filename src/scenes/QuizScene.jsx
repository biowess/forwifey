import React, { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import QuizBackground from '../components/3d/QuizBackground.jsx'
import SceneTransitionWrapper from '../components/ui/SceneTransitionWrapper.jsx'
import Button from '../components/ui/Button.jsx'
import { QUIZ } from '../config/content.js'

function QuizCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <QuizBackground />
    </Canvas>
  )
}

function AffirmationBurst({ text, onDone }) {
  const calledRef = useRef(false)

  const handleComplete = useCallback(() => {
    // Only call onDone once, after a delay
    if (!calledRef.current) {
      calledRef.current = true
      setTimeout(onDone, 900)
    }
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, y: -10 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={handleComplete}
      className="text-center px-8"
    >
      <p
        className="font-display text-4xl md:text-5xl italic"
        style={{
          color: '#FFB3C1',
          textShadow: '0 0 30px rgba(179,0,45,0.7), 0 0 60px rgba(179,0,45,0.3)',
        }}
      >
        {text}
      </p>
    </motion.div>
  )
}

function QuestionCard({ question, onAnswer, questionIndex, total }) {
  const [selected, setSelected] = useState(null)
  const lockedRef = useRef(false)

  const handleSelect = useCallback((optId) => {
    // Strict single-fire guard
    if (lockedRef.current) return
    lockedRef.current = true
    setSelected(optId)
    setTimeout(() => onAnswer(optId), 320)
  }, [onAnswer])

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm mx-auto px-4"
    >
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-all duration-500"
            style={{
              background: i <= questionIndex
                ? 'rgba(179,0,45,0.85)'
                : 'rgba(245,239,230,0.15)',
              boxShadow: i <= questionIndex ? '0 0 6px rgba(179,0,45,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      <h2
        className="font-display text-xl md:text-2xl text-center mb-8 italic leading-snug"
        style={{ color: '#F5EFE6' }}
      >
        {question.text}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className="p-4 rounded-xl text-left font-serif text-sm leading-snug min-h-[64px] flex items-center transition-all duration-300"
              style={{
                border: isSelected
                  ? '1px solid rgba(179,0,45,0.7)'
                  : '1px solid rgba(245,239,230,0.12)',
                background: isSelected
                  ? 'rgba(179,0,45,0.12)'
                  : 'rgba(245,239,230,0.04)',
                color: isSelected ? '#FFB3C1' : 'rgba(245,239,230,0.7)',
                boxShadow: isSelected ? '0 0 16px rgba(179,0,45,0.25)' : 'none',
              }}
            >
              {opt.label}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function AffectionButton({ lines }) {
  const [line, setLine] = useState(null)
  const [showing, setShowing] = useState(false)
  const timerRef = useRef(null)

  const randomLine = () => {
    const l = lines[Math.floor(Math.random() * lines.length)]
    setLine(l)
    setShowing(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowing(false), 3200)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatePresence mode="wait">
        {showing && line && (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-sm italic text-center px-4"
            style={{ color: 'rgba(179,0,45,0.8)', textShadow: '0 0 10px rgba(179,0,45,0.4)' }}
          >
            {line}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        onClick={randomLine}
        className="text-xs tracking-widest font-mono transition-colors"
        style={{ color: 'rgba(179,0,45,0.4)' }}
        onMouseEnter={e => e.target.style.color = 'rgba(179,0,45,0.8)'}
        onMouseLeave={e => e.target.style.color = 'rgba(179,0,45,0.4)'}
      >
        ✦ affection
      </button>
    </div>
  )
}

// QUIZ STATE MACHINE
// phase: 'question' | 'affirm' | 'complete'
// qIndex: 0 .. QUIZ.questions.length-1
// One click → setPhase('affirm') only. No double-trigger possible.
// After affirmation → advance qIndex or → 'complete'

export default function QuizScene({ onNext }) {
  const [phase, setPhase] = useState('question')
  const [qIndex, setQIndex] = useState(0)
  const [affirmation, setAffirmation] = useState('')

  const handleAnswer = useCallback(() => {
    if (phase !== 'question') return
    const list = QUIZ.affirmations
    const text = list[Math.floor(Math.random() * list.length)]
    setAffirmation(text)
    setPhase('affirm')
  }, [phase])

  const handleAffirmDone = useCallback(() => {
    if (phase !== 'affirm') return
    const nextIndex = qIndex + 1
    if (nextIndex < QUIZ.questions.length) {
      setQIndex(nextIndex)
      setPhase('question')
    } else {
      setPhase('complete')
    }
  }, [phase, qIndex])

  return (
    <SceneTransitionWrapper>
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <QuizCanvas />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(8,5,8,0.5) 0%, rgba(8,5,8,0.88) 100%)',
          }}
        />

        {/* Cherry vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(179,0,45,0.06) 100%)',
          }}
        />

        {/* Scene label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 left-0 right-0 text-center pointer-events-none"
        >
          <span className="text-xs tracking-[0.35em] uppercase font-mono" style={{ color: 'rgba(179,0,45,0.45)' }}>
            A small quiz
          </span>
        </motion.div>

        {/* Main content area */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4">
          <AnimatePresence mode="wait">
            {phase === 'question' && (
              <QuestionCard
                key={`q-${qIndex}`}
                question={QUIZ.questions[qIndex]}
                onAnswer={handleAnswer}
                questionIndex={qIndex}
                total={QUIZ.questions.length}
              />
            )}

            {phase === 'affirm' && (
              <AffirmationBurst
                key={`a-${qIndex}`}
                text={affirmation}
                onDone={handleAffirmDone}
              />
            )}

            {phase === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center px-6 flex flex-col items-center gap-8"
              >
                <span
                  className="text-3xl animate-pulse-soft"
                  style={{ color: '#e8003d', textShadow: '0 0 20px rgba(179,0,45,0.8)' }}
                >
                  ✦
                </span>
                <p
                  className="font-display text-2xl md:text-3xl italic leading-relaxed max-w-xs"
                  style={{ color: '#F5EFE6' }}
                >
                  {QUIZ.completionMessage}
                </p>
                <Button variant="glow" onClick={onNext}>
                  {QUIZ.ctaNext}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Affection button during questions */}
          {phase === 'question' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 w-full flex justify-center"
            >
              <AffectionButton lines={QUIZ.affectionLines} />
            </motion.div>
          )}
        </div>
      </div>
    </SceneTransitionWrapper>
  )
}
