<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductDetailPage\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\ProductDetailPage\ProductDetailPageConfig;
use SprykerShop\Yves\ProductDetailPage\Controller\ProductController as SprykerShopProductController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Client\Product\ProductClientInterface getClient()
 * @method \Pyz\Yves\ProductDetailPage\ProductDetailPageFactory getFactory()
 * @method \Pyz\Yves\ProductDetailPage\ProductDetailPageConfig getConfig()
 */
class ProductController extends SprykerShopProductController
{
    protected const REFERENCE_AMOUNT_ATTRIBUTE_KEYS = [
        'Referenzmenge in %',
        'Fett Referenzmenge',
        'davon ges. Fettsäuren Referenzmenge',
        'Kohlenhydrate Referenzmenge',
        'davon Zucker Referenzmenge',
        'Eiweiß Referenzmenge',
        'Salz Referenzmenge',
    ];
    protected const ADDITIONAL_PRODUCT_INFORMATION_ATTRIBUTE_KEYS = [
        'Ursprungsland',
        'Handelsklasse',
        'Alkoholgehalt in %',
        'Hinweise',
        'Aufbewahrung',
        'Haltungsform',
        'Zubereitung',
        'Serviervorschlag',
    ];

    protected const VITAMIN_IDENTIFIER = 'Vitamin';
    protected const VITAMIN_DATA_REFERENCE_AMOUNT_ATTRIBUTE_KEY = 'Prozent Tagesdosis';

    /**
     * @param array $productData
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeDetailAction(array $productData, Request $request): array
    {
        $viewData = parent::executeDetailAction($productData, $request);

        $quoteTransfer = new QuoteTransfer();
        $quoteTransfer->addItem(
            (new ItemTransfer())->setIdProductAbstract($viewData['product']->getIdProductAbstract())
        );
        $viewData['cart'] = $quoteTransfer;
        $viewData['depositPrice'] = $this->getFactory()->getConfig()->getDepositPrice();
        $viewData['tags'] = $this->getFactory()->getConfig()->getSearchableAttributeKeys();

        /** @var \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer */
        $productViewTransfer = $viewData['product'];

        $productViewTransfer->setNutritionalInformationContainsReferenceAmount(
            $this->checkIfNutritionalInformationContainsReferenceAmount($productViewTransfer)
        );
        $productViewTransfer->setAdditionalProductInformationIsShown(
            $this->checkIfAdditionalProductInformationIsShown($productViewTransfer)
        );

        $viewData['zutatenText'] = "";
        if (array_key_exists('zutaten', $productViewTransfer->getAttributes())) {
            $searchZutaten = "Zutaten:";

            $zutatenAttributeData = $productViewTransfer->getAttributes()["zutaten"];
            if (str_starts_with($productViewTransfer->getAttributes()["zutaten"], $searchZutaten)) {
                $zutatenAttributeText = trim(substr($productViewTransfer->getAttributes()["zutaten"], strlen($searchZutaten), strlen($zutatenAttributeData)));
                $viewData['zutatenText'] = $zutatenAttributeText;
            } else {
                $viewData['zutatenText'] = $productViewTransfer->getAttributes()["zutaten"];
            }
        }

        $viewData['product'] = $productViewTransfer;
        $viewData['vitamins'] = $this->getVitaminData($productViewTransfer);

        if ($viewData['product']['pricePerKg'] != null) {
            $viewData['pricePerKg'] = $viewData['product']['pricePerKg'];
        } elseif (array_key_exists('preis_pro_kg', $productData["attributes"])) {
            $viewData['pricePerKg'] = $productData["attributes"]['preis_pro_kg'];
        } else {
            $viewData['pricePerKg'] = null;
        }

        if (array_key_exists('pet_feeding_table', $productViewTransfer["attributes"])) {
            $position = strpos($productViewTransfer["attributes"]["pet_feeding_table"], "<n>");
            $columnString = substr($productViewTransfer["attributes"]["pet_feeding_table"], 0, $position);
            $viewData['petColumns'] = explode('#', $columnString);
            $viewData['petRows'] = substr_count(substr($productViewTransfer["attributes"]["pet_feeding_table"], $position), "<n>");
            $variable = explode('<n>', substr($productViewTransfer["attributes"]["pet_feeding_table"], $position + 3));
            $petData = [];
            foreach ($variable as $key => $value) {
                $petData[$key] = array_values(explode('#', $value));
            }
            $viewData['rowData'] = $petData;
        } else {
            $viewData['petColumns'] = [];
            $viewData['petRows'] = [];
            $viewData['rowData'] = [];
        }

        $characteristics = [
            'product.info.additional.characteristics.bio' => $productData["attributes"]["bio"],
            'product.info.additional.characteristics.vegan' => $productData["attributes"]["vegan"],
            'product.info.additional.characteristics.vegetarian' => $productData["attributes"]["vegetarisch"],
            'product.info.additional.characteristics.laktosefrei' => $productData["attributes"]["laktosefrei"], 'product.info.additional.characteristics.glutenfrei' => $productData["attributes"]["glutenfrei"], 'product.info.additional.characteristics.fairtrade' => $productData["attributes"]["fairtrade"]];
        $searchFor = "1";
        $viewData['characteristics'] = array_filter($characteristics, function ($e) use ($searchFor) {
            return ($e == $searchFor);
        });

        return $viewData;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return array
     */
    protected function getVitaminData(ProductViewTransfer $productViewTransfer): array
    {
        $vitamins = [];
        foreach ($productViewTransfer->getAttributes() as $attributeKey => $attributeValue) {
            if (strpos($attributeKey, static::VITAMIN_IDENTIFIER . ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR) !== false) {
                [, $vitaminName, $vitaminParam] = explode(ProductDetailPageConfig::VITAMIN_ATTRIBUTE_KEY_SEPARATOR, $attributeKey);
                $vitamins[$vitaminName][$vitaminParam] = $attributeValue;
            }
        }

        return $vitamins;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return bool
     */
    protected function checkIfNutritionalInformationContainsReferenceAmount(ProductViewTransfer $productViewTransfer): bool
    {
        foreach ($productViewTransfer->getAttributes() as $attributeKey => $attributeData) {
            $isReferenceAmountAttribute = in_array($attributeKey, static::REFERENCE_AMOUNT_ATTRIBUTE_KEYS);
            $isVitaminWithReferenceAmount = strpos($attributeKey, static::VITAMIN_DATA_REFERENCE_AMOUNT_ATTRIBUTE_KEY);

            if (($isReferenceAmountAttribute || $isVitaminWithReferenceAmount) && $attributeData) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param \Generated\Shared\Transfer\ProductViewTransfer $productViewTransfer
     *
     * @return bool
     */
    protected function checkIfAdditionalProductInformationIsShown(ProductViewTransfer $productViewTransfer): bool
    {
        foreach ($productViewTransfer->getAttributes() as $attributeKey => $attributeData) {
            if (in_array($attributeKey, static::ADDITIONAL_PRODUCT_INFORMATION_ATTRIBUTE_KEYS) && $attributeData) {
                return true;
            }
        }

        return false;
    }
}
