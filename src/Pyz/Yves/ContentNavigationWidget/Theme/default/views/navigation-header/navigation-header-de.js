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

var indexCatalogPageCounter = 0;
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

            createLinksInBreadcrumbs(breadCrumbFFElement, breadCrumbUnorderedList, breadCrumbChild, childrenCount);
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
});


document.addEventListener("ffReady", function (event) {
    const factfinder = event.factfinder;
    const eventAggregator = event.eventAggregator;
    const resultDispatcher = event.resultDispatcher;

    eventAggregator.addBeforeDispatchingCallback(function (event) {
        factfinder.communication.globalSearchParameter["marketId"] = storeId;
        const isSearchEvent = event.type === "search" || event.type === "navigation-search";
        if (isSearchEvent && !isSearchPage()) {
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
                if(getParameterByName("navigation")=="true") {
                    eventAggregator.addFFEvent({
                        type: "navigation-search",
                        filter : ffCategoryFilter,
                        query: "*"
                    });
                } else {
                        if(window.history.state) {
                            url = window.history.state.searchResult.searchParams;
                            if(getParameterByName("filter", url).length > 0) {
                                eventAggregator.addFFEvent({
                                    type: "navigation-search",
                                    filter : getParameterByName("filter", url),
                                    query: getParameterByName("query", url)
                                });
                            } else {
                                eventAggregator.addFFEvent({
                                    type: "search",
                                    query: getParameterByName("query", url)
                                });
                            }
                        } else {
                            if(ffCategoryFilter.startsWith("Q:")) {
                                eventAggregator.addFFEvent({
                                    type: "search",
                                    query: ffCategoryFilter.slice(2)
                                });
                            } else {
                                eventAggregator.addFFEvent({
                                    type: "navigation-search",
                                    filter: ffCategoryFilter,
                                    query: "*"
                                });
                            }
                        }
                }
            } else {
                if(event.type === "navigation-search" && indexCatalogPageCounter > 10) {
                    event.cancel();
                }
            }
        }
    });

    resultDispatcher.addCallback("asn", function (asnData) {
        var sum = 0;
        var title = "";
        var el = document.getElementById("searchResultCount");
        if (el) {
            if(asnData[0].selectedElements.length > 0) {
                var data = asnData[0].selectedElements[asnData[0].selectedElements.length - 1];
                sum = data.recordCount;
                title = data.name;
            } else {
                for(i=0; i < asnData[0].elements.length; i++) {
                    sum = sum + asnData[0].elements[i].recordCount;
                }
                title = el.getAttribute('data-title') + ' ' + asnData[0].elements[0].__ngSearchParams.query;
            }
            searchResultText = el.getAttribute('data-text');
            searchResultText = searchResultText.replace('%numFound%', sum);
            el.innerText = searchResultText;
            document.getElementById("searchResultCountTitle").innerText = title;
            document.title = title;
            indexCatalogPageCounter = indexCatalogPageCounter * 10;
        }
    });
});

window.addEventListener("DOMNodeInserted", function (event) {
    if(event.relatedNode.localName == 'ff-record') {
        checkDiscountLabel(event.relatedNode, 'ff-record');
        checkOriginalAndDefaultPrices(event.relatedNode, 'ff-record');
        checkBrandIsSet(event.relatedNode, 'ff-record');
    } else if (event.relatedNode.localName == 'ff-suggest-item') {
        checkOriginalAndDefaultPrices(event.relatedNode, 'ff-suggest-item');
        addCommaAfterBrand(event.relatedNode);
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
        if(brands[0].length > 0) {
            if(!brands[0].textContent.includes(',')) {
                brands[0].textContent += ', ';
            }
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
            fullPath += "/" + step;
            breadCrumbChildCloneInStep.children[0].href = fullPath;
            newBreadCrumbWrapper.appendChild(breadCrumbChildCloneInStep);
        });
    }
}

function defaultBreadCrumb(newBreadCrumbWrapper, breadCrumbChildClone) {
    breadCrumbChildClone.children[0].textContent = " Alle produkte";
    breadCrumbChildClone.children[0].href = "/de/search";
    newBreadCrumbWrapper.appendChild(breadCrumbChildClone);
}

function refreshBreadCrumbSteps(newBreadCrumbWrapper, newBreadCrumbItem) {
    newBreadCrumbWrapper.replaceChildren(newBreadCrumbItem);
}
