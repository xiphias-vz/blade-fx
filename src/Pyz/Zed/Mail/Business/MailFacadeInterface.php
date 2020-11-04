<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business;

use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Mail\Business\MailFacadeInterface as SprykerMailFacadeInterface;

interface MailFacadeInterface extends SprykerMailFacadeInterface
{
    /**
     * Specification:
     * - Sends the mail with CMS block content
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    public function sendMailCmsBlock(MailTransfer $mailTransfer): void;
}
