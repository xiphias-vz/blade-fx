<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage\Twig;

use ArrayObject;
use Generated\Shared\Transfer\FacetSearchResultTransfer;
use Pyz\Yves\CatalogPage\CategoryNode\CategoryNodeWalker;
use Spryker\Shared\Twig\TwigExtension;
use Twig\TwigFunction;

class CategoryFilterTwigExtension extends TwigExtension
{
    public const FUNCTION_PREPARE_FILTER_CATEGORIES = 'prepareFilterCategories';

    /**
     * @uses prepareFilterCategories
     *
     * @return \Twig\TwigFunction[]
     */
    public function getFunctions()
    {
        return [
            new TwigFunction(static::FUNCTION_PREPARE_FILTER_CATEGORIES, [$this, static::FUNCTION_PREPARE_FILTER_CATEGORIES], [
                'needs_context' => true,
            ]),
        ];
    }

    /**
     * @param array $context
     * @param \Generated\Shared\Transfer\FacetSearchResultTransfer $searchResultFacet
     * @param mixed $idCategoryNode
     *
     * @return \Pyz\Yves\CatalogPage\CategoryNode\CategoryNode[]
     */
    public function prepareFilterCategories(array $context, FacetSearchResultTransfer $searchResultFacet, $idCategoryNode): array
    {
        $categories = $this->getCategoriesFromContext($context);
        $quantities = $this->getQuantitiesFromSearchResult($searchResultFacet);

        $categoryNodeWalker = new CategoryNodeWalker();

        return $categoryNodeWalker->start($categories, (int)$idCategoryNode, $quantities);
    }

    /**
     * @param \Generated\Shared\Transfer\FacetSearchResultTransfer $searchResultFacet
     *
     * @return int[]
     */
    protected function getQuantitiesFromSearchResult(FacetSearchResultTransfer $searchResultFacet): array
    {
        $quantities = [];
        foreach ($searchResultFacet->getValues() as $searchResultValue) {
            $quantities[$searchResultValue->getValue()] = $searchResultValue->getDocCount();
        }

        return $quantities;
    }

    /**
     * @param array $context
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\CategoryNodeStorageTransfer[]
     */
    protected function getCategoriesFromContext(array $context): ArrayObject
    {
        return $context['categories'] ?: new ArrayObject();
    }
}
