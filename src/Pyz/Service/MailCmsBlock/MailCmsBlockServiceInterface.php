<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\MailCmsBlock;

use Generated\Shared\Transfer\OrderTransfer;

interface MailCmsBlockServiceInterface
{
    /**
     * Specification:
     * - converts array key to a placeholder names, used in Mail CMS renderer
     *
     * @api
     *
     * @param array $data
     *
     * @return array
     */
    public function convertArrayToPlaceholders(array $data): array;

    /**
     * Specification:
     * - convert \n to <br/>
     *
     * @api
     *
     * @param string $text
     *
     * @return string
     */
    public function convertNewLineToBr(string $text): string;

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return string
     */
    public function getDeliveryDate(OrderTransfer $orderTransfer): string;
}
