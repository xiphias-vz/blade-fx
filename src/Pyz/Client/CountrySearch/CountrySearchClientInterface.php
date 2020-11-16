<?php


namespace Pyz\Client\CountrySearch;

use Generated\Shared\Transfer\CountryCollectionTransfer;
use Generated\Shared\Transfer\CountryTransfer;

/**
 * Interface CountrySearchClientInterface
 * @package Pyz\Client\CountrySearch
 */
interface CountrySearchClientInterface
{
    public function getActiveCountries(): CountryCollectionTransfer;
}
