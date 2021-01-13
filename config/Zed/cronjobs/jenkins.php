<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

$jobs[] = [
    'name' => 'BUILD HASH',
    'command' => 'php public/Zed/version.php',
    'schedule' => '5 * * * *',
    'enable' => true,
    'stores' => $allStores,
];

/* ProductValidity */
$jobs[] = [
    'name' => 'check-product-validity',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 3 * * *',
    'enable' => true,
    'stores' => $allStores,
];

/* ProductLabel */
$jobs[] = [
    'name' => 'check-product-label-validity',
    'command' => '$PHP_BIN vendor/bin/console product-label:validity',
    'schedule' => '0 3 * * *',
    'enable' => true,
    'stores' => $allStores,
];
$jobs[] = [
    'name' => 'update-product-label-relations',
    'command' => '$PHP_BIN vendor/bin/console product-label:relations:update -vvv',
    'schedule' => '* * * * *',
    'enable' => false,
    'stores' => $allStores,
];

/* PriceProductSchedule */
$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '1 4,5,6,7,8 * * *',
    'enable' => true,
    'stores' => $allStores,
];

/* Oms */
$jobs[] = [
    'name' => 'check-oms-conditions',
    'command' => '$PHP_BIN vendor/bin/console oms:check-condition',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'check-oms-timeouts',
    'command' => '$PHP_BIN vendor/bin/console oms:check-timeout',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'clear-oms-locks',
    'command' => '$PHP_BIN vendor/bin/console oms:clear-locks',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'queue-worker-start',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'product-relation-updater',
    'command' => '$PHP_BIN vendor/bin/console product-relation:update -vvv',
    'schedule' => '30 2 * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
  'name' => 'event-trigger-timeout',
  'command' => '$PHP_BIN vendor/bin/console event:trigger:timeout -vvv',
  'schedule' => '*/5 * * * *',
  'enable' => true,
'stores' => $allStores,
];

$jobs[] = [
    'name' => 'deactivate-discontinued-products',
    'command' => '$PHP_BIN vendor/bin/console deactivate-discontinued-products',
    'schedule' => '0 0 * * *',
    'enable' => true,
    'stores' => $allStores,
];

/* StateMachine */
/*
$jobs[] = [
    'name' => 'check-state-machine-conditions',
    'command' => '$PHP_BIN vendor/bin/console state-machine:check-condition',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'check-state-machine-timeouts',
    'command' => '$PHP_BIN vendor/bin/console state-machine:check-timeout',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'clear-state-machine-locks',
    'command' => '$PHP_BIN vendor/bin/console state-machine:clear-locks',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'stores' => $allStores,
];
*/

/* Quote */
$jobs[] = [
    'name' => 'clean-expired-guest-cart',
    'command' => '$PHP_BIN vendor/bin/console quote:delete-expired-guest-quotes',
    'schedule' => '30 1 * * *',
    'enable' => true,
    'stores' => $allStores,
];

/* Merchants Imports */
$jobs[] = [
    'name' => 'data-import-merchant',
    'command' => '$PHP_BIN vendor/bin/console data:import merchant',
    'schedule' => '0 0 * * *',
    'enable' => false,
    'stores' => $allStores,
];

$jobs[] = [
    'name' => 'data-import-full',
    'command' => 'vendor/bin/install -r sftp-based-full-import',
    'schedule' => '5 0 * * *',
    'enable' => true,
    'stores' => ['EIN'],
];

/* Timeslot check */
$jobs[] = [
    'name' => 'timeslot-check',
    'command' => '$PHP_BIN vendor/bin/console timeslot:check',
    'schedule' => '0 * * * *',
    'enable' => true,
    'stores' => $allStores,
];
