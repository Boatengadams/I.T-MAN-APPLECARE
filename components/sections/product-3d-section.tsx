"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const Iphone3DViewer = dynamic(() => import("../iphone-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Product3DSection() {
  return (
    <section className="px-4 md:px-6 py-12 md:py-20 text-center">
      <motion.h2 
        className="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Experience iPhone in 3D
      </motion.h2>

      <motion.p 
        className="text-gray-300 mt-2 mb-8 md:mb-10 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Rotate • Explore • Choose your style
      </motion.p>

      <GlassCard className="max-w-2xl mx-auto p-4 md:p-6">
        <Iphone3DViewer />
      </GlassCard>

      <motion.div 
        className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-400 text-sm">
          <span className="text-amber-500">💡</span> Drag to rotate • Click colors to change
        </p>
      </motion.div>
    </section>
  );
}