<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\ExampleProductSalePage\Controller;

use Pyz\Yves\ExampleProductSalePage\Plugin\Router\ExampleProductSaleRouteProviderPlugin;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @method \Pyz\Yves\ExampleProductSalePage\ExampleProductSalePageFactory getFactory()
 * @method \Pyz\Client\ExampleProductSalePage\ExampleProductSalePageClientInterface getClient()
 */
class SaleController extends AbstractController
{
    /**
     * @param string|null $categoryPath
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(?string $categoryPath, Request $request)
    {
        $storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');
        if ($storeCodeBucket == "CZ") {
            return $this->indexCZAction($categoryPath, $request);
        } else {
            return $this->indexDEAction($categoryPath, $request);
        }
    }

    /**
     * @param string|null $categoryPath
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    protected function indexCZAction(?string $categoryPath, Request $request)
    {
        $parameters = $request->query->all();

        $categoryNode = [];
        if ($categoryPath) {
            $categoryNode = $this->getCategoryNode($categoryPath);

            $parameters['category'] = $categoryNode['node_id'];
        }

        $searchResults = $this
            ->getClient()
            ->saleSearch($parameters);

        $searchResults = $this->shiftLabelFacet($searchResults);
        $searchResults['category'] = $categoryNode;
        $searchResults['filterPath'] = ExampleProductSaleRouteProviderPlugin::ROUTE_SALE;
        $searchResults['viewMode'] = $this->getFactory()
            ->getCatalogClient()
            ->getCatalogViewMode($request);

        return $this->view(
            $searchResults,
            [],
            '@ExampleProductSalePage/views/sale-example/sale-example.twig'
        );
    }

    /**
     * @param string|null $categoryPath
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexDEAction(?string $categoryPath, Request $request)
    {
        $viewData = [
            'products' => [],
            'facets' => [],
            'sort' => 0,
            'searchString' => '',
            'ffCategoryFilter' => $this->buildFilter($request),
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
            [],
            '@CatalogPage/views/search/search.twig'
        );
    }

    /**
     * @param string $categoryPath
     *
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     * @return array
     */
    protected function getCategoryNode($categoryPath): array
    {
        $categoryPathPrefix = '/' . $this->getFactory()->getStore()->getCurrentLanguage();
        $fullCategoryPath = $categoryPathPrefix . '/' . ltrim($categoryPath, '/');

        $categoryNode = $this->getFactory()
            ->getUrlStorageClient()
            ->matchUrl($fullCategoryPath, $this->getLocale());

        if (!$categoryNode || empty($categoryNode['data'])) {
            throw new NotFoundHttpException(sprintf(
                'Category not found by path %s (full path %s)',
                $categoryPath,
                $fullCategoryPath
            ));
        }

        return $categoryNode['data'];
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
     * @return string
     */
    protected function buildFilter(Request $request): string
    {
        $query = $request->query->get("query");
        $filter = [];
        $page = 1;
        if (isset(parse_url($request->getRequestUri())["query"])) {
            $ff = parse_url($request->getRequestUri())["query"];
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
        if (!in_array("Sale:true", $filter)) {
            $filter[] = "Sale:true";
        }

        return $this->getFilterData($query, "search", $filter, $page);
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
