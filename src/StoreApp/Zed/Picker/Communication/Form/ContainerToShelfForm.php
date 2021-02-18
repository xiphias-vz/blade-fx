<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @method \StoreApp\Zed\Picker\Communication\PickerCommunicationFactory getFactory()
 * @method \StoreApp\Zed\Picker\Business\PickerFacadeInterface getFacade()
 * @method \StoreApp\Zed\Picker\PickerConfig getConfig()
 */
class ContainerToShelfForm extends AbstractType
{
    //public const BUTTON_SUBMIT = 'buttonSubmit';
    public const FIELD_CONTAINER_CODE = 'container_code';
    public const FIELD_SHELF_CODE = 'shelf_code';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addContainerCodeFiled($builder);
        $this->addShelfCodeFiled($builder);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addContainerCodeFiled(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_CONTAINER_CODE, TextType::class, [
            'label' => 'Scan/Eingabe Container',
            'required' => true,
            'constraints' => [
                new NotBlank(),
                new Length(['min' => 4]),
                ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addShelfCodeFiled(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_SHELF_CODE, TextType::class, [
            'label' => 'Shelf ID',
            'required' => false,
            'constraints' => [
                new Length(['min' => 4]),
                ],
        ]);

        return $this;
    }
}
