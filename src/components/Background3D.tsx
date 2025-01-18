import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSpheres() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 16, 16]}
          position={[
            Math.sin(i * 2) * 3,
            Math.cos(i * 2) * 3,
            Math.sin(i * 3) * 3,
          ]}
        >
          <meshStandardMaterial
            color={`hsl(${i * 45}, 70%, 50%)`}
            transparent
            opacity={0.6}
            emissive={`hsl(${i * 45}, 70%, 30%)`}
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <AnimatedSpheres />
      </Canvas>
    </div>
  );
}