<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Business\InvoiceReference;

use DateInterval;
use DateTime;
use Pyz\Zed\Invoice\InvoiceConfig;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;

class InvoiceReferenceModel
{
    protected const FORMAT_DAYS_INTERVAL = 'P%dD';

    /**
     * @var \Pyz\Zed\Invoice\Business\InvoiceReference\ReferenceGenerator
     */
    private $invoiceReferenceGenerator;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    private $salesFacade;

    /**
     * @var \Pyz\Zed\Invoice\InvoiceConfig
     */
    private $invoiceConfig;

    /**
     * @param \Pyz\Zed\Invoice\Business\InvoiceReference\ReferenceGenerator $orderReferenceGenerator
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     * @param \Pyz\Zed\Invoice\InvoiceConfig $invoiceConfig
     */
    public function __construct(
        ReferenceGenerator $orderReferenceGenerator,
        SalesFacadeInterface $salesFacade,
        InvoiceConfig $invoiceConfig
    ) {
        $this->invoiceReferenceGenerator = $orderReferenceGenerator;
        $this->salesFacade = $salesFacade;
        $this->invoiceConfig = $invoiceConfig;
    }

    /**
     * @param int $idSalesOrder
     * @param \DateTime $deliveryDateTime
     *
     * @return void
     */
    public function generateInvoiceReference(int $idSalesOrder, DateTime $deliveryDateTime): void
    {
        $invoiceReference = $this->invoiceReferenceGenerator->generateReference();

        $invoiceCreationDelayInterval = new DateInterval(
            sprintf(
                static::FORMAT_DAYS_INTERVAL,
                $this->invoiceConfig->getInvoiceCreationDelay()
            )
        );

        $invoiceDateTime = $deliveryDateTime->add($invoiceCreationDelayInterval);

        $this->salesFacade->saveInvoiceReference($idSalesOrder, $invoiceReference, $invoiceDateTime);
    }
}
