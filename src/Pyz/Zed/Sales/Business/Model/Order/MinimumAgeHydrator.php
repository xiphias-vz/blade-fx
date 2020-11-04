<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Pyz\Shared\Product\ProductConfig;
use Pyz\Zed\Product\Business\ProductFacadeInterface;

class MinimumAgeHydrator implements MinimumAgeHydratorInterface
{
    /**
     * @var \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    private $productFacade;

    /**
     * @param \Pyz\Zed\Product\Business\ProductFacadeInterface $productFacade
     */
    public function __construct(ProductFacadeInterface $productFacade)
    {
        $this->productFacade = $productFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function hydrateOrderTransfer(OrderTransfer $orderTransfer): OrderTransfer
    {
        $notCancelledItemSkus = $this->getNotCancelledItemSkus($orderTransfer);

        $concreteSkuToAttributesMap = $this->productFacade
            ->getConcreteSkuToAttributesMap(
                $notCancelledItemSkus,
                $orderTransfer->getStore()
            );

        foreach ($concreteSkuToAttributesMap as $concreteAttributes) {
            $age = (int)($concreteAttributes[ProductConfig::PRODUCT_ATTRIBUTE_KEY_AGE_CONTROL] ?? null);

            if ($age > $orderTransfer->getDeliveryMinimumAge()) {
                $orderTransfer->setDeliveryMinimumAge($age);
            }
        }

        return $orderTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return array
     */
    protected function getNotCancelledItemSkus(OrderTransfer $orderTransfer): array
    {
        $orderSkus = [];

        foreach ($orderTransfer->getItems() as $itemTransfer) {
            if ($itemTransfer->getCanceledAmount() === 0) {
                $orderSkus[$itemTransfer->getSku()] = $itemTransfer->getSku();
            }
        }

        return $orderSkus;
    }
}
