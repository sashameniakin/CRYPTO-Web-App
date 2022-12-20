/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ["pages", "components", "styles"],
  },
};

module.exports = nextConfig;
