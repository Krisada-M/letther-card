import { next } from '@vercel/edge';

export default function middleware(req) {
  return next({
    headers: {
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    },
  });
}

// Apply middleware to all routes so every response gets the security headers.
export const config = {
  matcher: '/:path*',
};
