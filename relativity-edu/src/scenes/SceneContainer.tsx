import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { LightSpeedShip } from './LightSpeedShip'
import { SpacetimeCurvature } from './SpacetimeCurvature'
import { GravitationalLens } from './GravitationalLens'
import { BlackHole } from './BlackHole'

interface SceneContainerProps {
  scene: string
}

export function SceneContainer({ scene }: SceneContainerProps) {
  const renderScene = () => {
    switch (scene) {
      case 'lightSpeed':
        return <LightSpeedShip />
      case 'spacetimeCurvature':
        return <SpacetimeCurvature />
      case 'gravitationalLens':
        return <GravitationalLens />
      case 'blackHole':
        return <BlackHole />
      default:
        return <LightSpeedShip />
    }
  }

  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <Suspense fallback={null}>
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {renderScene()}
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </Canvas>
  )
}
