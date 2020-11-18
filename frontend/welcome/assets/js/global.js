class Global {
    async init() {
        const JSON_PATH = './assets/json/regions.json';
        const JSON_PATH_SHOPS = './assets/json/shops.json';
        this.input = document.getElementsByClassName('js-zip')[0];
        this.button = document.getElementsByClassName('js-submit-button')[0];
        this.error = document.getElementsByClassName('js-error')[0];
        this.select = document.getElementsByClassName('select-store')[0];
        this.regions = await this.getJson(JSON_PATH);
        this.shops = await this.getJson(JSON_PATH_SHOPS);

        this.createSelect(this.shops);
        this.mapEvents();
    }

    createSelect(shops) {
       const sel = document.getElementById('select-store');

       Object.entries(shops).forEach(entry => {
           const [key, value] = entry;
           const ke1 = key;
           const name = value.name;
           const el = document.createElement("option");
           el.value = ke1;
           el.text = name;

           sel.add(el);
        });
    }

    mapEvents() {
        this.error.addEventListener('click', () => this.hideErrorMessage());
        this.select.addEventListener('change', () => this.getWebAddress(this.shops));
    }

    getWebAddress(shops) {
        const href = window.location.href;
        const domainNew = href.replace('welcome.', '');
        const selectValue = this.select.value;
        const store = Object.keys(shops).find(store => selectValue === store);
        const storeUrlPart = shops[store].link;
        window.location.href = domainNew+storeUrlPart;
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
