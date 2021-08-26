<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImportCZ\Business\Model\ProductConcrete;

use Pyz\Zed\DataImport\Business\Model\DataImporterCollection;
use Pyz\Zed\DataImport\Business\Model\ProductConcrete\ProductConcreteWriter as PyzProductConcreteWriter;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductConcreteWriter extends PyzProductConcreteWriter
{
    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        if (DataImporterCollection::$importCounters["product"] === 0) {
            DataImporterCollection::$importCounters["productStart"] = date_create(date("Y-m-d h:i:s"));
        }
        DataImporterCollection::$importCounters["product"]++;
        var_dump(DataImporterCollection::$importCounters["product"] . '#' . date("h:i:s") . ' ["sapnumber"=>"' . $dataSet["sapnumber"] . '"]');
        if (DataImporterCollection::$importCounters["product"] % 100 === 0) {
            $now = date_create(date("Y-m-d h:i:s"));
            $diff = date_diff(DataImporterCollection::$importCounters["productStart"], $now);
            var_dump("Duration from start: " . $diff->format("%H:%I:%S") . ", Memory usage for " . DataImporterCollection::$importCounters["product"] . " items:" . memory_get_usage(true) / 1024 / 1024 . " Mb");
        }

        parent::execute($dataSet);
    }
}
