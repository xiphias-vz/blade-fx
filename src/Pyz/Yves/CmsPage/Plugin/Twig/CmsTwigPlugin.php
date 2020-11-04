<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CmsPage\Plugin\Twig;

use Spryker\Service\Container\ContainerInterface;
use SprykerShop\Yves\CmsPage\Plugin\Twig\CmsTwigPlugin as SprykerShopCmsTwigPlugin;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @method \SprykerShop\Yves\CmsPage\CmsPageFactory getFactory()
 */
class CmsTwigPlugin extends SprykerShopCmsTwigPlugin
{
    /**
     * @var \Symfony\Component\Translation\TranslatorInterface|null
     */
    protected static $translator;

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Symfony\Component\Translation\TranslatorInterface
     */
    protected function getTranslator(ContainerInterface $container): TranslatorInterface
    {
        if (static::$translator === null) {
            static::$translator = $container->get(static::SERVICE_TRANSLATOR);
        }

        return static::$translator;
    }
}
