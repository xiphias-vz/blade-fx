<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations\Plugin\Application;

use Generated\Shared\Transfer\RecoTransfer;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\Recommendations\RecommendationsConfig getConfig()
 * @method \Pyz\Yves\Recommendations\RecommendationsFactory getFactory()
 */
class RecommendationsApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const FF_SNIPEPT_ENABLED = 'ffSnippetEnabled';
    public const CUSTOMER_USER_RECO_DATA = 'customerUserRecoData';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container = $this->getCustomerRecoData($container);

        return $this->getIsFfSnippetEnabled($container);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getIsFfSnippetEnabled(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::FF_SNIPEPT_ENABLED, function () {
            $recoTransfer = $this->getFactory()->getRecommendationsStorageClient()->getIsFfSnippetEnabled(new RecoTransfer());

            return $recoTransfer->getRecommendationsFfSnippetEnabled();
        });

        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCustomerRecoData(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CUSTOMER_USER_RECO_DATA, function () {
            $customerRecoData = $this->getFactory()->getSessionClient()->get('recoData');

            return $customerRecoData;
        });

        return $container;
    }
}
