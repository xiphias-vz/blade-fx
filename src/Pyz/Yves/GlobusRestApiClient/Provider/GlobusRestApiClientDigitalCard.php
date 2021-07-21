<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;

class GlobusRestApiClientDigitalCard
{
    /**
     * @return string
     */
    public static function getNewGlobusCardNumber(): string
    {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_NEXT_CARD_NUMBER);
        $result = GlobusRestApiClient::get($url, []);
        $newCardResult = $result->resultToJson();
        if ($newCardResult->code === '200') {
            $number = $newCardResult->cardNumber;
        } else {
            $number = $newCardResult->message;
        }

        return $number;
    }
}
