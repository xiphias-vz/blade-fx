<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryDataImport\Business\Model;

use Orm\Zed\Category\Persistence\Base\SpyCategoryNode;
use Orm\Zed\Category\Persistence\SpyCategory;
use Orm\Zed\Category\Persistence\SpyCategoryAttributeQuery;
use Orm\Zed\Category\Persistence\SpyCategoryNodeQuery;
use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\Category\Persistence\SpyCategoryTemplate;
use Orm\Zed\Category\Persistence\SpyCategoryTemplateQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeLocalizedAttributesQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationQuery;
use Orm\Zed\Url\Persistence\SpyUrlQuery;
use Propel\Runtime\Util\PropelDateTime;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Pyz\Zed\Navigation\Business\Helper\NavigationHelper;
use Spryker\Zed\Category\Dependency\CategoryEvents;
use Spryker\Zed\CategoryDataImport\Business\Model\CategoryWriterStep as SprykerCategoryWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\AddLocalesStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSet;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Navigation\Dependency\NavigationEvents;
use Spryker\Zed\Url\Dependency\UrlEvents;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class CategoryWriterStep extends SprykerCategoryWriterStep
{
    public const KEY_NAME = 'name';
    public const KEY_CATEGORY_KEY = 'categoryIdStibo';
    public const KEY_PARENT_CATEGORY_KEY = 'parentIdCategoryStibo';
    public const KEY_DISPLAY_SEQUENCE = 'displaysequence';
    public const KEY_POSITION = 'position';
    public const KEY_URL_ID = 'url_id';
    public const KEY_LOCALE_ID = 'locale_id';
    public const KEY_META_TITLE = 'metatitle';
    public const KEY_META_DESCRIPTION = 'metadescription';

    public const NAVIGATION_MODE_MOBILE = 'MAIN_NAVIGATION';
    public const NAVIGATION_MODE_DESKTOP = 'MAIN_NAVIGATION_DESKTOP';

    protected const ROOT = 'cls_pim_de_cus_class';
    protected const ROOT_NAME = 'DE - Kunden Produkt Hierarchie';
    protected const LOCALE_NAME = 'de_DE';

    /**
     * @var \DateTime $dtImport
     */
    protected static $dtImport;

    /**
     * @var array
     */
    protected static $idCategoryBuffer = [];

    /**
     * @var array
     */
    protected static $idCategoryTemplateBuffer = [];

    /**
     * @var bool
     */
    protected static $isRootImported = false;

    /**
     * @var array
     */
    protected $idNavigationNodeBuffer = [];

    /**
     * @var int
     */
    protected static $categoryOrder = 0;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        if ($dataSet[static::KEY_PARENT_CATEGORY_KEY] === static::ROOT && !static::$isRootImported) {
            $dataSetRootCategory = new DataSet($dataSet->getArrayCopy());
            $dataSetRootCategory[static::KEY_CATEGORY_KEY] = static::ROOT;
            $dataSetRootCategory[static::KEY_PARENT_CATEGORY_KEY] = null;
            $dataSetRootCategory[static::KEY_NAME] = static::ROOT_NAME;

            $this->execute($dataSetRootCategory);
        }

        $categoryEntity = $this->findOrCreateCategory($dataSet);
        $this->findOrCreateAttributes($categoryEntity, $dataSet);
        $categoryNodeEntity = $this->findOrCreateNode($categoryEntity, $dataSet);

        $this->categoryReader->addCategory($categoryEntity, $categoryNodeEntity);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Category\Persistence\SpyCategory
     */
    protected function findOrCreateCategory(DataSetInterface $dataSet)
    {
        $categoryEntity = SpyCategoryQuery::create()
            ->filterByCategoryKey($dataSet[static::KEY_CATEGORY_KEY])
            ->findOneOrCreate();

        $displaySequence = '999';
        $position = '999999999';
        if (isset($dataSet[static::KEY_DISPLAY_SEQUENCE])) {
            if (!empty($dataSet[static::KEY_DISPLAY_SEQUENCE])) {
                $displaySequence = str_pad($dataSet[static::KEY_DISPLAY_SEQUENCE], 3, '0', STR_PAD_LEFT);
            }
        }
        if (isset($dataSet[static::KEY_POSITION])) {
            if (!empty($dataSet[static::KEY_DISPLAY_SEQUENCE])) {
                $position = str_pad($dataSet[static::KEY_POSITION], 9, '0', STR_PAD_LEFT);
            }
        }

        $categoryEntity->setIsActive(true)
            ->setCategoryKey($dataSet[static::KEY_CATEGORY_KEY])
            ->setIsClickable($dataSet[static::KEY_CATEGORY_KEY] !== static::ROOT)
            ->setIsInMenu($dataSet[static::KEY_CATEGORY_KEY] !== static::ROOT)
            ->setIsSearchable($dataSet[static::KEY_CATEGORY_KEY] !== static::ROOT)
            ->setDisplaysequence($displaySequence)
            ->setPosition($position);

        $categoryTemplateEntity = $this->getCategoryTemplate($dataSet);
        $categoryEntity->setFkCategoryTemplate($categoryTemplateEntity->getIdCategoryTemplate());

        if ($categoryEntity->isNew() || $categoryEntity->isModified()) {
            if (static::$dtImport === null) {
                static::$dtImport = PropelDateTime::createHighPrecision();
            }
            $categoryEntity->setUpdatedAt(static::$dtImport);
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
        if ($dataSet[static::KEY_CATEGORY_KEY] === static::ROOT) {
            return;
        }

        if (!isset($this->idNavigationNodeBuffer[$navigationMode])) {
            $this->idNavigationNodeBuffer[$navigationMode] = $this->resolveIdNavigation($navigationMode);
        }

        $position = $this->getPosition($dataSet);

        $navigationNodeEntity = SpyNavigationNodeQuery::create()
            ->filterByFkNavigation($this->idNavigationNodeBuffer[$navigationMode])
            ->filterByNodeKey($navigationMode . NavigationHelper::NODE_KEY_SUFFIX . $position)
            ->findOneOrCreate();

        $navigationNodeEntity
            ->setPosition(static::$categoryOrder)
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

        $categoryKey = static::KEY_NAME;
        $navigationNodeLocalizedAttributesEntity->setTitle($dataSet[$categoryKey]);
        $navigationNodeLocalizedAttributesEntity->setFkUrl($dataSet[static::KEY_URL_ID]);
        $navigationNodeEntity->addSpyNavigationNodeLocalizedAttributes($navigationNodeLocalizedAttributesEntity);
        $navigationNodeEntity->save();

        $this->saveNavigationDataToBuffer($dataSet, $navigationNodeEntity->getIdNavigationNode(), $navigationMode);

        $this->addPublishEvents(NavigationEvents::NAVIGATION_KEY_PUBLISH, $navigationNodeEntity->getFkNavigation());
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return string
     */
    protected function getPosition(DataSetInterface $dataSet): string
    {
        $categoryIdExplodeData = explode('_', $dataSet[static::KEY_CATEGORY_KEY]);

        return (end($categoryIdExplodeData));
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

            $categoryAttributeEntity->setName($dataSet[static::KEY_NAME]);
            $categoryAttributeEntity->setMetaTitle($dataSet[static::KEY_META_TITLE]);
            $categoryAttributeEntity->setMetaDescription($dataSet[static::KEY_META_DESCRIPTION]);

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
        static::$categoryOrder++;
        $categoryNodeEntity = SpyCategoryNodeQuery::create()
            ->filterByCategory($categoryEntity)
            ->findOneOrCreate();

        $this->setCategoryNodeId($dataSet, $categoryNodeEntity);

        if ($dataSet[static::KEY_CATEGORY_KEY] === static::ROOT) {
            $categoryNodeEntity->setIsRoot(true);
            static::$isRootImported = true;
        }

        $idParentCategoryNode = $this->getCategoryParentNodeId($dataSet);
        if ($idParentCategoryNode) {
            $categoryNodeEntity->setFkParentCategoryNode($idParentCategoryNode);
        }

        $categoryNodeEntity->fromArray($dataSet->getArrayCopy());
        $categoryNodeEntity->setIsMain(true);
        $categoryNodeEntity->setNodeOrder(static::$categoryOrder);

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
                $value = mb_strtolower(mb_ereg_replace(' ', '-', $value));

                return mb_strtolower(mb_ereg_replace('%', '', $value));
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
    public function resolveIdNavigation($navigationKey)
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
        static::$idCategoryBuffer[$dataSet[static::KEY_CATEGORY_KEY]][$idLocale]['id'] = $id;
        static::$idCategoryBuffer[$dataSet[static::KEY_CATEGORY_KEY]][$idLocale]['url'] = $url;
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
        static::$idCategoryBuffer[$dataSet[static::KEY_CATEGORY_KEY]]['idNavigationNode'][$navigationMode] = $idNavigationNode;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param int $idLocale
     *
     * @return string
     */
    protected function getParentCategoryUrl(DataSetInterface $dataSet, int $idLocale)
    {
        return static::$idCategoryBuffer[$dataSet[static::KEY_PARENT_CATEGORY_KEY]][$idLocale]['url'] ?? '';
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $navigationMode
     *
     * @return int
     */
    protected function getParentNavigationNodeId(DataSetInterface $dataSet, string $navigationMode)
    {
        return static::$idCategoryBuffer[$dataSet[static::KEY_PARENT_CATEGORY_KEY]]['idNavigationNode'][$navigationMode] ?? 0;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return int
     */
    protected function getCategoryParentNodeId(DataSetInterface $dataSet): int
    {
        return static::$idCategoryBuffer[$dataSet[static::KEY_PARENT_CATEGORY_KEY]]['categoryNodeId'] ?? 0;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\Category\Persistence\Base\SpyCategoryNode $categoryNodeEntity
     *
     * @return void
     */
    protected function setCategoryNodeId(DataSetInterface $dataSet, SpyCategoryNode $categoryNodeEntity)
    {
        static::$idCategoryBuffer[$dataSet[static::KEY_CATEGORY_KEY]]['categoryNodeId'] = $categoryNodeEntity->getIdCategoryNode();
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
