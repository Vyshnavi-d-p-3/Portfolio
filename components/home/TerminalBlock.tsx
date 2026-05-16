'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

const lines = [
  { prefix: '~/vyshnavi $ ', command: 'cat profile.yml', isCommand: true },
  { prefix: '', command: 'name: Vyshnavi D P', isCommand: false },
  { prefix: '', command: `experience: ${WORK_EXPERIENCE_YEARS_TEXT}`, isCommand: false },
  { prefix: '', command: 'companies: [Accenture, TCS]', isCommand: false },
  { prefix: '', command: 'education: MS CS @ SJSU (May 2026)', isCommand: false },
  { prefix: '', command: 'focus: [full-stack, distributed-systems, applied-ai]', isCommand: false },
  { prefix: '', command: 'building: [Sentinel, Kairos, Helios, NeuroLens]', isCommand: false },
  { prefix: '', command: 'status: open-to-work', isCommand: false },
  { prefix: '', command: '', isCommand: false },
  { prefix: '~/vyshnavi $ ', command: '_', isCommand: true, isCursor: true },
];

type Line = typeof lines[number];

function TypedLine({ line, delay, onComplete }: { line: Line; delay: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const full = line.prefix + line.command;

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [full, delay]);

  if (line.isCursor) {
    return (
      <div style={{ minHeight: '1.4em' }}>
        <span style={{ color: '#9ca3af' }}>{line.prefix}</span>
        <BlinkCursor />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '1.4em' }}>
      {line.isCommand ? (
        <>
          <span style={{ color: '#4b5563' }}>{displayed.slice(0, line.prefix.length)}</span>
          <span style={{ color: '#e8e6e3' }}>{displayed.slice(line.prefix.length)}</span>
        </>
      ) : (
        <span style={{ color: displayed.includes(':') ? '' : '#e8e6e3' }}>
          {displayed.split(': ').map((part, i) => (
            i === 0 ? (
              <span key={i} style={{ color: '#2dd4a8' }}>{part}{i < displayed.split(': ').length - 1 ? ': ' : ''}</span>
            ) : (
              <span key={i} style={{ color: '#9ca3af' }}>{part}</span>
            )
          ))}
        </span>
      )}
    </div>
  );
}

function BlinkCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ color: '#2dd4a8', opacity: visible ? 1 : 0, transition: 'opacity 0.1s' }}>
      ▋
    </span>
  );
}

export default function TerminalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [started, setStarted] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [easterEggText, setEasterEggText] = useState('');

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView, started]);

  const handleTerminalClick = () => {
    if (easterEggTriggered) return;
    setEasterEggTriggered(true);
    const command = '~/vyshnavi $ echo "Thanks for visiting!"';
    const result = 'Thanks for visiting!';
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setEasterEggText(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(interval);
        setTimeout(() => setEasterEgg(true), 200);
      }
    }, 30);
  };

  let cumulativeDelay = 0;
  const lineDelays: number[] = [];
  for (const line of lines) {
    lineDelays.push(cumulativeDelay);
    const full = line.prefix + line.command;
    cumulativeDelay += full.length * 40 + 80;
  }

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem 4rem',
      }}
    >
      <div
        ref={ref}
        className="terminal-block"
        onClick={handleTerminalClick}
        style={{
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8125rem',
          lineHeight: 1.7,
          cursor: easterEggTriggered ? 'default' : 'pointer',
          userSelect: 'none',
        }}
        title={easterEggTriggered ? '' : 'Click me...'}
      >
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840', display: 'block' }} />
        </div>

        {started && lines.map((line, i) => (
          <TypedLine
            key={i}
            line={line}
            delay={lineDelays[i]}
          />
        ))}

        {easterEggTriggered && (
          <div style={{ minHeight: '1.4em', marginTop: '0.25rem' }}>
            <span style={{ color: '#4b5563' }}>{easterEggText.slice(0, 14)}</span>
            <span style={{ color: '#e8e6e3' }}>{easterEggText.slice(14)}</span>
          </div>
        )}

        {easterEgg && (
          <div style={{ color: '#2dd4a8', minHeight: '1.4em' }}>
            Thanks for visiting!
          </div>
        )}
      </div>
    </section>
  );
}
