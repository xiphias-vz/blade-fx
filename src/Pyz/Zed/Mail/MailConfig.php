<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail;

use Pyz\Shared\Mail\MailConstants;
use Spryker\Zed\Mail\MailConfig as SprykerMailConfig;

class MailConfig extends SprykerMailConfig
{
    /**
     * @return string
     */
    public function getDefaultEmailSenderEmail(): string
    {
        return $this->get(MailConstants::DEFAULT_EMAIL_SENDER_EMAIL);
    }

    /**
     * @return string
     */
    public function getDefaultEmailSenderName(): string
    {
        return $this->get(MailConstants::DEFAULT_EMAIL_SENDER_NAME);
    }

    /**
     * @return string
     */
    public function getSmtpUsername(): string
    {
        return $this->get(MailConstants::SMTP_USERNAME, '');
    }

    /**
     * @return string
     */
    public function getSmtpPassword(): string
    {
        return $this->get(MailConstants::SMTP_PASSWORD, '');
    }

    /**
     * @return string
     */
    public function getSmtpAuthMode(): string
    {
        return $this->get(MailConstants::SMTP_AUTH_MODE, '');
    }

    /**
     * @return string
     */
    public function getSmtpEncryption(): string
    {
        return $this->get(MailConstants::SMTP_ENCRYPTION, '');
    }
}
