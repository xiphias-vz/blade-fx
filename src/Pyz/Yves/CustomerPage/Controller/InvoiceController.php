<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Controller;

use Codeception\Util\HttpCode;
use SprykerShop\Yves\CustomerPage\Controller\AbstractCustomerController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class InvoiceController extends AbstractCustomerController
{
    private const FILENAME_INVOICE_PDF = 'invoice.pdf';
    private const REQUEST_PARAM_ID = 'id';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $invoiceData = $this->getInvoiceData($request->query->getInt(self::REQUEST_PARAM_ID));

        if ($invoiceData === null) {
            return new Response('', HttpCode::NOT_FOUND);
        }

        $twigContent = $this->getFactory()
            ->getTwigEnvironment()
            ->render('@CustomerPage/views/invoice/invoice.twig', $invoiceData);

        $pdfContent = $this->getFactory()
            ->getPdfClient()
            ->generateFromHTML(
                $twigContent,
                $this->getFactory()->getPdfInvoiceConfig()
            );

        return $this->getFactory()
            ->getPdfClient()
            ->createInlinePdfResponse(
                $pdfContent,
                self::FILENAME_INVOICE_PDF
            );
    }

    /**
     * @param int $idSalesOrder
     *
     * @return array|null
     */
    protected function getInvoiceData(int $idSalesOrder): ?array
    {
        $orderDetails = $this->getInvoiceOrderDetailsResponseData($idSalesOrder);

        if (empty($orderDetails)) {
            return null;
        }

        return [
            'orderDetails' => $orderDetails,
        ];
    }

    /**
     * @param int $idSalesOrder
     *
     * @return array
     */
    protected function getInvoiceOrderDetailsResponseData(int $idSalesOrder): array
    {
        $customerTransfer = $this->getLoggedInCustomerTransfer();

        return $this->getFactory()
            ->getOrderDetailClient()
            ->getInvoiceOrderDetailData($idSalesOrder, $customerTransfer->getIdCustomer());
    }
}
