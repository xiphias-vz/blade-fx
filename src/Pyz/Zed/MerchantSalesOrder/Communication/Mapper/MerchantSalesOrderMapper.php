<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantSalesOrder\Communication\Mapper;

use DateTime;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\MerchantCriteriaTransfer;
use Generated\Shared\Transfer\MerchantSalesOrderTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\OrderTransfer;
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
    ): OrderTransfer {
        $merchantTransfer = $this->findMerchant($quoteTransfer);
        $orderTransfer = (new OrderTransfer())->fromArray($saveOrderTransfer->toArray(), true);
        $merchantReference = $merchantTransfer->getMerchantReference();

        $merchantSalesOrderTransfer = (new MerchantSalesOrderTransfer())
            ->setRequestedDeliveryDate($this->getTimeSlotDateTime($quoteTransfer));

        $merchantTransfer = $this->findMerchant($quoteTransfer);
        $merchantSalesOrderTransfer->setFkMerchant($merchantTransfer->getIdMerchant());

        $orderTransfer = $orderTransfer
            ->setMerchantReference($merchantReference)
            ->setMerchantFilialNumber($merchantTransfer->getFilialNumber())
            ->setIdSalesOrder($saveOrderTransfer->getIdSalesOrder())
            ->setRequestedDeliveryDate($this->getTimeSlotDateTime($quoteTransfer))
            ->setPriceMode($quoteTransfer->getPriceMode())
            ->setMerchantSalesOrder($merchantSalesOrderTransfer);

        foreach ($saveOrderTransfer->getOrderItems() as $saveOrderItem) {
            $orderItem = (new ItemTransfer())->fromArray($saveOrderItem->toArray(), true);
            $orderItem->setMerchantReference($merchantReference);
            $orderTransfer->addItem($orderItem);
        }

        return $orderTransfer;
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
        $merchantCriteriaFilter = (new MerchantCriteriaTransfer())
            ->setMerchantReference($quoteTransfer->getMerchantReference());

        return $this->merchantFacade->findOne($merchantCriteriaFilter);
    }
}
