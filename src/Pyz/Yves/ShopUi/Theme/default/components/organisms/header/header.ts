document.getCartItemsListinProgress = false;
document.loadCartItemsList = async function() {
    if(document.CartItemsList === undefined && !document.getCartItemsListinProgress) {
        document.getCartItemsListinProgress = true;
        var url = document.location.origin + '/cart/get-cart-items';
        let response = await fetch(url);
        let json = await response.json();
        document.CartItemsList = json.cartItems;
        let products = [];
        const productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));
        Object.entries(document.CartItemsList).forEach((key, value) => {
            let isFF = false;
            if(productItemsForSyncCounter !== null) {
                const p = productItemsForSyncCounter.find(el => el[0] === key[0]);
                if(p !== undefined) {
                    isFF = p[2];
                }
            }
            products.push([key[0], key[1], isFF]);
        });

        localStorage.setItem('productItemsForSyncCounter', JSON.stringify(products));
    }
}

async function checkCartItemsIsLoaded(_callback) {
    if(await _callback()) {
        return true;
    }
    return await checkCartItemsIsLoaded(async function() { return document.CartItemsList !== undefined});
}

document.getCartItemCount = async function(sku) {
    if(!document.getCartItemsListinProgress) {
        await document.loadCartItemsList();
    }
    await checkCartItemsIsLoaded(async function() { return document.CartItemsList !== undefined});

    if(document.CartItemsList[sku] === undefined) {
        return 0;
    }
    return document.CartItemsList[sku];
}

