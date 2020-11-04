<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\MerchantUser;

use Generated\Shared\Transfer\UserTransfer;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\DataImport\Business\Exception\InvalidDataException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;
use Throwable;

class MerchantUserWriterStep implements DataImportStepInterface
{
    public const KEY_LOCALE_NAME = 'locale_name';
    public const KEY_FK_LOCALE = 'fk_locale';
    protected const KEY_FIRST_NAME = 'first_name';
    protected const KEY_LAST_NAME = 'last_name';
    protected const KEY_PASSWORD = 'password';
    protected const KEY_GROUP = 'group';
    protected const KEY_ID_GROUP = 'id_group';
    protected const KEY_USERNAME = 'username';
    protected const KEY_MERCHANT_REFERENCE = 'merchant_reference';

    protected const REQUIRED_DATA_SET_KEYS = [
        self::KEY_FIRST_NAME,
        self::KEY_LAST_NAME,
        self::KEY_PASSWORD,
        self::KEY_USERNAME,
        self::KEY_LOCALE_NAME,
        self::KEY_USERNAME,
        self::KEY_GROUP,
        self::KEY_MERCHANT_REFERENCE,
    ];

    /**
     * @var \Spryker\Zed\User\Business\UserFacadeInterface
     */
    protected $userFacade;

    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @param \Spryker\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     */
    public function __construct(UserFacadeInterface $userFacade, AclFacadeInterface $aclFacade)
    {
        $this->userFacade = $userFacade;
        $this->aclFacade = $aclFacade;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->validateDataSet($dataSet);

        $userTransfer = $this->getUser($dataSet);
        $userTransfer = $this->saveUser($dataSet, $userTransfer);

        $this->addUserToGroup($userTransfer->getIdUser(), $dataSet[static::KEY_ID_GROUP]);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function validateDataSet(DataSetInterface $dataSet): void
    {
        foreach (static::REQUIRED_DATA_SET_KEYS as $requiredDataSetKey) {
            $this->validateRequireDataSetByKey($dataSet, $requiredDataSetKey);
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param string $requiredDataSetKey
     *
     * @throws \Spryker\Zed\DataImport\Business\Exception\InvalidDataException
     *
     * @return void
     */
    protected function validateRequireDataSetByKey(DataSetInterface $dataSet, string $requiredDataSetKey): void
    {
        if (!$dataSet[$requiredDataSetKey]) {
            throw new InvalidDataException('"' . $requiredDataSetKey . '" is required.');
        }
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Generated\Shared\Transfer\UserTransfer $userTransfer
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function mapDataSetToUserTransfer(DataSetInterface $dataSet, UserTransfer $userTransfer): UserTransfer
    {
        return $userTransfer->fromArray($dataSet->getArrayCopy(), true);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Generated\Shared\Transfer\UserTransfer|null
     */
    protected function getUser(DataSetInterface $dataSet): ?UserTransfer
    {
        try {
            return $this->userFacade->getUserByUsername($dataSet[static::KEY_USERNAME]);
        } catch (Throwable $exception) {
            return null;
        }
    }

    /**
     * @param int $idUser
     * @param int $idGroup
     *
     * @return void
     */
    protected function addUserToGroup(int $idUser, int $idGroup): void
    {
        $userHasGroup = $this->aclFacade->userHasGroupId($idUser, $idGroup);
        if ($userHasGroup) {
            return;
        }

        $this->aclFacade->addUserToGroup($idUser, $idGroup);
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Generated\Shared\Transfer\UserTransfer|null $userTransfer
     *
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    protected function saveUser(DataSetInterface $dataSet, ?UserTransfer $userTransfer): UserTransfer
    {
        if (!$userTransfer) {
            $userTransfer = new UserTransfer();
        }

        $userTransfer = $this->mapDataSetToUserTransfer($dataSet, $userTransfer);
        if ($userTransfer->getIdUser()) {
            return $this->userFacade->updateUser($userTransfer);
        }

        return $this->userFacade->createUser($userTransfer);
    }
}
