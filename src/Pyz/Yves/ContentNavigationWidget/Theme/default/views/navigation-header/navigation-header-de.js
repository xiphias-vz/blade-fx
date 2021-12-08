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
    eventAggregator.addBeforeDispatchingCallback(function (event) {
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
                    eventAggregator.addFFEvent({
                        type: "search",
                        query: getParameterByName("query")
                    });
                }
            }
        }
    });
});

window.addEventListener("DOMNodeInserted", function (event) {
    if(event.relatedNode.localName == 'ff-record') {
        checkDiscountLabel(event.relatedNode);
        checkOriginalAndDefaultPrices(event.relatedNode);
        checkBrandIsSet(event.relatedNode);
    }
}, false);

function checkDiscountLabel(element) {
    el = element.getElementsByClassName('labelDiscount')[0];
    val = el.innerText.trim();
    if(val === "") val = "0";
    if(parseInt(val) === 0) el.style.display = "none";
}

function checkOriginalAndDefaultPrices(element) {
    elOrig = element.getElementsByClassName('record-list__amount record-list__amount--original')[0];
    elDef = element.getElementsByClassName('record-list__amount record-list__amount-red')[0];
    if(elOrig.innerText.trim() === elDef.innerText.trim()) elOrig.innerHTML = "";
    if(elDef.innerText.trim() === "") {
        elDef.innerHTML = "---";
        el = element.getElementsByClassName('record-list__info-more')[0];
        el.innerHTML = "---";
    } else if (!elDef.innerText.endsWith('€') && elDef.innerText !== '---') {
        elDef.innerText = elDef.innerText.replace('.', ',') + ' €';
        if(elOrig.innerText.length > 0) {
            elOrig.innerText = elOrig.innerText.replace('.', ',') + ' €';
            elDef.style.color = "red";
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


