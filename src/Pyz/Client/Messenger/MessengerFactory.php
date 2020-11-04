<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Messenger;

use Pyz\Client\Messenger\Model\FlashMessagesCleanModel;
use Pyz\Yves\Messenger\FlashMessenger\FlashMessengerInterface;
use Spryker\Client\Messenger\MessengerFactory as SprykerMessengerFactory;

class MessengerFactory extends SprykerMessengerFactory
{
    /**
     * @return \Pyz\Client\Messenger\Model\FlashMessagesCleanModel
     */
    public function createFlashMessagesCleanModel(): FlashMessagesCleanModel
    {
        return new FlashMessagesCleanModel(
            $this->getFlashMessenger()
        );
    }

    /**
     * @return \Pyz\Yves\Messenger\FlashMessenger\FlashMessengerInterface
     */
    public function getFlashMessenger(): FlashMessengerInterface
    {
        return $this->getProvidedDependency(MessengerDependencyProvider::FLASH_MESSENGER);
    }
}
