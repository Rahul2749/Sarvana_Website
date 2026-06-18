import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const ParticleInstance = ({ position, rotation, scale }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Instance position={position} rotation={rotation} scale={scale} />
    </Float>
  );
};

const FloatingParticles = ({ count = 50 }) => {
  const particles = useRef([]);
  
  // Generate random particle data once
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        position: [
          (Math.random() - 0.5) * 20, // x
          (Math.random() - 0.5) * 20, // y
          (Math.random() - 0.5) * 10 - 5, // z
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.15 + 0.05,
      });
    }
  }

  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Instances limit={count} range={count}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="#351F13" 
          roughness={0.8}
          metalness={0.2}
          emissive="#D9B44A"
          emissiveIntensity={0.1}
        />
        {particles.current.map((data, i) => (
          <ParticleInstance key={i} {...data} />
        ))}
      </Instances>
    </group>
  );
};

export default FloatingParticles;
