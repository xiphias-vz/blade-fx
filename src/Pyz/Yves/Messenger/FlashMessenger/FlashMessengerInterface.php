<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Messenger\FlashMessenger;

use Spryker\Yves\Messenger\FlashMessenger\FlashMessengerInterface as SprykerFlashMessengerInterface;

interface FlashMessengerInterface extends SprykerFlashMessengerInterface
{
    /**
     * @return array
     */
    public function getMessages(): array;
}
