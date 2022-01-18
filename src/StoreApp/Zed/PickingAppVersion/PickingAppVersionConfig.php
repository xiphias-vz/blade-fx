<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\PickingAppVersion;

use Pyz\Shared\DataSettings\DataSettings;
use Spryker\Zed\Kernel\AbstractBundleConfig;
use StoreApp\Zed\PickingAppVersion\Plugin\Application\PickingAppVersionPlugin;

class PickingAppVersionConfig extends AbstractBundleConfig
{
    /**
     * @param string $merchantRef
     *
     * @return void
     */
    public static function setMerchantRef(string $merchantRef)
    {
        $_SESSION["merchantRef"] = $merchantRef;
    }

    /**
     * @return string
     */
    public static function getMerchantRef(): string
    {
        return $_SESSION["merchantRef"];
    }

    /**
     * @param bool $pickingAppNewVersionVisible
     *
     * @return void
     */
    public static function setPickingAppNewVersionVisible(bool $pickingAppNewVersionVisible)
    {
        $_SESSION["pickingAppNewVersionVisible"] = $pickingAppNewVersionVisible;
    }

    /**
     * @return string
     */
    public static function getPickingAppNewVersionVisible(): bool
    {
        return $_SESSION["pickingAppNewVersionVisible"];
    }

    /**
     * @return array
     */
    public function getPickingAppVersion(): array
    {
        return DataSettings::getJsonSettings(PickingAppVersionPlugin::PICKING_APP_VERSION)["NewVersion"];
    }
}
