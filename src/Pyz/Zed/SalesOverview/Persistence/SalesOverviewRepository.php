<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Persistence;

use Exception;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\Oms\OmsConfig;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\SalesOverview\Persistence\SalesOverviewPersistenceFactory getFactory()
 */
class SalesOverviewRepository extends AbstractRepository implements SalesOverviewRepositoryInterface
{
    /**
     * @param int $choice "1 => 'Order', 2 => 'Position', 3 => 'Stückzahl'"
     * @param string $deliveryDate
     * @param string $merchantReference
     *
     * @return array
     */
    public function getDataByChoiceFilter(int $choice, string $deliveryDate, string $merchantReference): array
    {
        $data = $this->getData($deliveryDate, $merchantReference);
        $statesToShow = [
            OmsConfig::STORE_STATE_READY_FOR_PICKING,
            OmsConfig::STORE_STATE_PICKED,
            OmsConfig::STORE_STATE_READY_FOR_COLLECT_BY_CUSTOMER,
            "order invoiced",
            "in picking"];
        $result = [];
        foreach ($data as $item) {
            $state = $item["status"];
            if (!array_key_exists($item["timeSlot"], $result)) {
                foreach ($statesToShow as $stateDef) {
                    $result[$item["timeSlot"]]["Total"][$stateDef] = 0;
                }
            }
            if (!array_key_exists($item["pickZone"], $result[$item["timeSlot"]])) {
                foreach ($statesToShow as $stateDef) {
                    $result[$item["timeSlot"]][$item["pickZone"]][$stateDef] = 0;
                }
            }
            switch ($choice) {
                case 1:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["ordersCount"];
                    break;
                case 2:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["orderItemsCount"];
                    break;
                case 3:
                    $result[$item["timeSlot"]][$item["pickZone"]][$state] = $item["orderItemsQuantity"];
                    break;
            }
        }
        if (!array_key_exists("Total", $result)) {
            $result["Total"] = [];
        }
        foreach ($result as $timeSlotKey => $timeSlotValue) {
            foreach ($timeSlotValue as $pickZoneKey => $pickZoneValue) {
                if (!array_key_exists($pickZoneKey, $result["Total"])) {
                    $result["Total"][$pickZoneKey] = [];
                    foreach ($statesToShow as $stateDef) {
                        $result["Total"][$pickZoneKey][$stateDef] = 0;
                    }
                }
                foreach ($pickZoneValue as $stateKey => $stateValue) {
                    if (!array_key_exists($stateKey, $result["Total"][$pickZoneKey])) {
                        $result["Total"][$pickZoneKey][$stateKey] = 0;
                    }
                    $result["Total"][$pickZoneKey][$stateKey] = $result["Total"][$pickZoneKey][$stateKey] + $stateValue;
                }
            }
        }

        return $result;
    }

    /**
     * @param string $deliveryDate "should be in format yyyy-mm-dd"
     * @param string $merchantReference
     *
     * @return array
     */
    private function getData(string $deliveryDate, string $merchantReference): array
    {
        $sql = "call pyzx_import_images('" . $deliveryDate . "', '" . $merchantReference . "');";

        return $this->getResult($sql, true);
    }

    /**
     * @param string $sql
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, bool $doFetch = true): array
    {
        try {
            $connection = Propel::getConnection();
            $statement = $connection->prepare($sql);
            $statement->execute();

            if ($doFetch) {
                return $statement->fetchAll(PDO::FETCH_NAMED);
            }
        } catch (Exception $ex) {
        }

        return [];
    }
}
