<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business\Category;

use Generated\Shared\Transfer\CategoryTransfer;
use Pyz\Zed\Navigation\Business\Helper\NavigationHelper;
use Pyz\Zed\Navigation\Business\Node\NavigationNodeReader;
use Spryker\Zed\Navigation\Business\Node\NavigationNodeUpdaterInterface;

class CategoryModel
{
    /**
     * @var \Pyz\Zed\Navigation\Business\Helper\NavigationHelper
     */
    private $navigationHelper;

    /**
     * @var \Pyz\Zed\Navigation\Business\Node\NavigationNodeReader
     */
    private $navigationNodeReader;

    /**
     * @var \Spryker\Zed\Navigation\Business\Node\NavigationNodeUpdaterInterface
     */
    private $navigationNodeUpdate;

    /**
     * @param \Pyz\Zed\Navigation\Business\Helper\NavigationHelper $navigationHelper
     * @param \Pyz\Zed\Navigation\Business\Node\NavigationNodeReader $navigationNodeReader
     * @param \Spryker\Zed\Navigation\Business\Node\NavigationNodeUpdaterInterface $navigationNodeUpdate
     */
    public function __construct(
        NavigationHelper $navigationHelper,
        NavigationNodeReader $navigationNodeReader,
        NavigationNodeUpdaterInterface $navigationNodeUpdate
    ) {
        $this->navigationHelper = $navigationHelper;
        $this->navigationNodeReader = $navigationNodeReader;
        $this->navigationNodeUpdate = $navigationNodeUpdate;
    }

    /**
     * @param \Generated\Shared\Transfer\CategoryTransfer $categoryTransfer
     *
     * @return void
     */
    public function updateFromCategoryTransfer(CategoryTransfer $categoryTransfer): void
    {
        $navigationNodeKeys = $this->navigationHelper->composeNavigationNodeKeys($categoryTransfer->getParentCategoryNode()->getIdCategoryNode());
        foreach ($navigationNodeKeys as $navigationNodeKey) {
            $navigationNodeTransfer = $this->navigationNodeReader->findNavigationNodeByKey($navigationNodeKey);
            if ($navigationNodeTransfer != null) {
                $navigationNodeLocalizedAttributes = $navigationNodeTransfer->getNavigationNodeLocalizedAttributes();
                $categoryLocalizedAttributes = $categoryTransfer->getLocalizedAttributes();
                foreach ($navigationNodeLocalizedAttributes as $navigationNodeLocalizedAttribute) {
                    foreach ($categoryLocalizedAttributes as $categoryLocalizedAttribute) {
                        if ($categoryLocalizedAttribute->getLocale()->getIdLocale() == $navigationNodeLocalizedAttribute->getFkLocale()) {
                            $navigationNodeLocalizedAttribute->setTitle($categoryLocalizedAttribute->getName());
                            break;
                        }
                    }
                }
                $navigationNodeTransfer->setNavigationNodeLocalizedAttributes($navigationNodeLocalizedAttributes);
                $this->navigationNodeUpdate->updateNavigationNode($navigationNodeTransfer);
            }
        }
    }
}
