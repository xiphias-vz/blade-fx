<?php

use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
use StoreApp\Zed\Application\Communication\StoreAppDriverBootstrap;

require __DIR__ . '/maintenance/maintenance.php';

define('APPLICATION', 'STOREAPP');
define('PROJECT_NAMESPACE', 'StoreApp');
define('PROJECT_NAMESPACES', [
    'StoreApp',
    'Pyz',
]);
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

if (extension_loaded('newrelic')) {
    newrelic_name_transaction('storeapp:' . $_SERVER['REQUEST_METHOD'] . (strtok($_SERVER['REQUEST_URI'], '?') ?: '/'));
}

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new StoreAppDriverBootstrap();
$bootstrap
    ->boot()
    ->run();
