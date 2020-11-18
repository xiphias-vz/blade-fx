<?php


namespace Pyz\Client\CountryStorage;


use Generated\Shared\Transfer\CountryCollectionTransfer;

interface CountryStorageClientInterface
{
    /**
     * @return CountryCollectionTransfer
     */
    public function getCountriesList(): CountryCollectionTransfer;
}
