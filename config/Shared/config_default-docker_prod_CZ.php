<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;

require('config_default-docker.php');

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gapi.globus.cz/OnlineAsset/3/asset?assetID=';

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';

// ---------- CashierOrderXmlExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY] = 'kasse_v2/staging';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RK';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'globus-staging-csv-uploads';

// ---------- ExportDeeplink
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed';
