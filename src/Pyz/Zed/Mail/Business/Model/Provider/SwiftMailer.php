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
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return \Spryker\Zed\Mail\Business\Model\Provider\SwiftMailer
     */
    protected function addContent(MailTransfer $mailTransfer)
    {
        $this->renderer->render($mailTransfer);

        foreach ($mailTransfer->requireTemplates()->getTemplates() as $templateTransfer) {
            if ($templateTransfer->getIsHtml()) {
                $this->mailer->setHtmlContent($templateTransfer->getContent());
            }

            if (!$templateTransfer->getIsHtml()) {
                $this->mailer->setTextContent($templateTransfer->getContent());
            }
        }

        return $this;
    }
}
