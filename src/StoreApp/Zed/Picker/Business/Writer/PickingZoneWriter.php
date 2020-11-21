<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Business\Writer;

use StoreApp\Zed\Picker\PickerConfig;
use Symfony\Component\HttpFoundation\Session\Session;

class PickingZoneWriter implements PickingZoneWriterInterface
{
    /**
     * @var \StoreApp\Zed\Picker\PickerConfig
     */
    protected $pickingZoneConfig;

    /**
     * @var \Symfony\Component\HttpFoundation\Session\Session
     */
    protected $sessionService;

    /**
     * @param \StoreApp\Zed\Picker\PickerConfig $pickingZoneConfig
     * @param \Symfony\Component\HttpFoundation\Session\Session $sessionService
     */
    public function __construct(
        PickerConfig $pickingZoneConfig,
        Session $sessionService
    ) {
        $this->pickingZoneConfig = $pickingZoneConfig;
        $this->sessionService = $sessionService;
    }

    /**
     * @param int $idPickingZone
     *
     * @return void
     */
    public function saveInSession(int $idPickingZone): void
    {
        $pickingZoneSessionKey = $this->pickingZoneConfig->getPickingZoneSessionKey();
        $this->sessionService->set($pickingZoneSessionKey, $idPickingZone);
    }
}
