import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function LightSpeedShip() {
  const shipRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 2000

  const { velocities, geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 40
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 40
      velocities[i] = Math.random() * 0.5 + 0.5

      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        colors[i3] = 0.3
        colors[i3 + 1] = 0.5
        colors[i3 + 2] = 1.0
      } else if (colorChoice < 0.6) {
        colors[i3] = 0.8
        colors[i3 + 1] = 0.9
        colors[i3 + 2] = 1.0
      } else {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.8
        colors[i3 + 2] = 0.3
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return { velocities, geometry }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positionArray[i3 + 2] += velocities[i] * 2

      if (positionArray[i3 + 2] > 20) {
        positionArray[i3 + 2] = -20
        positionArray[i3] = (Math.random() - 0.5) * 40
        positionArray[i3 + 1] = (Math.random() - 0.5) * 20
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true

    if (shipRef.current) {
      shipRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group>
      <group ref={shipRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.3, 1.5, 8]} />
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#2a5eff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, -0.3, -0.5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#3a8eff"
            emissive="#1a4eff"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0, 0, -1.5]}>
          <cylinderGeometry args={[0.1, 0.3, 1, 8]} />
          <meshStandardMaterial
            color="#2a7eff"
            emissive="#0a3eff"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <pointLight position={[0, 0, 1]} color="#4a9eff" intensity={2} distance={5} />
      </group>

      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0a0a1a" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
