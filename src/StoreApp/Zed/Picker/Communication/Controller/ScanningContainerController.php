<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\MerchantTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class ScanningContainerController extends AbstractController
{
    public const CONTAINERS_ID = 'idContainers';
    public const NEXT_ORDER_POSITION = 'nextOrderPosition';

    protected const PICKING_CONTAINER_TRANSFER = [
        [
            'idOrderReference' => '0001',
            'idContainer' => '1',
            'containerID' => '1',
            'usedContainersWithShelf' => [
                [
                    'idContainer' => '2345',
                    'shelfID' => 'shelf01',
                ],
                [
                    'idContainer' => '2345',
                    'shelfID' => 'shelf01',
                ],
                [
                    'idContainer' => '2345',
                    'shelfID' => 'shelf01',
                ],
            ],
            'numberOfColor' => 1,
            'shelfID' => '2',
            'color' => '#FFE013',

        ],
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $factory = $this->getFactory();
        $listOfContainers = $factory
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        $transfer = $this->getFacade()->getPickingHeaderTransfer();
        $transfer->setParents(true);
        $nextOrderPosition = $request->get(static::NEXT_ORDER_POSITION) == null ?
            0 : (int)$request->get(static::NEXT_ORDER_POSITION);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $submittedContainers = json_decode($request->get(static::CONTAINERS_ID));
            if (count($submittedContainers)) {
                $orderForScanningContainer = $transfer->getOrder($nextOrderPosition);
                foreach ($submittedContainers as $container) {
                    foreach ($container->containers as $containerId) {
                        $this->getFacade()->setContainerToOrder($orderForScanningContainer, $containerId, '');
                    }
                }
            }

            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);

            if ($orderForScanningContainer == null) {
                  return $this->redirectResponse($factory->getConfig()->getOverviewUri());
            }
        } else {
            $orderForScanningContainer = $transfer->getNextOrder($nextOrderPosition);
        }

        return $this->viewResponse([
            'orderForScanningContainer' => $orderForScanningContainer,
            'listOfContainers' => json_encode($listOfContainers),
            'nextOrderPosition' => $nextOrderPosition,
            'merchant' => $this->getMerchantFromRequest($request),
        ]);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\MerchantTransfer
     */
    protected function getMerchantFromRequest(Request $request): MerchantTransfer
    {
        return $request->attributes->get(MerchantProviderEventDispatcherPlugin::ATTRIBUTE_MERCHANT);
    }
}
