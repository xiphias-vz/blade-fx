<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CartPage\Plugin\Twig;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use SprykerShop\Yves\CartPage\Plugin\Twig\CartTwigPlugin as SprykerTwigPlugin;
use Twig\Environment;
use Twig\TwigFunction;

class CartTwigPlugin extends SprykerTwigPlugin implements TwigPluginInterface
{
    protected const TWIG_GLOBAL_VARIABLE_NAME_QUOTE = 'quote';
    protected const TWIG_GLOBAL_VARIABLE_NAME_CART_ITEMS = 'cartItems';
    protected const TWIG_GLOBAL_VARIABLE_NAME_CART_AMOUNT = 'cartAmount';
    protected const TWIG_GLOBAL_VARIABLE_NAME_CART_QUANTITY = 'cartQuantity';

    protected const FUNCTION_NAME_GET_CART_QUANTITY = 'getCartQuantity';

    /**
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        $twig = parent::extend($twig, $container);
        $twig = $this->addCartQuantityGlobalVariable($twig);
        $twig = $this->addCartAmountGlobalVariable($twig);
        $twig = $this->addCartItemsGlobalVariable($twig);
        $twig = $this->addCartQuoteGlobalVariable($twig);
        $twig = $this->addTwigFunctions($twig);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addTwigFunctions(Environment $twig): Environment
    {
        $twig->addFunction($this->getCartQuantityFunction());

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addCartQuoteGlobalVariable(Environment $twig): Environment
    {
        $quote = $this->getFactory()
           ->getCartClient()
           ->getQuote();

        $twig->addGlobal(static::TWIG_GLOBAL_VARIABLE_NAME_QUOTE, $quote);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addCartItemsGlobalVariable(Environment $twig): Environment
    {
        $cartItems = $this->getFactory()
            ->createCartItemReader()
            ->getCartItems(
                $this->getFactory()->getCartClient()->getQuote()
            );

        $twig->addGlobal(static::TWIG_GLOBAL_VARIABLE_NAME_CART_ITEMS, $cartItems);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addCartAmountGlobalVariable(Environment $twig): Environment
    {
        $quote = $this->getFactory()
            ->getCartClient()
            ->getQuote();

        $total = 0;
        if ($quote->getTotals()) {
            $total = (int)$quote->getTotals()->getGrandTotal();
        }

        $twig->addGlobal(static::TWIG_GLOBAL_VARIABLE_NAME_CART_AMOUNT, $total);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addCartQuantityGlobalVariable(Environment $twig): Environment
    {
        $quantity = $this->getFactory()
            ->getCartClient()
            ->getItemCount();

        $twig->addGlobal(static::TWIG_GLOBAL_VARIABLE_NAME_CART_QUANTITY, $quantity);

        return $twig;
    }

    /**
     * @return \Twig\TwigFunction
     */
    protected function getCartQuantityFunction(): TwigFunction
    {
        return new TwigFunction(static::FUNCTION_NAME_GET_CART_QUANTITY, function () {
            return $this->getFactory()
                ->getCartClient()
                ->getItemCount();
        });
    }
}
