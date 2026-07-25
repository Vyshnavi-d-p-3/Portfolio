import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import ConsoleEgg from '@/components/ConsoleEgg';
import MotionProvider from '@/components/MotionProvider';
import {
  DEGREE_SHORT,
  PERSON_NAME,
  SCHOOL_SHORT,
  SITE_DESCRIPTION,
  WORK_AUTH_LINE,
  WORK_EXPERIENCE_YEARS_TEXT,
} from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteDescription = SITE_DESCRIPTION;
const siteDescriptionShort = `AI agent workflow evals & full stack · ${WORK_EXPERIENCE_YEARS_TEXT} · ${DEGREE_SHORT} @ ${SCHOOL_SHORT} · ${WORK_AUTH_LINE} · Open to SWE & AI engineering roles`;

export const metadata: Metadata = {
  metadataBase: new URL('https://vyshnavi.dev'),
  title: `${PERSON_NAME} — AI & Full-Stack Engineer`,
  description: siteDescription,
  keywords: [
    'AI engineer',
    'full-stack engineer',
    'AI agents',
    'agent workflows',
    'software engineer',
    'backend engineer',
    'applied AI',
    'LLM evaluation',
    'Go',
    'Python',
    'Spring Boot',
    'FastAPI',
    'PostgreSQL',
    'Redis',
    'Next.js',
    'TypeScript',
    'SJSU',
    PERSON_NAME,
    'AI engineering',
    'agent evaluation',
    'LLM evals',
    'tool calling',
    'RAG',
    'distributed systems',
    'C#',
    '.NET',
    'agent reliability',
  ],
  authors: [{ name: PERSON_NAME }],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${PERSON_NAME} — AI & Full-Stack Engineer`,
    description: siteDescription,
    url: 'https://vyshnavi.dev',
    siteName: 'vyshnavi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'vyshnavi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSON_NAME} — AI & Full-Stack Engineer`,
    description: siteDescriptionShort,
    images: ['/og-default.svg'],
  },
  robots: { index: true, follow: true },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
  ],
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light' || stored === 'dark') {
                    document.documentElement.setAttribute('data-theme', stored);
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <MotionProvider>
            <ConsoleEgg />
            <LoadingScreen />
            <CustomCursor />
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Navbar />
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
