<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\RecommendationsStorage;

use Spryker\Zed\Kernel\AbstractBundleConfig;

class RecommendationsStorageConfig extends AbstractBundleConfig
{
    public const RECOMMENDATIONS_RESOURCE_NAME = 'recommendations';
    public const RECOMMENDATIONS_SYNC_STORAGE_QUEUE = 'sync.storage.recommendations';
    public const RECOMMENDATIONS_SYNC_STORAGE_ERROR_QUEUE = 'sync.storage.recommendations.error';
    public const RECOMMENDATIONS_PUBLISH = 'Recommendations.definition.publish';
    public const ENTITY_PYZ_RECOMMENDATION_DEFINITION_UPDATE = 'Entity.pyz_recommendation_definition.update';
}
