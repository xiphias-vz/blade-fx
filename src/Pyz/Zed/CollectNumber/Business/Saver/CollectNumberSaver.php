<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Business\Saver;

use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\SaveOrderTransfer;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Zed\CollectNumber\Business\Generator\CollectNumberGenerator;
use Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface;

class CollectNumberSaver
{
    /**
     * @var \Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface
     */
    private $entityManager;

    /**
     * @var \Pyz\Zed\CollectNumber\Business\Generator\CollectNumberGenerator
     */
    private $collectNumberGenerator;

    /**
     * @param \Pyz\Zed\CollectNumber\Persistence\CollectNumberEntityManagerInterface $entityManager
     * @param \Pyz\Zed\CollectNumber\Business\Generator\CollectNumberGenerator $collectNumberGenerator
     */
    public function __construct(
        CollectNumberEntityManagerInterface $entityManager,
        CollectNumberGenerator $collectNumberGenerator
    ) {
        $this->entityManager = $entityManager;
        $this->collectNumberGenerator = $collectNumberGenerator;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return void
     */
    public function generateCollectNumber(QuoteTransfer $quoteTransfer, SaveOrderTransfer $saveOrderTransfer): void
    {
        if ($quoteTransfer->getShipment()->getMethod()->getShipmentMethodKey() !== ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT) {
            return;
        }

        $collectNumber = $this->collectNumberGenerator->generateCollectNumber(
            $saveOrderTransfer
        );
        $this->entityManager->saveCollectNumberToSalesOrder($saveOrderTransfer->getIdSalesOrder(), $collectNumber);

        $saveOrderTransfer->setCollectNumber($collectNumber);
    }
}
