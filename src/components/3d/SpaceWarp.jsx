import React, { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile } from '../../hooks/useIsMobile.js'

const SpaceWarp = forwardRef(function SpaceWarp({ progress = 0 }, ref) {
  const isMobile = useIsMobile()
  const starCount = isMobile ? 500 : 1100
  const cherryCount = isMobile ? 80 : 200

  const whiteRef = useRef()
  const cherryRef = useRef()

  const { whitePositions, whiteVelocities } = useMemo(() => {
    const pos = new Float32Array(starCount * 3)
    const vel = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.1 + Math.random() * 5.5
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
      vel[i] = 0.3 + Math.random() * 0.7
    }
    return { whitePositions: pos, whiteVelocities: vel }
  }, [starCount])

  const { cherryPositions, cherryVelocities } = useMemo(() => {
    const pos = new Float32Array(cherryCount * 3)
    const vel = new Float32Array(cherryCount)
    for (let i = 0; i < cherryCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.05 + Math.random() * 2.5
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
      vel[i] = 0.5 + Math.random() * 1.0
    }
    return { cherryPositions: pos, cherryVelocities: vel }
  }, [cherryCount])

  const whitePos = useMemo(() => new Float32Array(whitePositions), [whitePositions])
  const cherryPos = useMemo(() => new Float32Array(cherryPositions), [cherryPositions])

  useFrame((state, delta) => {
    const speed = THREE.MathUtils.lerp(0.04, 3.8, progress)
    const stretch = THREE.MathUtils.lerp(0.05, 0.55, progress)

    if (whiteRef.current) {
      const pos = whiteRef.current.geometry.attributes.position.array
      for (let i = 0; i < starCount; i++) {
        pos[i * 3 + 2] += speed * whiteVelocities[i] * delta * 60
        if (pos[i * 3 + 2] > 20) {
          pos[i * 3 + 2] = -40
          const angle = Math.random() * Math.PI * 2
          const radius = 0.1 + Math.random() * 5.5
          pos[i * 3]     = Math.cos(angle) * radius
          pos[i * 3 + 1] = Math.sin(angle) * radius
        }
      }
      whiteRef.current.geometry.attributes.position.needsUpdate = true
      whiteRef.current.material.size = THREE.MathUtils.lerp(0.05, stretch, progress)
    }

    if (cherryRef.current) {
      const pos = cherryRef.current.geometry.attributes.position.array
      for (let i = 0; i < cherryCount; i++) {
        pos[i * 3 + 2] += speed * cherryVelocities[i] * delta * 60 * 1.4
        if (pos[i * 3 + 2] > 20) {
          pos[i * 3 + 2] = -40
          const angle = Math.random() * Math.PI * 2
          const radius = 0.05 + Math.random() * 2.5
          pos[i * 3]     = Math.cos(angle) * radius
          pos[i * 3 + 1] = Math.sin(angle) * radius
        }
      }
      cherryRef.current.geometry.attributes.position.needsUpdate = true
      cherryRef.current.material.size = THREE.MathUtils.lerp(0.06, stretch * 1.3, progress)
      cherryRef.current.material.opacity = THREE.MathUtils.lerp(0.5, 0.95, progress)
    }
  })

  return (
    <group>
      <points ref={whiteRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={whitePos} count={starCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#F5EFE6"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
          fog={false}
          depthWrite={false}
        />
      </points>
      <points ref={cherryRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={cherryPos} count={cherryCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#b3002d"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.5}
          fog={false}
          depthWrite={false}
        />
      </points>
    </group>
  )
})

export default SpaceWarp
