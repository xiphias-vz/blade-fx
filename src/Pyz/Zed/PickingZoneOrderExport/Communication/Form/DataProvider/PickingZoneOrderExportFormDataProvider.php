<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider;

use Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateQuery;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Spryker\Shared\Kernel\Store;

class PickingZoneOrderExportFormDataProvider
{
    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface
     */
    protected $timeSlotFacade;

    /**
     * @var \Generated\Shared\Transfer\SpyOmsOrderItemStateEntityTransfer
     */
    protected $stateTransfer;

    /**
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface $timeSlotsFacade
     */
    public function __construct(PickingZoneFacadeInterface $pickingZoneFacade, TimeSlotFacadeInterface $timeSlotsFacade)
    {
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->timeSlotFacade = $timeSlotsFacade;
    }

    /**
     * @return mixed[]
     */
    public function getOptions(): array
    {
        $options[PickingZoneOrderExportForm::OPTION_PICKING_ZONES] = $this->getPickingZones();
        $stores = $this->getPickingStores();
        asort($stores);
        $options[PickingZoneOrderExportForm::OPTION_PICKING_STORES] = $stores;
        $options[PickingZoneOrderExportForm::OPTION_PICKING_TIMESLOTS] = $this->getPickingTimeSlots();
        $options[PickingZoneOrderExportForm::OPTION_PICKING_STATUS] = $this->getPickingStatus();

        return $options;
    }

    /**
     * @return string[]
     */
    protected function getPickingZones(): array
    {
        $pickingZoneTransfers = $this->pickingZoneFacade->getPickingZones('');
        $pickingZones = [];

        foreach ($pickingZoneTransfers as $pickingZoneTransfer) {
            $pickingZones[$pickingZoneTransfer->getIdPickingZone()] = $pickingZoneTransfer->getName();
        }

        return $pickingZones;
    }

    /**
     * @return string[]
     */
    protected function getPickingStores(): array
    {
        $pickingStores = [];

        foreach (Store::getInstance()->getAllowedStores() as $allowedStore) {
            $pickingStores[$allowedStore] = $allowedStore;
        }

        return $pickingStores;
    }

    /**
     * @return string[]
     */
    protected function getPickingTimeSlots(): array
    {
        $stateQuery = new SpyOmsOrderItemStateQuery();

        $timeSlotsTransfers = $this->timeSlotFacade->getTimeSlotsForSpecificDate()->getTimeSlotsCapacity()->getArrayCopy();
        $pickingTimeSlots = [];

        foreach ($timeSlotsTransfers as $timeSlot) {
            $pickingTimeSlots[$timeSlot["IdTimeSlot"]] = $timeSlot["TimeSlot"];
        }

        return $pickingTimeSlots;
    }

    /**
     * @return string[]
     */
    protected function getPickingStatus(): array
    {
        $stateQuery = new SpyOmsOrderItemStateQuery();
        $dataStates = $stateQuery->find()->getData();

        $pickingStatuses = [];

        return $pickingStatuses;
    }
}
