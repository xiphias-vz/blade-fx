<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog\DogStats;

interface DataDogMetricInterface
{
    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function increment(array $stats, array $tags, int $value, float $rate): void;

    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function decrement(array $stats, array $tags, int $value, float $rate): void;
}
