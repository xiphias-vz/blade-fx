<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ZeroPricesReportMail\Business;

use Pyz\Zed\ZeroPricesReportMail\ZeroPricesReportMailDependencyProvider;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class ZeroPricesReportMailBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return mixed
     */
    public function getMailFacade()
    {
        return $this->getProvidedDependency(ZeroPricesReportMailDependencyProvider::FACADE_MAIL);
    }
}
