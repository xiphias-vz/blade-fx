<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business\OrderStateMachine;

use Spryker\Zed\Oms\Business\OrderStateMachine\FinderInterface as SprykerFinderInterface;

interface FinderInterface extends SprykerFinderInterface
{
    /**
     * @param int $idOrder
     *
     * @return bool
     */
    public function isOrderFlaggedCancellableByCustomer(int $idOrder): bool;
}
