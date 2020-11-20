<?php


namespace Pyz\Client\CountrySearch;


use Generated\Shared\Transfer\CountryCollectionTransfer;
use Generated\Shared\Transfer\CountryTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\CountrySearch\CountrySearchFactory getFactory()
 */
class CountrySearchClient extends AbstractClient implements CountrySearchClientInterface
{
    public function getActiveCountries(): CountryCollectionTransfer
    {
         return $this->getFactory()->getCountryStorageClient()->getCountriesList();
    }
}
