function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isSearchPage() {
    return document.getElementsByTagName('ff-record-list').length > 0;
}

var indexCatalogPageCounter = 0;

document.addEventListener("ffReady", function (event) {
    const factfinder = event.factfinder;
    const eventAggregator = event.eventAggregator;
    const resultDispatcher = event.resultDispatcher;
    eventAggregator.addBeforeDispatchingCallback(function (event) {
        event["marketId"] = storeId;
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
                        filter : getParameterByName("filter"),
                        query: "*"
                    });
                } else {
                    if(getParameterByName("query")) {
                        eventAggregator.addFFEvent({
                            type: "search",
                            query: getParameterByName("query")
                        });
                    } else if (document.location.pathname.includes('/outlet')) {
                        eventAggregator.addFFEvent({
                            type: "search",
                            query: "*",
                            filter: "Sale:true"
                        });
                    } else if (document.location.search.includes('?filter')) {
                        eventAggregator.addFFEvent({
                            type: "navigation-search",
                            filter : getParameterByName("filter"),
                            query: "*"
                        });
                    } else {
                        eventAggregator.addFFEvent({
                            type: "navigation-search",
                            filter : "CategoryPath: " + document.title,
                            query: "*"
                        });
                    }
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

