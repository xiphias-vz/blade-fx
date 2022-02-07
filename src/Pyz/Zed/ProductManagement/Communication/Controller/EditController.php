<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication\Controller;

use Generated\Shared\Transfer\StoreTransfer;
use Orm\Zed\Product\Persistence\SpyProductAbstractQuery;
use Pyz\Zed\FactFinderExport\Business\Model\FactFinderEventManager;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Category\Business\Exception\CategoryUrlExistsException;
use Spryker\Zed\ProductManagement\Communication\Controller\EditController as SprykerEditController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\ProductManagement\Communication\ProductManagementCommunicationFactory getFactory()
 */
class EditController extends SprykerEditController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $idProductAbstract = $this->castId($request->get(
            self::PARAM_ID_PRODUCT_ABSTRACT
        ));

        $productAbstractTransfer = $this->getFactory()
            ->getProductFacade()
            ->findProductAbstractById($idProductAbstract);

        if (!$productAbstractTransfer) {
            $this->addErrorMessage('The product [%s] you are trying to edit, does not exist.', [
                '%s' => $idProductAbstract,
            ]);

            return new RedirectResponse('/product-management');
        }

        $dataProvider = $this->getFactory()->createProductFormEditDataProvider();
        $form = $this
            ->getFactory()
            ->createProductFormEdit(
                $dataProvider->getDataExtended($idProductAbstract, $request->query->get(static::PARAM_PRICE_DIMENSION)),
                $dataProvider->getOptions($idProductAbstract)
            )
            ->handleRequest($request);

        $concreteProductCollection = $this->getFactory()
            ->getProductFacade()
            ->getConcreteProductsByAbstractProductId($idProductAbstract);

        $localeProvider = $this->getFactory()->createLocaleProvider();

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $productAbstractTransfer = $this->getFactory()
                    ->createProductFormTransferGenerator()
                    ->buildProductAbstractTransfer($form, $idProductAbstract);

                $productAbstractTransfer->setIdProductAbstract($idProductAbstract);

                $idProductAbstract = $this->getFactory()
                    ->getProductFacade()
                    ->saveProduct($productAbstractTransfer, []);

                $productAbstractEntity = SpyProductAbstractQuery::create()
                    ->filterByIdProductAbstract($idProductAbstract)
                    ->findOne();

                FactFinderEventManager::addEvent(FactFinderEventManager::FF_EVENT_RECORD_UPDATE, $idProductAbstract);

                if (isset($productAbstractEntity)) {
                    $productAbstractEntity->setIsSetFromBo(true);

                    if ($productAbstractEntity->isModified()) {
                        $productAbstractEntity->save();
                    }
                }

                $this->getFactory()
                    ->getProductFacade()
                    ->touchProductAbstract($idProductAbstract);

                $this->addSuccessMessage('The product [%s] was saved successfully.', ['%s' => $productAbstractTransfer->getSku()]);

                return $this->redirectResponse(
                    urldecode(Url::generate('/product-management/edit', $request->query->all())->build())
                );
            } catch (CategoryUrlExistsException $exception) {
                $this->addErrorMessage($exception->getMessage());
            }
        }

        $type = $request->query->get(self::PARAM_PRODUCT_TYPE);

        $variantTable = $this
            ->getFactory()
            ->createVariantTable($idProductAbstract, $type);

        $viewData = [
            'form' => $form->createView(),
            'currentLocale' => $this->getFactory()->getLocaleFacade()->getCurrentLocale()->getLocaleName(),
            'currentProduct' => $productAbstractTransfer->toArray(),
            'superAttributesCount' => $this->getFactory()->createProductAttributeHelper()->getProductAbstractSuperAttributesCount($productAbstractTransfer),
            'concreteProductCollection' => $concreteProductCollection,
            'localeCollection' => $localeProvider->getLocaleCollection(),
            'attributeLocaleCollection' => $localeProvider->getLocaleCollection(true),
            'variantTable' => $variantTable->render(),
            'idProduct' => null,
            'idProductAbstract' => $idProductAbstract,
            'priceDimension' => $request->get(static::PARAM_PRICE_DIMENSION, []),
            'productFormEditTabs' => $this->getFactory()->createProductFormEditTabs()->createView(),
            'supervisorStoreId' => $this->getIdStoreForSupervisor(),
        ];

        $viewData = $this->getFactory()
            ->createAbstractProductEditViewExpanderPluginExecutor()
            ->expandEditAbstractProductViewData($viewData);

        return $this->viewResponse($viewData);
    }

    /**
     * @return int|null
     */
    protected function getIdStoreForSupervisor(): ?int
    {
        $supervisorStoreTransfer = new StoreTransfer();

        $isCurrentUserSupervisor = $this->getFactory()
            ->getUserFacade()
            ->isCurrentUserSupervisor();

        if ($isCurrentUserSupervisor) {
            $supervisorStoreTransfer = $this->getFactory()
                ->getUserFacade()
                ->findStoreRelationForSupervisor();
        }

        return $supervisorStoreTransfer->getIdStore();
    }
}
