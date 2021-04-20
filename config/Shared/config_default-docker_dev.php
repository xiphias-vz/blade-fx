<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-prod-product-images.s3.eu-central-1.amazonaws.com';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RK';
