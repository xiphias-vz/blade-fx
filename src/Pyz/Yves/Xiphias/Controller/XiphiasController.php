<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Xiphias\Controller;

use Elastica\JSON;
use Exception;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class XiphiasController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request)
    {
        if ($request->getMethod() != 'GET') {
            $urlPrefix = $request->request->get("txtHostUrl");
            $url = $request->request->get("txtUrl");
            $fullUrl = $urlPrefix . $url;
            $dataForApi = '{"id": "' . $request->request->get("txtParam1") . '"}';

            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => $fullUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $request->request->get("txtMethod"),
                CURLOPT_POSTFIELDS => $dataForApi,
                CURLOPT_HTTPHEADER => [
                    'APIKey: ' . $request->request->get("txtApiKey"),
                    'APISecret: ' . $request->request->get("txtApiSecret"),
                    'Content-Type: application/json',
                ],
            ]);

            try {
                $resultAPI = curl_exec($curl);
                $newCardResult = json_encode($resultAPI);
            } catch (Exception $ex) {
                $newCardResult = 'no data';
                $resultAPI = $ex->getMessage();
            } finally {
                $info = curl_getinfo($curl);
                curl_close($curl);
            }
            $infoJson = json_encode($info);

            return ['data1' => $newCardResult, 'response' => $resultAPI, 'info' => $info, 'infoJson' => $infoJson];
        }

        return $this->viewResponse(
            [
            'data1' => 'submit form',
                'response' => 'submit form',
                'info' => 'submit form',
                'infoJson' => 'submit form']
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function getApiFromRequestAction(Request $request)
    {
        if ($request->getMethod() != 'GET') {
            $urlPrefix = $request->request->get("txtHostUrl");
            $url = $request->request->get("txtUrl");
            $fullUrl = $urlPrefix . $url;
            $dataForApi = '{"id": "' . $request->request->get("txtParam1") . '"}';

            $options = [
                'http' => [
                    'accept' => "Content-type: application/json\r\n",
                    'header' => "Content-type: application/json\r\n" .
                        "Content-Length: " . strlen($dataForApi) . "\r\n" .
                        "APIKey: " . $request->request->get("txtApiKey") . "\r\n" .
                        'APISecret: ' . $request->request->get("txtApiSecret"),
                    'method' => $request->request->get("txtMethod"),
                    'content' => $dataForApi,
                ],
            ];

            $context = stream_context_create($options);
            try {
                $result = file_get_contents($fullUrl, false, $context);
            } catch (Exception $ex) {
                $result = JSON::stringify(["error" => $ex->getMessage(), "error_description" => $ex->getMessage()]);
            }

            return ['result' => $result];
        }

        return ['result' => 'submit form'];
    }
}
