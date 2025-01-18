import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Glitch, Noise } from '@react-three/postprocessing';

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

function FloatingParticles() {
  const particles = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particles.current) {
      particles.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(
            [...Array(3000)].flatMap(() => [
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ])
          )}
          count={3000}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} />
    </points>
  );
}

function RotatingRings() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusBufferGeometry args={[2, 0.1, 16, 100]} />
      <meshStandardMaterial color="cyan" emissive="blue" emissiveIntensity={0.5} />
    </mesh>
  );
}

function GradientBackground() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeBufferGeometry args={[10, 10]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(sin(vUv.x * 3.14 + uTime) * 0.5 + 0.5, vUv.y, cos(vUv.y * 3.14 + uTime) * 0.5 + 0.5, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function PostProcessingEffects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.5} />
      <Noise opacity={0.2} />
      <Glitch />
    </EffectComposer>
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
        <FloatingParticles />
        <RotatingRings />
        <GradientBackground />
        <PostProcessingEffects />
      </Canvas>
    </div>
  );
}
