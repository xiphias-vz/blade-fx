<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Messenger\Model;

use Pyz\Yves\Messenger\FlashMessenger\FlashMessengerInterface;
use Spryker\Shared\Messenger\MessengerConfig;

class FlashMessagesCleanModel
{
    public const FLASH_MESSENGER = 'flash_messenger';
    /**
     * @var \Pyz\Yves\Messenger\FlashMessenger\FlashMessengerInterface
     */
    private $messenger;

    /**
     * @param \Pyz\Yves\Messenger\FlashMessenger\FlashMessengerInterface $messenger
     */
    public function __construct(FlashMessengerInterface $messenger)
    {
        $this->messenger = $messenger;
    }

    /**
     * @return void
     */
    public function cleanFlashMessages(): void
    {
        $flashMessages = $this->messenger->getMessages();

        $uniqueFlashMessages = array_map('array_unique', $flashMessages);

        $this->addSuccessMessages($uniqueFlashMessages[MessengerConfig::FLASH_MESSAGES_SUCCESS] ?? []);
        $this->addErrorMessages($uniqueFlashMessages[MessengerConfig::FLASH_MESSAGES_ERROR] ?? []);
        $this->addInfoMessages($uniqueFlashMessages[MessengerConfig::FLASH_MESSAGES_INFO] ?? []);
    }

    /**
     * @return void
     */
    public function removeFlashMessages(): void
    {
        $this->messenger->getMessages();
    }

    /**
     * @param string[] $messages
     *
     * @return void
     */
    private function addSuccessMessages(array $messages): void
    {
        foreach ($messages as $message) {
            $this->messenger->addSuccessMessage($message);
        }
    }

    /**
     * @param string[] $messages
     *
     * @return void
     */
    private function addErrorMessages(array $messages): void
    {
        foreach ($messages as $message) {
            $this->messenger->addErrorMessage($message);
        }
    }

    /**
     * @param string[] $messages
     *
     * @return void
     */
    private function addInfoMessages(array $messages): void
    {
        foreach ($messages as $message) {
            $this->messenger->addInfoMessage($message);
        }
    }
}
