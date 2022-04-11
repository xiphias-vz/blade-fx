<?php

namespace Pyz\Zed\RecommendationsStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class RecommendationsStorageConfig extends AbstractBundleConfig
{
    /**
     * @api
     *
     * @return string|null
     */
    public function getRecommendationsSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @api
     *
     * @return bool
     */
    public function isSendingToQueue(): bool
    {
        return true;
    }
}
