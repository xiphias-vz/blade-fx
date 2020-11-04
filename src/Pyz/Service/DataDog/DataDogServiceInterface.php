<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog;

interface DataDogServiceInterface
{
    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function increment(array $stats, array $tags = [], int $value = 1, float $rate = 1.0): void;

    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function decrement(array $stats, array $tags = [], int $value = -1, float $rate = 1.0): void;
}
