'use client';

import { useEffect, useState } from 'react';

const SESSION_KEY = 'portfolio-session-started';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (reduced || seen) {
        sessionStorage.setItem(SESSION_KEY, '1');
        return;
      }
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      setFading(true);
      const fadeTimer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(fadeTimer);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9998,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <span
          className="font-mono"
          style={{
            fontSize: '1rem',
            color: 'var(--accent-teal)',
            letterSpacing: '0.05em',
          }}
        >
          vyshnavi.dev
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--accent-teal)',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}