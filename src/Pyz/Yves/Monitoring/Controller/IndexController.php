<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Monitoring\Controller;

use Generated\Shared\Transfer\MonitoringTransfer;
use Pyz\Client\MonitoringStorage\MonitoringStorageClient;
use Pyz\Client\MonitoringStorage\MonitoringStorageClientInterface;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Client\Monitoring\MonitoringClient getClient()
 */
class IndexController extends AbstractController
{
    /*
    * encoding map: database: ZGF0YWJhc2U=
                    redis: cmVkaXM=
                    factFinder: ZmFjdEZpbmRlcg==
                    elasticsearch: ZWxhc3RpY3NlYXJjaA==
    * */

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request)
    {
        $data = ['monitoring' => 'monitoring']; //TODO: This was just part of the twig response, change the data later

        $urlQuery = base64_decode(parse_url($request->getRequestUri(), PHP_URL_QUERY));

        switch ($urlQuery) {
            case 'database':
                $data = $this->testDatabase();
                break;
            case 'redis':
                $data = $this->testRedis();
                break;
            case 'factFinder':
                $data = $this->testFactFinder();
                break;
            case 'elasticsearch':
                $data = $this->testElasticSearch();
                break;
            default:
                $this->setError404Header();
        }

        return $this->view($data, [], '@Monitoring/views/index/index.twig');
    }

    /**
     * @return void
     */
    protected function setError404Header(): void
    {
        http_response_code(404);
        die();
    }

    /**
     * @return string[]
     */
    protected function testDatabase(): array
    {
        try {
            $monitoringTransfer = new MonitoringTransfer();
            $monitoringTransfer->setDbResponse('NO_VERSION');
            $monitoringTransfer = $this->getClient()
                ->getDBVersion($monitoringTransfer);
            $monitoringTransfer = $this->getStorageClient()->getKeysFromRedis($monitoringTransfer);
            $dbVersion = $monitoringTransfer->getDbResponse();
            if ($dbVersion == 'NO_VERSION' || $dbVersion == '' || $dbVersion == null) {
                $this->setError404Header();
            }

            return ['monitoring' => $dbVersion];
        } catch (Exception $exception) {
            $this->setError404Header();
        }

        return ['monitoring' => '', 'redis' => []];
    }

    /**
     * @return string[]
     */
    protected function testRedis(): array
    {
        try {
            $monitoringTransfer = new MonitoringTransfer();
            $monitoringTransfer->setRedisKeys(['NO_KEYS' => 'NO_KEYS']);
            $monitoringTransfer = $this->getClient()
                ->getDBVersion($monitoringTransfer);
            $monitoringTransfer = $this->getStorageClient()
                ->getKeysFromRedis($monitoringTransfer);
            $redisResponse = $monitoringTransfer->getRedisResponse();
            if ($redisResponse[0] == null || $redisResponse[1] == null) {
                $this->setError404Header();
            }
            if ($monitoringTransfer->getLastStore() == false) {
                $this->setStoreCookie($monitoringTransfer->getNextStore());
                header("Refresh:0");
            }else{
                $this->setStoreCookie($monitoringTransfer->getNextStore());
            }
            $redisDB = $monitoringTransfer->getRedisKeys();
        } catch (Exception $e) {
            $this->setError404Header();
        }

        return ['monitoring' => '', 'redis' => $redisDB];
    }

    /**
     * @return array
     */
    protected function testFactFinder(): array
    {
        try {
            $response = $this->getClient()->getFFResponse('banane');
            if ($response == null) {
                $this->setError404Header();
            } elseif (isset($response['totalHits']) && $response['totalHits'] == 0) {
                $this->setError404Header();
            } elseif (isset($response['error'])) {
                $this->setError404Header();
            }
        } catch (Exception $exception) {
            $this->setError404Header();
        }

        return ['monitoring' => 'FACTFINDER IS RETURNING RESULT FOR TERM banane', 'redis' => []];
    }

    /**
     * @return array
     */
    protected function testElasticSearch(): array
    {
        try {
            $monitoringTransfer = new MonitoringTransfer();
            $monitoringTransfer->setEsResponse(['NO_RESPONSE' => 'NO_RESPONSE']);
            $searchResult = $this->getClient()->getEsResult('Banány');
            $response = $searchResult->getResponse()->getData()['hits'];
            if ($searchResult == null) {
                $this->setError404Header();
            } elseif ($response['total'] == 0) {
                $this->setError404Header();
            }
        } catch (Exception $exception) {
            $this->setError404Header();
        }

        return ['monitoring' => 'ELASTICSEARCH IS RETURNING RESULT FOR TERM Banány', 'redis' => []];
    }

    /**
     * @return \Pyz\Client\MonitoringStorage\MonitoringStorageClientInterface
     */
    protected function getStorageClient(): MonitoringStorageClientInterface
    {
        return new MonitoringStorageClient();
    }

    /**
     * @return void
     */
    protected function setStoreCookie(string $store): void
    {
        if($store != ''){
            setcookie("current_store", $store, time() + 3600, '/');
            $_COOKIE['current_store'] = $store;
        }
        else{
            $codeBucket = getenv('SPRYKER_CODE_BUCKET');
            if($codeBucket == 'DE'){
                $store = 'EIN';
            }else{
                $store = 'OST';
            }
            setcookie("current_store", $store, time() + 3600, '/');
            $_COOKIE['current_store'] = $store;

        }
    }
}
