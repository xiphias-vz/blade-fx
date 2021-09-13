<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationGui\Communication\Controller;

use Generated\Shared\Transfer\NavigationTreeTransfer;
use phpDocumentor\GraphViz\Exception;
use Spryker\Zed\NavigationGui\Communication\Controller\TreeController as SpryTreeController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Zed\NavigationGui\Communication\NavigationGuiCommunicationFactory getFactory()
 * @method \Spryker\Zed\NavigationGui\Persistence\NavigationGuiQueryContainerInterface getQueryContainer()
 */
class TreeController extends SpryTreeController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateHierarchyAction(Request $request)
    {
        $navigationTreeData = $request->request->get(self::PARAM_NAVIGATION_TREE);

        if (!$navigationTreeData) {
            return $this->jsonResponse([
                'success' => false,
                'message' => 'Incorrect request data.',
            ]);
        }

        $navigationTreeTransfer = new NavigationTreeTransfer();
        $navigationTreeTransfer->fromArray((array)$navigationTreeData);

        $this->getFactory()
            ->getNavigationFacade()
            ->updateNavigationTreeHierarchy($navigationTreeTransfer);

        // Twig cache warmer
        $dir = getcwd();
        try {
            $cnt = 0;
            while (getcwd() != "/data" && $cnt < 4) {
                chdir("../");
                $cnt++;
            }
            $twigFacade = $this->getFactory()->getTwigFacade();
            $twigFacade->warmUpTwigCache();
        } catch (Exception $ex) {
        } finally {
            chdir($dir);
        }

        return $this->jsonResponse([
            'success' => true,
            'message' => 'Navigation tree updated successfully.',
        ]);
    }
}
