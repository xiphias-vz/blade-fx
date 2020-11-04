<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\PostalCode;

use Orm\Zed\PostalCode\Persistence\PyzPostalCodeQuery;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class PostalCodeWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const BULK_SIZE = 100;

    public const POSTAL_CODE_KEY = 'postal_code';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $pyzPostalCodeEntity = PyzPostalCodeQuery::create()
            ->filterByPostalCode($dataSet[static::POSTAL_CODE_KEY])
            ->findOneOrCreate();

        $pyzPostalCodeEntity->save();
    }
}
