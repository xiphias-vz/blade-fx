<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Matomo\Plugin\Twig;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Twig\Environment;

/**
 * @method \Pyz\Yves\Matomo\MatomoConfig getConfig()
 */
class MatomoTwigPlugin extends AbstractPlugin implements TwigPluginInterface
{
    protected const TWIG_GLOBAL_VARIABLE_NAME_MATOMO_URL = 'matomoUrl';
    protected const TWIG_GLOBAL_VARIABLE_NAME_MATOMO_ID_SITE = 'matomoIdsite';

    /**
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        $twig = $this->addTwigGlobalVariableMatomoUrl($twig);
        $twig = $this->addTwigGlobalVariableMatomoIdSite($twig);

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addTwigGlobalVariableMatomoUrl(Environment $twig): Environment
    {
        $twig->addGlobal(
            static::TWIG_GLOBAL_VARIABLE_NAME_MATOMO_URL,
            $this->getConfig()->getMatomoUrl()
        );

        return $twig;
    }

    /**
     * @param \Twig\Environment $twig
     *
     * @return \Twig\Environment
     */
    protected function addTwigGlobalVariableMatomoIdSite(Environment $twig): Environment
    {
        $twig->addGlobal(
            static::TWIG_GLOBAL_VARIABLE_NAME_MATOMO_ID_SITE,
            $this->getConfig()->getMatomoIdSite()
        );

        return $twig;
    }
}
