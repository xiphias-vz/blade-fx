<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantity\Business\Model\Validator;

use Generated\Shared\Transfer\CartPreCheckResponseTransfer;
use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\ProductQuantityTransfer;
use Spryker\Zed\ProductQuantity\Business\Model\ProductQuantityReaderInterface;
use Spryker\Zed\ProductQuantity\Business\Model\Validator\ProductQuantityRestrictionValidator as SpryProductQuantityRestrictionValidator;

class ProductQuantityRestrictionValidator extends SpryProductQuantityRestrictionValidator
{
    protected const ERROR_QUANTITY_LIMIT = 'cart.pre.check.quantity.limit';

    /**
     * @param \Spryker\Zed\ProductQuantity\Business\Model\ProductQuantityReaderInterface $productQuantityReader
     */
    public function __construct(ProductQuantityReaderInterface $productQuantityReader)
    {
        parent::__construct($productQuantityReader);
    }

    /**
     * @param string $sku
     * @param int $quantity
     * @param \Generated\Shared\Transfer\ProductQuantityTransfer $productQuantityTransfer
     * @param \Generated\Shared\Transfer\CartPreCheckResponseTransfer $responseTransfer
     *
     * @return void
     */
    protected function validateItem(
        string $sku,
        int $quantity,
        ProductQuantityTransfer $productQuantityTransfer,
        CartPreCheckResponseTransfer $responseTransfer
    ): void {
        $min = $productQuantityTransfer->getQuantityMin();
        $max = $productQuantityTransfer->getQuantityMax();
        $interval = $productQuantityTransfer->getQuantityInterval();
        /** @var string $att */
        $att = $productQuantityTransfer->getProduct()->getAttributes();
        $productName = json_decode($att, true)['name'];

        if ($quantity > 99) {
            $this->addViolationProductOrderLimit(static::ERROR_QUANTITY_LIMIT, $responseTransfer);
        }

        if ($quantity !== 0 && $quantity < $min) {
            $this->addViolation(static::ERROR_QUANTITY_MIN_NOT_FULFILLED, $sku, $min, $quantity, $responseTransfer);
        }

        if ($quantity !== 0 && ($quantity - $min) % $interval !== 0) {
            $this->addViolation(static::ERROR_QUANTITY_INTERVAL_NOT_FULFILLED, $sku, $interval, $quantity, $responseTransfer);
        }

        if ($max !== null && $quantity > $max) {
            $this->addViolationWithProductName(static::ERROR_QUANTITY_MAX_NOT_FULFILLED, $sku, $max, $quantity, $responseTransfer, $productName);
        }
    }

    /**
     * @param string $message
     * @param string $sku
     * @param int $restrictionValue
     * @param int $actualValue
     * @param \Generated\Shared\Transfer\CartPreCheckResponseTransfer $responseTransfer
     * @param string $productName
     *
     * @return void
     */
    protected function addViolationWithProductName(string $message, string $sku, int $restrictionValue, int $actualValue, CartPreCheckResponseTransfer $responseTransfer, string $productName): void
    {
        $responseTransfer->setIsSuccess(false);
        $responseTransfer->addMessage(
            (new MessageTransfer())
                ->setValue($message)
                ->setParameters(['%sku%' => $productName, '%restrictionValue%' => $restrictionValue, '%actualValue%' => $actualValue])
        );
    }

    /**
     * @param string $message
     * @param \Generated\Shared\Transfer\CartPreCheckResponseTransfer $responseTransfer
     *
     * @return void
     */
    protected function addViolationProductOrderLimit(string $message, CartPreCheckResponseTransfer $responseTransfer): void
    {
        $responseTransfer->setIsSuccess(false);
        $responseTransfer->addMessage(
            (new MessageTransfer())
                ->setValue($message)
        );
    }
}
