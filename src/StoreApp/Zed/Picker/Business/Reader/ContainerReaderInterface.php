<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

interface ContainerReaderInterface
{
    /**
     * @param string $orderId
     *
     * @return array
     */
    public function getContainersByOrderId(string $orderId): array;

    /**
     * @param string $ContainerId
     * @param string $orderId
     *
     * @return bool
     */
    public function checkContainerUse(string $ContainerId, string $orderId): bool;

    /**
     * @param string $ContainerId
     *
     * @return array
     */
    public function getContainerShelfs(string $ContainerId): array;
}
