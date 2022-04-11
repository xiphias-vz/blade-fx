<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Recommendations\Plugin\Application;

use Generated\Shared\Transfer\RecoTransfer;
use Pyz\Yves\Recommendations\RecommendationsConfig;
use Pyz\Yves\Recommendations\RecommendationsDependencyProvider;
use Pyz\Yves\Recommendations\RecommendationsFactory;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\Kernel\Container;

/**
 * @method RecommendationsConfig getConfig()
 * @method RecommendationsFactory getFactory()
 */
class RecommendationsApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const FF_SNIPEPT_ENABLED = 'ffSnippetEnabled';

    /**
     * @param ContainerInterface $container
     *
     * @return ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        // $container = $this->addRecommendationsStorageClient($container);
        // $container = $this->addRecommendationsClient($container);

        return $this->getIsFfSnippetEnabled($container);
    }

    /**
     * @param ContainerInterface $container
     *
     * @return ContainerInterface
     */
    protected function getIsFfSnippetEnabled(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::FF_SNIPEPT_ENABLED, function () {
            $recoTransfer = $this->getFactory()->getRecommendationsStorageClient()->getIsFfSnippetEnabled(new RecoTransfer());
            $customer = $this->getFactory()->getCustomerClient()->getCustomer();
            if ($customer !== null) {
                $recoTransfer->setCustomer($customer);
                // $recoTransfer = $this->getFactory()->getRecommendationsClient()->getExistingRecoData($recoTransfer);
            }

            return $recoTransfer->getRecommendationsFfSnippetEnabled() . $recoTransfer->getData();
        });

        return $container;
    }
}
