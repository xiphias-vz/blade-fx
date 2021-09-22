<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication;

use Pyz\Service\User\UserServiceInterface;
use Pyz\Zed\User\Communication\Form\Constraints\PasswordConstraint;
use Pyz\Zed\User\Communication\Form\UserForm;
use Pyz\Zed\User\Communication\Form\UserUpdateForm;
use Pyz\Zed\User\Communication\Table\UsersTable;
use Pyz\Zed\User\UserDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\User\Communication\UserCommunicationFactory as SprykerUserCommunicationFactory;

/**
 * @method \Spryker\Zed\User\Persistence\UserQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\User\UserConfig getConfig()
 * @method \Spryker\Zed\User\Business\UserFacadeInterface getFacade()
 * @method \Pyz\Service\User\UserService getService()
 */
class UserCommunicationFactory extends SprykerUserCommunicationFactory
{
    /**
     * @param array $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createUserForm(array $data = [], array $options = [])
    {
        return $this->getFormFactory()->create(UserForm::class, $data, $options);
    }

    /**
     * @param array $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createUpdateUserForm(array $data = [], array $options = [])
    {
        return $this->getFormFactory()->create(UserUpdateForm::class, $data, $options);
    }

    /**
     * @return \Pyz\Zed\User\Communication\Form\Constraints\PasswordConstraint
     */
    public function createPasswordConstraint(): PasswordConstraint
    {
        return new PasswordConstraint([PasswordConstraint::OPTION_USER_SERVICE => $this->getUserService()]);
    }

    /**
     * @return \Pyz\Zed\User\Communication\Table\UsersTable|\Spryker\Zed\User\Communication\Table\UsersTable
     */
    public function createUserTable()
    {
        return new UsersTable(
            $this->getQueryContainer(),
            $this->getProvidedDependency(UserDependencyProvider::SERVICE_DATE_FORMATTER),
            $this->createUserTablePluginExecutor(),
            $this->getAclFacade(),
            $this->getUserFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(UserDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Service\User\UserServiceInterface
     */
    public function getUserService(): UserServiceInterface
    {
        return $this->getProvidedDependency(UserDependencyProvider::SERVICE_USER);
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade()
    {
        return $this->getProvidedDependency(UserDependencyProvider::FACADE_USER);
    }
}
