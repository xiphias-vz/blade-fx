<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 */
class MultiPickingScanningContainerController extends AbstractController
{
    public const PICKING_HEADER_TRANSFER = [
        [
            'idTimeSlot' => 1,
            'timeSlot' => 'Mon 25.11.21 10:00 - 12:00',
            'articlesCount' => 0,
            'articlesQuantity' => 0,
            'pickingOrderTransfer' => [
                [
                    'idOrder' => 1,
                    'orderReference' => '6434df85fsa',
                    'customerName' => 'William',
                    'articlesCount' => 3,
                    'articlesQuantity' => 6,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => false,
                    'isPaused' => true,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#4287f5',
                            'back_color' => '#f5ef42',
                            'circle_color' => '#83cc29',
                        ],
                    'listOfContainers' => [
                        [
                            'ContainerCode' => 'TestCon0',
                            'ShelfCode' => 'R55678',
                        ],
                        [
                            'ContainerCode' => 'TestCon1',
                            'ShelfCode' => '',
                        ],
                        [
                            'ContainerCode' => 'TestCon2',
                            'ShelfCode' => '',
                        ],
                        [
                            'ContainerCode' => 'TestCon3',
                            'ShelfCode' => '',
                        ],
                    ],
                ],
                [
                    'idOrder' => 2,
                    'orderReference' => '643gf485fsa',
                    'customerName' => 'Sony',
                    'articlesCount' => 2,
                    'articlesQuantity' => 5,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => true,
                    'isPaused' => true,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'AA334466',
                            'ShelfCode' => '',
                        ],
                ],
                [
                    'idOrder' => 3,
                    'orderReference' => '643485fdfssa',
                    'customerName' => 'Lorem',
                    'articlesCount' => 6,
                    'articlesQuantity' => 9,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => true,
                    'isPaused' => false,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'AA334466',
                            'ShelfCode' => '',
                        ],
                ],
                [
                    'idOrder' => 4,
                    'orderReference' => '643485fsa',
                    'customerName' => 'Jimmy',
                    'articlesCount' => 3,
                    'articlesQuantity' => 6,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => false,
                    'isPaused' => false,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#7ca5cf',
                            'back_color' => '#007d80',
                            'circle_color' => '#b3472e',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'AA334466',
                            'ShelfCode' => '',
                        ],
                ],
            ],
        ],
        [
            'idTimeSlot' => 2,
            'timeSlot' => 'Mon 25.11.21 12:00 - 14:00',
            'articlesCount' => 0,
            'articlesQuantity' => 0,
            'pickingOrderTransfer' => [
                [
                    'idOrder' => 5,
                    'orderReference' => '643gfdgf485fsa',
                    'customerName' => 'Simon',
                    'articlesCount' => 4,
                    'articlesQuantity' => 7,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => true,
                    'isPaused' => false,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#4287f5',
                            'back_color' => '#f5ef42',
                            'circle_color' => '#83cc29',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'VD334455',
                            'ShelfCode' => 'A01-345',
                        ],
                    [
                        'ContainerCode' => 'VD334466',
                        'ShelfCode' => 'A01-669',
                    ],
                    [
                        'ContainerCode' => 'AA334466',
                        'ShelfCode' => '',
                    ],
                ],
                [
                    'idOrder' => 6,
                    'orderReference' => '643gfdgf485fsa',
                    'customerName' => 'Lona',
                    'articlesCount' => 3,
                    'articlesQuantity' => 5,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => false,
                    'isPaused' => true,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#4287f5',
                            'back_color' => '#f5ef42',
                            'circle_color' => '#83cc29',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'VD334455',
                            'ShelfCode' => 'A01-345',
                        ],
                    [
                        'ContainerCode' => 'VD334466',
                        'ShelfCode' => 'A01-669',
                    ],
                    [
                        'ContainerCode' => 'AA334466',
                        'ShelfCode' => '',
                    ],
                ],
                [
                    'idOrder' => 7,
                    'orderReference' => '643gfdgf485fsa',
                    'customerName' => 'Loni',
                    'articlesCount' => 3,
                    'articlesQuantity' => 9,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => true,
                    'isPaused' => true,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#4287f5',
                            'back_color' => '#f5ef42',
                            'circle_color' => '#83cc29',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'VD334455',
                            'ShelfCode' => 'A01-345',
                        ],
                    [
                        'ContainerCode' => 'VD334466',
                        'ShelfCode' => 'A01-669',
                    ],
                    [
                        'ContainerCode' => 'AA334466',
                        'ShelfCode' => '',
                    ],
                ],
                [
                    'idOrder' => 8,
                    'orderReference' => '643gffgddgf485fsa',
                    'customerName' => 'Lina',
                    'articlesCount' => 7,
                    'articlesQuantity' => 9,
                    'requestedDeliveryData' => '20.02.2021',
                    'isChecked' => true,
                    'isPaused' => false,
                    'state' => 'ready for picking',
                    'color' =>
                        [
                            'id' => 1,
                            'fore_color' => '#4287f5',
                            'back_color' => '#f5ef42',
                            'circle_color' => '#83cc29',
                        ],
                    'listOfContainers' =>
                        [
                            'ContainerCode' => 'VD334455',
                            'ShelfCode' => 'A01-345',
                        ],
                    [
                        'ContainerCode' => 'VD334466',
                        'ShelfCode' => 'A01-669',
                    ],
                    [
                        'ContainerCode' => 'AA334466',
                        'ShelfCode' => '',
                    ],
                ],

            ],
        ],
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        /*  $transfer = new PickingHeaderTransferMockData(10, 4);
           $data = $transfer->getData();
           //$data = $transfer->getDataWithContainers();
           $aisle = $data->getOrderItemsByAisle();
           $slots = $data->getOrdersByTimeSlot();
           $fs = $data->toJson();
           $ds = PickingHeaderTransfer::fromJson($fs);*/

        $listOfExistingContainers = $this->getFactory()
            ->getPickerBusinessFactory()
            ->createContainerReader()
            ->getUsedContainers();

        $orders = self::PICKING_HEADER_TRANSFER;
        $firstOrderListOfContainers = $orders[0]["pickingOrderTransfer"][0]["listOfContainers"];
        $orderColor = $orders[0]["pickingOrderTransfer"][0]["color"];
        $listOfContainers = [];
        foreach ($firstOrderListOfContainers as $key => $value) {
            if ($value["ShelfCode"] == "") {
                array_push($listOfContainers, $firstOrderListOfContainers[$key]);
            }
        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $submittedData = $request->request->all();
            $containersShelf = json_decode($request->get('containersShelf'));
        }

        return [
            'pickingHeaderTransfer' => self::PICKING_HEADER_TRANSFER,
            'listOfContainers' => $listOfContainers,
            'listOfExistingContainers' => json_encode($listOfExistingContainers),
            'orderColor' => $orderColor,
            'lastOrder' => false,
        ];
    }
}
