<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Oms;

use Spryker\Shared\Oms\OmsConstants as OmsConstantsAlias;

/**
 * Declares global environment configuration keys. Do not use it for other class constants.
 */
interface OmsConstants extends OmsConstantsAlias
{
    /**
     * Specification:
     * - Defines the number of OMS workers like timeout and condition console commands
     *
     * @api
     */
    public const OMS_PROCESS_WORKER_NUMBER = 'OMS_PROCESS_WORKER_NUMBER';

    /**
     * Specification:
     * - Defines the number of OMS workers chunk size for timeout and condition console commands
     *
     * @api
     */
    public const OMS_PROCESS_WORKER_CHUNK_SIZE = 'OMS_PROCESS_WORKER_CHUNK_SIZE';
}
