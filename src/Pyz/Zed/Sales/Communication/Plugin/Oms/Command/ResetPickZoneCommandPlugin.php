<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Communication\Plugin\Oms\Command;

use Generated\Shared\Transfer\OrderPickingBlockTransfer;
use Generated\Shared\Transfer\OrderUpdateRequestTransfer;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

/**
 * @method \Pyz\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Pyz\Zed\Sales\SalesConfig getConfig()
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Pyz\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 */
class ResetPickZoneCommandPlugin extends AbstractPlugin implements CommandByOrderInterface
{
    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        $orderPickingBlockTransfer = (new OrderPickingBlockTransfer())
            ->setIdSalesOrder($orderEntity->getIdSalesOrder())
            ->setPickingZoneName($orderItems[0]->getPickZone());

        $this->getFactory()->getPickingZoneFacade()
            ->resetOrderPickingBlock($orderPickingBlockTransfer);

        $orderUpdateRequestTransfer = (new OrderUpdateRequestTransfer())
            ->setStoreStatus(OmsConfig::STORE_STATE_READY_FOR_PICKING);

        $itemsIds = [];
        foreach ($orderItems as $item) {
            $itemsIds[] = $item->getIdSalesOrderItem();
        }

        $query = 'update spy_sales_order_item ssoiUp
                    inner join
                    (
                             select ssoi.sku,
                                    price,
                                    new_weight,
                                    price_per_kg,
                                    gross_price,
                                    price_to_pay_aggregation,
                                    row_number() over (partition by sku order by new_weight) as rownum
                             from spy_sales_order_item ssoi
                             inner join (select fk_sales_order, sku from spy_sales_order_item where id_sales_order_item in (' . implode(",", $itemsIds) . ') group by fk_sales_order, sku) ss on ssoi.fk_sales_order = ss.fk_sales_order and ssoi.sku = ss.sku
                             where not price_per_kg is null
                             group by ssoi.sku, price, new_weight, price_per_kg, gross_price, price_to_pay_aggregation
                    ) items on ssoiUp.sku = items.sku and items.rownum = 1
                    set ssoiUp.price = items.price,
                        ssoiUp.new_weight = null,
                        ssoiUp.gross_price = items.gross_price,
                        ssoiUp.price_to_pay_aggregation = items.price_to_pay_aggregation
                    where ssoiUp.fk_sales_order = ' . $orderEntity->getIdSalesOrder();
        $this->execQuery($query, false);

        $this->getFactory()->getMerchantSalesOrderFacade()->updateOrderWithOrderUpdateRequest(
            $orderEntity->getIdSalesOrder(),
            $orderUpdateRequestTransfer
        );

        return [];
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function execQuery(string $sql, bool $doFetch = true): array
    {
        $connection = Propel::getConnection();
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
    }
}
