<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Cms;

use Spryker\Shared\CmsBlock\CmsBlockConfig as SprykerCmsBlockConfig;

class CmsBlockConfig extends SprykerCmsBlockConfig
{
    public const CMS_BLOCK_EMAIL_REGISTRATION = 'Registration email';
    public const CMS_BLOCK_EMAIL_RESTORE_PASSWORD = 'Restore password email';
    public const CMS_BLOCK_EMAIL_RESTORED_PASSWORD = 'Restored password email';
    public const CMS_BLOCK_EMAIL_ORDER_CANCELLED = 'Order cancelled email';
    public const CMS_BLOCK_EMAIL_ORDER_REFUNDED = 'Order refunded email';
    public const CMS_BLOCK_EMAIL_ORDER_CONFIRMATION = "Order confirmation email";
}
