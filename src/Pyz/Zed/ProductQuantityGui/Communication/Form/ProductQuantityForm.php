<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductQuantityGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\Type;

/**
 * @method \Pyz\Zed\ProductQuantityGui\Communication\ProductQuantityGuiCommunicationFactory getFactory()
 */
class ProductQuantityForm extends AbstractType
{
    public const FK_PRODUCT_QUANTITY = 'fk_product';
    public const PRODUCT_QUANTITY_MIN = 'quantity_min';
    public const PRODUCT_QUANTITY_MAX = 'quantity_max';
    public const PRODUCT_QUANTITY_INTERVAL = 'quantity_interval';

    protected const DECIMAL_QUANTITY_VALIDATION_PATTERN = '/^\d{1,10}(\.\d{1,20})?$/';
    protected const PRODUCT_QUANTITY_MAX_MIN_VALUE = 1;
    protected const PRODUCT_QUANTITY_MAX_MAX_VALUE = 1000000;

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $this
            ->addFkProductQuantity($builder, $options)
            ->addProductQuantityMax($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addFkProductQuantity(FormBuilderInterface $builder, array $options = [])
    {
        $builder
            ->add(static::FK_PRODUCT_QUANTITY, HiddenType::class, [
                'required' => false,
            ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    protected function addProductQuantityMax(FormBuilderInterface $builder, array $options = [])
    {
        $builder->add(static::PRODUCT_QUANTITY_MAX, NumberType::class, [
            'label' => 'Quantity Max',
            'attr' => [
                'min' => static::PRODUCT_QUANTITY_MAX_MIN_VALUE,
                'max' => static::PRODUCT_QUANTITY_MAX_MAX_VALUE,
            ],
            'html5' => true,
            'required' => false,
            'constraints' => [
                new Type('numeric'),
                new Regex([
                    'pattern' => static::DECIMAL_QUANTITY_VALIDATION_PATTERN,
                ]),
            ],
        ]);

        return $this;
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'product_quantity';
    }
}
