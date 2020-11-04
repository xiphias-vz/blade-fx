<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PaymentDataImport\Business\PaymentMethodStore\Writer\Step;

use Orm\Zed\Payment\Persistence\SpyPaymentMethodStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\PaymentDataImport\Business\PaymentMethodStore\Writer\DataSet\PaymentMethodStoreDataSetInterface;
use Spryker\Zed\PaymentDataImport\Business\PaymentMethodStore\Writer\Step\PaymentMethodStoreWriterStep as SprykerPaymentMethodStoreWriterStep;

class PaymentMethodStoreWriterStep extends SprykerPaymentMethodStoreWriterStep
{
    /**
     * @var array
     */
    protected static $idStoreBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $availableStores = Store::getInstance()->getAllowedStores();

        foreach ($availableStores as $storeName) {
            SpyPaymentMethodStoreQuery::create()
                ->filterByFkStore($this->getIdStoreByStoreName($storeName))
                ->filterByFkPaymentMethod($dataSet[PaymentMethodStoreDataSetInterface::COL_ID_PAYMENT_METHOD])
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
