<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Communication;

use Pyz\Zed\Payone\PayoneDependencyProvider;
use SprykerEco\Zed\Payone\Communication\PayoneCommunicationFactory as SprykerEcoPayoneCommunicationFactory;
use SprykerEco\Zed\Payone\Dependency\Facade\PayoneToCalculationInterface;
use SprykerEco\Zed\Payone\Dependency\Facade\PayoneToSalesInterface;

/**
 * @method \SprykerEco\Zed\Payone\PayoneConfig getConfig()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneQueryContainerInterface getQueryContainer()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneRepositoryInterface getRepository()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\Payone\Business\PayoneFacadeInterface getFacade()()
 */
class PayoneCommunicationFactory extends SprykerEcoPayoneCommunicationFactory
{
    /**
     * @return \SprykerEco\Zed\Payone\Dependency\Facade\PayoneToSalesInterface
     */
    public function getSalesFacade(): PayoneToSalesInterface
    {
        return $this->getProvidedDependency(PayoneDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \SprykerEco\Zed\Payone\Dependency\Facade\PayoneToCalculationInterface
     */
    public function getCalculationFacade(): PayoneToCalculationInterface
    {
        return $this->getProvidedDependency(PayoneDependencyProvider::FACADE_CALCULATION);
    }
}
