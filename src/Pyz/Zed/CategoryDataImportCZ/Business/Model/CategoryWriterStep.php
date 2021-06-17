<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryDataImportCZ\Business\Model;

use Pyz\Zed\CategoryDataImport\Business\Model\CategoryWriterStep as IntCategoryWriterStep;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class CategoryWriterStep extends IntCategoryWriterStep
{
    protected const ROOT = 'cls_czr_click_and_collect';
    protected const ROOT_NAME = 'CZ - Kunden Produkt Hierarchie';
    protected const LOCALE_NAME = 'cs_CZ';
}
