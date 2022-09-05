<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace BladeFxSpryker\Zed\Sales\Communication\Controller;

use Generated\Shared\Transfer\OrderDataTransfer;
use Pyz\Zed\Sales\SalesConfig;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Spryker\Zed\Sales\Business\SalesFacadeInterface getFacade()
 * @method \Spryker\Zed\Sales\Persistence\SalesQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Sales\Persistence\SalesRepositoryInterface getRepository()
 */
class ViewReportController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|array
     */
    public function indexAction(Request $request)
    {
        $idSalesOrder = $request->query->get(SalesConfig::PARAM_ID_SALES_ORDER);
        $orderReference = $request->query->get(SalesConfig::PARAM_ORDER_REFERENCE);
        $idReport = $request->query->get(SalesConfig::PARAM_ID_REPORT);

        $bladeFxFacade = $this->getFactory()->getBladeFxFacade();
        $userBladeFxTransfer = $bladeFxFacade->provideBladeFxUser();

        $orderDataTransfer = new OrderDataTransfer();
        $orderDataTransfer
            ->setOrderReference($orderReference)
            ->setIdReport($idReport);

        $orderDetailIframeUrl = $bladeFxFacade->provideOrderReferenceWebPageReport($userBladeFxTransfer, $orderDataTransfer);

        return $this->viewResponse([
            'idSalesOrder' => $idSalesOrder,
            'orderDetailIframeUrl' => $orderDetailIframeUrl,
        ]);
    }
}
