<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CountrySearch;

use Generated\Shared\Transfer\CountryCollectionTransfer;
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
