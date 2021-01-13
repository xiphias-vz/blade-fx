<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

use Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer;
use Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery;

class ContainerReader
{
    /**
     * @param \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery
     * @param \Generated\Shared\Transfer\PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
     *
     * @return \Orm\Zed\PickingSalesOrder\Persistence\PyzPickingSalesOrderQuery
     */
    public function getContainerCodes(
        PyzPickingSalesOrderQuery $pyzPickingSalesOrderQuery,
        PickingSalesOrderCriteriaTransfer $pickingSalesOrderCriteriaTransfer
    ): PyzPickingSalesOrderQuery {
        if (!empty($pickingSalesOrderCriteriaTransfer->getContainerCodes())) {
            $pyzPickingSalesOrderQuery->filterByContainerCode_In($pickingSalesOrderCriteriaTransfer->getContainerCodes());
        }

        return $pyzPickingSalesOrderQuery;
    }

    /**
     * @param string $ContainerId
     * @param string $orderId
     *
     * @return bool
     */
    public function checkContainerUse(string $ContainerId, string $orderId): bool
    {
        return true;
    }

    /**
     * @param string $orderId
     *
     * @return array
     */
    public function getContainersByOrderId(string $orderId): array
    {
        $listContainers = ["A01-01-01" => "25015001", "A01-01-02" => "25015001", "A01-01-03" => "25015001"];

        return $listContainers;
    }
}
