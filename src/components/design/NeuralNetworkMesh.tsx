
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleNetwork = ({ count = 100 }) => {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Spread particles across a wide area but roughly centered
      pos[i * 3] = (Math.random() - 0.5) * 10;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;  // z
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    // Slow rotation
    points.current.rotation.x = state.clock.elapsedTime * 0.05;
    points.current.rotation.y = state.clock.elapsedTime * 0.03;

    // Mouse interaction (subtle parallax)
    const { mouse } = state;
    // Lerp towards mouse position for a "following" feel on the entire cloud
    points.current.position.x += (mouse.x * 0.5 - points.current.position.x) * 0.02;
    points.current.position.y += (-mouse.y * 0.5 - points.current.position.y) * 0.02;
  });

  return (
    <group>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4C5B0" // Sand-ish color
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      {/* Connections could be added here, but for performance and "subtle" look, 
          a density of points often simulates a network well enough without heavy line calculations per frame. 
          If explicit lines are needed, use a shader or LineSegments. 
          For now, we stick to the subtle floating nodes which look like a "cloud" or "network". 
      */}
    </group>
  );
};

const NeuralNetworkMesh = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: true, alpha: true }}
        eventSource={document.body} // Listen to events on the body
        eventPrefix="client"
        style={{ pointerEvents: 'none' }} // Ensure canvas itself lets clicks through
      >
        <ParticleNetwork count={150} />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkMesh;
