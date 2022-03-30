<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductDetailPage;

use Pyz\Shared\ProductImage\ProductImageConstants;
use Pyz\Shared\ProductPageSearch\ProductPageSearchConstants;
use Pyz\Shared\Sales\SalesConstants;
use Spryker\Yves\Kernel\AbstractBundleConfig;

class ProductDetailPageConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getDepositPrice(): int
    {
        return (int)$this->get(SalesConstants::BOTTLE_DEPOSIT_PRICE_IN_CENTS, 0);
    }

    /**
     * @return string[]
     */
    public function getSearchableAttributeKeys(): array
    {
        return $this->get(ProductPageSearchConstants::SEARCHABLE_ATTRIBUTE_KEYS, []);
    }

    /**
     * @return string
     */
    public function getImagesHostUrl(): string
    {
        return $this->get(ProductImageConstants::IMAGES_HOST_URL, '');
    }

    /**
     * @return string
     */
    public function getCodeBucket(): string
    {
        return getenv('SPRYKER_CODE_BUCKET');
    }
}
