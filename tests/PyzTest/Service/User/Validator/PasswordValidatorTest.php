<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace PyzTest\Service\User\Validator;

use Codeception\Test\Unit;
use SprykerTest\Shared\Testify\Helper\LocatorHelperTrait;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Service
 * @group User
 * @group Validator
 * @group PasswordValidatorTest
 * Add your own group annotations below this line
 */
class PasswordValidatorTest extends Unit
{
    use LocatorHelperTrait;

    /**
     * @return array
     */
    public function providePasswordData(): array
    {
        return [
            'too short' => [
                '123456',
                false,
            ],
            'only digits' => [
                '1234567890',
                false,
            ],
            'only small letters' => [
                'qwertyuiop',
                false,
            ],
            'low and small letters' => [
                'QWERTYuiop',
                false,
            ],
            'digits and small letters' => [
                '123456uiop',
                false,
            ],
            'upper and digits' => [
                'QWERTY6788',
                false,
            ],
            'specials and digits' => [
                '$%^@$!6788',
                false,
            ],
            'specials and lower' => [
                '$%^@$!qweq',
                false,
            ],
            'specials and upper' => [
                '$%^@$!QWQW',
                false,
            ],
            'specials, lower and upper' => [
                '$%^@$!QWaW',
                true,
            ],
        ];
    }

    /**
     * @dataProvider providePasswordData
     *
     * @param string $password
     * @param bool $isValid
     *
     * @return void
     */
    public function testPasswordValid(string $password, bool $isValid): void
    {
        $service = $this->getLocator()->user()->service();

        $this->assertEquals($isValid, $service->validatePassword($password));
    }
}
