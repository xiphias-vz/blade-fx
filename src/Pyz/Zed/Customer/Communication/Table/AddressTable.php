<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Table;

use Orm\Zed\Customer\Persistence\Map\SpyCustomerAddressTableMap;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Customer\Communication\Table\AddressTable as SpyAddressTable;
use Spryker\Zed\Customer\Dependency\Service\CustomerToUtilSanitizeServiceInterface;
use Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;

class AddressTable extends SpyAddressTable
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
     * @param int $idCustomer
     * @param \Spryker\Zed\Customer\Dependency\Service\CustomerToUtilSanitizeServiceInterface $utilSanitize
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     */
    public function __construct(
        CustomerQueryContainerInterface $customerQueryContainer,
        int $idCustomer,
        CustomerToUtilSanitizeServiceInterface $utilSanitize,
        AclFacadeInterface $aclFacade,
        SalesToUserInterface $userFacade
    ) {
        parent::__construct($customerQueryContainer, $idCustomer, $utilSanitize);
        $this->aclFacade = $aclFacade;
        $this->userFacade = $userFacade;
    }

    /**
     * @param array $details
     *
     * @return string
     */
    protected function buildLinks(array $details)
    {
        $buttons = [];

        $idCustomerAddress = !empty($details[SpyCustomerAddressTableMap::COL_ID_CUSTOMER_ADDRESS])
            ? $details[SpyCustomerAddressTableMap::COL_ID_CUSTOMER_ADDRESS]
            : null;

        $idUser = $this->userFacade->getCurrentUser()->getIdUser();
        $userGroup = $this->aclFacade->getUserGroups($idUser)->getGroups()[0]->getName();

        if ($idCustomerAddress !== null && $userGroup != 'support_center_group') {
            $buttons[] = $this->generateEditButton(
                Url::generate(static::URL_EDIT_CUSTOMER_ADDRESS, [
                    CustomerConstants::PARAM_ID_CUSTOMER_ADDRESS => $idCustomerAddress,
                    CustomerConstants::PARAM_ID_CUSTOMER => $this->idCustomer,
                ]),
                'Edit'
            );
        }

        return implode(' ', $buttons);
    }
}
