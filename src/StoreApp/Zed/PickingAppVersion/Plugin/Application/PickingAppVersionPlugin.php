<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\PickingAppVersion\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use StoreApp\Zed\PickingAppVersion\PickingAppVersionConfig;

/**
 * @method \StoreApp\Zed\PickingAppVersion\PickingAppVersionConfig getConfig()
 */
class PickingAppVersionPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const PICKING_APP_VERSION = 'pickingAppVersion';
    public const PICKING_APP_MERCHANT = 'pickingAppMerchant';
    public const PICKING_APP_NEW_VERSION_VISIBLE = 'pickingAppNewVersionVisible';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->setPickingAppVersion($container);
        $container = $this->setPickingAppNewVersionVisible($container);

        return $this->setMerchant($container);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function setPickingAppVersion(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::PICKING_APP_VERSION, function () {
            return $this->getConfig()->getPickingAppVersion();
        });

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function setMerchant(ContainerInterface $container): ContainerInterface
    {
         $container->set(static::PICKING_APP_MERCHANT, function () {
            return PickingAppVersionConfig::getMerchantRef();
         });

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function setPickingAppNewVersionVisible(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::PICKING_APP_NEW_VERSION_VISIBLE, function () {
            return PickingAppVersionConfig::getPickingAppNewVersionVisible();
        });

        return $container;
    }
}
