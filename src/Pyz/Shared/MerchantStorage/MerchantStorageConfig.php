<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\MerchantStorage;

class MerchantStorageConfig
{
    public const MERCHANTS_LIST_RESOURCE_NAME = 'merchants_list';
    public const MERCHANT_SYNC_STORAGE_QUEUE = 'sync.storage.merchant';
    public const MERCHANT_SYNC_STORAGE_ERROR_QUEUE = 'sync.storage.merchant.error';
}
