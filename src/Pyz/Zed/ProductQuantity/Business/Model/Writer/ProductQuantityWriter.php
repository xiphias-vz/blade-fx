<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business\Model\Writer;

use Generated\Shared\Transfer\ProductQuantityResponseTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;
use Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface;

class ProductQuantityWriter implements ProductQuantityWriterInterface
{
    /**
     * @var \Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface
     */
    protected $productQuantityEntityManager;

    /**
     * @param \Pyz\Zed\ProductQuantity\Persistence\ProductQuantityEntityManagerInterface $productQuantityEntityManager
     */
    public function __construct(
        ProductQuantityEntityManagerInterface $productQuantityEntityManager
    ) {
        $this->productQuantityEntityManager = $productQuantityEntityManager;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     *
     * @return \Generated\Shared\Transfer\ProductQuantityResponseTransfer
     */
    public function saveProductQuantity(
        ProductQuantityTransfer $productQuantityTransfer
    ): ProductQuantityResponseTransfer {
        $this->productQuantityEntityManager->saveProductQuantity($productQuantityTransfer);

        return (new ProductQuantityResponseTransfer())
            ->setIsSuccessful(true);
    }
}
