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
    }
  },
};
