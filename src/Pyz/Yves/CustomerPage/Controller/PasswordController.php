<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiClientAccount;
use SprykerShop\Yves\CustomerPage\Controller\PasswordController as SprykerPasswordController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class PasswordController extends SprykerPasswordController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function passwordChangeAction(Request $request)
    {
        return $this->view([
            'customerDeleteForm' => [],
        ], [], '@CustomerPage/views/password-change/password-change.twig');
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function passwordResetAction(Request $request): JsonResponse
    {
        $email = $request->request->get('id');
        $result = GlobusRestApiClientAccount::passwordReset($email);
        $jsonResponse = new JsonResponse($result);

        return $jsonResponse;
    }
}
