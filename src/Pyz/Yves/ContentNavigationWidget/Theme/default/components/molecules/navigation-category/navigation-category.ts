window.addEventListener('DOMContentLoaded', (e) => {
    const filterSection = document.querySelector('.filter-section');
    if(!filterSection) {
        return;
    }
    let currentUrl = location.pathname;

    if(currentUrl.includes('/de/outlet')) {
        const filterCategoryLink = filterSection.querySelectorAll('.filter-category .filter-category__item--level-1 .filter-category__link');
        for(let i = 0; i < filterCategoryLink.length; i++) {
            let urlCategoryLink = filterCategoryLink[i].getAttribute('data-url');
            let categorySalesLink = '/de/outlet/'+ urlCategoryLink.substring(urlCategoryLink.indexOf("/") + 4);
            filterCategoryLink[i].setAttribute('data-url', categorySalesLink);
        }
    }
    else if(currentUrl.includes('/cs/outlet')) {
        const filterCategoryLink = filterSection.querySelectorAll('.filter-category .filter-category__item--level-1 .filter-category__link');
        for(let i = 0; i < filterCategoryLink.length; i++) {
            let urlCategoryLink = filterCategoryLink[i].getAttribute('data-url');
            let categorySalesLink = '/cs/outlet'+ urlCategoryLink.substring(urlCategoryLink.indexOf("/") + 4);
            filterCategoryLink[i].setAttribute('data-url', categorySalesLink);
        }
    }
})
