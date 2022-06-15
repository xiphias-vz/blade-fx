window.addEventListener('DOMContentLoaded', (myEvent) => {
    let cookieInputField = document.querySelector('input[name="localStorageCookie"]');
    let cookieValue = getCookie('local_storage_cookie');
    let localStorageValue = localStorage.getItem('productItemsForSyncCounter');

    if (cookieValue === cookieInputField.value && localStorageValue !== cookieInputField.value) {
        localStorageValue = cookieInputField.value;
        localStorage.setItem('productItemsForSyncCounter', localStorageValue);
    }
});

function getCookie(name: string) {
    let cookieName: string = name + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    const arrayLength = cookieArray.length;

    for (let i = 0; i < arrayLength; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
}
