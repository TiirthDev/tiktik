/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'lh3.googleusercontent.com']
  }
}
