import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import FloatingParticles from './FloatingParticles';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ScrollController = () => {
  const scroll = useScroll();
  const group = useRef();
  
  useFrame(() => {
    if (group.current && scroll) {
      group.current.position.y = scroll.offset * 10;
    }
  });

  return (
    <group ref={group}>
      <FloatingParticles count={100} />
    </group>
  );
};

const HeroScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 15], fov: 45 }}
        frameloop="demand"
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D9B44A" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C8943E" />
        
        <Suspense fallback={null}>
          <FloatingParticles count={80} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
