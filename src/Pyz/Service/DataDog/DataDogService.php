<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog;

use Spryker\Service\Kernel\AbstractService;

/**
 * @method \Pyz\Service\DataDog\DataDogServiceFactory getFactory()
 */
class DataDogService extends AbstractService implements DataDogServiceInterface
{
    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function increment(array $stats, array $tags = [], int $value = 1, float $rate = 1.0): void
    {
        $this->getFactory()
            ->createDataDogMetric()
            ->increment($stats, $tags, $value, $rate);
    }

    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function decrement(array $stats, array $tags = [], int $value = -1, float $rate = 1.0): void
    {
        $this->getFactory()
            ->createDataDogMetric()
            ->decrement($stats, $tags, $value, $rate);
    }
}
