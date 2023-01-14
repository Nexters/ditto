/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
}

module.exports = nextConfig
