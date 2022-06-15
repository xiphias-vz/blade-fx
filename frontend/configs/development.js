const { join } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { findComponentEntryPoints, findComponentStyles, findAppEntryPoint } = require('../libs/finder');
const { getAliasList } = require('../libs/alias');
const { getAssetsConfig } = require('../libs/assets-configurator');
const { moduleSettings } = require('../settings');

const getConfiguration = async appSettings => {
    const { moduleVersion, isESModule } = moduleSettings;
    const componentEntryPointsPromise = findComponentEntryPoints(appSettings.find.componentEntryPoints);
    const stylesPromise = findComponentStyles(appSettings.find.componentStyles);
    const [componentEntryPoints, styles] = await Promise.all([componentEntryPointsPromise, stylesPromise]);
    const alias = getAliasList(appSettings);

    const vendorTs = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './vendor.ts');
    const appTs = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './app.ts');
    const basicScss = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './styles/basic.scss');
    const utilScss = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './styles/util.scss');
    const sharedScss = await findAppEntryPoint(appSettings.find.shopUiEntryPoints, './styles/shared.scss');

    const { argv, env } = process;
    let outputObject = {};
    outputObject.publicPath = `/${appSettings.urls.assets}/`;
    outputObject.filename = `./js/${appSettings.name}.[name].${moduleVersion}.js`;
    outputObject.jsonpFunction = `webpackJsonp_${appSettings.name.replace(/(-|\W)+/gi, '_')}`;

    if (env.SPRYKER_CODE_BUCKET === "CZ") {
        outputObject.path = join(appSettings.context, appSettings.paths.publicCZ);
    } else {
        outputObject.path = join(appSettings.context, appSettings.paths.public);
    }


    return {
        namespace: appSettings.namespaceConfig.namespace,
        theme: appSettings.theme,
        componentEntryPointsLength: componentEntryPoints.length,
        stylesLength: styles.length,
        webpack: {
            context: appSettings.context,
            mode: 'development',
            devtool: 'inline-source-map',

            stats: {
                colors: true,
                chunks: false,
                chunkModules: false,
                chunkOrigins: false,
                modules: false,
                entrypoints: false
            },

            entry: {
                'vendor': vendorTs,
                'app': [
                    appTs,
                    basicScss,
                    ...componentEntryPoints,
                    utilScss,
                ],
            },

            output: {
                path: outputObject.path,
                publicPath: outputObject.publicPath,
                filename: outputObject.filename,
                jsonpFunction: outputObject.jsonpFunction,
            },

            resolve: {
                extensions: ['.ts', '.js', '.json', '.css', '.scss'],
                alias
            },

            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/env', {
                                    loose: true,
                                    modules: false,
                                    targets: {
                                        esmodules: isESModule,
                                        browsers: [
                                            '> 1%',
                                            'ie >= 11',
                                        ],
                                    },
                                    useBuiltIns: false,
                                }],
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                ...(!isESModule ? ['@babel/plugin-transform-runtime'] : []),
                                ['@babel/plugin-proposal-class-properties'],
                            ]
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
                                        sharedScss,
                                        ...styles
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },

            optimization: {
                runtimeChunk: 'single',
                concatenateModules: false,
                splitChunks: {
                    chunks: 'initial',
                    minChunks: 1,
                    cacheGroups: {
                        default: false,
                        vendors: false
                    }
                }
            },

            plugins: [
                new webpack.DefinePlugin({
                    __NAME__: `'${appSettings.name}'`,
                    __PRODUCTION__: false
                }),

                ...(isESModule ? getAssetsConfig(appSettings) : []),

                new MiniCssExtractPlugin({
                    filename: `./css/${appSettings.name}.[name].css`,
                }),

                compiler => compiler.hooks.done.tap('webpack', compilationParams => {
                    if (process.env.npm_lifecycle_event.includes('yves:watch')) {
                        return;
                    }

                    const { errors } = compilationParams.compilation;

                    if (!errors || !errors.length) {
                        return;
                    }

                    errors.forEach(error => console.log(error.message));
                    process.exit(1);
                }),
            ]
        }
    };
};

module.exports = getConfiguration;
