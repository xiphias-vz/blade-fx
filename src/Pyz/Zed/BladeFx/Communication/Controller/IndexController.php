<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @method \Pyz\Zed\BladeFx\Communication\BladeFXCommunicationFactory getFactory()
 * @method \Pyz\Zed\BladeFx\Business\BladeFxFacadeInterface getFacade()
 */
class IndexController extends AbstractController
{
    /**
     * @return array
     */
    public function indexAction(): array
    {
        $bladeFxTable = $this->getFactory()->createBladeFXTable();

        return [
            'bladeFxReports' => $bladeFxTable->render(),
        ];
    }

    /**
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function bladeFxTableAction(): JsonResponse
    {
        $table = $this->getFactory()->createBladeFXTable();

        return $this->jsonResponse(
            $table->fetchData()
        );
    }
}
