import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
}

const withMDX = createMDX()

export default withMDX(nextConfig)
