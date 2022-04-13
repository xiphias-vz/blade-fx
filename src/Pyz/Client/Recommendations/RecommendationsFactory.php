<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Recommendations;

use Pyz\Client\Recommendations\Zed\RecommendationsStub;
use Pyz\Client\Recommendations\Zed\RecommendationsStubInterface;
use Spryker\Client\Kernel\AbstractFactory;

class RecommendationsFactory extends AbstractFactory
{
    /**
     * @return mixed
     */
    public function getZedRequestClient()
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_ZED_REQUEST);
    }

    /**
     * @return \Pyz\Client\Recommendations\Zed\RecommendationsStubInterface
     */
    public function createZedStub(): RecommendationsStubInterface
    {
        return new RecommendationsStub(
            $this->getZedRequestClient()
        );
    }
}
