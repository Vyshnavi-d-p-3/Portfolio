/** Shared motion settings that respect prefers-reduced-motion. */
export function motionTransition(
  reduced: boolean,
  duration = 0.4,
  delay = 0,
): { duration: number; delay?: number } {
  if (reduced) return { duration: 0 };
  return delay > 0 ? { duration, delay } : { duration };
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
