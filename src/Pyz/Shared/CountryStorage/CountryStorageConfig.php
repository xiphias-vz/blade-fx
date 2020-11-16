<?php


namespace Pyz\Shared\CountryStorage;


class CountryStorageConfig
{
    public const COUNTRY_LIST_RESOURCE_NAME = 'country_list';
    public const COUNTRY_SYNC_STORAGE_QUEUE = 'sync.storage.country';
    public const COUNTRY_SYNC_STORAGE_ERROR_QUEUE = 'sync.storage.country.error';
}
