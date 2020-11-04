<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductComparativePriceWidget\Widget;

use Generated\Shared\Transfer\ProductComparativePriceTransfer;
use Spryker\Yves\Kernel\Widget\AbstractWidget;

/**
 * @method \Pyz\Yves\ProductComparativePriceWidget\ProductComparativePriceWidgetFactory getFactory()
 */
class ProductComparativePriceWidget extends AbstractWidget
{
    /**
     * @param string|null $productPrice
     * @param string|null $productSalesUnit
     * @param string|null $productSalesVolume
     */
    public function __construct(?string $productPrice, ?string $productSalesUnit, ?string $productSalesVolume)
    {
        $productComparativePriceTransfer = $this->getProductComparativePriceTransfer($productPrice, $productSalesUnit, $productSalesVolume);

        $this->addParameter('productComparativePrice', $productComparativePriceTransfer);
    }

    /**
     * @param string|null $productPrice
     * @param string|null $productSalesUnit
     * @param string|null $productSalesVolume
     *
     * @return \Generated\Shared\Transfer\ProductComparativePriceTransfer
     */
    private function getProductComparativePriceTransfer(?string $productPrice, ?string $productSalesUnit, ?string $productSalesVolume): ProductComparativePriceTransfer
    {
        if (empty($productPrice)) {
            return new ProductComparativePriceTransfer();
        }

        return $this->getFactory()
            ->createProductComparativePriceCalculator()
            ->calculate($productPrice, $productSalesUnit, $productSalesVolume);
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        return 'ProductComparativePriceWidget';
    }

    /**
     * @return string
     */
    public static function getTemplate(): string
    {
        return '@ProductComparativePriceWidget/views/product-comparative-price-widget/product-comparative-price-widget.twig';
    }
}
