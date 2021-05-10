<?php

/**
 * This file is a workaround to have YVES on one domain and ZED on 4 domains. It has to be done with docker improvements later
 */

$applicationEnv = getenv('APPLICATION_ENV');

if ($applicationEnv === 'docker_prod') {
    $environment = 'prod';
} elseif ($applicationEnv === 'docker_dev' && strpos($_SERVER['SERVER_NAME'], 'local') === false) {
    $environment = 'stage';
} else {
    $environment = 'local';
}
$welcomeMap =
[
    'local' => 'https://www.welcome.shop.globus.local/',
    'stage' => 'https://welcome.shop-t.globus.de/',
    'prod' => 'https://welcome.shop.globus.de/',
];

$zedMap = [
    'EIN' => [
        'local' => 'zed.ein.shop.globus.local',
        'stage' => 'zed.ein.shop-t.globus.de',
        'prod' => 'zed.ein.shop.globus.de',
    ],
    'KMD' => [
        'local' => 'zed.kmd.shop.globus.local',
        'stage' => 'zed.kmd.shop-t.globus.de',
        'prod' => 'zed.kmd.shop.globus.de',
    ],
    'LPZ' => [
        'local' => 'zed.lpz.shop.globus.local',
        'stage' => 'zed.lpz.shop-t.globus.de',
        'prod' => 'zed.lpz.shop.globus.de',
    ],
    'HAD' => [
        'local' => 'zed.had.shop.globus.local',
        'stage' => 'zed.had.shop-t.globus.de',
        'prod' => 'zed.had.shop.globus.de',
    ],
    'ISS' => [
        'local' => 'zed.iss.shop.globus.local',
        'stage' => 'zed.iss.shop-t.globus.de',
        'prod' => 'zed.iss.shop.globus.de',
    ],
];

return [

    'WELCOME' => $welcomeMap[$environment],
    'EIN' => [
        'key_value_store_namespace' => 1,
        'zed' => $zedMap['EIN'][$environment],
    ],
    'KMD' => [
        'key_value_store_namespace' => 3,
        'zed' => $zedMap['KMD'][$environment],
    ],
    'LPZ' => [
        'key_value_store_namespace' => 5,
        'zed' => $zedMap['LPZ'][$environment],
    ],
    'HAD' => [
        'key_value_store_namespace' => 7,
        'zed' => $zedMap['HAD'][$environment],
    ],
    'ISS' => [
        'key_value_store_namespace' => 9,
        'zed' => $zedMap['ISS'][$environment],
    ],
];
