<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business\VirtualHost;

interface VirtualHostCommandInterface
{
    /**
     * @return int
     */
    public function execute(): int;
}