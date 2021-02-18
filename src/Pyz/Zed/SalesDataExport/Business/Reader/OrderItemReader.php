<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDataExport\Business\Reader;

use Generated\Shared\Transfer\DataExportBatchTransfer;
use Generated\Shared\Transfer\DataExportConfigurationTransfer;
use Pyz\Zed\SalesDataExport\Persistence\SalesDataExportRepositoryInterface;

class OrderItemReader implements ReaderInterface
{
    /**
     * @var \Pyz\Zed\SalesDataExport\Persistence\SalesDataExportRepositoryInterface
     */
    protected $salesDataExportRepository;

    /**
     * @param \Pyz\Zed\SalesDataExport\Persistence\SalesDataExportRepositoryInterface $salesDataExportRepository
     */
    public function __construct(SalesDataExportRepositoryInterface $salesDataExportRepository)
    {
        $this->salesDataExportRepository = $salesDataExportRepository;
    }

    /**
     * @param \Generated\Shared\Transfer\DataExportConfigurationTransfer $dataExportConfigurationTransfer
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\DataExportBatchTransfer
     */
    public function readBatch(DataExportConfigurationTransfer $dataExportConfigurationTransfer, int $offset, int $limit): DataExportBatchTransfer
    {
        return $this->salesDataExportRepository->getOrderItemData($dataExportConfigurationTransfer, $offset, $limit);
    }
}
