<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form\DataProvider;

use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use StoreApp\Zed\Picker\Communication\Form\PickingZoneSelectionForm;

class PickingZoneSelectionFormDataProvider
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
     * @param int|null $idPickingZone
     *
     * @return mixed[]
     */
    public function getData(?int $idPickingZone): array
    {
        $data[PickingZoneSelectionForm::FIELD_PICKING_ZONE] = $idPickingZone;

        return $data;
    }

    /**
     * @return mixed[]
     */
    public function getOptions(): array
    {
        $options[PickingZoneSelectionForm::OPTION_PICKING_ZONES] = $this->getPickingZones();

        return $options;
    }

    /**
     * @return string[][]
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
