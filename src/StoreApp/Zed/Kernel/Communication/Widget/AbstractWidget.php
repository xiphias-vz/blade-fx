<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Kernel\Communication\Widget;

// @codingStandardsIgnoreStart
use Spryker\Shared\Kernel\Container\GlobalContainer;
use Spryker\Shared\Kernel\Container\GlobalContainerInterface;
use Spryker\Yves\Kernel\ClientResolverAwareTrait;
use Spryker\Yves\Kernel\Dependency\Widget\WidgetInterface;
use Spryker\Yves\Kernel\Exception\MissingWidgetPluginException;
use Spryker\Yves\Kernel\Exception\ReadOnlyException;
use Spryker\Yves\Kernel\Widget\WidgetContainerAwareTrait;
use Spryker\Zed\Kernel\BundleConfigResolverAwareTrait;
use Spryker\Zed\Kernel\Communication\FactoryResolverAwareTrait;
// @codingStandardsIgnoreEnd
abstract class AbstractWidget implements WidgetInterface
{
    use WidgetContainerAwareTrait;
    use FactoryResolverAwareTrait;
    use ClientResolverAwareTrait;
    use BundleConfigResolverAwareTrait;

    protected const SERVICE_LOCALE = 'locale';

    /**
     * @var array
     */
    protected $parameters = [];

    /**
     * @param string $name
     *
     * @return bool
     */
    public function hasWidget(string $name)
    {
        return isset($this->widgets[$name]);
    }

    /**
     * @param string $name
     *
     * @throws \Spryker\Yves\Kernel\Exception\MissingWidgetPluginException
     *
     * @return string
     */
    public function getWidgetClassName(string $name)
    {
        if (!isset($this->widgets[$name])) {
            throw new MissingWidgetPluginException(sprintf(
                'Missing "%s" widget plugin. You need to register your sub-widgets in order to use them. You can use $this->addWidgets() and $this->addWidget() methods.',
                $name
            ));
        }

        return $this->widgets[$name];
    }

    /**
     * @param string $name
     * @param mixed $value
     *
     * @return $this
     */
    protected function addParameter(string $name, $value)
    {
        $this->parameters[$name] = $value;

        return $this;
    }

    /**
     * @return array
     */
    public function getParameters(): array
    {
        return $this->parameters;
    }

    /**
     * @param string $offset
     *
     * @return bool
     */
    public function offsetExists($offset): bool
    {
        return isset($this->parameters[$offset]) || array_key_exists($offset, $this->parameters);
    }

    /**
     * @param string $offset
     *
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return $this->parameters[$offset];
    }

    /**
     * @param string $offset
     * @param mixed $value
     *
     * @throws \Spryker\Yves\Kernel\Exception\ReadOnlyException
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        throw new ReadOnlyException('This is a read only object.');
    }

    /**
     * @param string $offset
     *
     * @throws \Spryker\Yves\Kernel\Exception\ReadOnlyException
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        throw new ReadOnlyException('This is a read only object.');
    }

    /**
     * @return \Spryker\Shared\Kernel\Container\GlobalContainerInterface
     */
    protected function getGlobalContainer(): GlobalContainerInterface
    {
        return new GlobalContainer();
    }

    /**
     * @return string
     */
    protected function getLocale(): string
    {
        return $this->getGlobalContainer()->get(static::SERVICE_LOCALE);
    }
}
