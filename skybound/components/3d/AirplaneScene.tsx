"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AirplaneMesh({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const fuselageRef = useRef<THREE.Mesh>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const engineL = useRef<THREE.Group>(null);
  const engineR = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;

    // Mouse reaction
    const targetX = mousePos.x * 0.3;
    const targetY = mousePos.y * 0.2;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.04;

    // Wing flex
    if (wingLeftRef.current) {
      wingLeftRef.current.rotation.z = Math.sin(t * 0.7) * 0.02 - 0.05;
    }
    if (wingRightRef.current) {
      wingRightRef.current.rotation.z = Math.sin(t * 0.7) * 0.02 + 0.05;
    }

    // Engine spin
    if (engineL.current) engineL.current.rotation.z -= 0.08;
    if (engineR.current) engineR.current.rotation.z -= 0.08;
  });

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xf0f4f8),
        metalness: 0.85,
        roughness: 0.1,
        reflectivity: 1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x38bdf8),
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  const engineMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x1e293b),
        metalness: 0.95,
        roughness: 0.05,
      }),
    []
  );

  const stripeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x0ea5e9),
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main fuselage */}
      <mesh ref={fuselageRef} material={bodyMat} castShadow>
        <capsuleGeometry args={[0.28, 2.8, 8, 24]} />
        <meshPhysicalMaterial {...(bodyMat as any)} />
      </mesh>

      {/* Cockpit windows */}
      <mesh position={[0, 0.12, 1.3]} material={glassMat}>
        <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>

      {/* Stripe */}
      <mesh position={[0, 0.08, 0]} material={stripeMat}>
        <torusGeometry args={[0.285, 0.012, 8, 60]} />
      </mesh>

      {/* Left wing */}
      <mesh
        ref={wingLeftRef}
        position={[-1.3, -0.08, 0.1]}
        rotation={[0, 0.08, -0.04]}
        material={bodyMat}
        castShadow
      >
        <boxGeometry args={[1.8, 0.06, 0.7]} />
      </mesh>

      {/* Right wing */}
      <mesh
        ref={wingRightRef}
        position={[1.3, -0.08, 0.1]}
        rotation={[0, -0.08, 0.04]}
        material={bodyMat}
        castShadow
      >
        <boxGeometry args={[1.8, 0.06, 0.7]} />
      </mesh>

      {/* Tail wing horizontal */}
      <mesh
        ref={tailRef}
        position={[0, 0, -1.35]}
        material={bodyMat}
        castShadow
      >
        <boxGeometry args={[1.1, 0.05, 0.4]} />
      </mesh>

      {/* Tail fin vertical */}
      <mesh position={[0, 0.35, -1.3]} material={bodyMat} castShadow>
        <boxGeometry args={[0.05, 0.6, 0.45]} />
      </mesh>

      {/* Left engine */}
      <group position={[-1.0, -0.22, 0.15]}>
        <mesh material={engineMat} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.6, 16]} />
        </mesh>
        <group ref={engineL} position={[0, 0, 0.31]}>
          <mesh material={engineMat}>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          </mesh>
        </group>
        {/* Exhaust glow */}
        <pointLight position={[0, 0, -0.4]} color="#f59e0b" intensity={0.5} distance={1} />
      </group>

      {/* Right engine */}
      <group position={[1.0, -0.22, 0.15]}>
        <mesh material={engineMat} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.6, 16]} />
        </mesh>
        <group ref={engineR} position={[0, 0, 0.31]}>
          <mesh material={engineMat}>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          </mesh>
        </group>
        <pointLight position={[0, 0, -0.4]} color="#f59e0b" intensity={0.5} distance={1} />
      </group>

      {/* Landing gear struts */}
      {[[-0.3, -0.4, 0.4], [0.3, -0.4, 0.4], [0, -0.4, -0.9]].map(([x, y, z], i) => (
        <group key={i} position={[x as number, y as number, z as number]}>
          <mesh material={engineMat}>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
          </mesh>
          <mesh position={[0, -0.14, 0]} material={engineMat}>
            <torusGeometry args={[0.06, 0.025, 8, 16, Math.PI]} />
          </mesh>
        </group>
      ))}

      {/* Wing tips lights */}
      <pointLight position={[-2.0, -0.1, 0.1]} color="#ff4444" intensity={2} distance={0.4} />
      <pointLight position={[2.0, -0.1, 0.1]} color="#44ff44" intensity={2} distance={0.4} />

      {/* Cabin glow */}
      {[-0.6, -0.1, 0.4, 0.9].map((z, i) => (
        <mesh key={i} position={[0.28, 0.04, z]} material={glassMat}>
          <boxGeometry args={[0.01, 0.06, 0.06]} />
        </mesh>
      ))}
      {[-0.6, -0.1, 0.4, 0.9].map((z, i) => (
        <mesh key={`r${i}`} position={[-0.28, 0.04, z]} material={glassMat}>
          <boxGeometry args={[0.01, 0.06, 0.06]} />
        </mesh>
      ))}
    </group>
  );
}

function CloudParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={new THREE.Color(0xbae6fd)}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function OrbFlags() {
  const flags = ["🇯🇵", "🇮🇹", "🇲🇻", "🇹🇿", "🇦🇷", "🇬🇷", "🇮🇸", "🇵🇪"];
  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refs.current.forEach((ref, i) => {
      if (!ref) return;
      const angle = (i / flags.length) * Math.PI * 2 + t * 0.2;
      const r = 2.8;
      ref.position.x = Math.cos(angle) * r;
      ref.position.z = Math.sin(angle) * r;
      ref.position.y = Math.sin(t * 0.5 + i) * 0.3;
      ref.lookAt(0, 0, 0);
    });
  });

  return (
    <>
      {flags.map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <mesh>
            <planeGeometry args={[0.3, 0.2]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL(i / flags.length, 0.7, 0.6)}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color={new THREE.Color(0xfff5e0)}
        castShadow
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.5}
        color={new THREE.Color(0x60a5fa)}
      />
      <pointLight position={[0, 4, 3]} intensity={1} color={new THREE.Color(0x38bdf8)} distance={8} />
      <Environment preset="city" />
    </>
  );
}

export default function AirplaneScene({
  mousePos,
}: {
  mousePos: { x: number; y: number };
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      aria-hidden="true"
    >
      <SceneLighting />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <AirplaneMesh mousePos={mousePos} />
      </Float>
      <OrbFlags />
      <CloudParticles />
      <Sparkles
        count={60}
        scale={10}
        size={1.5}
        speed={0.2}
        color={new THREE.Color(0x7dd3fc)}
        opacity={0.4}
      />
    </Canvas>
  );
}
