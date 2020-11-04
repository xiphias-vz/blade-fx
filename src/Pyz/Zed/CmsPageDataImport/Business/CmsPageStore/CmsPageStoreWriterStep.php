<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CmsPageDataImport\Business\CmsPageStore;

use Orm\Zed\Cms\Persistence\SpyCmsPageStoreQuery;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Cms\Dependency\CmsEvents;
use Spryker\Zed\CmsPageDataImport\Business\DataSet\CmsPageStoreDataSet;
use Spryker\Zed\CmsPageDataImport\Dependency\Facade\CmsPageDataImportToCmsFacadeInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class CmsPageStoreWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    /**
     * @var int[] Keys are store names, values are store ids.
     */
    protected static $idStoreBuffer = [];

    /**
     * @var \Spryker\Zed\CmsPageDataImport\Dependency\Facade\CmsPageDataImportToCmsFacadeInterface
     */
    protected $cmsFacade;

    /**
     * @param \Spryker\Zed\CmsPageDataImport\Dependency\Facade\CmsPageDataImportToCmsFacadeInterface $cmsFacade
     */
    public function __construct(CmsPageDataImportToCmsFacadeInterface $cmsFacade)
    {
        $this->cmsFacade = $cmsFacade;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $availableStores = Store::getInstance()->getAllowedStores();

        foreach ($availableStores as $storeName) {
            (new SpyCmsPageStoreQuery())
                ->filterByFkCmsPage($dataSet[CmsPageStoreDataSet::ID_CMS_PAGE])
                ->filterByFkStore($this->getIdStoreByStoreName($storeName))
                ->findOneOrCreate()
                ->save();
        }

        $cmsVersionTransfer = $this->cmsFacade->publishWithVersion($dataSet[CmsPageStoreDataSet::ID_CMS_PAGE]);
        $this->addPublishEvents(CmsEvents::CMS_VERSION_PUBLISH, $cmsVersionTransfer->getFkCmsPage());
    }

    /**
     * @param string $storeName
     *
     * @return int
     */
    protected function getIdStoreByStoreName(string $storeName): int
    {
        if (!isset(static::$idStoreBuffer[$storeName])) {
            static::$idStoreBuffer[$storeName] =
                SpyStoreQuery::create()->findOneByName($storeName)->getIdStore();
        }

        return static::$idStoreBuffer[$storeName];
    }
}
