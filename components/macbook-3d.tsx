"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function MacBookModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  
  return <primitive object={scene} scale={2.5} position={[0, -0.5, 0]} />;
}

export default function MacBook3DViewer({ productId }: { productId?: string }) {
  const modelPath = productId 
    ? require("@/lib/model-mapping").getModelForProduct(productId)
    : "/models/macbook.glb";
  
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          <MacBookModel modelPath={modelPath} />
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
      
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl pointer-events-none" />
    </div>
  );
}