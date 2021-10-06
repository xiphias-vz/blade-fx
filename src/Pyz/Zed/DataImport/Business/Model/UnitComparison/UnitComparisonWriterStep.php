<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\UnitComparison;

use Generated\Shared\Transfer\PyzUnitComparisonsEntityTransfer;
use Orm\Zed\PriceProduct\Persistence\PyzUnitComparisonsQuery;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class UnitComparisonWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const UNIT_FROM = 'unit_from';
    public const UNIT_TO = 'unit_to';
    public const RATIO = 'ratio';

    protected const REQUIRED_DATA_SET_KEYS = [
        self::UNIT_FROM,
        self::UNIT_TO,
        self::RATIO,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $this->validateDataSet($dataSet);

        $unitComparisonTransfers = $this->mapDataSetToUnitComparisonEntityTransfer($dataSet, new PyzUnitComparisonsEntityTransfer());

        $this->saveUnitComparison($unitComparisonTransfers);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function validateDataSet(DataSetInterface $dataSet): void
    {
        foreach (static::REQUIRED_DATA_SET_KEYS as $requiredDataSetKey) {
            $this->validateRequireDataSetByKey($dataSet, $requiredDataSetKey);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $requiredDataSetKey
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function validateRequireDataSetByKey(DataSetInterface $dataSet, string $requiredDataSetKey): void
    {
        if (!$dataSet[$requiredDataSetKey]) {
            throw new InvalidDataException('"' . $requiredDataSetKey . '" is required.');
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Generated\Shared\Transfer\PyzUnitComparisonsEntityTransfer $unitComparisonsEntityTransfer
     *
     * @return \Generated\Shared\Transfer\PyzUnitComparisonsEntityTransfer
     */
    protected function mapDataSetToUnitComparisonEntityTransfer(
        DataSetInterface $dataSet,
        PyzUnitComparisonsEntityTransfer $unitComparisonsEntityTransfer
    ): PyzUnitComparisonsEntityTransfer {
        $unitComparisonsEntityTransfer->fromArray($dataSet->getArrayCopy(), true);

        return $unitComparisonsEntityTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PyzUnitComparisonsEntityTransfer $unitComparisonsEntityTransfer
     *
     * @return void
     */
    protected function saveUnitComparison(PyzUnitComparisonsEntityTransfer $unitComparisonsEntityTransfer): void
    {
        $pyzUnitComparisonEntity = PyzUnitComparisonsQuery::create()
            ->filterByUnitFrom()
            ->filterByUnitTo()
            ->findOneOrCreate();

        $pyzUnitComparisonEntity->setUnitFrom($unitComparisonsEntityTransfer->getUnitFrom());
        $pyzUnitComparisonEntity->setUnitTo($unitComparisonsEntityTransfer->getUnitTo());
        $pyzUnitComparisonEntity->setRatio($unitComparisonsEntityTransfer->getRatio());

        if ($pyzUnitComparisonEntity->isNew() || $pyzUnitComparisonEntity->isModified()) {
            $pyzUnitComparisonEntity->save();
        }
    }
}
