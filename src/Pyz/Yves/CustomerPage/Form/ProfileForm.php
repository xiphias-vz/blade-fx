<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\ProfileForm as SprykerProfileForm;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Regex;

class ProfileForm extends SprykerProfileForm
{
    private const REGEXP_SAFE_STRING = '/^[^<>;]+$/i';
    private const MESSAGE_NOT_SAFE_STRING = 'general.error.message.field_contain_not_valid_characters';
    private const VALIDATION_MIN_LENGTH_MESSAGE = 'validation.min_length';
    private const OPTION_VALIDATION_GROUP = 'validation_group';

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\ProfileForm
     */
    public function addEmailField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_EMAIL, EmailType::class, [
            'label' => 'customer.profile.email',
            'disabled' => true,
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\ProfileForm
     */
    public function addLastNameField(FormBuilderInterface $builder, array $options = [])
    {
        $builder->add(self::FIELD_LAST_NAME, TextType::class, [
            'label' => 'customer.profile.last_name',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint($options),
                self::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     * @param array $options
     *
     * @return $this
     */
    public function addFirstNameField(FormBuilderInterface $builder, array $options = [])
    {
        $builder->add(self::FIELD_FIRST_NAME, TextType::class, [
            'label' => 'customer.profile.first_name',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
                $this->createMinLengthConstraint($options),
                self::createSafeStringRegexConstraint($options),
            ],
        ]);

        return $this;
    }

    /**
     * @param array $options
     *
     * @return \Symfony\Component\Validator\Constraints\Regex
     */
    public static function createSafeStringRegexConstraint(array $options = []): Regex
    {
        return new Regex([
            'groups' => $options[static::OPTION_VALIDATION_GROUP] ?? Constraint::DEFAULT_GROUP,
            'pattern' => static::REGEXP_SAFE_STRING,
            'message' => static::MESSAGE_NOT_SAFE_STRING,
        ]);
    }

    /**
     * @param array $options
     *
     * @return \Symfony\Component\Validator\Constraints\Length
     */
    public function createMinLengthConstraint(array $options)
    {
        return new Length([
            'min' => 3,
            'groups' => self::getValidationGroup($options),
            'minMessage' => static::VALIDATION_MIN_LENGTH_MESSAGE,
        ]);
    }

    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return \SprykerShop\Yves\CustomerPage\Form\ProfileForm
     */
    public function addSalutationField(FormBuilderInterface $builder)
    {
        $builder->add(self::FIELD_SALUTATION, ChoiceType::class, [
            'choices' => array_flip([
                'Mr' => 'customer.salutation.mr',
                'Ms' => 'customer.salutation.ms',
                'Divers' => 'customer.salutation.divers',
                'Dr' => 'customer.salutation.dr',

            ]),
            'label' => 'profile.form.salutation',
            'required' => true,
            'constraints' => [
                $this->createNotBlankConstraint(),
            ],
        ]);

        return $this;
    }

    /**
     * @param array $options
     *
     * @return string
     */
    protected function getValidationGroup(array $options)
    {
        $validationGroup = Constraint::DEFAULT_GROUP;

        if (!empty($options[self::OPTION_VALIDATION_GROUP])) {
            $validationGroup = $options[self::OPTION_VALIDATION_GROUP];
        }

        return $validationGroup;
    }
}
