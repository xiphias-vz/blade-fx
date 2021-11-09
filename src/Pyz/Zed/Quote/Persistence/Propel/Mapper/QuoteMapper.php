<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Quote\Persistence\Propel\Mapper;

use Generated\Shared\Transfer\QuoteTransfer;
use Orm\Zed\Quote\Persistence\SpyQuote;
use Spryker\Zed\Quote\Persistence\Propel\Mapper\QuoteMapper as SprykerQuoteMapper;

class QuoteMapper extends SprykerQuoteMapper
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Orm\Zed\Quote\Persistence\SpyQuote $quoteEntity
     * @param string[] $quoteFieldsAllowedForSaving
     *
     * @return \Orm\Zed\Quote\Persistence\SpyQuote
     */
    public function mapTransferToEntity(QuoteTransfer $quoteTransfer, SpyQuote $quoteEntity, array $quoteFieldsAllowedForSaving): SpyQuote
    {
        $quoteEntity = parent::mapTransferToEntity($quoteTransfer, $quoteEntity, $quoteFieldsAllowedForSaving);
        $storeId = $quoteTransfer->getStore() ? $quoteTransfer->getStore()->getIdStore() : null;

        if ($storeId && $storeId != $quoteEntity->getFkStore()) {
            $quoteEntity
                ->setFkStore($storeId);
        }

        return $quoteEntity;
    }
}
