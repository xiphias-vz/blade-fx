<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Messenger;

use Spryker\Client\Messenger\MessengerClientInterface as SprykerMessengerClientInterface;

/**
 * @method \Spryker\Client\Messenger\MessengerFactory getFactory()
 */
interface MessengerClientInterface extends SprykerMessengerClientInterface
{
    /**
     * Specification:
     *  - Suppress repeated messages.
     *
     * @api
     *
     * @return void
     */
    public function cleanFlashMessages(): void;

    /**
     * Specification:
     *  - Suppress all messages.
     *
     * @api
     *
     * @return void
     */
    public function removeFlashMessages(): void;
}
