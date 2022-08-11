<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\DataReader\CsvReader;

use Exception;
use Spryker\Zed\DataImport\Business\Exception\DataSetWithHeaderCombineFailedException;
use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReader as SprykerCsvReader;

class CsvReader extends SprykerCsvReader
{
    /**
     * @throws \Spryker\Zed\DataImport\Business\Exception\DataSetWithHeaderCombineFailedException
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    public function current()
    {
        $dataSet = $this->fileObject->current();
        if (!is_array($dataSet)) {
            $dataSet = $this->fileObject->fgetcsv($this->fileObject->getCsvControl()[0], $this->fileObject->getCsvControl()[1], $this->fileObject->getCsvControl()[2]);
        }
        if ($dataSet !== false && $dataSet !== null) {
            if ($this->dataSetKeys) {
                $dataSetBeforeCombine = $dataSet;
                try {
                    $dataSet = array_combine($this->dataSetKeys, $dataSet);
                } catch (Exception $e) {
                    throw new DataSetWithHeaderCombineFailedException(sprintf(
                        'Can not combine data set header with current data set. Keys: "%s", Values "%s"',
                        implode(', ', $this->dataSetKeys),
                        implode(', ', array_values($dataSetBeforeCombine))
                    ), 0, $e);
                }
            }

            $this->dataSet->exchangeArray($dataSet);
        }

        return $this->dataSet;
    }
}
