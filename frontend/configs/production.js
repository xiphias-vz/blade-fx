const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getConfiguration = require('./development');
const { moduleSettings } = require('../settings');

const { isESModule } = moduleSettings;

const mergeWithStrategy = merge.smartStrategy({
    plugins: 'prepend'
});

const configurationProdMode = async appSettings => mergeWithStrategy(await getConfiguration(appSettings), {webpack: {
        mode: 'production',
        devtool: false,

        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        module: isESModule,
                        ecma: isESModule ? 2015 : 5,
                        output: {
                            beautify: false,
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),

                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        discardEmpty: true,
                        discardComments: {
                            removeAll: true
                        }
                    }
                })
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                __PRODUCTION__: true
            })
        ]
    }});

module.exports = configurationProdMode;
