<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Caller;

use Exception;

class BladeFxRequestCaller implements BladeFxRequestCallerInterface
{
    /**
     * @param string $url
     * @param string $resource
     * @param string $request
     *
     * @return string
     */
    public function call(string $url, string $resource, string $request): string
    {
        $result = '';

        $curl = curl_init();

        try {
            curl_setopt_array($curl, [
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 14400,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => $request,
                CURLOPT_HTTPHEADER => [
                    'SOAPAction: ' . $resource,
                    'Content-Type: text/xml; charset=utf-8',
                ],
            ]);
            $result = curl_exec($curl);

            return $result;
        } catch (Exception $e) {
        } finally {
            curl_close($curl);
        }

        return $result;
    }
}
