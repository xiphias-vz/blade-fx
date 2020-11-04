<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderActions\Business\Model;

use Pyz\Shared\Oms\OmsConfig;
use Pyz\Zed\Oms\Business\OmsFacadeInterface;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;

class SalesOrderActionsExecutor implements SalesOrderActionsExecutorInterface
{
    /**
     * @var \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    protected $omsFacade;

    /**
     * @var \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    protected $salesFacade;

    /**
     * @param \Pyz\Zed\Oms\Business\OmsFacadeInterface $omsFacade
     * @param \Pyz\Zed\Sales\Business\SalesFacadeInterface $salesFacade
     */
    public function __construct(OmsFacadeInterface $omsFacade, SalesFacadeInterface $salesFacade)
    {
        $this->omsFacade = $omsFacade;
        $this->salesFacade = $salesFacade;
    }

    /**
     * @param string $customerReference
     * @param int $idSalesOrder
     *
     * @return bool
     */
    public function cancelOrderByCustomer(string $customerReference, int $idSalesOrder): bool
    {
        $salesOrderIds = $this->salesFacade->getSaleOrderIdsByCustomerReferenceAndIdSalesOrder($customerReference, $idSalesOrder);
        $processedItemsCount = $this->omsFacade->triggerEventForOrderItemsAndCountProcessed(
            OmsConfig::EVENT_ORDER_CANCEL_BY_CUSTOMER,
            $salesOrderIds
        );

        return $processedItemsCount > 0;
    }
}
