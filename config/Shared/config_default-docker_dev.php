<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';

$config[CustomerConstants::CDC_API_KEY] =
    [
        'cdcApiKey' => '3_IVfYuFFTkEygbMQjcP8LamKwRZBH4_qjl-EAGSvZJPGTAL59E9yUPdTxqLCyofkZ',
    ];

$config[CustomerConstants::CDC_API_URL] =
    [
        'cdcApiUrl' => 'https://accounts.eu1.gigya.com/',
        'cdcScreensUrl' => 'https://cdns.us1.gigya.com/js/gigya.js',
    ];

$config[CustomerConstants::CDC_API_SECRET_KEY] =
    [
        'cdcApiSecretKey' => 'hX8Z8bpIrEsn6zLCRrXgPTPp5Qqm8SZx',
    ];

$config[CustomerConstants::CDC_API_USER_KEY] = 'AEcgHRqmuKaV';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';
