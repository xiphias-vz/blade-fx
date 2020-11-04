<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Auth\Communication\Plugin\EventDispatcher;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\EventDispatcher\EventDispatcherInterface;
use Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * @method \StoreApp\Zed\Auth\AuthConfig getConfig()
 */
class ControllerRestrictionEventDispatcherPlugin extends AbstractPlugin implements EventDispatcherPluginInterface
{
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
        $request = $event->getRequest();

        if (!$this->isRequestEligibleForRestriction($request)) {
            return $event;
        }

        if (!$this->isMerchantInRequest($request)) {
            $event->setResponse(new RedirectResponse($this->getConfig()->getAccessDeniedUri()));

            return $event;
        }

        return $event;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isRequestEligibleForRestriction(Request $request): bool
    {
        $module = $request->attributes->get('module');
        $restrictedControllerNamesPerModule = $this->getConfig()->getControllerRestrictionList();

        if (!array_key_exists($module, $restrictedControllerNamesPerModule)) {
            return false;
        }

        $restrictedControllerNames = $restrictedControllerNamesPerModule[$module];
        $controller = $request->attributes->get('controller');

        if (!in_array($controller, $restrictedControllerNames, true)) {
            return false;
        }

        return true;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return bool
     */
    protected function isMerchantInRequest(Request $request): bool
    {
        return $request->attributes->has(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }
}
