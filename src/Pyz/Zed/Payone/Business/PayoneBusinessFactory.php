<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business;

use Pyz\Zed\Payone\Business\Api\Adapter\Http\Guzzle;
use Pyz\Zed\Payone\Business\StandardParameter\StandardParameterProvider;
use Pyz\Zed\Payone\Business\StandardParameter\StandardParameterProviderInterface;
use Pyz\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManager;
use Pyz\Zed\Payone\PayoneDependencyProvider;
use Spryker\Zed\Store\Business\StoreFacadeInterface;
use SprykerEco\Zed\Payone\Business\Api\Adapter\AdapterInterface;
use SprykerEco\Zed\Payone\Business\PayoneBusinessFactory as SprykerEcoPayoneBusinessFactory;
use SprykerEco\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManagerInterface;

/**
 * @method \Pyz\Zed\Payone\PayoneConfig getConfig()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneQueryContainerInterface getQueryContainer()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneRepositoryInterface getRepository()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneEntityManagerInterface getEntityManager()
 */
class PayoneBusinessFactory extends SprykerEcoPayoneBusinessFactory
{
    /**
     * @return \SprykerEco\Zed\Payone\Business\Api\Adapter\AdapterInterface
     */
    public function createExecutionAdapter(): AdapterInterface
    {
        return new Guzzle(
            $this->getStandardParameter()->getPaymentGatewayUrl(),
            $this->createApiCallLogWriter()
        );
    }

    /**
     * @return \SprykerEco\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManagerInterface
     */
    public function createTransactionStatusManager(): TransactionStatusUpdateManagerInterface
    {
        return new TransactionStatusUpdateManager(
            $this->getQueryContainer(),
            $this->getStandardParameter(),
            $this->createHashGenerator()
        );
    }

    /**
     * @return \Pyz\Zed\Payone\Business\StandardParameter\StandardParameterProviderInterface
     */
    public function createStandardParameterProvider(): StandardParameterProviderInterface
    {
        return new StandardParameterProvider(
            $this->getStoreFacade(),
            $this->getConfig()
        );
    }

    /**
     * @return \Spryker\Zed\Store\Business\StoreFacadeInterface
     */
    public function getStoreFacade(): StoreFacadeInterface
    {
        return $this->getProvidedDependency(PayoneDependencyProvider::FACADE_STORE);
    }
}
