<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock\Hook;

use DateTime;
use Generated\Shared\Transfer\AvailabilityNotificationDataTransfer;
use Generated\Shared\Transfer\EventEntityTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Orm\Zed\Availability\Persistence\SpyAvailability;
use Orm\Zed\Availability\Persistence\SpyAvailabilityAbstract;
use Orm\Zed\DataImport\Persistence\PyzDataImportEvent;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use PDO;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Spryker\Zed\Availability\Business\AvailabilityFacadeInterface;
use Spryker\Zed\Kernel\Locator;
use Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportBusinessFactory getFactory()
 */
class UpdateAvailabilityAfterImport implements UpdateAvailabilityAfterImportInterface
{
    /**
     * @var \Spryker\Zed\Availability\Business\AvailabilityFacadeInterface
     */
    protected $availabilityFacade;

    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface|null
     */
    protected static $eventFacade;

    /**
     * @param \Spryker\Zed\Availability\Business\AvailabilityFacadeInterface $availabilityFacade
     */
    public function __construct(AvailabilityFacadeInterface $availabilityFacade)
    {
        $this->availabilityFacade = $availabilityFacade;
    }

    /**
     * @return void
     */
    public function updateAvailability(): void
    {
        $counter = 0;
        $connection = Propel::getConnection();

        $storeEntities = $this->getStoreQuery()->find($connection);
        $stores = $this->createStoreMapper()->mapStoreEntitiesToStoreTransfers($storeEntities->getArrayCopy());

        $this->updateNewItems($connection, $counter, $stores);
        $this->updateExistingItems($connection, $counter, $stores);
    }

    private const QUERY_BASE = "
        SELECT s.id_store, s.name as store_name, ss.is_active as stock_is_active,
               ssp.fk_product, ssp.is_never_out_of_stock, ssp.quantity,
               sp.sku, sp.is_active as product_is_active,
               sopr.reservation_quantity,
               sa.id_availability, sa.is_never_out_of_stock as av_is_never_out_of_stock, sa.quantity as av_quantity,
               saa.id_availability_abstract, saa.abstract_sku, saa.quantity as ab_quantity,
               sas.id_availability_storage,
               IF(ssp.is_never_out_of_stock = true or ssp.quantity = 99999, 999999, ssp.quantity - ifnull(sopr.reservation_quantity, 0)) as real_quantity
        FROM spy_store s
                LEFT JOIN spy_stock_store sss ON (s.id_store = sss.fk_store)
                LEFT JOIN spy_stock ss ON (sss.fk_stock = ss.id_stock)
                LEFT JOIN spy_stock_product ssp on (ss.id_stock = ssp.fk_stock)
                LEFT JOIN spy_product sp ON (ssp.fk_product=sp.id_product)
                LEFT JOIN spy_oms_product_reservation sopr on s.id_store = sopr.fk_store AND sp.sku = sopr.sku
                LEFT JOIN spy_availability sa on s.id_store = sa.fk_store AND sp.sku = sa.sku
                LEFT JOIN spy_availability_abstract saa on sa.fk_availability_abstract = saa.id_availability_abstract
                LEFT JOIN spy_availability_storage sas on sa.fk_availability_abstract = sas.fk_availability_abstract
    ";

    private const FILTER_NEW = " WHERE not sp.sku is null and (sa.id_availability is null or saa.id_availability_abstract is null or sas.id_availability_storage is null)";
    private const FILTER_CHANGED = "
    WHERE (
    (ssp.is_never_out_of_stock <> sa.is_never_out_of_stock)
    or ((ssp.quantity - ifnull(sopr.reservation_quantity, 0)) <> ifnull(sa.quantity, 0))
    or ((ssp.quantity - ifnull(sopr.reservation_quantity, 0)) <> ifnull(saa.quantity, 0))
    )
    ";

    /**
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, ConnectionInterface $connection, bool $doFetch = true): array
    {
        $statement = $connection->prepare($sql);
        $statement->execute();

        if ($doFetch) {
            return $statement->fetchAll(PDO::FETCH_NAMED);
        }

        return [];
    }

    /**
     * @return \Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper
     */
    public function createStoreMapper(): StoreMapper
    {
        return new StoreMapper();
    }

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function getStoreQuery(): SpyStoreQuery
    {
        return new SpyStoreQuery();
    }

    /**
     * @param array $stores
     * @param int $id
     *
     * @return \Generated\Shared\Transfer\StoreTransfer|null
     */
    private function getStoreById(array $stores, int $id): ?StoreTransfer
    {
        foreach ($stores as $store) {
            if ($store->getIdStore() == $id) {
                return $store;
            }
        }

        return null;
    }

    /**
     * Added here for keeping the BC, needs to inject this from outside
     *
     * @return void
     */
    protected function loadEventFacade()
    {
        if (!static::$eventFacade) {
            $locatorClassName = Locator::class;
            static::$eventFacade = $locatorClassName::getInstance()->event()->facade();
        }
    }

    /**
     * @param string $eventName
     * @param string $entityId
     * @param string $className
     * @param string $data
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     *
     * @return void
     */
    public function addPublishEvents(string $eventName, string $entityId, string $className, string $data, ConnectionInterface $connection)
    {
        $eventData = new PyzDataImportEvent();
        $eventData
            ->setEntityId($entityId)
            ->setEventName($eventName)
            ->setClassName($className)
            ->setEventData($data)
            ->setCreatedAt((new DateTime())->getTimestamp());
        $eventData->save($connection);
    }

    /**
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     * @param int $counter
     * @param array $stores
     *
     * @return void
     */
    protected function updateNewItems(ConnectionInterface $connection, int $counter, array $stores): void
    {
        $data = $this->getResult(self::QUERY_BASE . self::FILTER_NEW, $connection, true);
        $connection->beginTransaction();
        $availAbstractEntities = [];
        foreach ($data as $item) {
            $counter++;
            $sku = $item["sku"];
            $quantity = $item["real_quantity"];
            if (empty($quantity)) {
                $quantity = 0;
            }
            $availAbstractEntity = new SpyAvailabilityAbstract();
            $availEntity = new SpyAvailability();
            if ($item["id_availability_abstract"] == null) {
                $availAbstractEntity
                    ->setFkStore($item["id_store"])
                    ->setAbstractSku($sku . "_abstract")
                    ->setQuantity($quantity);
                $availAbstractEntity->save($connection);
                $availEntity->setSpyAvailabilityAbstract($availAbstractEntity);
                $availAbstractEntities[] = $availAbstractEntity;

                $event = (new AvailabilityNotificationDataTransfer())
                    ->setSku($sku)
                    ->setStore($this->getStoreById($stores, $item["id_store"]));
                $this->addPublishEvents("availability_notification", $sku, "AvailabilityNotificationDataTransfer", $event->serialize(), $connection);
            } else {
                $availEntity->setFkAvailabilityAbstract($item["id_availability_abstract"]);
            }
            if ($item["av_quantity"] == null) {
                $availEntity
                    ->setFkStore($item["id_store"])
                    ->setIsNeverOutOfStock($item["is_never_out_of_stock"])
                    ->setQuantity($quantity)
                    ->setSku($sku);
                $availEntity->save($connection);
            }
            if ($item["id_availability_storage"] == null) {
                if ($item["id_availability_abstract"] != null) {
                    $event = (new AvailabilityNotificationDataTransfer())
                        ->setSku($sku)
                        ->setStore($this->getStoreById($stores, $item["id_store"]));
                    $this->addPublishEvents("availability_notification", $sku, "AvailabilityNotificationDataTransfer", $event->serialize(), $connection);
                    $availAbstractEntities[] = $availAbstractEntity->setIdAvailabilityAbstract($item["id_availability_abstract"])->setAbstractSku($item["abstract_sku"]);
                }
            }
            if ($counter % 1000 == 0) {
                $connection->commit();
                $connection->beginTransaction();
            }
        }
        $connection->commit();
        $connection->beginTransaction();

        foreach ($availAbstractEntities as $availAbstractEntity) {
            $event = (new EventEntityTransfer())
                ->setId($availAbstractEntity->getIdAvailabilityAbstract())
                ->setEvent("Entity.spy_availability_abstract.create")
                ->setName("spy_availability_abstract")
                ->setForeignKeys(["spy_availability_abstract.fk_store" => $item["id_store"]])
                ->setModifiedColumns(["spy_availability_abstract.abstract_sku", "spy_availability_abstract.fk_store", "spy_availability_abstract.quantity"]);

            $this->addPublishEvents("Entity.spy_availability_abstract.create", $availAbstractEntity->getAbstractSku(), "EventEntityTransfer", $event->serialize(), $connection);
        }
        $connection->commit();
    }

    /**
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     * @param int $counter
     * @param array $stores
     *
     * @return void
     */
    protected function updateExistingItems(ConnectionInterface $connection, int $counter, array $stores): void
    {
        $data = $this->getResult(self::QUERY_BASE . self::FILTER_CHANGED, $connection, true);
        $connection->beginTransaction();
        foreach ($data as $item) {
            $counter++;
            $sku = $item["sku"];
            $quantity = $item["real_quantity"];
            if (empty($quantity)) {
                $quantity = 0;
            }
            $availAbstractEntity = new SpyAvailabilityAbstract();
            $availEntity = new SpyAvailability();

            $availAbstractEntity
                ->setIdAvailabilityAbstract($item["id_availability_abstract"])
                ->setQuantity($quantity);
            $connection->exec("update spy_availability_abstract set quantity = " . $availAbstractEntity->getQuantity() . " where id_availability_abstract = " . $availAbstractEntity->getIdAvailabilityAbstract());
            //$availAbstractEntity->save($connection);

            $availEntity
                ->setIdAvailability($item["id_availability"])
                ->setIsNeverOutOfStock($item["is_never_out_of_stock"])
                ->setQuantity($quantity);
            $connection->exec("update spy_availability set quantity = " . $availAbstractEntity->getQuantity() . ", is_never_out_of_stock = " . $item["is_never_out_of_stock"] . "  where id_availability = " . $availEntity->getIdAvailability());
            //$availEntity->save($connection);

            $event = (new AvailabilityNotificationDataTransfer())
                ->setSku($sku)
                ->setStore($this->getStoreById($stores, $item["id_store"]));
            $this->addPublishEvents("availability_notification", $sku, "AvailabilityNotificationDataTransfer", $event->serialize(), $connection);

            $event = (new EventEntityTransfer())
                ->setId($availEntity->getIdAvailability())
                ->setEvent("Entity.spy_availability.update")
                ->setName("spy_availability")
                ->setForeignKeys([
                    "spy_availability.fk_availability_abstract" => 65704,
                    "spy_availability.fk_store" => $item["id_store"]])
                ->setModifiedColumns(["spy_availability.quantity", "spy_availability.is_never_out_of_stock"]);
            $this->addPublishEvents("Entity.spy_availability.update", $sku, "EventEntityTransfer", $event->serialize(), $connection);

            if ($counter % 1000 == 0) {
                $connection->commit();
                $connection->beginTransaction();
            }
        }
        $connection->commit();
    }
}
