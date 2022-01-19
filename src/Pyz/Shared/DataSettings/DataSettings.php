<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DataSettings;

use Elastica\JSON;
use Exception;

class DataSettings
{
    public const SETTINGS_PATH = '//data/data/settings/';

    private const APP_SETTINGS = [
        'pickingAppVersion' => '{
          "NewVersion":{
            "Visible": true,
            "Release":5.3,
            "Tickets":[
              "OS11SPRYKE-1387",
              "OS11SPRYKE-1425"
            ]
          },
          "History":[
            {
              "Release":5.0,
              "Tickets":[
              ]
            }
          ]
        }'];

    /**
     * @param string $fileName
     *
     * @return array
     */
    public static function getJsonSettings(string $fileName): array
    {
        $filePath = static::SETTINGS_PATH . $fileName . ".json";
        try {
            $settingsContent = file_get_contents($filePath);
        } catch (Exception $ex) {
            $settingsContent = static::APP_SETTINGS[$fileName];
        }

        return JSON::parse($settingsContent);
    }
}
