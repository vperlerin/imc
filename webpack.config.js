const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: devMode ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: devMode ? '[id].js' : '[id].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
      alias: {
        "@": path.resolve(__dirname, 'src'), // Alias for src/
      },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        }
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
      }),
      new BundleAnalyzerPlugin({ analyzerMode: devMode ? "disabled" : "static" }),
      new Dotenv({
        path: path.resolve(__dirname, devMode ? './env/dev/.env' : './env/prod/.env'),
      }),

      // Copy everything from /public (except index.html) to /build
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'build'),
            globOptions: { ignore: ['**/index.html'] },
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer',
                    'postcss-discard-duplicates'
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  auto: /\.module\.\w+$/,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer',
                    'postcss-discard-duplicates'
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src/styles')],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|svg)$/i,
          type: 'asset/resource',
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: { progressive: true, quality: 75 },
                optipng: { enabled: true },
                pngquant: { quality: [0.65, 0.90], speed: 4 },
                gifsicle: { interlaced: false },
                webp: { quality: 75 }
              }
            }
          ]
        },
        {
          test: /\.(pdf|pptx?|docx?|xlsx?|zip)$/i,
          type: 'asset/resource',
          generator: {
            // Emits to /build/lectures/<original name>.<ext>
            filename: 'lectures/[name][ext]',
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: { drop_console: true },
            output: { comments: true },
          }
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
      },
      runtimeChunk: 'single',
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
        watch: true,
      },
      compress: true,
      hot: true,
      port: 3000,
      open: false,
    }
  };
};
