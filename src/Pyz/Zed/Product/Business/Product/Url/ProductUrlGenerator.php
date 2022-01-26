<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product\Business\Product\Url;

use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\LocalizedUrlTransfer;
use Generated\Shared\Transfer\ProductAbstractTransfer;
use Generated\Shared\Transfer\ProductUrlTransfer;
use Spryker\Zed\Product\Business\Product\Url\ProductUrlGenerator as SprykerProductUrlGenerator;

class ProductUrlGenerator extends SprykerProductUrlGenerator
{
    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     *
     * @return \Generated\Shared\Transfer\ProductUrlTransfer
     */
    public function generateProductUrl(ProductAbstractTransfer $productAbstractTransfer)
    {
        $availableLocales = $this->localeFacade->getLocaleCollection();

        $productUrlTransfer = new ProductUrlTransfer();
        $productUrlTransfer->setAbstractSku($productAbstractTransfer->getSku());

        foreach ($availableLocales as $localeTransfer) {
            $url = $this->generateUrlByLocale($productAbstractTransfer, $localeTransfer);

            $localizedUrl = new LocalizedUrlTransfer();
            $localizedUrl->setLocale($localeTransfer);
            $localizedUrl->setUrl($url);

            $productUrlTransfer->addUrl($localizedUrl);
        }

        return $productUrlTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductAbstractTransfer $productAbstractTransfer
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return string
     */
    protected function generateUrlByLocale(ProductAbstractTransfer $productAbstractTransfer, LocaleTransfer $localeTransfer)
    {
        $locale = explode("_", $localeTransfer->getLocaleName())[0];
        $productNumber = explode("_", $productAbstractTransfer->getSku())[0];
        $productName = $this->utilTextService->generateSlug(
            trim(iconv('UTF-8', 'ASCII//IGNORE', $this->productAbstractNameGenerator->getLocalizedProductAbstractName($productAbstractTransfer, $localeTransfer)))
        );

        return '/' . $locale . '/' . $productName . '/' . $productNumber;
    }
}
