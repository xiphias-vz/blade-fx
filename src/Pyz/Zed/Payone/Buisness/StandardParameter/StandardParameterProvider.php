<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Buisness\StandardParameter;

use Generated\Shared\Transfer\PayoneStandardParameterTransfer;
use Pyz\Zed\Payone\PayoneConfig;
use Spryker\Zed\Store\Business\StoreFacadeInterface;
use SprykerEco\Shared\Payone\PayoneConstants;

class StandardParameterProvider implements StandardParameterProviderInterface
{
    /**
     * @var \Spryker\Zed\Store\Business\StoreFacadeInterface
     */
    protected $storeFacade;

    /**
     * @var \Pyz\Zed\Payone\PayoneConfig
     */
    protected $payoneConfig;

    /**
     * @param \Spryker\Zed\Store\Business\StoreFacadeInterface $storeFacade
     * @param \Pyz\Zed\Payone\PayoneConfig $payoneConfig
     */
    public function __construct(StoreFacadeInterface $storeFacade, PayoneConfig $payoneConfig)
    {
        $this->storeFacade = $storeFacade;
        $this->payoneConfig = $payoneConfig;
    }

    /**
     * @param string|null $storeName
     *
     * @return \Generated\Shared\Transfer\PayoneStandardParameterTransfer
     */
    public function provideStandardParameter(?string $storeName = null): PayoneStandardParameterTransfer
    {
        if (!$storeName) {
            return $this->payoneConfig->getRequestStandardParameter();
        }

        return $this->buildStandardParameterForStore($storeName);
    }

    /**
     * @param string $storeName
     *
     * @return \Generated\Shared\Transfer\PayoneStandardParameterTransfer
     */
    protected function buildStandardParameterForStore(string $storeName): PayoneStandardParameterTransfer
    {
        $allStoresPayoneConfig = $this->payoneConfig->getAllStoresPayoneConfig()[$storeName] ?? [];

        if (!$allStoresPayoneConfig) {
            return $this->payoneConfig->getRequestStandardParameter();
        }

        $standardParameter = (new PayoneStandardParameterTransfer())->setEncoding($allStoresPayoneConfig[PayoneConstants::PAYONE_CREDENTIALS_ENCODING])
            ->setMid($allStoresPayoneConfig[PayoneConstants::PAYONE_CREDENTIALS_MID])
            ->setAid($allStoresPayoneConfig[PayoneConstants::PAYONE_CREDENTIALS_AID])
            ->setPortalId($allStoresPayoneConfig[PayoneConstants::PAYONE_CREDENTIALS_PORTAL_ID])
            ->setKey($allStoresPayoneConfig[PayoneConstants::PAYONE_CREDENTIALS_KEY])
            ->setPaymentGatewayUrl($allStoresPayoneConfig[PayoneConstants::PAYONE_PAYMENT_GATEWAY_URL])
            ->setCurrency($this->storeFacade->getStoreByName($storeName)->getSelectedCurrencyIsoCode())
            ->setRedirectSuccessUrl($allStoresPayoneConfig[PayoneConstants::PAYONE_REDIRECT_SUCCESS_URL])
            ->setRedirectBackUrl($allStoresPayoneConfig[PayoneConstants::PAYONE_REDIRECT_BACK_URL])
            ->setRedirectErrorUrl($allStoresPayoneConfig[PayoneConstants::PAYONE_REDIRECT_ERROR_URL]);

        return $standardParameter;
    }
}
