<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business;

use Pyz\Zed\Cart\Business\Model\Operation;
use Spryker\Zed\Cart\Business\CartBusinessFactory as SprykerCartBusinessFactory;

class CartBusinessFactory extends SprykerCartBusinessFactory
{
    /**
     * @return \Spryker\Zed\Cart\Business\Model\OperationInterface
     */
    public function createCartOperation()
    {
        $operation = new Operation(
            $this->createStorageProvider(),
            $this->getCalculatorFacade(),
            $this->getMessengerFacade(),
            $this->getQuoteFacade(),
            $this->getItemExpanderPlugins(),
            $this->getCartPreCheckPlugins(),
            $this->getPostSavePlugins(),
            $this->getTerminationPlugins(),
            $this->getCartRemovalPreCheckPlugins(),
            $this->getPostReloadItemsPlugins(),
            $this->getCartBeforePreCheckNormalizerPlugins()
        );

        $operation->setPreReloadLoadPlugins($this->getPreReloadItemsPlugins());

        return $operation;
    }
}
