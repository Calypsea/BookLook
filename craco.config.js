const path = require('path');
const pathBrowserify = require.resolve('path-browserify');
const osBrowserify = require.resolve('os-browserify/browser');
const cryptoBrowserify = require.resolve('crypto-browserify');

module.exports = {
  webpack: {
    alias: {
      path: pathBrowserify,
    },
    configure: {
      resolve: {
        fallback: {
          fs: false,
          os: osBrowserify,
          crypto: cryptoBrowserify,
        },
      },
    },
  },
};




