<?php

/**
 * This file is a workaround to have YVES on one domain and ZED on 4 domains. It has to be done with docker improvements later
 */

$applicationEnv = getenv('APPLICATION_ENV');

$codeBucket = getenv('SPRYKER_CODE_BUCKET');

if ($applicationEnv === 'docker_prod') {
    $environment = 'prod';
} elseif ($applicationEnv === 'docker_dev' && strpos($_SERVER['SERVER_NAME'], 'local') === false) {
    $environment = 'stage';
} elseif ($applicationEnv === 'docker_prod_CZ') { //TODO: CHECK LATER -> QUICK FIX
    $environment = 'stage';
} else {
    $environment = 'local';
}
if ($codeBucket == 'CZ') {
    $welcomeMap =
        [
            'local' => 'https://www.welcome.shop.globus.local/',
            'stage' => 'https://welcome.shop-t.iglobus.cz/',
            'prod' => 'https://welcome.shop.iglobus.cz/',
        ];

    $zedMap = [
        'OST' => [
            'local' => 'zed.ost.shop.globus.local',
            'stage' => 'zed.ost.shop-t.iglobus.cz',
            'prod' => 'zed.ost.shop.iglobus.cz',
        ],
        'OLO' => [
            'local' => 'zed.olo.shop.globus.local',
            'stage' => 'zed.olo.shop-t.iglobus.cz',
            'prod' => 'zed.olo.shop.iglobus.cz',
        ],
        'ZLI' => [
            'local' => 'zed.zli.shop.globus.local',
            'stage' => 'zed.zli.shop-t.iglobus.cz',
            'prod' => 'zed.zli.shop.iglobus.cz',
        ],
        'LIB' => [
            'local' => 'zed.lib.shop.globus.local',
            'stage' => 'zed.lib.shop-t.iglobus.cz',
            'prod' => 'zed.lib.shop.iglobus.cz',
        ],
        'CAK' => [
            'local' => 'zed.cak.shop.globus.local',
            'stage' => 'zed.cak.shop-t.iglobus.cz',
            'prod' => 'zed.cak.shop.iglobus.cz',
        ],
        'CCM' => [
            'local' => 'zed.ccm.shop.globus.local',
            'stage' => 'zed.ccm.shop-t.iglobus.cz',
            'prod' => 'zed.ccm.shop.iglobus.cz',
        ],
    ];

    return [

        'WELCOME' => $welcomeMap[$environment],
        'OST' => [
            'key_value_store_namespace' => 1,
            'zed' => $zedMap['OST'][$environment],
        ],
        'OLO' => [
            'key_value_store_namespace' => 3,
            'zed' => $zedMap['OLO'][$environment],
        ],
        'ZLI' => [
            'key_value_store_namespace' => 5,
            'zed' => $zedMap['ZLI'][$environment],
        ],
        'LIB' => [
            'key_value_store_namespace' => 7,
            'zed' => $zedMap['LIB'][$environment],
        ],
        'CAK' => [
            'key_value_store_namespace' => 9,
            'zed' => $zedMap['CAK'][$environment],
        ],
        'CCM' => [
            'key_value_store_namespace' => 11,
            'zed' => $zedMap['CCM'][$environment],
        ],
    ];
} else {
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
    'RUE' => [
        'local' => 'zed.rue.shop.globus.local',
        'stage' => 'zed.rue.shop-t.globus.de',
        'prod' => 'zed.rue.shop.globus.de',
    ],
    'WIE' => [
        'local' => 'zed.wie.shop.globus.local',
        'stage' => 'zed.wie.shop-t.globus.de',
        'prod' => 'zed.wie.shop.globus.de',
    ],
    'WND' => [
        'local' => 'zed.wnd.shop.globus.local',
        'stage' => 'zed.wnd.shop-t.globus.de',
        'prod' => 'zed.wnd.shop.globus.de',
    ],
    'KRE' => [
        'local' => 'zed.kre.shop.globus.local',
        'stage' => 'zed.kre.shop-t.globus.de',
        'prod' => 'zed.kre.shop.globus.de',
    ],
    'GEN' => [
        'local' => 'zed.gen.shop.globus.local',
        'stage' => 'zed.gen.shop-t.globus.de',
        'prod' => 'zed.gen.shop.globus.de',
    ],
    'ESS' => [
        'local' => 'zed.ess.shop.globus.local',
        'stage' => 'zed.ess.shop-t.globus.de',
        'prod' => 'zed.ess.shop.globus.de',
    ],
    'GUE' => [
        'local' => 'zed.gue.shop.globus.local',
        'stage' => 'zed.gue.shop-t.globus.de',
        'prod' => 'zed.gue.shop.globus.de',
    ],
    'BSG' => [
        'local' => 'zed.bsg.shop.globus.local',
        'stage' => 'zed.bsg.shop-t.globus.de',
        'prod' => 'zed.bsg.shop.globus.de',
    ],
    'ESB' => [
        'local' => 'zed.esb.shop.globus.local',
        'stage' => 'zed.esb.shop-t.globus.de',
        'prod' => 'zed.esb.shop.globus.de',
    ],
    'WLZ' => [
        'local' => 'zed.wlz.shop.globus.local',
        'stage' => 'zed.wlz.shop-t.globus.de',
        'prod' => 'zed.wlz.shop.globus.de',
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
    'RUE' => [
        'key_value_store_namespace' => 11,
        'zed' => $zedMap['RUE'][$environment],
    ],
    'WIE' => [
        'key_value_store_namespace' => 13,
        'zed' => $zedMap['WIE'][$environment],
    ],
    'WND' => [
        'key_value_store_namespace' => 15,
        'zed' => $zedMap['WND'][$environment],
    ],
    'KRE' => [
        'key_value_store_namespace' => 17,
        'zed' => $zedMap['KRE'][$environment],
    ],
    'GEN' => [
        'key_value_store_namespace' => 19,
        'zed' => $zedMap['GEN'][$environment],
    ],
    'ESS' => [
        'key_value_store_namespace' => 21,
        'zed' => $zedMap['ESS'][$environment],
    ],
    'GUE' => [
        'key_value_store_namespace' => 23,
        'zed' => $zedMap['GUE'][$environment],
    ],
    'BSG' => [
        'key_value_store_namespace' => 25,
        'zed' => $zedMap['BSG'][$environment],
    ],
    'ESB' => [
        'key_value_store_namespace' => 27,
        'zed' => $zedMap['ESB'][$environment],
    ],
    'WLZ' => [
        'key_value_store_namespace' => 29,
        'zed' => $zedMap['WLZ'][$environment],
    ],
    ];
}
