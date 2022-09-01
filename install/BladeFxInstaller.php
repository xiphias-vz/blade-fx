<?php

namespace BladeFxInstaller;

use Composer\Script\Event;
use Composer\Installer\PackageEvent;

class BladeFxInstaller
{
    public static function postPackageInstall(PackageEvent $event)
    {
        $installedPackage = $event->getOperation()->getPackage();
        copy("../src/Pyz/Zed/Sales/Presentation/ViewReport/index.twig", "data/src/Pyz/Zed/Sales/Presentation/ViewReport/index.twig");
    }
}
