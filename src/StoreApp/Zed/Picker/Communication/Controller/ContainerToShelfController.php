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
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 */
class ContainerToShelfController extends AbstractController
{
    public const SUCCESS_MESSAGE_CONTAINER_ON_SHELF = 'storeapp.picking.message.success.container-to-shelf';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed[]|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $containerToShelfForm = $this->getFactory()->createContainerToShelfForm();

        $containerToShelfForm->handleRequest($request);

        if ($containerToShelfForm->isSubmitted() && $containerToShelfForm->isValid()) {
            return $this->processContainerToShelfForm(
                $containerToShelfForm
            );
        }

        return [
            'containerToShelfForm' => $containerToShelfForm->createView(),
            'merchant' => $this->getMerchantFromRequest($request),
            'activities' => PickerConfig::ACTIVITIES,
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
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function processContainerToShelfForm(FormInterface $containerToShelfForm): RedirectResponse
    {
        $formData = $containerToShelfForm->getData();

        $pickingSalesOrderTransfer = (new PickingSalesOrderTransfer())
            ->setContainerCode($formData[ContainerToShelfForm::FIELD_CONTAINER_CODE])
            ->setShelfCode($formData[ContainerToShelfForm::FIELD_SHELF_CODE]);

        $this->getFactory()
            ->getPickingSalesOrderFacade()
            ->bindContainerToShelf($pickingSalesOrderTransfer);

        $this->addSuccessMessage(static::SUCCESS_MESSAGE_CONTAINER_ON_SHELF);

        return $this->redirectResponse(PickerConfig::URL_PICKING_LIST);
    }
}
