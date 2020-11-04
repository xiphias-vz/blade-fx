<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business;

use Pyz\Zed\Navigation\Business\Category\CategoryModel;
use Pyz\Zed\Navigation\Business\Helper\NavigationHelper;
use Pyz\Zed\Navigation\Business\Navigation\NavigationReader;
use Pyz\Zed\Navigation\Business\Node\NavigationNodeReader;
use Pyz\Zed\Navigation\Business\Tree\NavigationTreeReader;
use Spryker\Zed\Navigation\Business\NavigationBusinessFactory as SprykerNavigationBusinessFactory;
use Spryker\Zed\Navigation\Business\Tree\NavigationTreeReaderInterface;

class NavigationBusinessFactory extends SprykerNavigationBusinessFactory
{
    /**
     * @return \Spryker\Zed\Navigation\Business\Tree\NavigationTreeReaderInterface
     */
    public function createNavigationTreeReader(): NavigationTreeReaderInterface
    {
        return new NavigationTreeReader($this->getQueryContainer());
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\Helper\NavigationHelper
     */
    public function createNavigationHelper(): NavigationHelper
    {
        return new NavigationHelper($this->createNavigationReader());
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\Navigation\NavigationReader
     */
    public function createNavigationReader(): NavigationReader
    {
        return new NavigationReader($this->getQueryContainer());
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\Node\NavigationNodeReader
     */
    public function createNavigationNodeReader(): NavigationNodeReader
    {
        return new NavigationNodeReader($this->getQueryContainer());
    }

    /**
     * @return \Pyz\Zed\Navigation\Business\Category\CategoryModel
     */
    public function createCategoryModel(): CategoryModel
    {
        return new CategoryModel(
            $this->createNavigationHelper(),
            $this->createNavigationNodeReader(),
            $this->createNavigationNodeUpdater()
        );
    }
}
