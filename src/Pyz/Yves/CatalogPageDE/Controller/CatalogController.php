<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPageDE\Controller;

use Pyz\Shared\DataDog\DataDogConfig;
use SprykerShop\Yves\CatalogPage\Controller\CatalogController as SprykerCatalogController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CatalogPage\CatalogPageFactory getFactory()
 * @method \Spryker\Client\Catalog\CatalogClientInterface getClient()
 */
class CatalogController extends SprykerCatalogController
{
    public const FORMAT_CATEGORY_IMAGE = 'images/category/%s.jpg';
    public const CATEGORIES_WITH_IMAGE = [];

    /**
     * @param array $categoryNode
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(array $categoryNode, Request $request)
    {
        $idCategoryNode = $categoryNode['node_id'];
        $categoryPath = $categoryNode["name"];
        $categoryPath = $this->getParentCategoryName($categoryNode, $categoryPath);
        $filter = "";
        if (!$this->buildFilter($request, $filter)) {
            $filter = $this->getFilterData("", "navigation-search", ['CategoryPath:' . $categoryPath], 1);
        }

        $viewData = [
            'products' => [],
            'facets' => [],
            'sort' => 0,
            'searchString' => '',
            'ffCategoryFilter' => $filter,
            'category' => $categoryNode,
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
     * @param array $categoryNode
     * @param string $categoryPath
     *
     * @return string
     */
    protected function getParentCategoryName(array $categoryNode, string $categoryPath): string
    {
        if (isset($categoryNode["parents"][0])) {
            $parent = $categoryNode["parents"][0];
            if (isset($parent["parents"])) {
                $categoryPath = $parent["name"] . "/" . $categoryPath;

                return $this->getParentCategoryName($parent, $categoryPath);
            }
        }

        return $categoryPath;
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function fulltextSearchAction(Request $request)
    {
        $filter = "";
        $this->buildFilter($request, $filter);
        $viewData = [
            'products' => [],
            'facets' => [],
            'sort' => 0,
            'searchString' => '',
            'ffCategoryFilter' => $filter,
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

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $result
     *
     * @return bool
     */
    protected function buildFilter(Request $request, string &$result): bool
    {
        $query = $request->query->get("query");
        $filter = [];
        $page = 1;
        if (isset(parse_url($request->getRequestUri())["query"]) && parse_url($request->getRequestUri())['query'] !== '') {
            $ff = parse_url($request->getRequestUri())["query"];
            $stringLength = strlen($ff);
            $tmpString = [];
            for ($i = 0; $i < $stringLength; $i++) {
                if ($ff[$i] === '&' && $ff[$i] === $ff[$i - 1]) {
                    continue;
                } else {
                    $tmpString[] = $ff[$i];
                }
            }
            $ff = implode('', $tmpString);

            if (substr($ff, -1) === "&") {
                $ff = substr($ff, 0, strlen($ff) - 1);
            }

            $params = explode("&", $ff);
            foreach ($params as $param) {
                parse_str($param, $par);
                if (strtolower(array_keys($par)[0]) === "filter") {
                    $filter[] = $par["filter"];
                }
                if (strtolower(array_keys($par)[0]) === "page") {
                    $page = $par["page"];
                }
            }
        }
        $result = $this->getFilterData($query, "search", $filter, $page);

        return $query || count($filter) > 0;
    }

    /**
     * @param string|null $query
     * @param string $type
     * @param array $filter
     * @param string $page
     *
     * @return string
     */
    protected function getFilterData(?string $query, string $type, array $filter, string $page): string
    {
        if ($query === null) {
            $query = "";
        }

        return base64_encode(json_encode(['Query' => $query, 'Type' => $type, 'Filter' => $filter, 'Page' => $page]));
    }
}
