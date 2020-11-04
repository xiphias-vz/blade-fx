<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductCategory\Business\Manager;

use Generated\Shared\Transfer\EventEntityTransfer;
use Pyz\Zed\Navigation\Business\NavigationFacadeInterface;
use Spryker\Zed\Category\Business\CategoryFacadeInterface;
use Spryker\Zed\Category\Dependency\CategoryEvents;
use Spryker\Zed\Navigation\Dependency\NavigationEvents;
use Spryker\Zed\ProductCategory\Business\Manager\ProductCategoryManager as SprykerProductCategoryManager;
use Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToCategoryInterface;
use Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToEventInterface;
use Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToProductInterface;
use Spryker\Zed\ProductCategory\Persistence\ProductCategoryQueryContainerInterface;

class ProductCategoryManager extends SprykerProductCategoryManager
{
    /**
     * @var \Pyz\Zed\Navigation\Business\NavigationFacadeInterface
     */
    protected $navigationFacade;

    /**
     * @var \Spryker\Zed\Category\Business\CategoryFacadeInterface
     */
    protected $baseCategoryFacade;

    /**
     * @param \Spryker\Zed\ProductCategory\Persistence\ProductCategoryQueryContainerInterface $productCategoryQueryContainer
     * @param \Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToCategoryInterface $categoryFacade
     * @param \Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToProductInterface $productFacade
     * @param \Pyz\Zed\Navigation\Business\NavigationFacadeInterface $navigationFacade
     * @param \Spryker\Zed\Category\Business\CategoryFacadeInterface $baseCategoryFacade
     * @param \Spryker\Zed\ProductCategory\Dependency\Facade\ProductCategoryToEventInterface|null $eventFacade
     */
    public function __construct(
        ProductCategoryQueryContainerInterface $productCategoryQueryContainer,
        ProductCategoryToCategoryInterface $categoryFacade,
        ProductCategoryToProductInterface $productFacade,
        NavigationFacadeInterface $navigationFacade,
        CategoryFacadeInterface $baseCategoryFacade,
        ?ProductCategoryToEventInterface $eventFacade = null
    ) {
        parent::__construct($productCategoryQueryContainer, $categoryFacade, $productFacade, $eventFacade);

        $this->navigationFacade = $navigationFacade;
        $this->baseCategoryFacade = $baseCategoryFacade;
    }

    /**
     * @param int $idCategory
     * @param array $productIdsToUnAssign
     *
     * @return void
     */
    public function removeProductCategoryMappings($idCategory, array $productIdsToUnAssign)
    {
        parent::removeProductCategoryMappings($idCategory, $productIdsToUnAssign);
        $this->triggerCategoryNodePublish($idCategory);
        $this->triggerMainNavigationPublish();
    }

    /**
     * @param int $idCategory
     * @param array $productIdsToAssign
     *
     * @return void
     */
    public function createProductCategoryMappings($idCategory, array $productIdsToAssign)
    {
        parent::createProductCategoryMappings($idCategory, $productIdsToAssign);
        $this->triggerCategoryNodePublish($idCategory);
        $this->triggerMainNavigationPublish();
    }

    /**
     * @return void
     */
    protected function triggerMainNavigationPublish()
    {
        if ($this->eventFacade === null) {
            return;
        }

        $navigationIds = $this->navigationFacade->getMainNavigationIds();

        foreach ($navigationIds as $navigationId) {
            $eventEntityTransfer = (new EventEntityTransfer())->setId($navigationId);
            $this->eventFacade->trigger(NavigationEvents::NAVIGATION_KEY_PUBLISH, $eventEntityTransfer);
        }
    }

    /**
     * @param int $idCategory
     *
     * @return void
     */
    protected function triggerCategoryNodePublish(int $idCategory)
    {
        if ($this->eventFacade === null) {
            return;
        }

        $categoryNodes = $this->baseCategoryFacade->getAllNodesByIdCategory($idCategory);

        foreach ($categoryNodes as $categoryNode) {
            $eventEntityTransfer = (new EventEntityTransfer())->setId($categoryNode->getIdCategoryNode());
            $this->eventFacade->trigger(CategoryEvents::CATEGORY_NODE_PUBLISH, $eventEntityTransfer);
        }
    }
}
