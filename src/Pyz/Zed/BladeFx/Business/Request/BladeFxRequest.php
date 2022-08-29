<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Request;

use Generated\Shared\Transfer\UserBladeFxTransfer;
use Pyz\Zed\BladeFx\BladeFxConfig;

class BladeFxRequest implements BladeFxRequestInterface
{
    /**
     * @var \Pyz\Zed\BladeFx\BladeFxConfig
     */
    protected BladeFxConfig $bladeFxConfig;

    /**
     * @param \Pyz\Zed\BladeFx\BladeFxConfig $bladeFxConfig
     */
    public function __construct(BladeFxConfig $bladeFxConfig)
    {
        $this->bladeFxConfig = $bladeFxConfig;
    }

    /**
     * @return string
     */
    public function loggedInUserRequest(): string
    {
        return '<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <GetUserInfo xmlns=' . '"' . $this->bladeFxConfig->getBladeFxThisHost() . '"' . '>
                  <pUserData>user|user</pUserData>
                </GetUserInfo>
              </soap:Body>
            </soap:Envelope>
        ';
    }

    /**
     * @param \Generated\Shared\Transfer\UserBladeFxTransfer $user
     *
     * @return string
     */
    public function reportsForLoggedInUserRequest(UserBladeFxTransfer $user): string
    {
        return '<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetReportListNAtt xmlns=' . '"' . $this->bladeFxConfig->getBladeFxThisHost() . '"' . '>
              <pUserData>' . $user->getUserData() . '</pUserData>
              <pCatId>0</pCatId>
              <pSearchString></pSearchString>
              <pLayouts>|0|</pLayouts>
              <pAttributes></pAttributes>
            </GetReportListNAtt>
          </soap:Body>
        </soap:Envelope>
        ';
    }
}
