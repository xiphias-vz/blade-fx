<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\EventDispatcher\EventDispatcherInterface;
use Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * @method \StoreApp\Zed\Merchant\Business\MerchantFacade getFacade()
 * @method \StoreApp\Zed\Merchant\Communication\MerchantCommunicationFactory getFactory()
 */
class MerchantProviderEventDispatcherPlugin extends AbstractPlugin implements EventDispatcherPluginInterface
{
    public const ATTRIBUTE_MERCHANT = 'merchant';
    public const ATTRIBUTE_USER = 'user';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Spryker\Shared\EventDispatcher\EventDispatcherInterface $eventDispatcher
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Shared\EventDispatcher\EventDispatcherInterface
     */
    public function extend(EventDispatcherInterface $eventDispatcher, ContainerInterface $container): EventDispatcherInterface
    {
        $eventDispatcher->addListener(KernelEvents::REQUEST, function (GetResponseEvent $event): GetResponseEvent {
            return $this->onKernelRequest($event);
        });

        return $eventDispatcher;
    }

    /**
     * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
     *
     * @return \Symfony\Component\HttpKernel\Event\GetResponseEvent
     */
    protected function onKernelRequest(GetResponseEvent $event): GetResponseEvent
    {
        $userFacade = $this->getFactory()->getUserFacade();

        if (!$userFacade->hasCurrentUser()) {
            return $event;
        }

        $userTransfer = $userFacade->getCurrentUser();
        $event->getRequest()->attributes->set(static::ATTRIBUTE_USER, $userTransfer);

        $merchantTransfer = $this->getFacade()->findMerchantByUser(
            $userTransfer
        );

        if (!$merchantTransfer) {
            return $event;
        }

        $event->getRequest()->attributes->set(static::ATTRIBUTE_MERCHANT, $merchantTransfer);

        return $event;
    }
}
