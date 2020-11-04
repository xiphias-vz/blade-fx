<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Communication;

use Pyz\Zed\ProductUpdate\Communication\Form\ProductUpdateForm;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface getFacade()
 * @method \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface getRepository()
 */
class ProductUpdateCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createProductUpdateForm(): FormInterface
    {
        return $this->getFormFactory()
            ->create(ProductUpdateForm::class);
    }
}
