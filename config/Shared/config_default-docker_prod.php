<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\DataImport\DataImportConstants;

$config[CustomerConstants::CDC_API_KEY] =
    [
        'cdcApiKey' => '3_wl5i8R3NLRDouqi3h5JHx1vGlL013YpD4w6BT5rwrK9AmU17UpQszRHbLKiMNitq',
    ];

$config[CustomerConstants::CDC_API_URL] =
    [
        'cdcApiUrl' => 'https://accounts.eu1.gigya.com/',
    ];

$config[CustomerConstants::CDC_API_SECRET_KEY] =
    [
        'cdcApiSecretKey' => 'YesMHgZMlmiL7a29KUa+vkuvv7TL1OOt',
    ];

$config[CustomerConstants::CDC_API_USER_KEY] = 'ANlYRW74tD6V';

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RP';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse';
