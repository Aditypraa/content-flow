import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // BARU: Domain untuk gambar utama dari S3
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
      },
      // Domain untuk gambar placeholder yang sudah ada
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // Konfigurasi Anda yang sudah ada tetap dipertahankan
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
