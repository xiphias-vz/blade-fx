const merge = require('webpack-merge');
const settings = require('./settings');
const builder = require('./build');

const buildWebpackConfig = merge(settings, {
    mode: 'production'
});

builder(buildWebpackConfig);
