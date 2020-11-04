<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\PickingRoute;

use Orm\Zed\PickingRoute\Persistence\PyzPickingRouteQuery;
use Pyz\Shared\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class PickingRouteWriterStep implements DataImportStepInterface
{
    protected const KEY_PICKING_ORDER = 'Reihenfolge';
    protected const KEY_PRODUCT_GROUP = 'ACG_Warengruppe';
    protected const KEY_SUB_PRODUCT_GROUP = 'ACG_Unterwarengruppe';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $pyzPickingRoute = PyzPickingRouteQuery::create()
            ->filterByPickingOrder($dataSet[self::KEY_PICKING_ORDER])
            ->findOneOrCreate();

        $productGroup = trim($dataSet[self::KEY_PRODUCT_GROUP]);
        $subProductGroup = trim($dataSet[self::KEY_SUB_PRODUCT_GROUP]);

        $pickingOrderKey = sprintf(
            DataImportConfig::PICKING_ORDER_KEY_FORMAT,
            $productGroup,
            $subProductGroup
        );

        $pyzPickingRoute
            ->setPickingOrderKey($pickingOrderKey)
            ->setProductGroup($productGroup)
            ->setSubProductGroup($subProductGroup);

        if ($pyzPickingRoute->isNew() || $pyzPickingRoute->isModified()) {
            $pyzPickingRoute->save();
        }
    }
}
