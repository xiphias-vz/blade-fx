<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\MerchantSwitcherWidget\Resolver;

use Generated\Shared\Transfer\ShopContextTransfer;
use Spryker\Shared\Kernel\Communication\Application;
use Spryker\Shared\Kernel\ContainerInterface;

class ShopContextResolver
{
    protected const SERVICE_SHOP_CONTEXT = 'SERVICE_SHOP_CONTEXT';

    /**
     * @param \Spryker\Shared\Kernel\ContainerInterface $container
     */
    protected $container;

    /**
     * @param \Spryker\Shared\Kernel\ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @return \Generated\Shared\Transfer\ShopContextTransfer
     */
    public function resolve(): ShopContextTransfer
    {
        return $this->container->hasApplicationService(static::SERVICE_SHOP_CONTEXT)
            ? $this->container->getApplicationService(static::SERVICE_SHOP_CONTEXT)
            : new ShopContextTransfer();
    }
}
