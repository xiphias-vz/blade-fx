<?php


namespace Pyz\Client\CountryStorage\CountryStorage;


use Generated\Shared\Transfer\CountryCollectionTransfer;

interface CountryStorageReaderInterface
{
    public function getCountries(): CountryCollectionTransfer;
}
