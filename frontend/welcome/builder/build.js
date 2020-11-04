const webpack = require('webpack');

const builder = config => {
    webpack(config, (err, stats) => {
        if (err) {
            console.error(err.stack || err);

            if (err.details) {
                console.error(err.details);
            }

            return;
        }

        const mode = config.watch ? `${config.mode} watch` : config.mode;

        console.log(`Welcome page building statistics in ${mode} mode:`);
        console.log(stats.toString(config.stats), '\n');
    });
};

module.exports = builder;
