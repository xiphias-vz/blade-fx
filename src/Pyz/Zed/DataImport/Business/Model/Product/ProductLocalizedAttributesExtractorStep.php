<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\Product;

use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductLocalizedAttributesExtractorStep implements DataImportStepInterface
{
    public const KEY_LOCALIZED_ATTRIBUTES = 'localizedAttributes';
    public const KEY_LOCALE_KEY = 'localeKey';

    /**
     * @var array
     */
    protected $defaultAttributes = [];

    /**
     * @param array $defaultAttributes
     */
    public function __construct(array $defaultAttributes = [])
    {
        $this->defaultAttributes = $defaultAttributes;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $localizedAttributes = [];
        foreach ($dataSet['locales'] as $localeName => $idLocale) {

            foreach ($this->defaultAttributes as $defaultAttribute) {
                $localizedAttributes[$idLocale][$defaultAttribute] = $dataSet[$defaultAttribute];
            }

            $localizedAttributes[$idLocale][static::KEY_LOCALE_KEY] = $localeName;
        }

        $dataSet[static::KEY_LOCALIZED_ATTRIBUTES] = $localizedAttributes;
    }
}
