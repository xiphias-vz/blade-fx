<?php

namespace BladeFxSpryker\Zed\BladeFx;

use BladeFxSpryker\Shared\BladeFx\BladeFxConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class BladeFxConfig extends AbstractBundleConfig
{
    public const PATH_TAG_USER = 'Table';
    public const PATH_TAG_REPORTS = 'Table1';

    /**
     * @return string
     */
    public function getWebServiceUrlFile(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_SERVICE)[BladeFxConstants::BLADE_FX_WEB_SERVICE_FILE];
    }

    /**
     * @return string
     */
    public function getBladeFxUserUrlInfo(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_SERVICE)[BladeFxConstants::BLADE_FX_USER_INFO];
    }

    /**
     * @return string
     */
    public function getBladeFxReportUrlList(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_SERVICE)[BladeFxConstants::BLADE_FX_REPORT_LIST];
    }

    /**
     * @return string
     */
    public function getBladeFxPrintOutFileUrl(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_SERVICE)[BladeFxConstants::BLADE_FX_URL_PRINT_OUT_FILE];
    }

    /**
     * @return string
     */
    public function getBladeFxMobileFileUrl(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_SERVICE)[BladeFxConstants::BLADE_FX_URL_MOBILE_FILE];
    }

    /**
     * @return string
     */
    public function getBladeFxReportsHost(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_REPORTS_HOST);
    }

    /**
     * @return string
     */
    public function getBladeFxThisHost(): string
    {
        return $this->get(BladeFxConstants::BLADE_FX_X_THIS_HOST);
    }

    /**
     * @return string
     */
    public function getPathTagUser(): string
    {
        return static::PATH_TAG_USER;
    }

    /**
     * @return string
     */
    public function getPathTagReports(): string
    {
        return static::PATH_TAG_REPORTS;
    }
}
