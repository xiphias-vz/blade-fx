<?php


namespace Pyz\Yves\GoogleTagManager\Plugin\Application;


use Pyz\Shared\GoogleTagManager\GoogleTagManagerConstants;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Shared\Config\Config;
use Spryker\Yves\Kernel\AbstractPlugin;

class GoogleTagManagerIdApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{

    public const GOOGLE_TAG_MANAGER_ID = 'googleTagManagerId';

    /**
     * @param ContainerInterface $container
     * @return ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->addGoogleTagManagerId($container);
        return $container;
    }

    /**
     * @param ContainerInterface $container
     * @return ContainerInterface
     */
    protected function addGoogleTagManagerId(ContainerInterface $container): ContainerInterface
    {
        $container[static::GOOGLE_TAG_MANAGER_ID] = function()        {
            return $this->getGoogleTagManagerId();
        };
        return $container;
    }

    /**
     * @return string
     * @throws \Exception
     */
    protected function getGoogleTagManagerId() : string
    {
        $id= Config::get(GoogleTagManagerConstants::CONTAINER_ID);
        return strval($id);
    }

}
