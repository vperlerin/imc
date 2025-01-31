'use strict'

const autoprefixer = require('autoprefixer')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
// npx webpack serve --mode development
// npx webpack --mode production

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build'),
        },
        resolve: {
          extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css', '.scss' ],
          modules: [
            'node_modules',
            path.resolve('./src'),
          ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin()
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
                    type: 'asset/resource'
                },
                {
                  test: /\.(scss)$/,
                  use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                      options: {
                        modules: {
                          // Only treat filename.module.scss as a module
                          auto: /\.module\.\w+$/,
                          localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                        importLoaders: 2,
                      },
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        postcssOptions: {
                          plugins: [require('autoprefixer')],
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
            ]
        }
    };
};