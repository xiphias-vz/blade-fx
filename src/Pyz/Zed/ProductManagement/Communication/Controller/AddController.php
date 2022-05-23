<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Controller;

use Spryker\Zed\Category\Business\Exception\CategoryUrlExistsException;
use Spryker\Zed\Product\Business\Exception\ProductAbstractExistsException;
use Spryker\Zed\ProductManagement\Communication\Controller\AddController as SprykerAddController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Zed\ProductManagement\Business\ProductManagementFacadeInterface getFacade()
 * @method \Pyz\Zed\ProductManagement\Communication\ProductManagementCommunicationFactory getFactory()
 * @method \Spryker\Zed\ProductManagement\Persistence\ProductManagementQueryContainerInterface getQueryContainer()
 */
class AddController extends SprykerAddController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $dataProvider = $this->getFactory()->createProductFormAddDataProvider();

        $type = $request->query->get('type');

        $form = $this
            ->getFactory()
            ->createProductFormAdd(
                $dataProvider->getData($request->query->get(static::PARAM_PRICE_DIMENSION)),
                $dataProvider->getOptions()
            )
            ->handleRequest($request);

        $localeProvider = $this->getFactory()->createLocaleProvider();

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $productAbstractTransfer = $this->getFactory()
                    ->createProductFormTransferGenerator()
                    ->buildProductAbstractTransfer($form, null);

                $concreteProductCollection = $this->createProductConcreteCollection(
                    $type,
                    $productAbstractTransfer,
                    $form
                );

                $idProductAbstract = $this->getFactory()
                    ->getProductFacade()
                    ->addProduct($productAbstractTransfer, $concreteProductCollection);

                $this->addSuccessMessage('The product [%s] was added successfully.', [
                    '%s' => $productAbstractTransfer->getSku(),
                ]);

                return $this->createRedirectResponseAfterAdd($idProductAbstract, $request);
            } catch (CategoryUrlExistsException $exception) {
                $this->addErrorMessage($exception->getMessage());
            } catch (ProductAbstractExistsException $exception) {
                $this->addErrorMessage($exception->getMessage());
            }
        }

        return $this->viewResponse([
            'form' => $form->createView(),
            'currentLocale' => $this->getFactory()->getLocaleFacade()->getCurrentLocale()->getLocaleName(),
            'concreteProductCollection' => [],
            'localeCollection' => $localeProvider->getLocaleCollection(),
            'attributeLocaleCollection' => $localeProvider->getLocaleCollection(true),
            'productFormAddTabs' => $this->getFactory()->createProductFormAddTabs()->createView(),
            'type' => $type,
        ]);
    }
}
