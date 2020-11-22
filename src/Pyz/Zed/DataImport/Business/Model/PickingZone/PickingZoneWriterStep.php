<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\PickingZone;

use Orm\Zed\PickingZone\Persistence\PyzPickingZoneQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class PickingZoneWriterStep implements DataImportStepInterface
{
    protected const KEY_PICKING_ZONE_NAME = 'picking_zone_name';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $pyzPickingRoute = PyzPickingZoneQuery::create()
            ->filterByName($dataSet[static::KEY_PICKING_ZONE_NAME])
            ->findOneOrCreate();

        if ($pyzPickingRoute->isNew() || $pyzPickingRoute->isModified()) {
            $pyzPickingRoute->save();
        }
    }
}
