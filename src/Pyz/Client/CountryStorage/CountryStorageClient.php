<?php


namespace Pyz\Client\CountryStorage;


use Generated\Shared\Transfer\CountryCollectionTransfer;
use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\CountryStorage\CountryStorageClient getFactory()
 */
class CountryStorageClient extends AbstractClient implements CountryStorageClientInterface
{
    public function getCountriesList(): CountryCollectionTransfer
    {
            return $this->getFactory()->createCountryStorageReader()->getCountries();  //TODO: Add getCountries - DOESN'T WORK
    }
}
