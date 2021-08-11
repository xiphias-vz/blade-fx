<?php

use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Shared\Synchronization\SynchronizationConstants;

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
$config[TokenProvider::GSOA_CLIENT_SECRET] = "1A5CE779-02EA-42A5-959C-9909C2C11666";

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gsoat.globus.cz/OnlineAsset/3/asset?assetID=';

$config[SynchronizationConstants::EXPORT_MESSAGE_CHUNK_SIZE] = 20000;

$config[SynchronizationConstants::DEFAULT_SYNC_STORAGE_QUEUE_MESSAGE_CHUNK_SIZE] = 20000;

$config[SynchronizationConstants::DEFAULT_SYNC_SEARCH_QUEUE_MESSAGE_CHUNK_SIZE] = 20000;
