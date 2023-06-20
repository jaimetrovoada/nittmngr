/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.boringavatars.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
