<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model\Provider;

use Generated\Shared\Transfer\MailTransfer;
use Pyz\Zed\Mail\Dependency\Mailer\MailToMailerInterface;
use Spryker\Zed\Mail\Business\Model\Renderer\RendererInterface;
use Spryker\Zed\Mail\Dependency\Plugin\MailProviderPluginInterface;

class CmsBlockMailer implements MailProviderPluginInterface
{
    /**
     * @var \Spryker\Zed\Mail\Business\Model\Renderer\RendererInterface
     */
    protected $renderer;

    /**
     * @var \Pyz\Zed\Mail\Dependency\Mailer\MailToMailerInterface
     */
    protected $mailer;

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Renderer\RendererInterface $renderer
     * @param \Pyz\Zed\Mail\Dependency\Mailer\MailToMailerInterface $mailer
     */
    public function __construct(RendererInterface $renderer, MailToMailerInterface $mailer)
    {
        $this->renderer = $renderer;
        $this->mailer = $mailer;
    }

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
    protected function addSubject(MailTransfer $mailTransfer)
    {
        $this->mailer->setSubject($mailTransfer->getSubject());

        return $this;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return $this
     */
    protected function addFrom(MailTransfer $mailTransfer)
    {
        $senderTransfer = $mailTransfer->requireSender()->getSender();

        $this->mailer->setFrom($senderTransfer->getEmail(), $senderTransfer->getName());

        return $this;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return $this
     */
    protected function addTo(MailTransfer $mailTransfer)
    {
        $recipientTransferCollection = $mailTransfer->requireRecipients()->getRecipients();

        foreach ($recipientTransferCollection as $recipientTransfer) {
            $this->mailer->addTo($recipientTransfer->getEmail(), $recipientTransfer->getName());
        }

        return $this;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return $this
     */
    protected function addContent(MailTransfer $mailTransfer)
    {
        $this->renderer->render($mailTransfer);

        foreach ($mailTransfer->requireTemplates()->getTemplates() as $templateTransfer) {
            if ($templateTransfer->getIsHtml()) {
                $this->mailer->setHtmlContent($templateTransfer->getContent());

                continue;
            }
            if (!$templateTransfer->getIsHtml()) {
                $this->mailer->setTextContent($templateTransfer->getContent());
            }
        }

        return $this;
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
