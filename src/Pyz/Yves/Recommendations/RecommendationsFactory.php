<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations;

use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\Recommendations\RecommendationsClientInterface;
use Pyz\Client\RecommendationsStorage\RecommendationsStorageClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class RecommendationsFactory extends AbstractFactory
{
    /**
     * @return RecommendationsStorageClientInterface
     */
    public function getRecommendationsStorageClient(): RecommendationsStorageClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_RECOMMENDATIONS_STORAGE);
    }

    /**
     * @return RecommendationsClientInterface
     */
    public function getRecommendationsClient(): RecommendationsClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_RECOMMENDATIONS);
    }

    /**
     * @return CustomerClientInterface
     */
    public function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_CUSTOMER);
    }
}
