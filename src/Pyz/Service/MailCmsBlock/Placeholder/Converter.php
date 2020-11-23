<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\MailCmsBlock\Placeholder;

use Generated\Shared\Transfer\OrderTransfer;

class Converter
{
    /**
     * @param array $data
     *
     * @return array
     */
    public function convertArrayToPlaceholders(array $data): array
    {
        $result = [];

        foreach ($data as $key => $value) {
            if (!is_scalar($value)) {
                continue;
            }
            $result[sprintf('{{%s}}', $key)] = $value;
        }

        return $result;
    }

    /**
     * @param string $text
     *
     * @return string
     */
    public function convertNewLineToBr(string $text): string
    {
        return str_replace(PHP_EOL, '<br/>', $text);
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function getDeliveryDate(OrderTransfer $orderTransfer): string
    {
        $itemTransfer = $orderTransfer->getItems()[0];
        if (!$itemTransfer) {
            return '';
        }

        $deliveryDate = $itemTransfer->getShipment()->getRequestedDeliveryDate();
        $deliveryDate = str_replace('_', ' ', $deliveryDate);

        return $deliveryDate;
    }
}
