<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form\DataProvider;

use ArrayObject;
use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Pyz\Zed\PickingSalesOrder\Business\PickingSalesOrderFacadeInterface;
use StoreApp\Zed\Picker\Communication\Form\ShelvesSelectionForm;

class ShelvesSelectionFormDataProvider
{
    /**
     * @var \Pyz\Zed\PickingSalesOrder\Business\PickingSalesOrderFacadeInterface
     */
    protected $pickingSalesOrderFacade;

    /**
     * @param \Pyz\Zed\PickingSalesOrder\Business\PickingSalesOrderFacadeInterface $pickingSalesOrderFacade
     */
    public function __construct(PickingSalesOrderFacadeInterface $pickingSalesOrderFacade)
    {
        $this->pickingSalesOrderFacade = $pickingSalesOrderFacade;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return array
     */
    public function getData(int $idSalesOrder): array
    {
        return [
            ShelvesSelectionForm::FIELD_ID_SALES_ORDER => $idSalesOrder,
        ];
    }

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     *
     * @return mixed[]
     */
    public function getOptions(int $idSalesOrder, int $idPickingZone): array
    {
        $options[ShelvesSelectionForm::OPTION_PICKING_SALES_ORDERS] = $this->getPickingSalesOrders(
            $idSalesOrder,
            $idPickingZone
        );

        return $options;
    }

    /**
     * @param int $idSalesOrder
     * @param int $idPickingZone
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\PickingSalesOrderTransfer[]
     */
    protected function getPickingSalesOrders(int $idSalesOrder, int $idPickingZone): ArrayObject
    {
        $pickingSalesOrderCriteriaTransfer = (new PickingSalesOrderCriteriaTransfer())
            ->setIdSalesOrder($idSalesOrder)
            ->setIdPickingZone($idPickingZone);

        return $this->pickingSalesOrderFacade
            ->getPickingSalesOrderCollection($pickingSalesOrderCriteriaTransfer)
            ->getPickingSalesOrders();
    }
}
