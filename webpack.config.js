const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
require('dotenv').config();

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
        'process.env.REACT_APP_GOOGLE_CLOUD_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_CLOUD_API_KEY),
      }),
    new webpack.DefinePlugin({
        'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(process.env.REACT_APP_GITHUB_TOKEN),
      }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Regex to test for .js or .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for both modern JS and React
          }
        }
      },
      {
        test: /\.css$/, // Regex to match CSS files
        use: ['style-loader', 'css-loader'], // Use these loaders
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true, 
  },
  
};
