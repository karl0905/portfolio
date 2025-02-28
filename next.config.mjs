/** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    return config
  }
}

export default nextConfig;
