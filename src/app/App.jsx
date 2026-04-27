import React, { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroScene from '../scenes/IntroScene.jsx'
import LetterScene from '../scenes/LetterScene.jsx'
import QuizScene from '../scenes/QuizScene.jsx'
import FutureScene from '../scenes/FutureScene.jsx'
import AboutScene from '../scenes/AboutScene.jsx'
import NavDots from '../components/ui/NavDots.jsx'

// Central scene state machine
// Flow: INTRO → LETTERS → QUIZ → FUTURE → ABOUT
export const SCENES = ['intro', 'letters', 'quiz', 'future', 'about']

export default function App() {
  const [scene, setScene] = useState('intro')

  const goTo = useCallback((target) => {
    if (SCENES.includes(target)) {
      setScene(target)
    }
  }, [])

  const next = useCallback(() => {
    const idx = SCENES.indexOf(scene)
    if (idx >= 0 && idx < SCENES.length - 1) {
      setScene(SCENES[idx + 1])
    }
  }, [scene])

  return (
    <div
      className="scene-wrapper"
      style={{ background: '#080508' }}
    >
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <IntroScene key="intro" onNext={next} />
        )}
        {scene === 'letters' && (
          <LetterScene key="letters" onNext={next} />
        )}
        {scene === 'quiz' && (
          <QuizScene key="quiz" onNext={next} />
        )}
        {scene === 'future' && (
          <FutureScene key="future" onNext={next} />
        )}
        {scene === 'about' && (
          <AboutScene key="about" onRestart={() => goTo('intro')} />
        )}
      </AnimatePresence>

      {scene !== 'intro' && (
        <NavDots
          scenes={SCENES}
          current={scene}
          onNavigate={goTo}
        />
      )}
    </div>
  )
}
