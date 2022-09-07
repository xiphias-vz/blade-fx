

# BLADE FX

## Spryker Integration Guide

### Step 1: Installation
Run the following command in Docker CLI
```bash 
composer require xiphias-vz/blade-fx      
```
\
Alternatively, you can add the following lines to the root *composer.json* file of your Spryker Shop to install specific branches of GitHub repo.
```json
{      
  "require": {      
    "xiphias-vz/blade-fx": "dev-BladeFx_NH"      
  },      
  "repositories": [      
    {      
      "type": "vcs",      
      "url": "https://github.com/xiphias-vz/blade-fx.git"      
    }      
  ]      
}      
```
In the *"require"* field add *"xiphias-vz/blade-fx"* followed by the branch name. Note that branch name has to be prefixed with *dev-*.    
In the *"repositories"* field add the link to the repository and specify type.

After changing *composer.json* file, run the following command:
```bash    
composer update xiphias-vz/blade-fx      
``` 
\
If the installation was successful, you should now see *xiphias-vz/blade-fx* in the *vendor* folder of your project.

You can run the following command to generate IDE auto-completion and transfer objects.
```bash
console dev:ide-auto-completion:generate
console transfer:generate
```
### Step 2: Configuration
In *config_default.php* file register BladeFxSpryker namespace
```php
$config[KernelConstants::CORE_NAMESPACES] = [      
  [...]     
  'BladeFxSpryker'      
];    
```
and add following lines:
```php
use BladeFxSpryker\Shared\BladeFx\BladeFxConstants;    
    
$config[BladeFxConstants::BLADE_FX_REPORTS_HOST] = 'https://saas-reports.blade-fx.com';      
$config[BladeFxConstants::BLADE_FX_X_THIS_HOST] = "http://x-this.com/";      
      
$config[BladeFxConstants::BLADE_FX_SERVICE] = [      
  BladeFxConstants::BLADE_FX_WEB_SERVICE_FILE => $config[BladeFxConstants::BLADE_FX_REPORTS_HOST] . '/Servisi/WebData.asmx',      
  BladeFxConstants::BLADE_FX_USER_INFO => $config[BladeFxConstants::BLADE_FX_X_THIS_HOST] . 'GetUserInfo',      
  BladeFxConstants::BLADE_FX_REPORT_LIST => $config[BladeFxConstants::BLADE_FX_X_THIS_HOST] . 'GetReportListNAtt',      
  BladeFxConstants::BLADE_FX_URL_PRINT_OUT_FILE => '/out/Printout.aspx',      
  BladeFxConstants::BLADE_FX_URL_MOBILE_FILE => '/out/Mobile.aspx'      
];    
```
### Step 3: Integration with Sales module
To integrate BladeFx with Sales module, BladeFx has to be added to Sales as a dependency. To do so, first add following configuration to *Pyz/Sales/SalesConfig.php*
```php
class SalesConfig extends SprykerSalesConfig      
{      
  public const PARAM_ID_SALES_ORDER = 'id-sales-order';      
  public const PARAM_ID_REPORT = 'id-report';      
  public const PARAM_ORDER_REFERENCE = 'order-reference';    
}    
```
Then add BladeFxFacade to *Pyz/Sales/SalesDependencyProvider.php*
```php
public function provideCommunicationLayerDependencies(Container $container): Container      
{      
  $container = parent::provideCommunicationLayerDependencies($container);      
  return $this->addBladeFxFacade($container);      
}      
    
protected function addBladeFxFacade(Container $container): Container      
{      
  $container->set(static::BLADE_FX_FACADE, function (Container $container) {      
  return $container->getLocator()->bladeFx()->facade();      
 });      
  return $container;      
}    
```
In *Pyz/Sales/Communication/SalesCommunicationFactory.php* import required classes
```php
use BladeFxSpryker\Zed\Sales\Communication\Tabs\SalesOrderFormTabs;
use BladeFxSpryker\Zed\Sales\Communication\Table\SalesOrderBladeFxReportsTable;
```
and add following methods
```php
/**      
 * @return \BladeFxSpryker\Zed\BladeFx\Business\BladeFxFacadeInterface      
 */      
public function getBladeFxFacade(): BladeFxFacadeInterface      
{      
  return $this->getProvidedDependency(SalesDependencyProvider::BLADE_FX_FACADE);      
}      
      
/**      
 * @return \Spryker\Zed\Gui\Communication\Tabs\TabsInterface      
 */      
public function createSalesOrderFormTabs(): TabsInterface      
{      
  return new SalesOrderFormTabs();      
}      
      
/**      
 * @param string $orderReference      
 * @param int $idSalesOrder    
 *     
 * @return \BladeFxSpryker\Zed\Sales\Communication\Table\SalesOrderBladeFxReportsTable      
 */      
public function createSalesOrderBladeFxReportsTable(string $orderReference, int $idSalesOrder): SalesOrderBladeFxReportsTable      
{      
  return new SalesOrderBladeFxReportsTable(      
  $this->getBladeFxFacade(),      
  $orderReference,      
  $idSalesOrder      
  );      
}    
```
Finally, in  *Pyz/Sales/Communication/Controller/DetailController.php* you can create *SalesOrderFormTabs* and *SalesOrderBladeFxReportsTable* and return them in *DetailController::indexAction()*
```php
/**      
 * @param \Symfony\Component\HttpFoundation\Request $request    
 *     
 * @return array|\Symfony\Component\HttpFoundation\RedirectResponse      
 */      
public function indexAction(Request $request)      
{      
  $result = parent::indexAction($request);      
      
  $idSalesOrder = $this->castId($request->query->getInt(SalesConfig::PARAM_ID_SALES_ORDER));      
  $orderReference = $result["order"]->getOrderReference();      
      
  return array_merge([      
  'orderTabs' => $this->getFactory()->createSalesOrderFormTabs()->createView(),      
  'salesOrderBladeFxReportsTable' => $this->getFactory()->createSalesOrderBladeFxReportsTable($orderReference, $idSalesOrder)->render(),      
 ], $result);      
}    
```
and add DetailController::orderBladeFxTableAction()
```php
/**      
 * @param \Symfony\Component\HttpFoundation\Request $request    
 *     
 * @return \Symfony\Component\HttpFoundation\JsonResponse      
 */      
public function orderBladeFxTableAction(Request $request): JsonResponse      
{      
  $orderReference = $request->query->get(SalesConfig::PARAM_ORDER_REFERENCE);      
  $idSalesOrder = $this->castId($request->query->get(SalesConfig::PARAM_ID_SALES_ORDER));      
      
  $table = $this->getFactory()->createSalesOrderBladeFxReportsTable($orderReference, $idSalesOrder);      
      
  return $this->jsonResponse(      
  $table->fetchData()      
 );    
}    
```
### Step 4: Adding BladeFx Reports to Back Office Navigation
Before building navigation in Back Office, you should first build routes that were added in newly installed package. By default, Spryker can not use Controllers that are part of 3rd party packages so you need to add the path where the controller can be found. In *Pyz/Zed/Router/RouterConfig::getControllerDirectories()*
add the path to BladeFx:
```php
/**  
 * @return array  
 */  
public function getControllerDirectories(): array  
{  
  $controllerDirectories = parent::getControllerDirectories();  
  
  $controllerDirectories[] = sprintf('%s/spryker-sdk/*/src/*/Zed/*/Communication/Controller/', APPLICATION_VENDOR_DIR);  
  $controllerDirectories[] = sprintf('%s/spryker-eco/*/src/*/Zed/*/Communication/Controller/', APPLICATION_VENDOR_DIR);  
  $controllerDirectories[] = sprintf('%s/xiphias-vz/*/src/*/Zed/*/Communication/Controller/', APPLICATION_VENDOR_DIR);  
  
  return array_filter($controllerDirectories, 'glob');  
}
```
and run the commands
```bash
console cache:empty-all
console cache:class-resolver:build
console router:cache:warm-up:backoffice
```

To add BladeFx Reports to Back Office navigation add the following xml to *config/Zed/navigation.xml*
```xml
<config>
  [...]
  <reports>  
    <label>Reports</label>  
	<title>Reports</title>  
	<bundle>blade-fx</bundle>  
	<icon>fa-book</icon>  
	<controller>index</controller>  
	<action>index</action>  
	<visible>1</visible>  
  </reports>
</config>
```
and run the command
```bash
console navigation:build-cache
```
New navigation item with the name Reports should now appear in Back Office.

### Step 5: Adding Reports Tab to Order Overview
To add Reports tab to order overview page in Back Office few adjustments to Sales Presentation layer need to be made. First create a new file named *order-details.twig* and place it in *Pyz/Sales/Presentation/Orders/_partials/* folder. The folder doesn't exist in Spryker so you should create it. In the contents of the *order-details.twig* file paste the content block from *Pyz/Sales/Presentation/Detail/index.twig*. *order-details.twig* should now look something like this:
```twig
{% block content %}  
  
  <div id="order-overview">{% include '@Sales/Detail/boxes/order-overview.twig' %}</div>  
    <div id="order-custom-reference">{% include '@OrderCustomReferenceGui/Sales/order-custom-reference.twig' ignore missing with {  
  data: {  
  backUrl: changeStatusRedirectUrl,  
  order: order,  
  },  
  } only %}</div>  
    <div id="customer">{% include '@Sales/Detail/boxes/customer.twig' %}</div>  
    <div id="items">{% include [  
  '@ShipmentGui/Sales/boxes/items.twig',  
  '@Sales/Detail/boxes/items.twig'  
  ] %}</div>  
    {% for blockName, externalBlock in blocks %}  
 {% if externalBlock %}  
  <div id="{{ blockName }}">{{ externalBlock | raw }}</div>  
        {% endif %}  
 {% endfor %}  
  <div id="comments">{% include '@Sales/Detail/boxes/comments.twig' %}</div>  
  
{% endblock %}  
  
{% block head_css %}  
  <link rel="stylesheet" href="{{ assetsPath('css/spryker-zed-sales-main.css') }}">  
{% endblock %}
```
Note that depending on your project, the content block will look differently then provided example. After pasting the content block in *order-details.twig*, remove it form *Pyz/Sales/Presentation/Detail/index.twig* and replace it with following:
```twig
{% block content %}  
 {{ tabs(orderTabs, {  
  'orderTabs': orderTabs,  
  'salesOrderBladeFxReportsTable': salesOrderBladeFxReportsTable,  
  'eventsGroupedByItem': eventsGroupedByItem,  
  'events': events,  
  'eventsGroupedByShipment': eventsGroupedByShipment,  
  'distinctOrderStates': distinctOrderStates,  
  'order': order,  
  'orderItemSplitFormCollection': orderItemSplitFormCollection,  
  'groupedOrderItems': groupedOrderItems,  
  'changeStatusRedirectUrl': changeStatusRedirectUrl,  
  'tableColumnHeaders': tableColumnHeaders,  
  'tableColumnCellsContent': tableColumnCellsContent,  
  'add_comments': add_comments,  
  'blocks': blocks,  
  }) }}  
{% endblock %}
```
All the values in object provided as a second argument to *tabs()* in snippet above should be returned by  *Pyz/Sales/Communication/Controller/DetailContoller::indexAction()* so change the values accordingly.
For example, *indexAction()* of *DetailController* paired with snippet above returns the following array:
```php
return array_merge([  
  'eventsGroupedByItem' => $eventsGroupedByItem,  
  'events' => $events,  
  'eventsGroupedByShipment' => $eventsGroupedByShipment,  
  'distinctOrderStates' => $distinctOrderStates,  
  'order' => $orderTransfer,  
  'orderItemSplitFormCollection' => $orderItemSplitFormCollection,  
  'groupedOrderItems' => $groupedOrderItems,  
  'changeStatusRedirectUrl' => $this->createRedirectLink($idSalesOrder),  
  'tableColumnHeaders' => $this->getFactory()->createOrderItemsTableExpander()->getColumnHeaders(),
  'tableColumnCellsContent' => $this->getFactory()->createOrderItemsTableExpander()->getColumnCellsContent($orderTransfer->getItems()),
  'orderTabs'  =>  $this->getFactory()->createSalesOrderFormTabs()->createView(),
  'salesOrderBladeFxReportsTable'  =>  $this->getFactory()->createSalesOrderBladeFxReportsTable($orderReference,  $idSalesOrder)->render(),
], $blockResponseData);
```
Keys of that array are keys and values of object that is passed as second argument to *tabs()* function in *Pyz/Sales/Presentation/Detail/index.twig.*
\
After adjusting the twigs, run the following command to generate cache for twig templates:
```bash
console twig:cache:warmer 
```
Reports tab should now be visible on order overview page.
