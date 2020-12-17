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

        $this->pageMapBuilder
            ->addSearchResultData($pageMapTransfer, 'supplier', $data['attributes']['supplier'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'grundpreisinhalt', $data['attributes']['grundpreisinhalt'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'grundpreismasseinheit', $data['attributes']['grundpreismasseinheit'][0] ?? null)
            ->addSearchResultData($pageMapTransfer, 'verpackungseinheit', $data['attributes']['verpackungseinheit'][0] ?? null);

        return $pageMapTransfer;
    }
}
