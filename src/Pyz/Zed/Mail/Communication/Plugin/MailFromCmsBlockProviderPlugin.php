<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Communication\Plugin;

use Generated\Shared\Transfer\MailTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\Mail\Dependency\Plugin\MailProviderPluginInterface;

/**
 * @method \Pyz\Zed\Mail\Business\MailFacadeInterface getFacade()
 * @method \Spryker\Zed\Mail\Communication\MailCommunicationFactory getFactory()
 * @method \Pyz\Zed\Mail\MailConfig getConfig()
 */
class MailFromCmsBlockProviderPlugin extends AbstractPlugin implements MailProviderPluginInterface
{
    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    public function sendMail(MailTransfer $mailTransfer): void
    {
        $this->getFacade()->sendMailCmsBlock($mailTransfer);
    }
}
