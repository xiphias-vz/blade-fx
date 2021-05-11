<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\StoreSwitcherWidget\Widget;

use Pyz\Shared\Store\StoreConstants;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Config\Config;
use Spryker\Yves\Kernel\Widget\AbstractWidget;

/**
 * @method \Pyz\Yves\StoreSwitcherWidget\StoreSwitcherWidgetFactory getFactory()
 */
class StoreSwitcherWidget extends AbstractWidget
{
    public const FILLIAL_NUMBER = 'fillialNumber';
    public const PASSWORD_PROTECTED = 'isPasswordProtected';

    public function __construct()
    {
        $visibleMerchants = $this->getFactory()->getStoreSwitcherClient()->getVisibleStores();

        $storeData = $visibleMerchants->getVisibleStoresArray();
        $store = $this->getFactory()->getStore();
        $storeNames = $this->getConfig()->getStoreNames();
        $merchantsFromConfig = Config::get(StoreConstants::SAP_STORE_ID_TO_STORE_MAP);

        $storeName = $store->getStoreName();
        $visibleStoreNames = [];
        $visibleStorePass = [];
        foreach ($storeData as $visibleStore) {
            if (isset($merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]])) {
                if (isset($storeNames[$merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]]])) {
                    $visibleStoreNames[$merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]]] = $storeNames[$merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]]];
                    $visibleStorePass[$merchantsFromConfig[$visibleStore[static::FILLIAL_NUMBER]]] = $visibleStore[static::PASSWORD_PROTECTED];
                }
            }
        }

        if (!isset($visibleStoreNames[$storeName]) || !isset($_COOKIE['current_store'])) {
            $storeName = '';
            setcookie("current_store", "", time() - 3600);
        }

        $this->addParameter('stores', $visibleStoreNames)
            ->addParameter('currentStore', $storeName)
            ->addParameter('isPasswordProtected', $visibleStorePass)
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
