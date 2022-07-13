<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\GlobusRestApiClient\Provider;

class GlobusRestApiAddressResult
{
    /* Response from globus API :
    {
        "lastName": "Test",
        "firstName": "User",
        "address": {
            "zip": "11453",
            "houseNo": "15",
            "street": "Strasse",
            "city": "Berlin"
        },
        "display": false,
        "code": "UN"
        }
     */

    /**
     * @param \Pyz\Shared\GlobusRestApiClient\Provider\GlobusRestApiResult $result
     * @param bool $mainGlobus
     * @param bool $we
     *
     * @return array
     */
    public function getResult(GlobusRestApiResult $result, bool $mainGlobus, bool $we): array
    {
        $ret = $this->getNotFoundSettings();
        if ($result->isSuccess) {
            $api = json_decode($result->result, true);
            $ret['result'] = $api;
            $ret['code'] = $api['code'];
            $ret['display'] = $api['display'];
            foreach ($this->getSettings() as $setting) {
                if ($setting['code'] === $api['code']) {
                    if ($setting['display'] === $api['display']) {
                        if ($setting['mainGlobus'] === $mainGlobus) {
                            if ($setting['we'] === $we) {
                                $setting['result'] = $api;

                                return $setting;
                            }
                        }
                    }
                }
            }
        }

        return $ret;
    }

    /**
     * @return array[]
     */
    public function getSettings(): array
    {
        return [
            ['code' => 'UN', 'display' => false, 'mainGlobus' => true, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'UN', 'display' => false, 'mainGlobus' => false, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'UN', 'display' => false, 'mainGlobus' => false, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'UN', 'display' => false, 'mainGlobus' => true, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'NV', 'display' => false, 'mainGlobus' => true, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'NV', 'display' => false, 'mainGlobus' => false, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'NV', 'display' => false, 'mainGlobus' => false, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'NV', 'display' => false, 'mainGlobus' => true, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VA', 'display' => false, 'mainGlobus' => true, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VA', 'display' => false, 'mainGlobus' => false, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VA', 'display' => false, 'mainGlobus' => false, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VA', 'display' => false, 'mainGlobus' => true, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => false, 'mainGlobus' => true, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => true, 'showScanAndGoNotActivateHint' => false],
            ['code' => 'VZ', 'display' => false, 'mainGlobus' => false, 'we' => true, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => false, 'mainGlobus' => false, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => false, 'mainGlobus' => true, 'we' => false, 'showOverlay' => false, 'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => true, 'showScanAndGoNotActivateHint' => false],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => true, 'we' => true, 'showOverlay' => true, 'addressSelection' => 'USER', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => false, 'we' => true, 'showOverlay' => true, 'addressSelection' => 'USER', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => false, 'we' => false, 'showOverlay' => true, 'addressSelection' => 'USER', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => true, 'we' => false, 'showOverlay' => true, 'addressSelection' => 'USER', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => true, 'we' => true, 'showOverlay' => true, 'addressSelection' => 'API', 'showWeHint' => true, 'showScanAndGoActivateHint' => true, 'showScanAndGoNotActivateHint' => false],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => false, 'we' => true, 'showOverlay' => true, 'addressSelection' => 'API', 'showWeHint' => true, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => false, 'we' => false, 'showOverlay' => true, 'addressSelection' => 'API', 'showWeHint' => false, 'showScanAndGoActivateHint' => false, 'showScanAndGoNotActivateHint' => true],
            ['code' => 'VZ', 'display' => true, 'mainGlobus' => true, 'we' => false, 'showOverlay' => true, 'addressSelection' => 'API', 'showWeHint' => false, 'showScanAndGoActivateHint' => true, 'showScanAndGoNotActivateHint' => false],
        ];
    }

    /**
     * @return array
     */
    public function getNotFoundSettings(): array
    {
        return [
        'code' => 'X',
        'display' => false,
        'mainGlobus' => true,
        'we' => true,
        'showOverlay' => false,
            'addressSelection' => 'NONE', 'showWeHint' => false, 'showScanAndGoActivateHint' => false,
            'showScanAndGoNotActivateHint' => false, 'result' => []];
    }
}
