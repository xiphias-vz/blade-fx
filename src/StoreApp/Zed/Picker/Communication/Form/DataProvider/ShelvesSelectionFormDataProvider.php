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
     *
     * @return mixed[]
     */
    public function getOptions(int $idSalesOrder): array
    {
        $options[ShelvesSelectionForm::OPTION_PICKING_SALES_ORDERS] = $this->getPickingSalesOrders($idSalesOrder);

        return $options;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\PickingSalesOrderTransfer[]
     */
    protected function getPickingSalesOrders(int $idSalesOrder): ArrayObject
    {
        $pickingSalesOrderCriteriaTransfer = (new PickingSalesOrderCriteriaTransfer())
            ->setIdSalesOrder($idSalesOrder);

        return $this->pickingSalesOrderFacade
            ->getPickingSalesOrderCollection($pickingSalesOrderCriteriaTransfer)
            ->getPickingSalesOrders();
    }
}
