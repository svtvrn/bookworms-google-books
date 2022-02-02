/** @type {import('next').NextConfig} */

const withImages = require('next-images');

module.exports = {
  withImages,
  reactStrictMode: true,
  images: {
    domains: ['books.google.com'],
  },
  i18n: {
    locales: ['en', 'gr'],
    defaultLocale: 'en',
  },
};
