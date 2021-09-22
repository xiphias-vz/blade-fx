<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Communication;

use Pyz\Zed\Payone\PayoneDependencyProvider;
use SprykerEco\Zed\Payone\Communication\PayoneCommunicationFactory as SprykerEcoPayoneCommunicationFactory;

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
     * @return \Spryker\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade()
    {
        return $this->getProvidedDependency(PayoneDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Spryker\Zed\Calculation\Business\CalculationFacadeInterface
     */
    public function getCalculationFacade()
    {
        return $this->getProvidedDependency(PayoneDependencyProvider::FACADE_CALCULATION);
    }
}
