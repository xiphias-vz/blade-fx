<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GlobusRestApiClient\Provider;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\GlobusRestApiClient\GlobusRestApiClient;
use Pyz\Shared\GlobusRestApiClient\GlobusRestApiConfig;

class GlobusRestApiClientValidation
{
    /**
     * @param string|null $firstName
     * @param string|null $lastName
     * @param string|null $zip
     * @param string|null $houseNumber
     * @param string|null $street
     * @param string|null $city
     * @param bool|null $mainGlobus
     * @param bool|null $we
     *
     * @return array
     */
    public static function addressValidation(
        ?string $firstName = "",
        ?string $lastName = "",
        ?string $zip = "",
        ?string $houseNumber = "",
        ?string $street = "",
        ?string $city = "",
        ?bool $mainGlobus = false,
        ?bool $we = false
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
