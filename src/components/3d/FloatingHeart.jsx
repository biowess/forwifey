import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function makeHeartShape(size = 1) {
  const shape = new THREE.Shape()
  const x = 0, y = 0
  shape.moveTo(x + 0.5 * size, y + 0.5 * size)
  shape.bezierCurveTo(x + 0.5 * size, y + 0.5 * size, x + 0.4 * size, y, x, y)
  shape.bezierCurveTo(x - 0.6 * size, y, x - 0.6 * size, y + 0.7 * size, x - 0.6 * size, y + 0.7 * size)
  shape.bezierCurveTo(x - 0.6 * size, y + 1.1 * size, x - 0.3 * size, y + 1.54 * size, x + 0.5 * size, y + 1.9 * size)
  shape.bezierCurveTo(x + 1.2 * size, y + 1.54 * size, x + 1.6 * size, y + 1.1 * size, x + 1.6 * size, y + 0.7 * size)
  shape.bezierCurveTo(x + 1.6 * size, y + 0.7 * size, x + 1.6 * size, y, x + 1.0 * size, y)
  shape.bezierCurveTo(x + 0.7 * size, y, x + 0.5 * size, y + 0.5 * size, x + 0.5 * size, y + 0.5 * size)
  return shape
}

export default function FloatingHeart({ position = [0, 0, 0], scale = 1, glowing = true }) {
  const meshRef = useRef()
  const lightRef = useRef()
  const rimLightRef = useRef()
  const t = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    t.current += delta
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t.current * 0.8) * 0.08
      meshRef.current.rotation.y = Math.sin(t.current * 0.4) * 0.18
      meshRef.current.rotation.z = Math.sin(t.current * 0.3) * 0.05
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.0 + Math.sin(t.current * 1.2) * 0.6
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 0.6 + Math.sin(t.current * 0.8 + 1) * 0.2
    }
  })

  const shape = makeHeartShape(0.16)
  const extrudeSettings = {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  }

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef} rotation={[Math.PI, Math.PI, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#b3002d"
          emissive="#8B0020"
          emissiveIntensity={0.9}
          metalness={0.15}
          roughness={0.25}
        />
      </mesh>
      {glowing && (
        <>
          <pointLight
            ref={lightRef}
            color="#b3002d"
            intensity={2.0}
            distance={4}
            decay={2}
          />
          <pointLight
            ref={rimLightRef}
            color="#FF4060"
            intensity={0.6}
            distance={2.5}
            position={[-0.3, 0.2, 0.5]}
            decay={2}
          />
        </>
      )}
    </group>
  )
}
