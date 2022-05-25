function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isSearchPage() {
    return document.getElementsByTagName('ff-record-list').length > 0;
}

function isSearchPageUrl() {
    return document.location.href.includes("/search?");
}

function isSearchPageUrlWithoutQuestionMark() {
    return document.location.href.includes("/search");
}

function isOutlet() {
    return document.location.href.includes("/outlet") && !document.location.href.includes("query=*");
}

function isMyProducts() {
    return document.location.href.includes("/my-products") && !document.location.href.includes("query=*");
}

function isPageWithBreadcrumbs() {
    return document.getElementsByTagName('breadcrumb-step').length > 0;
}

var indexCatalogPageCounter = 0;
var productsPerPageCounter = 0;
document.addEventListener("DOMContentLoaded", function (event) {
    let breadCrumbFFElement = document.getElementsByTagName('ff-breadcrumb-trail')[0];
    let breadCrumbUnorderedList = document.querySelectorAll('ul.breadcrumb')[0];
    let breadCrumbChild;
    let childrenCount;

    if (breadCrumbUnorderedList !== undefined) {
        if (breadCrumbUnorderedList.childElementCount < 2) {
            breadCrumbChild = breadCrumbUnorderedList.children[0];
        }
        childrenCount = breadCrumbUnorderedList.childElementCount;
    }

    if (breadCrumbFFElement !== undefined) {
        breadCrumbFFElement.addEventListener("dom-updated", function(event) {
            if (breadCrumbUnorderedList !== undefined) {
                childrenCount = breadCrumbUnorderedList.childElementCount;
            }

            if(isPageWithBreadcrumbs()) {
                createLinksInBreadcrumbs(breadCrumbFFElement, breadCrumbUnorderedList, breadCrumbChild, childrenCount);
            }
        });
    }


    let saleGroupElement = document.querySelectorAll("#sale_group");
    let filterElement = document.querySelectorAll('ff-asn')[0];

    if(filterElement !== undefined) {
        filterElement.addEventListener("dom-updated", function(event) {
            if(saleGroupElement !== undefined) {
                let saleGroupElementChildren = saleGroupElement[0].children;
                if(saleGroupElementChildren !== undefined) {
                    let saleGroupSecondElement = saleGroupElementChildren[1];
                    if(saleGroupElementChildren.length === 2) {
                        saleGroupSecondElement.remove();
                    }
                }
            }
        });
    }

    let myDropdowns;
    let dropDownClick = document.querySelectorAll('div.dropbtn');
    if(dropDownClick !== undefined) {
        dropDownClick.forEach(ddClick => {
            ddClick.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                let parentOfDdClick = ddClick.parentElement;
                myDropdowns = parentOfDdClick.querySelector('div.myDropdown');
                if(myDropdowns !== undefined && myDropdowns !== null) {
                    myDropdowns.classList.toggle('show');
                }
            });
        });
    }

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    let selectedOptionText;
    let firstSelectedOption;
    let secondSelectedOption;
    let thirdSelectedOption;


    firstSelectedOption = Array.from(document.getElementsByClassName('pppOption24'));
    firstSelectedOption.forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            selectedOptionText = option.innerText;
            simulateClick(selectedOptionText);
            switchSelectedOptionInDropDown(option);
        });
    });

    secondSelectedOption = Array.from(document.getElementsByClassName('pppOption48'));
    secondSelectedOption.forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            selectedOptionText = option.innerText;
            simulateClick(selectedOptionText);
            switchSelectedOptionInDropDown(option);
        });
    });

    thirdSelectedOption = Array.from(document.getElementsByClassName('pppOption72'));
    thirdSelectedOption.forEach(option => {
        option.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            selectedOptionText = option.innerText;
            simulateClick(selectedOptionText);
            switchSelectedOptionInDropDown(option);
        });
    });
});

document.addEventListener("ffReady", function (event) {
    const factfinder = event.factfinder;
    const eventAggregator = event.eventAggregator;
    const resultDispatcher = event.resultDispatcher;

    const key = eventAggregator.addBeforeDispatchingCallback(function (event) {
        factfinder.communication.globalSearchParameter["marketId"] = storeId;
        const isSearchEvent = event.type === "search";
        if (isMyProducts() && isSearchPageUrl()) {
            clearSearchBoxValue();
        }

        if (isSearchEvent && !isSearchPageUrl() && ((!isOutlet() && !isMyProducts()) || (event.query != "" && event.query != "*"))) {
            redirectToFactFinderSearch(event);
        } else {
            if(indexCatalogPageCounter === 0 && isSearchPage()) {
                indexCatalogPageCounter++;
                if(ffCategoryFilter["Type"] === 'search' && !isOutlet() && !isMyProducts()) {
                    factfinder.communication.globalCommunicationParameter.onlySearchParams = true;
                    factfinder.communication.globalCommunicationParameter.useUrlParameters = true;
                }
                let ev = {
                    type: ffCategoryFilter["Type"],
                    filter : ffCategoryFilter["Filter"],
                    query: ffCategoryFilter["Query"],
                    page: ffCategoryFilter["Page"]
                };
                if (document.location.href.includes("utm_")) {
                    ev.utm_source = getParameterByName("utm_source");
                    ev.utm_medium = getParameterByName("utm_medium");
                    ev.utm_campaign = getParameterByName("utm_campaign");
                    ev.utm_content = getParameterByName("utm_content");
                    ev.utm_term = getParameterByName("utm_term");
                }

                eventAggregator.addFFEvent(ev);
            } else {
                if(event.type === "navigation-search" && indexCatalogPageCounter > 10) {
                    event.cancel();
                } else if (event.type === 'ppp') {
                    event.hitsPerPage = event.value;
                } else if (event.type === "search" && isMyProducts()) {
                    if (!location.pathname.includes('/de/my-products/search')) {
                        clearSearchBoxValue();

                        let queryParams = createQueryForRecommendedProducts(arrayOfRecommendedItems, false);

                        event.cancel(); // prevents the request from being sent before redirecting

                        ["channel", "version", "sid", "dispatchId"].forEach(function (param) {
                            delete event[param];
                        });

                        const dict = factfinder.common.encodeDict(event);
                        let params = factfinder.common.dictToParameterString(dict);

                        let queryPart = params.slice(0, 7);
                        let pageFlagPart = params.slice(7);


                        params = queryPart + queryParams + pageFlagPart;
                        if (params.endsWith("&")) {
                            params = params.substring(0, params.length - 1);
                        }

                        window.location.href = '/de/my-products/search' + params;
                    } else {
                        if (event.query === "" || event.query === "*") {
                            redirectToFactFinderSearch(event);
                        }
                    }
                }
            }
        }
    });

    let isFfSnippetEnabled = document.querySelector('#ffSnippetEnabled');
    let isUserLoggedIn = document.querySelector('#isUserLoggedIn');
    let customerRecoData = document.querySelector('#customerUserRecoData');
    let storeIdValue = document.querySelector('#storeId').value ?? 0;
    let arrayOfRecommendedItems = [];

    if (customerRecoData !== null && customerRecoData !== undefined && customerRecoData.value.length > 0) {
        arrayOfRecommendedItems = JSON.parse(customerRecoData.value);
        arrayOfRecommendedItems = arrayOfRecommendedItems[storeIdValue];
    }

    if (arrayOfRecommendedItems === undefined || arrayOfRecommendedItems === null) {
        arrayOfRecommendedItems = [];
    }

    if (isFfSnippetEnabled !== null && isFfSnippetEnabled !== undefined) {
        if(isFfSnippetEnabled.value === '1'
            && isUserLoggedIn.value === "true") {
            factfinder.communication.EventAggregator.addBeforeDispatchingCallback(e => {
                e.pushedArticleIds = arrayOfRecommendedItems;
            });

            factfinder.communication.EventAggregator.addBeforeHistoryPushCallback((result, event, url) => {
                    delete event.pushedArticleIds;
                    url = url.replace(/pushedArticleIds=[^&]*(&|$)/gi, ``);
                    factfinder.communication.Util.pushParameterToHistory(result, url, event);
                    return false;
                }
            );
        }
    }


    resultDispatcher.addCallback('ppp', function (pppData) {
        const number = 48;
        pppData.forEach(pppItem => {
            if (pppItem['value'] < number) {
                if (pppItem['value'] * 2 !== number) {
                    pppItem['value'] = pppItem['value'] * 2;
                }
            }
        });
    });

    resultDispatcher.addCallback('suggest', function(resultData) {
        resultData.forEach(item => {
            if(!item.attributes.ImageUrl.includes('/thumb_'))
            {
                item.attributes.ImageUrl = item.attributes.ImageUrl.replace('.com/', '.com/thumb_');
            }
        });
    });

    resultDispatcher.addCallback("asn", function (asnData) {
        if (isMyProducts() && isSearchPageUrlWithoutQuestionMark()) {
            clearSearchBoxValue();
            // window.history.replaceState(null, document.title, "/de/my-products");
        }

        if(asnData[1].name !== "Filter"){
            var filterTitle = {
                "name": "Filter",
                "elements": [
                    {
                        "searchParams": "",
                    }
                ],
                "selectedElements": [],
                "detailedLinks": 0,
                "unit": "",
                "decimalPlaces": 0,
                "type": "TEXT",
                "showPreviewImages": false,
                "filterStyle": "DEFAULT",
                "selectionType": "singleHideUnselected",
                "associatedFieldName": "Filter",
                "groupOrder": 5,
                "__associatedFieldNameV4": "Filter"
            }
            asnData.splice(1, 0, filterTitle);
            asnData.join();
        }

        var title = "";
        var el = document.getElementById("searchResultCount");
        if (el) {
            if (asnData[0] !== undefined) {
                if (asnData[0].selectedElements.length > 0) {
                    var data = asnData[0].selectedElements[asnData[0].selectedElements.length - 1];
                    title = data.name;
                } else {
                    title = el.getAttribute('data-title') + ' ' + asnData[0].elements[0].__ngSearchParams.query;
                }
            }
            var changeTitleToAngebote = document.getElementById('idGlossaryAngebote').value;
            var changeTitleToMyProducts = document.getElementById('idGlossaryMyProducts').value;

            let currentUrl = location.pathname;
            if (currentUrl.includes('/de/outlet')) {
                title = changeTitleToAngebote;
            } else if (currentUrl.includes('de/my-products')) {
                title = changeTitleToMyProducts;
            }
        }

        document.getElementById("searchResultCountTitle").innerText = title;
        document.title = title;
        factfinder.communication.globalCommunicationParameter.useUrlParameters = true;
        factfinder.communication.globalCommunicationParameter.onlySearchParams = true;

        indexCatalogPageCounter = indexCatalogPageCounter * 10;
    });

    resultDispatcher.addCallback("navigation", function (navigationData) {
        const channelName = document.querySelector('#ffChannelName');
        const storeId = document.querySelector('#storeId');

        let recordCount = 0;

        if (arrayOfRecommendedItems !== undefined) {
            recordCount = arrayOfRecommendedItems.length;
        }

        var searchParams = createSearchParamsForCustomCategory(arrayOfRecommendedItems);
        var targetUrl = createTargetUrlForCustomCategory(arrayOfRecommendedItems);

        var dynamicNavigation = {
            "searchParams": searchParams,
            "selected": false,
            "clusterLevel": 0,
            "previewImageURL": "/de/my-products",
            "associatedFieldName": "CategoryPathROOT",
            "implicitSelection": false,
            "name": "Meine Produkte",
            "recordCount": recordCount,
            "__ngSearchParams": {
                "query": "",
                "filters": [
                    {
                        "name": "CategoryPath",
                        "values": [
                            {
                                "value": [
                                    "Meine Produkte"
                                ],
                                "type": "or",
                                "exclude": false
                            }
                        ],
                        "substring": false
                    }
                ],
                "channel": channelName,
                "customParameters": [
                    {
                        "name": "endLevel",
                        "values": [
                            "2"
                        ],
                        "cacheIrrelevant": false
                    },
                    {
                        "name": "format",
                        "values": [
                            "json"
                        ],
                        "cacheIrrelevant": false
                    },
                    {
                        "name": "initialNavigation",
                        "values": [
                            "true"
                        ],
                        "cacheIrrelevant": false
                    },
                    {
                        "name": "key",
                        "values": [
                            "a9qjqJ0iTB"
                        ],
                        "cacheIrrelevant": false
                    },
                    {
                        "name": "startLevel",
                        "values": [
                            "0"
                        ],
                        "cacheIrrelevant": false
                    }
                ],
                "marketIds": [
                    storeId
                ]
            },
            "__TARGET_URL__": {
                "url": targetUrl,
                "isCustomized": false
            },
            "__SUB_ELEMENTS__": []
        };

        let elements = '';
        if (navigationData['searchResult']['groups'][0] !== undefined) {
            elements = navigationData['searchResult']['groups'][0]['elements'];
        }

        if (elements[0] !== undefined) {
            if (elements[0]['name'] !== 'Meine Produkte' && isUserLoggedIn.value === "true" && recordCount > 7) {
                elements.unshift(dynamicNavigation);
            }
        }

        clearSearchBoxValue();
    });

    resultDispatcher.addCallback('result', function (resultData) {
        clearSearchBoxValue();
        var sum = 0;
        var el = document.getElementById("searchResultCount");
        if (el) {
            if(resultData.resultCount !== undefined) {
                sum = resultData.resultCount;
            }
            searchResultText = el.getAttribute('data-text');
            searchResultText = searchResultText.replace('%numFound%', sum);
            el.innerText = searchResultText;
        }

        if (resultData.records !== undefined && resultData.records !== null) {
            resultData.records.forEach(item => {
                if (item.record !== undefined && item.record !== null) {
                    if(!item.record.ImageUrl.includes('/thumb_'))
                    {
                        item.record.ImageUrl = item.record.ImageUrl.replace('.com/', '.com/thumb_');
                    }
                }
            });
        }

        window.catalogList = [];
        let searchTerm = resultData.__ngSearchParams.query;
        let currencyIsoCode = document.querySelector('#currency_iso_code').value;
        let twoTimesHitFlag = localStorage.getItem('twoTimesHitFlag')

        if (!twoTimesHitFlag) {
            for (let i = 0; i < resultData.records.length; i++) {
                window.catalogList.push({
                    'name': resultData.records[i].record.Title,
                    'id': resultData.records[i].record.IdProductAbstract,
                    'sku': resultData.records[i].record.ArticleNumber + '_abstract',
                    'price': resultData.records[i].record.geoInformation[0].geoValues.Price.toString(),
                    'url' : resultData.records[i].record.ProductUrl,
                    'position': resultData.records[i].position.toString(),
                    'list': 'POP',
                });
            }
        }

        window.dataLayer = window.dataLayer || [];
        let impressions = window.catalogList;

        if (!twoTimesHitFlag) {
            if (impressions.length === 0) {
                window.dataLayer.push({
                    'event': 'zeroResultsSearch',
                    'searchTerm': searchTerm,
                    'searchResults': 0,
                });
            } else {
                window.dataLayer.push({
                    'event': 'eec.POP',
                    'ecommerce':
                        {
                            'currency': currencyIsoCode,
                            impressions,
                        }
                });
            }
            localStorage.setItem('twoTimesHitFlag', 'value');
        } else {
            localStorage.removeItem('twoTimesHitFlag');
        }
    });
});

window.addEventListener("DOMNodeInserted", function (event) {
    if(event.relatedNode.localName == 'ff-record') {
        checkPictureAvailability(event.relatedNode);
        checkDiscountLabel(event.relatedNode, 'ff-record');
        checkOriginalAndDefaultPrices(event.relatedNode, 'ff-record');
        checkBrandIsSet(event.relatedNode, 'ff-record');
        checkWeightPriceHasHyphen(event.relatedNode, 'ff-record');
        addParenthesisToGrundPreis(event.relatedNode, 'ff-record');
    } else if (event.relatedNode.localName == 'ff-suggest-item') {
        checkPictureAvailability(event.relatedNode);
        checkOriginalAndDefaultPrices(event.relatedNode, 'ff-suggest-item');
        addCommaAfterBrand(event.relatedNode);
    } else if (event.relatedNode.localName == 'ff-asn-group-element') {
        var treeElement = document.querySelector('ff-asn-group[filter-style="TREE"]');
        if(treeElement) {
            var el = treeElement.querySelector('div[data-container="removeFilter"]');
            if(el) el.style.display='none';
            el = treeElement.querySelector('ff-asn-group-element');
        }
     }
}, false);

function checkDiscountLabel(element) {
    el = element.getElementsByClassName('record-list__labelDiscount')[0];
    val = el.innerText.trim();
    if(val === "") val = "0";
    if(parseInt(val) === 0) el.style.display = "none";
}

function checkOriginalAndDefaultPrices(element, flag) {
    elOrig = flag === 'ff-record' ? element.getElementsByClassName('record-list__amount record-list__amount--original')[0] : element.getElementsByClassName('suggest__amount suggest__amount--original')[0];
    elDef = flag === 'ff-record' ? element.getElementsByClassName('record-list__amount record-list__amount-red')[0] : element.getElementsByClassName('suggest__amount suggest__amount-red')[0];
    if (elOrig !== undefined && elDef !== undefined) {
        if(elOrig.innerText.trim() === elDef.innerText.trim()) elOrig.innerHTML = "";
        if(elDef.innerText.trim() === "") {
            elDef.innerHTML = "---";
            if(flag === 'ff-record') {
                el = element.getElementsByClassName('record-list__info-more')[0];
                el.innerHTML = "---";
            }
        } else if (!elDef.innerText.endsWith('€') && elDef.innerText !== '---') {
            var p = parseFloat(elDef.innerText).toFixed(2).toString();
            elDef.innerText = p.replace('.', ',') + ' €';
            if(elOrig.innerText.length > 0) {
                var p2 = parseFloat(elOrig.innerText).toFixed(2).toString();
                elOrig.innerText = p2.replace('.', ',') + ' €';
                elDef.style.color = "#E30613";
            } else {
                elDef.style.color = "#373936";
                elOrig.style.display="none";
                if(flag === 'ff-suggest-item') {
                    elOrig.style.display = "none";
                    elDef.style.marginBottom = "0";
                }
            }
        }
    }
}

function checkBrandIsSet(element){
    el = element.getElementsByClassName('record-list__record-product-name')[0];
    text = el.innerText.trim();
    if(text.startsWith('-')){
        text = text.substring(1);
        el.innerText = text;
    }
}

function checkWeightPriceHasHyphen(element){
    el = element.getElementsByClassName('popNameExtension')[0];
    text = el.innerText.trim();
    if(text.startsWith('-')){
        text = text.substring(1);
        el.innerText = text;
    }
}

function addParenthesisToGrundPreis(element){
    let el = element.querySelector('.priceInfo');
    if(el !== undefined && el !== null){
        let text = el.innerText;
        if(text !== ""){
            text = text.trim();
            if(!text.startsWith('(')){
                text = "(" + text + ")";
                el.innerText = text;
            }
        }
    }
}

function toggleNavigationCategoriesMenu(ev){
    document.querySelector("button.js-header__navigation-trigger").click();
}

function toggleMobileNavigationCategoriesMenu(ev){
    var el = ev.parentElement.closest(".ffw-item-caption").nextSibling;
    if(el.classList.contains("ffw-item-container")){
        if(el.children.length < 1){
            document.querySelector(".header__navigation-top > button").click();
        }
    }
}

function addCommaAfterBrand(element) {
    let brands = element.querySelectorAll('span.suggest__brand');

    if (brands[0] !== undefined) {
        if(brands[0].textContent.trim().length > 0) {
            if(!brands[0].textContent.includes(',')) {
                brands[0].textContent = brands[0].textContent.trim() + ', ';
            }
        }else{
            brands[0].style.display = "none";
        }
    }
}

function createLinksInBreadcrumbs(ffElement, newBreadCrumbWrapper, newBreadCrumbItem, childrenCount) {
    let breadCrumbChildClone = document.importNode(newBreadCrumbItem, true);
    let ffBreadCrumbItem = ffElement.querySelectorAll('ff-breadcrumb-trail-item[type=filter]')[0];

    let steps = '';
    if (ffBreadCrumbItem !== undefined) {
        const bciText = ffBreadCrumbItem.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
        steps = bciText.length > 0 ? bciText.split('/') : '';
        refreshBreadCrumbSteps(newBreadCrumbWrapper, newBreadCrumbItem);

        breadCrumbSteps(steps, newBreadCrumbWrapper, newBreadCrumbItem);
    } else {
        if (childrenCount !== 1) {
            refreshBreadCrumbSteps(newBreadCrumbWrapper, newBreadCrumbItem);
        }
        defaultBreadCrumb(newBreadCrumbWrapper, breadCrumbChildClone);
    }
}


function breadCrumbSteps(steps, newBreadCrumbWrapper, newBreadCrumbItem) {
    const stepsLength = steps.length;
    let fullPath = "/de";

    if(stepsLength > 0) {
        steps.forEach(step =>  {
            step = step.trim();
            let breadCrumbChildCloneInStep = document.importNode(newBreadCrumbItem, true);
            breadCrumbChildCloneInStep.children[0].textContent = step;
            step = step.toLowerCase();
            step = step.replaceAll(' ', '-');
            fullPath += "/" + step;
            breadCrumbChildCloneInStep.children[0].href = fullPath;
            newBreadCrumbWrapper.appendChild(breadCrumbChildCloneInStep);
        });
    }
}

function defaultBreadCrumb(newBreadCrumbWrapper, breadCrumbChildClone) {
    var navigationAlleProdukte = document.getElementById('alleProdukteID').value;
    breadCrumbChildClone.children[0].textContent = navigationAlleProdukte;
    breadCrumbChildClone.children[0].href = "/de/search";
    newBreadCrumbWrapper.appendChild(breadCrumbChildClone);
}

function refreshBreadCrumbSteps(newBreadCrumbWrapper, newBreadCrumbItem) {
    newBreadCrumbWrapper.replaceChildren(newBreadCrumbItem);
}


function simulateClick(text) {
    const ffDropdown = document.querySelectorAll('ff-products-per-page-dropdown')[0];
    const dropDownDiv = ffDropdown.querySelector('div.ffw-ppp-dropdown-container');
    const pppItems = dropDownDiv.querySelectorAll('ff-products-per-page-item');

    pppItems.forEach(item => {
        let innerDiv = item.querySelector('div');
        if (text === innerDiv.innerText.trim()) {
            item.click();
        }
    });
}

function switchSelectedOptionInDropDown(element) {
    let allDivs = document.querySelectorAll('div.products-per-page-custom');
    allDivs.forEach(dropDownDiv => {
        let allSpans = dropDownDiv.querySelectorAll('div.myDropdown > span');
        if (allSpans !== undefined) {
            allSpans.forEach(span => {
                span.classList.remove('selected');
            });
            allSpans.forEach(span => {
                if (span.innerText === element.innerText) {
                    span.classList.add('selected');
                }
            });
        }

        let buttonDiv = dropDownDiv.querySelector('div.dropbtn');
        if (buttonDiv !== undefined) {
            buttonDiv.innerText = element.innerText;
        }
    });
}

function checkPictureAvailability(element) {
    let defaultUrl = '';
    const defaultUrlInputField = document.querySelector('#defaultUrlToTheBoxPicture');
    if (defaultUrlInputField !== undefined && defaultUrlInputField !== null) {
        defaultUrl = defaultUrlInputField.value;
    }

    let picture = element.querySelector('img');
    if (picture !== undefined && picture !== null) {
        if (picture.src !== null && picture.src !== undefined) {
            picture.onerror = function () {
                if(picture.src.includes('/thumb_'))
                {
                    picture.src = picture.src.replace('thumb_', '');
                    picture.setAttribute("data-src", picture.src);
                } else {
                    if (defaultUrl !== '') {
                        picture.src = defaultUrl;
                        picture.setAttribute("data-src", picture.src);
                    }
                }
            }
        }
    }
}

function createSearchParamsForCustomCategory(arrayOfRecommendedItems) {
    const channelName = document.querySelector('#ffChannelName');
    var storeId = document.querySelector('#storeId');

    var searchParamsUrlPrefix = 'https://globus-sb.fact-finder.de/fact-finder/rest/v4/search/' + channelName.value + '?query=';
    var searchParamsUrlSufix = '&marketId=' + storeId.value + '&endLevel=2&format=json' + '&initialNavigation=true&startLevel=0';;

    let productsForQuery = createQueryForRecommendedProducts(arrayOfRecommendedItems, false);

    return searchParamsUrlPrefix + productsForQuery + searchParamsUrlSufix;
}

function createTargetUrlForCustomCategory(arrayOfRecommendedItems) {
    const storeId = document.querySelector('#storeId');
    const baseUrl = window.location.origin;

    var searchParamsUrlPrefix = baseUrl + '/de/search?query=';
    var searchParamsUrlSufix = '&marketId=' + storeId.value + '&endLevel=2&initialNavigation=true&startLevel=0';

    let productsForQuery = createQueryForRecommendedProducts(arrayOfRecommendedItems, false);

    return searchParamsUrlPrefix + productsForQuery + searchParamsUrlSufix;
}

function createQueryForRecommendedProducts(arrayOfRecommendedItems, usePipes) {
    let productsForQuery = '';
    const pipes = usePipes === true ? '||' : '+%7C%7C+';
    if (arrayOfRecommendedItems !== undefined) {
        arrayOfRecommendedItems.forEach(item => {
            productsForQuery += item + pipes
        });

        if (usePipes) {
            productsForQuery = productsForQuery.substring(0, productsForQuery.length - 2);
        } else {
             productsForQuery = productsForQuery.substring(0, productsForQuery.length - 8);
        }
    }

    productsForQuery += "&log=my_products";

    return productsForQuery;
}

function clearSearchBoxValue() {
    let ffSearchBox = document.querySelector('ff-searchbox > input');
    if (isMyProducts()) {
        if(ffSearchBox !== undefined && ffSearchBox !== null) {
            if(ffSearchBox.value !== '') {
                ffSearchBox.value = '';
            }
        }
    }
}

function redirectToFactFinderSearch(event) {
    event.cancel(); // prevents the request from being sent before redirecting

    ["channel", "version", "sid", "dispatchId"].forEach(function (param) {
        delete event[param];
    });

    const dict = factfinder.common.encodeDict(event);
    const params = factfinder.common.dictToParameterString(dict);

    window.location.href = '/de/search' + params;
}
