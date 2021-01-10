<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductPageSearch\Business\DataMapper;

use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\PageMapTransfer;
use Spryker\Zed\ProductPageSearch\Business\DataMapper\ProductAbstractSearchDataMapper as SprykerProductAbstractSearchDataMapper;
use Symfony\Component\Config\Definition\Exception\Exception;

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

        try {
            if (isset($data['attributes']['einzelgewicht'])) {
                $einzelgewicht = $data['attributes']['einzelgewicht'];
            } elseif (isset($data['attributes']['einzelgewicht'][0])) {
                $einzelgewicht = $data['attributes']['einzelgewicht'][0];
            } else {
                $einzelgewicht = null;
            }

            /**
             * TODO: FETCH CURRENCY
             */

            if (isset($data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'])) {
                $pricePerKg = $data['prices']['EUR']['PRICE_PER_KG']['DEFAULT'];
            }
        } catch (Exception $e) {
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

        if ($einzelgewicht != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'einzelgewicht', $einzelgewicht);
        }

        if ($pricePerKg != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'pricePerKg', $pricePerKg);
        }

        if ($supplier != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'supplier', $supplier);
        }

        if ($grundpreisinhalt != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'grundpreisinhalt', $grundpreisinhalt);
        }

        if ($grundpreismasseinheit != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'grundpreismasseinheit', $grundpreismasseinheit);
        }

        if ($verpackungseinheit != null) {
            $this->pageMapBuilder
                ->addSearchResultData($pageMapTransfer, 'verpackungseinheit', $verpackungseinheit);
        }

        return $pageMapTransfer;
    }
}
