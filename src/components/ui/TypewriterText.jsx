import React from 'react'
import { useTypewriter } from '../../hooks/useTypewriter.js'

export default function TypewriterText({
  text,
  speed = 40,
  startDelay = 0,
  className = '',
  showCursor = true,
  onDone,
}) {
  const { displayed, done } = useTypewriter(text, { speed, startDelay })

  React.useEffect(() => {
    if (done && onDone) onDone()
  }, [done, onDone])

  return (
    <span className={`${className} ${showCursor && !done ? 'typewriter-cursor' : ''}`}>
      {displayed}
    </span>
  )
}
