<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use Spryker\Shared\Event\EventConstants;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;
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
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed/RE';

// ---------- FactFinderExport
$config[FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME] = 'factfinder/dev';

$config[NewRelicConstants::NEW_RELIC_ENVIRONMENT] = 'DE_dev';

$config[EventConstants::LOGGER_ACTIVE] = true;

$config[FactFinderNgConstants::FACT_FINDER_URL] = 'https://globus-sb.fact-finder.de/fact-finder'; # Fact-Finder URL
$config[FactFinderNgConstants::FACT_FINDER_CHANNEL] = 'DevSpryker'; # Fact-Finder channel value
$config[FactFinderConstants::FACT_FINDER_SHOPWARE_CHANNEL] = 'DevShopware'; # Fact-Finder Shopware channel value
$config[FactFinderNgConstants::FACT_FINDER_USERNAME] = 'kps_admin'; # Fact-Finder user for authorization.
$config[FactFinderNgConstants::FACT_FINDER_PASSWORD] = 'glo123SPRY!kps'; # Fact-Finder password for authorization.
$config[MonitoringReportConstants::JENKINS_BASE_URL] = 'http://localhost:8080/';

$config[MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT] = 'https://heartbeat.uptimerobot.com/m791385819-a77506fb716517ef70f77ac288a06d195fb22686';
$config[MonitoringReportConstants::JENKINS_HEARTBEAT_URL] = 'https://heartbeat.uptimerobot.com/m791385860-c0e9076a5382dd13d328032d7bef1ab99a574633';
