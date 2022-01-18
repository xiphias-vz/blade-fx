<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DataSettings;

use Elastica\JSON;

class DataSettings
{
    /**
     * @param string $fileName
     *
     * @return array
     */
    public static function getJsonSettings(string $fileName): array
    {
        $filePath = "//data/data/settings/" . $fileName . ".json";
        $settingsContent = file_get_contents($filePath);

        return JSON::parse($settingsContent);
    }
}
