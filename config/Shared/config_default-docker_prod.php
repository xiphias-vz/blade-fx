<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RP';
$config[CashierOrderExportConstants::CASHIER_FILE_DOWNLOAD_URL] = 'https://s3.console.aws.amazon.com/s3/object/globus-prod-csv-uploads?region=eu-central-1&prefix=';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RP';

// --------- S3 Images
$config[\Pyz\Shared\S3Constants\S3Constants::S3_IMAGES_BUCKETS] = 'globus-prod-product-images';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'globus-prod-csv-uploads';
