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

/* PriceProductSchedule */
$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '5 0,3,4,5,6,22,23 * * *',
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

/* Oms */
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
        'name' => 'order-process-new-items',
        'command' => '$PHP_BIN vendor/bin/console order:processNewItems',
        'schedule' => '* * * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'data-import-full',
        'command' => 'vendor/bin/install -r gsoa-based-ost-import',
        'schedule' => '5 0 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    /* Monitoring */
    $jobs[] = [
        'name' => 'monitor-check-jenkins',
        'command' => '$PHP_BIN vendor/bin/console monitor:check-jenkins',
        'schedule' => '*/10 * * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'monitoring-zero-prices-check',
        'command' => '$PHP_BIN vendor/bin/console report:zero_prices:mail',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'monitor-categories',
        'command' => '$PHP_BIN vendor/bin/console monitor:check-category',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'alarm-send-email',
        'command' => '$PHP_BIN vendor/bin/console monitor:alarm-email',
        'schedule' => '*/10 * * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'monitor-scheduled-checks',
        'command' => "vendor/bin/console import:execSqlQuery -s 'call pyzx_monitor_scheduled_checks()'",
        'schedule' => '*/30 * * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'partial-import-product-prices-stock',
        'command' => 'vendor/bin/install -r gsoa-sceduled-partial-import',
        'schedule' => '0,15,30,45 02-22 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'partial-import-categories',
        'command' => 'vendor/bin/install -r gsoa-category-import',
        'schedule' => '0 02-22/2 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'update-product-label-relations',
        'command' => '$PHP_BIN vendor/bin/console product-label:relations:update -vvv',
        'schedule' => '33 0,1,5,6,7,8 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    //Multiple statuses fix
    $jobs[] = [
        'name' => 'multiple-statuses-fix',
        'command' => 'vendor/bin/console multiple-statuses:fix',
        'schedule' => '*/5 * * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    // Export orders every day
    $jobs[] = [
        'name' => 'export-orders',
        'command' => '$PHP_BIN vendor/bin/console data:export --config order_export_config_CZ.yml',
        'schedule' => '0 1 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    /* Sitemap generator*/
    $jobs[] = [
        'name' => 'sitemap-generate',
        'command' => '$PHP_BIN vendor/bin/console sitemap:generate',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    /* Export sales order summary*/
    $jobs[] = [
        'name' => 'export-sales-order-summary',
        'command' => '$PHP_BIN vendor/bin/console data:exportSalesOrderSummary',
        'schedule' => '15 1 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    /* Export products deep links */
    $jobs[] = [
        'name' => 'export-product-deep-links',
        'command' => '$PHP_BIN vendor/bin/console data:exportDeeplink',
        'schedule' => '0 9 * * 3',
        'enable' => true,
        'stores' => ['OST'],
    ];

    //Maintain log table size
    $jobs[] = [
        'name' => 'transition-log-old-date-delete',
        'command' => 'vendor/bin/console transition-log-old-date:delete',
        'schedule' => '0 13 * * 0',
        'enable' => true,
        'stores' => ['OST'],
    ];

    $jobs[] = [
        'name' => 'check-actionprices-for-weight-articles',
        'command' => 'vendor/bin/install -r check-action-prices-for-weight-articles',
        'schedule' => '8 0,3,4,5,6,22,23 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];

    /* Empty customer registration queue */
    $jobs[] = [
        'name' => 'customer-registration-queue-empty',
        'command' => 'vendor/bin/console customer-registration-queue:empty',
        'schedule' => '0 17 * * *',
        'enable' => true,
        'stores' => ['OST'],
    ];
} else {
    $jobs[] = [
        'name' => 'order-process-new-items',
        'command' => '$PHP_BIN vendor/bin/console order:processNewItems',
        'schedule' => '* * * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'data-import-full',
        'command' => 'vendor/bin/install -r sftp-based-full-import',
        'schedule' => '30 20 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    /* Monitoring */
    $jobs[] = [
        'name' => 'monitor-check-jenkins',
        'command' => '$PHP_BIN vendor/bin/console monitor:check-jenkins',
        'schedule' => '*/10 * * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'monitoring-zero-prices-check',
        'command' => '$PHP_BIN vendor/bin/console report:zero_prices:mail',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'monitor-categories',
        'command' => '$PHP_BIN vendor/bin/console monitor:check-category',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'alarm-send-email',
        'command' => '$PHP_BIN vendor/bin/console monitor:alarm-email',
        'schedule' => '*/10 * * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'monitor-scheduled-checks',
        'command' => "vendor/bin/console import:execSqlQuery -s 'call pyzx_monitor_scheduled_checks()'",
        'schedule' => '*/30 * * * *',
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

    // Multiple statuses fix
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
    $jobs[] = [
        'name' => 'sitemap-generate',
        'command' => '$PHP_BIN vendor/bin/console sitemap:generate',
        'schedule' => '0 4 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    /* Export sales order summary*/
    $jobs[] = [
        'name' => 'export-sales-order-summary',
        'command' => '$PHP_BIN vendor/bin/console data:exportSalesOrderSummary',
        'schedule' => '15 23 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'update-product-label-relations',
        'command' => '$PHP_BIN vendor/bin/console product-label:relations:update -vvv',
        'schedule' => '10 0,3,4,5,6,22,23 * * *',
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

    // Maintain log table size
    $jobs[] = [
        'name' => 'transition-log-old-date-delete',
        'command' => 'vendor/bin/console transition-log-old-date:delete',
        'schedule' => '0 13 * * 0',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    // Generate FF csv files and push them to the Globus FTP
    $jobs[] = [
        'name' => 'fact-finder-export',
        'command' => 'vendor/bin/install -r fact-finder-export',
        'schedule' => '20 0 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'check-actionprices-for-weight-articles',
        'command' => 'vendor/bin/install -r check-action-prices-for-weight-articles',
        'schedule' => '8 0,3,4,5,6,22,23 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    /* Empty customer registration queue */
    $jobs[] = [
        'name' => 'customer-registration-queue-empty',
        'command' => 'vendor/bin/console customer-registration-queue:empty',
        'schedule' => '0 17 * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];

    $jobs[] = [
        'name' => 'factfinder-publish-events',
        'command' => '$PHP_BIN vendor/bin/console factfinder:publish',
        'schedule' => '*/10 * * * *',
        'enable' => true,
        'stores' => ['EIN'],
    ];
}
