<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

use Spryker\Client\Session\SessionClientInterface;
use Symfony\Component\HttpFoundation\Cookie;

class GlobusRestApiClientCookie
{
    public const COOKIE_NAME = "gl_id_tok";
    public const COOKIE_LOGIN_CONFIRMED_NAME = "localLogin";
    public const FIELD_NAME_UID = "UID";
    public const FIELD_NAME_TOKEN = "id_token";
    protected const FIELD_NAME_TOKEN_STRONG = "strongToken";
    protected const FIELD_NAME_TOKEN_ISSUED_AT = "tokenIssuedAt";
    protected const FIELD_NAME_TOKEN_EXPIRES_AT = "tokenExpiresAt";

    /**
     * @param string $data
     * @param \Spryker\Client\Session\SessionClientInterface $sessionClient
     *
     * @return \Symfony\Component\HttpFoundation\Cookie
     */
    public function createLoginCookie(string $data, SessionClientInterface $sessionClient): Cookie
    {
        $ent = json_decode($data, true);
        $cookieContent = [
            static::FIELD_NAME_UID => $ent[static::FIELD_NAME_UID],
            static::FIELD_NAME_TOKEN => $ent[static::FIELD_NAME_TOKEN],
            static::FIELD_NAME_TOKEN_STRONG => $ent[static::FIELD_NAME_TOKEN_STRONG],
            static::FIELD_NAME_TOKEN_ISSUED_AT => $ent[static::FIELD_NAME_TOKEN_ISSUED_AT],
            static::FIELD_NAME_TOKEN_EXPIRES_AT => $ent[static::FIELD_NAME_TOKEN_EXPIRES_AT],
        ];
        $value = json_encode($cookieContent);
        $sessionClient->set("id_token", $cookieContent[static::FIELD_NAME_TOKEN]);
        $sessionClient->set("cdcUID", $cookieContent[static::FIELD_NAME_UID]);

        return new Cookie(
            static::COOKIE_NAME,
            $value,
            $ent[static::FIELD_NAME_TOKEN_EXPIRES_AT],
            '/',
            static::getDomain()
        );
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Cookie
     */
    public function createLoginConfirmedCookie(): Cookie
    {
        return new Cookie(
            static::COOKIE_LOGIN_CONFIRMED_NAME,
            true
        );
    }

    /**
     * @return bool
     */
    public static function isLoginConfirmed(): bool
    {
        if (isset($_COOKIE[static::COOKIE_LOGIN_CONFIRMED_NAME])) {
            return (bool)$_COOKIE[static::COOKIE_LOGIN_CONFIRMED_NAME];
        }

        return false;
    }

    /**
     * @return bool
     */
    public static function isTokenCookieSet(): bool
    {
        if (isset($_COOKIE[static::COOKIE_NAME])) {
            return true;
        }

        return false;
    }

    /**
     * @return string
     */
    private static function getDomain(): string
    {
        $parts = explode(".", $_SERVER["HTTP_HOST"]);
        $partCount = count($parts);

        return $parts[$partCount - 2] . "." . $parts[$partCount - 1];
    }

    /**
     * @return void
     */
    public static function clearCookies(): void
    {
        if (isset($_COOKIE[static::COOKIE_LOGIN_CONFIRMED_NAME])) {
            setcookie(static::COOKIE_LOGIN_CONFIRMED_NAME, false, 1);
            unset($_COOKIE[static::COOKIE_LOGIN_CONFIRMED_NAME]);
        }
        if (isset($_COOKIE[static::COOKIE_NAME])) {
            setcookie(static::COOKIE_NAME, false, 1, "/", static::getDomain());
            unset($_COOKIE[static::COOKIE_NAME]);
        }
    }
}
