<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\Kernel;

use Spryker\Shared\Kernel\KernelConfig as SprykerKernelConfig;

class KernelConfig extends SprykerKernelConfig
{
    /**
     * @api
     *
     * @return string
     */
    public function getResolvableCacheFilePath(): string
    {
        $pathByOrganizations = implode('/', $this->getProjectOrganizations());

        return APPLICATION_ROOT_DIR . '/src/Generated/Shared/Kernel/cache/' . $pathByOrganizations . '/resolvableClassCache.php';
    }

    /**
     * Key consist of:
     * - the application name
     * - the resolvable type
     * - the layer (if Zed factory)
     *
     * Value contains placeholders for (ordered):
     * - the organization name
     * - the module candidate name (module, module + store, module + bucket, etc)
     * - the module name
     *
     * @api
     *
     * @return string[]
     */
    public function getResolvableTypeClassNamePatternMap(): array
    {
        return [
            'ClientConfig' => '\\%s\\Client\\%s\\%sConfig',
//            'GlueConfig' => '\\%s\\Glue\\%s\\%sConfig',
            'ServiceConfig' => '\\%s\\Service\\%s\\%sConfig',
            'SharedConfig' => '\\%s\\Shared\\%s\\%sConfig',
            'YvesConfig' => '\\%s\\Yves\\%s\\%sConfig',
            'ZedConfig' => '\\%s\\Zed\\%s\\%sConfig',
            'ClientDependencyProvider' => '\\%s\\Client\\%s\\%sDependencyProvider',
//            'GlueDependencyProvider' => '\\%s\\Glue\\%s\\%sDependencyProvider',
            'ServiceDependencyProvider' => '\\%s\\Service\\%s\\%sDependencyProvider',
            'YvesDependencyProvider' => '\\%s\\Yves\\%s\\%sDependencyProvider',
            'ZedDependencyProvider' => '\\%s\\Zed\\%s\\%sDependencyProvider',
            'ServiceService' => '\\%s\\Service\\%s\\%sService',
            'ClientClient' => '\\%s\\Client\\%s\\%sClient',
            'ZedFacade' => '\\%s\\Zed\\%s\\Business\\%sFacade',
            'ClientFactory' => '\\%s\\Client\\%s\\%sFactory',
//            'GlueFactory' => '\\%s\\Glue\\%s\\%sFactory',
//            'GlueResource' => '\\%s\\Glue\\%s\\%sResource',
            'ServiceFactory' => '\\%s\\Service\\%s\\%sServiceFactory',
            'YvesFactory' => '\\%s\\Yves\\%s\\%sFactory',
            'SharedFactory' => '\\%s\\Shared\\%s\\%sSharedFactory',
            'ZedFactoryBusiness' => '\\%s\\Zed\\%s\\Business\\%sBusinessFactory',
            'ZedFactoryCommunication' => '\\%s\\Zed\\%s\\Communication\\%sCommunicationFactory',
            'ZedFactoryPersistence' => '\\%s\\Zed\\%s\\Persistence\\%sPersistenceFactory',
            'ZedQueryContainer' => '\\%s\\Zed\\%s\\Persistence\\%sQueryContainer',
            'ZedEntityManager' => '\\%s\\Zed\\%s\\Persistence\\%sEntityManager',
            'ZedRepository' => '\\%s\\Zed\\%s\\Persistence\\%sRepository',
        ];
    }
}
