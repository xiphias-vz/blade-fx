<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Pyz\Zed\Sales\Persistence\SalesRepositoryInterface;
use Spryker\Zed\Shipment\Business\ShipmentFacadeInterface;

class SalesOrderChecker implements SalesOrderCheckerInterface
{
    /**
     * @var \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface
     */
    private $shipmentFacade;

    /**
     * @var \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface
     */
    private $salesRepository;

    /**
     * @param \Spryker\Zed\Shipment\Business\ShipmentFacadeInterface $shipmentFacade
     * @param \Pyz\Zed\Sales\Persistence\SalesRepositoryInterface $salesRepository
     */
    public function __construct(ShipmentFacadeInterface $shipmentFacade, SalesRepositoryInterface $salesRepository)
    {
        $this->shipmentFacade = $shipmentFacade;
        $this->salesRepository = $salesRepository;
    }

    /**
     * @param int $idSalesShipment
     * @param string $requiredShipmentMethodKey
     *
     * @return bool
     */
    public function checkOrderShipment(int $idSalesShipment, string $requiredShipmentMethodKey): bool
    {
        $actualSalesShipmentName = $this->salesRepository->findSalesShipmentNameByIdSalesShipment($idSalesShipment);

        $requiredShipmentMethodTransfer = $this->shipmentFacade->findShipmentMethodByKey($requiredShipmentMethodKey);

        return $requiredShipmentMethodTransfer->getName() === $actualSalesShipmentName;
    }
}
