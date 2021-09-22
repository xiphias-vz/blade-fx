<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Resolver;

use Generated\Shared\Transfer\ShopContextTransfer;
use Spryker\Shared\Kernel\Communication\Application;

class ShopContextResolver
{
    protected const SERVICE_SHOP_CONTEXT = 'SERVICE_SHOP_CONTEXT';

    /**
     * @var \Spryker\Shared\Kernel\Communication\Application
     */
    protected $application;

    /**
     * @param \Spryker\Shared\Kernel\Communication\Application $application
     */
    public function __construct(Application $application)
    {
        $this->application = $application;
    }

    /**
     * @return \Generated\Shared\Transfer\ShopContextTransfer
     */
    public function resolve(): ShopContextTransfer
    {
        return $this->application[static::SERVICE_SHOP_CONTEXT] ?? new ShopContextTransfer();
    }
}
