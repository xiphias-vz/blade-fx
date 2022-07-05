<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use Orm\Zed\Oms\Persistence\SpyOmsOrderItemStateQuery;
use Pyz\Shared\Shipment\ShipmentConfig;
use Pyz\Shared\TimeSlot\TimeSlotConstants;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Pyz\Zed\User\Business\UserFacadeInterface;
use Spryker\Shared\Config\Config;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Communication\PickingZoneOrderExportCommunicationFactory getFactory()
 */
class PickingZoneOrderExportFormDataProvider
{
    public const EXTRA_TIMESLOT = '10:00-18:00';

    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface
     */
    protected $pickingZoneOrderExportFacade;

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
     * @var string
     */
    protected $storeName;

    /**
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface $timeSlotsFacade
     * @param \Pyz\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     * @param \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface $exportFacade
     * @param string $storeName
     */
    public function __construct(
        PickingZoneFacadeInterface $pickingZoneFacade,
        TimeSlotFacadeInterface $timeSlotsFacade,
        UserFacadeInterface $userFacade,
        MerchantFacadeInterface $merchantFacade,
        PickingZoneOrderExportFacadeInterface $exportFacade,
        string $storeName
    ) {

        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->timeSlotFacade = $timeSlotsFacade;
        $this->userFacade = $userFacade;
        $this->merchantFacade = $merchantFacade;
        $this->pickingZoneOrderExportFacade = $exportFacade;
        $this->storeName = $storeName;
    }

    /**
     * @return mixed[]
     */
    public function getOptions(): array
    {
        $options[PickingZoneOrderExportForm::OPTION_PICKING_ZONES] = $this->getPickingZones();
        $stores = $this->pickingZoneOrderExportFacade->getPickingStores();
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
        $timeSlotsDef = $this->timeSlotFacade->getTimeslotDefinition($timeSlotDefinitionTransfer, $this->storeName);
        $choicesDef = [];
        $length = count($timeSlotsDef);
        for ($i = 0; $i < $length; $i++) {
            array_push($choicesDef, $timeSlotsDef[$i]["time_slot"]);
        }

        if (empty($choicesDef)) {
            $timeSlotConstants = Config::get(TimeSlotConstants::SHIPMENT_TIME_SLOTS);
            $choicesDef = $timeSlotConstants[ShipmentConfig::SHIPMENT_METHOD_CLICK_AND_COLLECT];
        }
        array_push($choicesDef, self::EXTRA_TIMESLOT);

        return $choicesDef;
    }
}
