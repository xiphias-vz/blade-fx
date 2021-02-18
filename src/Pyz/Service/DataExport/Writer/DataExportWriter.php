<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataExport\Writer;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Generated\Shared\Transfer\DataExportWriteResponseTransfer;
use Spryker\Service\DataExport\Writer\DataExportWriter as ExtendDataExportWriter;

class DataExportWriter extends ExtendDataExportWriter implements DataExportWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataExportBatchTransfer $dataExportBatchTransfer
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataExportWriteResponseTransfer
     */
    public function write(
        DataExportBatchTransfer $dataExportBatchTransfer,
        DataExportConfigurationTransfer $dataExportConfigurationTransfer
    ): DataExportWriteResponseTransfer {
        $dataExportConfigurationTransfer
            ->requireDestination()
            ->requireConnection();

        $dataExportWriteResponseTransfer = (new DataExportWriteResponseTransfer())
            ->setIsSuccessful(false);

        foreach ($this->dataExportConnectionPlugins as $dataExportConnectionPlugin) {
            if (!$dataExportConnectionPlugin->isApplicable($dataExportConfigurationTransfer)) {
                continue;
            }

            $dataFormatResponseTransfer = $this->dataExportFormatter->formatBatch($dataExportBatchTransfer, $dataExportConfigurationTransfer);
            if (!$dataFormatResponseTransfer->getIsSuccessful()) {
                return $dataExportWriteResponseTransfer->setMessages($dataFormatResponseTransfer->getMessages());
            }

            return $dataExportConnectionPlugin->write(
                $dataFormatResponseTransfer,
                $dataExportBatchTransfer,
                $dataExportConfigurationTransfer
            );
        }

        $connectionType = $dataExportConfigurationTransfer->getConnection()->getType();
        if ($connectionType === static::DEFAULT_CONNECTION_TYPE) {
            return $this->dataExportLocalWriter->write($dataExportBatchTransfer, $dataExportConfigurationTransfer);
        }

        return $dataExportWriteResponseTransfer->addMessage($this->createConnectionPluginNotFoundMessage($connectionType));
    }
}
