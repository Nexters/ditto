const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/event',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
