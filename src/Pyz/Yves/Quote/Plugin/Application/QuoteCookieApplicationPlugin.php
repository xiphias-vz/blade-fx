<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Quote\Plugin\Application;

use Elastica\JSON;
use Pyz\Shared\Quote\QuoteConstants;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\Quote\QuoteFactory getFactory()
 */
class QuoteCookieApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const QUOTE_COOKIE_APPLICATION_PLUGIN_ID = 'quoteCookieApplicationPluginId';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->addQuoteCookieApplicationPlugin($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function addQuoteCookieApplicationPlugin(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::QUOTE_COOKIE_APPLICATION_PLUGIN_ID, function () {
            return $this->gatherDataFromQuoteAndCreateDataForCookie();
        });

        return $container;
    }

    /**
     * @return string
     */
    private function gatherDataFromQuoteAndCreateDataForCookie(): string
    {
        $quoteTransferItems = $this->getFactory()->getQuoteClient()->getQuote()->getItems();
        $cookieTransfer = $this->getFactory()->createCookieTransfer();
        $cookieTransfer->setName(QuoteConstants::QUOTE_COOKIE_NAME);
        $cookieTransfer->setExpires((time() + (86400 * 30)));
        $cookieTransfer->setPath('/');

        $listOfItemsForCookie = [];
        foreach ($quoteTransferItems as $item) {
            $listOfItemsForCookie[] = [$item->getSku(), $item->getQuantity(), true];
        }

        $cookieTransfer->setData(trim(JSON::stringify($listOfItemsForCookie)));
        $cookieTransfer->setCookieStringValue("Set-cookie: " . $cookieTransfer->getName() . "=" . $cookieTransfer->getData() . "; expires=" . $cookieTransfer->getExpires() . "; path=" . $cookieTransfer->getPath()/* . "; domain=" . $cookieTransfer->getDomain()*/);

        header($cookieTransfer->getCookieStringValue());

        return $cookieTransfer->getData();
    }
}
