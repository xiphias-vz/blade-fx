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

function isOutlet() {
    return document.location.href.includes("/outlet") && !document.location.href.includes("query=*");
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

    eventAggregator.addBeforeDispatchingCallback(function (event) {
        factfinder.communication.globalSearchParameter["marketId"] = storeId;
        const isSearchEvent = event.type === "search";
        if (isSearchEvent && !isSearchPageUrl() && (!isOutlet() || (event.query != "" && event.query != "*"))) {
            event.cancel(); // prevents the request from being sent before redirecting

            ["channel", "version", "sid", "dispatchId"].forEach(function (param) {
                delete event[param];
            });

            const dict = factfinder.common.encodeDict(event);
            const params = factfinder.common.dictToParameterString(dict);

            window.location.href = '/de/search' + params;
        } else {
            if(indexCatalogPageCounter === 0 && isSearchPage()) {
                indexCatalogPageCounter++;
                if(ffCategoryFilter["Type"] === 'search' && !isOutlet()) {
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
                }
            }
        }
    });

    let isFfSnippetEnabled = document.querySelector('#ffSnippetEnabled');
    // const arrayOfRecommendedItems = document.querySelector('#arrayOfRecommendedItems');
    const arrayOfRecommendedItems = [`4001432058030`, `4001432058040`];
    if (isFfSnippetEnabled !== null && isFfSnippetEnabled !== undefined) {
        if(isFfSnippetEnabled.value === '1') {
            // console.log("FF SNIPPET JE ENABLED");
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
        } else {
            // console.log("NIje enabled FF snippet!!");
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

    resultDispatcher.addCallback('result', function (resultData) {
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

    resultDispatcher.addCallback("asn", function (asnData) {
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

            let currentUrl = location.pathname;
            if (currentUrl.includes('/de/outlet')) {
                title = changeTitleToAngebote;
            }
        }

            document.getElementById("searchResultCountTitle").innerText = title;
            document.title = title;
            factfinder.communication.globalCommunicationParameter.useUrlParameters = true;
            factfinder.communication.globalCommunicationParameter.onlySearchParams = true;

            indexCatalogPageCounter = indexCatalogPageCounter * 10;
    });
});

window.addEventListener("DOMNodeInserted", function (event) {
    if(event.relatedNode.localName == 'ff-record') {
        checkPictureAvailability(event.relatedNode);
        checkDiscountLabel(event.relatedNode, 'ff-record');
        checkOriginalAndDefaultPrices(event.relatedNode, 'ff-record');
        checkBrandIsSet(event.relatedNode, 'ff-record');
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
            if(el) el.style.display='none';
        }
    }
}, false);

function checkDiscountLabel(element) {
    el = element.getElementsByClassName('labelDiscount')[0];
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
                elDef.style.color = "#e60000";
            } else {
                elDef.style.color = "#111";
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
