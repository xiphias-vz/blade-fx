<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog;

use DataDog\DogStatsd;
use Pyz\Service\DataDog\DogStats\DataDogMetric;
use Pyz\Service\DataDog\DogStats\DataDogMetricInterface;
use Spryker\Service\Kernel\AbstractServiceFactory;

/**
 * @method \Pyz\Service\DataDog\DataDogConfig getConfig()
 */
class DataDogServiceFactory extends AbstractServiceFactory
{
    /**
     * @return \Pyz\Service\DataDog\DogStats\DataDogMetricInterface
     */
    public function createDataDogMetric(): DataDogMetricInterface
    {
        return new DataDogMetric(
            $this->getDataDogStatsdService()
        );
    }

    /**
     * @return \DataDog\DogStatsd
     */
    public function getDataDogStatsdService(): DogStatsd
    {
        return $this->getProvidedDependency(DataDogDependencyProvider::SERVICE_DATA_DOG_STATS);
    }
}
