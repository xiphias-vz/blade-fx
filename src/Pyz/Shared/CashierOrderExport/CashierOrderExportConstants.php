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

    /**
     * - File is uploaded on S3 bucket for late download from backoffice
     */
    public const CASHIER_FILE_DOWNLOAD_URL = 'CASHIER_FILE_DOWNLOAD_URL';

    /**
     * Specification:
     * - Default xml file name, it will be changed to concrete zip file name during file attaching to the archive.
     *
     * @api
     */
    public const SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY = 'SFTP_CASHIER_ORDER_XML_FILES_FOLDER_KEY';
}
