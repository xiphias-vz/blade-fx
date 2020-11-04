<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductUpdate\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Pyz\Zed\ProductUpdate\Business\ProductUpdateFacadeInterface getFacade()
 * @method \Pyz\Zed\ProductUpdate\Persistence\ProductUpdateRepositoryInterface getRepository()
 * @method \Pyz\Zed\ProductUpdate\Communication\ProductUpdateCommunicationFactory getFactory()
 */
class ProductUpdateForm extends AbstractType
{
    public const FIELD_CSV_CONTENT_AREA = 'csv-content-area';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addCsvContentAreaField($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addCsvContentAreaField(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_CSV_CONTENT_AREA, TextareaType::class, [
            'label' => 'Import data',
            'required' => true,
        ]);

        return $this;
    }
}
