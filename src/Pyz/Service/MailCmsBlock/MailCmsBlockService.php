<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\MailCmsBlock;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Service\Kernel\AbstractService;

/**
 * @method \Pyz\Service\MailCmsBlock\MailCmsBlockServiceFactory getFactory()
 */
class MailCmsBlockService extends AbstractService implements MailCmsBlockServiceInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param array $data
     *
     * @return array
     */
    public function convertArrayToPlaceholders(array $data): array
    {
        return $this->getFactory()
            ->createConverter()
            ->convertArrayToPlaceholders($data);
    }

    /**
     * @param string $text
     *
     * @return string
     */
    public function convertNewLineToBr(string $text): string
    {
        if(empty($text)){
            return "";
        }
        return $this->getFactory()
            ->createConverter()
            ->convertNewLineToBr($text);
    }

    /**
     * @inheritDoc
     */
    public function getDeliveryDate(OrderTransfer $orderTransfer): string
    {
        return $this->getFactory()
            ->createConverter()
            ->getDeliveryDate($orderTransfer);
    }
}
