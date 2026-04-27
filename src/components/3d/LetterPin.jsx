import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function LetterPin({
  letter,
  position,
  rotation = [0, 0, 0],
  onOpen,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const t = useRef(Math.random() * Math.PI * 2)
  const currentY = useRef(position[1])
  const targetY = useRef(position[1])

  const { gl } = useThree()

  useFrame((state, delta) => {
    t.current += delta * 0.5
    const baseFloat = Math.sin(t.current) * 0.015
    const hoverLift = hovered ? 0.12 : 0
    targetY.current = position[1] + baseFloat + hoverLift
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY.current, delta * 4)

    if (groupRef.current) {
      groupRef.current.position.y = currentY.current
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1] + Math.sin(t.current * 0.5) * 0.1,
          delta * 3
        )
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotation[1],
          delta * 3
        )
      }
    }
  })

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    gl.domElement.style.cursor = 'pointer'
  }

  const handlePointerLeave = (e) => {
    e.stopPropagation()
    setHovered(false)
    gl.domElement.style.cursor = 'default'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onOpen(letter)
  }

  const paperColor = hovered ? '#EDE8E0' : '#E8E0D4'
  const emissiveIntensity = hovered ? 0.18 : 0.04
  // Cherry glow on the pin when hovered
  const pinColor = hovered ? '#e8003d' : '#C4847A'

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      rotation={rotation}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* Paper card body */}
      <mesh castShadow>
        <boxGeometry args={[0.56, 0.72, 0.025]} />
        <meshStandardMaterial
          color={paperColor}
          emissive={hovered ? '#b3002d' : '#4A3030'}
          emissiveIntensity={emissiveIntensity}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* Card border highlight when hovered */}
      {hovered && (
        <mesh position={[0, 0, 0.013]}>
          <boxGeometry args={[0.58, 0.74, 0.002]} />
          <meshBasicMaterial color="#b3002d" transparent opacity={0.25} />
        </mesh>
      )}

      {/* Decorative lines on card */}
      {[0.12, 0.02, -0.08, -0.18].map((y, i) => (
        <mesh key={i} position={[0, y, 0.015]}>
          <planeGeometry args={[0.32 - i * 0.03, 0.012]} />
          <meshBasicMaterial
            color={hovered ? '#b3002d' : '#C4A882'}
            transparent
            opacity={hovered ? 0.5 : 0.30}
          />
        </mesh>
      ))}

      {/* Emoji label */}
      <Text
        position={[0, 0.26, 0.016]}
        fontSize={0.1}
        color={hovered ? '#e8003d' : '#8B6F5E'}
        anchorX="center"
        anchorY="middle"
      >
        {letter.emoji}
      </Text>

      {/* Pushpin */}
      <mesh position={[0, 0.3, 0.025]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial
          color={pinColor}
          metalness={0.6}
          roughness={0.25}
          emissive={hovered ? '#b3002d' : '#000'}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Hover glow light */}
      {hovered && (
        <pointLight
          color="#b3002d"
          intensity={1.2}
          distance={1.8}
          decay={2}
          position={[0, 0, 0.3]}
        />
      )}
    </group>
  )
}
