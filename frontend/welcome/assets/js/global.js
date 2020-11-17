class Global {
    async init() {
        const JSON_PATH = './assets/json/regions.json';
        this.input = document.getElementsByClassName('js-zip')[0];
        this.button = document.getElementsByClassName('js-submit-button')[0];
        this.error = document.getElementsByClassName('js-error')[0];
        this.regions = await this.getJson(JSON_PATH);
        // this.limit = this.maxLimit();

        this.mapEvents();
    }

    mapEvents() {
        this.error.addEventListener('click', () => this.hideErrorMessage());
        // this.button.addEventListener('click', () => this.validateZip(this.regions));
        // this.input.addEventListener('input', () => this.validateValue());
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

    // maxLimit() {
    //      return +this.input.getAttribute('maxlength');
    // }
}

document.addEventListener("DOMContentLoaded", new Global().init());
