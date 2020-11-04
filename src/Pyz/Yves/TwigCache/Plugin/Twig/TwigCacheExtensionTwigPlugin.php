<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\TwigCache\Plugin\Twig;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Twig\Environment;

/**
 * @method \Pyz\Yves\TwigCache\TwigCacheConfig getConfig()
 * @method \Pyz\Yves\TwigCache\TwigCacheFactory getFactory()()
 */
class TwigCacheExtensionTwigPlugin extends AbstractPlugin implements TwigPluginInterface
{
    /**
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        $twig->addExtension($this->getFactory()->createCacheExtension());

        return $twig;
    }
}
