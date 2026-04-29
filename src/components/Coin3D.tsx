import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import coinTexture from "@/assets/coin-face.png";

function Coin() {
  const ref = useRef<THREE.Group>(null);
  const tex = useTexture(coinTexture);
  tex.anisotropy = 8;

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.6;
    const mx = state.pointer.x * 0.4;
    const my = state.pointer.y * 0.3;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, my, 0.05);
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, mx * 0.2, 0.05);
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <cylinderGeometry args={[1.4, 1.4, 0.2, 96]} />
        <meshStandardMaterial color="#d4a017" metalness={0.95} roughness={0.25} />
      </mesh>
      {/* Front face */}
      <mesh position={[0, 0.101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.38, 96]} />
        <meshStandardMaterial map={tex} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Back face */}
      <mesh position={[0, -0.101, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.38, 96]} />
        <meshStandardMaterial map={tex} metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function Coin3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 4.2], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff5d0" />
      <directionalLight position={[-4, -1, -2]} intensity={0.6} color="#ff7a3c" />
      <Suspense fallback={null}>
        <Coin />
        <Environment preset="sunset" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} blur={2.5} far={3} />
      </Suspense>
    </Canvas>
  );
}
