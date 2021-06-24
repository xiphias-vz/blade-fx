<?php

/**
 * This is the global runtime configuration for Yves and Generated_Yves_Zed in a staging environment.
 */

use Pyz\Shared\TwigCache\TwigCacheConstants;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\PropelOrm\PropelOrmConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Zed\Propel\PropelConfig;
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

/* Database */
$config[PropelConstants::USE_SUDO_TO_MANAGE_DATABASE] = false;
$config[PropelConstants::PROPEL_DEBUG] = false;
$config[PropelOrmConstants::PROPEL_SHOW_EXTENDED_EXCEPTION] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
$config[PropelConstants::ZED_DB_USERNAME] = getenv('SPRYKER_DB_USERNAME');
$config[PropelConstants::ZED_DB_PASSWORD] = getenv('SPRYKER_DB_PASSWORD');
$config[PropelConstants::ZED_DB_HOST] = getenv('SPRYKER_DB_HOST');
$config[PropelConstants::ZED_DB_PORT] = getenv('SPRYKER_DB_PORT');
$config[PropelConstants::ZED_DB_ENGINE] = strtolower(getenv('SPRYKER_DB_ENGINE') ?: '') ?: PropelConfig::DB_ENGINE_PGSQL;
$config[PropelQueryBuilderConstants::ZED_DB_ENGINE] = $config[PropelConstants::ZED_DB_ENGINE];
$config[PropelConstants::ZED_DB_DATABASE] = getenv('SPRYKER_DB_DATABASE');
/* End Database */
