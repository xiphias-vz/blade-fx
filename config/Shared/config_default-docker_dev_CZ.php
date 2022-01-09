<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Shared\GsoaRestApiClient\ApiClient;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use StoreApp\Shared\NewRelic\NewRelicConstants;

require('config_default-docker.php');

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gsoat.globus.cz/OnlineAsset/3/asset?assetID=';
$config[CashierOrderExportConstants::CASHIER_FILE_DOWNLOAD_URL] = 'https://s3.console.aws.amazon.com/s3/object/iglobus-staging-csv-uploads?region=eu-central-1&prefix=';

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';

// ---------- CashierOrderXmlExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY] = 'kasse_v2/staging';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RK';

// --------- S3 Images
$config[\Pyz\Shared\S3Constants\S3Constants::S3_IMAGES_BUCKETS] = 'iglobuscz-staging-product-images';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'iglobuscz-staging-csv-uploads';

// ---------- ExportDeeplink
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed';

// ----------- GSOA API
$config[ApiClient::GSOA_ROOT_URL] = 'https://gsoat.globus.cz';
$config[TokenProvider::GSOA_CLIENT_ID] = "webAppSpryker";
$config[TokenProvider::GSOA_CLIENT_SECRET] = "D55910C6-0811-4749-B55C-3BCCEDC9BF91";

// ---------- FactFinderExport
$config[FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME] = 'factfinder/stage';

// ---------- NewRelicEnvironment
$config[NewRelicConstants::NEW_RELIC_ENVIRONMENT] = 'CZ_stage';
