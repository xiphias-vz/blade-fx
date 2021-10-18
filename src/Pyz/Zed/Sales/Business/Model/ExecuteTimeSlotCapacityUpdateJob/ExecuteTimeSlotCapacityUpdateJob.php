<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales\Business\Model\ExecuteTimeSlotCapacityUpdateJob;

use Exception;

class ExecuteTimeSlotCapacityUpdateJob
{
    protected const LOCAL_SCHEDULER_NAME = 'scheduler.globus.local';

    /**
     * @param string $storeName
     *
     * @return void
     */
    public function executeTimeSlotCheckJenkinsJob(string $storeName): void
    {
        $domainName = $_SERVER["HTTP_HOST"];
        $jenkinsDomainName = str_replace('backoffice', 'jenkins', $domainName);
        $isDevelopmentEnvironment = $this->checkIsDevelopmentEnvironment($jenkinsDomainName);
        if ($isDevelopmentEnvironment) {
            $jenkinsDomainName = static::LOCAL_SCHEDULER_NAME;
        }
        $fullUrl = 'http://' . $jenkinsDomainName . '/job/' . $storeName . '__timeslot-check/build';
        $curl = curl_init();
        try {
            curl_setopt_array($curl, [
                CURLOPT_URL => $fullUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
            ]);
            curl_exec($curl);
        } catch (Exception $e) {
        } finally {
            curl_close($curl);
        }
    }

    /**
     * @param string $jenkinsDomainName
     *
     * @return bool
     */
    public function checkIsDevelopmentEnvironment(string $jenkinsDomainName): bool
    {
        if (str_contains($jenkinsDomainName, 'globus.local')) {
            return true;
        }

        return false;
    }
}
