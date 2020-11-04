<?php

/**
 * This is the global runtime configuration for Yves and Generated_Yves_Zed in a staging environment.
 */

use Pyz\Shared\TwigCache\TwigCacheConstants;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Search\SearchConstants;
use SprykerShop\Shared\ShopApplication\ShopApplicationConstants;

// ---------- TwigCache
$config[TwigCacheConstants::TWIG_CACHE_ENABLED] = false;

// ---------- General
$config[ApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = $config[ShopApplicationConstants::ENABLE_APPLICATION_DEBUG]
    = true;

// ---------- Auto-loader
$config[KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = true;

// ---------- Elasticsearch
$ELASTICA_INDEX_NAME = sprintf('%s_search', strtolower(APPLICATION_STORE));
$config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME] = $ELASTICA_INDEX_NAME;
$config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME] = $ELASTICA_INDEX_NAME;
$config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME] = $ELASTICA_INDEX_NAME;

// ---------- Logging
$config[LogConstants::LOG_FILE_PATH_YVES] = 'php://stdout';
$config[LogConstants::LOG_FILE_PATH_ZED] = 'php://stdout';
$config[LogConstants::LOG_FILE_PATH_GLUE] = 'php://stdout';

$config[LogConstants::EXCEPTION_LOG_FILE_PATH_YVES] = 'php://stderr';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_ZED] = 'php://stderr';
$config[LogConstants::EXCEPTION_LOG_FILE_PATH_GLUE] = 'php://stderr';
