<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Reader;

use Generated\Shared\Transfer\PickingZoneTransfer;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use StoreApp\Zed\Picker\PickerConfig;
use Symfony\Component\HttpFoundation\Session\Session;

class PickingZoneReader implements PickingZoneReaderInterface
{
    /**
     * @var \StoreApp\Zed\Picker\PickerConfig
     */
    protected $pickingZoneConfig;

    /**
     * @var \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    protected $pickingZoneFacade;

    /**
     * @var \Symfony\Component\HttpFoundation\Session\Session
     */
    protected $sessionService;

    /**
     * @param \StoreApp\Zed\Picker\PickerConfig $pickingZoneConfig
     * @param \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface $pickingZoneFacade
     * @param \Symfony\Component\HttpFoundation\Session\Session $sessionService
     */
    public function __construct(
        PickerConfig $pickingZoneConfig,
        PickingZoneFacadeInterface $pickingZoneFacade,
        Session $sessionService
    ) {
        $this->pickingZoneConfig = $pickingZoneConfig;
        $this->pickingZoneFacade = $pickingZoneFacade;
        $this->sessionService = $sessionService;
    }

    /**
     * @return \Generated\Shared\Transfer\PickingZoneTransfer|null
     */
    public function findInSession(): ?PickingZoneTransfer
    {
        $pickingZoneSessionKey = $this->pickingZoneConfig->getPickingZoneSessionKey();
        $idPickingZone = $this->sessionService->get($pickingZoneSessionKey);

        if (!$idPickingZone) {
            return null;
        }

        return $this->pickingZoneFacade->findPickingZoneById($idPickingZone);
    }
}
