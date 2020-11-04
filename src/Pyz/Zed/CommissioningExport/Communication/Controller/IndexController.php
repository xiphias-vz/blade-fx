<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CommissioningExport\Communication\Controller;

use Pyz\Zed\CommissioningExport\Communication\Form\CommissioningExportForm;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\CommissioningExport\Communication\CommissioningExportCommunicationFactory getFactory()
 */
class IndexController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $commissioningExportForm = $this->getFactory()
            ->createCommissioningExportForm()
            ->handleRequest($request);

        if ($commissioningExportForm->isSubmitted() && $commissioningExportForm->isValid()) {
            $data = $commissioningExportForm->getData();
            $commissioningExportContentsTransfer = $this->getFactory()
                ->getPostingExportFacade()
                ->generateSoldProductsContent($data[CommissioningExportForm::FIELD_DATE_FROM], $data[CommissioningExportForm::FIELD_DATE_TO]);

            return $this->getFactory()
                ->getPostingExportFacade()
                ->buildCsvResponse($commissioningExportContentsTransfer);
        }

        return $this->viewResponse([
            'form' => $commissioningExportForm->createView(),
        ]);
    }
}
