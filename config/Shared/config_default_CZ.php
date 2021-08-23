<?php

use Pyz\Service\FlysystemSftpFileSystem\Plugin\Flysystem\SftpFileSystemBuilderPlugin;
use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Pyz\Shared\GoogleTagManager\GoogleTagManagerConstants;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Shared\Synchronization\SynchronizationConstants;


// ---------- FileSystem
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'files' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/' . APPLICATION_STORE . '/media/',
        'path' => 'files/',
    ],
    'cashier_order_local' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/' . APPLICATION_STORE . '/export/',
        'path' => 'files/',
    ],
//    'globus_sftp' => [
//        'sprykerAdapterClass' => SftpFileSystemBuilderPlugin::class,
//        'host' => getenv('GLOBUS_SFTP_HOST'),
//        'port' => getenv('GLOBUS_SFTP_PORT'),
//        'username' => getenv('GLOBUS_SFTP_USERNAME'),
//        'password' => getenv('GLOBUS_SFTP_PASSWORD'),
//        'root' => getenv('GLOBUS_SFTP_ROOT'),
//    ],
    'globus_sftp' => [
        'sprykerAdapterClass' => SftpFileSystemBuilderPlugin::class,
        'host' => 'ftp.globus.cz',
        'port' => '22',
        'username' => 'spryker',
        'password' => '8U65f$b_p6vLNMc',
        'root' => '/',
    ],
];

$config[StoreConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    4012 => 'OPA',
];

// ----------- Stores
$config[StoreConstants::STORE_NAMES] = [
    'OPA' => 'Opava',
];
// ----------- Google Tag Manager
$config[GoogleTagManagerConstants::CONTAINER_ID] = 'GTM-PPGX4LT';

// ----------- Application
$config[ApplicationConstants::CURRENCY_CODE] = 'CZK';

// ----------- Currency symbol
$config[CodeBucketConstants::CURRENCY_SYMBOL] = 'Kč';

// ----------- GSOA API
$config[TokenProvider::GSOA_CLIENT_ID] = "webAppSpryker";
$config[TokenProvider::GSOA_CLIENT_SECRET] = "1A5CE779-02EA-42A5-959C-9909C2C11666";

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gapi.globus.cz/OnlineAsset/3/asset?assetID=';


