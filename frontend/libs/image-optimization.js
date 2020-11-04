const Jimp = require('jimp');
const imagemin = require('imagemin-keep-folder');
const imageminSvgo = require('imagemin-svgo');
const imageminPngquant = require('imagemin-pngquant');
const glob = require('fast-glob');
const fs = require('fs');

const assestsGlob = `${process.cwd()}/frontend/assets/**/default/images/*`;
const assetsJpgPattern = `${assestsGlob}.{jpg,jpeg}`;
const assetsImagesPattern = `${assestsGlob}.{png,svg}`;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const jpgOptimization = async () => {
    console.info('Jpg compression has been started...');

    const imagePaths =  await glob([assetsJpgPattern]);

    await asyncForEach(imagePaths, async (imagePath) => {
        try {
            const fileSize = fs.statSync(imagePath).size;
            const image = await Jimp.read(imagePath);

            await image.quality(60);

            image.getBuffer(Jimp.AUTO, (error, response) => {
                if (response.length < fileSize) {
                    console.info(`${imagePath} started compressing`);

                    image.writeAsync(imagePath, Jimp.AUTO);
                }
            });
        } catch ({ message }) {
            console.error('Jpg compression has been interrupted with error: ', message);
        }
    });

    console.info('Jpg successfully compressed!');
};

const imagesOptimization = async () => {
    console.info('Images compression has been started...');

    try {
        await imagemin([assetsImagesPattern], {
            use: [
                imageminPngquant({
                    quality: [0.7, 0.8],
                }),
                imageminSvgo({
                    plugins: [
                        {
                            removeViewBox: false,
                        },
                    ],
                }),
            ],
        });

        console.info('Images successfully compressed!');
    } catch ({ message }) {
        console.error('Images compression has been interrupted with error: ', message);
    }
};

imagesOptimization();
jpgOptimization();
