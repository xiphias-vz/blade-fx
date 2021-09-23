<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Pyz\Shared\MerchantStorage\MerchantStorageConfig;
use Pyz\Shared\ShipmentStorage\ShipmentStorageConfig;
use Pyz\Zed\CmsStorage\CmsStorageConfig;
use Spryker\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\AvailabilityStorage\AvailabilityStorageConfig;
use Spryker\Shared\AvailabilityStorage\AvailabilityStorageConstants;
use Spryker\Shared\CategoryPageSearch\CategoryPageSearchConstants;
use Spryker\Shared\CategoryStorage\CategoryStorageConstants;
use Spryker\Shared\CmsPageSearch\CmsPageSearchConstants;
use Spryker\Shared\CmsStorage\CmsStorageConstants;
use Spryker\Shared\ContentStorage\ContentStorageConfig;
use Spryker\Shared\CustomerAccessStorage\CustomerAccessStorageConstants;
use Spryker\Shared\Event\EventConfig;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\FileManagerStorage\FileManagerStorageConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\MerchantOpeningHoursStorage\MerchantOpeningHoursStorageConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Shared\PriceProductStorage\PriceProductStorageConfig;
use Spryker\Shared\PriceProductStorage\PriceProductStorageConstants;
use Spryker\Shared\ProductImageStorage\ProductImageStorageConfig;
use Spryker\Shared\ProductPageSearch\ProductPageSearchConfig;
use Spryker\Shared\ProductPageSearch\ProductPageSearchConstants;
use Spryker\Shared\ProductQuantityStorage\ProductQuantityStorageConfig;
use Spryker\Shared\ProductStorage\ProductStorageConfig;
use Spryker\Shared\ProductStorage\ProductStorageConstants;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Shared\TaxProductStorage\TaxProductStorageConfig;
use Spryker\Shared\TaxStorage\TaxStorageConfig;
use Spryker\Shared\UrlStorage\UrlStorageConfig;
use Spryker\Shared\UrlStorage\UrlStorageConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions(): ArrayObject
    {
        $queueOptionCollection = new ArrayObject();
        $queueOptionCollection->append($this->createQueueOption(EventConstants::EVENT_QUEUE, EventConstants::EVENT_QUEUE_RETRY, EventConfig::EVENT_ROUTING_KEY_RETRY));
        $queueOptionCollection->append($this->createQueueOption(EventConstants::EVENT_QUEUE, EventConstants::EVENT_QUEUE_ERROR, EventConfig::EVENT_ROUTING_KEY_ERROR));
        $queueOptionCollection->append($this->createQueueOption(GlossaryStorageConstants::SYNC_STORAGE_QUEUE, GlossaryStorageConstants::SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(UrlStorageConstants::URL_SYNC_STORAGE_QUEUE, UrlStorageConstants::URL_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(AvailabilityStorageConstants::AVAILABILITY_SYNC_STORAGE_QUEUE, AvailabilityStorageConstants::AVAILABILITY_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CustomerAccessStorageConstants::CUSTOMER_ACCESS_SYNC_STORAGE_QUEUE, CustomerAccessStorageConstants::CUSTOMER_ACCESS_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CategoryStorageConstants::CATEGORY_SYNC_STORAGE_QUEUE, CategoryStorageConstants::CATEGORY_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE, FileManagerStorageConstants::FILE_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ProductStorageConstants::PRODUCT_SYNC_STORAGE_QUEUE, ProductStorageConstants::PRODUCT_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(PriceProductStorageConstants::PRICE_SYNC_STORAGE_QUEUE, PriceProductStorageConstants::PRICE_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CmsStorageConstants::CMS_SYNC_STORAGE_QUEUE, CmsStorageConstants::CMS_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CategoryPageSearchConstants::CATEGORY_SYNC_SEARCH_QUEUE, CategoryPageSearchConstants::CATEGORY_SYNC_SEARCH_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(CmsPageSearchConstants::CMS_SYNC_SEARCH_QUEUE, CmsPageSearchConstants::CMS_SYNC_SEARCH_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ProductPageSearchConstants::PRODUCT_SYNC_SEARCH_QUEUE, ProductPageSearchConstants::PRODUCT_SYNC_SEARCH_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE, FileManagerStorageConstants::FILE_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE, TaxStorageConfig::TAX_SET_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE, TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ContentStorageConfig::CONTENT_SYNC_STORAGE_QUEUE, ContentStorageConfig::CONTENT_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(MerchantOpeningHoursStorageConfig::MERCHANT_OPENING_HOURS_SYNC_STORAGE_QUEUE, MerchantOpeningHoursStorageConfig::MERCHANT_OPENING_HOURS_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE, MerchantStorageConfig::MERCHANT_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ShipmentStorageConfig::SHIPMENT_SYNC_STORAGE_QUEUE, ShipmentStorageConfig::SHIPMENT_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(ProductQuantityStorageConfig::PRODUCT_QUANTITY_SYNC_STORAGE_QUEUE, ProductQuantityStorageConfig::PRODUCT_QUANTITY_SYNC_STORAGE_ERROR_QUEUE));
        $queueOptionCollection->append($this->createQueueOption(MerchantSearchConfig::SYNC_SEARCH_MERCHANT, MerchantSearchConfig::SYNC_SEARCH_MERCHANT . '_error'));

        $queueOptionCollection->append(
            $this->createQueueOption(
                $this->get(LogConstants::LOG_QUEUE_NAME),
                $this->get(LogConstants::LOG_ERROR_QUEUE_NAME)
            )
        );

        return $queueOptionCollection;
    }

    /**
     * @param string $queueName
     * @param string $errorQueueName
     * @param string $routingKey
     *
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createQueueOption(string $queueName, string $errorQueueName, string $routingKey = 'error'): RabbitMqOptionTransfer
    {
        $queueOptionTransfer = new RabbitMqOptionTransfer();
        $queueOptionTransfer
            ->setQueueName($queueName)
            ->setDurable(true)
            ->setType('direct')
            ->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE)
            ->addBindingQueueItem($this->createQueueBinding($queueName))
            ->addBindingQueueItem($this->createErrorQueueBinding($errorQueueName, $routingKey));

        return $queueOptionTransfer;
    }

    /**
     * @param string $queueName
     *
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createQueueBinding(string $queueName): RabbitMqOptionTransfer
    {
        $queueOptionTransfer = new RabbitMqOptionTransfer();
        $queueOptionTransfer
            ->setQueueName($queueName)
            ->setDurable(true)
            ->setNoWait(false)
            ->addRoutingKey('');

        return $queueOptionTransfer;
    }

    /**
     * @param string $errorQueueName
     * @param string $routingKey
     *
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createErrorQueueBinding(string $errorQueueName, string $routingKey): RabbitMqOptionTransfer
    {
        $queueOptionTransfer = new RabbitMqOptionTransfer();
        $queueOptionTransfer
            ->setQueueName($errorQueueName)
            ->setDurable(true)
            ->setNoWait(false)
            ->addRoutingKey($routingKey);

        return $queueOptionTransfer;
    }

    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            EventConstants::EVENT_QUEUE => [
                EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
            ],
            GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION,
            UrlStorageConstants::URL_SYNC_STORAGE_QUEUE,
            $this->get(LogConstants::LOG_QUEUE_NAME),
            $this->getPublishQueueConfiguration(),
            $this->getSynchronizationQueueConfiguration()
        ];
    }

    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION,
            UrlStorageConstants::URL_SYNC_STORAGE_QUEUE,
            AvailabilityStorageConstants::AVAILABILITY_SYNC_STORAGE_QUEUE,
            CustomerAccessStorageConstants::CUSTOMER_ACCESS_SYNC_STORAGE_QUEUE,
            CategoryStorageConstants::CATEGORY_SYNC_STORAGE_QUEUE,
            ProductStorageConstants::PRODUCT_SYNC_STORAGE_QUEUE,
            PriceProductStorageConstants::PRICE_SYNC_STORAGE_QUEUE,
            CmsStorageConstants::CMS_SYNC_STORAGE_QUEUE,
            CategoryPageSearchConstants::CATEGORY_SYNC_SEARCH_QUEUE,
            CmsPageSearchConstants::CMS_SYNC_SEARCH_QUEUE,
            ProductPageSearchConstants::PRODUCT_SYNC_SEARCH_QUEUE,
            FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE,
            ContentStorageConfig::CONTENT_SYNC_STORAGE_QUEUE,
            TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE,
            TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE,
        ];
    }

    /**
     * @return string
     */
    protected function getDefaultBoundQueueNamePrefix(): string
    {
        return 'error';
    }

    /**
     * @return array
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            PublisherConfig::PUBLISH_QUEUE => [
                PublisherConfig::PUBLISH_ROUTING_KEY_RETRY => PublisherConfig::PUBLISH_RETRY_QUEUE,
                PublisherConfig::PUBLISH_ROUTING_KEY_ERROR => PublisherConfig::PUBLISH_ERROR_QUEUE,
            ],
            GlossaryStorageConfig::PUBLISH_TRANSLATION,
            UrlStorageConfig::PUBLISH_URL,
            AvailabilityStorageConfig::PUBLISH_AVAILABILITY,
            PriceProductStorageConfig::PUBLISH_PRICE_PRODUCT_ABSTRACT,
            PriceProductStorageConfig::PUBLISH_PRICE_PRODUCT_CONCRETE,
            ProductImageStorageConfig::PUBLISH_PRODUCT_ABSTRACT_IMAGE,
            ProductImageStorageConfig::PUBLISH_PRODUCT_CONCRETE_IMAGE,
            ProductPageSearchConfig::PUBLISH_PRODUCT_ABSTRACT_PAGE,
            ProductPageSearchConfig::PUBLISH_PRODUCT_CONCRETE_PAGE,
            ProductStorageConfig::PUBLISH_PRODUCT_ABSTRACT,
            ProductStorageConfig::PUBLISH_PRODUCT_CONCRETE,
        ];
    }
}
