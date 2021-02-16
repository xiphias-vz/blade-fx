<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Table;

use Orm\Zed\Customer\Persistence\SpyCustomer;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Customer\Communication\Table\CustomerTable as SpyCustomerTable;
use Spryker\Zed\Customer\Communication\Table\PluginExecutor\CustomerTableExpanderPluginExecutorInterface;
use Spryker\Zed\Customer\Dependency\Service\CustomerToUtilDateTimeServiceInterface;
use Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;

class CustomerTable extends SpyCustomerTable
{
    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @param \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface $customerQueryContainer
     * @param \Spryker\Zed\Customer\Dependency\Service\CustomerToUtilDateTimeServiceInterface $utilDateTimeService
     * @param \Spryker\Zed\Customer\Communication\Table\PluginExecutor\CustomerTableExpanderPluginExecutorInterface $customerTableExpanderPluginExecutor
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     */
    public function __construct(
        CustomerQueryContainerInterface $customerQueryContainer,
        CustomerToUtilDateTimeServiceInterface $utilDateTimeService,
        CustomerTableExpanderPluginExecutorInterface $customerTableExpanderPluginExecutor,
        AclFacadeInterface $aclFacade,
        SalesToUserInterface $userFacade
    ) {
        parent::__construct($customerQueryContainer, $utilDateTimeService, $customerTableExpanderPluginExecutor);

        $this->aclFacade = $aclFacade;
        $this->userFacade = $userFacade;
    }

    /**
     * @param \Orm\Zed\Customer\Persistence\SpyCustomer|null $customer
     *
     * @return string
     */
    protected function buildLinks(?SpyCustomer $customer = null)
    {
        if ($customer === null) {
            return '';
        }

        $buttons = [];

        $idUser = $this->userFacade->getCurrentUser()->getIdUser();
        $userGroup = $this->aclFacade->getUserGroups($idUser)->getGroups()[0]->getName();

        $buttons[] = $this->generateViewButton('/customer/view?id-customer=' . $customer->getIdCustomer(), 'View');

        if ($userGroup != 'support_center_group') {
            $buttons[] = $this->generateEditButton('/customer/edit?id-customer=' . $customer->getIdCustomer(), 'Edit');
        }

        $buttons = $this->expandLinks($buttons, $customer);

        return implode(' ', $buttons);
    }
}
