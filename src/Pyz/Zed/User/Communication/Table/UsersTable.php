<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Table;

use Orm\Zed\User\Persistence\Map\SpyUserTableMap;
use Pyz\Shared\Acl\AclConstants;
use Pyz\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;
use Spryker\Zed\User\Communication\Table\PluginExecutor\UserTablePluginExecutorInterface;
use Spryker\Zed\User\Persistence\UserQueryContainerInterface;

class UsersTable extends AbstractTable
{
    public const ACTION = 'Action';
    public const UPDATE_USER_URL = '/user/edit/update';
    public const DEACTIVATE_USER_URL = '/user/edit/deactivate-user';
    public const ACTIVATE_USER_URL = '/user/edit/activate-user';

    /**
     * @see \Spryker\Zed\User\Communication\Controller\EditController::confirmDeleteAction()
     */
    public const CONFIRM_DELETE_USER_URL = '/user/edit/confirm-delete';

    public const PARAM_ID_USER = 'id-user';

    /**
     * @var \Pyz\Zed\User\Persistence\UserQueryContainerInterface
     */
    protected $userQueryContainer;

    /**
     * @var \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface
     */
    protected $utilDateTimeService;

    /**
     * @var \Spryker\Zed\User\Communication\Table\PluginExecutor\UserTablePluginExecutorInterface
     */
    protected $userTablePluginExecutor;

    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $saleUserInterface;

    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @param \Spryker\Zed\User\Persistence\UserQueryContainerInterface $userQueryContainer
     * @param \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface $utilDateTimeService
     * @param \Spryker\Zed\User\Communication\Table\PluginExecutor\UserTablePluginExecutorInterface $userTablePluginExecutor
     */
    public function __construct(
        UserQueryContainerInterface $userQueryContainer,
        UtilDateTimeServiceInterface $utilDateTimeService,
        UserTablePluginExecutorInterface $userTablePluginExecutor,
        AclFacadeInterface $aclFacade,
        SalesToUserInterface $saleUserInterface
    ) {
        $this->userQueryContainer = $userQueryContainer;
        $this->utilDateTimeService = $utilDateTimeService;
        $this->userTablePluginExecutor = $userTablePluginExecutor;
        $this->aclFacade = $aclFacade;
        $this->saleUserInterface = $saleUserInterface;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config)
    {
        $config->setHeader([
            SpyUserTableMap::COL_USERNAME => 'E-mail',
            SpyUserTableMap::COL_FIRST_NAME => 'First Name',
            SpyUserTableMap::COL_LAST_NAME => 'Last Name',
            SpyUserTableMap::COL_LAST_LOGIN => 'Last Login',
            SpyUserTableMap::COL_STATUS => 'Status',
            self::ACTION => self::ACTION,
        ]);

        $config->setRawColumns([SpyUserTableMap::COL_STATUS, self::ACTION]);

        $config->setSortable([
            SpyUserTableMap::COL_USERNAME,
            SpyUserTableMap::COL_FIRST_NAME,
            SpyUserTableMap::COL_LAST_NAME,
            SpyUserTableMap::COL_STATUS,
            SpyUserTableMap::COL_LAST_LOGIN,
        ]);

        $config->setSearchable([
            SpyUserTableMap::COL_USERNAME,
            SpyUserTableMap::COL_FIRST_NAME,
            SpyUserTableMap::COL_LAST_NAME,
        ]);

        $config = $this->executeConfigExpanderPlugins($config);

        return $config;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $tableConfiguration
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function executeConfigExpanderPlugins(TableConfiguration $tableConfiguration): TableConfiguration
    {
        return $this->userTablePluginExecutor->executeConfigExpanderPlugins($tableConfiguration);
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config)
    {
        if ($this->isCurrentUserSupervisor()) {
            $merchantReferenceOfCurrentUser = $this->aclFacade->getCurrentUser()->getMerchantReference();
        }

        if (isset($merchantReferenceOfCurrentUser)) {
            $userQuery = $this->userQueryContainer->queryUsersByMerchantReference($merchantReferenceOfCurrentUser);
        } else {
            $userQuery = $this->userQueryContainer->queryUser();
        }
        $queryResults = $this->runQuery($userQuery, $config);

        $results = [];
        foreach ($queryResults as $item) {
            $results[] = array_merge([
                SpyUserTableMap::COL_USERNAME => $item[SpyUserTableMap::COL_USERNAME],
                SpyUserTableMap::COL_FIRST_NAME => $item[SpyUserTableMap::COL_FIRST_NAME],
                SpyUserTableMap::COL_LAST_NAME => $item[SpyUserTableMap::COL_LAST_NAME],
                SpyUserTableMap::COL_LAST_LOGIN => $this->getLastLoginDateTime($item),
                SpyUserTableMap::COL_STATUS => $this->createStatusLabel($item),
                self::ACTION => implode(' ', $this->createActionButtons($item)),
            ], $this->executeDataExpanderPlugins($item));
        }

        return $results;
    }

    /**
     * @return bool
     */
    protected function isCurrentUserSupervisor(): bool
    {
        $idUser = $this->saleUserInterface->getCurrentUser()->getIdUser();
        $userGroups = $this->aclFacade->getUserGroups($idUser);

        foreach ($userGroups->getGroups() as $group) {
            if ($group->getName() === AclConstants::SUPERVISOR_GROUP) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array $item
     *
     * @return array
     */
    protected function executeDataExpanderPlugins(array $item): array
    {
        return $this->userTablePluginExecutor->executeDataExpanderPlugins($item);
    }

    /**
     * @param array $user
     *
     * @return array
     */
    public function createActionButtons(array $user)
    {
        $urls = $this->generateUsersTableExpanderPluginsActionButtons($user);

        $urls[] = $this->generateEditButton(
            Url::generate(self::UPDATE_USER_URL, [
                self::PARAM_ID_USER => $user[SpyUserTableMap::COL_ID_USER],
            ]),
            'Edit'
        );
        if (!$this->isCurrentUserSupervisor()) {
            $urls[] = $this->createStatusButton($user);

            $deleteUrl = Url::generate(static::CONFIRM_DELETE_USER_URL, [
                self::PARAM_ID_USER => $user[SpyUserTableMap::COL_ID_USER],
            ]);

            $urls[] = $this->generateRemoveButton($deleteUrl, 'Delete');
        }

        return $urls;
    }

    /**
     * @param array $user
     *
     * @return string
     */
    public function createStatusLabel(array $user)
    {
        switch ($user[SpyUserTableMap::COL_STATUS]) {
            case SpyUserTableMap::COL_STATUS_ACTIVE:
                return $this->generateLabel('Active', 'label-success');
            case SpyUserTableMap::COL_STATUS_BLOCKED:
                return $this->generateLabel('Deactivated', 'label-danger');
            case SpyUserTableMap::COL_STATUS_DELETED:
                return $this->generateLabel('Deleted', 'label-default');
        }

        return '';
    }

    /**
     * @param array $user
     *
     * @return string
     */
    protected function createStatusButton(array $user)
    {
        if ($user[SpyUserTableMap::COL_STATUS] === SpyUserTableMap::COL_STATUS_BLOCKED) {
            return $this->generateViewButtonForm(
                Url::generate(self::ACTIVATE_USER_URL, [
                    self::PARAM_ID_USER => $user[SpyUserTableMap::COL_ID_USER],
                ]),
                'Activate'
            );
        }

        return $this->generateViewButtonForm(
            Url::generate(self::DEACTIVATE_USER_URL, [
                self::PARAM_ID_USER => $user[SpyUserTableMap::COL_ID_USER],
            ]),
            'Deactivate'
        );
    }

    /**
     * @param array $user
     *
     * @return string[]
     */
    protected function generateUsersTableExpanderPluginsActionButtons(array $user)
    {
        $buttonTransfers = $this->userTablePluginExecutor->executeActionButtonExpanderPlugins($user);

        $actionButtons = [];
        foreach ($buttonTransfers as $buttonTransfer) {
            $actionButtons[] = $this->generateButton(
                $buttonTransfer->getUrl(),
                $buttonTransfer->getTitle(),
                $buttonTransfer->getDefaultOptions(),
                $buttonTransfer->getCustomOptions()
            );
        }

        return $actionButtons;
    }

    /**
     * @param array $item
     *
     * @return string
     */
    protected function getLastLoginDateTime(array $item)
    {
        if (empty($item[SpyUserTableMap::COL_LAST_LOGIN])) {
            return 'N/A';
        }

        return $this->utilDateTimeService->formatDateTime($item[SpyUserTableMap::COL_LAST_LOGIN]);
    }
}
