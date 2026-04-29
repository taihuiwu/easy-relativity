import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export function GravitationalLens() {
  const lensRef = useRef<THREE.Mesh>(null)

  const lightRays = useMemo(() => {
    const rays = []
    const rayCount = 20
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2
      const radius = 8
      rays.push({ startX: Math.cos(angle) * radius, startY: Math.sin(angle) * radius })
    }
    return rays
  }, [])

  const initialLinePoints = useMemo(() => {
    return lightRays.map((ray) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(ray.startX, ray.startY, -10),
        new THREE.Vector3(ray.startX * 0.3, ray.startY * 0.3, 0),
        new THREE.Vector3(-ray.startX * 0.5, -ray.startY * 0.5, 10)
      )
      return curve.getPoints(20)
    })
  }, [lightRays])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (lensRef.current) {
      lensRef.current.rotation.y = time * 0.2
      lensRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05)
    }
  })

  return (
    <group>
      <mesh ref={lensRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#0a0a1e" emissiveIntensity={0.2} transparent opacity={0.9} metalness={0.9} roughness={0.1} />
        <pointLight color="#4a4aff" intensity={2} distance={8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[2.2, 2.5, 64]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {initialLinePoints.map((points, index) => (
        <Line key={index} points={points} color="#ffff88" transparent opacity={0.5} lineWidth={1} />
      ))}
      <mesh position={[0, 0, -12]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#ffffff" intensity={1} distance={5} />
      </mesh>
    </group>
  )
}
