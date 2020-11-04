<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Matomo;

interface MatomoConfig
{
    public const ACTION_CART_ADD = 'CartAdd';
    public const ACTION_CART_REMOVE = 'CartRemove';
    public const ACTION_PDP_ADD = 'PdpAdd';
    public const ACTION_WISHLIST_ADD = 'WishlistAdd';
    public const ACTION_REORDER_ADD = 'ReorderAdd';
    public const LOCATION_WISHLIST = 'wishlist';
    public const LOCATION_PDP = 'pdp';
    public const LOCATION_REORDER = 'reorder';
    public const LOCATION_CART = 'cart';
}
