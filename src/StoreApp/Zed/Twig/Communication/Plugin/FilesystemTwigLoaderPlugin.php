<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Twig\Communication\Plugin;

use Spryker\Shared\Twig\Loader\FilesystemLoaderInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \StoreApp\Zed\Twig\Communication\TwigCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Twig\TwigConfig getConfig()
 */
class FilesystemTwigLoaderPlugin extends AbstractPlugin implements TwigLoaderPluginInterface
{
    /**
     * @return \Spryker\Shared\Twig\Loader\FilesystemLoaderInterface
     */
    public function getLoader(): FilesystemLoaderInterface
    {
        return $this->getFactory()->createFilesystemLoader();
    }
}
