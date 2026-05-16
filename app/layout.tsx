import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import { SITE_TAGLINE, WORK_EXPERIENCE_YEARS_TEXT } from '@/lib/site';

const siteDescription = `${WORK_EXPERIENCE_YEARS_TEXT} at Accenture and TCS. MS CS @ SJSU (May 2026). ${SITE_TAGLINE}`;
const siteDescriptionShort = `${WORK_EXPERIENCE_YEARS_TEXT} · MS CS @ SJSU · Open to full-time SWE roles`;

export const metadata: Metadata = {
  metadataBase: new URL('https://vyshnavi.dev'),
  title: 'Vyshnavi D P — Software Engineer',
  description: siteDescription,
  keywords: ['software engineer', 'full-stack', 'distributed systems', 'Go', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Vyshnavi D P' }],
  openGraph: {
    title: 'Vyshnavi D P — Software Engineer',
    description: siteDescription,
    url: 'https://vyshnavi.dev',
    siteName: 'vyshnavi.dev',
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'vyshnavi.dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyshnavi D P — Software Engineer',
    description: siteDescriptionShort,
    images: ['/og-default.svg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
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
