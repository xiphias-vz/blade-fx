<?php

use Pyz\Shared\CashierOrderExport\CashierOrderExportConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\FactFinder\FactFinderConstants;
use Pyz\Shared\GsoaRestApiClient\ApiClient;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Zed\SalesOrderSummaryExport\SalesOrderSummaryExportConfig;
use Spryker\Shared\Event\EventConstants;
use StoreApp\Shared\NewRelic\NewRelicConstants;
use Pyz\Shared\MonitoringReport\MonitoringReportConstants;

require('config_default-docker.php');

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://gapi.globus.cz/OnlineAsset/3/asset?assetID=';

$config[DataImportConstants::SFTP_DATA_IMPORT_FILES_FOLDER_NAME] = 'RP';

// ---------- CashierOrderExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_FILES_FOLDER_KEY] = 'kasse';

// ---------- CashierOrderXmlExport
$config[CashierOrderExportConstants::SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY] = 'kasse_v2';

// ---------- ExportOrder
$config[SalesOrderSummaryExportConfig::SFTP_ORDER_EXPORT_FILES_FOLDER_KEY] = 'IN/RP';

// --------- S3 Cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CASHIER_FILE_BUCKETS] = 'iglobuscz-prod-csv-uploads';

// ---------- ExportDeeplink
$config[SalesOrderSummaryExportConfig::SFTP_PRODUCT_DEEPLINK_EXPORT_FILES_FOLDER_KEY] = 'IN/productfeed';

// ----------- GSOA API
$config[ApiClient::GSOA_ROOT_URL] = 'https://gapi.globus.cz';
$config[TokenProvider::GSOA_CLIENT_ID] = "webAppSpryker";
$config[TokenProvider::GSOA_CLIENT_SECRET] = "1A5CE779-02EA-42A5-959C-9909C2C11666";

// ---------- FactFinderExport
$config[FactFinderConstants::FTP_FACT_FINDER_FILES_FOLDER_NAME] = 'factfinder/prod';

$config[NewRelicConstants::NEW_RELIC_ENVIRONMENT] = 'CZ_prod';

$config[MonitoringReportConstants::JENKINS_HEARTBEAT_URL] = 'https://heartbeat.uptimerobot.com/m790983107-63231926e53ec4ad37a8a080d1fd677337f54822';
$config[MonitoringReportConstants::JENKINS_BASE_URL] = 'http://localhost:8080/';

$config[MonitoringReportConstants::EMAIL_SEND_CONSOLE_HEARTBEAT] = 'https://heartbeat.uptimerobot.com/m790983050-36d1bc2f23b78203694f73a9dcd877af62943f99';

