window.addEventListener('DOMContentLoaded', (customEvent) => {
    let headerNavigationCz = <HTMLElement>document.getElementsByClassName('header__navigation-main-CZ')[0];
    headerNavigationCz.addEventListener('mouseleave', () => {
        headerNavigationCz.classList.add('is-hidden');
    });

    window.onclick = function (event){
        if (!event.target.matches('.js-header__navigation-trigger') &&
            !event.target.matches('.header__products-button-text') &&
            !event.target.matches('.js-header__navigation-target') &&
            !event.target.matches('use[href="#:shop"]') &&
            !event.target.matches('use[href="#:shop-filled"]')) {
            if (!headerNavigationCz.classList.contains('is-hidden')) {
                headerNavigationCz.classList.add('is-hidden');
            }
        }
    }
});
