<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Quote\Persistence;

use Pyz\Zed\Quote\Persistence\Propel\Mapper\QuoteMapper;
use Spryker\Zed\Quote\Persistence\QuotePersistenceFactory as SprykerQuotePersistenceFactory;

class QuotePersistenceFactory extends SprykerQuotePersistenceFactory
{
    /**
     * @return \Spryker\Zed\Quote\Persistence\Propel\Mapper\QuoteMapperInterface
     */
    public function createQuoteMapper()
    {
        return new QuoteMapper($this->getUtilEncodingService());
    }
}
