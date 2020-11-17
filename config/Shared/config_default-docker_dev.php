<?php

use Pyz\Shared\ProductImage\ProductImageConstants;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';

require('config_default-docker.php');
