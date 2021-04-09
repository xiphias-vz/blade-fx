<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductLabel;

use Orm\Zed\Locale\Persistence\SpyLocaleQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeLocalizedAttributesQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery;
use Orm\Zed\Navigation\Persistence\SpyNavigationQuery;
use Orm\Zed\ProductLabel\Persistence\Map\SpyProductLabelTableMap;
use Orm\Zed\ProductLabel\Persistence\SpyProductLabel;
use Orm\Zed\ProductLabel\Persistence\SpyProductLabelLocalizedAttributesQuery;
use Orm\Zed\ProductLabel\Persistence\SpyProductLabelProductAbstractQuery;
use Orm\Zed\ProductLabel\Persistence\SpyProductLabelQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\AddProductAbstractSkusStep;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\LocalizedAttributesExtractorStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\Navigation\Dependency\NavigationEvents;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\ProductLabel\Dependency\ProductLabelEvents;

class ProductLabelWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    public const KEY_NAME = 'name';
    public const KEY_IS_ACTIVE = 'is_active';
    public const KEY_IS_EXCLUSIVE = 'is_exclusive';
    public const KEY_IS_DYNAMIC = 'is_dynamic';
    public const KEY_FRONT_END_REFERENCE = 'front_end_reference';
    public const KEY_LINK = 'link';

    public const KEY_VALID_FROM = 'valid_from';
    public const KEY_VALID_TO = 'valid_to';

    public const KEY_LOCALE_NAME = 'localeName';

    public const COL_MAX_POSITION = 'max_position';
    public const KEY_PRODUCT_ABSTRACT_SKUS = 'product_abstract_skus';

    public const NAVIGATION_MODE_MOBILE = 'MAIN_NAVIGATION';
    public const NAVIGATION_MODE_DESKTOP = 'MAIN_NAVIGATION_DESKTOP';

    /**
     * @var array
     */
    protected $idNavigationNodeBuffer = [];

    /**
     * @var array
     */
    protected static $idLocaleBuffer = [];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $productLabelEntity = $this->findOrCreateProductLabel($dataSet);

        $this->findOrCreateProductLabelLocalizedAttributes($dataSet, $productLabelEntity);
        $this->findOrCreateProductLabelToProductAbstractRelations($dataSet, $productLabelEntity);

        $locales = Store::getInstance()->getLocales();

        foreach ($locales as $localeKey => $localeName) {
            $dataSet[static::KEY_LOCALE_NAME] = $localeName;
            $this->createNavigationNode($productLabelEntity->getIdProductLabel(), $dataSet, static::NAVIGATION_MODE_MOBILE);
            $this->createNavigationNode($productLabelEntity->getIdProductLabel(), $dataSet, static::NAVIGATION_MODE_DESKTOP);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\ProductLabel\Persistence\SpyProductLabel
     */
    protected function findOrCreateProductLabel(DataSetInterface $dataSet)
    {
        $productLabelEntity = SpyProductLabelQuery::create()
            ->filterByName($dataSet[static::KEY_NAME])
            ->findOneOrCreate();

        $productLabelEntity
            ->setIsActive($dataSet[static::KEY_IS_ACTIVE])
            ->setIsExclusive($dataSet[static::KEY_IS_EXCLUSIVE])
            ->setIsDynamic($dataSet[static::KEY_IS_DYNAMIC])
            ->setFrontEndReference($dataSet[static::KEY_FRONT_END_REFERENCE]);

        if ($dataSet[static::KEY_VALID_FROM]) {
            $productLabelEntity->setValidFrom($dataSet[static::KEY_VALID_FROM]);
        }

        if ($dataSet[static::KEY_VALID_TO]) {
            $productLabelEntity->setValidTo($dataSet[static::KEY_VALID_TO]);
        }

        if ($productLabelEntity->isNew()) {
            $productLabelEntity->setPosition($this->getPosition());
        }

        if ($productLabelEntity->isNew() || $productLabelEntity->isModified()) {
            $productLabelEntity->save();
        }

        return $productLabelEntity;
    }

    /**
     * @return mixed|\Orm\Zed\ProductLabel\Persistence\SpyProductLabel
     */
    protected function getPosition()
    {
        return SpyProductLabelQuery::create()
            ->withColumn(
                sprintf('MAX(%s)', SpyProductLabelTableMap::COL_POSITION),
                static::COL_MAX_POSITION
            )
            ->select([
                static::COL_MAX_POSITION,
            ])
            ->findOne() + 1;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\ProductLabel\Persistence\SpyProductLabel $productLabelEntity
     *
     * @return void
     */
    protected function findOrCreateProductLabelLocalizedAttributes(DataSetInterface $dataSet, SpyProductLabel $productLabelEntity)
    {
        foreach ($dataSet[LocalizedAttributesExtractorStep::KEY_LOCALIZED_ATTRIBUTES] as $idLocale => $localizedAttributes) {
            $productLabelLocalizedAttributesEntity = SpyProductLabelLocalizedAttributesQuery::create()
                ->filterByFkProductLabel($productLabelEntity->getIdProductLabel())
                ->filterByFkLocale($idLocale)
                ->findOneOrCreate();

            $productLabelLocalizedAttributesEntity->setName($localizedAttributes[static::KEY_NAME]);

            if ($productLabelLocalizedAttributesEntity->isNew() || $productLabelLocalizedAttributesEntity->isModified()) {
                $productLabelLocalizedAttributesEntity->save();
            }
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Orm\Zed\ProductLabel\Persistence\SpyProductLabel $productLabelEntity
     *
     * @return void
     */
    protected function findOrCreateProductLabelToProductAbstractRelations(DataSetInterface $dataSet, SpyProductLabel $productLabelEntity)
    {
        if (!$dataSet[static::KEY_PRODUCT_ABSTRACT_SKUS]) {
            return;
        }

        $productAbstractSkus = explode(',', $dataSet[static::KEY_PRODUCT_ABSTRACT_SKUS]);

        if (empty($productAbstractSkus)) {
            return;
        }

        foreach ($productAbstractSkus as $productAbstractSku) {
            $idProductAbstract = trim($dataSet[AddProductAbstractSkusStep::KEY_PRODUCT_ABSTRACT_SKUS][$productAbstractSku]);
            $productLabelAbstractProductEntity = SpyProductLabelProductAbstractQuery::create()
                ->filterByFkProductLabel($productLabelEntity->getIdProductLabel())
                ->filterByFkProductAbstract($idProductAbstract)
                ->findOneOrCreate();

            if ($productLabelAbstractProductEntity->isNew() || $productLabelAbstractProductEntity->isModified()) {
                $productLabelAbstractProductEntity->save();

                $this->addPublishEvents(ProductLabelEvents::PRODUCT_LABEL_PRODUCT_ABSTRACT_PUBLISH, $idProductAbstract);
                $this->addPublishEvents(ProductEvents::PRODUCT_ABSTRACT_PUBLISH, $idProductAbstract);
            }
        }
    }

    /**
     * @param int $idProductLabel
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $navigationMode
     *
     * @return void
     */
    protected function createNavigationNode(int $idProductLabel, DataSetInterface $dataSet, string $navigationMode)
    {
        if (!isset($this->idNavigationNodeBuffer[$navigationMode])) {
            $this->idNavigationNodeBuffer[$navigationMode] = $this->resolveIdNavigation($navigationMode);
        }

        $navigationNodeEntity = SpyNavigationNodeQuery::create()
            ->filterByFkNavigation($this->idNavigationNodeBuffer[$navigationMode])
            ->filterByNodeKey($navigationMode . '_LABEL_' . $idProductLabel)
            ->findOneOrCreate();

        $navigationNodeEntity
            ->setPosition(1000 + $idProductLabel)
            ->setIsActive(true)
            ->setNodeType('link');

        $navigationNodeLocalizedAttributesEntity = SpyNavigationNodeLocalizedAttributesQuery::create()
            ->filterByFkNavigationNode($navigationNodeEntity->getIdNavigationNode())
            ->filterByFkLocale($this->getIdLocaleByName($dataSet[static::KEY_LOCALE_NAME]))
            ->findOneOrCreate();

        $navigationNodeLocalizedAttributesEntity->setTitle(
            $dataSet[LocalizedAttributesExtractorStep::KEY_LOCALIZED_ATTRIBUTES][$this->getIdLocaleByName($dataSet[static::KEY_LOCALE_NAME])][static::KEY_NAME]
        );
        $navigationNodeLocalizedAttributesEntity->setLink($dataSet[static::KEY_LINK]);
        $navigationNodeLocalizedAttributesEntity->setFkProductLabel($idProductLabel);
        $navigationNodeEntity->addSpyNavigationNodeLocalizedAttributes($navigationNodeLocalizedAttributesEntity);
        $navigationNodeEntity->save();

        $this->addPublishEvents(NavigationEvents::NAVIGATION_KEY_PUBLISH, $navigationNodeEntity->getFkNavigation());
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
}
