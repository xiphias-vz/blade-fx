<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\TimeSlotCapacity;

use DateTime;
use Generated\Shared\Transfer\TimeSlotCapacityTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\TimeSlot\Persistence\PyzTimeSlotQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Pyz\Zed\Merchant\Dependency\MerchantEvents;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class TimeSlotWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    protected const MERCHANT_REFERENCE = 'merchant_reference';
    protected const DAY = 'day';
    protected const DATE = 'date';
    protected const TIME_SLOT = 'time_slot';
    protected const CAPACITY = 'capacity';

    protected const REQUIRED_DATA_SET_KEYS = [
        self::MERCHANT_REFERENCE,
        self::TIME_SLOT,
    ];

    protected const DEFAULT_CAPACITY = 0;

    /**
     * @var array
     */
    protected static $idMerchantsBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        $timeSlotTransfer = $this->mapDataSetToTimeSlotCapacityTransfer($dataSet, new TimeSlotCapacityTransfer());

        $this->saveTimeSlotCapacity($timeSlotTransfer);
    }

    /**
     * @param string $merchantReference
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function getMerchantId(string $merchantReference): int
    {
        if (isset(static::$idMerchantsBuffer[$merchantReference])) {
            return static::$idMerchantsBuffer[$merchantReference];
        }

        $merchantEntity = SpyMerchantQuery::create()->findOneByMerchantReference($merchantReference);

        if (!$merchantEntity) {
            throw new EntityNotFoundException(sprintf('Merchant not found by reference "%s"', $merchantReference));
        }

        static::$idMerchantsBuffer[$merchantReference] = $merchantEntity->getIdMerchant();

        return static::$idMerchantsBuffer[$merchantReference];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Generated\Shared\Transfer\TimeSlotCapacityTransfer $timeSlotCapacityTransfer
     *
     * @return \Generated\Shared\Transfer\TimeSlotCapacityTransfer
     */
    protected function mapDataSetToTimeSlotCapacityTransfer(
        DataSetInterface $dataSet,
        TimeSlotCapacityTransfer $timeSlotCapacityTransfer
    ): TimeSlotCapacityTransfer {
        $timeSlotCapacityTransfer->fromArray($dataSet->getArrayCopy(), true);
        $timeSlotCapacityTransfer->setDate($dataSet[static::DATE]);

        return $timeSlotCapacityTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\TimeSlotCapacityTransfer $timeSlotCapacityTransfer
     *
     * @return void
     */
    protected function saveTimeSlotCapacity(TimeSlotCapacityTransfer $timeSlotCapacityTransfer): void
    {
        $timeslotDay = $timeSlotCapacityTransfer->getDate() ?
            DateTime::createFromFormat('Y-m-d', $timeSlotCapacityTransfer->getDate()) : null;

        $pyzTimeSlotEntity = PyzTimeSlotQuery::create()
            ->filterByDay($timeSlotCapacityTransfer->getDay())
            ->filterByTimeSlot($timeSlotCapacityTransfer->getTimeSlot())
            ->filterByMerchantReference($timeSlotCapacityTransfer->getMerchantReference())
            ->filterByDate($timeslotDay)
            ->findOneOrCreate();

        $pyzTimeSlotEntity->setCapacity($timeSlotCapacityTransfer->getCapacity() ?? static::DEFAULT_CAPACITY);
        $pyzTimeSlotEntity->setDate($timeslotDay);

        if ($pyzTimeSlotEntity->isNew() || $pyzTimeSlotEntity->isModified()) {
            $pyzTimeSlotEntity->save();

            $this->addPublishEvents(
                MerchantEvents::MERCHANT_PUBLISH,
                $this->getMerchantId($pyzTimeSlotEntity->getMerchantReference())
            );
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function validateDataSet(DataSetInterface $dataSet): void
    {
        foreach (static::REQUIRED_DATA_SET_KEYS as $requiredDataSetKey) {
            $this->validateRequireDataSetByKey($dataSet, $requiredDataSetKey);
        }

        if (!$dataSet[static::DAY] && !$dataSet[static::DATE]) {
            throw new InvalidDataException('"' . static::DAY . 'or' . static::DATE . '" must be set.');
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $requiredDataSetKey
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function validateRequireDataSetByKey(DataSetInterface $dataSet, string $requiredDataSetKey): void
    {
        if (!$dataSet[$requiredDataSetKey]) {
            throw new InvalidDataException('"' . $requiredDataSetKey . '" is required.');
        }
    }
}
