<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Widget;

use StoreApp\Zed\Kernel\Communication\Widget\AbstractWidget;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class SelectPickingZoneWidget extends AbstractWidget
{
    public function __construct()
    {
        $this->addParameter(
            'currentPickingZone',
            $this->getFactory()->getPickerFacade()
                ->findPickingZoneInSession()
        );
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        return 'SelectPickingZoneWidget';
    }

    /**
     * @return string
     */
    public static function getTemplate(): string
    {
        return '@Picker/picking-zone-selector/picking-zone-selector.twig';
    }
}
