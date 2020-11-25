<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;

require('config_default-docker.php');

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RP';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse';
