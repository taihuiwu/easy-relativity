import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpacetimeCurvature() {
  const gridRef = useRef<THREE.Mesh>(null)
  const massRef = useRef<THREE.Mesh>(null)
  const gridSize = 20
  const segments = 50

  const originalPositions = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments)
    return new Float32Array(geometry.attributes.position.array)
  }, [])

  useFrame((state) => {
    if (!gridRef.current) return
    const geometry = gridRef.current.geometry
    const positionAttribute = geometry.attributes.position
    const time = state.clock.elapsedTime
    const massX = Math.sin(time * 0.3) * 3
    const massY = Math.cos(time * 0.3) * 3

    if (massRef.current) {
      massRef.current.position.x = massX
      massRef.current.position.y = massY
    }

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = originalPositions[i * 3]
      const y = originalPositions[i * 3 + 1]
      const dx = x - massX
      const dy = y - massY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const curvature = -3 / (distance + 0.5)
      const wave = Math.sin(distance * 0.5 - time * 2) * 0.1
      positionAttribute.setZ(i, curvature + wave)
    }
    positionAttribute.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <group rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <mesh ref={gridRef}>
        <planeGeometry args={[gridSize, gridSize, segments, segments]} />
        <meshStandardMaterial color="#1a4a8a" wireframe emissive="#0a2a4a" emissiveIntensity={0.3} transparent opacity={0.8} />
      </mesh>
      <mesh ref={massRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffa500" emissive="#ff6600" emissiveIntensity={0.5} metalness={0.3} roughness={0.7} />
        <pointLight color="#ff6600" intensity={3} distance={10} />
      </mesh>
    </group>
  )
}
