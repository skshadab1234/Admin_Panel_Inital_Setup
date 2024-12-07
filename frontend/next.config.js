/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        WEBSITE_NAME: process.env.WEBSITE_NAME,
        ADMINURL: process.env.ADMINURL,
        DOCS_WEBSITE_NAME: process.env.DOCS_WEBSITE_NAME,
        FRONTEND_URL: process.env.FRONTEND_URL,
        COMPANY_EMAIL: process.env.COMPANY_EMAIL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
            {
                protocol: 'http',
                hostname: '*',
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
