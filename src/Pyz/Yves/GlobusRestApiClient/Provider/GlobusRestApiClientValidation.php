<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Yves\GlobusRestApiClient\GlobusRestApiConfig;

class GlobusRestApiClientValidation
{
    /**
     * @param string $firstName
     * @param string $lastName
     * @param string $zip
     * @param string $houseNumber
     * @param string $street
     * @param string $city
     * @param bool $mainGlobus
     * @param bool $we
     *
     * @return array
     */
    public static function addressValidation(
        string $firstName,
        string $lastName,
        string $zip,
        string $houseNumber,
        string $street,
        string $city,
        bool $mainGlobus,
        bool $we
    ): array {
        $url = GlobusRestApiConfig::getGlobusApiEndPoint(CustomerConstants::GLOBUS_API_END_POINT_ADDRESS_VALIDATION);
        $data = [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'address' => [
                'zip' => $zip,
                'houseNo' => $houseNumber,
                'street' => $street,
                'city' => $city,
                ],
        ];

        $result = GlobusRestApiClient::post($url, $data, []);
        $addressValidation = new GlobusRestApiAddressResult();

        return $addressValidation->getResult($result, $mainGlobus, $we);
    }
}
