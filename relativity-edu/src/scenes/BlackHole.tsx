import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function BlackHole() {
  const blackHoleRef = useRef<THREE.Mesh>(null)
  const accretionDiskRef = useRef<THREE.Points>(null)
  const eventHorizonRef = useRef<THREE.Mesh>(null)

  const particleCount = 3000

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 4
      const height = (Math.random() - 0.5) * 0.5

      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius

      const t = (radius - 2) / 4
      colors[i3] = 1.0
      colors[i3 + 1] = 0.3 + t * 0.5
      colors[i3 + 2] = 0.1 + t * 0.3
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return { geometry }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y = time * 0.1
    }

    if (eventHorizonRef.current) {
      eventHorizonRef.current.rotation.z = time * 0.5
    }

    if (accretionDiskRef.current) {
      const positionArray = accretionDiskRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const x = positionArray[i3]
        const z = positionArray[i3 + 2]
        const radius = Math.sqrt(x * x + z * z)
        const angle = Math.atan2(z, x)

        const speed = 0.02 / (radius * 0.3)
        const newAngle = angle + speed

        positionArray[i3] = Math.cos(newAngle) * radius
        positionArray[i3 + 2] = Math.sin(newAngle) * radius

        positionArray[i3 + 1] += Math.sin(time * 3 + i * 0.01) * 0.001
      }

      accretionDiskRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh ref={blackHoleRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh ref={eventHorizonRef} position={[0, 0, 0]}>
        <ringGeometry args={[1.5, 1.8, 64]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 64]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <points ref={accretionDiskRef} geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[5, 6, 64]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight position={[3, 0, 0]} color="#ff6600" intensity={2} distance={10} />
      <pointLight position={[-3, 0, 0]} color="#ff4400" intensity={2} distance={10} />
    </group>
  )
}
