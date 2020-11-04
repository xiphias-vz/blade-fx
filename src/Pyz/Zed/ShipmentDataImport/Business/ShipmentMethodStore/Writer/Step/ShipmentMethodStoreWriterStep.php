<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ShipmentDataImport\Business\ShipmentMethodStore\Writer\Step;

use Orm\Zed\Shipment\Persistence\SpyShipmentMethodStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\ShipmentDataImport\Business\ShipmentMethodStore\Writer\DataSet\ShipmentMethodStoreDataSetInterface;
use Spryker\Zed\ShipmentDataImport\Business\ShipmentMethodStore\Writer\Step\ShipmentMethodStoreWriterStep as SprykerShipmentMethodStoreWriterStep;

class ShipmentMethodStoreWriterStep extends SprykerShipmentMethodStoreWriterStep
{
    public const BULK_SIZE = 100;

    /**
     * @var int[] Keys are store names, values are store ids.
     */
    protected static $idStoreBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $allowedStores = Store::getInstance()->getAllowedStores();

        foreach ($allowedStores as $allowedStore) {
            SpyShipmentMethodStoreQuery::create()
                ->filterByFkStore($this->getIdStoreByStoreName($allowedStore))
                ->filterByFkShipmentMethod($dataSet[ShipmentMethodStoreDataSetInterface::COL_ID_SHIPMENT_METHOD])
                ->findOneOrCreate()
                ->save();
        }
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStoreByStoreName(string $storeName): int
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }
}
