window.addEventListener('DOMContentLoaded', (e) => {
    let logoutLink = document.querySelector(getLogoutLinkClass());
    if (logoutLink !== undefined && logoutLink !== null) {
        logoutLink.addEventListener('click', (clickEvent) => {
            localStorage.removeItem('productItemsForSyncCounter');
        });
    }
});

function getLogoutLinkClass(): string {
    return '.de-logout';
}
