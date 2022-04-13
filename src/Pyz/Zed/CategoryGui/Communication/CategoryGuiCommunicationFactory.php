<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryGui\Communication;

use Pyz\Zed\CategoryGui\CategoryGuiDependencyProvider;
use Pyz\Zed\CategoryGui\Communication\Table\CategoryTable;
use Spryker\Zed\CategoryGui\Communication\CategoryGuiCommunicationFactory as SprykerCategoryGuiCommunicationFactory;
use Spryker\Zed\CategoryGui\Communication\Table\CategoryTable as SprykerCategoryTable;
use Spryker\Zed\CategoryGui\Dependency\Facade\CategoryGuiToTranslatorFacadeInterface;

class CategoryGuiCommunicationFactory extends SprykerCategoryGuiCommunicationFactory
{
    /**
     * @return \Spryker\Zed\CategoryGui\Communication\Table\CategoryTable
     */
    public function createCategoryTable(): SprykerCategoryTable
    {
        return new CategoryTable(
            $this->getLocaleFacade(),
            $this->getRepository(),
            $this->getTranslatorFacade()
        );
    }

    /**
     * @return \Spryker\Zed\CategoryGui\Dependency\Facade\CategoryGuiToTranslatorFacadeInterface
     */
    public function getTranslatorFacade(): CategoryGuiToTranslatorFacadeInterface
    {
        return $this->getProvidedDependency(CategoryGuiDependencyProvider::FACADE_TRANSLATOR);
    }
}
