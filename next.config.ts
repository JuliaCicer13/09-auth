import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
	  remotePatterns: [
	    { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'aliiev-lomach.com' },
	    ]
      
	},
	  async headers() {
    return [
      {
        source: '/notes/filter/:slug', // маршрут сторінки
        locale: false,
        headers: [
          {
            key: 'Cache-Control', // Заголовок
            value: 'public, max-age=300, must-revalidate', // кешуємо на 5 хв
          },
        ],
      },
    ]
  },
    reactCompiler: true,
};

export default nextConfig;
