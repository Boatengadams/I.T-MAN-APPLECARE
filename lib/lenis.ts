import Lenis from "lenis";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function createLenis() {
  const lenis = new Lenis({
    duration: isMobile ? 0.8 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: isMobile ? 0.8 : 1,
    touchMultiplier: 2,
    infinite: false,
  });

  let rafId: number | null = null;
  let isRunning = true;

  function raf(time: number) {
    if (!isRunning) return;
    
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      rafId = requestAnimationFrame(raf);
    }
  }

  function stop() {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  rafId = requestAnimationFrame(raf);

  return {
    lenis,
    start,
    stop,
    destroy: () => {
      stop();
      lenis.destroy();
    },
  };
}