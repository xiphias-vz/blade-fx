<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\FlysystemFtpFileSystem\Model\Builder\Adapter;

use League\Flysystem\Adapter\Ftp as SpryFtp;

class FtpAdapterBuilder extends SpryFtp
{
    /**
     * @inheritDoc
     *
     * @noinspection PhpComposerExtensionStubsInspection
     */
    public function getMetadata($path)
    {
        if ($path === '') {
            return ['type' => 'dir', 'path' => ''];
        }

        if (ftp_chdir($this->getConnection(), $path) === true) {
            $this->setConnectionRoot();

            return ['type' => 'dir', 'path' => $path];
        }

        $listing = $this->ftpRawlist('-A', str_replace('*', '\\*', $path));

        if (empty($listing) || in_array('total 0', $listing, true)) {
            return false;
        }

        if (preg_match('/.* not found/', $listing[0])) {
            return false;
        }

        if (preg_match('/^total [0-9]*$/', $listing[0])) {
            array_shift($listing);
        }

        return $this->normalizeObject($listing[0], '');
    }
}
