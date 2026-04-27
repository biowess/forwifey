import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text, { speed = 40, startDelay = 0 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    let delayTimer
    let interval

    delayTimer = setTimeout(() => {
      interval = setInterval(() => {
        indexRef.current += 1
        setDisplayed(text.slice(0, indexRef.current))
        if (indexRef.current >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(delayTimer)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
