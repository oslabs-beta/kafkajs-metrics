const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(css|s[ac]ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000/' },

    static: {
      directory: path.join(__dirname, './dist'),
    },

    proxy: {
      '/checktoken': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/getData': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/token': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/docs/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
