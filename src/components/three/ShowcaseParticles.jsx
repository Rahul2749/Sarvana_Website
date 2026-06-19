import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 60 }) => {
  const pointsRef = useRef(null);

  // Generate random positions and speeds for the particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // z
      
      spd[i] = 0.05 + Math.random() * 0.1; // speed
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      // Float upwards
      positionsArray[i * 3 + 1] += speeds[i] * delta;
      
      // Gentle sway
      positionsArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01 * delta;

      // Reset if it goes too high
      if (positionsArray[i * 3 + 1] > 7.5) {
        positionsArray[i * 3 + 1] = -7.5;
        positionsArray[i * 3] = (Math.random() - 0.5) * 15;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#D9B44A"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ShowcaseParticles = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ShowcaseParticles;
