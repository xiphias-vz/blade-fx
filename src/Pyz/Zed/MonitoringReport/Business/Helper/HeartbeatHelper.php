<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business\Helper;

use Exception;

class HeartbeatHelper
{
    /**
     * @param string $url
     *
     * @return bool
     */
    public function getHeartbeat(string $url): bool
    {
        try {
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $resp = curl_exec($curl);
            curl_close($curl);
        } catch (Exception $exception) {
            return false;
        }

        return true;
    }
}
