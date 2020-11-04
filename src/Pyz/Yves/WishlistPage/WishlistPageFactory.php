<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\WishlistPage;

use Pyz\Client\DepositProductOption\DepositProductOptionClientInterface;
use Pyz\Client\Wishlist\WishlistClientInterface;
use Pyz\Yves\WishlistPage\Business\MoveToCartHandler;
use Pyz\Yves\WishlistPage\Form\AddAllAvailableProductsToCartFormType;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;
use SprykerShop\Yves\WishlistPage\Business\MoveToCartHandlerInterface;
use SprykerShop\Yves\WishlistPage\Dependency\Client\WishlistPageToCustomerClientInterface;
use SprykerShop\Yves\WishlistPage\WishlistPageFactory as SprykerShopWishlistPageFactory;
use Symfony\Component\Form\FormInterface;

class WishlistPageFactory extends SprykerShopWishlistPageFactory
{
    /**
     * @param array $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function getAddAllAvailableProductsToCartForm(array $data, array $options = []): FormInterface
    {
        return $this->getFormFactory()->create(AddAllAvailableProductsToCartFormType::class, $data, $options);
    }

    /**
     * @return \SprykerShop\Yves\WishlistPage\Business\MoveToCartHandlerInterface
     */
    public function createMoveToCartHandler(): MoveToCartHandlerInterface
    {
        return new MoveToCartHandler($this->getWishlistClient(), $this->getCustomerClient());
    }

    /**
     * @return \Pyz\Client\Wishlist\WishlistClientInterface
     */
    public function getBaseWishlistClient(): WishlistClientInterface
    {
        return $this->getProvidedDependency(WishlistPageDependencyProvider::BASE_CLIENT_WISHLIST);
    }

    /**
     * @return \SprykerShop\Yves\WishlistPage\Dependency\Client\WishlistPageToCustomerClientInterface
     */
    public function getCustomerClient(): WishlistPageToCustomerClientInterface
    {
        return $this->getProvidedDependency(WishlistPageDependencyProvider::CLIENT_CUSTOMER);
    }

    /**
     * @return \Pyz\Client\DepositProductOption\DepositProductOptionClientInterface
     */
    public function getDepositProductOptionClient(): DepositProductOptionClientInterface
    {
        return $this->getProvidedDependency(WishlistPageDependencyProvider::CLIENT_DEPOSIT_PRODUCT_OPTION);
    }

    /**
     * @return \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    public function getZedRequestClient(): ZedRequestClientInterface
    {
        return $this->getProvidedDependency(WishlistPageDependencyProvider::CLIENT_ZED_REQUEST);
    }
}
