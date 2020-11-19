<?php

use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\StorageRedis\StorageRedisConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;

// TODO: this is not quite right approach, but we need multi-store to work on one domain.
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 3;

$config[ApplicationConstants::HOST_ZED] = strpos($_SERVER['SERVER_NAME'], 'local') !== false ? 'zed.kmd.shop.globus.local' : 'zed.kmd.gl-stg.cloud.spryker.toys';
$config[ZedRequestConstants::HOST_ZED_API] = sprintf(
    '%s:%d',
    $config[ApplicationConstants::HOST_ZED],
    getenv('SPRYKER_ZED_PORT')
);
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = sprintf(
    'https://%s',
    $config[ZedRequestConstants::HOST_ZED_API]
);
