<?php

use Pyz\Service\FlysystemSftpFileSystem\Plugin\Flysystem\SftpFileSystemBuilderPlugin;
use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Shared\BackofficeOverview\BackofficeOverviewConstants;
use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Pyz\Shared\GoogleTagManager\GoogleTagManagerConstants;
use Pyz\Shared\Mail\MailConstants;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\Shipment\ShipmentConstants;
use Pyz\Shared\Store\StoreConstants;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebHtmlErrorRenderer;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;
use StoreApp\Shared\Picker\PickerConstants;

$config[StoreConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    4007 => 'OST',
    4008 => 'OLO',
    4003 => 'ZLI',
    4006 => 'LIB',
    4005 => 'CAK',
    4002 => 'CCM',
];

// ----------- Stores
$config[StoreConstants::STORE_NAMES] = [
    'OST' => 'Ostrava',
    'OLO' => 'Olomouc',
    'ZLI' => 'Zličín',
    'LIB' => 'Liberec',
    'CAK' => 'Čakovice',
    'CCM' => 'Černý Most',
];

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
        'root' => '/home/spryker/',
    ],
];

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gapi.globus.cz/OnlineAsset/3/asset?assetID=';

// ----------- Google Tag Manager
$config[GoogleTagManagerConstants::CONTAINER_ID] = 'GTM-PPGX4LT';

// ----------- Application
$config[ApplicationConstants::CURRENCY_CODE] = 'CZK';

// ----------- Currency symbol
$config[CodeBucketConstants::CURRENCY_SYMBOL] = 'Kč';

// ----------- Reply to email
$config[MailConstants::DEFAULT_EMAIL_REPLY_EMAIL] = 'info@globus.cz';

//------------ Shipment consts
$config[ShipmentConstants::MAIN_GLOBUS_CUSTOMER_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE] = 0;

$config[ShipmentConstants::GUEST_CUSTOMER_CLICK_AND_COLLECT_SHIPMENT_METHOD_PRICE] = 0;

$config[\Pyz\Shared\CookieBot\CookieBotConstants::DOMAIN_GROUP_ID] = '372fb05e-ddeb-46e1-a699-334ffa7e6bec';

// ----------- Days in the week abbr
$config[PickerConstants::DAYS_IN_THE_WEEK] = [
    '0' => 'NE',
    '1' => 'PO',
    '2' => 'ÚT',
    '3' => 'ST',
    '4' => 'ČT',
    '5' => 'PÁ',
    '6' => 'SO',
];

// ----------- Backoffice overview choice
$config[BackofficeOverviewConstants::CHOICE_FILTER] = [
    1 => 'Objednávka',
    2 => 'Pozice',
    3 => 'Počet kusů',
];

// ----------- Backoffice overview table header

$config[BackofficeOverviewConstants::TABLE_HEADER] = [
    'Slot' => 'Slot',
    'Gesamt' => 'Celkem',
    'TRO' => 'SUCH',
    'BÄCK' => 'PEK',
    'DROG' => 'DROG',
    'FIS' => 'RYB',
    'FRI' => 'ČER',
    'GET' => 'NÁP',
    'KÄS' => 'KÄS',
    'METZ' => 'SÝR',
    'NON' => 'NON',
    'OBS' => 'OVO',
    'TKK' => 'MRA',
];

// ---------- Error handling
$config[ErrorHandlerConstants::YVES_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Yves/errorpage/5xx-CZ.html';
$config[ErrorHandlerConstants::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Zed/errorpage/5xx-CZ.html';
$config[ErrorHandlerConstants::ERROR_RENDERER] = WebHtmlErrorRenderer::class;

$config[EventConstants::LOGGER_ACTIVE] = true;

$config[FactFinderNgConstants::FACT_FINDER_CHANNEL] = ''; // This is needed in order for header.twig not to break

$config[MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT] = '';
$config[MonitoringReportConstants::JENKINS_HEARTBEAT_URL] = '';

