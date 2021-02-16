<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Controller;

use Spryker\Zed\Customer\Communication\Controller\IndexController as SpyIndexController;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Pyz\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Pyz\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class IndexController extends SpyIndexController
{
    /**
     * @return array
     */
    public function indexAction(): array
    {
        $idUser = $this->getFactory()
            ->getUserFacade()
            ->getCurrentUser()
            ->getIdUser();

        $userGroup = $this->getFactory()
            ->getAclFacade()
            ->getUserGroups($idUser)
            ->getGroups()[0]
            ->getName();

        $table = $this->getFactory()
            ->createCustomerTable();

        return $this->viewResponse([
            'customerTable' => $table->render(),
            'userGroup' => $userGroup,
        ]);
    }
}
