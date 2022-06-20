<?php

use Pyz\Yves\ShopApplication\YvesBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
use voku\helper\AntiXSS;

require __DIR__ . '/maintenance/maintenance.php';

define('APPLICATION', 'YVES');
define('PROJECT_NAMESPACE', 'Pyz');
define('PROJECT_NAMESPACES', [
    'Pyz',
]);
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

/**
 * Store dynamic load
 */
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');
require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

$allStores = array_keys($stores);

/**
 * Configs and domains load
 */
$storeConfig = require(APPLICATION_ROOT_DIR . '/config/Shared/store_config.php');

$storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

$antiXss = new AntiXSS();

if ($storeCodeBucket == 'CZ') {
    $currentStore = $_COOKIE['current_store'] ?? 'OST';
    $currentStore = $antiXss->xss_clean($currentStore);
    if ($currentStore == '') {
        $currentStore = 'OST';
    }
} else {
    $currentStore = $_COOKIE['current_store'] ?? 'EIN';
    $currentStore = $antiXss->xss_clean($currentStore);
    if ($currentStore == '') {
        $currentStore = 'EIN';
    }
}

define('APPLICATION_STORE', $currentStore);
define('SPRYKER_KEY_VALUE_STORE_NAMESPACE', $storeConfig[$currentStore]['key_value_store_namespace']);
define('HOST_ZED', $storeConfig[$currentStore]['zed']);


if (extension_loaded('newrelic')) {
    newrelic_name_transaction('yves:' . $_SERVER['REQUEST_METHOD'] . (strtok($_SERVER['REQUEST_URI'], '?') ?: '/'));
}

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new YvesBootstrap();
$bootstrap
    ->boot()
    ->run();