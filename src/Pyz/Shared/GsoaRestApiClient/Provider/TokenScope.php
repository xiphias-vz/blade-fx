<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GsoaRestApiClient\Provider;

class TokenScope
{
    public const CUSTOMER_REGISTRATION = 'apiCustomerRegistration';
    public const CUSTOMER_MAGIC_LINK_LOGIN = 'apiCustomerMagicLinkLogin';
    public const COUPON = 'apiCoupon';
    public const ONLINE_ASSET = 'apiOnlineAsset';
    public const CUSTOMER_PROFILE = 'apiCustomerProfile';
    public const PRODUCT_CATALOG = 'apiProductCatalog';
    public const RECOMMENDER = 'apiRecommender';
    public const SHOPPING_LIST = 'apiShoppingList';
}
