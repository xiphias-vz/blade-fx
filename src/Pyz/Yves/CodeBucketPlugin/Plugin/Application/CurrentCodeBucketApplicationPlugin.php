<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CodeBucketPlugin\Plugin\Application;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

class CurrentCodeBucketApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const CURRENT_CODE_BUCKET = 'currentCodeBucket';

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        return $this->getCurrentCodeBucket($container);
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    protected function getCurrentCodeBucket(ContainerInterface $container): ContainerInterface
    {
        $container->set(static::CURRENT_CODE_BUCKET, function () {
            return getenv('SPRYKER_CODE_BUCKET') ?? null;
        });

        return $container;
    }
}
