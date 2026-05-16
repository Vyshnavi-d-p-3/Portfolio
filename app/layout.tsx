import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import ConsoleEgg from '@/components/ConsoleEgg';
import {
  DEGREE_SHORT,
  GRADUATION_TEXT,
  SCHOOL_SHORT,
  SITE_TAGLINE,
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

const siteDescription = `${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS. ${DEGREE_SHORT} @ ${SCHOOL_SHORT} (${GRADUATION_TEXT}). ${SITE_TAGLINE}`;
const siteDescriptionShort = `${WORK_EXPERIENCE_YEARS_TEXT} · ${DEGREE_SHORT} @ ${SCHOOL_SHORT} · Open to full-time SWE roles`;

export const metadata: Metadata = {
  metadataBase: new URL('https://vyshnavi.dev'),
  title: 'Vyshnavi D P — Software Engineer',
  description: siteDescription,
  keywords: [
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
    'Vyshnavi D P',
  ],
  authors: [{ name: 'Vyshnavi D P' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vyshnavi D P — Software Engineer',
    description: siteDescription,
    url: 'https://vyshnavi.dev',
    siteName: 'vyshnavi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'vyshnavi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyshnavi D P — Software Engineer',
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
          <ConsoleEgg />
          <LoadingScreen />
          <CustomCursor />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
