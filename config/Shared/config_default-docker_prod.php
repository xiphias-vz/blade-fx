<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use Spryker\Shared\Event\EventConstants;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;
use StoreApp\Shared\NewRelic\NewRelicConstants;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;


require('config_default-docker.php');

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-prod-product-images.s3.eu-central-1.amazonaws.com';
$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RP';
$config[CashierOrderExportConstants::CASHIER_FILE_DOWNLOAD_URL] = 'https://s3.console.aws.amazon.com/s3/object/globus-prod-csv-uploads?region=eu-central-1&prefix=';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse';

// ---------- CashierOrderXmlExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY] = 'kasse_v2';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RP';

// --------- S3 Images
$config[\Pyz\Shared\S3Constants\S3Constants::S3_IMAGES_BUCKETS] = 'globus-prod-product-images';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'globus-prod-csv-uploads';

// ---------- ExportDeeplink
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed';

// ---------- FactFinderExport
$config[FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME] = 'factfinder/prod';

$config[NewRelicConstants::NEW_RELIC_ENVIRONMENT] = 'DE_prod';

$config[EventConstants::LOGGER_ACTIVE] = true;

// ---------- FACT-Finder NG API
$config[FactFinderNgConstants::FACT_FINDER_URL] = 'https://globus-sb.fact-finder.de/fact-finder'; # Fact-Finder URL
$config[FactFinderNgConstants::FACT_FINDER_CHANNEL] = 'Spryker'; # Fact-Finder channel value
$config[FactFinderNgConstants::FACT_FINDER_USERNAME] = 'kps_admin'; # Fact-Finder user for authorization.
$config[FactFinderNgConstants::FACT_FINDER_PASSWORD] = 'glo123SPRY!kps'; # Fact-Finder password for authorization.

$config[MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT] = 'https://heartbeat.uptimerobot.com/m790982228-f2b83f61ac39379c86ab110c878c353d5640c701';
$config[MonitoringReportConstants::JENKINS_HEARTBEAT_URL] = 'https://heartbeat.uptimerobot.com/m790706896-67260c4c15b4815d1553056adbec1e02084ccdb6';
$config[MonitoringReportConstants::JENKINS_BASE_URL] = 'https://scheduler.shop.globus.de/';

