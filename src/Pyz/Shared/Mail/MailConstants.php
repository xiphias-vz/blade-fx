<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Mail;

use Spryker\Shared\Mail\MailConstants as SprykerMailConstants;

/**
 * Declares global environment configuration keys. Do not use it for other class constants.
 */
interface MailConstants extends SprykerMailConstants
{
    /**
     * Specification:
     * - Defines default email sender emails will be used as a sender in all emails.
     *
     * @api
     */
    public const DEFAULT_EMAIL_SENDER_EMAIL = 'MAIL_CONSTANTS:DEFAULT_EMAIL_SENDER_EMAIL';

    /**
     * Specification:
     * - Defines default email sender of emails will be used as a sender in all emails.
     *
     * @api
     */
    public const DEFAULT_EMAIL_SENDER_NAME = 'MAIL_CONSTANTS:DEFAULT_EMAIL_SENDER_NAME';

    /**
     * Specification:
     *  - Defines default email reply address that will be used as reply address in all mails
     *
     * @api
     */
    public const DEFAULT_EMAIL_REPLY_EMAIL = 'MAIL_CONSTANTS:DEFAULT_EMAIL_REPLY_EMAIL';
}
