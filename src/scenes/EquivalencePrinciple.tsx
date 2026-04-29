import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function EquivalencePrinciple() {
  const elevatorRef = useRef<THREE.Group>(null)
  const appleRef = useRef<THREE.Mesh>(null)
  const arrowRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 1000

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 15
      positions[i3 + 1] = (Math.random() - 0.5) * 15
      positions[i3 + 2] = (Math.random() - 0.5) * 15

      colors[i3] = 0.3 + Math.random() * 0.2
      colors[i3 + 1] = 0.5 + Math.random() * 0.3
      colors[i3 + 2] = 0.8 + Math.random() * 0.2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geometry }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (elevatorRef.current) {
      elevatorRef.current.position.y = Math.sin(time * 0.5) * 0.5
    }

    if (appleRef.current) {
      const fallProgress = (time % 3) / 3
      appleRef.current.position.y = 1.5 - fallProgress * 2
      if (fallProgress > 0.95) {
        appleRef.current.position.y = 1.5
      }
    }

    if (arrowRef.current) {
      arrowRef.current.position.y = -2 + Math.sin(time * 2) * 0.2
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group>
      <group ref={elevatorRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshStandardMaterial color="#334455" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[2.1, 0.1, 2.1]} />
          <meshStandardMaterial color="#445566" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[2.1, 0.1, 2.1]} />
          <meshStandardMaterial color="#445566" metalness={0.5} roughness={0.5} />
        </mesh>

        <mesh ref={appleRef} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ff4444" emissive="#aa2222" emissiveIntensity={0.3} />
        </mesh>

        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[1.5, 2]} />
          <meshBasicMaterial color="#223344" transparent opacity={0.5} />
        </mesh>
      </group>

      <group ref={arrowRef} position={[0, -2, 0]}>
        <mesh rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.3, 0.5, 8]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.5} />
        </mesh>
      </group>

      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>

      <pointLight position={[5, 5, 5]} color="#ffffff" intensity={1} />
      <pointLight position={[-5, 3, -5]} color="#4a9eff" intensity={0.5} />
    </group>
  )
}
