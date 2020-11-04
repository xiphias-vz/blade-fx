<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\TwigCache;

use Cache\Adapter\Apcu\ApcuCachePool;
use Cache\Adapter\Common\AbstractCachePool;
use Spryker\Yves\Kernel\AbstractFactory;
use Twig\CacheExtension\CacheProvider\PsrCacheAdapter;
use Twig\CacheExtension\CacheProviderInterface;
use Twig\CacheExtension\CacheStrategy\BlackholeCacheStrategy;
use Twig\CacheExtension\CacheStrategy\LifetimeCacheStrategy;
use Twig\CacheExtension\CacheStrategyInterface;
use Twig\CacheExtension\Extension as CacheExtension;
use Twig\Extension\ExtensionInterface;

/**
 * @method \Pyz\Yves\TwigCache\TwigCacheConfig getConfig()
 */
class TwigCacheFactory extends AbstractFactory
{
    /**
     * @return \Twig\Extension\ExtensionInterface
     */
    public function createCacheExtension(): ExtensionInterface
    {
        $cacheProvider = $this->createCacheProvider();
        $cacheStrategy = $this->createCacheStrategy($cacheProvider);

        return new CacheExtension($cacheStrategy);
    }

    /**
     * @return \Twig\CacheExtension\CacheProviderInterface
     */
    protected function createCacheProvider(): CacheProviderInterface
    {
        return new PsrCacheAdapter($this->createApcuCachePool());
    }

    /**
     * @return \Cache\Adapter\Common\AbstractCachePool
     */
    protected function createApcuCachePool(): AbstractCachePool
    {
        return new ApcuCachePool();
    }

    /**
     * @param \Twig\CacheExtension\CacheProviderInterface $cacheProvider
     *
     * @return \Twig\CacheExtension\CacheStrategyInterface
     */
    protected function createCacheStrategy(CacheProviderInterface $cacheProvider): CacheStrategyInterface
    {
        if ($this->getConfig()->isTwigCacheEnabled()) {
            return $cacheStrategy = new LifetimeCacheStrategy($cacheProvider);
        }

        return new BlackholeCacheStrategy();
    }
}
