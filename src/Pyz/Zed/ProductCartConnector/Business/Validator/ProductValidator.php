<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCartConnector\Business\Validator;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Spryker\Zed\ProductCartConnector\Business\Validator\ProductValidator as SprykerProductValidator;
use Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToProductInterface;

class ProductValidator extends SprykerProductValidator
{
    /**
     * @var \Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToProductInterface
     */
    protected $productFacade;

    /**
     * @param \Spryker\Zed\ProductCartConnector\Dependency\Facade\ProductCartConnectorToProductInterface $productFacade
     */
    public function __construct(ProductCartConnectorToProductInterface $productFacade)
    {
        parent::__construct($productFacade);
    }

    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartPreCheckResponseTransfer
     */
    public function validateItems(CartChangeTransfer $cartChangeTransfer)
    {
        $responseTransfer = new CartPreCheckResponseTransfer();

        $skus = $this->getProductSkusFromCartChangeTransfer($cartChangeTransfer);
        $indexedProductConcreteTransfers = $this->getIndexedProductConcretesByProductConcreteSkus($skus[static::SKU_CONCRETE]);
        $indexedProductAbstractTransfers = $this->getIndexedProductAbstractsByProductAbstractSkus($skus[static::SKU_ABSTRACT]);

        foreach ($cartChangeTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getSku()) {
                if ($this->validateConcreteItem($itemTransfer, $responseTransfer, $indexedProductConcreteTransfers) === false) {
                    continue;
                }

                continue;
            }

            $this->validateAbstractItem($itemTransfer, $responseTransfer, $indexedProductAbstractTransfers);
        }

        return $this->setResponseSuccessful($responseTransfer);
    }
}
