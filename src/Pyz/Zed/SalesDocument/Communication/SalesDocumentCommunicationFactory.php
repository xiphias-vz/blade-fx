<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Communication;

use Pyz\Client\Pdf\PdfClientInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Pyz\Zed\SalesDocument\Business\Model\HtmlRenderer;
use Pyz\Zed\SalesDocument\Business\Model\HtmlRendererInterface;
use Pyz\Zed\SalesDocument\Communication\Form\DataProvider\StorePickingListFormDataProvider;
use Pyz\Zed\SalesDocument\Communication\Form\StorePickingListForm;
use Pyz\Zed\SalesDocument\SalesDocumentDependencyProvider;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface;
use Spryker\Zed\Messenger\Business\MessengerFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;

/**
 * @method \Pyz\Zed\SalesDocument\SalesDocumentConfig getConfig()
 * @method \Pyz\Zed\SalesDocument\Business\SalesDocumentFacadeInterface getFacade()
 */
class SalesDocumentCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @param array $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createStorePickingListForm($data, $options): FormInterface
    {
        return $this->getFormFactory()->create(StorePickingListForm::class, $data, $options);
    }

    /**
     * @return \Pyz\Zed\SalesDocument\Communication\Form\DataProvider\StorePickingListFormDataProvider
     */
    public function createStorePickingListFormDataProvider(): StorePickingListFormDataProvider
    {
        return new StorePickingListFormDataProvider(
            $this->getUserFacade(),
            $this->getMerchantFacade()
        );
    }

    /**
     * @return \Pyz\Client\Pdf\PdfClientInterface
     */
    public function getPdfClient(): PdfClientInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::CLIENT_PDF);
    }

    /**
     * @return \Pyz\Zed\SalesDocument\Business\Model\HtmlRendererInterface
     */
    public function createHtmlRenderer(): HtmlRendererInterface
    {
        return new HtmlRenderer(
            $this->getTwigEnvironment()
        );
    }

    /**
     * @return \Twig\Environment
     */
    private function getTwigEnvironment(): Environment
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::TWIG_ENVIRONMENT);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    public function getCurrentStore(): Store
    {
        return Store::getInstance();
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface
     */
    public function getMerchantSearchFacade(): MerchantSearchFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_MERCHANT_SEARCH_FACADE);
    }

    /**
     * @return \Spryker\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \Spryker\Zed\Messenger\Business\MessengerFacadeInterface
     */
    public function getMessengerFacade(): MessengerFacadeInterface
    {
        return $this->getProvidedDependency(SalesDocumentDependencyProvider::FACADE_MESSENGER);
    }
}
