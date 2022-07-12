<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\ProductAbstract;

use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractWriterStep as PyzProductAbstractWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductAbstractWriterStep extends PyzProductAbstractWriterStep
{
    protected const SHIPMENT_TAX_RATE_NAME = 'CZ Shipment Tax';
    public const KEY_PRODUCT_NUMBER = ProductConfig::KEY_SAP_NUMBER;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        parent::execute($dataSet);
    }
}
