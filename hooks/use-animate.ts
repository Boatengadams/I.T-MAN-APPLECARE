"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseAnimateOptions {
  trigger?: string | HTMLElement;
  start?: string;
  stagger?: number;
}

export function useAnimate(ref: React.RefObject<HTMLElement>, options: UseAnimateOptions = {}) {
  const { trigger, start = "top 80%", stagger = 0.1 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const children = el.children;

    if (children.length === 0) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger || el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      gsap.fromTo(
        children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger || el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, trigger, start, stagger]);
}