<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Twig;

use ReflectionClass;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Twig\TwigConstants;
use Spryker\Zed\Twig\TwigConfig as SprykerTwigConfig;
use Symfony\Bridge\Twig\Extension\FormExtension;

class TwigConfig extends SprykerTwigConfig
{
    /**
     * @return array
     */
    public function getTemplatePaths()
    {
        $paths = [];
        $paths = $this->addProjectTemplatePaths($paths);
        $paths = $this->addCoreTemplatePaths($paths);

        return $paths;
    }

    /**
     * @param array $paths
     *
     * @return array
     */
    protected function addProjectTemplatePaths(array $paths)
    {
        $namespaces = $this->getProjectNamespaces();

        $themeName = $this->getThemeName();
        $themeNameDefault = $this->getThemeNameDefault();

        foreach ($namespaces as $namespace) {
            if ($themeName !== '' && $themeName !== $themeNameDefault) {
                $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Zed/%s/Theme/' . $themeName;
                $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Yves/%s/Theme/' . $themeName;
                $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Shared/%s/Theme/' . $themeName;
            }

            $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Zed/%s/Theme/' . $themeNameDefault;
            $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Yves/%s/Theme/' . $themeNameDefault;
            $paths[] = APPLICATION_SOURCE_DIR . '/' . $namespace . '/Shared/%s/Theme/' . $themeNameDefault;
        }

        return $paths;
    }

    /**
     * @return array
     */
    public function getProjectNamespaces(): array
    {
        return $this->get(KernelConstants::PROJECT_NAMESPACES);
    }

    /**
     * @return array
     */
    public function getCoreNamespaces(): array
    {
        return $this->get(KernelConstants::CORE_NAMESPACES);
    }

    /**
     * @param array $paths
     *
     * @return array
     */
    protected function addCoreTemplatePaths(array $paths)
    {
        $namespaces = $this->getCoreNamespaces();

        foreach ($namespaces as $namespace) {
            $paths[] = APPLICATION_VENDOR_DIR . '/*/*/src/' . $namespace . '/Yves/%s/Theme/' . $this->getThemeNameDefault();
            $paths[] = APPLICATION_VENDOR_DIR . '/*/*/src/' . $namespace . '/Shared/%s/Theme/' . $this->getThemeNameDefault();
        }

        return $paths;
    }

    /**
     * @return string
     */
    public function getThemeName(): string
    {
        return 'default';
    }

    /**
     * @return string
     */
    public function getThemeNameDefault(): string
    {
        return 'default';
    }

    /**
     * @return string
     */
    public function getCacheFilePath()
    {
        return $this->get(TwigConstants::ZED_PATH_CACHE_FILE, '');
    }

    /**
     * @return bool
     */
    public function isPathCacheEnabled()
    {
        return $this->get(TwigConstants::ZED_PATH_CACHE_ENABLED, true);
    }

    /**
     * @return int
     */
    public function getPermissionMode(): int
    {
        return $this->get(TwigConstants::DIRECTORY_PERMISSION, 0777);
    }

    /**
     * @return array
     */
    public function getTwigOptions(): array
    {
        return $this->get(TwigConstants::ZED_TWIG_OPTIONS, []);
    }

    /**
     * @return string[]
     */
    public function getFormTemplateDirectories(): array
    {
        $reflectedFormExtension = new ReflectionClass(FormExtension::class);

        return [
            dirname($reflectedFormExtension->getFileName()) . '/../Resources/views/Form',
        ];
    }
}
