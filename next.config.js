/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    HOST: process.env.HOST
  }
}

module.exports = nextConfig
