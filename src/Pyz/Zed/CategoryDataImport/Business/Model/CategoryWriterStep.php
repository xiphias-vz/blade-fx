<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryDataImport\Business\Model;

use Orm\Zed\Category\Persistence\SpyCategory;
use Orm\Zed\Category\Persistence\SpyCategoryAttributeQuery;
use Orm\Zed\Category\Persistence\SpyCategoryNodeQuery;
use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\Category\Persistence\SpyCategoryTemplate;
use Orm\Zed\Category\Persistence\SpyCategoryTemplateQuery;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeLocalizedAttributesQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationQuery;
use Orm\Zed\Url\Persistence\SpyUrlQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Pyz\Zed\Navigation\Business\Helper\NavigationHelper;
use Spryker\Zed\Category\Dependency\CategoryEvents;
use Spryker\Zed\CategoryDataImport\Business\Model\CategoryWriterStep as SprykerCategoryWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\AddLocalesStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Navigation\Dependency\NavigationEvents;
use Spryker\Zed\Url\Dependency\UrlEvents;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class CategoryWriterStep extends SprykerCategoryWriterStep
{
    public const KEY_NAME = 'Bezeichnung';
    public const KEY_CATEGORY_KEY = 'Bezeichnung';
    public const KEY_CATEGORY_MAIN_ID = 'ID_laufend';
    public const KEY_KAT_ID = 'Kategorie';
    public const KEY_WG_ID = 'WG';
    public const KEY_UWG_ID = 'UWG';
    public const KEY_URL_ID = 'url_id';
    public const KEY_LOCALE_ID = 'locale_id';

    public const NAVIGATION_MODE_MOBILE = 'MAIN_NAVIGATION';
    public const NAVIGATION_MODE_DESKTOP = 'MAIN_NAVIGATION_DESKTOP';

    /**
     * @var array
     */
    protected static $idLocaleBuffer = [];

    /**
     * @var array
     */
    protected static $idCategoryBuffer = [];

    /**
     * @var array
     */
    protected static $idCategoryTemplateBuffer = [];

    /**
     * @var array
     */
    protected $idNavigationNodeBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        parent::execute($dataSet);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Category\Persistence\SpyCategory
     */
    protected function findOrCreateCategory(DataSetInterface $dataSet)
    {
        $categoryEntity = SpyCategoryQuery::create()
            ->filterByCategoryKey_Like('%\_' . $dataSet[static::KEY_CATEGORY_MAIN_ID])
            ->findOneOrCreate();

        $categoryKey = static::KEY_CATEGORY_KEY . '.de_DE';
        $categoryEntity->setIsActive(true)
            ->setCategoryKey($dataSet[$categoryKey]. '_' . $dataSet[static::KEY_CATEGORY_MAIN_ID])
            ->setIsClickable(true)
            ->setIsInMenu(true)
            ->setIsSearchable(!empty($dataSet[static::KEY_CATEGORY_MAIN_ID]));

        $categoryTemplateEntity = $this->getCategoryTemplate($dataSet);
        $categoryEntity->setFkCategoryTemplate($categoryTemplateEntity->getIdCategoryTemplate());

        if ($categoryEntity->isNew() || $categoryEntity->isModified()) {
            $categoryEntity->save();
        }

        return $categoryEntity;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $navigationMode
     *
     * @return void
     */
    protected function createNavigationNode(DataSetInterface $dataSet, string $navigationMode)
    {
        // Skip navigation node for root category
        if (!$dataSet[static::KEY_CATEGORY_MAIN_ID]) {
            return;
        }

        if (!isset($this->idNavigationNodeBuffer[$navigationMode])) {
            $this->idNavigationNodeBuffer[$navigationMode] = $this->resolveIdNavigation($navigationMode);
        }

        $navigationNodeEntity = SpyNavigationNodeQuery::create()
            ->filterByFkNavigation($this->idNavigationNodeBuffer[$navigationMode])
            ->filterByNodeKey($navigationMode . NavigationHelper::NODE_KEY_SUFFIX . $dataSet[static::KEY_CATEGORY_MAIN_ID])
            ->findOneOrCreate();

        $navigationNodeEntity
            ->setPosition((int)$dataSet[static::KEY_CATEGORY_MAIN_ID])
            ->setIsActive(true)
            ->setNodeType('category');

        if ($this->getParentNavigationNodeId($dataSet, $navigationMode)) {
            $navigationNodeEntity->setFkParentNavigationNode(
                $this->getParentNavigationNodeId($dataSet, $navigationMode)
            );
        }

        $navigationNodeLocalizedAttributesEntity = SpyNavigationNodeLocalizedAttributesQuery::create()
            ->filterByFkNavigationNode($navigationNodeEntity->getIdNavigationNode())
            ->filterByFkLocale($dataSet[static::KEY_LOCALE_ID])
            ->findOneOrCreate();

        $categoryKey = static::KEY_NAME . '.' . array_search($dataSet[static::KEY_LOCALE_ID], $dataSet['locales']);
        $navigationNodeLocalizedAttributesEntity->setTitle($dataSet[$categoryKey]);
        $navigationNodeLocalizedAttributesEntity->setFkUrl($dataSet[static::KEY_URL_ID]);
        $navigationNodeEntity->addSpyNavigationNodeLocalizedAttributes($navigationNodeLocalizedAttributesEntity);
        $navigationNodeEntity->save();

        $this->saveNavigationDataToBuffer($dataSet, $navigationNodeEntity->getIdNavigationNode(), $navigationMode);

        $this->addPublishEvents(NavigationEvents::NAVIGATION_KEY_PUBLISH, $navigationNodeEntity->getFkNavigation());
    }

    /**
     * @param \Orm\Zed\Category\Persistence\SpyCategory $categoryEntity
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function findOrCreateAttributes(SpyCategory $categoryEntity, DataSetInterface $dataSet)
    {
        foreach ($dataSet[AddLocalesStep::KEY_LOCALES] as $keyLocale => $idLocale) {
            $categoryAttributeEntity = SpyCategoryAttributeQuery::create()
                ->filterByFkCategory($categoryEntity->getIdCategory())
                ->filterByFkLocale($idLocale)
                ->findOneOrCreate();

            $categoryAttributeEntity->setName($dataSet[static::KEY_NAME . '.' . $keyLocale]);

            if ($categoryAttributeEntity->isNew() || $categoryAttributeEntity->isModified()) {
                $categoryAttributeEntity->save();
            }
        }
    }

    /**
     * @param \Orm\Zed\Category\Persistence\SpyCategory $categoryEntity
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Category\Persistence\SpyCategoryNode
     */
    protected function findOrCreateNode(SpyCategory $categoryEntity, DataSetInterface $dataSet)
    {
        $categoryNodeEntity = SpyCategoryNodeQuery::create()
            ->filterByCategory($categoryEntity)
            ->findOneOrCreate();

        if (empty($dataSet[static::KEY_CATEGORY_MAIN_ID])) {
            $categoryNodeEntity->setIsRoot(true);
        }

        $idParentCategoryNode = $this->getParentCategoryId($dataSet, $dataSet['locales']['de_DE']);
        if ($idParentCategoryNode) {
            $categoryNodeEntity->setFkParentCategoryNode($idParentCategoryNode);
        }

        $categoryNodeEntity->fromArray($dataSet->getArrayCopy());
        $categoryNodeEntity->setIsMain(true);

        if ($categoryNodeEntity->isNew() || $categoryNodeEntity->isModified()) {
            $categoryNodeEntity->save();
        }

        $this->addToClosureTable($categoryNodeEntity);
        $this->addPublishEvents(CategoryEvents::CATEGORY_NODE_PUBLISH, $categoryNodeEntity->getIdCategoryNode());

        foreach ($categoryEntity->getAttributes() as $categoryAttributesEntity) {
            $idLocale = $categoryAttributesEntity->getFkLocale();
            $languageIdentifier = $this->getLanguageIdentifier($idLocale, $dataSet);
            $urlPathParts = [$languageIdentifier];

            if (!$categoryNodeEntity->getIsRoot()) {
                $parentUrl = $this->getParentCategoryUrl($dataSet, $idLocale);

                $urlPathParts = explode('/', ltrim($parentUrl, '/'));
                $urlPathParts[] = $categoryAttributesEntity->getName();
                $urlPathParts[0] = $languageIdentifier;
            }

            if ($categoryNodeEntity->getIsRoot()) {
                $this->addPublishEvents(CategoryEvents::CATEGORY_TREE_PUBLISH, $categoryNodeEntity->getIdCategoryNode());
            }

            $convertCallback = function ($value) {
                return mb_strtolower(mb_ereg_replace(' ', '-', $value));
            };
            $urlPathParts = array_map($convertCallback, $urlPathParts);
            $url = '/' . implode('/', $urlPathParts);

            $urlEntity = SpyUrlQuery::create()
                ->filterByFkLocale($idLocale)
                ->filterByFkResourceCategorynode($categoryNodeEntity->getIdCategoryNode())
                ->findOneOrCreate();

            $urlEntity
                ->setUrl($url);

            if ($urlEntity->isNew() || $urlEntity->isModified()) {
                $urlEntity->save();
            }

            $this->addPublishEvents(UrlEvents::URL_PUBLISH, $urlEntity->getIdUrl());

            $dataSet[static::KEY_URL_ID] = $urlEntity->getIdUrl();
            $dataSet[static::KEY_LOCALE_ID] = $idLocale;

            $this->saveCategoryDataToBuffer($dataSet, $categoryEntity->getIdCategory(), $url, $idLocale);

            $this->createNavigationNode($dataSet, static::NAVIGATION_MODE_MOBILE);
            $this->createNavigationNode($dataSet, static::NAVIGATION_MODE_DESKTOP);
        }

        return $categoryNodeEntity;
    }

    /**
     * @param string $navigationKey
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function resolveIdNavigation($navigationKey)
    {
        $navigationEntity = SpyNavigationQuery::create()
            ->findOneByKey($navigationKey);

        if (!$navigationEntity) {
            throw new EntityNotFoundException(sprintf('Navigation by key "%s" not found.', $navigationKey));
        }

        return $navigationEntity->getIdNavigation();
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param int $id
     * @param string $url
     * @param int $idLocale
     *
     * @return void
     */
    protected function saveCategoryDataToBuffer(DataSetInterface $dataSet, int $id, string $url, int $idLocale)
    {
        if (!empty($dataSet[static::KEY_UWG_ID])) {
        } elseif (!empty($dataSet[static::KEY_WG_ID])) {
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]][$idLocale]['id'] = $id;
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]][$idLocale]['url'] = $url;
        } elseif (!empty($dataSet[static::KEY_KAT_ID])) {
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$idLocale]['id'] = $id;
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$idLocale]['url'] = $url;
        } else {
            static::$idCategoryBuffer[$idLocale]['id'] = $id;
            static::$idCategoryBuffer[$idLocale]['url'] = $url;
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param int $idNavigationNode
     * @param string $navigationMode
     *
     * @return void
     */
    protected function saveNavigationDataToBuffer(DataSetInterface $dataSet, int $idNavigationNode, string $navigationMode)
    {
        if (!empty($dataSet[static::KEY_UWG_ID])) {
        } elseif (!empty($dataSet[static::KEY_WG_ID])) {
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]]['idNavigationNode'][$navigationMode] = $idNavigationNode;
        } elseif (!empty($dataSet[static::KEY_KAT_ID])) {
            static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]]['idNavigationNode'][$navigationMode] = $idNavigationNode;
        } else {
            static::$idCategoryBuffer['idNavigationNode'][$navigationMode] = $idNavigationNode;
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param $idLocale
     *
     * @return int
     */
    protected function getParentCategoryId(DataSetInterface $dataSet, int $idLocale)
    {
        if (!empty($dataSet[static::KEY_UWG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]][$idLocale]['id'] ?? 0;
        } elseif (!empty($dataSet[static::KEY_WG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$idLocale]['id'] ?? 0;
        }

        return static::$idCategoryBuffer[$idLocale]['id'] ?? 0;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param int $idLocale
     *
     * @return string
     */
    protected function getParentCategoryUrl(DataSetInterface $dataSet, int $idLocale)
    {
        if (!empty($dataSet[static::KEY_UWG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]][$idLocale]['url'] ?? '';
        } elseif (!empty($dataSet[static::KEY_WG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$idLocale]['url'] ?? '';
        }

        return static::$idCategoryBuffer[$idLocale]['url'] ?? '';
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $navigationMode
     *
     * @return int
     */
    protected function getParentNavigationNodeId(DataSetInterface $dataSet, string $navigationMode)
    {
        if (!empty($dataSet[static::KEY_UWG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]][$dataSet[static::KEY_WG_ID]]['idNavigationNode'][$navigationMode] ?? 0;
        } elseif (!empty($dataSet[static::KEY_WG_ID])) {
            return static::$idCategoryBuffer[$dataSet[static::KEY_KAT_ID]]['idNavigationNode'][$navigationMode] ?? 0;
        }

        return 0;
    }

    /**
     * @param string $localeName
     *
     * @return int
     */
    protected function getIdLocaleByName($localeName)
    {
        if (!isset(static::$idLocaleBuffer[$localeName])) {
            static::$idLocaleBuffer[$localeName] =
                SpyLocaleQuery::create()->findOneByLocaleName($localeName)->getIdLocale();
        }

        return static::$idLocaleBuffer[$localeName];
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Category\Persistence\SpyCategoryTemplate
     */
    protected function getCategoryTemplate(DataSetInterface $dataSet): SpyCategoryTemplate
    {
        if (!isset(static::$idCategoryTemplateBuffer['Catalog (default)'])) {
            static::$idCategoryTemplateBuffer['Catalog (default)'] = SpyCategoryTemplateQuery::create()->findOneByName('Catalog (default)');
        }

        return static::$idCategoryTemplateBuffer['Catalog (default)'];
    }
}
