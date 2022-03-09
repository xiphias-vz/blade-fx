<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Controller;

use Generated\Shared\Transfer\ProductAbstractTransfer;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Zed\ProductManagement\Communication\Controller\ViewController as SprykerViewController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class ViewController extends SprykerViewController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function variantAction(Request $request)
    {
        $idProductAbstract = $this->castId($request->get(
            self::PARAM_ID_PRODUCT_ABSTRACT
        ));

        $idProduct = $this->castId($request->get(
            self::PARAM_ID_PRODUCT
        ));

        $productTransfer = $this->getFactory()
            ->getProductFacade()
            ->findProductConcreteById($idProduct);

        if ($productTransfer === null) {
            $this->addErrorMessage('The product [%s] you are trying to edit, does not exist.', ['%s' => $idProduct]);

            return new RedirectResponse('/product-management/edit?id-product-abstract=' . $idProductAbstract);
        }

        $stockTypes = $this->getFactory()->getStockQueryContainer()->queryAllStockTypes()->find()->getData();
        $productTransfer = $this->getFactory()->createProductStockHelper()->addMissingStockTypes($productTransfer, $stockTypes);
        $productTransfer = $this->getFactory()->createProductStockHelper()->trimStockQuantities($productTransfer);

        $localeProvider = $this->getFactory()->createLocaleProvider();

        $attributes = [];
        $attributes[ProductManagementConstants::PRODUCT_MANAGEMENT_DEFAULT_LOCALE] = $productTransfer->getAttributes();
        foreach ($productTransfer->getLocalizedAttributes() as $localizedAttributesTransfer) {
            $attributes[$localizedAttributesTransfer->getLocale()->getLocaleName()] = $localizedAttributesTransfer->getAttributes();
        }

        $imageSetCollection = $this->getFactory()->getProductImageFacade()
            ->getProductImagesSetCollectionByProductId($productTransfer->getIdProductConcrete());

        $imageSets = $this->getProductImageSetCollection($imageSetCollection);

        $productAbstractTransfer = new ProductAbstractTransfer();

        $newSku = $productTransfer->getSku();

        if (strpos($newSku, '_')) {
            $underscorePosition = strpos($newSku, '_');
            $houseNumber = substr($newSku, $underscorePosition, 5);
            $withoutHouseNumber = str_replace($houseNumber, '', $newSku);
            $productTransfer->setSku($withoutHouseNumber);
        }

        $productAbstractTransfer->setSku($productTransfer->getAbstractSku());

        $isProductBundle = $this->getFactory()
            ->createProductTypeHelper()
            ->isProductBundleByProductAbstract($productAbstractTransfer);

        $isGiftCard = $this->getFactory()
            ->createProductTypeHelper()
            ->isGiftCardByProductAbstractTransfer($productAbstractTransfer);

        return $this->viewResponse([
            'currentLocale' => $this->getFactory()->getLocaleFacade()->getCurrentLocale()->getLocaleName(),
            'currentProduct' => $productTransfer->toArray(),
            'localeCollection' => $localeProvider->getLocaleCollection(),
            'attributeLocaleCollection' => $localeProvider->getLocaleCollection(true),
            'idProduct' => $productTransfer->getIdProductConcrete(),
            'idProductAbstract' => $idProductAbstract,
            'productAttributes' => $attributes,
            'imageSetCollection' => $imageSets,
            'isProductBundle' => $isProductBundle,
            'isGiftCard' => $isGiftCard,
        ]);
    }
}
