<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business\Mailer;

use Pyz\Shared\Mail\MailConstants;
use Pyz\Zed\Mail\MailConfig;
use Spryker\Shared\Config\Config;
use Swift_Mailer;
use Swift_Message;
use Swift_SmtpTransport;

class MonitoringMailer
{
    /**
     * @var \Pyz\Zed\Mail\MailConfig
     */
    protected $mailConfig;

    public function __construct()
    {
        $this->mailConfig = new MailConfig();
    }

    public function send(string $subject, string $mailTo, string $body): int
    {
        $transport = (new Swift_SmtpTransport($this->mailConfig->getSmtpHost(), $this->mailConfig->getSmtpPort()))
            ->setUsername($this->mailConfig->getSmtpUsername())
            ->setPassword($this->mailConfig->getSmtpPassword());

        $mailer = new Swift_Mailer($transport);

        $message = (new Swift_Message($subject))
            ->setFrom([$this->getSenderMail()])
            ->setTo([$mailTo])
            ->setBody($body);

        return $mailer->send($message);
    }

    /**
     * @return string
     */
    public function getSenderMail(): string
    {
        return Config::get(MailConstants::DEFAULT_EMAIL_SENDER_EMAIL);
    }
}
