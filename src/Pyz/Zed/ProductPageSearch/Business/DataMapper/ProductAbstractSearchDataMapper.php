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
        if (isset($data['attributes']['einzelgewicht'])) {
            $einzelgewicht = $data['attributes']['einzelgewicht'];
        } elseif (isset($data['attributes']['einzelgewicht'][0])) {
            $einzelgewicht = $data['attributes']['einzelgewicht'][0];
        } else {
            $einzelgewicht = null;
        }

        $pricePerKg = null;
        if (isset($data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'])) {
            $pricePerKg = $data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'];
        }

        /**
         * TODO: FETCH CURRENCY
         */
        $this->pageMapBuilder
            ->addSearchResultData($pageMapTransfer, 'supplier', $data['attributes']['supplier'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'grundpreisinhalt', $data['attributes']['grundpreisinhalt'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'grundpreismasseinheit', $data['attributes']['grundpreismasseinheit'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'verpackungseinheit', $data['attributes']['verpackungseinheit'][0] ?? null);

        if ($einzelgewicht != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'einzelgewicht', $einzelgewicht);
        }

        if ($pricePerKg != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'pricePerKg', $pricePerKg);
        }

        return $pageMapTransfer;
    }
}
