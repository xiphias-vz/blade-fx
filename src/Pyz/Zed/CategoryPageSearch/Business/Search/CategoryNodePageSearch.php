<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryPageSearch\Business\Search;

use Spryker\Zed\Category\Business\CategoryFacadeInterface;
use Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchFacadeInterface;
use Spryker\Zed\Locale\Business\LocaleFacadeInterface;
use Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface;

class CategoryNodePageSearch
{
    /**
     * @var \Spryker\Zed\Category\Business\CategoryFacadeInterface
     */
    protected $categoryFacade;

    /**
     * @var \Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface
     */
    protected $productCategoryFacade;

    /**
     * @var \Spryker\Zed\Locale\Business\LocaleFacadeInterface
     */
    protected $localeFacade;

    /**
     * @var \Spryker\Zed\CategoryPageSearch\Business\CategoryPageSearchFacadeInterface
     */
    protected $categoryPageSearchFacade;

    /**
     * @param \Spryker\Zed\Category\Business\CategoryFacadeInterface $categoryFacade
     * @param \Spryker\Zed\ProductCategory\Business\ProductCategoryFacadeInterface $productCategoryFacade
     * @param \Spryker\Zed\Locale\Business\LocaleFacadeInterface $localeFacade
     * @param CategoryPageSearchFacadeInterface $categoryPageSearchFacade
     */
    public function __construct(
        CategoryFacadeInterface $categoryFacade,
        ProductCategoryFacadeInterface $productCategoryFacade,
        LocaleFacadeInterface $localeFacade,
        CategoryPageSearchFacadeInterface $categoryPageSearchFacade
    ) {
        $this->categoryFacade = $categoryFacade;
        $this->productCategoryFacade = $productCategoryFacade;
        $this->localeFacade = $localeFacade;
        $this->categoryPageSearchFacade = $categoryPageSearchFacade;
    }

    /**
     * @param int $productAbstractId
     *
     * @return void
     */
    public function publishForProductAbstract(int $productAbstractId)
    {
        $categoryNodeIds = [];
        $categoryTransferCollection = $this->productCategoryFacade->getCategoryTransferCollectionByIdProductAbstract(
            $productAbstractId,
            $this->localeFacade->getCurrentLocale()
        );
        foreach ($categoryTransferCollection->getCategories() as $categoryTransfer) {
            $categoryNodeTransfers = $this->categoryFacade->getAllNodesByIdCategory($categoryTransfer->getIdCategory());
            foreach ($categoryNodeTransfers as $categoryNodeTransfer) {
                $categoryNodeIds[] = $categoryNodeTransfer->getIdCategoryNode();
            }
        }
        $this->categoryPageSearchFacade->publish(array_unique($categoryNodeIds));
    }
}
