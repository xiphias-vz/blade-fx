<?php

use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';
