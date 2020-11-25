<?php

use Monolog\Logger;
use Pyz\Shared\Console\ConsoleConstants;
use Pyz\Shared\DataDog\DataDogConstants;
use Pyz\Shared\DummyPayment\DummyPaymentConfig;
use Pyz\Shared\MerchantSwitcherWidget\MerchantSwitcherWidgetConstants;
use Pyz\Shared\Sales\SalesConstants;
use Pyz\Shared\Scheduler\SchedulerConfig;
use Spryker\Glue\Log\Plugin\GlueLoggerConfigPlugin;
use Spryker\Shared\Acl\AclConstants;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Application\Log\Config\SprykerLoggerConfig;
use Spryker\Shared\Auth\AuthConstants;
use Spryker\Shared\Cms\CmsConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\DocumentationGeneratorRestApi\DocumentationGeneratorRestApiConstants;
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebExceptionErrorRenderer;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebHtmlErrorRenderer;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\HealthCheck\HealthCheckConstants;
use Spryker\Shared\Http\HttpConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Mail\MailConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\PropelOrm\PropelOrmConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Queue\QueueConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Router\RouterConstants;
use Spryker\Shared\Scheduler\SchedulerConstants;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConfig;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConstants;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\StorageRedis\StorageRedisConstants;
use Spryker\Shared\Testify\TestifyConstants;
use Spryker\Shared\Twig\TwigConstants;
use Spryker\Shared\WebProfiler\WebProfilerConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;
use Spryker\Yves\Log\Plugin\YvesLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\ZedLoggerConfigPlugin;
use Spryker\Zed\Propel\PropelConfig;
use SprykerShop\Shared\CalculationPage\CalculationPageConstants;
use SprykerShop\Shared\ErrorPage\ErrorPageConstants;
use SprykerShop\Shared\ShopApplication\ShopApplicationConstants;
use SprykerShop\Shared\WebProfilerWidget\WebProfilerWidgetConstants;
use Twig\Cache\FilesystemCache;

$ZED = APPLICATION === 'STOREAPP' ? 'StoreApp' : 'Zed';

if (APPLICATION === 'STOREAPP') {
    putenv('SPRYKER_DEBUG_ENABLED=1');
}

/* ACL */
if (getenv('SPRYKER_DEBUG_ENABLED')) {
    $config[AclConstants::ACL_USER_RULE_WHITELIST][] = [
        'bundle' => 'wdt',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ];
}
/* end of ACL */

/* ZED */
$config[ApplicationConstants::HOST_ZED] = defined('HOST_ZED') ? HOST_ZED : getenv('SPRYKER_ZED_HOST');
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];
$config[SessionConstants::ZED_SESSION_COOKIE_DOMAIN] = getenv('SPRYKER_BE_HOST');
$config[ApplicationConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = [];
$config[ApplicationConstants::PORT_ZED] = getenv('SPRYKER_ZED_PORT') ? ':' . getenv('SPRYKER_ZED_PORT') : '';
$config[ApplicationConstants::PORT_SSL_ZED] = '';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s%s',
    getenv('SPRYKER_BE_HOST'),
    getenv('SPRYKER_BE_PORT') ? ':' . getenv('SPRYKER_BE_PORT') : ''
);
$config[ApplicationConstants::BASE_URL_SSL_ZED] = sprintf(
    'https://%s%s',
    getenv('SPRYKER_BE_HOST'),
    getenv('SPRYKER_BE_PORT') ? ':' . getenv('SPRYKER_BE_PORT') : ''
);
$config[ZedRequestConstants::HOST_ZED_API] = sprintf(
    '%s:%d',
    defined('HOST_ZED') ? HOST_ZED : getenv('SPRYKER_ZED_HOST'),
    getenv('SPRYKER_ZED_PORT')
);
$config[ZedRequestConstants::BASE_URL_ZED_API] = sprintf(
    'http://%s',
    $config[ZedRequestConstants::HOST_ZED_API]
);
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = sprintf(
    'https://%s',
    $config[ZedRequestConstants::HOST_ZED_API]
);

$config[TwigConstants::ZED_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/%s/Twig/cache/',
            APPLICATION_ROOT_DIR,
            $ZED
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION
    ),
];
$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/%s/Twig/cache/.pathCache',
    APPLICATION_ROOT_DIR,
    $ZED
);

$config[ZedRequestConstants::TRANSFER_DEBUG_SESSION_FORWARD_ENABLED] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[ZedRequestConstants::SET_REPEAT_DATA] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[ZedRequestConstants::YVES_REQUEST_REPEAT_DATA_PATH] = getenv('SPRYKER_LOG_DIRECTORY') . '/' . APPLICATION_STORE . '/yves-requests';

$config[ZedRequestConstants::ZED_API_SSL_ENABLED]
    = $config[ApplicationConstants::ZED_SSL_ENABLED]
    = (bool)getenv('SPRYKER_ZED_SSL_ENABLED');
$config[SessionConstants::ZED_SESSION_COOKIE_SECURE]
    = $config[SessionConstants::ZED_SSL_ENABLED] = true;

$config[ErrorHandlerConstants::DISPLAY_ERRORS] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[ErrorHandlerConstants::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/' . $ZED . '/errorpage/5xx.html';
$config[ErrorHandlerConstants::ERROR_RENDERER] = getenv('SPRYKER_DEBUG_ENABLED') ? WebExceptionErrorRenderer::class : WebHtmlErrorRenderer::class;

/* End ZED */

// ---------- Routing
$config[RouterConstants::YVES_IS_SSL_ENABLED] = true;
$config[RouterConstants::ZED_IS_SSL_ENABLED] = true;

/* Backend */
$config[KernelConstants::SPRYKER_ROOT] = APPLICATION_ROOT_DIR . '/vendor/spryker';
$config[ApplicationConstants::PROJECT_TIMEZONE] = 'UTC';
$config[ApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = $config[ShopApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = (bool)getenv('SPRYKER_DEBUG_ENABLED');

if (class_exists(WebProfilerConstants::class) && !getenv('SPRYKER_TESTING_ENABLED')) {
    $config[WebProfilerConstants::IS_WEB_PROFILER_ENABLED]
        = $config[WebProfilerWidgetConstants::IS_WEB_PROFILER_ENABLED]
        = getenv('SPRYKER_DEBUG_ENABLED');
}

$config[ZedRequestConstants::AUTH_DEFAULT_CREDENTIALS]['yves_system']['token']
    = $config[AuthConstants::AUTH_DEFAULT_CREDENTIALS]['yves_system']['token']
    = getenv('SPRYKER_AUTH_DEFAULT_CREDENTIALS_TOKEN') ?: 'p1tPC0g4Nunw36bArDHq5mTCGVPs6uG5aHtKe2Zi9mSAZIylVsmPaEbs8n9kPtI87K9d9L0gUeBvhuE9';

$config[KernelConstants::RESOLVED_INSTANCE_CACHE_ENABLED] = !getenv('SPRYKER_DEBUG_ENABLED');
$config[KernelConstants::RESOLVABLE_CLASS_NAMES_CACHE_ENABLED] = !getenv('SPRYKER_DEBUG_ENABLED');
$config[KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = !getenv('SPRYKER_DEBUG_ENABLED');

$config[EventConstants::LOGGER_ACTIVE] = (bool)getenv('SPRYKER_DEBUG_ENABLED');

/* End Backend */

/* Yves */
$config[ApplicationConstants::HOST_YVES] = getenv('SPRYKER_FE_HOST');
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[ApplicationConstants::YVES_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = [];
$config[ApplicationConstants::PORT_YVES] = getenv('SPRYKER_FE_PORT');
$config[ApplicationConstants::PORT_SSL_YVES] = '';
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    getenv('SPRYKER_FE_PORT') ? ':' . getenv('SPRYKER_FE_PORT') : ''
);
$config[ApplicationConstants::BASE_URL_SSL_YVES] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_SSL_YVES]
);
$config[ProductManagementConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[NewsletterConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[CustomerConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

$config[SessionConstants::YVES_SESSION_COOKIE_SECURE]
    = $config[MerchantSwitcherWidgetConstants::IS_MERCHANT_SELECTOR_COOKIE_SECURE]
    = $config[SessionConstants::YVES_SSL_ENABLED]
    = $config[ApplicationConstants::YVES_SSL_ENABLED]
    = $config[SessionConstants::YVES_SSL_ENABLED] = true;
$config[ApplicationConstants::YVES_SSL_EXCLUDED] = [
    'healthcheck' => '/health-check',
];

$YVES_THEME = 'default';
$config[TwigConstants::YVES_THEME] = $YVES_THEME;
$config[CmsConstants::YVES_THEME] = $YVES_THEME;

$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

/* End Yves */

/* Glue */
$protocol = true ? 'https' : 'http';
$glueHost = getenv('SPRYKER_API_HOST') ?: 'localhost';
$gluePort = (int)(getenv('SPRYKER_API_PORT') ?: 80);
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = sprintf(
    '%s://%s%s',
    $protocol,
    $glueHost, // TODO: refactor GlueControllerFilterPluginTest to avoid the knowledge of GLUE_APPLICATION_DOMAIN in Zed
    $gluePort !== 80 ? ':' . $gluePort : ''
);
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = getenv('SPRYKER_GLUE_APPLICATION_CORS_ALLOW_ORIGIN') ?: '';

if (class_exists(TestifyConstants::class)) {
    $config[TestifyConstants::GLUE_APPLICATION_DOMAIN] = $config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN];
    $config[TestifyConstants::GLUE_OPEN_API_SCHEMA] = APPLICATION_SOURCE_DIR . '/Generated/Glue/Specification/spryker_rest_api.schema.yml';
}
/* End Glue */

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

/* Job runner */
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS,
];
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://' . getenv('SPRYKER_SCHEDULER_HOST') . ':' . getenv('SPRYKER_SCHEDULER_PORT') . '/',
    ],
];

$config[SchedulerJenkinsConstants::JENKINS_TEMPLATE_PATH] = getenv('SPRYKER_JENKINS_TEMPLATE_PATH');
/* End Job runner */

/* Broker */
$config[QueueConstants::QUEUE_SERVER_ID] = (gethostname()) ?: php_uname('n');

$config[RabbitMqEnv::RABBITMQ_API_HOST] = getenv('SPRYKER_BROKER_API_HOST');
$config[RabbitMqEnv::RABBITMQ_API_PORT] = getenv('SPRYKER_BROKER_API_PORT');
$config[RabbitMqEnv::RABBITMQ_API_USERNAME] = getenv('SPRYKER_BROKER_API_USERNAME');
$config[RabbitMqEnv::RABBITMQ_API_PASSWORD] = getenv('SPRYKER_BROKER_API_PASSWORD');
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = getenv('SPRYKER_BROKER_NAMESPACE');

$rabbitConnections = json_decode(getenv('SPRYKER_BROKER_CONNECTIONS') ?: '[]', true);
$defaultConnection = [
    RabbitMqEnv::RABBITMQ_HOST => getenv('SPRYKER_BROKER_HOST'),
    RabbitMqEnv::RABBITMQ_PORT => getenv('SPRYKER_BROKER_PORT'),
    RabbitMqEnv::RABBITMQ_PASSWORD => getenv('SPRYKER_BROKER_PASSWORD'),
    RabbitMqEnv::RABBITMQ_USERNAME => getenv('SPRYKER_BROKER_USERNAME'),
];
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];

foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];

    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }

    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === APPLICATION_STORE;
}
/* End Broker */

/* Search service */
$config[SearchConstants::ELASTICA_PARAMETER__HOST]
    = $config[SearchElasticsearchConstants::HOST]
    = getenv('SPRYKER_SEARCH_HOST');
$config[SearchConstants::ELASTICA_PARAMETER__TRANSPORT]
    = $config[SearchElasticsearchConstants::TRANSPORT]
    = 'http';
$config[SearchConstants::ELASTICA_PARAMETER__PORT]
    = $config[SearchElasticsearchConstants::PORT]
    = getenv('SPRYKER_SEARCH_PORT');
$config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME] = getenv('SPRYKER_SEARCH_NAMESPACE');

/* End Search service */

// ---------- KV storage
$config[StorageConstants::STORAGE_KV_SOURCE] = strtolower(getenv('SPRYKER_KEY_VALUE_STORE_ENGINE'));
$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = getenv('SPRYKER_KEY_VALUE_STORE_HOST');
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = getenv('SPRYKER_KEY_VALUE_STORE_PORT');
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = defined('SPRYKER_KEY_VALUE_STORE_NAMESPACE') ? SPRYKER_KEY_VALUE_STORE_NAMESPACE : getenv('SPRYKER_KEY_VALUE_STORE_NAMESPACE');

// ---------- Session
$config[SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = getenv('SPRYKER_SESSION_FE_HOST');
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = getenv('SPRYKER_SESSION_FE_PORT');
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = getenv('SPRYKER_SESSION_FE_NAMESPACE');

$config[SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = getenv('SPRYKER_SESSION_BE_HOST');
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = getenv('SPRYKER_SESSION_BE_PORT');
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = getenv('SPRYKER_SESSION_BE_NAMESPACE');

/* Mail */
$config[MailConstants::SMTP_HOST] = getenv('SPRYKER_SMTP_HOST');
$config[MailConstants::SMTP_PORT] = getenv('SPRYKER_SMTP_PORT');
$config[MailConstants::SMTP_AUTH_MODE] = getenv('SPRYKER_SMTP_AUTH_MODE') ?: '';
$config[MailConstants::SMTP_ENCRYPTION] = getenv('SPRYKER_SMTP_ENCRYPTION') ?: '';
$config[MailConstants::SMTP_USERNAME] = getenv('SPRYKER_SMTP_USERNAME') ?: '';
$config[MailConstants::SMTP_PASSWORD] = getenv('SPRYKER_SMTP_PASSWORD') ?: '';
/* End Mail */

/* Logging */
$config[LogConstants::LOGGER_CONFIG] = SprykerLoggerConfig::class;
$config[LogConstants::LOG_FILE_PATH] = getenv('SPRYKER_LOG_DIRECTORY') . '/logs';

$config[LogConstants::LOGGER_CONFIG_ZED] = ZedLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_YVES] = YvesLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_GLUE] = GlueLoggerConfigPlugin::class;

$config[LogConstants::LOG_LEVEL] = getenv('SPRYKER_DEBUG_ENABLED') ? Logger::INFO : Logger::WARNING;

$logDir = getenv('SPRYKER_LOG_DIRECTORY') . '/' . APPLICATION_STORE;

$config[QueueConstants::QUEUE_WORKER_OUTPUT_FILE_NAME] = $logDir . '/' . $ZED . '/queue.log';
$config[PropelConstants::LOG_FILE_PATH] = $logDir . '/' . $ZED . '/propel.log';

$config[LogConstants::LOG_FOLDER_PATH_INSTALLATION] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/install'
    : 'php://stdout';
$config[EventConstants::LOG_FILE_PATH] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/application_events.log'
    : 'php://stdout';
$config[LogConstants::LOG_FILE_PATH_YVES] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/YVES/application.log'
    : 'php://stdout';
$config[LogConstants::LOG_FILE_PATH_ZED] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/ZED/application.log'
    : 'php://stdout';
$config[LogConstants::LOG_FILE_PATH_GLUE] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/GLUE/application.log'
    : 'php://stdout';

$config[LogConstants::EXCEPTION_LOG_FILE_PATH_YVES] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/YVES/exception.log'
    : 'php://stderr';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_ZED] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/ZED/exception.log'
    : 'php://stderr';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_GLUE] = (bool)getenv('SPRYKER_DEBUG_ENABLED')
    ? $logDir . '/GLUE/exception.log'
    : 'php://stderr';
/* End Logging */

// ----------- Kernel test
$config[KernelConstants::ENABLE_CONTAINER_OVERRIDING] = (bool)getenv('SPRYKER_TESTING_ENABLED');

// ----------- Calculation page
$config[CalculationPageConstants::ENABLE_CART_DEBUG] = (bool)getenv('SPRYKER_DEBUG_ENABLED');

// ----------- Error page
$config[ErrorPageConstants::ENABLE_ERROR_404_STACK_TRACE] = (bool)getenv('SPRYKER_DEBUG_ENABLED');

$config[ErrorHandlerConstants::IS_PRETTY_ERROR_HANDLER_ENABLED]
    = $config[ApplicationConstants::ENABLE_PRETTY_ERROR_HANDLER] = (bool)getenv('SPRYKER_DEBUG_ENABLED');

// ----------- Console
$config[ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS] = (bool)getenv('DEVELOPMENT_CONSOLE_COMMANDS');

// ----------- Documentation generator
$config[DocumentationGeneratorRestApiConstants::ENABLE_REST_API_DOCUMENTATION_GENERATION] = true;

// ----------- HTTP Security
$config[KernelConstants::STRICT_DOMAIN_REDIRECT] = false;
$config[KernelConstants::DOMAIN_WHITELIST] = [];

// ---------- DataDog
$config[DataDogConstants::DATA_DOG_HOST] = getenv('SPRYKER_DATA_DOG_AGENT_HOST') ?: '127.0.0.1';

// ---------- HealthChecks
$config[HealthCheckConstants::HEALTH_CHECK_ENABLED] = true;

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'DummyPayment01',
    DummyPaymentConfig::PAYMENT_METHOD_LOOP => 'LoopPayment01',
];
