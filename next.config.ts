import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock photography for the Why WeSearch cards on the home page.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  experimental: {
    serverActions: {
      // Resume uploads are capped at 5MB in lib/config/site.ts. The raw request
      // body also carries multipart boundaries and field metadata, so allow
      // headroom above that limit or a valid 5MB resume is rejected in transport.
      bodySizeLimit: "6mb",
    },
  },
  redirects() {
    return [
      // The combined Careers page split into /careers/join-us and
      // /careers/open-positions — send old links to the roles listing.
      { source: "/careers", destination: "/careers/open-positions", permanent: true },
    ];
  },
};

export default nextConfig;
