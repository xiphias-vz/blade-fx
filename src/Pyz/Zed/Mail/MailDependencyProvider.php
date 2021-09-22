<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface;
use Pyz\Zed\Customer\Communication\Plugin\Mail\CustomerInvoiceMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\CustomerRestoredPasswordConfirmationMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\CustomerRestorePasswordMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\OrderCancelledMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\OrderRefundedMailTypePlugin;
use Pyz\Zed\CustomerConfirmationPage\Communication\Plugin\Mail\RegistrationMailTypePlugin;
use Pyz\Zed\Mail\Business\Model\Provider\MailProviderCollection;
use Pyz\Zed\Mail\Communication\Plugin\MailFromCmsBlockProviderPlugin;
use Pyz\Zed\Mail\Dependency\Mailer\MailToMailerBridge;
use Pyz\Zed\Oms\Communication\Plugin\Mail\OrderConfirmationMailTypePlugin;
use Spryker\Zed\AuthMailConnector\Communication\Plugin\Mail\RestorePasswordMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationSubscriptionMailTypePlugin;
use Spryker\Zed\AvailabilityNotification\Communication\Plugin\Mail\AvailabilityNotificationUnsubscribedMailTypePlugin;
use Spryker\Zed\Customer\Communication\Plugin\Mail\CustomerRegistrationMailTypePlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
use Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionAddInterface;
use Spryker\Zed\Mail\Communication\Plugin\MailProviderPlugin;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\Newsletter\Communication\Plugin\Mail\NewsletterSubscribedMailTypePlugin;
use Spryker\Zed\Newsletter\Communication\Plugin\Mail\NewsletterUnsubscribedMailTypePlugin;
use Spryker\Zed\Oms\Communication\Plugin\Mail\OrderShippedMailTypePlugin;
use Swift_Mailer;
use Swift_Message;
use Swift_SmtpTransport;

/**
 * @method \Pyz\Zed\Mail\MailConfig getConfig()
 */
class MailDependencyProvider extends SprykerMailDependencyProvider
{
    public const FACADE_CMS_BLOCK_STORAGE = 'FACADE_CMS_BLOCK_STORAGE';

    public const SERVICE_DATA_DOG = 'SERVICE_DATA_DOG';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addCmsBlockStorageFacade($container);
        $container = $this->addDataDogService($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection
                ->add(new CustomerRegistrationMailTypePlugin())
                ->add(new CustomerRestorePasswordMailTypePlugin())
                ->add(new CustomerRestoredPasswordConfirmationMailTypePlugin())
                ->add(new NewsletterSubscribedMailTypePlugin())
                ->add(new NewsletterUnsubscribedMailTypePlugin())
                ->add(new OrderConfirmationMailTypePlugin())
                ->add(new OrderShippedMailTypePlugin())
                ->add(new AvailabilityNotificationUnsubscribedMailTypePlugin())
                ->add(new AvailabilityNotificationSubscriptionMailTypePlugin())
                ->add(new AvailabilityNotificationMailTypePlugin())
                ->add(new RestorePasswordMailTypePlugin())
                ->add(new CustomerInvoiceMailTypePlugin())
                ->add(new RegistrationMailTypePlugin())
                ->add(new OrderRefundedMailTypePlugin())
                ->add(new OrderCancelledMailTypePlugin());

            return $mailCollection;
        });

        $container->extend(self::MAIL_PROVIDER_COLLECTION, function (MailProviderCollectionAddInterface $mailProviderCollection) {
            $mailProviderCollection->addProvider(
                new MailFromCmsBlockProviderPlugin(),
                [
                    CustomerInvoiceMailTypePlugin::MAIL_TYPE,
                    OrderConfirmationMailTypePlugin::MAIL_TYPE,
                    OrderShippedMailTypePlugin::MAIL_TYPE,
                    RegistrationMailTypePlugin::MAIL_TYPE,
                    RestorePasswordMailTypePlugin::MAIL_TYPE,
                    CustomerRestorePasswordMailTypePlugin::MAIL_TYPE,
                    CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE,
                    OrderCancelledMailTypePlugin::MAIL_TYPE,
                    OrderRefundedMailTypePlugin::MAIL_TYPE,
                ]
            );
            $mailProviderCollection->addProvider(new MailProviderPlugin(), MailConfig::MAIL_TYPE_ALL);

            return $mailProviderCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addCmsBlockStorageFacade(Container $container): Container
    {
        $container->set(static::FACADE_CMS_BLOCK_STORAGE, function (Container $container): CmsBlockStorageFacadeInterface {
            return $container->getLocator()->cmsBlockStorage()->facade();
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addMailer(Container $container): Container
    {
        $container[static::MAILER] = function () {
            $message = new Swift_Message();
            $mailer = new Swift_Mailer($this->createSwiftSmtpTransport());
            $mailerBridge = new MailToMailerBridge($message, $mailer);

            return $mailerBridge;
        };

        return $container;
    }

    /**
     * @return \Swift_SmtpTransport
     */
    private function createSwiftSmtpTransport(): Swift_SmtpTransport
    {
        $transport = new Swift_SmtpTransport(
            $this->getConfig()->getSmtpHost(),
            $this->getConfig()->getSmtpPort()
        );

        if ($this->getConfig()->getSmtpUsername() !== '') {
            $transport->setUsername(
                $this->getConfig()->getSmtpUsername()
            );
        }

        if ($this->getConfig()->getSmtpPassword() !== '') {
            $transport->setPassword(
                $this->getConfig()->getSmtpPassword()
            );
        }

        if ($this->getConfig()->getSmtpAuthMode() !== '') {
            $transport->setAuthMode(
                $this->getConfig()->getSmtpAuthMode()
            );
        }

        if ($this->getConfig()->getSmtpEncryption() !== '') {
            $transport->setEncryption(
                $this->getConfig()->getSmtpEncryption()
            );
        }

        return $transport;
    }

    /**
     * @return \Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionAddInterface
     */
    protected function getMailProviderCollection(): MailProviderCollectionAddInterface
    {
        return new MailProviderCollection();
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addDataDogService(Container $container): Container
    {
        $container->set(self::SERVICE_DATA_DOG, function (Container $container): DataDogServiceInterface {
            return $container->getLocator()->dataDog()->service();
        });

        return $container;
    }
}
