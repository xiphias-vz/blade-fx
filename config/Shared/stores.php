<?php

$availableStores = [
    'BERLIN' => true,
    'HAMBURG' => true,
];

$storesFromEnvironment = explode(',', getenv('SPRYKER_ACTIVE_STORES') ?: 'BERLIN,HAMBURG');
$activeStores = array_combine($storesFromEnvironment, $storesFromEnvironment);

$template = [
    // different contexts
    'contexts' => [
        // shared settings for all contexts
        '*' => [
            'timezone' => 'Europe/Berlin',
            'dateFormat' => [
                // short date (01.02.12)
                'short' => 'd/m/Y',
                // medium Date (01. Feb 2012)
                'medium' => 'd. M Y',
                // date formatted as described in RFC 2822
                'rfc' => 'r',
                'datetime' => 'Y-m-d H:i:s',
            ],
        ],
        // settings for contexts (overwrite shared)
        'yves' => [],
        'zed' => [
            'dateFormat' => [
                // short date (2012-12-28)
                'short' => 'Y-m-d',
            ],
        ],
    ],
    'locales' => [
        // first entry is default
        'de' => 'de_DE',
        'en' => 'en_US',
    ],
    // first entry is default
    'countries' => ['DE'],
    // internal and shop
    'currencyIsoCode' => 'EUR',
    'currencyIsoCodes' => ['EUR'],
    'queuePools' => [
        'synchronizationPool' => array_map(static function ($storeName) {
            return $storeName . '-connection';
        }, $activeStores),
    ],
    'storesWithSharedPersistence' => $activeStores,
];

return array_map(static function ($storeName) use ($template, $availableStores) {

    if (!isset($availableStores[$storeName])) {
        echo 'Unknown store `' . $storeName . '` is acquired.' . PHP_EOL;
        exit(1);
    }

    return $template;
}, $activeStores);
