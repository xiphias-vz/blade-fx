<?php

use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\Store\StoreConstants;

$config[StoreConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    1004 => 'BERLIN',
];

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';


require('config_default-docker.php');
