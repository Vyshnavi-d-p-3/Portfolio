'use client';

import { useEffect } from 'react';

import {
  CONTACT_EMAIL,
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  X_PROFILE_URL,
} from '@/lib/site';

const SESSION_KEY = 'portfolio-console-greeted';

/**
 * Console greeting for engineers who hit DevTools. Fires once per session so
 * it doesn't spam during HMR. Pure side-effect — renders nothing.
 */
export default function ConsoleEgg() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      return;
    }

    const banner = [
      '%c hi there ',
      'background:#2dd4a8;color:#0a0a0b;font-weight:600;padding:4px 8px;border-radius:4px;',
    ];

    const lines = [
      '',
      "Curious what's under the hood? You can read the source on GitHub.",
      '',
      `  email     ${CONTACT_EMAIL}`,
      `  x         ${X_PROFILE_URL}`,
      `  linkedin  ${LINKEDIN_URL}`,
      `  github    ${GITHUB_PROFILE_URL}`,
      '',
      'Open to full-time SWE roles · STEM OPT eligible.',
      '',
    ].join('\n');

    // eslint-disable-next-line no-console
    console.log(banner[0], banner[1]);
    // eslint-disable-next-line no-console
    console.log(`%c${lines}`, 'color:#9ca3af;font-family:JetBrains Mono,monospace;line-height:1.6;');
  }, []);

  return null;
}
