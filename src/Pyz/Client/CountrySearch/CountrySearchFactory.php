<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountrySearch;

use Pyz\Client\CountryStorage\CountryStorageClient;
use Spryker\Client\Kernel\AbstractFactory;

class CountrySearchFactory extends AbstractFactory
{
    public function getCountryStorageClient(): CountryStorageClient
    {
        return $this->getProvidedDependency(CountrySearchDependencyProvider::COUNTRY_STORAGE);
    }
}
