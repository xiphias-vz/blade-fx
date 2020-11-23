<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport;

use Spryker\Zed\Kernel\AbstractBundleConfig;

class PickingZoneOrderExportConfig extends AbstractBundleConfig
{
    public const DATE_FORMAT = 'd.m.Y';
    public const FILE_NAME_DELIMITER = '-';
}
