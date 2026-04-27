import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '../../hooks/useIsMobile.js'

export default function StarField({ count, speed = 0.0003 }) {
  const isMobile = useIsMobile()
  const starCount = count ?? (isMobile ? 500 : 1200)
  const refWhite = useRef()
  const refRed = useRef()

  const whitePositions = useMemo(() => {
    const arr = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 80
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return arr
  }, [starCount])

  const redCount = Math.floor(starCount * 0.15)
  const redPositions = useMemo(() => {
    const arr = new Float32Array(redCount * 3)
    for (let i = 0; i < redCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 70
      arr[i * 3 + 1] = (Math.random() - 0.5) * 70
      arr[i * 3 + 2] = (Math.random() - 0.5) * 70
    }
    return arr
  }, [redCount])

  useFrame(() => {
    if (refWhite.current) {
      refWhite.current.rotation.y += speed
      refWhite.current.rotation.x += speed * 0.3
    }
    if (refRed.current) {
      refRed.current.rotation.y += speed * 0.7
      refRed.current.rotation.x -= speed * 0.2
    }
  })

  return (
    <group>
      <points ref={refWhite}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={whitePositions} count={starCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#F5EFE6" size={0.06} sizeAttenuation transparent opacity={0.65} fog={false} />
      </points>
      <points ref={refRed}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={redPositions} count={redCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#b3002d" size={0.08} sizeAttenuation transparent opacity={0.5} fog={false} />
      </points>
    </group>
  )
}
