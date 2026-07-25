/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Local verification builds can set NEXT_DIST_DIR (e.g. .next-prod) so
   * `next build` doesn't clobber a running dev server's .next cache.
   * Unset in CI/Netlify, so production builds still use .next.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  /** Reduces native file watchers (avoids EMFILE: too many open files on macOS dev). */
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**'],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
