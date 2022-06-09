<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\TimeSlot\Persistence;

use Generated\Shared\Transfer\TimeSlotsDefinitionTransfer;
use PDO;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

class TimeSlotQueryContainer extends AbstractQueryContainer implements TimeSlotQueryContainerInterface
{
    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer
     */
    public function saveTimeSlotDefinitionForStore(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): TimeSlotsDefinitionTransfer
    {
        $merchantReference = $timeslotDefinitionTransfer->getMerchantReference();
        $startTime = $timeslotDefinitionTransfer->getStartTime();
        $endTime = $timeslotDefinitionTransfer->getEndTime();
        $intervalMinutes = $timeslotDefinitionTransfer->getIntervalMinutes();
        $defaultCapacity = $timeslotDefinitionTransfer->getDefaultCapacity();
        $fkUser = $timeslotDefinitionTransfer->getFkUser();

        $selectSql = $this->selectSqlQueryForSetTimeslotDefinition($merchantReference, $startTime, $endTime, $intervalMinutes, $defaultCapacity, $fkUser);

        $result = $this->getResult($selectSql);
        $timeslotDefinitionTransfer->setDbResponse($result);

        return $timeslotDefinitionTransfer;
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    protected function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    /**
     * @param string $merchantReference
     * @param string $startTime
     * @param string $endTime
     * @param string $intervalMinutes
     * @param string $defaultCapacity
     * @param int $fkUser
     *
     * @return string
     */
    protected function selectSqlQueryForSetTimeslotDefinition(string $merchantReference, string $startTime, string $endTime, string $intervalMinutes, string $defaultCapacity, int $fkUser): string
    {
        return "call pyzx_set_timeslot_definition_per_store(" . $startTime . ", " . $endTime . ", " . $intervalMinutes . ", " . $defaultCapacity . ", " . $merchantReference . ", " . $fkUser . ")";
    }

    /**
     * @param \Generated\Shared\Transfer\TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer
     *
     * @return array
     */
    public function getTimeSlotDefinition(TimeSlotsDefinitionTransfer $timeslotDefinitionTransfer): array
    {
        $merchantReference = $timeslotDefinitionTransfer->getMerchantReference();
        $exactDate = $timeslotDefinitionTransfer->getExactDate() ??  date("Y-m-d");
        $workDay = $timeslotDefinitionTransfer->getWorkDay();

        $selectSql = $this->selectSqlQueryForGetTimeslotDefinition($merchantReference, $exactDate, $workDay);

        $result = $this->getResult($selectSql);

        return $result;
    }

    /**
     * @param string $merchantReference
     * @param string|null $exactDate
     * @param string|null $workDay
     *
     * @return string
     */
    protected function selectSqlQueryForGetTimeslotDefinition(string $merchantReference, ?string $exactDate, ?string $workDay): string
    {
        if ($exactDate === null) {
            $exactDate = "";
        }
        if ($workDay === null) {
            $workDay = "";
        }

        return "call pyzx_get_timeslot_definition('" . $merchantReference . "', '" . $exactDate . "', '" . $workDay . "')";
    }

    /**
     * @param string $merchantReference
     * @param string $exactDate
     * @param string $timeSlot
     * @param int $capacity
     * @param int|null $oldCapacity
     * @param int|null $idUser
     *
     * @return array
     */
    public function setTimeSlotExactDateCapacity(string $merchantReference, string $exactDate, string $timeSlot, int $capacity, ?int $oldCapacity, ?int $idUser): array
    {
        $selectSql = sprintf("call pyzx_set_timeslot_exact_date_capacity('%s', '%s', '%s', %d, %d, %d, '%s')", $merchantReference, $exactDate, $timeSlot, $capacity, $oldCapacity, $idUser, date('Y-m-d H:i:s'));

        $result = $this->getResult($selectSql);

        return $result;
    }
}
