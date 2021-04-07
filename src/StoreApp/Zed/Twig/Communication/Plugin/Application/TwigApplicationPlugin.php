<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Twig\Communication\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin as SprykerTwigApplicationPlugin;
use Twig\Environment;
use Twig\Loader\ChainLoader;

/**
 * @method \StoreApp\Zed\Twig\Communication\TwigCommunicationFactory getFactory()
 * @method \Spryker\Zed\Twig\TwigConfig getConfig()
 * @method \Spryker\Zed\Twig\Business\TwigFacadeInterface getFacade()
 */
class TwigApplicationPlugin extends SprykerTwigApplicationPlugin
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->addTwigService($container);

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function addTwigService(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::SERVICE_TWIG, function (ContainerInterface $container) {
            /** @var \Twig\Loader\LoaderInterface $twigLoader */
            $twigLoader = $this->getChainLoader();
            $twigOptions = $this->getTwigOptions($container);
            $twig = new Environment($twigLoader, $twigOptions);
            $twig->addGlobal('app', $container);

            $twig = $this->extendTwig($twig, $container);

            return $twig;
        });

        return $container;
    }

    /**
     * @return \Twig\Loader\ChainLoader
     */
    protected function getChainLoader(): ChainLoader
    {
        $chainLoader = $this->getFactory()->createChainLoader();

        foreach ($this->getFactory()->getTwigLoaderPlugins() as $twigLoaderPlugin) {
            $chainLoader->addLoader($twigLoaderPlugin->getLoader());
        }

        return $chainLoader;
    }
}
