<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations;

use Pyz\Shared\Recommendations\RecommendationsConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class RecommendationsConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getRecommendationsId(): string
    {
        return $this->get(RecommendationsConstants::CONTAINER_ID);
    }
}
