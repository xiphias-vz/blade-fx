<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business;

use Pyz\Zed\ProductCartConnector\Business\Expander\ProductExpander;
use Pyz\Zed\ProductCartConnector\Business\InactiveItemsFilter\InactiveItemsFilter;
use Pyz\Zed\ProductCartConnector\Business\Validator\ProductValidator;
use Spryker\Zed\ProductCartConnector\Business\InactiveItemsFilter\InactiveItemsFilterInterface;
use Spryker\Zed\ProductCartConnector\Business\ProductCartConnectorBusinessFactory as SprykerProductCartConnectorBusinessFactory;

/**
 * @method \Spryker\Zed\ProductCartConnector\Business\ProductCartConnectorBusinessFactory getFactory()
 * @method \Spryker\Zed\ProductCartConnector\ProductCartConnectorConfig getConfig()
 */
class ProductCartConnectorBusinessFactory extends SprykerProductCartConnectorBusinessFactory
{
    /**
     * @return \Spryker\Zed\ProductCartConnector\Business\Expander\ProductExpanderInterface
     */
    public function createProductExpander()
    {
        return new ProductExpander(
            $this->getLocaleFacade(),
            $this->getProductFacade()
        );
    }

    /**
     * @return \Spryker\Zed\ProductCartConnector\Business\Validator\ProductValidatorInterface
     */
    public function createProductValidator()
    {
        return new ProductValidator(
            $this->getProductFacade()
        );
    }

    /**
     * @return \Spryker\Zed\ProductCartConnector\Business\InactiveItemsFilter\InactiveItemsFilterInterface
     */
    public function createInactiveItemsFilter(): InactiveItemsFilterInterface
    {
        return new InactiveItemsFilter(
            $this->getProductFacade(),
            $this->getStoreFacade(),
            $this->getMessengerFacade()
        );
    }
}
