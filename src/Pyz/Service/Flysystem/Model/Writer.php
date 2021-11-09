<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\Flysystem\Model;

use League\Flysystem\Config;
use Pyz\Service\Flysystem\Filesystem;
use Spryker\Service\Flysystem\Model\Writer as SprykerWriter;

class Writer extends SprykerWriter
{
    /**
     * @param string $filesystemName
     * @param string $path
     * @param string $content
     * @param array $config
     *
     * @return void
     */
    public function update($filesystemName, $path, $content, array $config = [])
    {
        $this->handleWriteOperation(function () use ($filesystemName, $path, $content, $config) {
            return $this->filesystemProvider
                ->getFilesystemByName($filesystemName)
                ->update($path, $content, $config);
        });
    }

    /**
     * @param string $filesystemName
     * @param string $path
     * @param string $content
     * @param array $config
     *
     * @return void
     */
    public function write($filesystemName, $path, $content, array $config = [])
    {
        $this->handleWriteOperation(function () use ($filesystemName, $path, $content, $config) {
            $ftp = $this->filesystemProvider
                ->getFilesystemByName($filesystemName);
            $local = new Filesystem($ftp->getAdapter(), new Config([
                'disable_asserts' => true,
            ]));
            $local->write($path, $content, $config);
        });
    }
}
