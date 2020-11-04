<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\CartNote;

use Spryker\Client\CartNote\CartNoteDependencyProvider as SprykerCartNoteDependencyProvider;
use Spryker\Client\CartNote\Plugin\QuoteItemFinderPlugin;
use Spryker\Client\CartNoteExtension\Dependency\Plugin\QuoteItemFinderPluginInterface;

class CartNoteDependencyProvider extends SprykerCartNoteDependencyProvider
{
    /**
     * @return \Spryker\Client\CartNoteExtension\Dependency\Plugin\QuoteItemFinderPluginInterface
     */
    protected function getQuoteItemsFinderPlugin(): QuoteItemFinderPluginInterface
    {
        return new QuoteItemFinderPlugin(); #CartNoteFeature
    }
}
