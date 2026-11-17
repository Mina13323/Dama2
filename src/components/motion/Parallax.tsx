"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Slow, low-amplitude scroll parallax for background imagery. Uses motion
 * values (no React re-renders). The same markup is rendered on the server and
 * the client; `prefers-reduced-motion` is handled in CSS via
 * `.parallax-layer { transform: none !important }` so hydration never drifts.
 */
export function Parallax({ children, amount = 6, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="parallax-layer absolute inset-x-0 -inset-y-[9%] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
