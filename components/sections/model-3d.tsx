"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { IPhoneModel } from "@/components/3d/iphone-model";
import { Box } from "@react-three/drei";

function Loader() {
  return (
    <Box args={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial color="#d97706" wireframe />
    </Box>
  );
}

function Scene({ image }: { image?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <Suspense fallback={<Loader />}>
        <IPhoneModel scrollProgress={0} image={image} />
      </Suspense>
    </>
  );
}

export function Model3D({ className = "", image }: { className?: string; image?: string }) {
  if (!image) {
return (
    <div className={`flex items-center justify-center ${className}`}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

return (
  <div className={`flex items-center justify-center ${className}`}>
    <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }}>
      <Scene image={image} />
    </Canvas>
  </div>
  );
}