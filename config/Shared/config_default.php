<?php

use Monolog\Logger;
use Pyz\Service\FlysystemSftpFileSystem\Plugin\Flysystem\SftpFileSystemBuilderPlugin;
use Pyz\Shared\Application\ApplicationConstants;
use Pyz\Shared\BackofficeOverview\BackofficeOverviewConstants;
use Pyz\Shared\CodeBuckets\CodeBucketConstants;
use Pyz\Shared\CollectNumber\CollectNumberConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\DummyPayment\DummyPaymentConfig;
use Pyz\Shared\GoogleTagManager\GoogleTagManagerConstants;
use Pyz\Shared\Invoice\InvoiceConstants;
use Pyz\Shared\Matomo\MatomoConstants;
use Pyz\Shared\Oms\OmsConstants;
use Pyz\Shared\Pdf\PdfConstants;
use Pyz\Shared\ProductDetailPage\ProductDetailPageConstants;
use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Pyz\Shared\Sales\SalesConstants;
use Pyz\Shared\SessionLocks\SessionLocksConfig;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Shared\Store\StoreConstants;
use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Pyz\Shared\TwigCache\TwigCacheConstants;
use Spryker\Client\RabbitMq\Model\RabbitMqAdapter;
use Spryker\Glue\Log\Plugin\GlueLoggerConfigPlugin;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\Acl\AclConstants;
use Spryker\Shared\Auth\AuthConstants;
use Spryker\Shared\CmsGui\CmsGuiConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebHtmlErrorRenderer;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\EventBehavior\EventBehaviorConstants;
use Spryker\Shared\FileManager\FileManagerConstants;
use Spryker\Shared\FileManagerGui\FileManagerGuiConstants;
use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Shared\Flysystem\FlysystemConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Http\HttpConstants;
use Spryker\Shared\Kernel\ClassResolver\Cache\Provider\File;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Kernel\Store;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Monitoring\MonitoringConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\Oauth\OauthConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\Queue\QueueConfig;
use Spryker\Shared\Queue\QueueConstants;
use Spryker\Shared\Quote\QuoteConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Router\RouterConstants;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants;
use Spryker\Shared\SequenceNumber\SequenceNumberConstants;
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\StorageRedis\StorageRedisConstants;
use Spryker\Shared\Tax\TaxConstants;
use Spryker\Shared\Translator\TranslatorConstants;
use Spryker\Shared\Twig\TwigConstants;
use Spryker\Shared\User\UserConstants;
use Spryker\Shared\ZedNavigation\ZedNavigationConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;
use Spryker\Yves\Log\Plugin\YvesLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\ZedLoggerConfigPlugin;
use Spryker\Zed\Oms\OmsConfig;
use Spryker\Zed\Propel\PropelConfig;
use SprykerEco\Shared\Loggly\LogglyConstants;
use SprykerEco\Zed\Payone\PayoneConfig;
use SprykerShop\Shared\CalculationPage\CalculationPageConstants;
use SprykerShop\Shared\ErrorPage\ErrorPageConstants;
use SprykerShop\Shared\ShopApplication\ShopApplicationConstants;
use SprykerShop\Shared\ShopUi\ShopUiConstants;
use StoreApp\Shared\Picker\PickerConstants;
use Twig\Cache\FilesystemCache;

$CURRENT_STORE = Store::getInstance()->getStoreName();
$AVAILABLE_STORES = Store::getInstance()->getAllowedStores();
$APPLICATION_STORE_LOWER_CASE = strtolower(APPLICATION_STORE);

$domain = 'spryker';

$storeToStoreCodeMap = [
    'BERLIN' => 'BER',
    'HAMBURG' => 'HAM',
];

// ---------- General environment
$config[KernelConstants::SPRYKER_ROOT] = APPLICATION_ROOT_DIR . '/vendor/spryker';
$config[ApplicationConstants::PROJECT_TIMEZONE] = 'UTC';
$config[ApplicationConstants::ENABLE_WEB_PROFILER] = false;

$ENVIRONMENT_PREFIX = $storeToStoreCodeMap[$CURRENT_STORE] ?? '';
$config[SequenceNumberConstants::ENVIRONMENT_PREFIX] = $ENVIRONMENT_PREFIX;
$config[SalesConstants::ENVIRONMENT_PREFIX] = $ENVIRONMENT_PREFIX;

// ---------- Namespaces
$config[KernelConstants::PROJECT_NAMESPACE] = defined('PROJECT_NAMESPACE') ? PROJECT_NAMESPACE : 'Pyz';
$config[KernelConstants::PROJECT_NAMESPACES] = defined('PROJECT_NAMESPACES') ? PROJECT_NAMESPACES : [
    'Pyz',
];
$config[KernelConstants::CORE_NAMESPACES] = [
    'SprykerShop',
    'SprykerEco',
    'Spryker',
    'SprykerSdk',
];

// ---------- Propel
$config[PropelConstants::ZED_DB_ENGINE_MYSQL] = PropelConfig::DB_ENGINE_MYSQL;
$config[PropelConstants::ZED_DB_ENGINE_PGSQL] = PropelConfig::DB_ENGINE_PGSQL;
$config[PropelConstants::ZED_DB_SUPPORTED_ENGINES] = [
    PropelConfig::DB_ENGINE_MYSQL => 'MySql',
    PropelConfig::DB_ENGINE_PGSQL => 'PostgreSql',
];

$config[PropelConstants::USE_SUDO_TO_MANAGE_DATABASE] = true;
$config[PropelConstants::PROPEL_DEBUG] = false;

// ---------- Authentication
$config[UserConstants::USER_SYSTEM_USERS] = [
    'yves_system',
];
// For a better performance you can turn off Zed authentication
$config[ZedRequestConstants::AUTH_DEFAULT_CREDENTIALS] =
$config[AuthConstants::AUTH_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => 'gateway',
                'action' => '*',
            ],
        ],
        // Please replace this token for your project
        'token' => 'mVGN3tN7KgsBzLoN7GinRmUYHEgwszGbFWZDpLtzrNsk4tsYVNJgqfYTinB64MwYUFj2BnJdf8TsPrKq',
    ],
];

// ---------- ACL
// ACL: Allow or disallow of urls for Zed Admin GUI for ALL users
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'auth',
        'controller' => 'login',
        'action' => 'index',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'login',
        'action' => 'check',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'password',
        'action' => 'reset',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'password',
        'action' => 'reset-request',
        'type' => 'allow',
    ],
    [
        'bundle' => 'acl',
        'controller' => 'index',
        'action' => 'denied',
        'type' => 'allow',
    ],
    [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => 'logout',
        'action' => 'index',
        'type' => 'allow',
    ],
];
// ACL: Allow or disallow of urls for Zed Admin GUI
$config[AclConstants::ACL_USER_RULE_WHITELIST] = [
    [
        'bundle' => 'application',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'auth',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
];
// ACL: Special rules for specific users
$config[AclConstants::ACL_DEFAULT_CREDENTIALS] = [
    'yves_system' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => 'gateway',
                'action' => '*',
                'type' => 'allow',
            ],
        ],
    ],
];

// ---------- Elasticsearch
$ELASTICA_HOST = 'localhost';
$ELASTICA_TRANSPORT_PROTOCOL = 'http';
$ELASTICA_PORT = '10005';
$ELASTICA_AUTH_HEADER = null;
$ELASTICA_INDEX_NAME = null;// Store related config
$ELASTICA_DOCUMENT_TYPE = 'page';
$ELASTICA_PARAMETER__EXTRA = [];
$config[SearchConstants::ELASTICA_PARAMETER__HOST]
    = $config[SearchElasticsearchConstants::HOST]
    = $ELASTICA_HOST;
$config[SearchConstants::ELASTICA_PARAMETER__TRANSPORT]
    = $config[SearchElasticsearchConstants::TRANSPORT]
    = $ELASTICA_TRANSPORT_PROTOCOL;
$config[SearchConstants::ELASTICA_PARAMETER__PORT]
    = $config[SearchElasticsearchConstants::PORT]
    = $ELASTICA_PORT;
$config[SearchConstants::ELASTICA_PARAMETER__AUTH_HEADER]
    = $config[SearchElasticsearchConstants::AUTH_HEADER]
    = $ELASTICA_AUTH_HEADER;
$config[SearchConstants::ELASTICA_PARAMETER__EXTRA]
    = $config[SearchElasticsearchConstants::EXTRA]
    = $ELASTICA_PARAMETER__EXTRA;
$config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME] = $ELASTICA_INDEX_NAME;
$config[CollectorConstants::ELASTICA_PARAMETER__DOCUMENT_TYPE] = $ELASTICA_DOCUMENT_TYPE;

// ---------- Page search
$config[SearchConstants::FULL_TEXT_BOOSTED_BOOSTING_VALUE]
    = $config[SearchElasticsearchConstants::FULL_TEXT_BOOSTED_BOOSTING_VALUE] = 3;

// ---------- TwigCache
$config[TwigCacheConstants::TWIG_CACHE_ENABLED] = true;

// ---------- Twig
$config[TwigConstants::YVES_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Yves/Twig/cache/',
            APPLICATION_ROOT_DIR
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION
    ),
];
$config[TwigConstants::ZED_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Zed/Twig/cache/',
            APPLICATION_ROOT_DIR
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION
    ),
];
$config[TwigConstants::YVES_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Yves/Twig/cache/.pathCache',
    APPLICATION_ROOT_DIR
);
$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Zed/Twig/cache/.pathCache',
    APPLICATION_ROOT_DIR
);

// ---------- Navigation
// The cache should always be activated. Refresh/build with CLI command: vendor/bin/console application:build-navigation-cache
$config[ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;

// ---------- Zed request
$config[ZedRequestConstants::TRANSFER_DEBUG_SESSION_FORWARD_ENABLED] = false;
$config[ZedRequestConstants::TRANSFER_DEBUG_SESSION_NAME] = 'XDEBUG_SESSION';

// ---------- KV storage
$config[StorageConstants::STORAGE_KV_SOURCE] = 'redis';

/**
 * Data source names are used exclusively when set, e.g. no other Redis storage configuration will be used for the client.
 *
 * Example:
 *   $config[StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379']
 */
//$config[StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES] = [];

$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = 10009;
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 0;

// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
$config[SessionConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_DAY * 7;
$config[SessionRedisConstants::YVES_SESSION_TIME_TO_LIVE] = $config[SessionConstants::YVES_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::YVES_SESSION_TIME_TO_LIVE] = $config[SessionConstants::YVES_SESSION_TIME_TO_LIVE];
$config[SessionConstants::YVES_SESSION_COOKIE_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_DAY * 7;
$config[SessionFileConstants::YVES_SESSION_FILE_PATH] = session_save_path();
$config[SessionConstants::YVES_SESSION_PERSISTENT_CONNECTION] = $config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION];
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
$config[SessionConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionConstants::ZED_SESSION_COOKIE_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_BROWSER_SESSION;
$config[SessionFileConstants::ZED_SESSION_FILE_PATH] = session_save_path();
$config[SessionConstants::ZED_SESSION_PERSISTENT_CONNECTION] = $config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION];
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = SessionLocksConfig::LOCKING_TIMEOUT_MILLISECONDS;
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = SessionLocksConfig::LOCKING_RETRY_DELAY_MICROSECONDS;
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = SessionLocksConfig::LOCKING_LOCK_TTL_MILLISECONDS;

/**
 * Data source names are used exclusively when set, e.g. no other Redis session configuration will be used for the client.
 *
 * Example:
 *   $config[SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379']
 */
//$config[SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES] = [];

$config[SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL] = $config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL];
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = $config[StorageRedisConstants::STORAGE_REDIS_HOST];
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = $config[StorageRedisConstants::STORAGE_REDIS_PORT];
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = $config[StorageRedisConstants::STORAGE_REDIS_PASSWORD];
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = 1;

/**
 * Data source names are used exclusively when set, e.g. no other Redis session configuration will be used for the client.
 *
 * Example:
 *   $config[SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379']
 */
//$config[SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES] = [];

$config[SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL] = $config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL];
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = $config[StorageRedisConstants::STORAGE_REDIS_HOST];
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = $config[StorageRedisConstants::STORAGE_REDIS_PORT];
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = $config[StorageRedisConstants::STORAGE_REDIS_PASSWORD];
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = 2;

// ---------- Cookie
$config[ApplicationConstants::YVES_COOKIE_DEVICE_ID_NAME] = 'did';
$config[ApplicationConstants::YVES_COOKIE_DEVICE_ID_VALID_FOR] = '+5 year';
$config[ApplicationConstants::YVES_COOKIE_VISITOR_ID_NAME] = 'vid';
$config[ApplicationConstants::YVES_COOKIE_VISITOR_ID_VALID_FOR] = '+30 minute';

// ---------- HTTP strict transport security
$HSTS_ENABLED = true;
$config[ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED]
    = $config[HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED]
    = $HSTS_ENABLED;
$config[ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED]
    = $config[HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_ENABLED]
    = $HSTS_ENABLED;
$HSTS_CONFIG = [
    'max_age' => 31536000,
    'include_sub_domains' => true,
];
$config[ApplicationConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG]
    = $config[HttpConstants::ZED_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG]
    = $HSTS_CONFIG;
$config[ApplicationConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG]
    = $config[HttpConstants::YVES_HTTP_STRICT_TRANSPORT_SECURITY_CONFIG]
    = $HSTS_CONFIG;

// ---------- SSL
$config[SessionConstants::YVES_SSL_ENABLED] = false;
$config[ZedRequestConstants::ZED_API_SSL_ENABLED] = false;

// --------- Router
$config[RouterConstants::YVES_SSL_EXCLUDED_ROUTE_NAMES] = [
    'healthcheck' => '/health-check',
];
$config[RouterConstants::ZED_SSL_EXCLUDED_ROUTE_NAMES] = ['health-check/index'];

// ---------- Error handling
$config[ErrorHandlerConstants::YVES_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Yves/errorpage/5xx.html';
$config[ErrorHandlerConstants::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Zed/errorpage/5xx.html';
$config[ErrorHandlerConstants::ERROR_RENDERER] = WebHtmlErrorRenderer::class;
// Due to some deprecation notices we silence all deprecations for the time being
$config[ErrorHandlerConstants::ERROR_LEVEL] = E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED;
// To only log e.g. deprecations instead of throwing exceptions here use
//$config[ErrorHandlerConstants::ERROR_LEVEL] = E_ALL
//$config[ErrorHandlerConstants::ERROR_LEVEL_LOG_ONLY] = E_DEPRECATED | E_USER_DEPRECATED;

// ---------- Logging
$config[LogConstants::LOGGER_CONFIG_ZED] = ZedLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_YVES] = YvesLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_GLUE] = GlueLoggerConfigPlugin::class;

$config[LogConstants::LOG_LEVEL] = Logger::INFO;

$baseLogFilePath = sprintf('%s/data/%s/logs', APPLICATION_ROOT_DIR, $CURRENT_STORE);

$config[LogConstants::LOG_FILE_PATH_YVES] = $baseLogFilePath . '/YVES/application.log';
$config[LogConstants::LOG_FILE_PATH_ZED] = $baseLogFilePath . '/ZED/application.log';
$config[LogConstants::LOG_FILE_PATH_GLUE] = $baseLogFilePath . '/GLUE/application.log';

$config[LogConstants::EXCEPTION_LOG_FILE_PATH_YVES] = $baseLogFilePath . '/YVES/exception.log';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_ZED] = $baseLogFilePath . '/ZED/exception.log';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_GLUE] = $baseLogFilePath . '/GLUE/exception.log';
$config[LogConstants::LOG_FOLDER_PATH_INSTALLATION] = sprintf('%s/data/install/logs', APPLICATION_ROOT_DIR);

$config[LogConstants::LOG_SANITIZE_FIELDS] = [
    'password',
];

$config[LogConstants::LOG_QUEUE_NAME] = 'log-queue';
$config[LogConstants::LOG_ERROR_QUEUE_NAME] = 'error-log-queue';

// ---------- Auto-loader
$config[KernelConstants::AUTO_LOADER_CACHE_FILE_NO_LOCK] = false;
$config[KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_PROVIDER] = File::class;
$config[KernelConstants::AUTO_LOADER_CACHE_FILE_PATH] = sprintf(
    '%s/src/Generated/Shared/Kernel/cache/%s/unresolvable.cache',
    APPLICATION_ROOT_DIR,
    implode('/', $config[KernelConstants::PROJECT_NAMESPACES])
);

// ---------- Dependency injector
$config[KernelConstants::DEPENDENCY_INJECTOR_YVES] = [
    'CheckoutPage' => [
        'DummyPayment',
    ],
];
$config[KernelConstants::DEPENDENCY_INJECTOR_ZED] = [
    'Payment' => [
        'DummyPayment',
    ],
    'Oms' => [
        'DummyPayment',
    ],
];

// ---------- State machine (OMS)
$config[OmsConstants::PROCESS_LOCATION] = [
    OmsConfig::DEFAULT_PROCESS_LOCATION,
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    'DummyPayment01',
    'LoopPayment01',
    'PayoneCreditCardFlow01',
    'PayonePayPalFlow01',
    'PayoneSofortFlow01',
];

$config[OmsConstants::OMS_PROCESS_WORKER_NUMBER] = 10;

/*
 * Chunk operation can be disabled by removing the following line completely from the config file.
 */
$config[OmsConstants::OMS_PROCESS_WORKER_CHUNK_SIZE] = (int)getenv('OMS_CHUNK_SIZE') !== 0 ? (int)getenv('OMS_CHUNK_SIZE') : 20;

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'DummyPayment01',
    DummyPaymentConfig::PAYMENT_METHOD_LOOP => 'LoopPayment01',
    PayoneConfig::PAYMENT_METHOD_CREDIT_CARD => 'PayoneCreditCardFlow01',
    PayoneConfig::PAYMENT_METHOD_E_WALLET => 'PayonePayPalFlow01',
    PayoneConfig::PAYMENT_METHOD_INSTANT_ONLINE_TRANSFER => 'PayoneSofortFlow01',
];

// ---------- Queue
$config[QueueConstants::QUEUE_SERVER_ID] = (gethostname()) ?: php_uname('n');
$config[QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS] = 1000;
$config[QueueConstants::QUEUE_PROCESS_TRIGGER_INTERVAL_MICROSECONDS] = 1001;
$config[QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS] = 59;
$config[QueueConstants::QUEUE_WORKER_LOG_ACTIVE] = false;

/*
 * Queues can have different adapters and maximum worker number
 * QUEUE_ADAPTER_CONFIGURATION can have the array like this as an example:
 *
 *   'mailQueue' => [
 *       QueueConfig::CONFIG_QUEUE_ADAPTER => \Spryker\Client\RabbitMq\Model\RabbitMqAdapter::class,
 *       QueueConfig::CONFIG_MAX_WORKER_NUMBER => 5
 *   ],
 *
 *
 */
$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION_DEFAULT] = [
    QueueConfig::CONFIG_QUEUE_ADAPTER => RabbitMqAdapter::class,
    QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1,
];

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION] = [
    EventConstants::EVENT_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => RabbitMqAdapter::class,
        QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1,
    ],
];

$config[LogglyConstants::QUEUE_NAME] = 'loggly-log-queue';
$config[LogglyConstants::ERROR_QUEUE_NAME] = 'loggly-log-queue.error';

// ---------- Event
$config[EventConstants::EVENT_CHUNK] = 500;

// ---------- EventBehavior
$config[EventBehaviorConstants::EVENT_BEHAVIOR_TRIGGERING_ACTIVE] = true;

// ---------- Customer
$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^/login_check$|^(/en|/de)?/customer($|/)|^(/en|/de)?/wishlist($|/)|^(/en|/de)?/shopping-list($|/)|^(/en|/de)?/company(?!/register)($|/)|^(/en|/de)?/multi-cart($|/)|^(/en|/de)?/shared-cart($|/))';
$config[CustomerConstants::CUSTOMER_ANONYMOUS_PATTERN] = '^/.*';

// ---------- Taxes
$config[TaxConstants::DEFAULT_TAX_RATE] = 19;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [];
$config[FlysystemConstants::FILESYSTEM_SERVICE] = $config[FileSystemConstants::FILESYSTEM_SERVICE];
$config[CmsGuiConstants::CMS_PAGE_PREVIEW_URI] = '/en/cms/preview/%d';

// ---------- Loggly
$config[LogglyConstants::TOKEN] = 'loggly-token:sample:123456';

// ---------- CMS
$config[CmsGuiConstants::CMS_FOLDER_PATH] = '@Cms/templates/';

// -------- DataImport
$config[DataImportConstants::IS_ENABLE_INTERNAL_IMAGE] = false;

// ----------- Glue Application
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = '';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = '';

// ----------- OAUTH
//Check how to generate https://oauth2.thephpleague.com/installation/
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://';
$config[OauthConstants::ENCRYPTION_KEY] = '';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = '';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = '';

// ---------- FileSystem
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'files' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/' . APPLICATION_STORE . '/media/',
        'path' => 'files/',
    ],
    'cashier_order_local' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/' . APPLICATION_STORE . '/export/',
        'path' => 'files/',
    ],
    'globus_sftp' => [
        'sprykerAdapterClass' => SftpFileSystemBuilderPlugin::class,
        'host' => getenv('GLOBUS_SFTP_HOST'),
        'port' => getenv('GLOBUS_SFTP_PORT'),
        'username' => getenv('GLOBUS_SFTP_USERNAME'),
        'password' => getenv('GLOBUS_SFTP_PASSWORD'),
        'root' => getenv('GLOBUS_SFTP_ROOT'),
    ],
];

// ---------- CDC
$config[\Pyz\Shared\Customer\CustomerConstants::CDC_CONSTANTS] = [
    'globus_cdc_credentials' => [
        'cdcApiKey' => getenv('GLOBUS_CDCAPIKEY'),
        'cdcApiUrl' => getenv('GLOBUS_CDCAPIURL'),
        'cdcScreensUrl' => getenv('GLOBUS_CDCSCREENSURL'),
        'cdcApiSecretKey' => getenv('GLOBUS_CDCAPISECRETKEY'),
        'cdcApiUserKey' => getenv('GLOBUS_CDCAPIUSERKEY'),
    ],
];

// ---------- GLOBUS APIS
$config[\Pyz\Shared\Customer\CustomerConstants::GLOBUS_API_CONSTANTS] = [
    'globus_api_credentials' => [
        'globusApiUrlNoScreen' => getenv('GLOBUS_CDCAPIURL_NO_SCREEN'),
        'globusApiKeyNoScreen' => getenv('GLOBUS_CDCAPIKEY_NO_SCREEN'),
        'globusApiSecretKeyNoScreen' => getenv('GLOBUS_CDCAPISECRETKEY_NO_SCREEN'),
    ],
    'globus_api_endpoint' => [
        'globusApiEndPointAddressValidation' => '/v1/meinglobus/validations/address',
        'globusApiEndPointNextCardNumber' => '/v2/meinglobus/digitalcard/nextcard',
        'globusApiEndPointCheckCardStatus' => '/v1/card/cards/{cardNumber}/status',
        'globusApiEndPointAccountAvailable' => '/v2/meinglobus/accounts/registrations/available',
        'globusApiEndPointAccountLogin' => '/v2/meinglobus/accounts/login',
        'globusApiEndPointAccountPasswordReset' => 'v2/meinglobus/accounts/password/reset',
        'globusApiEndPointAccountRegistrationFull' => 'v2/meinglobus/accounts/registrations/full',
        'globusApiEndPointAccountPaybackInfo' => 'v1/meinglobus/accounts/data/uuid/payback',
        'globusApiEndPointAccountLogout' => '/v2/meinglobus/accounts/logout',
    ],
];

// --------------- GOOGLE CAPTCHA
$config[\Pyz\Shared\Customer\CustomerConstants::GOOGLE_CAPTCHA_CONSTANTS] = [
    'google_captcha_credentials' => [
        'google_captcha_site_key' => getenv('GLOBUS_GOOGLE_CAPTCHA_SITE_KEY'),
        'google_captcha_secret' => getenv('GLOBUS_GOOGLE_CAPTCHA_SECRET'),
    ],
];

// ---------- Sitemap
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CONSTANTS] = [
    'globus_sitemap_credentials' => [
        'key' => getenv('GLOBUS_AWS_S3_KEY'),
        'secret' => getenv('GLOBUS_AWS_S3_SECRET'),
        'bucket' => getenv('GLOBUS_AWS_S3_BUCKET'),
    ],
];

// ---------- S3 export cashier file
$config[\Pyz\Shared\S3Constants\S3Constants::S3_CONSTANTS_CASHIER_FILE] = [
    'globus_s3_cashier_file_credentials' => [
        'key' => getenv('GLOBUS_AWS_S3_KEY'),
        'secret' => getenv('GLOBUS_AWS_S3_SECRET'),
    ],
];

// ---------- FileManager
$config[FileManagerConstants::STORAGE_NAME] = 'files';
$config[FileManagerGuiConstants::DEFAULT_FILE_MAX_SIZE] = '10M';

// ---------- Monitoring
$config[MonitoringConstants::IGNORABLE_TRANSACTIONS] = [
    '_profiler',
    '_wdt',
];

// ---------- Guest cart
$config[QuoteConstants::GUEST_QUOTE_LIFETIME] = 'P01M';

// ----------- Translator
$config[TranslatorConstants::TRANSLATION_ZED_FALLBACK_LOCALES] = [
    'de_DE' => ['en_US'],
];

$config[TranslatorConstants::TRANSLATION_ZED_CACHE_DIRECTORY] = sprintf(
    '%s/src/Generated/Zed/Translator/cache',
    APPLICATION_ROOT_DIR
);

$config[TranslatorConstants::TRANSLATION_ZED_FILE_PATH_PATTERNS] = [
    APPLICATION_ROOT_DIR . '/src/Pyz/Zed/Translator/data/*/[a-z][a-z]_[A-Z][A-Z].csv',
];

// ----------- Kernel test
$config[KernelConstants::ENABLE_CONTAINER_OVERRIDING] = false;

// ----------- Calculation page
$config[CalculationPageConstants::ENABLE_CART_DEBUG] = false;

// ----------- Error page
$config[ErrorPageConstants::ENABLE_ERROR_404_STACK_TRACE] = false;

// ----------- Application
$config[ApplicationConstants::TWIG_ENVIRONMENT_NAME]
    = $config[ShopApplicationConstants::TWIG_ENVIRONMENT_NAME]
    = APPLICATION_ENV;

$config[ErrorHandlerConstants::IS_PRETTY_ERROR_HANDLER_ENABLED]
    = $config[ApplicationConstants::ENABLE_PRETTY_ERROR_HANDLER] = false;

$config[ApplicationConstants::CURRENCY_CODE] = 'EUR';

// ----------- Yves assets
$config[ShopUiConstants::YVES_ASSETS_URL_PATTERN] = '/assets/' . (getenv('SPRYKER_BUILD_HASH') ?: 'current') . '/%theme%/';

// ----------- HTTP Security
$config[KernelConstants::STRICT_DOMAIN_REDIRECT] = true;

// ALDI
$config[ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_KEYS] = [];
$config[ProductDetailPageConstants::REQUIRED_ATTRIBUTE_KEYS] = [];

$config[SalesConstants::BOTTLE_DEPOSIT_PRICE_IN_CENTS] = 25;
$config[InvoiceConstants::INVOICE_DUE_DATE_DAYS] = 14;
$config[InvoiceConstants::INVOICE_TIME_HOURS] = 18;
$config[InvoiceConstants::INVOICE_PREFIX] = 'SPRYKER-' . $ENVIRONMENT_PREFIX . '-';
$config[InvoiceConstants::INVOICE_CREATION_DELAY_IN_DAYS] = 0;
$config[InvoiceConstants::INVOICE_EMAIL_BCC] = [];

$config[PdfConstants::FONT_DIR] = sprintf('%s/data/font', APPLICATION_ROOT_DIR);
$config[PdfConstants::FONT_DEFAULT] = '';
$config[PdfConstants::FONT_DATA] = [
    $config[PdfConstants::FONT_DEFAULT] => [],
];

// Matomo Piwik tracking
$config[MatomoConstants::MATOMO_URL] = '';
$config[MatomoConstants::MATOMO_IDSITE] = '';

//Time Slot
$config[TimeSlotConstants::HOLIDAYS] = [
    '2020-04-20',
    '2020-05-01',
    '2020-05-21',
];

$config[TimeSlotConstants::MAX_SHOW_DAYS] = 5;

$config[TimeSlotConstants::SHIPMENT_TIME_SLOTS] = [
    ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT => [
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '18:00-20:00',
    ],
    ShipmentConfig::SHIPMENT_METHOD_DELIVERY => [
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '18:00-20:00',
    ],
];

$config[TimeSlotConstants::SAME_DAY_SHIPMENT_TIME_SLOTS] = [
    ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT => [
//        'KMD' => [
//            '09:00' => [
//                '12:00-14:00',
//                '14:00-16:00',
//            ],
//            '13:00' => [
//                '16:00-18:00',
//                '18:00-20:00',
//            ],
//        ],
    ],
    ShipmentConfig::SHIPMENT_METHOD_DELIVERY => [
//        'KMD' => [
//            '09:00' => [
//                '12:00-14:00',
//                '14:00-16:00',
//            ],
//            '13:00' => [
//                '16:00-18:00',
//                '18:00-20:00',
//            ],
//        ],
    ],
];

// Collect Number
$config[CollectNumberConstants::COLLECT_NUMBER_LENGTH] = 3;
$config[CollectNumberConstants::COLLECT_NUMBER_PAD_SYMBOL] = '0';
$config[CollectNumberConstants::COLLECT_NUMBER_DIGITS_BASE] = 10;

// Picker
$config[PickerConstants::MAX_PICKING_BAGS] = 20;
$config[PickerConstants::MAX_ORDERS_COUNT_TO_DISPLAY] = 250;

// ---------- Yves host
$config[ApplicationConstants::HOST_YVES] = sprintf('www.%s.%s.local', $APPLICATION_STORE_LOWER_CASE, $domain);
$config[ApplicationConstants::PORT_YVES] = '';
$config[ApplicationConstants::PORT_SSL_YVES] = '';
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_YVES]
);
$config[ApplicationConstants::BASE_URL_SSL_YVES] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_SSL_YVES]
);
$config[ProductManagementConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[NewsletterConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[CustomerConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

// ---------- Zed host
$config[ApplicationConstants::HOST_ZED] = sprintf('zed.%s.%s.local', $APPLICATION_STORE_LOWER_CASE, $domain);
$config[ApplicationConstants::PORT_ZED] = '';
$config[ApplicationConstants::PORT_SSL_ZED] = '';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_ZED]
);
$config[ApplicationConstants::BASE_URL_SSL_ZED] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_SSL_ZED]
);
$config[ZedRequestConstants::HOST_ZED_API] = $config[ApplicationConstants::HOST_ZED];
$config[ZedRequestConstants::BASE_URL_ZED_API] = $config[ApplicationConstants::BASE_URL_ZED];
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = $config[ApplicationConstants::BASE_URL_SSL_ZED];

// ---------- Trusted hosts
$config[ApplicationConstants::YVES_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = [
    $config[ApplicationConstants::HOST_YVES],
];

// ---------- Assets / Media
$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

// ---------- Session
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];

// ---------- Events
$config[EventConstants::LOG_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/' . APPLICATION_STORE . '/logs/application_events.log';

// ----------- Glue Application
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = sprintf('http://glue.%s.%s.local', $APPLICATION_STORE_LOWER_CASE, $domain);
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = sprintf('http://glue.%s.%s.local', $APPLICATION_STORE_LOWER_CASE, $domain);

// ----------- RabbitMq
foreach ($AVAILABLE_STORES as $store) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$store] = [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => sprintf('%s-connection', $store),
        RabbitMqEnv::RABBITMQ_HOST => 'localhost',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => 'mate20mg',
        RabbitMqEnv::RABBITMQ_USERNAME => sprintf('%s_development', $store),
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => sprintf('/%s_development_zed', $store),
        RabbitMqEnv::RABBITMQ_STORE_NAMES => [$store],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => $store === APPLICATION_STORE,
    ];
}

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION_DEFAULT] = [
    QueueConfig::CONFIG_QUEUE_ADAPTER => RabbitMqAdapter::class,
    QueueConfig::CONFIG_MAX_WORKER_NUMBER => 2,
];

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION][EventConstants::EVENT_QUEUE][QueueConfig::CONFIG_MAX_WORKER_NUMBER] = 5;

// ----------- HTTP Security
$config[KernelConstants::DOMAIN_WHITELIST] = [
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::HOST_ZED],
];

$config[SalesConstants::ORDER_EXPIRE_HOUR] = 22;
$config[SalesConstants::ORDER_READY_FOR_PICKING_HOUR] = 0;

$config[ProductImageConstants::IMAGES_HOST_URL] = 'https://globus-staging-product-images.s3.eu-central-1.amazonaws.com';
$config[StoreConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    1004 => 'EIN',
    1031 => 'KMD',
    1042 => 'LPZ',
    1057 => 'HAD',
    1021 => 'ISS',
    1053 => 'RUE',
    1013 => 'WIE',
    1001 => 'WND',
    1071 => 'KRE',
    1003 => 'GEN',
    1073 => 'ESS',
    1006 => 'GUE',
    1072 => 'BSG',
    1054 => 'ESB',
    1032 => 'WLZ',
];

// ----------- Stores
$config[StoreConstants::STORE_NAMES] = [
    'EIN' => 'Homburg-Einöd',
    'KMD' => 'Köln',
    'LPZ' => 'Leipzig',
    'HAD' => 'Halle',
    'ISS' => 'Jena-Isserstedt',
    'RUE' => 'Rüsselsheim',
    'WIE' => 'Wiesental',
    'WND' => 'St.Wendel',
    'KRE' => 'Krefeld',
    'GEN' => 'Gensingen',
    'ESS' => 'Essen',
    'GUE' => 'Saarbrücken-Güdingen',
    'BSG' => 'Braunschweig',
    'ESB' => 'Eschborn',
    'WLZ' => 'Weischlitz',
];

// ----------- Google Tag Manager
$config[GoogleTagManagerConstants::CONTAINER_ID] = 'GTM-KN8QSGS';

$config[CodeBucketConstants::CURRENCY_SYMBOL] = '€';

// ---------- Customer dropdowns
$config[\Pyz\Shared\Customer\CustomerConstants::CUSTOMER_COUNTRY] = [
    60 => 'customer.registration.country_placeholder',
];

$config[\Pyz\Shared\Customer\CustomerConstants::CUSTOMER_PHONE_PREFIX] =
[
    '+49' => 'customer.registration.phone.prefix_placeholder',
];

$config[\Pyz\Shared\Customer\CustomerConstants::CDC_API_USER_KEY] = 'AOOFJuSjBzxx';

// ----------Customer profile URL
$config[\Pyz\Shared\Customer\CustomerConstants::CUSTOMER_PROFILE_URL] = 'https://www.globus.de/kundenprogramme/mein-globus/kontoverwaltung.php';

// ----------- Cookiebot
$config[\Pyz\Shared\CookieBot\CookieBotConstants::DOMAIN_GROUP_ID] = '4bae1e02-80b1-43ac-881c-aba9593b2331';

// ----------- Days in the week abbr
$config[PickerConstants::DAYS_IN_THE_WEEK] = [
    '1' => 'MO',
    '2' => 'DI',
    '3' => 'MI',
    '4' => 'DO',
    '5' => 'FR',
    '6' => 'SA',
    '7' => 'SO',
];

// ----------- Backoffice overview choice
$config[BackofficeOverviewConstants::CHOICE_FILTER] = [
    1 => 'Order',
    2 => 'Position',
    3 => 'Stückzahl',
];

// ----------- Backoffice overview table header

$config[BackofficeOverviewConstants::TABLE_HEADER] = [
    'Slot' => 'Slot',
    'Gesamt' => 'Gesamt',
    'TRO' => 'TRO',
    'BÄCK' => 'BÄCK',
    'DROG' => 'DROG',
    'FIS' => 'FIS',
    'FRI' => 'FRI',
    'GET' => 'GET',
    'KÄS' => 'KÄS',
    'METZ' => 'METZ',
    'NON' => 'NON',
    'OBS' => 'OBS',
    'TKK' => 'TKK',
];
