<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickupQueue\Persistence;

use Generated\Shared\Transfer\AddToQueueTransfer;
use Generated\Shared\Transfer\GetOrdersQueueTransfer;
use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method \Pyz\Zed\PickupQueue\Persistence\PickupQueuePersistenceFactory getFactory()
 */
class PickupQueueQueryContainer extends AbstractQueryContainer implements PickupQueueQueryContainerInterface
{
    /**
     * @param \Generated\Shared\Transfer\GetOrdersQueueTransfer $getOrdersQueueTransfer
     *
     * @return \Generated\Shared\Transfer\GetOrdersQueueTransfer
     */
    public function getOrdersQueue(GetOrdersQueueTransfer $getOrdersQueueTransfer): GetOrdersQueueTransfer
    {
        $storeReference = $getOrdersQueueTransfer->getMerchantFilialNumber();
        $selectSql = $this->selectSqlQueryForGetOrdersQueue($storeReference);

        $result = $this->getResult($selectSql);
        $getOrdersQueueTransfer->setDbResponse($result);

        return $getOrdersQueueTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\AddToQueueTransfer $addToQueueTransfer
     *
     * @return \Generated\Shared\Transfer\AddToQueueTransfer
     */
    public function addOrderToQueue(AddToQueueTransfer $addToQueueTransfer): AddToQueueTransfer
    {
        $orderReference = $addToQueueTransfer->getOrderReference();
        $storeReference = $addToQueueTransfer->getStoreReference();
        $isRemote = $addToQueueTransfer->getIsRemote();
        $remoteType = gettype($isRemote);
        if ($remoteType === 'boolean') {
            $isRemote = (int)$isRemote;
        }

        $selectSql = $this->selectSqlQueryForAddToQueue($orderReference, $storeReference, $isRemote);

        $result = $this->getResult($selectSql);
        $addToQueueTransfer->setDbResponse($result);

        return $addToQueueTransfer;
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    protected function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    /**
     * @param string $storeReference
     *
     * @return string
     */
    protected function selectSqlQueryForGetOrdersQueue(string $storeReference): string
    {
        return "call pyzx_pickup_queue_get_orders_queue(" . $storeReference . ")";
    }

    /**
     * @param string $orderReference
     * @param string $storeReference
     * @param string $isRemote
     *
     * @return string
     */
    protected function selectSqlQueryForAddToQueue(string $orderReference, string $storeReference, string $isRemote): string
    {
        return "call pyzx_pickup_queue_add_queue(" . $orderReference . ", " . $storeReference . ", " . $isRemote . " )";
    }
}
