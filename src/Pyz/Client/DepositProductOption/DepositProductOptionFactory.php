<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption;

use Pyz\Client\DepositProductOption\DepositProductOption\DepositProductOptionReader;
use Pyz\Client\DepositProductOption\DepositProductOption\DepositProductOptionReaderInterface;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface;

class DepositProductOptionFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\ProductOptionStorage\ProductOptionStorageClientInterface
     */
    public function getProductOptionStorageClient(): ProductOptionStorageClientInterface
    {
        return $this->getProvidedDependency(DepositProductOptionDependencyProvider::CLIENT_PRODUCT_OPTION_STORAGE);
    }

    /**
     * @return \Pyz\Client\DepositProductOption\DepositProductOption\DepositProductOptionReaderInterface
     */
    public function createDepositProductOptionReader(): DepositProductOptionReaderInterface
    {
        return new DepositProductOptionReader($this->getProductOptionStorageClient());
    }
}
