<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Messenger;

use Spryker\Client\Messenger\MessengerClient as SprykerMessengerClient;

/**
 * @method \Pyz\Client\Messenger\MessengerFactory getFactory()
 */
class MessengerClient extends SprykerMessengerClient implements MessengerClientInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return void
     */
    public function cleanFlashMessages(): void
    {
        $this->getFactory()
            ->createFlashMessagesCleanModel()
            ->cleanFlashMessages();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return void
     */
    public function removeFlashMessages(): void
    {
        $this->getFactory()
            ->createFlashMessagesCleanModel()
            ->removeFlashMessages();
    }
}
