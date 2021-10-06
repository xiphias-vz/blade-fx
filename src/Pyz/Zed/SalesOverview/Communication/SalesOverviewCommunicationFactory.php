<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Communication;

use Pyz\Zed\SalesOverview\Persistence\SalesOverviewRepositoryInterface;
use Pyz\Zed\SalesOverview\SalesOverviewDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\SalesOverview\SalesOverviewConfig getConfig()
 * @method \Pyz\Zed\SalesOverview\Persistence\SalesOverviewRepositoryInterface getRepository()
 * @method \Pyz\Zed\SalesOverview\Persistence\SalesOverviewQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\SalesOverview\Business\SalesOverviewFacadeInterface getFacade()
 **/
class SalesOverviewCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return array
     */
    public function merchantList(): array
    {
        return $this->getConfig()->getMerchantList();
    }

    /**
     * @return array
     */
    public function choiceFilter(): array
    {
        return $this->getConfig()->getChoiceForDisplay();
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade()
    {
        return $this->getProvidedDependency(SalesOverviewDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(SalesOverviewDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Zed\SalesOverview\Persistence\SalesOverviewRepositoryInterface
     */
    public function getSalesOverviewRepository(): SalesOverviewRepositoryInterface
    {
        return $this->getRepository();
    }

    /**
     * @return array
     */
    public function getTableHeaderContent(): array
    {
        return $this->getConfig()->getTableHeader();
    }

    /**
     * @return array
     */
    public function getTimeSlotsForTableRows(): array
    {
        return $this->getConfig()->getTimeSlots();
    }
}
