<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Orm\Zed\Oms\Persistence;

use Propel\Runtime\Connection\ConnectionInterface;
use Spryker\Zed\Oms\Persistence\Propel\AbstractSpyOmsTransitionLog as BaseSpyOmsTransitionLog;

/**
 * Skeleton subclass for representing a row from the 'spy_oms_transition_log' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements. This class will only be generated as
 * long as it does not already exist in the output directory.
 */
class SpyOmsTransitionLog extends BaseSpyOmsTransitionLog
{
    /**
     * @param \Propel\Runtime\Connection\ConnectionInterface|null $con
     *
     * @return int
     */
    public function save(?ConnectionInterface $con = null)
    {
        if ($this->getIsError() !== null) {
            return parent::save($con);
        }
    }
}
