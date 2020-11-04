<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Communication\Controller;

use Pyz\Zed\ProductUpdate\Communication\Form\ProductUpdateForm;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacade getFacade()
 * @method \Pyz\Zed\ProductUpdate\Communication\ProductUpdateCommunicationFactory getFactory()
 * @method \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface getRepository()
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
        $orderGeneratorForm = $this->getFactory()
            ->createProductUpdateForm()
            ->handleRequest($request);

        if ($orderGeneratorForm->isSubmitted() && $orderGeneratorForm->isValid()) {
            $data = $orderGeneratorForm->getData();

            $productUpdaterResults = $this->getFacade()
                ->updateProducts($data[ProductUpdateForm::FIELD_CSV_CONTENT_AREA]);

            foreach ($productUpdaterResults as $productUpdaterResult) {
                $this->addInfoMessage($productUpdaterResult);
            }
        }

        return $this->viewResponse([
            'form' => $orderGeneratorForm->createView(),
        ]);
    }
}
