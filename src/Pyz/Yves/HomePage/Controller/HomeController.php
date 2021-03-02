<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\HomePage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function recentArticles()
    {
        return $this->viewResponse(
            []
        );
    }
}
