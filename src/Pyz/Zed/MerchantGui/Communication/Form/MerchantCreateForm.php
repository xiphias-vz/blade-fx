<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Form;

use Pyz\Shared\Acl\AclConstants;
use Spryker\Zed\MerchantGui\Communication\Form\MerchantCreateForm as ExtendedMerchantCreateForm;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Pyz\Zed\MerchantGui\Communication\MerchantGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\MerchantGui\MerchantGuiConfig getConfig()
 */
class MerchantCreateForm extends ExtendedMerchantCreateForm
{
    public const OPTION_CURRENT_ID = 'current_id';

    protected const FIELD_DROPDOWN = 'dropdown';
    protected const FIELD_ID_MERCHANT = 'id_merchant';
    protected const FIELD_NAME = 'name';
    protected const FIELD_REGISTRATION_NUMBER = 'registration_number';
    protected const FIELD_EMAIL = 'email';
    protected const FIELD_MERCHANT_REFERENCE = 'merchant_reference';
    protected const FIELD_IS_SHOP_VISIBLE = 'isShopVisible';
    protected const FIELD_IS_PASSWORD_PROTECTED = 'isPasswordProtected';
    protected const FIELD_SHOP_PASSWORD = 'shopPassword';
    protected const FIELD_IS_CASHIER_TXT = 'isCashierTxt';
    protected const FIELD_IS_CASHIER_XML = 'isCashierXml';

    protected const LABEL_NAME = 'Name';
    protected const LABEL_REGISTRATION_NUMBER = 'Registration number';
    protected const LABEL_EMAIL = 'Email';
    protected const LABEL_MERCHANT_REFERENCE = 'Merchant Reference';
    protected const LABEL_IS_SHOP_VISIBLE = 'Is active';
    protected const LABEL_IS_CASHIER_TXT = 'Is cashier txt';
    protected const LABEL_IS_CASHIER_XML = 'Is cashier xml';
    protected const LABEL_IS_PASSWORD_PROTECTED = 'Is password protected';
    protected const LABEL_SHOP_PASSWORD = 'Shop password';

    protected const FIELD_ASORTMENT_ZONES = 'idAsortmentZones';
    protected const FIELD_PICK_ZONES = 'idPickZones';
    protected const LABEL_ASORTMENT_ZONES = 'asortment_zones';
    protected const LABEL_PICK_ZONES = 'pick_zones';

    protected const FIELD_IS_TRANSPORTBOX_ENABLED = 'is_transportbox_enabled';
    protected const LABEL_IS_TRANSPORTBOX_ENABLED = 'Deposit';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this
            ->addIdMerchantField($builder)
            ->addNameField($builder)
            ->addEmailField($builder, $options[static::OPTION_CURRENT_ID])
            ->addRegistrationNumberField($builder)
            ->addCashierTxtField($builder)
            ->addCashierXmlField($builder)
            ->addMerchantReferenceField($builder, $options[static::OPTION_CURRENT_ID])
            ->addIsTransportboxChecked($builder);

        $isCurrentUserAdmin = $this->isCurrentUserAdmin();
        if ($isCurrentUserAdmin) {
            $this
                ->addIsShopVisible($builder)
                ->addIsPasswordProtected($builder);
        }

        $this->executeMerchantFormExpanderPlugins($builder, $options);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addCashierTxtField(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_IS_CASHIER_TXT, RadioType::class, [
            'label' => static::LABEL_IS_CASHIER_TXT,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addCashierXmlField(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_IS_CASHIER_XML, RadioType::class, [
            'label' => static::LABEL_IS_CASHIER_XML,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIsShopVisible(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_IS_SHOP_VISIBLE, CheckboxType::class, [
            'label' => static::LABEL_IS_SHOP_VISIBLE,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIsTransportboxChecked(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_IS_TRANSPORTBOX_ENABLED, CheckboxType::class, [
            'label' => static::LABEL_IS_TRANSPORTBOX_ENABLED,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addIsPasswordProtected(FormBuilderInterface $builder)
    {
        $builder->add(static::FIELD_IS_PASSWORD_PROTECTED, CheckboxType::class, [
            'label' => static::LABEL_IS_PASSWORD_PROTECTED,
            'required' => false,
        ]);

        return $this;
    }

    /**
     * @return bool
     */
    protected function isCurrentUserAdmin(): bool
    {
        $userFacade = $this->getFactory()->getUserFacade();

        $idUser = $userFacade->getCurrentUser()->getIdUser();
        $userGroups = $this->getFactory()->getAclFacade()->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::ROOT_GROUP) {
                return true;
            }
        }

        return false;
    }
}
