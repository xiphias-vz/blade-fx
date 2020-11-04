<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PostingExport\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\PostingExport\Communication\PostingExportCommunicationFactory getFactory()
 * @method \Pyz\Zed\PostingExport\Business\PostingExportFacadeInterface getFacade()
 */
class IndexController extends AbstractController
{
    public const FIELD_DATE_FROM = 'date-from';
    public const FIELD_DATE_TO = 'date-to';
    public const ACTION_SOLD_PRODUCTS = 'sold-products';
    public const ACTION_POSTINGS = 'postings';
    public const ACTION_POS = 'pos';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $exportForm = $this->getFactory()
            ->createExportForm()
            ->handleRequest($request);

        if ($exportForm->isSubmitted() && $exportForm->isValid()) {
            $data = $exportForm->getData();

            if ($request->request->has(self::ACTION_POSTINGS)) {
                $postingExportContentsTransfer = $this->getFacade()
                    ->generatePostingExportContent($data[self::FIELD_DATE_FROM], $data[self::FIELD_DATE_TO]);
            }

            if ($request->request->has(self::ACTION_SOLD_PRODUCTS)) {
                $postingExportContentsTransfer = $this->getFacade()
                    ->generateSoldProductsContent($data[self::FIELD_DATE_FROM], $data[self::FIELD_DATE_TO]);
            }

            if (isset($postingExportContentsTransfer)) {
                return $this->getFactory()->createExportCsvResponseBuilder()->buildResponse($postingExportContentsTransfer);
            }

            if ($request->request->has(self::ACTION_POS)) {
                $postingExportContentsTransfer = $this->getFacade()
                    ->generatePosExportContent($data[self::FIELD_DATE_FROM], $data[self::FIELD_DATE_TO]);

                return $this->getFactory()
                    ->createExportJsonResponseBuilder()
                    ->buildResponse($postingExportContentsTransfer);
            }
        }

        return $this->viewResponse([
            'form' => $exportForm->createView(),
        ]);
    }
}
