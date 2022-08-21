/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'tse2.mm.bing.net',
      'lh3.googleusercontent.com',
    ],
  }
}

module.exports = nextConfig
