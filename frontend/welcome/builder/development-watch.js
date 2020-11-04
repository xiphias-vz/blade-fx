const merge = require('webpack-merge');
const settings = require('./settings');
const builder = require('./build');

const buildWebpackConfig = merge(settings, {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true
});

builder(buildWebpackConfig);
