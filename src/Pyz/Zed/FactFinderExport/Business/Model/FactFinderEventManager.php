<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\FactFinderExport\Business\Model;

use DateTime;
use Elastica\JSON;
use Orm\Zed\FactFinderExport\Persistence\PyzFactFinderEvent;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;

class FactFinderEventManager
{
    public const FF_EVENT_RECORD_UPDATE = 'records.put';
    public const FF_EVENT_RECORD_INSERT = 'records.post';
    public const FF_EVENT_RECORD_DELETE = 'records.delete';
    public const FF_EVENT_GEODATA_UPDATE = 'geodata.post';
    public const FF_EVENT_GEODATA_DELETE = 'geodata.delete';

    /**
     * @param string $eventName
     * @param int $idProductAbstract
     *
     * @return void
     */
    public static function addEvent(string $eventName, int $idProductAbstract)
    {
        $eventData = new PyzFactFinderEvent();
        $eventData
            ->setFkProductAbstract($idProductAbstract)
            ->setEventName($eventName)
            ->setCreatedAt((new DateTime())->getTimestamp());
        $eventData->save();
        $newEvent = "";
        if ($eventName === static::FF_EVENT_RECORD_INSERT || $eventName === static::FF_EVENT_RECORD_UPDATE) {
            $newEvent = static::FF_EVENT_GEODATA_UPDATE;
        } elseif ($eventName == static::FF_EVENT_RECORD_DELETE) {
            $newEvent = static::FF_EVENT_GEODATA_DELETE;
        }
        if (!empty($newEvent)) {
            $eventData = new PyzFactFinderEvent();
            $eventData
                ->setFkProductAbstract($idProductAbstract)
                ->setEventName($newEvent)
                ->setCreatedAt((new DateTime())->getTimestamp());
            $eventData->save();
        }
    }

    /**
     * @param string $eventName
     * @param array $idProductAbstractList
     *
     * @return void
     */
    public function clearEvents(string $eventName, array $idProductAbstractList)
    {
        if (count($idProductAbstractList) > 0) {
            $sql = "delete from pyz_fact_finder_event where event_name = '" . $eventName . "' and fk_product_abstract in(" . implode(",", $idProductAbstractList) . ")";
            $this->getResult($sql);
        }
    }

    /**
     * @return array
     */
    public function publishPreparedEvents(): array
    {
        $events = [
            static::FF_EVENT_RECORD_DELETE,
            static::FF_EVENT_GEODATA_DELETE,
            static::FF_EVENT_RECORD_INSERT,
            static::FF_EVENT_RECORD_UPDATE,
            static::FF_EVENT_GEODATA_UPDATE,
        ];

        $result = [];
        foreach ($events as $event) {
            $dataDb = $this->getResult("call pyzx_get_factfinder_event('" . $event . "')");
            if (count($dataDb) > 0) {
                $data = [];
                foreach ($dataDb as $item) {
                    $data[] = JSON::Parse($item["publishData"]);
                }
                $itemsCount = count($data);
                $result[$event] = FactFinderApiClient::execByEventName($event, $data);
                for ($i = 0; $i < $itemsCount; $i++) {
                    $result[$event][$i]["fk_product_abstract"] = $dataDb[$i]["fk_product_abstract"];
                    if (isset($result[$event][$i]["success"])) {
                        if (!$result[$event][$i]["success"]) {
                            $result[$event][$i]["data"] = $data[$i];
                        }
                    } else {
                        $result[$event][$i]["success"] = false;
                        $result[$event][$i]["data"] = $data[$i];
                    }
                }
            }
        }

        return $result;
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    private function getResult(string $sql): array
    {
        $connection = Propel::getConnection();
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_NAMED);

        return $data;
    }
}
