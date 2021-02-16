<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication;

use Pyz\Zed\Customer\Communication\Form\AddressForm;
use Pyz\Zed\Customer\Communication\Table\AddressTable;
use Pyz\Zed\Customer\Communication\Table\CustomerTable;
use Pyz\Zed\Customer\CustomerDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Customer\Communication\CustomerCommunicationFactory as SprykerCustomerCommunicationFactory;

class CustomerCommunicationFactory extends SprykerCustomerCommunicationFactory
{
    public const FACADE_ACL = 'FACADE_ACL';

    /**
     * @return \Pyz\Zed\Customer\Communication\Table\CustomerTable
     */
    public function createCustomerTable()
    {
        return new CustomerTable(
            $this->getQueryContainer(),
            $this->getUtilDateTimeService(),
            $this->createCustomerTableActionPluginExecutor(),
            $this->getAclFacade(),
            $this->getUserFacade()
        );
    }

    /**
     * @param int $idCustomer
     *
     * @return \Spryker\Zed\Customer\Communication\Table\AddressTable
     */
    public function createCustomerAddressTable($idCustomer)
    {
        return new AddressTable(
            $this->getQueryContainer(),
            $idCustomer,
            $this->getUtilSanitizeService(),
            $this->getAclFacade(),
            $this->getUserFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(CustomerDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade()
    {
        return $this->getProvidedDependency(CustomerDependencyProvider::FACADE_USER);
    }

    /**
     * @param array $formData
     * @param array $formOptions
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createAddressForm(array $formData = [], array $formOptions = [])
    {
        return $this->getFormFactory()->create(AddressForm::class, $formData, $formOptions);
    }
}
