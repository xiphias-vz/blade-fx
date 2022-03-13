<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Glue\PickupQueueRestApi;

use Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\AddToQueue\AddToQueueWriter;
use Pyz\Glue\PickupQueueRestApi\Processor\AddToQueue\AddToQueueWriterInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\GetOrdersQueue\GetOrdersQueueReader;
use Pyz\Glue\PickupQueueRestApi\Processor\GetOrdersQueue\GetOrdersQueueReaderInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapper;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapper;
use Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilder;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilderInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilder;
use Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilderInterface;
use Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiError;
use Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface;
use Spryker\Glue\Kernel\AbstractFactory;

class PickupQueueRestApiFactory extends AbstractFactory
{
    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\GetOrdersQueueResourceMapperInterface
     */
    public function createGetOrdersQueueMapper(): GetOrdersQueueResourceMapperInterface
    {
        return new GetOrdersQueueResourceMapper();
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\Mapper\AddToQueueResourceMapperInterface
     */
    public function createAddToQueueMapper(): AddToQueueResourceMapperInterface
    {
        return new AddToQueueResourceMapper();
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\Validation\RestApiErrorInterface
     */
    public function createRestApiError(): RestApiErrorInterface
    {
        return new RestApiError();
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\GetOrdersQueueRestResponseBuilderInterface
     */
    public function createGetOrdersQueueRestResponseBuilder(): GetOrdersQueueRestResponseBuilderInterface
    {
        return new GetOrdersQueueRestResponseBuilder(
            $this->getResourceBuilder(),
            $this->createGetOrdersQueueMapper()
        );
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\RestResponseBuilder\AddToQueueRestResponseBuilderInterface
     */
    public function createAddToQueueRestResponseBuilder(): AddToQueueRestResponseBuilderInterface
    {
        return new AddToQueueRestResponseBuilder(
            $this->getResourceBuilder(),
            $this->createAddToQueueMapper()
        );
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\GetOrdersQueue\GetOrdersQueueReaderInterface
     */
    public function createGetOrdersQueueReader(): GetOrdersQueueReaderInterface
    {
        return new GetOrdersQueueReader(
            $this->getPickupQueueClient(),
            $this->createGetOrdersQueueMapper(),
            $this->createGetOrdersQueueRestResponseBuilder(),
            $this->createRestApiError()
        );
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Processor\AddToQueue\AddToQueueWriterInterface
     */
    public function createAddToQueueWriter(): AddToQueueWriterInterface
    {
        return new AddToQueueWriter(
            $this->getPickupQueueClient(),
            $this->createAddToQueueMapper(),
            $this->createAddToQueueRestResponseBuilder(),
            $this->createRestApiError()
        );
    }

    /**
     * @return \Pyz\Glue\PickupQueueRestApi\Dependency\Client\PickupQueueRestApiToPickupQueueClientInterface
     */
    protected function getPickupQueueClient(): PickupQueueRestApiToPickupQueueClientInterface
    {
        return $this->getProvidedDependency(PickupQueueRestApiDependencyProvider::CLIENT_PICKUP_QUEUE);
    }
}
