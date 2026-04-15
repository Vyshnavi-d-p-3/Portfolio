'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const fadeTimer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(fadeTimer);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9998,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
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
            animation: 'pulse-loading 1.2s ease-in-out infinite',
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
                opacity: 0.3,
                animation: `dot-bounce 1s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse-loading {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
