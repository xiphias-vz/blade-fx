<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Widget;

use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Config\Config;
use Spryker\Yves\Kernel\Widget\AbstractWidget;

/**
 * @method \Pyz\Yves\StoreSwitcherWidget\StoreSwitcherWidgetFactory getFactory()
 */
class StoreSwitcherWidget extends AbstractWidget
{
    public function __construct()
    {
        $store = $this->getFactory()->getStore();
        $storeNames = $this->getConfig()->getStoreNames();
        $storeName = $store->getStoreName();

        $this->addParameter('stores', $storeNames)
            ->addParameter('currentStore', $storeName)
            ->addParameter('pattern', $this->getYvesHost() . '/store/switch?store=%s&referer-url=%s');
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        return 'StoreSwitcherWidget';
    }

    /**
     * @return string
     */
    public static function getTemplate(): string
    {
        return '@StoreSwitcherWidget/views/switcher/switcher.twig';
    }

    /**
     * @return string
     */
    public function getYvesHost(): string
    {
        $yvesUrl = Config::get(ApplicationConstants::BASE_URL_YVES);

        if (Config::get(ApplicationConstants::YVES_SSL_ENABLED)) {
            $yvesUrl = Config::get(ApplicationConstants::BASE_URL_SSL_YVES);
        }

        return $yvesUrl;
    }
}
