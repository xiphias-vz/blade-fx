<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';

$config[CustomerConstants::CDC_API_KEY] =
    [
        'cdcApiKey' => '3_cO6ShorZ5e1MqRhpb214jt1gWEX45qnI0_vO8ioUNl7z1FIA-ogdd4Ii9LnL6eTc',
    ];

$config[CustomerConstants::CDC_API_URL] =
    [
        'cdcApiUrl' => 'https://accounts.eu1.gigya.com/',
        'cdcScreensUrl' => 'https://cdns.us1.gigya.com/js/gigya.js',
    ];

$config[CustomerConstants::CDC_API_SECRET_KEY] =
    [
        'cdcApiSecretKey' => 'QA8hvf1Pds/oi0VvwDycD312CjL6gNmW',
    ];

$config[CustomerConstants::CDC_API_USER_KEY] = 'AOOFJuSjBzxx';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RK';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse/staging';
