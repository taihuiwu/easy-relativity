import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function MassEnergy() {
  const coreRef = useRef<THREE.Mesh>(null)
  const energyWavesRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 2000

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 4
      const height = (Math.random() - 0.5) * 3
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius

      const t = radius / 5
      colors[i3] = 1.0
      colors[i3 + 1] = 0.8 - t * 0.5
      colors[i3 + 2] = 0.2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geometry }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 4) * 0.15
      coreRef.current.scale.setScalar(pulse)
    }

    if (energyWavesRef.current) {
      energyWavesRef.current.children.forEach((child, index) => {
        const scale = 1 + ((time * 0.5 + index * 0.3) % 3)
        child.scale.setScalar(scale)
        ;(child as THREE.Mesh).material = (child as THREE.Mesh).material as THREE.Material
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = Math.max(0, 0.5 - scale * 0.15)
      })
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.5
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.005
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ff8800" emissiveIntensity={1} metalness={0.5} roughness={0.3} />
      </mesh>

      <group ref={energyWavesRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <ringGeometry args={[1.5, 1.6, 64]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>

      <Text position={[0, -3, 0]} fontSize={0.5} color="#ffcc00" anchorX="center" anchorY="middle">
        E = mc²
      </Text>

      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-2.5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.8} />
      </mesh>

      <pointLight position={[0, 0, 0]} color="#ffcc00" intensity={3} distance={10} />
      <pointLight position={[5, 5, 5]} color="#ff8800" intensity={1} distance={15} />
    </group>
  )
}
