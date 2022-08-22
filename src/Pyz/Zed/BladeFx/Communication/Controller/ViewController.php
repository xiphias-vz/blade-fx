<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\BladeFx\Communication\BladeFXCommunicationFactory getFactory()
 * @method \Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface getFacade()
 */
class ViewController extends AbstractController
{
    public const REPORT_ID = 'report_id';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request): array
    {
        $userBladeFxTransfer = $this
            ->getFacade()
            ->provideBladeFxUser()
            ->setReportId($this->castId($request->query->get(static::REPORT_ID)));

        $webPageUrl = $this->getFacade()->provideWebPageUrl($userBladeFxTransfer);

        return $this->viewResponse([
            'webPageUrl' => $webPageUrl,
        ]);
    }
}
