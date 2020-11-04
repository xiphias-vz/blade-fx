<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Invoice\Communication;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Zed\Invoice\InvoiceDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\Invoice\Business\InvoiceFacadeInterface getFacade()
 * @method \Pyz\Zed\Invoice\InvoiceConfig getConfig()
 */
class InvoiceCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    public function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(InvoiceDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }
}
