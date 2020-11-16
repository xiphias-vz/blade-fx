<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ErrorPage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class Error503Controller extends AbstractController
{
    protected const REQUEST_PARAM_EXCEPTION = 'exception';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request)
    {
        return $this->view([
            'error' => $request->query->get(static::REQUEST_PARAM_EXCEPTION),
            'hideUserMenu' => true,
        ], [], '@ErrorPage/views/error503/error503.twig');
    }
}
