<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Generated\Shared\Transfer\CustomerEventProductTransfer;
use Generated\Shared\Transfer\CustomerEventTransfer;
use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;

class GlobusRestApiCustomerEvent
{
    public const INTERACTION_TYPE = "SHOP_CHECKOUT_SUCCES";
    public const COMMUNICATION_MEDIUM = "Z_CLICK_AND_COLLECT";
    public const SOURCE_SYSTEM_TYPE = "Z_CLICK_AND_COLLECT";
    public const SOURCE_SYSTEM_ID = "ClickCollect";
    public const PRODUCTS_ITEM_TYPE = "SAP_ERP_MATNR";
    public const CONTENT_TITLE = "Order";
    public const VALUATION = "PROD_REVIEW_CREATED";

    /**
     * @var \Generated\Shared\Transfer\CustomerEventTransfer $event
     */
    private $event;

    /**
     * @var string $bearerToken
     */
    private $bearerToken;

    /**
     * @param string $cardNumber
     * @param string $externalUserId pass 0 or actual user id
     * @param string $sourceObjectId should be order id
     * @param string $bearerToken
     *
     * @return \Generated\Shared\Transfer\CustomerEventTransfer
     */
    public function createCustomerEvent(
        string $cardNumber,
        string $externalUserId,
        string $sourceObjectId,
        string $bearerToken
    ): CustomerEventTransfer {
        $this->event = new CustomerEventTransfer();
        $this->event->setInteractionType(static::INTERACTION_TYPE)
            ->setCommunicationMedium(static::COMMUNICATION_MEDIUM)
            ->setSourceSystemType(static::SOURCE_SYSTEM_TYPE)
            ->setSourceSystemId(static::SOURCE_SYSTEM_ID)
            ->setContentTitle(static::CONTENT_TITLE)
            ->setCardNumber($cardNumber)
            ->setExternalUserId($externalUserId)
            ->setSourceObjectId($sourceObjectId);
            //->setValuation(static::VALUATION);
        $this->bearerToken = $bearerToken;

        return $this->event;
    }

    /**
     * @param string $sku
     * @param string $name
     * @param string $navigationURL
     * @param string $imageUrl
     *
     * @return \Generated\Shared\Transfer\CustomerEventTransfer
     */
    public function addProduct(
        string $sku,
        string $name,
        string $navigationURL,
        string $imageUrl
    ): CustomerEventTransfer {
        $product = new CustomerEventProductTransfer();
        $product->setItemType(static::PRODUCTS_ITEM_TYPE)
            ->setItemId($sku)
            ->setName($name)
            ->setNavigationURL($navigationURL)
            ->setImageUrl($imageUrl);
        $this->event->addProduct($this->event->getProducts()->count(), $product);

        return $this->event;
    }

    /**
     * @return \Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiResult
     */
    public function postEvent(): GlobusRestApiResult
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_CHECKOUT_EVENT);
        $data = $this->event->serialize();

        return GlobusRestApiClient::post($url, $data, [], $this->bearerToken);
    }
}
