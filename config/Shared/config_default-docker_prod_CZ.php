<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;

require('config_default-docker.php');

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gsoat.globus.cz/OnlineAsset/3/asset?assetID=';

/* Database */
$config[PropelConstants::USE_SUDO_TO_MANAGE_DATABASE] = false;
$config[PropelConstants::PROPEL_DEBUG] = false;

$config[PropelOrmConstants::PROPEL_SHOW_EXTENDED_EXCEPTION] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[PropelConstants::ZED_DB_USERNAME] = getenv('SPRYKER_DB_USERNAME');
$config[PropelConstants::ZED_DB_PASSWORD] = getenv('SPRYKER_DB_PASSWORD');
$config[PropelConstants::ZED_DB_HOST] = getenv('SPRYKER_DB_HOST');
$config[PropelConstants::ZED_DB_PORT] = getenv('SPRYKER_DB_PORT');
$config[PropelConstants::ZED_DB_ENGINE] = strtolower(getenv('SPRYKER_DB_ENGINE') ?: '') ?: PropelConfig::DB_ENGINE_PGSQL;
$config[PropelQueryBuilderConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE];
$config[PropelConstants::ZED_DB_DATABASE] = getenv('SPRYKER_DB_DATABASE');
/* End Database */
