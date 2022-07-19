<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\APIEndpointStatus\Communication\Plugin;

use Pyz\Shared\Customer\CustomerConstants;
use Pyz\Shared\GlobusRestApiClient\GlobusRestApiConfig;
use Pyz\Shared\GsoaRestApiClient\ApiClient;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenProvider;
use Pyz\Shared\GsoaRestApiClient\Provider\TokenScope;
use Spryker\Shared\Config\Config;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerEco\Shared\FactFinderNg\FactFinderNgConstants;

/**
 * @method \Pyz\Zed\APIEndpointStatus\Persistence\APIEndpointStatusRepositoryInterface getRepository()
 * @method \Pyz\Zed\APIEndpointStatus\Communication\APIEndpointStatusCommunicationFactory getFactory()
 */
class APIEndpointStatusPlugin extends AbstractPlugin
{
    public const COLUMNS = ["endpoint_url", "http_status_code"];
    public const ROLE_NAME = 'ApiEndpointStatusCheckMail';
    public const DESCRIPTION = "API Endpoint status check";

    /**
     * @return void
     */
    public function sendApiEndpointStatusMail()
    {
        $apiEndpointList = $this->createApiEndpointList();
        $apiEndpointStatusList = $this->checkEndpointStatus($apiEndpointList);
        $mailsToSend = $this->getRepository()->getEmailListForRoleName(self::ROLE_NAME);
        $mailBody = $this->getEmailBody($apiEndpointStatusList);
        foreach ($mailsToSend as $mail) {
            $this->getRepository()->setEmailToSend(self::DESCRIPTION, $mail, self::DESCRIPTION, $mailBody, true);
        }
    }

    /**
     * @return array
     */
    protected function createApiEndpointList()
    {
        $codeBucket = getenv('SPRYKER_CODE_BUCKET');
        $listOfGlobusApiFields = [
            CustomerConstants::GLOBUS_API_END_POINT_NEXT_CARD_NUMBER,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_AVAILABLE,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGIN,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_LOGOUT,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_PASSWORD_RESET,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_PAYBACK_INFO,
            CustomerConstants::GLOBUS_API_END_POINT_ACCOUNT_REGISTRATION_FULL,
            CustomerConstants::GLOBUS_API_END_POINT_ADDRESS_VALIDATION,
            CustomerConstants::GLOBUS_API_END_POINT_CHECK_CARD_STATUS,
            CustomerConstants::GLOBUS_API_END_POINT_NEXT_CARD_NUMBER,
        ];

        foreach ($listOfGlobusApiFields as $field) {
            $apiEndpoint[] = [
                "url" => GlobusRestApiConfig::getGlobusApiUrlPrefix() .
                    GlobusRestApiConfig::getGlobusApiEndPoint($field),
                "ApiKey" => GlobusRestApiConfig::getGlobusApiKey(), "ApiSecret" => GlobusRestApiConfig::getGlobusApiSecretKey()];
        }

        $apiEndpoint[] = [
            "url" => Config::get(CustomerConstants::CDC_CONSTANTS)['globus_cdc_credentials']['cdcApiUrl'],
            "ApiKey" => Config::get(CustomerConstants::CDC_CONSTANTS)['globus_cdc_credentials']['cdcApiKey'], "ApiSecret" => Config::get(CustomerConstants::CDC_CONSTANTS)['globus_cdc_credentials']['cdcApiSecretKey']];

        if ($codeBucket === 'DE') {
            $apiEndpoint[] = [
                "url" => Config::get(FactFinderNgConstants::FACT_FINDER_URL),
                "Username" => Config::get(FactFinderNgConstants::FACT_FINDER_USERNAME), "Password" => Config::get(FactFinderNgConstants::FACT_FINDER_PASSWORD)];
        }

        if ($codeBucket === 'CZ') {
            $apiEndpoint[] = [
                "url" => Config::get(ApiClient::GSOA_ROOT_URL) . '/ProductCatalog/2/productCategoriesEshop',
                "BearerToken" => $this->getBearerToken()];
        }

        return $apiEndpoint;
    }

    /**
     * @param array $apiEndpointList
     *
     * @return array|false
     */
    protected function checkEndpointStatus(array $apiEndpointList)
    {
        $apiEndpointStatusList = [];
        $header = [];

        foreach ($apiEndpointList as $apiEndpoint) {
            if (isset($apiEndpoint['ApiKey']) && isset($apiEndpoint['ApiSecret'])) {
                $header = [
                    'APIKey: ' . $apiEndpoint['ApiKey'],
                    'APISecret: ' . $apiEndpoint['ApiSecret'],
                    'Content-Type: application/json',
                ];
            } elseif (isset($apiEndpoint['Username']) && isset($apiEndpoint['Password'])) {
                $header = [
                    'Username: ' . $apiEndpoint['Username'],
                    'Password: ' . $apiEndpoint['Password'],
                    'Content-Type: application/json',
                ];
            } elseif (isset($apiEndpoint['BearerToken'])) {
                $header = [
                    'Authorization: Bearer ' . $apiEndpoint['BearerToken'],
                    'Content-Type: application/json',
                ];
            }

            $url = $apiEndpoint['url'];

            $curl = curl_init($url);

            if ($curl === false) {
                return false;
            }

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($curl, CURLOPT_MAXREDIRS, 5);

            curl_exec($curl);
            if (curl_errno($curl)) {
                curl_close($curl);

                return false;
            }
            $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);
            $apiEndpointStatusList[] = [$apiEndpoint['url'] => $code];
        }

        return $apiEndpointStatusList;
    }

    /**
     * @param array $data
     *
     * @return string
     */
    protected function getEmailBody(array $data): string
    {
        $header = "<table>
        <thead>
            <tr>
                <th>API Endpoint</th>
                <th>HTTP status code</th>
            </tr>
        </thead>";

        $rowTemplate = " <tr>
                <td>{{endpoint_url}}</td>
                <td>{{http_status_code}}</td>

            </tr>";

        foreach ($data as $row) {
            $res = $rowTemplate;
            foreach ($row as $key => $value) {
                $res = str_replace("{{endpoint_url}}", $key, $res);
                $res = str_replace("{{http_status_code}}", $value, $res);
            }
            $header .= $res;
        }
        $header .= "</table>";

        return $header;
    }

    /**
     * @return string
     */
    private function getBearerToken(): string
    {
        $client = new TokenProvider();

        return $client->getBearerToken(TokenScope::PRODUCT_CATALOG);
    }
}
