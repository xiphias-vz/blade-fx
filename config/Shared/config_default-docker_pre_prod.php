<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use StoreApp\Shared\NewRelic\NewRelicConstants;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';
$config[CashierOrderExportConstants::CASHIER_FILE_DOWNLOAD_URL] = 'https://s3.console.aws.amazon.com/s3/object/globus-staging-csv-uploads?region=eu-central-1&prefix=';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';

// ---------- CashierOrderXmlExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY] = 'kasse_v2/staging';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RK';

// --------- S3 Images
$config[\Pyz\Shared\S3Constants\S3Constants::S3_IMAGES_BUCKETS] = 'globus-staging-product-images';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'globus-staging-csv-uploads';

// ---------- ExportDeeplink
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed';

// ---------- FactFinderExport
$config[FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME] = 'factfinder/stage';

$config[NewRelicConstants::NEW_RELIC_ENVIRONMENT] = 'DE_dev';



