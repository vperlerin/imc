'use strict'

const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// npx webpack --mode production

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
          extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css', '.scss' ],
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
            new BundleAnalyzerPlugin({ analyzerMode: devMode ? "disabled" : "static" }) // Helps analyze large bundles
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
                        "css-loader"
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
                    test: /\.scss$/,
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: /\.module\.\w+$/, // Only treat filename.module.scss as a module
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer],
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
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: { drop_console: true }, // Removes console logs
                        output: { comments: false },
                    }
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all', // Enables code splitting for all chunks
                minSize: 20000,
                maxSize: 250000, // Adjusted to reduce large files
            },
            runtimeChunk: 'single', // Extracts runtime into a separate file
        },
        devServer: {
            historyApiFallback: true, // Ensures direct URL access works in development
            static: path.resolve(__dirname, 'build'),
            compress: true,
            hot: true,
            port: 3000,
            open: true,
        },
    };
};
