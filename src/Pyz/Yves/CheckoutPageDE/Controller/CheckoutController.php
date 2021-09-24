<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPageDE\Controller;

use Pyz\Yves\CheckoutPage\Controller\CheckoutController as IntCheckoutController;
use Pyz\Yves\GlobusRestApiClient\Provider\GlobusRestApiCustomerEvent;
use Symfony\Component\HttpFoundation\Request;

class CheckoutController extends IntCheckoutController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return mixed
     */
    public function successAction(Request $request)
    {
        $response = $this->createStepProcess()->process($request);

        if (!is_array($response)) {
            return $response;
        }

        $this->postEventData($response);

        return $this->view(
            $response,
            $this->getFactory()->getCustomerPageWidgetPlugins(),
            '@CheckoutPage/views/order-success/order-success.twig'
        );
    }

    /**
     * @param array $response
     *
     * @return void
     */
    protected function postEventData(array $response): void
    {
        $customer = $this->getFactory()->getCustomerClient()->getCustomer();
        if ($customer !== null) {
            if (!empty($customer->getMyGlobusCard())) {
                $idToken = $this->getFactory()->getSessionClient()->get("id_token");

                $eventClass = new GlobusRestApiCustomerEvent();
                $eventClass->createCustomerEvent(
                    $customer->getMyGlobusCard(),
                    $customer->getIdCustomer(),
                    $response["orderReference"],
                    $idToken == null ? "" : $idToken
                );
                /** @var \Generated\Shared\Transfer\ItemTransfer $item */
                foreach ($response["items"] as $item) {
                    $imageUIrl = "";
                    if (isset($item->getImages()[0])) {
                        $imageUIrl = $item->getImages()[0]->getExternalUrlLarge();
                    }
                    $url = substr($_SERVER["HTTP_REFERER"], 0, strpos($_SERVER["HTTP_REFERER"], substr($item->getUrl(), 0, 4), 1));
                    $url = $url . $item->getUrl();
                    $eventClass->addProduct($item->getSku(), $item->getName(), $url, $imageUIrl);
                }
                $eventClass->postEvent();
            }
        }
    }
}
