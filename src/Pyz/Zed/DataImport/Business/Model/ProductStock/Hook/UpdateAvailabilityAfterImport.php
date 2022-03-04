<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock\Hook;

use DateTime;
use Orm\Zed\DataImport\Persistence\PyzDataImportEvent;
use PDO;
use PDOException;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Pyz\Shared\PropelExtension\PropelExtension;
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Availability\Business\AvailabilityFacadeInterface;
use Spryker\Zed\Availability\Dependency\AvailabilityEvents;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\ProductImage\Dependency\ProductImageEvents;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportBusinessFactory getFactory()
 */
class UpdateAvailabilityAfterImport implements UpdateAvailabilityAfterImportInterface, AvailabilityEvents
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
        $connection = Propel::getConnection();

        $this->updateProductImages($connection);
        PropelExtension::execute("call pyzx_availability_update()");
    }

    /**
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, ConnectionInterface $connection, bool $doFetch = true): array
    {
        try {
            $statement = $connection->prepare($sql);
            $statement->execute();

            if ($doFetch) {
                return $statement->fetchAll(PDO::FETCH_NAMED);
            }
        } catch (PDOException $ex) {
        }

        return [];
    }

    /**
     * @param string $eventName
     * @param string $entityId
     * @param string|null $className
     * @param string|null $data
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     *
     * @return void
     */
    public function addPublishEvents(string $eventName, string $entityId, ?string $className, ?string $data, ConnectionInterface $connection)
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
     *
     * @return void
     */
    protected function updateProductImages(ConnectionInterface $connection): void
    {
        $imagesPublish = $this->getResult($this->getImagesToPublishSql(), $connection, true);
        $connection->beginTransaction();
        $counter = 0;
        foreach ($imagesPublish as $image) {
            $counter++;
            if ($image["publish"]) {
                $this->addPublishEvents(
                    ProductImageEvents::PRODUCT_IMAGE_PRODUCT_CONCRETE_PUBLISH,
                    $image["fk_product"],
                    null,
                    null,
                    $connection
                );
                if (!empty($image["fk_product_abstract"])) {
                    $this->addPublishEvents(
                        ProductEvents::PRODUCT_ABSTRACT_PUBLISH,
                        $image["fk_product_abstract"],
                        null,
                        null,
                        $connection
                    );
                    $this->addPublishEvents(
                        ProductImageEvents::PRODUCT_IMAGE_PRODUCT_ABSTRACT_PUBLISH,
                        $image["fk_product_abstract"],
                        null,
                        null,
                        $connection
                    );
                }
            } else {
                $this->addPublishEvents(
                    ProductImageEvents::PRODUCT_IMAGE_PRODUCT_CONCRETE_UNPUBLISH,
                    $image["fk_product"],
                    null,
                    null,
                    $connection
                );
            }
            if ($counter % 1000 === 0) {
                $connection->commit();
            }
        }
        $connection->commit();
    }

    /**
     * @return string
     */
    private function getImagesToPublishSql(): string
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');
        $fac = new DataImportConfig();
        $url = $fac->getImagesHostUrl();
        if ($storeCodeBucket != "CZ") {
            $url = $url . '/';
        }
        $local = array_values(Store::getInstance()->getLocales())[0];
        $local = str_replace("-", "_", $local);
        $sql = "call pyzx_import_images('" . $url . "', '" . $local . "');";

        return $sql;
    }
}
