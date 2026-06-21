import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useCallback, useState } from 'react';
import FloatingParticles from './FloatingParticles';
import GoldenDust from './GoldenDust';

/* Mouse-reactive camera controller */
const CameraController = () => {

  const targetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useFrame((state) => {
    state.camera.rotation.y += (-targetRef.current.x * 0.02 - state.camera.rotation.y) * 0.03;
    state.camera.rotation.x += (-targetRef.current.y * 0.015 - state.camera.rotation.x) * 0.03;
  });

  return null;
};

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reduce or disable Three.js on mobile for performance
  if (isMobile) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 45 }}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Warm premium lighting */}
        <ambientLight intensity={0.5} color="#FFF5E6" />
        <pointLight position={[10, 8, 8]} intensity={1} color="#D9B44A" distance={35} decay={2} />
        <pointLight position={[-8, -5, 6]} intensity={0.5} color="#C8943E" distance={30} decay={2} />

        <CameraController />

        <Suspense fallback={null}>
          <FloatingParticles count={20} />
          <GoldenDust count={60} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
