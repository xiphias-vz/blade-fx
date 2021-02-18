<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Controller;

use Generated\Shared\Transfer\MerchantTransfer;
use Generated\Shared\Transfer\PickingSalesOrderTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use StoreApp\Shared\Picker\PickerConfig;
use StoreApp\Zed\Merchant\Communication\Plugin\EventDispatcher\MerchantProviderEventDispatcherPlugin;
use StoreApp\Zed\Picker\Communication\Form\ContainerToShelfForm;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 */
class ContainerToShelfController extends AbstractController
{
    public const SUCCESS_MESSAGE_CONTAINER_ON_SHELF = 'storeapp.picking.message.success.container-to-shelf';
    public const ERROR_MESSAGE_CONTAINER_WITHOUT_ORDER = 'storeapp.picking.message.error.container-without-order';
    public const URL_CONTAINER_TO_SHELF = 'picker/container-to-shelf';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $containerToShelfForm = $this->getFactory()->createContainerToShelfForm();
        $containerToShelfForm->handleRequest($request);
        $listOfContainers = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getUsedContainers();

        if ($containerToShelfForm->isSubmitted()) {
            $dataInputForm = $containerToShelfForm->getData();
            $containerIdCodeInput = $dataInputForm['container_code'];
            $shelfIdCodeInput = $dataInputForm['shelf_code'];
            $orderIdCodeInput = "";
            $containerStatusShelfs = $this->getFactory()->getPickerBusinessFactory()->createContainerReader()->getContainerShelfs($containerIdCodeInput);
            $existingContainerInPicking = count($containerStatusShelfs);

            $existingShelfCode = $shelfIdCodeInput;
            $ItExists = false;
            foreach ($containerStatusShelfs as $property => $value) {
                if ($value["ShelfCode"] == $shelfIdCodeInput || $shelfIdCodeInput === null) {
                    $ItExists = true;
                    $orderIdCodeInput = $value["FkSalesOrder"];
                    $existingShelfCode = $value["ShelfCode"];
                }
            }

            if ($existingContainerInPicking == 0) {
                return [
                    'isErrorTrue' => true,
                    'containerToShelfForm' => $containerToShelfForm->createView(),
                    'merchant' => $this->getMerchantFromRequest($request),
                    'activities' => PickerConfig::ACTIVITIES,
                    'listOfContainers' => json_encode($listOfContainers),
                ];
            } elseif ($ItExists) {
                return [
                    'isUpdated' => $ItExists,
                    'containerId' => $containerIdCodeInput,
                    'shelfId' => $existingShelfCode,
                    'orderId' => $orderIdCodeInput,
                    'containerToShelfForm' => $containerToShelfForm->createView(),
                    'merchant' => $this->getMerchantFromRequest($request),
                    'activities' => PickerConfig::ACTIVITIES,
                    'listOfContainers' => json_encode($listOfContainers),
                ];
            } else {
                return $this->processContainerToShelfForm(
                    $containerToShelfForm,
                    $request,
                    $containerIdCodeInput,
                    $shelfIdCodeInput,
                    $listOfContainers
                );
            }
        }

        return [
            'containerToShelfForm' => $containerToShelfForm->createView(),
            'merchant' => $this->getMerchantFromRequest($request),
            'activities' => PickerConfig::ACTIVITIES,
            'listOfContainers' => json_encode($listOfContainers),
        ];
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

    /**
     * @param \Symfony\Component\Form\FormInterface $containerToShelfForm
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param string $containerIdCodeInput
     * @param string $shelfIdCodeInput
     * @param array $listOfContainers
     *
     * @return array
     */
    protected function processContainerToShelfForm(FormInterface $containerToShelfForm, Request $request, string $containerIdCodeInput, string $shelfIdCodeInput, array $listOfContainers): array //RedirectResponse
    {
        $formData = $containerToShelfForm->getData();
        $IdPickingSalesOrder = 0;

        foreach ($listOfContainers as $list => $value) {
            if ($value["ContainerCode"] == $formData[ContainerToShelfForm::FIELD_CONTAINER_CODE]) {
                $IdPickingSalesOrder = $value["IdPickingSalesOrder"];
            }
        }

        $pickingSalesOrderTransfer = (new PickingSalesOrderTransfer())
            ->setIdPickingSalesOrder($IdPickingSalesOrder)
            ->setContainerCode($formData[ContainerToShelfForm::FIELD_CONTAINER_CODE])
            ->setShelfCode($formData[ContainerToShelfForm::FIELD_SHELF_CODE]);

        $pickingSalesOrderTransfer = $this->getFactory()
            ->getPickingSalesOrderFacade()
            ->bindContainerToShelf($pickingSalesOrderTransfer);

        return [
            'isSuccess' => true,
            'containerId' => $containerIdCodeInput,
            'shelfId' => $shelfIdCodeInput,
            'containerToShelfForm' => $containerToShelfForm->createView(),
            'merchant' => $this->getMerchantFromRequest($request),
            'activities' => PickerConfig::ACTIVITIES,
            'listOfContainers' => json_encode($listOfContainers),
        ];
    }
}
