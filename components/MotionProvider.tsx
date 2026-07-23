'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Wraps the app so every Framer Motion component honors the OS
 * "reduce motion" setting: transform/layout animations are dropped
 * (elements jump to their target) while opacity still fades.
 * Complements the CSS @media (prefers-reduced-motion) block in globals.css,
 * which only covers CSS transitions/animations — not JS-driven motion.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
