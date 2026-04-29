import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function TimeDilation() {
  const clockGroupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const timeRingRef = useRef<THREE.Mesh>(null)
  
  const particleCount = 1500

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 3 + Math.random() * 5
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)

      const t = r / 8
      colors[i3] = 0.2 + t * 0.3
      colors[i3 + 1] = 0.5 + t * 0.3
      colors[i3 + 2] = 1.0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geometry }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (clockGroupRef.current) {
      clockGroupRef.current.rotation.y = time * 0.3
    }
    
    if (timeRingRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1
      timeRingRef.current.scale.set(scale, scale, 1)
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <group>
      <group ref={clockGroupRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.1, 16, 100]} />
          <meshStandardMaterial color="#4a9eff" emissive="#2a5eff" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh ref={timeRingRef}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00aaaa" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>

        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        
        <mesh rotation={[0, 0, Math.PI / 6]} position={[0.3, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#4a9eff" emissiveIntensity={1} />
        </mesh>

        <Text position={[0, -2.5, 0]} fontSize={0.4} color="#4a9eff" anchorX="center" anchorY="middle">
          时间膨胀
        </Text>
      </group>

      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>

      <pointLight position={[5, 5, 5]} color="#4a9eff" intensity={2} distance={15} />
      <pointLight position={[-5, -5, 5]} color="#00ffff" intensity={1} distance={10} />
    </group>
  )
}
