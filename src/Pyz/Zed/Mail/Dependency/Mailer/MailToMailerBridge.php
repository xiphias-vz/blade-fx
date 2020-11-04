<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Dependency\Mailer;

use Spryker\Zed\Mail\Dependency\Mailer\MailToMailerBridge as SprykerMailToMailerBridge;
use Swift_Attachment;

class MailToMailerBridge extends SprykerMailToMailerBridge implements MailToMailerInterface
{
    /**
     * @param \Swift_Message $message
     * @param \Swift_Mailer $mailer
     */
    public function __construct($message, $mailer)
    {
        parent::__construct($message, $mailer);
    }

    /**
     * @param string $attachment
     * @param string|null $displayName
     *
     * @return void
     */
    public function addAttachment(string $attachment, ?string $displayName = null): void
    {
        $swiftMimeAttachment = Swift_Attachment::newInstance(file_get_contents($attachment), $displayName);

        $this->message->attach($swiftMimeAttachment);
    }

    /**
     * @param array $bcc
     *
     * @return void
     */
    public function setBcc(array $bcc): void
    {
        foreach ($bcc as $address) {
            $this->message->addBcc($address);
        }
    }
}
