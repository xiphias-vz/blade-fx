<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateQuery;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Pyz\Zed\User\Business\UserFacadeInterface;
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
     * @var \Pyz\Zed\User\Business\UserFacadeInterface
     */
    protected $userFacade;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    protected $merchantFacade;

    /**
     * @var \Generated\Shared\Transfer\SpyOmsOrderItemStateEntityTransfer
     */
    protected $stateTransfer;

    /**
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface $timeSlotsFacade
     * @param \Pyz\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     */
    public function __construct(PickingZoneFacadeInterface $pickingZoneFacade, TimeSlotFacadeInterface $timeSlotsFacade, UserFacadeInterface $userFacade, MerchantFacadeInterface $merchantFacade)
    {
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->timeSlotFacade = $timeSlotsFacade;
        $this->userFacade = $userFacade;
        $this->merchantFacade = $merchantFacade;
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
        $options[PickingZoneOrderExportForm::OPTION_PICKING_TIMESLOT_DEFINITIONS] = $this->getTimeSlotDefinitions();

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
        $isCurrentUserSupervisor = $this->userFacade->isCurrentUserSupervisor();

        if (isset($isCurrentUserSupervisor) && $isCurrentUserSupervisor) {
            $currentUser = $this->userFacade->getCurrentUser();
            $merchantByCurrentUser = $this->merchantFacade->findMerchantByUser($currentUser);
            if ($merchantByCurrentUser) {
                $currentStore = $merchantByCurrentUser->getStoreRelation()->getStores();
                foreach ($currentStore as $store) {
                    $storeName = $store->getName();
                    $pickingStores[$storeName] = $storeName;
                }
            }
        } else {
            foreach (Store::getInstance()->getAllowedStores() as $allowedStore) {
                $pickingStores[$allowedStore] = $allowedStore;
            }
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

    /**
     * @return string[]
     */
    protected function getTimeSlotDefinitions(): array
    {
        $timeSlotDefinitionTransfer = new TimeSlotsDefinitionTransfer();
        $timeSlotsDef = $this->timeSlotFacade->getTimeslotDefinition($timeSlotDefinitionTransfer);
        $choicesDef = [];
        for ($i = 0; $i < count($timeSlotsDef); $i++) {
            array_push($choicesDef, $timeSlotsDef[$i]["time_slot"]);
        }

        return $choicesDef;
    }
}
