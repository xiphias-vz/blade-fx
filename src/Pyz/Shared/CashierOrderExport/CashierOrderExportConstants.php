<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\CashierOrderExport;

/**
 * Declares global environment configuration keys. Do not use it for other class constants.
 */
interface CashierOrderExportConstants
{
    /**
     * Specification:
     * - Default zip file name, it will be changed to concrete zip file name during file attaching to the archive.
     *
     * @api
     */
    public const SFTP_CASHIER_ORDER_FILES_FOLDER_KEY = 'SFTP_CASHIER_ORDER_FILES_FOLDER_KEY';
}