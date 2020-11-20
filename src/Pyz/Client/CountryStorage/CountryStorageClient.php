<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

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
