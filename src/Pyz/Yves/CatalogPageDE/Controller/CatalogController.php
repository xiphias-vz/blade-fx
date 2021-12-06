<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPageDE\Controller;

use Pyz\Shared\DataDog\DataDogConfig;
use SprykerShop\Yves\CatalogPage\Controller\CatalogController as SprykerCatalogController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

/**
 * @method \Pyz\Yves\CatalogPage\CatalogPageFactory getFactory()
 * @method \Spryker\Client\Catalog\CatalogClientInterface getClient()
 */
class CatalogController extends SprykerCatalogController
{
    public const FORMAT_CATEGORY_IMAGE = 'images/category/%s.jpg';
    public const CATEGORIES_WITH_IMAGE = [];

    /**
     * @phpstan-param array<mixed> $categoryNode
     *
     * @param array $categoryNode
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(array $categoryNode, Request $request)
    {
        $idCategoryNode = $categoryNode['node_id'];
        $viewData = [
            'products' => [],
            'facets' => [],
            'sort' => 0,
            'searchString' => '',
            'pagination' => [
                'currentPage' => 1,
                'maxPage' => 999,
                'numFound' => 1,
                'config' => '',
                'currentItemsPerPage' => 1,
            ],
        ];

         return $this->view(
             $viewData,
             $this->getFactory()->getCatalogPageWidgetPlugins(),
             '@CatalogPage/views/catalog/catalog-de.twig'
         );
    }

    /**
     * Add image to category
     *
     * @param array $categoryNode
     * @param array $data
     *
     * @return array
     */
    protected function addCategoryImage(array $categoryNode, array $data): array
    {
        if (isset($categoryNode['parents'][0]['node_id'])) {
            if ($categoryNode['parents'][0]['node_id'] > 1) {
                return $data;
            }
        }

        $categorySlug = $this->getFactory()->getUtilTextService()->generateSlug($categoryNode['name']);

        if (in_array($categorySlug, self::CATEGORIES_WITH_IMAGE)) {
            $data['catalogBannerImage'] = sprintf(self::FORMAT_CATEGORY_IMAGE, $categorySlug);
        }

        return $data;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeFulltextSearchAction(Request $request): array
    {
        $searchResults = parent::executeFulltextSearchAction($request);

        $searchResults = $this->shiftLabelFacet($searchResults);

        $this->getFactory()->getDataDogService()->increment([
            DataDogConfig::DATA_DOG_SEARCH_STAT,
        ]);

        return $searchResults;
    }

    /**
     * @param array $data
     *
     * @return array
     */
    protected function shiftLabelFacet(array $data): array
    {
        if (isset($data['facets'])) {
            foreach ($data['facets'] as $key => $facet) {
                if ($key == 'label') {
                    unset($data['facets'][$key]);
                    $data['facets']['label'] = $facet;
                }
            }
        }

        return $data;
    }

    public function fulltextSearchAction(Request $request)
    {
        $viewData = [
            'products' => [],
            'facets' => [],
            'sort' => 0,
            'searchString' => '',
            'spellingSuggestion' => '',
            'pressEnter' => '1',
            'pagination' => [
                'currentPage' => 1,
                'maxPage' => 999,
                'numFound' => 1,
                'config' => '',
                'currentItemsPerPage' => 1,
            ],
        ];

        return $this->view(
            $viewData,
            $this->getFactory()->getCatalogPageWidgetPlugins(),
            '@CatalogPage/views/search/search.twig'
        );
    }
}
