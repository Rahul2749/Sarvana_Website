import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldenDust = ({ count = 80 }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.2 + 0.05;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] += speeds[i] * 0.008;

      if (posArr[i3 + 1] > 13) {
        posArr[i3 + 1] = -13;
        posArr[i3] = (Math.random() - 0.5) * 28;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.material.opacity = 0.4 + Math.sin(t * 0.5) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D9B44A"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default GoldenDust;
