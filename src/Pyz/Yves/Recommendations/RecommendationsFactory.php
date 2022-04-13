<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations;

use Pyz\Client\Customer\CustomerClientInterface;
use Pyz\Client\Recommendations\RecommendationsClientInterface;
use Pyz\Client\RecommendationsStorage\RecommendationsStorageClientInterface;
use Spryker\Client\Session\SessionClientInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class RecommendationsFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Client\RecommendationsStorage\RecommendationsStorageClientInterface
     */
    public function getRecommendationsStorageClient(): RecommendationsStorageClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_RECOMMENDATIONS_STORAGE);
    }

    /**
     * @return \Pyz\Client\Recommendations\RecommendationsClientInterface
     */
    public function getRecommendationsClient(): RecommendationsClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_RECOMMENDATIONS);
    }

    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getCustomerClient(): CustomerClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_CUSTOMER);
    }

    /**
     * @return \Spryker\Client\Session\SessionClientInterface
     */
    public function getSessionClient(): SessionClientInterface
    {
        return $this->getProvidedDependency(RecommendationsDependencyProvider::CLIENT_SESSION);
    }
}
