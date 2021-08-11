<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

$storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

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
    'schedule' => 'H 18 * * *',
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

/* Timeslot check */
$jobs[] = [
    'name' => 'timeslot-check',
    'command' => '$PHP_BIN vendor/bin/console timeslot:check',
    'schedule' => '0 * * * *',
    'enable' => true,
    'stores' => $allStores,
];

if ($storeCodeBucket == 'CZ') {
    $jobs[] = [
        'name' => 'data-import-full',
        'command' => 'vendor/bin/install -r gsoa-based-full-import',
        'schedule' => '5 0 * * *',
        'enable' => true,
        'stores' => ['OPA'],
    ];

    //Multiple statuses fix
    $jobs[] = [
        'name' => 'multiple-statuses-fix',
        'command' => 'vendor/bin/console multiple-statuses:fix',
        'schedule' => '*/5 * * * *',
        'enable' => true,
        'stores' => ['OPA'],
    ];

    // Export orders every day
    $jobs[] = [
        'name' => 'export-orders',
        'command' => '$PHP_BIN vendor/bin/console data:export --config order_export_config.yml',
        'schedule' => '0 1 * * *',
        'enable' => true,
        'stores' => ['OPA'],
    ];

    /* Sitemap generator*/
    $jobs[] =
    [
        'name' => 'sitemap-generate',
        'command' => '$PHP_BIN vendor/bin/console sitemap:generate',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['OPA'],
    ];

    /* Export sales order summary*/
    $jobs[] =
    [
        'name' => 'export-sales-order-summary',
        'command' => '$PHP_BIN vendor/bin/console data:exportSalesOrderSummary',
        'schedule' => '0 1 * * *',
        'enable' => true,
        'stores' => ['OPA'],
    ];

    /* Export products deep links */
    $jobs[] = [
        'name' => 'export-product-deep-links',
        'command' => '$PHP_BIN vendor/bin/console data:exportDeeplink',
        'schedule' => '0 9 * * 3',
        'enable' => true,
        'stores' => ['OPA'],
    ];
} else {
    $jobs[] = [
        'name' => 'data-import-full',
        'command' => 'vendor/bin/install -r sftp-based-full-import',
        'schedule' => 'H 21 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'data-import-images',
        'command' => 'vendor/bin/install -r product-images-import',
        'schedule' => '0 20 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    //Multiple statuses fix
    $jobs[] = [
        'name' => 'multiple-statuses-fix',
        'command' => 'vendor/bin/console multiple-statuses:fix',
        'schedule' => '*/5 * * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    // Export orders every day
    $jobs[] = [
        'name' => 'export-orders',
        'command' => '$PHP_BIN vendor/bin/console data:export --config order_export_config.yml',
        'schedule' => '0 1 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    /* Sitemap generator*/
    $jobs[] =
        [
            'name' => 'sitemap-generate',
            'command' => '$PHP_BIN vendor/bin/console sitemap:generate',
            'schedule' => '0 4 * * *',
            'enable' => true,
            'stores' => ['EIN'],
        ];

    /* Export sales order summary*/
    $jobs[] =
        [
            'name' => 'export-sales-order-summary',
            'command' => '$PHP_BIN vendor/bin/console data:exportSalesOrderSummary',
            'schedule' => '0 1 * * *',
            'enable' => true,
            'stores' => ['EIN'],
        ];

    /* Export products deep links */
    $jobs[] = [
    'name' => 'export-product-deep-links',
    'command' => '$PHP_BIN vendor/bin/console data:exportDeeplink',
    'schedule' => '0 9 * * 3',
    'enable' => true,
    'stores' => ['EIN'],
    ];
}
