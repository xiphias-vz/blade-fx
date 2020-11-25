<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model\Mailer;

use Generated\Shared\Transfer\MailTransfer;
use Pyz\Service\DataDog\DataDogServiceInterface;
use Spryker\Shared\Log\LoggerTrait;
use Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionGetInterface;
use Spryker\Zed\Mail\Business\Model\Mailer\MailHandler as SprykerMailHandler;
use Spryker\Zed\Mail\Business\Model\Mailer\MailHandlerInterface;
use Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionGetInterface;
use Swift_SwiftException;

class MailHandler extends SprykerMailHandler implements MailHandlerInterface
{
    use LoggerTrait;

    /**
     * @var \Pyz\Service\DataDog\DataDogServiceInterface
     */
    protected $dataDogService;

    /**
     * @param \Spryker\Zed\Mail\Business\Model\Mail\Builder\MailBuilderInterface $mailBuilder
     * @param \Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionGetInterface $mailCollection
     * @param \Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionGetInterface $mailProviderCollection
     * @param \Pyz\Service\DataDog\DataDogServiceInterface $dataDogService
     */
    public function __construct(
        MailBuilderInterface $mailBuilder,
        MailTypeCollectionGetInterface $mailCollection,
        MailProviderCollectionGetInterface $mailProviderCollection,
        DataDogServiceInterface $dataDogService
    ) {
        parent::__construct($mailBuilder, $mailCollection, $mailProviderCollection);
        $this->dataDogService = $dataDogService;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    protected function sendMail(MailTransfer $mailTransfer)
    {
        $mailProviders = $this->getMailProviderByMailType($mailTransfer);

        try {
            foreach ($mailProviders as $provider) {
                $provider->sendMail($mailTransfer);
            }
        } catch (Swift_SwiftException $swiftException) {
            $this->getLogger()->error('E-mail send failed', [
                'code' => $swiftException->getCode(),
                'message' => $swiftException->getMessage(),
                'trace' => $swiftException->getTraceAsString(),
                'mail' => $mailTransfer->getType(),
            ]);
        }
    }
}
