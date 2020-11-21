const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(process.cwd(), './frontend/welcome'),
    public: path.join(process.cwd(), './public/Welcome'),
    assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    stats: {
        colors: true,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        entrypoints: false
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/bundle.js`,
        path: PATHS.public,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options: {
                    presets: [
                        ['@babel/env', {
                            loose: true,
                            targets: {
                                browsers: '> 1%, IE 11, not dead',
                            },
                        }]
                    ],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.(scss|css)/i,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false,
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                autoprefixer({
                                    'browsers': ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                `${PATHS.src}/${PATHS.assets}scss/shared.scss`
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([`${PATHS.public}/${PATHS.assets}`, `${PATHS.public}/*.html`],
            {
                root: process.cwd(),
                verbose: true,
                beforeEmit: true
            }
        ),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/welcome-[name].css`
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/*.html`, to: '[name].html' },
            { from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images` },
            { from: `${PATHS.src}/${PATHS.assets}json`, to: `${PATHS.assets}json` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` }
        ])
    ]
};