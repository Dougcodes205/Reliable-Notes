const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './client/src/js/index.js',
    install: './client/src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './client/install.html',
      filename: 'install.html',
      chunks: ['install'],
    }),
    new WebpackPwaManifest({
      name: 'J.A.T.E',
      short_name: 'J.A.T.E',
      description: 'Just Another Text Editor',
      background_color: '#272822',
      theme_color: '#31a9e1',
      start_url: '/',
      icons: [
        {
          src: path.resolve(__dirname, 'client/src/assets/icons/icon_96x96.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './client/src-sw.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};