import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1','https://placehold.co/600x600.png?text=Image+2_1','twinz-shop.com'],
    },
};

//export default nextConfig;
export default withNextIntl(nextConfig);