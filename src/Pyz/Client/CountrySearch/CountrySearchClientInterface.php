<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountrySearch;

use Generated\Shared\Transfer\CountryCollectionTransfer;

/**
 * Interface CountrySearchClientInterface
 *
 * @package Pyz\Client\CountrySearch
 */
interface CountrySearchClientInterface
{
    public function getActiveCountries(): CountryCollectionTransfer;
}
