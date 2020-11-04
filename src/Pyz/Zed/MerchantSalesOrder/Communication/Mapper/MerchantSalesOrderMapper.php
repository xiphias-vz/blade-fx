<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Communication\Mapper;

use DateTime;
use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Pyz\Service\Shipment\ShipmentServiceInterface;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;

class MerchantSalesOrderMapper implements MerchantSalesOrderMapperInterface
{
    /**
     * @var \Pyz\Service\Shipment\ShipmentServiceInterface
     */
    private $shipmentService;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    private $merchantFacade;

    /**
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     * @param \Pyz\Service\Shipment\ShipmentServiceInterface $shipmentService
     */
    public function __construct(
        MerchantFacadeInterface $merchantFacade,
        ShipmentServiceInterface $shipmentService
    ) {
        $this->merchantFacade = $merchantFacade;
        $this->shipmentService = $shipmentService;
    }

    /**
     * @inheritDoc
     */
    public function mapFromSaveOrderTransfer(
        SaveOrderTransfer $saveOrderTransfer,
        QuoteTransfer $quoteTransfer
    ): MerchantSalesOrderTransfer {
        $merchantSalesOrderTransfer = (new MerchantSalesOrderTransfer())
            ->setFkSalesOrder($saveOrderTransfer->getIdSalesOrder())
            ->setOrderReference($saveOrderTransfer->getOrderReference())
            ->setRequestedDeliveryDate($this->getTimeSlotDateTime($quoteTransfer));

        $merchantTransfer = $this->findMerchant($quoteTransfer);
        $merchantSalesOrderTransfer->setFkMerchant($merchantTransfer->getIdMerchant());
        $merchantSalesOrderTransfer->setMerchantReference($merchantTransfer->getMerchantReference());

        return $merchantSalesOrderTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \DateTime
     */
    protected function getTimeSlotDateTime(QuoteTransfer $quoteTransfer): DateTime
    {
        $requestedDeliveryDate = $quoteTransfer->getShipment()->getRequestedDeliveryDate();

        return $this->shipmentService->parseRequestedDeliveryDate($requestedDeliveryDate);
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function findMerchant(QuoteTransfer $quoteTransfer): MerchantTransfer
    {
        $merchantCriteriaFilter = (new MerchantCriteriaFilterTransfer())
            ->setMerchantReference($quoteTransfer->getMerchantReference());

        return $this->merchantFacade->findOne($merchantCriteriaFilter);
    }
}
