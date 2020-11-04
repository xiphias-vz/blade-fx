<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataDog\Communication;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Zed\DataDog\DataDogDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

class DataDogCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Service\DataDog\DataDogServiceInterface
     */
    public function getDataDogService(): DataDogServiceInterface
    {
        return $this->getProvidedDependency(DataDogDependencyProvider::SERVICE_DATA_DOG);
    }
}
