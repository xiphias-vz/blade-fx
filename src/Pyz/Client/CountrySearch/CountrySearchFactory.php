<?php


namespace Pyz\Client\CountrySearch;


use Pyz\Client\CountryStorage\CountryStorageClient;
use Spryker\Client\Kernel\AbstractFactory;

class CountrySearchFactory extends AbstractFactory
{
    public function getCountryStorageClient() : CountryStorageClient
    {
        return $this->getProvidedDependency(CountrySearchDependencyProvider::COUNTRY_STORAGE);
    }
}
