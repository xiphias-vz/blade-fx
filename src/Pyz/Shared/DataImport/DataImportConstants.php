<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DataImport;

use Spryker\Shared\DataImport\DataImportConstants as SprykerDataImportConstants;

interface DataImportConstants extends SprykerDataImportConstants
{
    public const IS_ENABLE_INTERNAL_IMAGE = 'DATA_IMPORT:IS_ENABLE_INTERNAL_IMAGE';
    public const SFTP_DATA_IMPORT_FILES_FOLDER_NAME = 'DATA_IMPORT:SFTP_DATA_IMPORT_FILES_FOLDER_NAME';
    public const SFTP_DATA_IMPORT_IMAGES_FILES_FOLDER_NAME = 'DATA_IMPORT:SFTP_DATA_IMPORT_IMAGES_FILES_FOLDER_NAME';
}
