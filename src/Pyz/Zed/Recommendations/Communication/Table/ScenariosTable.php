<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Table;

use Pyz\Zed\Recommendations\Communication\RecommendationsCommunicationFactory;
use Spryker\Service\UtilText\Model\Url\Url;
use Orm\Zed\Recommendations\Persistence\Map\PyzRecommendationScenariosTableMap;
use Pyz\Zed\Gui\Communication\Table\AbstractTable;
use Pyz\Zed\Recommendations\Persistence\RecommendationsQueryContainerInterface;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

/**
 * @method RecommendationsCommunicationFactory getFactory()
 */
class ScenariosTable extends AbstractTable
{
    public const COL_ACTIONS = 'actions';

    /**
     * @var RecommendationsQueryContainerInterface
     */
    protected $recommendationsQueryContainer;

    /**
     * @param RecommendationsQueryContainerInterface $recommendationsQueryContainer
     */
    public function __construct(RecommendationsQueryContainerInterface $recommendationsQueryContainer)
    {
        $this->recommendationsQueryContainer = $recommendationsQueryContainer;
    }

    /**
     * @param TableConfiguration $config
     *
     * @return TableConfiguration
     */
    protected function configure(TableConfiguration $config): TableConfiguration
    {
        $config->setHeader([
            PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS => 'Scenario ID',
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID => 'Scenario Name',
            PyzRecommendationScenariosTableMap::COL_HASH_ID => 'Hash ID',
            static::COL_ACTIONS => 'actions'
        ]);

        $config->setRawColumns([
            static::COL_ACTIONS,
        ]);

        $config->setSearchable([
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID
        ]);

        $config->setSortable([
            PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS,
            PyzRecommendationScenariosTableMap::COL_SCENARIO_ID,
            PyzRecommendationScenariosTableMap::COL_HASH_ID,
        ]);

        return $config;
    }

    /**
     * @param TableConfiguration $config
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
        foreach($queryResult as $item)
        {
            $scenariosCollection[] = [
                PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS => $item[PyzRecommendationScenariosTableMap::COL_ID_RECOMMENDATION_SCENARIOS],
                PyzRecommendationScenariosTableMap::COL_SCENARIO_ID => $item[PyzRecommendationScenariosTableMap::COL_SCENARIO_ID],
                PyzRecommendationScenariosTableMap::COL_HASH_ID => $item[PyzRecommendationScenariosTableMap::COL_HASH_ID],
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
}
