<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business;

use Spryker\Zed\RabbitMq\Business\RabbitMqFacadeInterface as SprykerRabbitMqFacadeInterface;

interface RabbitMqFacadeInterface extends SprykerRabbitMqFacadeInterface
{
    /**
     * @return int
     */
    public function initVirtualHost(): int;

    /**
     * @return int
     */
    public function removeVirtualHost(): int;
}
