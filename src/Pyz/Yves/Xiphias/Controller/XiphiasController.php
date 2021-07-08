<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Xiphias\Controller;

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
                $newCardResult = [json_decode($resultAPI)];
            } catch (Exception $ex) {
                $newCardResult = 'no data';
                $resultAPI = $ex->getMessage();
            } finally {
                $info = curl_getinfo($curl);
                curl_close($curl);
            }

            return ['data' => $newCardResult, 'response' => $resultAPI, 'info' => $info];
        }

        return ['data' => ['submit form'], 'response' => 'submit form', 'info' => 'submit form'];
    }
}
