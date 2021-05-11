<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Controller;

use Pyz\Shared\Acl\AclConstants;
use Pyz\Shared\Url\UrlConfig;
use Pyz\Zed\Application\Url\SafeUrl;
use Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException;
use Spryker\Zed\MerchantGui\Communication\Controller\EditMerchantController as SprykerEditMerchantController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\MerchantGui\Communication\MerchantGuiCommunicationFactory getFactory()
 */
class EditMerchantController extends SprykerEditMerchantController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @throws \Spryker\Zed\Kernel\Communication\Exception\ForbiddenRedirectException
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $response = parent::indexAction($request);
        if ($response instanceof RedirectResponse) {
            $redirectUrl = $response->getTargetUrl();

            if (!SafeUrl::isUrlSafe($redirectUrl)) {
                throw new ForbiddenRedirectException(sprintf(UrlConfig::ERROR_URL_DOMAIN, $redirectUrl));
            }
        } else {
            $isCurrentUserAdmin = $this->isCurrentUserAdmin();
            $response['isCurrentUserAdmin'] = $isCurrentUserAdmin;
        }

        return $response;
    }

    /**
     * @return bool
     */
    protected function isCurrentUserAdmin(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::ROOT_GROUP) {
                return true;
            }
        }

        return false;
    }
}
