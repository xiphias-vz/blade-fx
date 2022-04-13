<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RecommendationsStorage\Business\Storage;

interface RecommendationsStorageWriterInterface
{
    /**
     * @param array $eventTransfers
     *
     * @return void
     */
    public function publish(array $eventTransfers): void;
}
