<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber\Business\Generator;

use Generated\Shared\Transfer\SaveOrderTransfer;
use Pyz\Zed\CollectNumber\CollectNumberConfig;

class CollectNumberGenerator
{
    /**
     * @var \Pyz\Zed\CollectNumber\CollectNumberConfig
     */
    private $config;

    /**
     * @param \Pyz\Zed\CollectNumber\CollectNumberConfig $config
     */
    public function __construct(
        CollectNumberConfig $config
    ) {
        $this->config = $config;
    }

    /**
     * @param \Generated\Shared\Transfer\SaveOrderTransfer $saveOrderTransfer
     *
     * @return string
     */
    public function generateCollectNumber(SaveOrderTransfer $saveOrderTransfer): string
    {
        return $this->generateCollectNumberForSalesOrder(
            $saveOrderTransfer->getIdSalesOrder()
        );
    }

    /**
     * @param int $idSalesOrder
     *
     * @return string
     */
    private function generateCollectNumberForSalesOrder(int $idSalesOrder): string
    {
        $uniqueNumber = base_convert($idSalesOrder, 10, $this->config->getCollectNumberDigitsBase());

        $collectNumberLength = $this->config->getCollectNumberLength();
        $paddedUniqueId = sprintf(
            '%'
            . $this->config->getCollectNumberPadSymbol()
            . $collectNumberLength
            . 's',
            $uniqueNumber
        );

        $paddedUniqueId = substr($paddedUniqueId, -$collectNumberLength, $collectNumberLength);

        $collectNumber = sprintf(
            'A%s', // date of order
            $paddedUniqueId
        );

        return strtoupper($collectNumber);
    }
}
