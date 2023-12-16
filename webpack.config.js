const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
require('dotenv').config();

/**
 * Webpack Configuration
 * 
 * This configuration file sets up Webpack for bundling a React application for production.
 * It includes settings for output, optimization, plugins, module rules, and the development server.
 */
module.exports = {
  mode: 'production', // Sets the mode to production for optimized bundles
  entry: './src/index.js', // Entry point for the application

  // Output configuration for the bundled files
  output: {
    filename: 'bundle.[contenthash].js', // Name of the output file with content hash
    path: path.resolve(__dirname, 'dist'), // Output directory
  },

  // Optimization settings for minimizing the output and splitting chunks
  optimization: {
    minimize: true, // Enables minimization
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // Minimizers for JavaScript and CSS
    splitChunks: {
      chunks: 'all', // Splits all types of chunks for optimization
    },
  },

  // Plugins for additional functionality
  plugins: [
    new CleanWebpackPlugin(), // Cleans up the output directory before each build
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template file for the HTML output
    }),
    new webpack.DefinePlugin({ // DefinePlugin to make environment variables available
      'process.env.REACT_APP_GOOGLE_CLOUD_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_CLOUD_API_KEY),
      'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(process.env.REACT_APP_GITHUB_TOKEN),
    }),
  ],

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches JavaScript and JSX files
        exclude: /node_modules/, // Excludes node_modules directory
        use: {
          loader: 'babel-loader', // Uses babel-loader for transpiling JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for modern JavaScript and React
          }
        }
      },
      {
        test: /\.css$/, // Matches CSS files
        use: ['style-loader', 'css-loader'], // Uses style-loader and css-loader for CSS files
      },
    ]
  },

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Directory to serve static files from
    },
    compress: true, // Enables gzip compression
    port: 3000, // Port on which to run the server
    open: true, // Automatically opens the browser when the server starts
  },
};
