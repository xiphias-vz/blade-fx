<?php

use Spryker\Shared\StorageRedis\StorageRedisConstants;

// TODO: this is not quite right approach, but we need multi-store to work on one domain.
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 3;
