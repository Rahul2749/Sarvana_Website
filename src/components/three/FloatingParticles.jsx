import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Coffee Bean ─── */
const CoffeeBean = ({ position, rotation, scale, speed }) => {
  const meshRef = useRef();
  const phaseX = useRef(Math.random() * Math.PI * 2);
  const phaseY = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.z += 0.002 * speed;
    meshRef.current.position.y = position[1] + Math.sin(t + phaseY.current) * 0.5;
    meshRef.current.position.x = position[0] + Math.sin(t * 0.7 + phaseX.current) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial
        color="#5A3A25"
        roughness={0.55}
        metalness={0.25}
        emissive="#8B6914"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

/* ─── Tea Leaf ─── */
const TeaLeaf = ({ position, rotation, scale, speed }) => {
  const meshRef = useRef();
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.y += 0.004 * speed;
    meshRef.current.rotation.z = Math.sin(t + phaseRef.current) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phaseRef.current) * 0.6;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1.5, 2.5]} />
      <meshStandardMaterial
        color="#4A7A28"
        roughness={0.6}
        side={THREE.DoubleSide}
        emissive="#2D5016"
        emissiveIntensity={0.2}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
};

/* ─── Jaggery Cube ─── */
const JaggeryCube = ({ position, rotation, scale, speed }) => {
  const meshRef = useRef();
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x += 0.002 * speed;
    meshRef.current.rotation.y += 0.003 * speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + phaseRef.current) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#C8943E"
        roughness={0.4}
        metalness={0.3}
        emissive="#D9B44A"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

/* ─── Main Component ─── */
const FloatingParticles = ({ count = 25 }) => {
  const groupRef = useRef();

  const objects = useMemo(() => {
    const items = [];
    const beanCount = Math.floor(count * 0.4);
    const leafCount = Math.floor(count * 0.3);
    const jaggeryCount = count - beanCount - leafCount;

    for (let i = 0; i < beanCount; i++) {
      items.push({
        type: 'bean',
        position: [
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 8 - 5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.12 + 0.06,
        speed: Math.random() * 0.4 + 0.3,
      });
    }

    for (let i = 0; i < leafCount; i++) {
      items.push({
        type: 'leaf',
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 6 - 6,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.14 + 0.08,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    for (let i = 0; i < jaggeryCount; i++) {
      items.push({
        type: 'jaggery',
        position: [
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 6 - 7,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.15 + 0.08,
        speed: Math.random() * 0.3 + 0.2,
      });
    }

    return items;
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => {
        switch (obj.type) {
          case 'bean': return <CoffeeBean key={i} {...obj} />;
          case 'leaf': return <TeaLeaf key={i} {...obj} />;
          default: return <JaggeryCube key={i} {...obj} />;
        }
      })}
    </group>
  );
};

export default FloatingParticles;
