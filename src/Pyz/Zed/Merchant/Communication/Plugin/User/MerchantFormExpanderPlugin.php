<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Merchant\Communication\Plugin\User;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @method \Pyz\Zed\Merchant\Communication\MerchantCommunicationFactory getFactory()
 * @method \Pyz\Zed\Merchant\Business\MerchantFacadeInterface getFacade()
 * @method \Spryker\Zed\Merchant\MerchantConfig getConfig()
 */
class MerchantFormExpanderPlugin extends AbstractPlugin implements UserFormExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expand User form with Locale field.
     *
     * @api
     *
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder): void
    {
        $formExpander = $this->getFactory()->createMerchantFormExpander();
        $dataProvider = $this->getFactory()->createMerchantFormDataProvider();

        $formExpander->buildForm($builder, $dataProvider->getOptions());
    }
}
