import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import LetterPin from './LetterPin.jsx'
import FloatingHeart from './FloatingHeart.jsx'
import { LETTERS } from '../../config/content.js'

const PIN_POSITIONS = [
  { pos: [-0.82, 0.52, 0.04], rot: [0, 0.04, -0.04] },
  { pos: [0.52, 0.60, 0.04],  rot: [0, -0.03, 0.04] },
  { pos: [-0.52, -0.20, 0.04], rot: [0, 0.02, 0.03] },
  { pos: [0.75, -0.16, 0.04],  rot: [0, -0.04, -0.03] },
]

// Decorative cherry accent strip
function WallAccent({ position, width, opacity }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, 0.004]} />
      <meshBasicMaterial color="#b3002d" transparent opacity={opacity} />
    </mesh>
  )
}

export default function WallScene({ onLetterOpen }) {
  const wallRef = useRef()
  const t = useRef(0)

  useFrame((state, delta) => {
    t.current += delta * 0.12
    if (wallRef.current) {
      wallRef.current.rotation.y = Math.sin(t.current) * 0.035
      wallRef.current.rotation.x = Math.sin(t.current * 0.7) * 0.012
    }
  })

  return (
    <group ref={wallRef}>
      {/* Main wall */}
      <mesh receiveShadow>
        <boxGeometry args={[2.9, 2.3, 0.06]} />
        <meshStandardMaterial
          color="#130810"
          roughness={0.92}
          metalness={0.04}
          emissive="#200010"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Inner frame */}
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[2.7, 2.1, 0.003]} />
        <meshBasicMaterial color="#2A1020" transparent opacity={0.55} />
      </mesh>

      {/* Cherry border lines - decorative */}
      <WallAccent position={[0, 1.1, 0.034]} width={2.5} opacity={0.45} />
      <WallAccent position={[0, -1.1, 0.034]} width={2.5} opacity={0.45} />

      {/* Vertical cherry accents */}
      <mesh position={[-1.3, 0, 0.034]}>
        <planeGeometry args={[0.004, 2.1]} />
        <meshBasicMaterial color="#b3002d" transparent opacity={0.35} />
      </mesh>
      <mesh position={[1.3, 0, 0.034]}>
        <planeGeometry args={[0.004, 2.1]} />
        <meshBasicMaterial color="#b3002d" transparent opacity={0.35} />
      </mesh>

      {/* Corner glow dots */}
      {[[-1.28, 1.08], [1.28, 1.08], [-1.28, -1.08], [1.28, -1.08]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.035]}>
          <circleGeometry args={[0.012, 8]} />
          <meshBasicMaterial color="#b3002d" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Letter pins */}
      {LETTERS.map((letter, i) => (
        <LetterPin
          key={letter.id}
          letter={letter}
          position={PIN_POSITIONS[i]?.pos || [0, 0, 0.04]}
          rotation={PIN_POSITIONS[i]?.rot || [0, 0, 0]}
          onOpen={onLetterOpen}
        />
      ))}

      {/* Central floating heart */}
      <FloatingHeart position={[-0.04, -0.58, 0.1]} scale={1.35} glowing />

      {/* Cherry ribbon line below heart */}
      <mesh position={[0, -0.58, 0.038]} rotation={[0, 0, 0.015]}>
        <planeGeometry args={[0.85, 0.003]} />
        <meshBasicMaterial color="#b3002d" transparent opacity={0.5} />
      </mesh>

      {/* Wall shadow backdrop */}
      <mesh position={[0, 0, -0.045]}>
        <planeGeometry args={[3.6, 3.0]} />
        <meshBasicMaterial color="#040204" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
