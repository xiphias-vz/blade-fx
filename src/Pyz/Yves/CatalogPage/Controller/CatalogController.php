<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage\Controller;

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
     * @param int $idCategoryNode
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    protected function executeIndexAction(array $categoryNode, int $idCategoryNode, Request $request): array
    {
        $get_query_ipp = $request->query->get('ipp');

        if (!isset($_SESSION['ipp'])) {
            $_SESSION['ipp'] = null;
        }

        if ($_SESSION['ipp'] != $get_query_ipp && $get_query_ipp == null && $_SESSION['ipp'] != null) {
            $request->query->set('ipp', $_SESSION['ipp']);
        }

        $data = parent::executeIndexAction($categoryNode, $idCategoryNode, $request);

        $data = $this->addCategoryImage($categoryNode, $data);

        $this->getFactory()->getDataDogService()->increment([
            DataDogConfig::DATA_DOG_SEARCH_STAT,
        ]);

        $_SESSION['ipp'] = $data['pagination']['currentItemsPerPage'] ?? null;

        return $data;
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

        $this->getFactory()->getDataDogService()->increment([
            DataDogConfig::DATA_DOG_SEARCH_STAT,
        ]);

        return $searchResults;
    }
}
