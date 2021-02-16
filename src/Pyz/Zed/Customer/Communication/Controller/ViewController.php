<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Controller;

use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Zed\Customer\Communication\Controller\ViewController as SpyViewController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerFacadeInterface getFacade()
 * @method \Pyz\Zed\Customer\Communication\CustomerCommunicationFactory getFactory()
 * @method \Pyz\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class ViewController extends SpyViewController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $idCustomer = $request->get(CustomerConstants::PARAM_ID_CUSTOMER);

        if (empty($idCustomer)) {
            return $this->redirectResponse(static::URL_CUSTOMER_LIST_PAGE);
        }

        $idCustomer = $this->castId($idCustomer);
        $idUser = $this->getFactory()
            ->getUserFacade()
            ->getCurrentUser()
            ->getIdUser();
        $userGroup = $this->getFactory()
            ->getAclFacade()
            ->getUserGroups($idUser)
            ->getGroups()[0]
            ->getName();
        $customerTransfer = $this->findCustomerById($idCustomer);

        if ($customerTransfer === null) {
            $this->addErrorMessage(static::MESSAGE_ERROR_CUSTOMER_NOT_EXIST, ['%s' => $idCustomer]);

            return $this->redirectResponse(static::URL_CUSTOMER_LIST_PAGE);
        }

        $addressTable = $this->getFactory()
            ->createCustomerAddressTable($idCustomer);

        $externalBlocks = $this->renderCustomerDetailBlocks($request, $customerTransfer);
        if ($externalBlocks instanceof RedirectResponse) {
            return $externalBlocks;
        }

        return $this->viewResponse([
            'customer' => $customerTransfer,
            'idCustomer' => $idCustomer,
            'addressTable' => $addressTable->render(),
            'blocks' => $externalBlocks,
            'userGroup' => $userGroup,
        ]);
    }
}
