<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice;

use Generated\Shared\Transfer\PdfParametersTransfer;
use Generated\Shared\Transfer\SequenceNumberSettingsTransfer;
use Pyz\Shared\Invoice\InvoiceConfig as SharedInvoiceConfig;
use Pyz\Shared\Invoice\InvoiceConstants;
use Pyz\Shared\Pdf\PdfConfig;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class InvoiceConfig extends AbstractBundleConfig
{
    public const INVOICE_PDF_MODE = PdfConfig::PDF_MODE_UTF8;
    public const INVOICE_PDF_ORIENTATION = PdfConfig::PDF_ORIENTATION_PORTRAIT;

    /**
     * Defines the prefix for the sequence number which is the public id of an order.
     *
     * @return \Generated\Shared\Transfer\SequenceNumberSettingsTransfer
     */
    public function getInvoiceReferenceDefaults()
    {
        $sequenceNumberSettingsTransfer = new SequenceNumberSettingsTransfer();

        $sequenceNumberSettingsTransfer->setName(SharedInvoiceConfig::NAME_INVOICE_REFERENCE);
        $sequenceNumberSettingsTransfer->setPrefix($this->get(InvoiceConstants::INVOICE_PREFIX));

        return $sequenceNumberSettingsTransfer;
    }

    /**
     * @return string
     */
    public function getYvesHost(): string
    {
        return $this->get(ApplicationConstants::HOST_YVES);
    }

    /**
     * @return string
     */
    public function getBaseUrlYves(): string
    {
        return $this->get(CustomerConstants::BASE_URL_YVES);
    }

    /**
     * @return string[]
     */
    public function getInvoiceEmailBcc(): array
    {
        return $this->get(InvoiceConstants::INVOICE_EMAIL_BCC);
    }

    /**
     * @return \Generated\Shared\Transfer\PdfParametersTransfer
     */
    public function getPdfInvoiceConfig(): PdfParametersTransfer
    {
        return (new PdfParametersTransfer())
            ->setMode(static::INVOICE_PDF_MODE)
            ->setOrientation(static::INVOICE_PDF_ORIENTATION);
    }

    /**
     * @return int
     */
    public function getInvoiceCreationDelay(): int
    {
        return $this->get(InvoiceConstants::INVOICE_CREATION_DELAY_IN_DAYS, 0);
    }

    /**
     * @return int
     */
    public function getInvoiceTimeHours(): int
    {
        return $this->get(InvoiceConstants::INVOICE_TIME_HOURS);
    }
}
