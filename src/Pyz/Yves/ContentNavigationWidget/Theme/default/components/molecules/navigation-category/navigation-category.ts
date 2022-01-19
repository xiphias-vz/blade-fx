window.addEventListener('DOMContentLoaded', (e) => {
    const filterSection = document.querySelector('.filter-section');
    if(!filterSection) {
        return;
    }
    let currentUrl = location.pathname;
    let akceCheckbox = document.querySelector(".checkbox__input");

    if(currentUrl.includes('/de/outlet')) {
        const filterCategoryLink = filterSection.querySelectorAll('.filter-category .filter-category__item--level-1 .filter-category__link');
        for(let i = 0; i < filterCategoryLink.length; i++) {
            let urlCategoryLink = filterCategoryLink[i].getAttribute('data-url');
            let categorySalesLink = '/de/outlet/'+ urlCategoryLink.substring(urlCategoryLink.indexOf("/") + 4);
            filterCategoryLink[i].setAttribute('data-url', categorySalesLink);
        }
    }
    else if(currentUrl.includes('/cs/outlet') && akceCheckbox.checked == false) {
        akceCheckbox.checked = true;
    }
})
