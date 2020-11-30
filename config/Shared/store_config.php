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
    'stage' => 'https://www.welcome.gl-stg.cloud.spryker.toys/',
    'prod'  => 'https://welcome.shop.globus.de/',
];

$zedMap = [
    'EIN' => [
        'local' => 'zed.ein.shop.globus.local',
        'stage' => 'zed.ein.gl-stg.cloud.spryker.toys',
        'prod' => 'zed.ein.shop.globus.de',
    ],
    'KMD' => [
        'local' => 'zed.kmd.shop.globus.local',
        'stage' => 'zed.kmd.gl-stg.cloud.spryker.toys',
        'prod' => 'zed.kmd.shop.globus.de',
    ],
    'LPZ' => [
        'local' => 'zed.lpz.shop.globus.local',
        'stage' => 'zed.lpz.gl-stg.cloud.spryker.toys',
        'prod' => 'zed.lpz.shop.globus.de',
    ],
    'HAD' => [
        'local' => 'zed.had.shop.globus.local',
        'stage' => 'zed.had.gl-stg.cloud.spryker.toys',
        'prod' => 'zed.had.shop.globus.de',
    ],
];

return [

    'WELCOME'=> $welcomeMap[$environment],
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
];
