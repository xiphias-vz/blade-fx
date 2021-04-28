<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ImageImportToS3\Communication\Console;

use Aws\S3\ObjectUploader;
use Aws\S3\S3Client;
use Pyz\Shared\S3Constants\S3Constants;
use Spryker\Shared\Config\Config;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use ZipArchive;

class ImageImportToS3Console extends Console
{
    public const COMMAND_NAME = 'data:import:images-to-s3';
    public const COMMAND_DESCRIPTION = 'Import images from Globus FTP to the S3 bucket';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS = 'globus_sitemap_credentials';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_KEY = 'key';
    protected const LOCAL_AWS_CONFIG_CREDENTIALS_SECRET = 'secret';
    protected const OPTION_SET_ZIP_DIRECTORY = 'file-name';
    protected const OPTION_SET_ZIP_DIRECTORY_SHORT = 'f';
    protected const UNZIP_FILE_NAME = 'src/Pyz/Zed/ImageImportToS3/Images';
    protected const FILE_PREFIX = 'data/import/';
    protected const FILE_FULL_DIRECTORY = 'data/import/spryker';
    protected const FILE_NAME = "/2.globus_articles_images.";

    /**
     * @var string
     */
    public $zipFileName = 'data/import/spryker/images-directory.zip';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $directories = $this->findAllImagesDirectories();
        $directoryEmpty = $this->emptyTempDirectory();
        if ($directoryEmpty) {
            foreach ($directories as $fileName) {
                $directoryUnziped = $this->unzipDirectory($fileName);

                if ($directoryUnziped) {
                    $upload = $this->uploadImagesToS3();
                    if ($upload) {
                        $this->emptyTempDirectory();
                        $this->deleteZipFromDirectory($fileName);
                    }
                }
            }
        }

        return static::CODE_SUCCESS;
    }

    /**
     * @param string $fileName
     *
     * @return bool
     */
    protected function unzipDirectory(string $fileName): bool
    {
        try {
            $zip = new ZipArchive();
            $imagesDirectory = $zip->open($fileName);

            dump('DIRECTORY FOUND:'); //TODO: ONLY TESTING - REMOVE AFTER
            dump($imagesDirectory);
            if ($imagesDirectory == true) {
                $zip->extractTo(static::UNZIP_FILE_NAME);
                $zip->close();
                dump('UNZIPED DIRECTORY'); //TODO: ONLY TESTING - REMOVE AFTER

                return true;
            } else {
                dump('ERROR WITH UNZIPPING DIRECTORY');

                return false;
            }
        } catch (Exception $e) {
            dump('Error occured while unziping file:');
            dump($e);

            return false;
        }
    }

    /**
     * @return bool
     */
    protected function emptyTempDirectory(): bool
    {
        try {
            $files = glob(static::UNZIP_FILE_NAME . '/*');
            if ($files != null) {
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
            }

            return true;
        } catch (Exception $e) {
            dump("Error while deleting temp directory:");
            dump($e);

            return false;
        }
    }

    /**
     * @return bool
     */
    protected function uploadImagesToS3(): bool
    {
        $s3 = $this->getS3Client();
        $bucket = $this->getS3Bucket();
        $images = array_diff(scandir(static::UNZIP_FILE_NAME), ['..', '.']);

        dump('BUCKET: '); //TODO: ONLY TESTING - REMOVE AFTER
        dump($bucket); //TODO: ONLY TESTING - REMOVE AFTER

        dump("IMPORTED IMAGES: ");
        foreach ($images as $image) {
            $imageFile = fopen(static::UNZIP_FILE_NAME . '/' . $image, 'r++');
            dump($image);
            try {
                $uploader = new ObjectUploader(
                    $s3,
                    $bucket,
                    $image,
                    $imageFile
                );
//                $result = $uploader->upload();                                        //TODO: UNCOMMENT AFTERWARDS
//                if($result["@metadata"]["statusCode"] == '200'){
//                    var_dump('File successfully uploaded to ' . $result["ObjectURL"]);
//                }
            } catch (Exception $e) {
                rewind($image);

                return false;
            }
        }

        return true;
    }

    /**
     * @return \Aws\S3\S3Client
     */
    protected function getS3Client(): S3Client
    {
        $key = '';
        $secret = '';

        $credentials = Config::get(S3Constants::S3_CONSTANTS);
        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY])) {
            $key = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_KEY];
        }

        if (isset($credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET])) {
            $secret = $credentials[static::LOCAL_AWS_CONFIG_CREDENTIALS][static::LOCAL_AWS_CONFIG_CREDENTIALS_SECRET];
        }
        dump('KEY: '); //TODO: ONLY TESTING - REMOVE AFTER
        dump($key); //TODO: ONLY TESTING - REMOVE AFTER

        dump('SECRET: '); //TODO: ONLY TESTING - REMOVE AFTER
        dump($secret); //TODO: ONLY TESTING - REMOVE AFTER

        return new S3Client([
            'region' => 'eu-central-1',
            'version' => 'latest',
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ],
        ]);
    }

    /**
     * @return string
     */
    protected function getS3Bucket(): string
    {
        return Config::get(S3Constants::S3_IMAGES_BUCKETS);
    }

    /**
     * @return array
     */
    protected function findAllImagesDirectories(): array
    {
        return glob(static::FILE_FULL_DIRECTORY . static::FILE_NAME . "*.zip");
    }

    /**
     * @param string $filename
     *
     * @return bool
     */
    protected function deleteZipFromDirectory(string $filename): bool
    {
        try {
            unlink($filename);

            return true;
        } catch (Exception $exception) {
            dump("ERROR WHILE DELETING FROM DIRECTORY");

            return false;
        }
    }
}
