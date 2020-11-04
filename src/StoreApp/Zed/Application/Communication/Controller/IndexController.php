<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Application\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * @method \StoreApp\Zed\Application\Communication\ApplicationCommunicationFactory getFactory()
 */
class IndexController extends AbstractController
{
    private const URL_ACL_INDEX_DENIED = 'acl/index/denied';

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction()
    {
        $redirectUrl = $this->getFactory()->getAclFacade()->getRedirectByLoggedInUser();

        if ($redirectUrl) {
            return new RedirectResponse($redirectUrl);
        }

        return new RedirectResponse(self::URL_ACL_INDEX_DENIED);
    }
}
