<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business;

use Pyz\Zed\Payone\Buisness\StandardParameter\StandardParameterProvider;
use Pyz\Zed\Payone\Buisness\StandardParameter\StandardParameterProviderInterface;
use Pyz\Zed\Payone\Business\Api\Adapter\Http\Guzzle;
use Pyz\Zed\Payone\Business\Payment\PaymentManager;
use Pyz\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManager;
use Pyz\Zed\Payone\PayoneDependencyProvider;
use Spryker\Zed\Store\Business\StoreFacadeInterface;
use SprykerEco\Zed\Payone\Business\Payment\PaymentManagerInterface;
use SprykerEco\Zed\Payone\Business\PayoneBusinessFactory as SprykerEcoPayoneBusinessFactory;

/**
 * @method \SprykerEco\Zed\Payone\PayoneConfig getConfig()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneQueryContainerInterface getQueryContainer()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneRepositoryInterface getRepository()
 * @method \SprykerEco\Zed\Payone\Persistence\PayoneEntityManagerInterface getEntityManager()
 */
class PayoneBusinessFactory extends SprykerEcoPayoneBusinessFactory
{
    /**
     * @param string|null $storeName
     *
     * @return \Pyz\Zed\Payone\Business\Payment\PaymentManagerInterface
     */
    public function createPaymentManager(?string $storeName = null): PaymentManagerInterface
    {
        $paymentManager = new PaymentManager(
            $this->createExecutionAdapter(),
            $this->getQueryContainer(),
            $this->createStandardParameterProvider()->provideStandardParameter($storeName),
            $this->createKeyHashGenerator(),
            $this->createSequenceNumberProvider(),
            $this->createModeDetector(),
            $this->createUrlHmacGenerator(),
            $this->getRepository(),
            $this->getEntityManager()
        );

        foreach ($this->getAvailablePaymentMethods() as $paymentMethod) {
            $paymentManager->registerPaymentMethodMapper($paymentMethod);
        }

        return $paymentManager;
    }

    /**
     * @return \SprykerEco\Zed\Payone\Business\Api\Adapter\AdapterInterface
     */
    protected function createExecutionAdapter()
    {
        return new Guzzle(
            $this->getStandardParameter()->getPaymentGatewayUrl(),
            $this->createApiCallLogWriter()
        );
    }

    /**
     * @return \SprykerEco\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManagerInterface
     */
    public function createTransactionStatusManager()
    {
        return new TransactionStatusUpdateManager(
            $this->getQueryContainer(),
            $this->getStandardParameter(),
            $this->createKeyHashGenerator()
        );
    }

    /**
     * @return \Pyz\Zed\Payone\Buisness\StandardParameter\StandardParameterProviderInterface
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
