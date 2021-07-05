<?php

use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\Store\StoreConstants;

$config[StoreConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    4012 => 'OPA',
];

// ----------- Stores
$config[StoreConstants::STORE_NAMES] = [
    'OPA' => 'Opava',
];

// ----------- Application
$config[ApplicationConstants::CURRENCY_CODE] = 'CZK';

// ----------- Currency symbol
$config[CodeBucketConstants::CURRENCY_SYMBOL] = 'Kč';

// ----------- GSOA API
$config[TokenProvider::GSOA_CLIENT_ID] = "webAppSpryker";
$config[TokenProvider::GSOA_CLIENT_SECRET] = "D55910C6-0811-4749-B55C-3BCCEDC9BF91";

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gsoat.globus.cz/OnlineAsset/3/asset?assetID=';
