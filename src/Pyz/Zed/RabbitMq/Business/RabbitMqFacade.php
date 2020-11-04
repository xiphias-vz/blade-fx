<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\RabbitMq\Business;

use Spryker\Zed\RabbitMq\Business\RabbitMqFacade as SprykerRabbitMqFacade;

/**
 * @method \Pyz\Zed\RabbitMq\Business\RabbitMqBusinessFactory getFactory()
 */
class RabbitMqFacade extends SprykerRabbitMqFacade implements RabbitMqFacadeInterface
{
    /**
     * @return int
     */
    public function initVirtualHost(): int
    {
        return $this->getFactory()
            ->createInitVirtualHostCommand()
            ->execute();
    }

    /**
     * @return int
     */
    public function removeVirtualHost(): int
    {
        return $this->getFactory()
            ->createRemoveVirtualHostCommand()
            ->execute();
    }
}
