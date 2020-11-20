<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider;

use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;

class PickingZoneOrderExportFormDataProvider
{
    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     */
    public function __construct(PickingZoneFacadeInterface $pickingZoneFacade)
    {
        $this->pickingZoneFacade = $pickingZoneFacade;
    }

    /**
     * @return mixed[]
     */
    public function getOptions(): array
    {
        $options[PickingZoneOrderExportForm::OPTION_PICKING_ZONES] = $this->getPickingZones();

        return $options;
    }

    /**
     * @return string[]
     */
    protected function getPickingZones(): array
    {
        $pickingZoneTransfers = $this->pickingZoneFacade->getPickingZones();
        $pickingZones = [];

        foreach ($pickingZoneTransfers as $pickingZoneTransfer) {
            $pickingZones[$pickingZoneTransfer->getIdPickingZone()] = $pickingZoneTransfer->getName();
        }

        return $pickingZones;
    }
}
