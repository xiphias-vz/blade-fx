<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business\DataMapper;

use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\PageMapTransfer;
use Spryker\Zed\ProductPageSearch\Business\DataMapper\ProductAbstractSearchDataMapper as SprykerProductAbstractSearchDataMapper;

class ProductAbstractSearchDataMapper extends SprykerProductAbstractSearchDataMapper
{
    /**
     * @param array $data
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return \Generated\Shared\Transfer\PageMapTransfer
     */
    protected function buildPageMap(array $data, LocaleTransfer $localeTransfer): PageMapTransfer
    {
        $pageMapTransfer = parent::buildPageMap($data, $localeTransfer);

        $einzelgewicht = null;
        $pricePerKg = null;
        $sortingOrder = null;

        if (isset($data['attributes']['einzelgewicht'][0])) {
            $einzelgewicht = $data['attributes']['einzelgewicht'][0];
        } elseif (isset($data['attributes']['einzelgewicht'])) {
            $einzelgewicht = $data['attributes']['einzelgewicht'];
        } else {
            $einzelgewicht = null;
        }

        /**
         * TODO: FETCH CURRENCY
         */

        if (isset($data['attributes']['sortingorder'][0])) {
            $sortingOrder = (int)$data['attributes']['sortingorder'][0];
            $this->pageMapBuilder->addIntegerSort($pageMapTransfer, 'sortingOrder', (int)$data['attributes']['sortingorder'][0]);
        }

        if (isset($data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'])) {
            $pricePerKg = $data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'];
        }

        $supplier = null;
        if (isset($data['attributes']['supplier'][0])) {
            $supplier = $data['attributes']['supplier'][0];
        }

        $grundpreisinhalt = null;
        if (isset($data['attributes']['grundpreisinhalt'][0])) {
            $grundpreisinhalt = $data['attributes']['grundpreisinhalt'][0];
        }

        $grundpreismasseinheit = null;
        if (isset($data['attributes']['grundpreismasseinheit'][0])) {
            $grundpreismasseinheit = $data['attributes']['grundpreismasseinheit'][0];
        }

        $verpackungseinheit = null;
        if (isset($data['attributes']['verpackungseinheit'][0])) {
            $verpackungseinheit = $data['attributes']['verpackungseinheit'][0];
        }

        $this->addIfNotNull($einzelgewicht, 'einzelgewicht', $pageMapTransfer);
        $this->addIfNotNull($pricePerKg, 'pricePerKg', $pageMapTransfer);
        $this->addIfNotNull($supplier, 'supplier', $pageMapTransfer);
        $this->addIfNotNull($grundpreisinhalt, 'grundpreisinhalt', $pageMapTransfer);
        $this->addIfNotNull($grundpreismasseinheit, 'grundpreismasseinheit', $pageMapTransfer);
        $this->addIfNotNull($verpackungseinheit, 'verpackungseinheit', $pageMapTransfer);
        $this->addIfNotNull($sortingOrder, 'sortingorder', $pageMapTransfer);

        return $pageMapTransfer;
    }

    /**
     * @param string|null $value
     * @param string $name
     * @param \Generated\Shared\Transfer\PageMapTransfer $pageMapTransfer
     *
     * @return void
     */
    public function addIfNotNull(?string $value, string $name, PageMapTransfer $pageMapTransfer)
    {
        if ($value != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, $name, $value);
        }
    }
}
