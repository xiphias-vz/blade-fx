<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Twig\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Twig\Environment;
use Twig\TwigFilter;

class TypeCastingPlugin extends AbstractPlugin implements TwigPluginInterface
{
    /**
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        $twig = $this->addTwigFilters($twig);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addTwigFilters(Environment $twig): Environment
    {
        $twig->addFilter(
            new TwigFilter('int', function ($value) {
                return (int)$value;
            })
        );
        $twig->addFilter(
            new TwigFilter('float', function ($value) {
                return (float)$value;
            })
        );
        $twig->addFilter(
            new TwigFilter('string', function ($value) {
                return (string)$value;
            })
        );
        $twig->addFilter(
            new TwigFilter('bool', function ($value) {
                return (bool)$value;
            })
        );
        $twig->addFilter(
            new TwigFilter('array', function ($value) {
                return (array)$value;
            })
        );
        $twig->addFilter(
            new TwigFilter('object', function ($value) {
                return (object)$value;
            })
        );

        return $twig;
    }
}
