import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  const linesMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#00e676", wireframe: true, transparent: true, opacity: 0.15 }),
    []
  );

  return (
    <group>
      <Sphere ref={ref} args={[2, 48, 48]} material={linesMaterial} />
      <Sphere args={[2.02, 48, 48]}>
        <meshBasicMaterial color="#00bcd4" wireframe transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

function FloatingParticles({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00e676" size={0.02} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

export default function Globe({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <GlobeMesh />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
