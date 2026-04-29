import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function LengthContraction() {
  const shipRef = useRef<THREE.Group>(null)
  const gridRef = useRef<THREE.GridHelper>(null)
  const warpFieldRef = useRef<THREE.Mesh>(null)
  
  const trailGeometry = useMemo(() => {
    const positions = new Float32Array(300 * 3)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (shipRef.current) {
      const contractionFactor = 0.5 + Math.sin(time * 0.5) * 0.3
      shipRef.current.scale.x = contractionFactor
      shipRef.current.scale.y = 1
      shipRef.current.scale.z = 1
      shipRef.current.position.x = Math.sin(time * 0.3) * 3
      shipRef.current.position.y = Math.cos(time * 0.4) * 0.5
    }

    if (warpFieldRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.2
      warpFieldRef.current.scale.set(scale, 1, scale)
      ;(warpFieldRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(time * 3) * 0.1
    }
  })

  return (
    <group>
      <group ref={shipRef} position={[0, 0, 0]}>
        <mesh>
          <capsuleGeometry args={[0.3, 1.5, 8, 16]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff4444" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
        </mesh>
        
        <mesh position={[0, 0, -1]}>
          <coneGeometry args={[0.4, 0.8, 8]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.8} transparent opacity={0.7} />
        </mesh>

        <mesh position={[0.5, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4a9eff" emissive="#2a5eff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.5, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#4a9eff" emissive="#2a5eff" emissiveIntensity={0.5} />
        </mesh>

        <pointLight position={[0, 0, 2]} color="#ff6b6b" intensity={2} distance={5} />
      </group>

      <mesh ref={warpFieldRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 3, 32]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      <gridHelper args={[20, 20, '#333366', '#222244']} position={[0, -2, 0]} />

      <mesh position={[0, -2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#0a0a1a" transparent opacity={0.8} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[4, 0.02, 8, 100]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.5} />
      </mesh>

      <pointLight position={[10, 10, 10]} color="#ffffff" intensity={0.5} />
      <pointLight position={[-10, 5, -10]} color="#ff6b6b" intensity={0.5} />
    </group>
  )
}
