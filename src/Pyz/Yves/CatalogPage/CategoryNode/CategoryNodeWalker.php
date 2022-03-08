<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage\CategoryNode;

use ArrayObject;

class CategoryNodeWalker
{
    /**
     * @var int
     */
    protected $idCategoryNode;

    /**
     * @var int[]
     */
    protected $quantities;

    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\CategoryNodeStorageTransfer[] $categories
     * @param int $idCategory
     * @param int[] $quantities
     *
     * @return \Pyz\Yves\CatalogPage\CategoryNode\CategoryNode[]
     */
    public function start(ArrayObject $categories, int $idCategory, array $quantities): array
    {
        $this->idCategoryNode = $idCategory;
        $this->quantities = $quantities;

        $active = false;
        $childQuantity = 0;

        return $this->walk($categories, $active, $childQuantity);
    }

    /**
     * @param \ArrayObject|\Generated\Shared\Transfer\CategoryNodeStorageTransfer[] $categories
     * @param bool $active
     * @param int $childQuantity
     *
     * @return \Pyz\Yves\CatalogPage\CategoryNode\CategoryNode[]
     */
    protected function walk(ArrayObject $categories, &$active, &$childQuantity): array
    {
        $categoryNodes = [];

        foreach ($categories as $category) {
            $categoryNode = new CategoryNode();
            $categoryNode->nodeId = $category->getNodeId();

            $children = $category->getChildren();
            $quantity = $this->quantities[$categoryNode->nodeId] ?? 1;
            $childQuantity += $quantity;

            $categoryNode->name = $category->getName();
            $categoryNode->quantity = $quantity;
            $categoryNode->hasChildren = count($children) > 0;
            $categoryNode->url = $category->getUrl();

            if ($categoryNode->hasChildren) {
                $categoryNode->children = $this->walk($children, $categoryNode->isActive, $quantity);
            }

            if ($categoryNode->nodeId === $this->idCategoryNode) {
                $active = $categoryNode->isActive = $categoryNode->isCurrent = true;
            }

            if ($categoryNode->isActive) {
                $active = true;
            }

            if ($quantity > 0) {
                $categoryNodes[] = $categoryNode;
            }
        }

        return $categoryNodes;
    }
}
