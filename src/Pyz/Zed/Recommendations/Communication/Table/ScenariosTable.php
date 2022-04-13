<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Table;

use Orm\Zed\Recommendations\Persistence\Map\PyzRecommendationScenariosTableMap;
use Pyz\Zed\Gui\Communication\Table\AbstractTable;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

/**
 * @method \Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory getFactory()
 */
class ScenariosTable extends AbstractTable
{
    public const COL_ACTIONS = 'actions';

    /**
     * @var \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @param \Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface $recommendationsQueryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $recommendationsQueryContainer)
    {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    protected function configure(TableConfiguration $config): TableConfiguration
    {
        $config->setHeader([
            PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS => 'Scenario ID',
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID => 'Scenario Name',
            PyzRecommendationScenariosTableMap::COL_ACTIVE => 'Status',
            static::COL_ACTIONS => 'actions',
        ]);

        $config->setRawColumns([
            static::COL_ACTIONS,
        ]);

        $config->setSearchable([
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID,
        ]);

        $config->setSortable([
            PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS,
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID,
            PyzRecommendationScenariosTableMap::COL_ACTIVE,
        ]);

        return $config;
    }

    /**
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config): array
    {
        $query = $this
            ->recommendationsQueryContainer
            ->getPyzRecommendationsScenarioQuery();

        $queryResult = $this->runQuery($query, $config);

        $scenariosCollection = [];
        foreach ($queryResult as $item) {
            $scenariosCollection[] = [
                PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS => $item[PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS],
                PyzRecommendationScenariosTableMap::COL_SCENARIO_ID => $item[PyzRecommendationScenariosTableMap::COL_SCENARIO_ID],
                PyzRecommendationScenariosTableMap::COL_ACTIVE => $this->generateStatusLabels($item),
                static::COL_ACTIONS => implode(' ', $this->createActionColumn($item)),
            ];
        }

        return $scenariosCollection;
    }

    /**
     * @param $item
     *
     * @return array
     */
    protected function createActionColumn($item): array
    {
        $urls = [];

        $urls[] = $this->generateEditButton(
            Url::generate('/recommendations/scenario/edit', [
                'id' => $item[PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS],
            ]),
            'Edit'
        );

        $urls[] = $this->generateRemoveButton(
            Url::generate('/recommendations/delete-scenario', [
                'id' => $item[PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS],
            ]),
            'Delete'
        );

        return $urls;
    }

    /**
     * @param array $item
     *
     * @return string
     */
    protected function generateStatusLabels(array $item): string
    {
        if ($item[PyzRecommendationScenariosTableMap::COL_ACTIVE]) {
            return $this->generateLabel('Active', 'label-info');
        }

        return $this->generateLabel('Inactive', 'label-danger');
    }
}
