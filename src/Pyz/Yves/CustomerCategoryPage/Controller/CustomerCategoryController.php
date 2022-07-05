<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerCategoryPage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Spryker\Yves\Kernel\View\View;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CustomerCategoryPage\CustomerCategoryPageFactory getFactory()
 */
class CustomerCategoryController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request): View
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
