"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

interface iPhoneModelProps {
  scrollProgress?: number;
  image?: string;
}

export function IPhoneModel({ scrollProgress = 0, image }: iPhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = image ? useLoader(THREE.TextureLoader, image) : null;

  useFrame((state) => {
    if (!groupRef.current) return;

    const baseRotation = state.clock.elapsedTime * 0.25;
    const scrollRotation = scrollProgress * Math.PI * 2;
    const scrollZ = scrollProgress * -2;
    const scale = 1 - scrollProgress * 0.3;

    groupRef.current.rotation.y = baseRotation + scrollRotation;
    groupRef.current.position.z = scrollZ;
    groupRef.current.scale.setScalar(scale);
  });

  const frameColor = texture ? "#1a1a1a" : "#e5e5e5";
  
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        <RoundedBox args={[1.45, 2.9, 0.12]} radius={0.18} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={frameColor} 
            metalness={0.95} 
            roughness={0.08}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        <RoundedBox args={[1.32, 2.7, 0.02]} radius={0.12} smoothness={4} position={[0, 0, 0.065]}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.1} 
            roughness={0.3}
          />
        </RoundedBox>

        {texture && (
          <RoundedBox args={[1.28, 2.66, 0.005]} radius={0.1} smoothness={4} position={[0, 0, 0.075]}>
            <meshStandardMaterial 
              map={texture} 
              metalness={0.05} 
              roughness={0.25}
            />
          </RoundedBox>
        )}

        <group position={[0.72, 0.95, 0.07]}>
          <RoundedBox args={[0.18, 0.4, 0.02]} radius={0.04} smoothness={2}>
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.5} />
          </RoundedBox>
        </group>

        <mesh position={[0, 1.42, 0.07]}>
          <planeGeometry args={[0.35, 0.08]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.5} />
        </mesh>

        <RoundedBox args={[0.04, 0.8, 0.04]} radius={0.01} position={[-0.74, 0, 0]}>
          <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.04, 0.3, 0.04]} radius={0.01} position={[-0.74, 1, 0]}>
          <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.04, 0.3, 0.04]} radius={0.01} position={[0.74, 1, 0]}>
          <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.1} />
        </RoundedBox>

        <RoundedBox args={[0.5, 0.04, 0.04]} radius={0.01} position={[0, -1.44, 0]}>
          <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.1} />
        </RoundedBox>

        <mesh position={[0, 0, -0.065]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </Float>
  );
}