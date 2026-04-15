'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/about', label: 'about' },
  { href: '/resume', label: 'resume' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--bg-primary)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'border-color 0.3s',
          padding: '0 1.5rem',
        }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            className="font-mono"
            style={{
              fontSize: '0.875rem',
              color: 'var(--accent-teal)',
              textDecoration: 'none',
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'text-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.textShadow = '0 0 12px var(--accent-teal)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.textShadow = 'none';
            }}
          >
            vyshnavi.dev
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
            }}
            className="hidden-mobile"
          >
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-teal)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>
          </div>

          <button
            className="show-mobile"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '8px',
              display: 'none',
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              paddingTop: '56px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className="font-mono"
                  style={{
                    fontSize: '1.5rem',
                    color: pathname === link.href ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <span
                className="font-mono"
                style={{ fontSize: '0.6875rem', color: 'var(--accent-teal)', letterSpacing: '0.1em' }}
              >
                open to work
              </span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-teal)',
                }}
              />
            </div>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {theme === 'dark' ? 'light mode' : 'dark mode'}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
