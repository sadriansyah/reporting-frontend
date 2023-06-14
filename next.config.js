/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental:{
    allowMiddlewareResponseBody:true,
  },
  swcMinify: true,
  env:{
    API_LINK:process.env.API_LINK,
    SECRET_KEY:process.env.SECRET_KEY
  },
  eslint:{
    ignoreDuringBuilds:true
  }
}

module.exports = nextConfig
