<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Business;

use Pyz\Client\OrderDetail\OrderDetailClientInterface;
use Pyz\Client\Pdf\PdfClientInterface;
use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Zed\Invoice\Business\InvoiceReference\InvoiceReferenceModel;
use Pyz\Zed\Invoice\Business\InvoiceReference\ReferenceGenerator;
use Pyz\Zed\Invoice\Business\Mailer\InvoiceMailer;
use Pyz\Zed\Invoice\InvoiceDependencyProvider;
use Pyz\Zed\Mail\Business\MailFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Kernel\Communication\Plugin\Pimple;
use Spryker\Zed\SequenceNumber\Business\SequenceNumberFacadeInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Twig\Environment;

/**
 * @method \Pyz\Zed\Invoice\InvoiceConfig getConfig()
 */
class InvoiceBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\Invoice\Business\InvoiceReference\InvoiceReferenceModel
     */
    public function createInvoiceReferenceModel(): InvoiceReferenceModel
    {
        return new InvoiceReferenceModel(
            $this->createReferenceGenerator(),
            $this->getSalesFacade(),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\Invoice\Business\InvoiceReference\ReferenceGenerator
     */
    public function createReferenceGenerator(): ReferenceGenerator
    {
        $sequenceNumberSettings = $this->getConfig()->getInvoiceReferenceDefaults();

        return new ReferenceGenerator(
            $this->getSequenceNumberFacade(),
            $sequenceNumberSettings
        );
    }

    /**
     * @return \Pyz\Zed\Invoice\Business\Mailer\InvoiceMailer
     */
    public function createInvoiceMailer(): InvoiceMailer
    {
        return new InvoiceMailer(
            $this->getMailFacade(),
            $this->getSalesFacade(),
            $this->getDateTimeWithZoneService(),
            $this->getOrderDetailClient(),
            $this->getPdfClient(),
            $this->createTwigEnvironment(),
            $this->getConfig(),
            $this->getTranslatorFacade(),
            $this->getMailCmsBlock(),
            $this->getStore()
        );
    }

    /**
     * @return \Spryker\Zed\SequenceNumber\Business\SequenceNumberFacadeInterface
     */
    private function getSequenceNumberFacade(): SequenceNumberFacadeInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::FACADE_SEQUENCE_NUMBER);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private function getSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::FACADE_SALES);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }

    /**
     * @return \Twig\Environment
     */
    public function createTwigEnvironment(): Environment
    {
        return (new Pimple())->getApplication()['twig'];
    }

    /**
     * @return \Pyz\Zed\Mail\Business\MailFacadeInterface
     */
    private function getMailFacade(): MailFacadeInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::FACADE_MAIL);
    }

    /**
     * @return \Pyz\Client\OrderDetail\OrderDetailClientInterface
     */
    public function getOrderDetailClient(): OrderDetailClientInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::CLIENT_ORDER_DETAIL);
    }

    /**
     * @return \Pyz\Client\Pdf\PdfClientInterface
     */
    public function getPdfClient(): PdfClientInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::CLIENT_PDF);
    }

    /**
     * @return \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    public function getTranslatorFacade(): TranslatorFacadeInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::FACADE_TRANSLATOR);
    }

    /**
     * @return \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private function getMailCmsBlock(): MailCmsBlockServiceInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::SERVICE_MAIL_CMS_BLOCK);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    private function getStore(): Store
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::STORE);
    }
}
