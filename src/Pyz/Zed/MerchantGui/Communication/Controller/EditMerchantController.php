<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Controller;

use Orm\Zed\AssortmentZone\Persistence\PyzAssortmentPickZoneRelationQuery;
use phpDocumentor\GraphViz\Exception;
use Pyz\Shared\Acl\AclConstants;
use Pyz\Shared\DataSettings\DataSettings;
use Spryker\Zed\MerchantGui\Communication\Controller\EditMerchantController as SprykerEditMerchantController;
use Spryker\Zed\MerchantGui\MerchantGuiConfig;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\MerchantGui\Communication\MerchantGuiCommunicationFactory getFactory()
 */
class EditMerchantController extends SprykerEditMerchantController
{
    public const URL_PARAM_REDIRECT_URL = 'redirect-url';
    public const REQUEST_ID_MERCHANT = 'id-merchant';
    public const URL_EDIT_MERCHANT_ASSORTMENT_ZONE = '/merchant-gui/edit-merchant?id-merchant=';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $settings = DataSettings::getJsonSettings("pickingAppVersion");

        $idMerchant = $this->castId($request->get(static::REQUEST_ID_MERCHANT));

        $dataProvider = $this->getFactory()->createMerchantFormDataProvider();
        $merchantTransfer = $dataProvider->getData($idMerchant);

        if ($merchantTransfer == null) {
            $this->addErrorMessage("Merchant with id %s doesn't exists.", ['%s' => $idMerchant]);

            return $this->redirectResponse(MerchantGuiConfig::URL_MERCHANT_LIST);
        }

        $merchantReference = $merchantTransfer->getMerchantReference();

        $merchantForm = $this->getFactory()
            ->getMerchantUpdateForm(
                $merchantTransfer,
                $dataProvider->getOptions($merchantTransfer->getIdMerchant())
            )
            ->handleRequest($request);

        $applicableMerchantStatuses = $this->getFactory()->getMerchantFacade()->getApplicableMerchantStatuses($merchantTransfer->getStatus());

        if ($merchantForm->isSubmitted() && $merchantForm->isValid()) {
            if ($_REQUEST['isPickzoneTab'] == '0') {
                $merchantReturn = $this->updateMerchant($request, $merchantForm);
                $this->getFactory()->getMerchantStorageFacade()->synchronizeMerchantToStorage();

                return $merchantReturn;
            } else {
                $submitArray = [];
                foreach ($_REQUEST as $key => $val) {
                    if (str_starts_with($key, 'cmbPickZone_')) {
                        $midArray = [];
                        $idMapAssortmentPickZone = substr($key, strpos($key, "_") + 1);
                        $midArray['id_assortment_pick_zone_relation'] = $idMapAssortmentPickZone;
                        $midArray['fk_picking_zone'] = $val;

                        $submitArray[] = $midArray;
                    }
                }

                $resultUrl = $this->updateAsortmentZones($request, $submitArray, $idMerchant);

                return $this->redirectResponse($resultUrl->getTargetUrl());
            }
        }

        $pickingZones = $this->getFactory()
            ->getPickingZoneFacade()
            ->getPickingZonesArray();

        $mappedAssortmentPickingZones = $this->getFactory()
            ->getPickingZoneFacade()
            ->getMappedAsortmentPickingZonesArray($idMerchant);

        $isCurrentUserAdmin = $this->isCurrentUserAdmin();
        $pickingAppVersionDisplay = $settings["NewVersion"]["Visible"] ? "block" : "none";

        return $this->viewResponse([
            'form' => $merchantForm->createView(),
            'idMerchant' => $idMerchant,
            'applicableMerchantStatuses' => $applicableMerchantStatuses,
            'merchantFormTabs' => $this->getFactory()->createMerchantFormTabs()->createView(),
            'isCurrentUserAdmin' => $isCurrentUserAdmin,
            'pickingZones' => $pickingZones,
            'mappedAssortmentPickingZones' => $mappedAssortmentPickingZones,
            'merchantReference' => $merchantReference,
            'pickingAppVersion' => "(" . $settings["NewVersion"]["Release"] . ": " . implode(", ", $settings["NewVersion"]["Tickets"]) . ")",
            'pickingAppVersionDisplay' => $pickingAppVersionDisplay,
        ]);
    }

    /**
     * @return bool
     */
    protected function isCurrentUserAdmin(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::ROOT_GROUP) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param array $submitArray
     * @param int $idMerchant
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function updateAsortmentZones(Request $request, array $submitArray, int $idMerchant)
    {
        $assortmentZoneUrl = static::URL_EDIT_MERCHANT_ASSORTMENT_ZONE . $idMerchant;
        $redirectUrl = $request->get(static::URL_PARAM_REDIRECT_URL, $assortmentZoneUrl);

        try {
            foreach ($submitArray as $val) {
                $getQueryAssortmentZone = new PyzAssortmentPickZoneRelationQuery();
                $mapPickZoneToAssortmentZone = $getQueryAssortmentZone->findOneByIdAssortmentPickZoneRelation($val['id_assortment_pick_zone_relation']);
                $mapPickZoneToAssortmentZone->setFkPickingZone($val['fk_picking_zone']);
                $mapPickZoneToAssortmentZone->save();
            }
        } catch (Exception $exception) {
            $error = $exception->getMessage();
        }

        return $this->redirectResponse($redirectUrl);
    }
}
