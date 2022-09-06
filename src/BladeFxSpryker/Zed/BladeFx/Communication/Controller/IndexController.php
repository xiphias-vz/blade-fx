<?php

namespace BladeFxSpryker\Zed\BladeFx\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @method \BladeFxSpryker\Zed\BladeFx\Communication\BladeFXCommunicationFactory getFactory()
 * @method \BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface getFacade()
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
