window.addEventListener('DOMContentLoaded', (e) => {
    const navigationList = document.querySelector('#product-category-list');
    if(!navigationList) {
        return;
    }
    const navigationLinks = navigationList.querySelectorAll('.navigation-multilevel-node__link--lvl-1 a');
    let currentUrl = location.pathname;

    if(currentUrl.includes('/de/outlet')) {
        for(let i = 0; i < navigationLinks.length; i++) {
            let categoryName = navigationLinks[i].href.substring(navigationLinks[i].href.lastIndexOf('/') + 1);
            if(categoryName !== 'outlet') {
                navigationLinks[i].href = '/de/outlet' +'/'+ categoryName;
            }
        }
    }
})
