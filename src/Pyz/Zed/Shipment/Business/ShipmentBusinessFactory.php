<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Shipment\Business;

use Pyz\Zed\Shipment\Business\Expander\QuoteShipmentExpander;
use Spryker\Zed\Shipment\Business\Expander\QuoteShipmentExpanderInterface;
use Spryker\Zed\Shipment\Business\ShipmentBusinessFactory as SprykerShipmentBusinessFactory;

/**
 * @method \Spryker\Zed\Shipment\Persistence\ShipmentQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Shipment\Persistence\ShipmentEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\Shipment\ShipmentConfig getConfig()
 * @method \Spryker\Zed\Shipment\Persistence\ShipmentRepositoryInterface getRepository()
 */
class ShipmentBusinessFactory extends SprykerShipmentBusinessFactory
{
    /**
     * @return \Spryker\Zed\Shipment\Business\Expander\QuoteShipmentExpanderInterface
     */
    public function createQuoteShipmentExpander(): QuoteShipmentExpanderInterface
    {
        return new QuoteShipmentExpander(
            $this->getShipmentService(),
            $this->createMethodReader(),
            $this->createExpenseSanitizer(),
            $this->createShipmentMapper(),
            $this->getCalculationFacade(),
            $this->getShipmentGroupsSanitizerPlugins()
        );
    }
}
