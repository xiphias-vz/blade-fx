<?php

use Pyz\Yves\ShopApplication\YvesBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

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
$allStores = array_keys($stores);
$currentStore = $_COOKIE['current_store'] ?? null;

if ($currentStore && in_array($currentStore, $allStores)) {
    define('APPLICATION_STORE', $currentStore);
}

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

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
