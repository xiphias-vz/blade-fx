class Global {
    async init() {
        const JSON_PATH = './assets/json/regions.json';
        const JSON_PATH_SHOPS = './assets/json/shops.json';
        const JSON_PATH_LINKS = './assets/json/shopLinks.json';
        this.input = document.getElementsByClassName('js-zip')[0];
        this.button = document.getElementsByClassName('js-submit-button')[0];
        this.error = document.getElementsByClassName('js-error')[0];
        this.select = document.getElementsByClassName('select-store')[0];
        this.regions = await this.getJson(JSON_PATH);
        this.shops = await this.getJson(JSON_PATH_SHOPS);
        this.links = await this.getJson(JSON_PATH_LINKS);

        this.mapEvents();
    }

    mapEvents() {
        this.error.addEventListener('click', () => this.hideErrorMessage());
        this.select.addEventListener('onchange', () => this.getWebAddress());
    }

    getWebAddress() {
        this.showErrorMessage();
    }

    async getJson(url) {
        const response = await fetch(url);

        return response.json();
    }

    validateValue() {
        const val = this.input.value;
        const length = this.input.value.length;
        const isnum = /^\d+$/.test(val);
        if(!isnum || length > this.limit) {
            this.input.value = val.substring(-0, length - 1);
        }
    }

    validateZip(regions) {
        const inputValue = this.input.value;
        const region = Object.keys(regions).find(region => inputValue === region);

        if (!region) {
            this.showErrorMessage();

            return;
        }

        const href = window.location.href;
        const storeUrlPart = Object.values(regions[region]);
        window.location.href = href.replace('welcome.', `${storeUrlPart}.`);
    }

    hideErrorMessage() {
        this.error.classList.add('is-hidden');
    }

    showErrorMessage() {
        this.error.classList.remove('is-hidden');
    }
}

document.addEventListener("DOMContentLoaded", new Global().init());
