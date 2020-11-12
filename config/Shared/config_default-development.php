<?php

/**
 * This is the global runtime configuration for Yves and Generated_Yves_Zed in a development environment.
 */

use Monolog\Logger;
use Pyz\Shared\Console\ConsoleConstants;
use Pyz\Shared\DataImport\DataImportConstants;
use Pyz\Shared\MerchantSwitcherWidget\MerchantSwitcherWidgetConstants;
use Pyz\Shared\Payone\PayoneConstants;
use Pyz\Shared\Scheduler\SchedulerConfig;
use Pyz\Shared\TwigCache\TwigCacheConstants;
use Spryker\Shared\Acl\AclConstants;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\ErrorHandler\ErrorHandlerConstants;
use Spryker\Shared\ErrorHandler\ErrorRenderer\WebExceptionErrorRenderer;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Kernel\Store;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Mail\MailConstants;
use Spryker\Shared\Oauth\OauthConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\PropelOrm\PropelOrmConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Queue\QueueConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Router\RouterConstants;
use Spryker\Shared\Scheduler\SchedulerConstants;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConfig;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConstants;
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConstants;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
use Spryker\Shared\Twig\TwigConstants;
use Spryker\Shared\WebProfiler\WebProfilerConstants;
use Spryker\Shared\ZedNavigation\ZedNavigationConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;
use SprykerShop\Shared\CalculationPage\CalculationPageConstants;
use SprykerShop\Shared\ErrorPage\ErrorPageConstants;
use SprykerShop\Shared\ShopApplication\ShopApplicationConstants;
use SprykerShop\Shared\WebProfilerWidget\WebProfilerWidgetConstants;
use Twig\Cache\FilesystemCache;

$CURRENT_STORE = Store::getInstance()->getStoreName();

// ---------- TwigCache
$config[TwigCacheConstants::TWIG_CACHE_ENABLED] = false;

// ---------- General environment
$config[KernelConstants::SPRYKER_ROOT] = APPLICATION_ROOT_DIR . '/vendor/spryker';
$config[KernelConstants::STORE_PREFIX] = 'DEV';
$config[ApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = $config[ShopApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = true;

$config[WebProfilerConstants::IS_WEB_PROFILER_ENABLED] = true;
$config[WebProfilerWidgetConstants::IS_WEB_PROFILER_ENABLED] = true;

$config[ApplicationConstants::ZED_SSL_ENABLED]
    = $config[RouterConstants::ZED_IS_SSL_ENABLED]
    = false;
$config[ApplicationConstants::YVES_SSL_ENABLED]
    = $config[RouterConstants::YVES_IS_SSL_ENABLED]
    = false;

// ---------- Propel
$config[PropelConstants::PROPEL_DEBUG] = false;
$config[PropelOrmConstants::PROPEL_SHOW_EXTENDED_EXCEPTION] = true;
$config[PropelConstants::ZED_DB_USERNAME] = 'development';
$config[PropelConstants::ZED_DB_PASSWORD] = 'mate20mg';
$config[PropelConstants::ZED_DB_HOST] = '127.0.0.1';
$config[PropelConstants::ZED_DB_PORT] = 3306;
$config[PropelConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];
$config[PropelQueryBuilderConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE_MYSQL];

// ---------- RabbitMQ
$config[RabbitMqEnv::RABBITMQ_API_HOST] = 'localhost';
$config[RabbitMqEnv::RABBITMQ_API_PORT] = '15672';
$config[RabbitMqEnv::RABBITMQ_API_USERNAME] = 'admin';
$config[RabbitMqEnv::RABBITMQ_API_PASSWORD] = 'mate20mg';

// ---------- Session
$config[MerchantSwitcherWidgetConstants::IS_MERCHANT_SELECTOR_COOKIE_SECURE] =
    $config[SessionConstants::YVES_SESSION_COOKIE_SECURE] = false;
$config[SessionConstants::ZED_SESSION_COOKIE_SECURE] = false;
$config[SessionConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_YEAR;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];

// ---------- Scheduler
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS,
];
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://localhost:10007/',
    ],
];

// ---------- Zed request
$config[ZedRequestConstants::TRANSFER_DEBUG_SESSION_FORWARD_ENABLED] = true;
$config[ZedRequestConstants::SET_REPEAT_DATA] = true;
$config[ZedRequestConstants::YVES_REQUEST_REPEAT_DATA_PATH] = APPLICATION_ROOT_DIR . '/data/' . Store::getInstance()->getStoreName() . '/' . APPLICATION_ENV . '/yves-requests';

// ---------- Navigation
$config[ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;

// ---------- Error handling
$config[ErrorHandlerConstants::DISPLAY_ERRORS] = true;
$config[ErrorHandlerConstants::ERROR_RENDERER] = WebExceptionErrorRenderer::class;

// ---------- ACL
$config[AclConstants::ACL_USER_RULE_WHITELIST][] = [
    'bundle' => 'wdt',
    'controller' => '*',
    'action' => '*',
    'type' => 'allow',
];

// ---------- Logging
$config[LogConstants::LOG_LEVEL] = Logger::INFO;

$baseLogFilePath = sprintf('%s/data/%s/logs', APPLICATION_ROOT_DIR, $CURRENT_STORE);

$config[LogConstants::EXCEPTION_LOG_FILE_PATH_YVES] = $baseLogFilePath . '/YVES/exception.log';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_ZED] = $baseLogFilePath . '/ZED/exception.log';

// ----------- Glue Application
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = true;

// ----------- OAUTH
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'lxZFUEsBCJ2Yb14IF2ygAHI5N4+ZAUXXaSeeJm6+twsUmIen';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = 'frontend';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = 'abc123';

// ---------- Calculation page
$config[CalculationPageConstants::ENABLE_CART_DEBUG] = true;

// ---------- Error page
$config[ErrorPageConstants::ENABLE_ERROR_404_STACK_TRACE] = true;

// ----------- Application
$config[ErrorHandlerConstants::IS_PRETTY_ERROR_HANDLER_ENABLED]
    = $config[ApplicationConstants::ENABLE_PRETTY_ERROR_HANDLER] = true;

// ---------- Console
$config[ConsoleConstants::ENABLE_DEVELOPMENT_CONSOLE_COMMANDS] = true;

// ---------- Propel
$config[PropelConstants::ZED_DB_DATABASE] = 'BERLIN_development_zed';

// ---------- MailCatcher
$config[MailConstants::MAILCATCHER_GUI] = sprintf('http://%s:1080', $config[ApplicationConstants::HOST_ZED]);

// ---------- Elasticsearch
$ELASTICA_INDEX_NAME = sprintf('%s_search', strtolower(APPLICATION_STORE));
$config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME] = $ELASTICA_INDEX_NAME;

// ---------- Queue
$config[QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS] = 1000;
$config[QueueConstants::QUEUE_WORKER_LOG_ACTIVE] = false;
$config[QueueConstants::QUEUE_WORKER_OUTPUT_FILE_NAME] = sprintf('data/%s/logs/ZED/queue.out', APPLICATION_STORE);

// ---------- Event
$config[EventConstants::MAX_RETRY_ON_FAIL] = 5;

// ---------- RabbitMQ
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS][APPLICATION_STORE][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = true;
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = sprintf('/%s_development_zed', APPLICATION_STORE);

// ---------- Auto-loader
$config[KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = false;

// ---------- Twig
$config[TwigConstants::ZED_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/%/Twig/cache/',
            APPLICATION_ROOT_DIR,
            APPLICATION
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION
    ),
];

$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/%s/Twig/cache/.pathCache',
    APPLICATION_ROOT_DIR,
    APPLICATION
);

// ---------- Payone
$payOneCredentials = [];

foreach ($payOneCredentials as $store => $credentials) {
    $config[PayoneConstants::PAYONE_ALL_STORES][$store] = [
        PayoneConstants::PAYONE_CREDENTIALS_ENCODING => 'UTF-8',
        PayoneConstants::PAYONE_CREDENTIALS_KEY => $credentials['KEY'],
        PayoneConstants::PAYONE_CREDENTIALS_MID => $credentials['MID'],
        PayoneConstants::PAYONE_CREDENTIALS_AID => $credentials['AID'],
        PayoneConstants::PAYONE_CREDENTIALS_PORTAL_ID => $credentials['PORTAL_ID'],
        PayoneConstants::PAYONE_PAYMENT_GATEWAY_URL => 'https://api.pay1.de/post-gateway/',
        PayoneConstants::PAYONE_MODE => PayoneConstants::PAYONE_MODE_TEST,
        PayoneConstants::PAYONE_EMPTY_SEQUENCE_NUMBER => 0,
        PayoneConstants::HOST_YVES => $config[ApplicationConstants::BASE_URL_YVES],
        PayoneConstants::PAYONE_REDIRECT_SUCCESS_URL => sprintf(
            '%s/checkout/success',
            $config[ApplicationConstants::BASE_URL_YVES]
        ),
        PayoneConstants::PAYONE_REDIRECT_ERROR_URL => sprintf(
            '%s/checkout/payment',
            $config[ApplicationConstants::BASE_URL_YVES]
        ),
        PayoneConstants::PAYONE_REDIRECT_BACK_URL => sprintf(
            '%s/payone/regular-redirect-payment-cancellation',
            $config[ApplicationConstants::BASE_URL_YVES]
        ),
    ];
}

$config[PayoneConstants::PAYONE] = $config[PayoneConstants::PAYONE_ALL_STORES][APPLICATION_STORE]; // Current store

$config[DataImportConstants::SAP_STORE_ID_TO_STORE_MAP] = [
    1004 => 'BERLIN',
];
