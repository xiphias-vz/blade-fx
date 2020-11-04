<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Dependency\Mailer;

use Spryker\Zed\Mail\Dependency\Mailer\MailToMailerInterface as SprykerMailToMailerInterface;

interface MailToMailerInterface extends SprykerMailToMailerInterface
{
    /**
     * @param string $attachment
     * @param string|null $displayName
     *
     * @return void
     */
    public function addAttachment(string $attachment, ?string $displayName = null): void;

    /**
     * @param array $bcc
     *
     * @return void
     */
    public function setBcc(array $bcc): void;
}
