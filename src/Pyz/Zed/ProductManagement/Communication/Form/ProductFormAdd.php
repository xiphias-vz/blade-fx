<?php

namespace Pyz\Zed\ProductManagement\Communication\Form;

use Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd as SprykerProductFormAdd;
use Symfony\Component\Form\FormBuilderInterface;

class ProductFormAdd extends SprykerProductFormAdd
{
    public const FORM_PYZ_STORE_RELATION = 'pyz_store_relation';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this
            ->addSkuField($builder)
            ->addNewFromDateField($builder)
            ->addNewToDateField($builder)
            ->addProductAbstractIdHiddenField($builder)
            ->addGeneralLocalizedForms($builder)
            ->addAttributeSuperForm($builder, $options[self::OPTION_ATTRIBUTE_SUPER])
            ->addPriceDimensionForm($builder)
            ->addPriceForm($builder, $options)
            ->addTaxRateField($builder, $options)
            ->addSeoLocalizedForms($builder)
            ->addImageLocalizedForms($builder)
            ->addStoreRelationForm($builder)
            ->addPyzStoreRelationForm($builder);

        $this->executeProductAbstractFormExpanderPlugins($builder, $options);
    }


    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd
     */
    protected function addPyzStoreRelationForm(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FORM_PYZ_STORE_RELATION,
            $this->getFactory()->getStoreRelationFormTypePlugin()->getType()
        );

        return $this;
    }
}
