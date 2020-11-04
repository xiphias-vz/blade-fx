<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model\Provider;

use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Mail\Business\Model\Provider\SwiftMailer as SprykerSwiftMailer;

class SwiftMailer extends SprykerSwiftMailer
{
    /**
     * @var \Pyz\Zed\Mail\Dependency\Mailer\MailToMailerInterface
     */
    protected $mailer;

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    public function sendMail(MailTransfer $mailTransfer): void
    {
        $this
            ->addSubject($mailTransfer)
            ->addFrom($mailTransfer)
            ->addTo($mailTransfer)
            ->setBcc($mailTransfer)
            ->addContent($mailTransfer)
            ->addAttachments($mailTransfer);

        $this->mailer->send();
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return $this
     */
    protected function setBcc(MailTransfer $mailTransfer)
    {
        $this->mailer->setBcc($mailTransfer->getBcc());

        return $this;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return $this
     */
    protected function addAttachments(MailTransfer $mailTransfer)
    {
        foreach ($mailTransfer->getAttachments() as $attachment) {
            $this->mailer->addAttachment($attachment->getAttachmentUrl(), $attachment->getDisplayName());
        }

        return $this;
    }
}
