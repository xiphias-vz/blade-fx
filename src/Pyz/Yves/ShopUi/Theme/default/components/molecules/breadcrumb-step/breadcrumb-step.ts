import Component from 'ShopUi/models/component';

export default class BreadcrumbStep extends  Component {
    protected readyCallback(): void {
    }

    protected init() {
        this.removeLinkToForwardedBreadCrumbs();
    }

    protected removeLinkToForwardedBreadCrumbs() {
        let breadCrumbHolder = this.parentElement;
        let activeBreadCrumb = breadCrumbHolder.querySelector('.breadcrumb-step--active');
        if(!activeBreadCrumb)
            return

        let nextSibling = activeBreadCrumb.nextElementSibling;
        while (nextSibling) {
            let breadCrumbLink = nextSibling.querySelector('a');
            if(breadCrumbLink !== null) {
                breadCrumbLink.removeAttribute('href');
                breadCrumbLink.style.cursor = 'auto';
            }
            nextSibling = nextSibling.nextElementSibling;
        }

    }

}
