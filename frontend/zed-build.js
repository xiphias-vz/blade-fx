'use strict';

const oryx = require('@spryker/oryx');
const api = require('@spryker/oryx-for-zed/lib');
const path = require('path');

const settings = Object.assign({}, api.settings, {
    entry: {
        dirs: [
            path.resolve('./vendor/spryker'),
            path.resolve('./vendor/spryker-eco'),
            path.resolve('./src/Pyz')
        ],
        patterns: ['**/Zed/**/*.entry.js'],
        description: 'looking for entry points...',
        defineName: p => path.basename(p, '.entry.js')
    },
});

api.getConfiguration(settings)
.then(configuration => oryx.build(configuration))
.catch(error => console.error('An error occurred while creating configuration', error));
