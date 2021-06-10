<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CashierOrderExport\Business\Builder;

use DOMDocument;
use Generated\Shared\Transfer\OrderTransfer;

interface CashierOrderContentBuilderInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function prepareContent(OrderTransfer $orderTransfer): string;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \DOMDocument
     */
    public function prepareContentXml(OrderTransfer $orderTransfer): DOMDocument;
}
