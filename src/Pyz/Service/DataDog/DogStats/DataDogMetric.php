<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog\DogStats;

use DataDog\DogStatsd;

class DataDogMetric implements DataDogMetricInterface
{
    /**
     * @var \DataDog\DogStatsd
     */
    protected $dataDogStatsService;

    /**
     * @param \DataDog\DogStatsd $dataDogStatsService
     */
    public function __construct(DogStatsd $dataDogStatsService)
    {
        $this->dataDogStatsService = $dataDogStatsService;
    }

    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function increment(array $stats, array $tags, int $value, float $rate): void
    {
        $this->dataDogStatsService->increment($stats, $rate, array_merge($tags, $this->getDefaultTags()), $value);
    }

    /**
     * @param string[] $stats
     * @param array $tags
     * @param int $value
     * @param float $rate
     *
     * @return void
     */
    public function decrement(array $stats, array $tags, int $value, float $rate): void
    {
        $this->dataDogStatsService->decrement($stats, $rate, array_merge($tags, $this->getDefaultTags()), $value);
    }

    /**
     * @return string[]
     */
    protected function getDefaultTags(): array
    {
        return [
            'environment' => APPLICATION_ENV,
        ];
    }
}
