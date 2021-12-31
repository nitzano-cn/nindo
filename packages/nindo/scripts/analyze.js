#! /usr/bin/env node

process.env.NODE_ENV = 'production';
const webpack = require('webpack');

try {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const webpackConfig = require('react-scripts/config/webpack.config');
  if (!webpackConfig) {
    throw new Error('webpack config not found.');
  }
  
  const webpackConfigProd = webpackConfig('production');
  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());
  
  // actually running compilation and waiting for plugin to start explorer
  webpack(webpackConfigProd, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err);
    }
  });
} catch (e) {
  console.error(e.message);
}