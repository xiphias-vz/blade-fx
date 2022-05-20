<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ProductDetailPage\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\ProductViewTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Pyz\Shared\FactFinder\Business\Api\FactFinderApiClient;
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
    protected const PRODUCT_TAG = 'product';

    /**
     * @param array $productData
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeDetailAction(array $productData, Request $request): array
    {
        $imagesHostUrl = $this->getFactory()->getConfig()->getImagesHostUrl();
        $pictogramsImageUrl = [];
        $viewData = parent::executeDetailAction($productData, $request);

        if (isset($viewData[static::PRODUCT_TAG]['attributes']['ghs_piktogramme'])
            &&
            !empty($viewData[static::PRODUCT_TAG]['attributes']['ghs_piktogramme'])
        ) {
            $pictograms = explode(';', $viewData[static::PRODUCT_TAG]['attributes']['ghs_piktogramme']);

            foreach ($pictograms as $pictogram) {
                array_push($pictogramsImageUrl, $imagesHostUrl . '/' . $pictogram . '.png');
            }
            $viewData['pictograms'] = $pictogramsImageUrl;
        }

        if (isset($viewData[static::PRODUCT_TAG]['attributes']['metatitle'])) {
            $viewData[static::PRODUCT_TAG]['metaTitle'] = $viewData[static::PRODUCT_TAG]['attributes']['metatitle'];
        }
        if (isset($viewData[static::PRODUCT_TAG]['attributes']['metadescription'])) {
            $viewData[static::PRODUCT_TAG]['metaDescription'] = $viewData[static::PRODUCT_TAG]['attributes']['metadescription'];
        }

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

        $productAttributes = $productData["attributes"];
        $arrCharacteristicsKeys = ["bio", "vegan", "vegetarisch", "laktosefrei", "glutenfrei", "fairtrade"];
        $characteristics = [];

        foreach ($productAttributes as $attrKey => $attrValue) {
            if (in_array($attrKey, $arrCharacteristicsKeys)) {
                $characteristics['product.info.additional.characteristics.' . $attrKey] = $attrValue;
            }
        }

        $searchFor = "1";
        $viewData['characteristics'] = array_filter($characteristics, function ($e) use ($searchFor) {
            return ($e == $searchFor);
        });

        $codeBucket = $this->getFactory()->getConfig()->getCodeBucket();

        if ($codeBucket == 'DE') {
            if (isset($_REQUEST['result_data'])) {
                $resultData = $_REQUEST['result_data'];

                $productSku = $resultData['product_sku'] ?? '';
                $masterId = $resultData['master_id'] ?? '';
                $page = $resultData['page'] ?? 1;
                $position = $resultData['position'] ?? 1;
                if (isset($resultData['query'])) {
                    if ($resultData['query'] == "%2a") {
                        $query = '*';
                    } else {
                        $query = $resultData['query'];
                    }
                } else {
                    $query = '';
                }
                $title = $resultData['title'] ?? '';

                $this->clickTrackingEvent($productSku, $masterId, (int)$page, (int)$position, $query, $title);
            }
        }

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

    /**
     * @param $productSku
     * @param $masterId
     * @param $page
     * @param $position
     * @param $query
     * @param $title
     *
     * @return array
     */
    public function clickTrackingEvent($productSku, $masterId, $page, $position, $query, $title): array
    {
        $data = [[
            'id' => $productSku,
            'masterId' => $masterId,
            'page' => $page,
            'pos' => $position,
            'query' => $query,
            'sid' => session_id(),
            'title' => $title,
        ]];

        return FactFinderApiClient::postTrackClickData($data);
    }
}
