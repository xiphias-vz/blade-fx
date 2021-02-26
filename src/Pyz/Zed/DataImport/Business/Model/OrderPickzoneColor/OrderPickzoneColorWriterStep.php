<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\OrderPickzoneColor;

use Generated\Shared\Transfer\PyzOrderPickzoneColorEntityTransfer;
use Orm\Zed\Sales\Persistence\Base\PyzOrderPickzoneColorQuery;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class OrderPickzoneColorWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const ID_COLOR = 'id_color';
    public const FORE_COLOR = 'fore_color';
    public const BACK_COLOR = 'back_color';
    public const CIRCLE_COLOR = 'circle_color';

    protected const REQUIRED_DATA_SET_KEYS = [
        self::FORE_COLOR,
        self::BACK_COLOR,
        self::CIRCLE_COLOR,
        self::ID_COLOR,
    ];

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        $orderPickingTransfers = $this->mapDataSetToOrderPickzoneColorEntityTransfer($dataSet, new PyzOrderPickzoneColorEntityTransfer());

        $this->saveOrderPickingColor($orderPickingTransfers);
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
     * @param \Generated\Shared\Transfer\PyzOrderPickzoneColorEntityTransfer $orderPickzoneColorEntityTransfer
     *
     * @return \Generated\Shared\Transfer\PyzOrderPickzoneColorEntityTransfer
     */
    protected function mapDataSetToOrderPickzoneColorEntityTransfer(
        DataSetInterface $dataSet,
        PyzOrderPickzoneColorEntityTransfer $orderPickzoneColorEntityTransfer
    ): PyzOrderPickzoneColorEntityTransfer {
        $orderPickzoneColorEntityTransfer->fromArray($dataSet->getArrayCopy(), true);

        return $orderPickzoneColorEntityTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\PyzOrderPickzoneColorEntityTransfer $orderPickzoneColorEntityTransfer
     *
     * @return void
     */
    protected function saveOrderPickingColor(PyzOrderPickzoneColorEntityTransfer $orderPickzoneColorEntityTransfer): void
    {
        $pyzOrderPickingColorEntity = PyzOrderPickzoneColorQuery::create()
            ->filterByIdColor($orderPickzoneColorEntityTransfer->getIdColor())
            ->findOneOrCreate();

        $pyzOrderPickingColorEntity->setIdColor($orderPickzoneColorEntityTransfer->getIdColor());
        $pyzOrderPickingColorEntity->setForeColor($orderPickzoneColorEntityTransfer->getForeColor());
        $pyzOrderPickingColorEntity->setBackColor($orderPickzoneColorEntityTransfer->getBackColor());
        $pyzOrderPickingColorEntity->setCircleColor($orderPickzoneColorEntityTransfer->getCircleColor());

        if ($pyzOrderPickingColorEntity->isNew() || $pyzOrderPickingColorEntity->isModified()) {
            $pyzOrderPickingColorEntity->save();
        }
    }
}
