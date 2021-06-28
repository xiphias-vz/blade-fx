<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryDataImportCZ\Business\Model;

use Exception;
use Pyz\Zed\CategoryDataImport\Business\Model\CategoryWriterStep as IntCategoryWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\AddLocalesStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class CategoryWriterStep extends IntCategoryWriterStep
{
    protected const ROOT = 'cls_czr_click_and_collect';
    protected const ROOT_NAME = 'CZ - Kunden Produkt Hierarchie';
    protected const LOCALE_NAME = 'cs_CZ';

    /**
     * @param int $idLocale
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @throws \Exception
     *
     * @return string
     */
    protected function getLanguageIdentifier($idLocale, DataSetInterface $dataSet)
    {
        foreach ($dataSet[AddLocalesStep::KEY_LOCALES] as $localeName => $localeId) {
            if ($idLocale === $localeId) {
                return mb_strtolower(mb_substr($localeName, 3, 2));
            }
        }

        throw new Exception(sprintf('Could not extract language identifier for idLocale "%s"', $idLocale));
    }
}
