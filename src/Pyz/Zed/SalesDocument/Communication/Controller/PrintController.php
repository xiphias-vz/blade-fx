<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Communication\Controller;

use DateTime;
use Generated\Shared\Transfer\StorePickingListCollectionTransfer;
use Pyz\Zed\SalesDocument\Communication\Form\StorePickingListForm;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Zed\SalesDocument\Communication\SalesDocumentCommunicationFactory getFactory()
 * @method \Pyz\Zed\SalesDocument\Business\SalesDocumentFacadeInterface getFacade()
 */
class PrintController extends AbstractController
{
    public const STORE_PICKING_LIST_HTML_FOR_PDF_TEMPLATE = '@SalesDocument/PdfTemplate/store-picking-list.twig';
    public const STORE_PICKING_LIST_HTML_TEMPLATE = '@SalesDocument/HtmlTemplate/store-picking-list.twig';

    public const FILE_NAME_STORE_PICKING_LIST_PDF = 'store-picking-list.pdf';

    protected const INFO_MESSAGE_NO_ORDERS_FOUND = 'sales-document.store-picking.message.no-orders-found';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function storePickingAction(Request $request)
    {
        $storePickingListFormDataProvider = $this->getFactory()->createStorePickingListFormDataProvider();

        $storePickingListForm = $this->getFactory()
            ->createStorePickingListForm(
                null,
                $storePickingListFormDataProvider->getOptions()
            )
            ->handleRequest($request);

        if ($storePickingListForm->isSubmitted() && $storePickingListForm->isValid()) {
            $storePickingListFormData = $storePickingListForm->getData();

            $pickingDate = $this->getPickingDateFromFormData($storePickingListFormData);
            $merchantReference = $this->getMerchantReferenceFromFormData($storePickingListFormData);
            $exportType = $this->getExportTypeFromFormData($storePickingListFormData);

            $storePickingListCollection = $this->getFacade()
                ->generateStorePickingListContent($pickingDate, $merchantReference);

            if ($storePickingListCollection->getStorePickingLists()->count() === 0) {
                $this->addInfoMessage(static::INFO_MESSAGE_NO_ORDERS_FOUND);

                return $this->viewResponse([
                    'form' => $storePickingListForm->createView(),
                ]);
            }

            if ($exportType === StorePickingListForm::OPTION_EXPORT_TYPE_HTML) {
                return $this->generateHtmlResponse($storePickingListCollection);
            }

            return $this->generatePdfResponse($storePickingListCollection);
        }

        return $this->viewResponse([
            'form' => $storePickingListForm->createView(),
        ]);
    }

    /**
     * @param array $formData
     *
     * @return string
     */
    protected function getExportTypeFromFormData(array $formData): string
    {
        return $formData[StorePickingListForm::FIELD_EXPORT_TYPE];
    }

    /**
     * @param \Generated\Shared\Transfer\StorePickingListCollectionTransfer $storePickingListCollection
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function generateHtmlResponse(StorePickingListCollectionTransfer $storePickingListCollection)
    {
        $storePickingListHtmlContent = $this->generateHtmlContent(
            $storePickingListCollection,
            StorePickingListForm::OPTION_EXPORT_TYPE_HTML
        );

        return new Response($storePickingListHtmlContent);
    }

    /**
     * @param array $storePickingListFormData
     *
     * @return string
     */
    protected function getMerchantReferenceFromFormData(array $storePickingListFormData): string
    {
        return $storePickingListFormData[StorePickingListForm::FIELD_MERCHANT_REFERENCE] ?? '';
    }

    /**
     * @param array $storePickingListFormData
     *
     * @return \DateTime
     */
    protected function getPickingDateFromFormData(array $storePickingListFormData): DateTime
    {
        return $storePickingListFormData[StorePickingListForm::FIELD_PICKING_DATE];
    }

    /**
     * @param \Generated\Shared\Transfer\StorePickingListCollectionTransfer $storePickingListCollection
     * @param string $exportType
     *
     * @return string
     */
    protected function generateHtmlContent(StorePickingListCollectionTransfer $storePickingListCollection, string $exportType): string
    {
        $templateFileName = $exportType === StorePickingListForm::OPTION_EXPORT_TYPE_HTML
            ? static::STORE_PICKING_LIST_HTML_TEMPLATE
            : static::STORE_PICKING_LIST_HTML_FOR_PDF_TEMPLATE;

        return $this->getFactory()
            ->createHtmlRenderer()
            ->render(
                $templateFileName,
                [
                    'storePickingListCollection' => $storePickingListCollection->getStorePickingLists(),
                ]
            );
    }

    /**
     * @param \Generated\Shared\Transfer\StorePickingListCollectionTransfer $storePickingListCollection
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function generatePdfResponse(StorePickingListCollectionTransfer $storePickingListCollection): Response
    {
        $storePickingListHtmlContent = $this->generateHtmlContent(
            $storePickingListCollection,
            StorePickingListForm::OPTION_EXPORT_TYPE_HTML
        );

        $pdfParametersTransfer = $this->getFactory()->getConfig()->getStorePickingListPdfParameters();

        $pdfContent = $this->getFactory()->getPdfClient()
            ->generateFromHTML(
                $storePickingListHtmlContent,
                $pdfParametersTransfer
            );

        return $this->getFactory()->getPdfClient()
            ->createInlinePdfResponse($pdfContent, static::FILE_NAME_STORE_PICKING_LIST_PDF);
    }
}
