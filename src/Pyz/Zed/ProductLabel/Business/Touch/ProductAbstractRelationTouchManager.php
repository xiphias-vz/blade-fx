<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductLabel\Business\Touch;

use Pyz\Zed\Navigation\Business\NavigationFacadeInterface;
use Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface;
use Spryker\Zed\ProductLabel\Business\Touch\ProductAbstractRelationTouchManager as SprykerProductAbstractRelationTouchManager;
use Spryker\Zed\ProductLabel\Dependency\Facade\ProductLabelToProductInterface;
use Spryker\Zed\ProductLabel\Dependency\Facade\ProductLabelToTouchInterface;

class ProductAbstractRelationTouchManager extends SprykerProductAbstractRelationTouchManager
{
    /**
     * @var \Pyz\Zed\Navigation\Business\NavigationFacadeInterface
     */
    protected $navigationFacade;

    /**
     * @var \Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface
     */
    protected $navigationStorageFacade;

    /**
     * @param \Spryker\Zed\ProductLabel\Dependency\Facade\ProductLabelToTouchInterface $touchFacade
     * @param \Spryker\Zed\ProductLabel\Dependency\Facade\ProductLabelToProductInterface $productFacade
     * @param \Pyz\Zed\Navigation\Business\NavigationFacadeInterface $navigationFacade
     * @param \Spryker\Zed\NavigationStorage\Business\NavigationStorageFacadeInterface $navigationStorageFacade
     */
    public function __construct(
        ProductLabelToTouchInterface $touchFacade,
        ProductLabelToProductInterface $productFacade,
        NavigationFacadeInterface $navigationFacade,
        NavigationStorageFacadeInterface $navigationStorageFacade
    ) {
        parent::__construct($touchFacade, $productFacade);

        $this->navigationFacade = $navigationFacade;
        $this->navigationStorageFacade = $navigationStorageFacade;
    }

    /**
     * @param int $idProductAbstract
     *
     * @return void
     */
    public function touchActiveByIdProductAbstract($idProductAbstract)
    {
        parent::touchActiveByIdProductAbstract($idProductAbstract);

        $this->navigationStorageFacade->publish($this->navigationFacade->getMainNavigationIds());
    }

    /**
     * @param int $idProductAbstract
     *
     * @return void
     */
    public function touchDeletedByIdProductAbstract($idProductAbstract)
    {
        parent::touchDeletedByIdProductAbstract($idProductAbstract);

        $this->navigationStorageFacade->publish($this->navigationFacade->getMainNavigationIds());
    }
}
