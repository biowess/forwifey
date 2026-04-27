import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '../../hooks/useIsMobile.js'

function FloatingOrb({ position, scale, color, emissive, speed, phase }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.22
      ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.12
      ref.current.rotation.z += 0.002
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        transparent
        opacity={0.12}
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  )
}

// Floating cherry particle ring
function ParticleRing() {
  const ref = useRef()
  const count = 60

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 2.5 + (Math.random() - 0.5) * 1.5
      arr[i * 3]     = Math.cos(angle) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3
      arr[i * 3 + 2] = Math.sin(angle) * r - 3
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#b3002d" size={0.05} sizeAttenuation transparent opacity={0.6} fog={false} />
    </points>
  )
}

export default function QuizBackground() {
  const isMobile = useIsMobile()

  const orbs = useMemo(() => {
    const count = isMobile ? 4 : 7
    const cherryColors = [
      { color: '#b3002d', emissive: '#6b0019' },
      { color: '#8B0020', emissive: '#5a0015' },
      { color: '#e8003d', emissive: '#b3002d' },
      { color: '#C4847A', emissive: '#8B5050' },
      { color: '#FF4060', emissive: '#b3002d' },
      { color: '#6b0019', emissive: '#400010' },
      { color: '#b3002d', emissive: '#8B0020' },
    ]
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
        -2.5 - Math.random() * 5,
      ],
      scale: 0.6 + Math.random() * 1.3,
      ...cherryColors[i % cherryColors.length],
      speed: 0.28 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [isMobile])

  return (
    <group>
      <ambientLight intensity={0.25} color="#200010" />
      <pointLight color="#b3002d" intensity={1.2} position={[3, 2, 2]} distance={14} />
      <pointLight color="#e8003d" intensity={0.6} position={[-3, -2, 1]} distance={10} />
      <pointLight color="#FF4060" intensity={0.4} position={[0, 0, 3]} distance={8} />
      {orbs.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
      ))}
      {!isMobile && <ParticleRing />}
    </group>
  )
}
