(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["packaging-unit-quantity-selector"],{

/***/ "./vendor/spryker-shop/product-packaging-unit-widget/src/SprykerShop/Yves/ProductPackagingUnitWidget/Theme/default/components/molecules/packaging-unit-quantity-selector/packaging-unit-quantity-selector.ts":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-packaging-unit-widget/src/SprykerShop/Yves/ProductPackagingUnitWidget/Theme/default/components/molecules/packaging-unit-quantity-selector/packaging-unit-quantity-selector.ts ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PackagingUnitQuantitySelector; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* tslint:disable: max-file-line-count */

/*
 * @tag example This code provides example of using the Product Packaging Unit.
 */

var HIDDEN_CLASS_NAME = 'is-hidden';
class PackagingUnitQuantitySelector extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "qtyInSalesUnitInput", void 0);

    _defineProperty(this, "qtyInBaseUnitInput", void 0);

    _defineProperty(this, "measurementUnitInput", void 0);

    _defineProperty(this, "addToCartButton", void 0);

    _defineProperty(this, "leadSalesUnitSelect", void 0);

    _defineProperty(this, "baseUnit", void 0);

    _defineProperty(this, "salesUnits", void 0);

    _defineProperty(this, "currentSalesUnit", void 0);

    _defineProperty(this, "productQuantityStorage", void 0);

    _defineProperty(this, "translations", void 0);

    _defineProperty(this, "leadSalesUnits", void 0);

    _defineProperty(this, "productPackagingUnitStorage", void 0);

    _defineProperty(this, "amountInSalesUnitInput", void 0);

    _defineProperty(this, "amountDefaultInBaseUnitInput", void 0);

    _defineProperty(this, "itemBasePriceInput", void 0);

    _defineProperty(this, "itemMoneySymbolInput", void 0);

    _defineProperty(this, "amountInBaseUnitInput", void 0);

    _defineProperty(this, "currentLeadSalesUnit", void 0);

    _defineProperty(this, "productPackagingNewPriceBlock", void 0);

    _defineProperty(this, "productPackagingNewPriceValueBlock", void 0);

    _defineProperty(this, "quantityBetweenElement", void 0);

    _defineProperty(this, "quantityMinElement", void 0);

    _defineProperty(this, "quantityMaxElement", void 0);

    _defineProperty(this, "muChoiceNotificationElement", void 0);

    _defineProperty(this, "muChoiceListElement", void 0);

    _defineProperty(this, "muCurrentChoiceElement", void 0);

    _defineProperty(this, "puChoiceElement", void 0);

    _defineProperty(this, "puMinNotificationElement", void 0);

    _defineProperty(this, "puMaxNotificationElement", void 0);

    _defineProperty(this, "puIntervalNotificationElement", void 0);

    _defineProperty(this, "isAddToCartDisabled", void 0);

    _defineProperty(this, "muError", false);

    _defineProperty(this, "puError", false);

    _defineProperty(this, "decimals", 4);

    _defineProperty(this, "factor", 10);

    _defineProperty(this, "numberOfDecimalPlaces", 10);

    _defineProperty(this, "degree", [2, 3]);
  }

  /* tslint:enable: no-magic-numbers */
  readyCallback() {}

  init() {
    this.qtyInSalesUnitInput = this.getElementsByClassName(this.jsName + "__sales-unit-quantity")[0];

    if (!this.qtyInSalesUnitInput) {
      return;
    }

    this.qtyInBaseUnitInput = this.getElementsByClassName(this.jsName + "__base-unit-quantity")[0];
    this.measurementUnitInput = this.getElementsByClassName(this.jsName + "__select-measurement-unit")[0];
    this.addToCartButton = this.getElementsByClassName(this.jsName + "__add-to-cart-button")[0];
    this.leadSalesUnitSelect = this.getElementsByClassName(this.jsName + "__select-lead-measurement-unit")[0];
    this.amountInSalesUnitInput = this.getElementsByClassName(this.jsName + "__user-amount")[0];
    this.amountDefaultInBaseUnitInput = this.getElementsByClassName(this.jsName + "__default-amount")[0];
    this.amountInBaseUnitInput = document.getElementsByClassName(this.jsName + "__amount")[0];
    this.productPackagingNewPriceBlock = this.getElementsByClassName(this.jsName + "__product-packaging-new-price-block")[0];
    this.productPackagingNewPriceValueBlock = this.getElementsByClassName(this.jsName + "__product-packaging-new-price-value-block")[0];
    this.itemBasePriceInput = this.getElementsByClassName(this.jsName + "__item-base-price")[0];
    this.itemMoneySymbolInput = this.getElementsByClassName(this.jsName + "__item-money-symbol")[0];
    this.quantityBetweenElement = this.getElementsByClassName(this.jsName + "__quantity-between-units")[0];
    this.quantityMinElement = this.getElementsByClassName(this.jsName + "__minimum-quantity")[0];
    this.quantityMaxElement = this.getElementsByClassName(this.jsName + "__maximum-quantity")[0];
    this.muChoiceNotificationElement = this.getElementsByClassName(this.jsName + "__measurement-unit-choice")[0];
    this.muChoiceListElement = this.muChoiceNotificationElement.getElementsByClassName(this.jsName + "__list")[0];
    this.muCurrentChoiceElement = this.muChoiceNotificationElement.getElementsByClassName(this.jsName + "__current-choice")[0];
    this.puChoiceElement = this.getElementsByClassName(this.jsName + "__packaging-unit-choice")[0];
    this.puMinNotificationElement = this.getElementsByClassName(this.jsName + "__packaging-amount-min")[0];
    this.puMaxNotificationElement = this.getElementsByClassName(this.jsName + "__packaging-amount-max")[0];
    this.puIntervalNotificationElement = this.getElementsByClassName(this.jsName + "__packaging-amount-interval")[0];
    this.initJson();
    this.initTranslations();
    this.initCurrentSalesUnit();
    this.initCurrentLeadSalesUnit();
    this.initFormDefaultValues();
    this.mapEvents();

    if (this.amountInBaseUnitInput) {
      this.onAmountInputChange();
    }
  }

  initJson() {
    var packagingUnitData = JSON.parse(this.packagingJSONString);
    this.baseUnit = packagingUnitData.baseUnit;
    this.salesUnits = packagingUnitData.salesUnits;
    this.leadSalesUnits = packagingUnitData.leadSalesUnits;
    this.isAddToCartDisabled = packagingUnitData.isAddToCartDisabled;
    this.productPackagingUnitStorage = packagingUnitData.productPackagingUnitStorage;
    this.productQuantityStorage = packagingUnitData.productQuantityStorage;
  }

  initFormDefaultValues() {
    if (!this.amountInBaseUnitInput) {
      return;
    }

    this.qtyInSalesUnitInput.value = String(this.getMinQuantity());

    if (this.leadSalesUnitSelect) {
      this.leadSalesUnitSelect.value = String(this.currentLeadSalesUnit.id_product_measurement_sales_unit);
    }

    if (this.measurementUnitInput) {
      this.measurementUnitInput.value = String(this.currentSalesUnit.id_product_measurement_sales_unit);
    }
  }

  initTranslations() {
    this.translations = JSON.parse(this.getElementsByClassName(this.jsName + "__measurement-unit-translation")[0].innerHTML);
  }

  initCurrentSalesUnit() {
    this.currentSalesUnit = this.salesUnits.find(item => item.is_default);
  }

  mapEvents() {
    this.qtyInSalesUnitInput.addEventListener('input', event => this.qtyInputChange());

    if (this.measurementUnitInput) {
      this.measurementUnitInput.addEventListener('change', event => this.onMeasurementUnitInputChange(event));
    }

    if (this.amountInSalesUnitInput) {
      this.amountInSalesUnitInput.addEventListener('input', event => this.onAmountInputChange());
    }

    if (this.leadSalesUnitSelect) {
      this.leadSalesUnitSelect.addEventListener('change', event => this.onLeadSalesUnitSelectChange(event));
    }
  }

  qtyInputChange(qtyInSalesUnits) {
    if (typeof qtyInSalesUnits === 'undefined') {
      qtyInSalesUnits = Number(this.qtyInSalesUnitInput.value);
    }

    this.muError = false;
    var qtyInBaseUnits = this.multiply(qtyInSalesUnits, Number(this.currentSalesUnit.conversion));

    if (qtyInBaseUnits < this.getMinQuantity()) {
      this.muError = true;
      this.hideNotifications();
      this.quantityMinElement.classList.remove(HIDDEN_CLASS_NAME);
    } else if ((qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval() !== 0) {
      this.muError = true;
      this.hideNotifications();
      this.quantityBetweenElement.classList.remove(HIDDEN_CLASS_NAME);
    } else if (this.getMaxQuantity() > 0 && qtyInBaseUnits > this.getMaxQuantity()) {
      this.muError = true;
      this.hideNotifications();
      this.quantityMaxElement.classList.remove(HIDDEN_CLASS_NAME);
    }

    if (this.muError && !isFinite(qtyInSalesUnits)) {
      this.addToCartButton.setAttribute('disabled', 'disabled');
      this.qtyInSalesUnitInput.setAttribute('disabled', 'disabled');
      return;
    }

    if (this.muError || this.puError || this.isAddToCartDisabled) {
      this.addToCartButton.setAttribute('disabled', 'disabled');
      this.showCorrectInputSuggestions(qtyInSalesUnits);
      return;
    }

    this.qtyInBaseUnitInput.value = String(qtyInBaseUnits);

    if (this.amountInBaseUnitInput) {
      this.onAmountInputChange();
    }

    this.addToCartButton.removeAttribute('disabled');
    this.hideNotifications();
  }

  hideNotifications() {
    this.muChoiceNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityBetweenElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityMinElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityMaxElement.classList.add(HIDDEN_CLASS_NAME);
  }

  showCorrectInputSuggestions(qtyInSalesUnits) {
    if (this.muError) {
      var minChoice = this.getMinChoice(qtyInSalesUnits);
      var maxChoice = this.getMaxChoice(qtyInSalesUnits, minChoice);
      this.muChoiceListElement.innerHTML = '';
      this.muCurrentChoiceElement.innerHTML = '';
      this.muCurrentChoiceElement.textContent = this.round(qtyInSalesUnits, this.decimals) + " " + this.getUnitName(this.currentSalesUnit.product_measurement_unit.code);
      var choiceElements = [];
      choiceElements.push(this.createChoiceElement(minChoice));

      if (maxChoice !== minChoice) {
        choiceElements.push(this.createChoiceElement(maxChoice));
      }

      choiceElements.forEach(element => element !== undefined ? this.muChoiceListElement.appendChild(element) : undefined);
      this.muChoiceNotificationElement.classList.remove(HIDDEN_CLASS_NAME);
    }
  }

  createChoiceElement(qtyInBaseUnits) {
    if (qtyInBaseUnits <= 0) {
      return undefined;
    }

    var choiceElement = document.createElement('span');
    var qtyInSalesUnits = this.convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits);
    var measurementSalesUnitName = this.getUnitName(this.currentSalesUnit.product_measurement_unit.code);
    var measurementBaseUnitName = this.getUnitName(this.baseUnit.code);
    choiceElement.classList.add('link');
    choiceElement.setAttribute('data-base-unit-qty', String(qtyInBaseUnits));
    choiceElement.setAttribute('data-sales-unit-qty', String(qtyInSalesUnits));
    choiceElement.textContent = "(" + this.round(qtyInSalesUnits, this.decimals) + " " + measurementSalesUnitName + ") = (" + qtyInBaseUnits + " " + measurementBaseUnitName + ")";

    choiceElement.onclick = event => {
      var element = event.currentTarget;
      var qtyInBaseUnitsValue = parseFloat(element.dataset.baseUnitQty);
      var qtyInSalesUnitsValue = parseFloat(element.dataset.salesUnitQty);
      this.muError = false;
      this.selectQty(qtyInBaseUnitsValue, qtyInSalesUnitsValue);
    };

    choiceElement.style.display = 'block';
    return choiceElement;
  }

  selectQty(qtyInBaseUnits, qtyInSalesUnits) {
    this.qtyInBaseUnitInput.value = String(qtyInBaseUnits);
    this.qtyInSalesUnitInput.value = String(this.round(qtyInSalesUnits, this.decimals));

    if (!this.puError && !this.isAddToCartDisabled) {
      this.addToCartButton.removeAttribute('disabled');
      this.qtyInSalesUnitInput.removeAttribute('disabled');
    }

    this.muChoiceNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.qtyInputChange();
  }

  getMinChoice(qtyInSalesUnits) {
    var qtyInBaseUnits = this.floor(this.multiply(qtyInSalesUnits, this.currentSalesUnit.conversion));

    if (qtyInBaseUnits < this.getMinQuantity()) {
      return this.getMinQuantity();
    }

    if ((qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval() !== 0 || this.getMaxQuantity() > 0 && qtyInBaseUnits > this.getMaxQuantity()) {
      return this.getMinChoice(this.convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits - 1));
    }

    return qtyInBaseUnits;
  }

  getMaxChoice(qtyInSalesUnits, minChoice) {
    var qtyInBaseUnits = this.ceil(this.multiply(qtyInSalesUnits, this.currentSalesUnit.conversion));

    if (this.getMaxQuantity() > 0 && qtyInBaseUnits > this.getMaxQuantity()) {
      qtyInBaseUnits = this.getMaxQuantity();

      if ((qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval() !== 0) {
        qtyInBaseUnits = qtyInBaseUnits - (qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval();
      }

      return qtyInBaseUnits;
    }

    if ((qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval() !== 0) {
      return this.getMaxChoice(this.convertBaseUnitsAmountToCurrentSalesUnitsAmount((qtyInBaseUnits + 1) / this.currentSalesUnit.conversion), minChoice);
    }

    return qtyInBaseUnits;
  }

  convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits) {
    return Math.round(qtyInBaseUnits / this.currentSalesUnit.conversion * this.currentSalesUnit.precision) / this.currentSalesUnit.precision;
  }

  floor(value) {
    if (Math.floor(value) > 0) {
      return Math.floor(value);
    }

    return Math.ceil(value);
  }

  ceil(value) {
    return Math.ceil(value);
  }

  round(value, decimals) {
    return Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);
  }

  multiply(a, b) {
    var result = a * b;
    var precision = Number(this.currentSalesUnit.precision);
    return Math.round(result * precision) / precision;
  }

  getMinQuantity() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_min')) {
      return this.productQuantityStorage.quantity_min;
    }

    return 1;
  }

  getMaxQuantity() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_max') && this.productQuantityStorage.quantity_max !== null) {
      return this.productQuantityStorage.quantity_max;
    }

    return 0;
  }

  getQuantityInterval() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_interval')) {
      return this.productQuantityStorage.quantity_interval;
    }

    return 1;
  }

  onMeasurementUnitInputChange(event) {
    var salesUnitId = parseInt(event.currentTarget.value);
    var salesUnit = this.getSalesUnitById(salesUnitId);
    var qtyInSalesUnits = Number(this.qtyInSalesUnitInput.value);
    var qtyInBaseUnits = this.multiply(qtyInSalesUnits, this.currentSalesUnit.conversion);
    this.currentSalesUnit = salesUnit;
    qtyInSalesUnits = this.convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits);

    if (isFinite(qtyInSalesUnits)) {
      this.qtyInSalesUnitInput.value = String(this.round(qtyInSalesUnits, this.decimals));
    }

    this.qtyInputChange(qtyInSalesUnits);
  }

  getSalesUnitById(salesUnitId) {
    return this.salesUnits.find(item => salesUnitId === item.id_product_measurement_sales_unit);
  }

  getUnitName(key) {
    if (this.translations.hasOwnProperty(key)) {
      return this.translations[key];
    }

    return key;
  }

  onAmountInputChange(amountInSalesUnitInput) {
    var amountDecimalsMaxLength = new RegExp("((.|,)\\d{" + this.numberOfDecimalPlaces + "})\\d+", 'g');

    if (this.amountInSalesUnitInput.value.match(/[,.]/)) {
      this.amountInSalesUnitInput.value = this.amountInSalesUnitInput.value.replace(amountDecimalsMaxLength, '$1');
    }

    if (typeof amountInSalesUnitInput === 'undefined') {
      amountInSalesUnitInput = Number(this.amountInSalesUnitInput.value);
    }

    var amountInBaseUnits = Number((amountInSalesUnitInput * this.precision * Number(this.currentLeadSalesUnit.conversion) / this.precision).toFixed(this.numberOfDecimalPlaces));
    this.productPackagingNewPriceBlock.classList.add(HIDDEN_CLASS_NAME);
    this.puError = false;

    if (!this.amountInSalesUnitInput.disabled) {
      if (this.isAmountMultipleToInterval(amountInBaseUnits)) {
        this.puError = true;
        this.puIntervalNotificationElement.classList.remove(HIDDEN_CLASS_NAME);
      }

      if (amountInBaseUnits < this.getMinAmount()) {
        this.puError = true;
        this.puMinNotificationElement.classList.remove(HIDDEN_CLASS_NAME);
      }

      if (this.getMaxAmount() > 0 && amountInBaseUnits > this.getMaxAmount()) {
        this.puError = true;
        this.puMaxNotificationElement.classList.remove(HIDDEN_CLASS_NAME);
      }
    }

    if (this.puError || this.muError || this.isAddToCartDisabled) {
      this.askCustomerForCorrectAmountInput(amountInSalesUnitInput);
      this.addToCartButton.setAttribute('disabled', 'disabled');
      return undefined;
    }

    var quantity = Number(this.qtyInBaseUnitInput.value);
    var totalAmount = (amountInBaseUnits * this.precision * quantity / this.precision).toFixed(this.numberOfDecimalPlaces);
    this.amountInBaseUnitInput.value = String(parseFloat(totalAmount));
    this.addToCartButton.removeAttribute('disabled');
    this.hidePackagingUnitRestrictionNotifications();
    this.priceCalculation(amountInBaseUnits);
  }

  priceCalculation(amountInBaseUnits) {
    var itemBasePrice = Number(this.itemBasePriceInput.value);
    var amountDefaultInBaseUnitInputValue = Number(this.amountDefaultInBaseUnitInput.value);

    if (amountDefaultInBaseUnitInputValue !== amountInBaseUnits) {
      var newPrice = amountInBaseUnits / amountDefaultInBaseUnitInputValue * itemBasePrice;
      newPrice = newPrice * Number(this.qtyInBaseUnitInput.value) / Math.pow(this.factor, this.degree[0]);
      this.productPackagingNewPriceValueBlock.innerHTML = this.itemMoneySymbolInput.value + newPrice.toFixed(this.degree[0]);
      this.productPackagingNewPriceBlock.classList.remove(HIDDEN_CLASS_NAME);
    }
  }

  askCustomerForCorrectAmountInput(amountInSalesUnits) {
    var puChoiceListElement = this.puChoiceElement.getElementsByClassName(this.jsName + "__list")[0];
    var puCurrentChoiceElement = this.puChoiceElement.getElementsByClassName(this.jsName + "__amount-current-choice")[0];

    if (this.puError) {
      var minChoice = this.getMinAmountChoice(amountInSalesUnits);
      var maxChoice = this.getMaxAmountChoice(amountInSalesUnits, minChoice);
      puChoiceListElement.innerHTML = '';
      puCurrentChoiceElement.innerHTML = '';
      puCurrentChoiceElement.textContent = this.round(amountInSalesUnits, this.decimals) + " " + this.getUnitName(this.currentLeadSalesUnit.product_measurement_unit.code);
      var choiceElements = [];

      if (minChoice) {
        choiceElements.push(this.createAmountChoiceElement(minChoice));
      }

      if (maxChoice !== minChoice) {
        choiceElements.push(this.createAmountChoiceElement(maxChoice));
      }

      choiceElements.forEach(element => element !== undefined ? puChoiceListElement.appendChild(element) : undefined);
      this.puChoiceElement.classList.remove(HIDDEN_CLASS_NAME);
    }
  }

  initCurrentLeadSalesUnit() {
    if (!this.leadSalesUnits) {
      return;
    }

    this.currentLeadSalesUnit = this.leadSalesUnits.find(item => item.is_default);
  }

  createAmountChoiceElement(amountInBaseUnits) {
    if (amountInBaseUnits > 0) {
      var choiceElement = document.createElement('span');
      var amountInSalesUnits = (amountInBaseUnits * this.precision / this.currentLeadSalesUnit.conversion / this.precision).toFixed(this.numberOfDecimalPlaces);
      var measurementSalesUnitName = this.getUnitName(this.currentLeadSalesUnit.product_measurement_unit.code);
      var measurementBaseUnitName = this.getUnitName(this.baseUnit.code);
      var salesUnitChoice = parseFloat(amountInSalesUnits) + " " + measurementSalesUnitName;
      var baseUnitChoice = amountInBaseUnits + " " + measurementBaseUnitName;
      choiceElement.classList.add('link');
      choiceElement.setAttribute('data-base-unit-amount', String(amountInBaseUnits));
      choiceElement.setAttribute('data-sales-unit-amount', String(parseFloat(amountInSalesUnits)));
      choiceElement.textContent = "(" + salesUnitChoice + ") = (" + baseUnitChoice + ")";

      choiceElement.onclick = event => {
        var element = event.currentTarget;
        var amountInBaseUnitsValue = parseFloat(element.dataset.baseUnitAmount);
        var amountInSalesUnitsValue = parseFloat(element.dataset.salesUnitAmount);
        this.puError = false;
        this.selectAmount(amountInBaseUnitsValue, amountInSalesUnitsValue);
      };

      choiceElement.style.display = 'block';
      return choiceElement;
    }
  }

  selectAmount(amountInBaseUnits, amountInSalesUnits) {
    this.amountInSalesUnitInput.value = String(amountInSalesUnits);
    this.amountInBaseUnitInput.value = String(amountInBaseUnits);

    if (!this.muError && !this.isAddToCartDisabled) {
      this.addToCartButton.removeAttribute('disabled');
    }

    this.puChoiceElement.classList.add(HIDDEN_CLASS_NAME);
    this.onAmountInputChange();
  }

  onLeadSalesUnitSelectChange(event) {
    var salesUnitId = parseInt(event.currentTarget.value);
    var salesUnit = this.getLeadSalesUnitById(salesUnitId);
    var amountInSalesUnits = this.getAmountConversion(Number(this.amountInSalesUnitInput.value), salesUnit.conversion);
    var amountInSalesUnitsMin = this.getAmountConversion(Number(this.amountInSalesUnitInput.min), salesUnit.conversion);
    var amountInSalesUnitsMax = this.getAmountConversion(Number(this.amountInSalesUnitInput.max), salesUnit.conversion);
    var amountInSalesUnitsStep = this.getAmountConversion(Number(this.amountInSalesUnitInput.step), salesUnit.conversion);
    this.currentLeadSalesUnit = salesUnit;
    this.amountInSalesUnitInput.value = String(amountInSalesUnits);

    if (this.amountInSalesUnitInput.min) {
      this.amountInSalesUnitInput.min = String(amountInSalesUnitsMin);
    }

    if (this.amountInSalesUnitInput.max) {
      this.amountInSalesUnitInput.max = String(amountInSalesUnitsMax);
    }

    if (this.amountInSalesUnitInput.step) {
      this.amountInSalesUnitInput.step = String(amountInSalesUnitsStep);
    }

    this.onAmountInputChange(amountInSalesUnits);
  }

  hidePackagingUnitRestrictionNotifications() {
    this.puChoiceElement.classList.add(HIDDEN_CLASS_NAME);
    this.puMinNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.puMaxNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.puIntervalNotificationElement.classList.add(HIDDEN_CLASS_NAME);
  }

  getLeadSalesUnitById(salesUnitId) {
    return this.leadSalesUnits.find(item => salesUnitId === item.id_product_measurement_sales_unit);
  }

  getMinAmount() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_min') && this.productPackagingUnitStorage.amount_min !== null) {
      return Number(this.productPackagingUnitStorage.amount_min);
    }

    return 1;
  }

  getMaxAmount() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_max') && this.productPackagingUnitStorage.amount_max !== null) {
      return Number(this.productPackagingUnitStorage.amount_max);
    }

    return 0;
  }

  getAmountInterval() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_interval') && this.productPackagingUnitStorage.amount_interval !== null) {
      return Number(this.productPackagingUnitStorage.amount_interval);
    }

    return 1;
  }

  getMinAmountChoice(amountInSalesUnits) {
    var amountInBaseUnits = Number((amountInSalesUnits * this.precision * Number(this.currentLeadSalesUnit.conversion) / this.precision).toFixed(this.numberOfDecimalPlaces));

    if (amountInBaseUnits < this.getMinAmount()) {
      return this.getMinAmount();
    }

    if (this.isAmountGreaterThanMaxAmount(amountInBaseUnits)) {
      return 0;
    }

    if (this.isAmountMultipleToInterval(amountInBaseUnits)) {
      return this.getMinAmountChoice((amountInBaseUnits - this.getAmountPercentageOfDivision(amountInBaseUnits)) / this.currentLeadSalesUnit.conversion);
    }

    return amountInBaseUnits;
  }

  getMaxAmountChoice(amountInSalesUnits, minChoice) {
    var amountInBaseUnits = Number((amountInSalesUnits * this.precision * Number(this.currentLeadSalesUnit.conversion) / this.precision).toFixed(this.numberOfDecimalPlaces));

    if (this.isAmountGreaterThanMaxAmount(amountInBaseUnits)) {
      amountInBaseUnits = this.getMaxAmount();

      if (this.isAmountMultipleToInterval(amountInBaseUnits)) {
        amountInBaseUnits = amountInBaseUnits - this.getAmountPercentageOfDivision(amountInBaseUnits);
      }

      return amountInBaseUnits;
    }

    if (amountInBaseUnits <= minChoice) {
      return 0;
    }

    if (this.isAmountMultipleToInterval(amountInBaseUnits)) {
      var nextPossibleInterval = Number(((minChoice * this.precision + this.getAmountInterval() * this.precision) / this.precision).toFixed(this.numberOfDecimalPlaces));
      return nextPossibleInterval;
    }

    return amountInBaseUnits;
  }

  isAmountGreaterThanMaxAmount(amountInBaseUnits) {
    return this.getMaxAmount() > 0 && amountInBaseUnits > this.getMaxAmount();
  }

  isAmountMultipleToInterval(amountInBaseUnits) {
    return this.getAmountPercentageOfDivision(amountInBaseUnits) !== 0;
  }

  getAmountConversion(value, conversion) {
    return parseFloat((value * this.precision * this.currentLeadSalesUnit.conversion / conversion / this.precision).toFixed(this.numberOfDecimalPlaces));
  }

  getAmountPercentageOfDivision(amountInBaseUnits) {
    var amountMultiplyToPrecision = Math.round(amountInBaseUnits * this.precision);
    var minAmountMultiplyToPrecision = Math.round(this.getMinAmount() * this.precision);
    var amountIntervalMultiplyToPrecision = this.getAmountInterval() * this.precision;
    var currentMinusMinimumAmount = Number(((amountMultiplyToPrecision - minAmountMultiplyToPrecision) / this.precision).toFixed(this.numberOfDecimalPlaces));
    var currentMinusMinimumAmountMultiplyToPrecision = Math.round(currentMinusMinimumAmount * this.precision);
    var amountPercentageOfDivision = (currentMinusMinimumAmountMultiplyToPrecision % amountIntervalMultiplyToPrecision / this.precision).toFixed(this.numberOfDecimalPlaces);
    return Number(amountPercentageOfDivision);
  }

  get precision() {
    return Number("1" + '0'.repeat(this.numberOfDecimalPlaces));
  }

  get packagingJSONString() {
    return this.getAttribute('json');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Byb2R1Y3QtcGFja2FnaW5nLXVuaXQtd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Byb2R1Y3RQYWNrYWdpbmdVbml0V2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFja2FnaW5nLXVuaXQtcXVhbnRpdHktc2VsZWN0b3IvcGFja2FnaW5nLXVuaXQtcXVhbnRpdHktc2VsZWN0b3IudHMiXSwibmFtZXMiOlsiSElEREVOX0NMQVNTX05BTUUiLCJQYWNrYWdpbmdVbml0UXVhbnRpdHlTZWxlY3RvciIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXR5SW5TYWxlc1VuaXRJbnB1dCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJxdHlJbkJhc2VVbml0SW5wdXQiLCJtZWFzdXJlbWVudFVuaXRJbnB1dCIsImFkZFRvQ2FydEJ1dHRvbiIsImxlYWRTYWxlc1VuaXRTZWxlY3QiLCJhbW91bnRJblNhbGVzVW5pdElucHV0IiwiYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dCIsImFtb3VudEluQmFzZVVuaXRJbnB1dCIsImRvY3VtZW50IiwicHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlQmxvY2siLCJwcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VWYWx1ZUJsb2NrIiwiaXRlbUJhc2VQcmljZUlucHV0IiwiaXRlbU1vbmV5U3ltYm9sSW5wdXQiLCJxdWFudGl0eUJldHdlZW5FbGVtZW50IiwicXVhbnRpdHlNaW5FbGVtZW50IiwicXVhbnRpdHlNYXhFbGVtZW50IiwibXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50IiwibXVDaG9pY2VMaXN0RWxlbWVudCIsIm11Q3VycmVudENob2ljZUVsZW1lbnQiLCJwdUNob2ljZUVsZW1lbnQiLCJwdU1pbk5vdGlmaWNhdGlvbkVsZW1lbnQiLCJwdU1heE5vdGlmaWNhdGlvbkVsZW1lbnQiLCJwdUludGVydmFsTm90aWZpY2F0aW9uRWxlbWVudCIsImluaXRKc29uIiwiaW5pdFRyYW5zbGF0aW9ucyIsImluaXRDdXJyZW50U2FsZXNVbml0IiwiaW5pdEN1cnJlbnRMZWFkU2FsZXNVbml0IiwiaW5pdEZvcm1EZWZhdWx0VmFsdWVzIiwibWFwRXZlbnRzIiwib25BbW91bnRJbnB1dENoYW5nZSIsInBhY2thZ2luZ1VuaXREYXRhIiwiSlNPTiIsInBhcnNlIiwicGFja2FnaW5nSlNPTlN0cmluZyIsImJhc2VVbml0Iiwic2FsZXNVbml0cyIsImxlYWRTYWxlc1VuaXRzIiwiaXNBZGRUb0NhcnREaXNhYmxlZCIsInByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSIsInByb2R1Y3RRdWFudGl0eVN0b3JhZ2UiLCJ2YWx1ZSIsIlN0cmluZyIsImdldE1pblF1YW50aXR5IiwiY3VycmVudExlYWRTYWxlc1VuaXQiLCJpZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQiLCJjdXJyZW50U2FsZXNVbml0IiwidHJhbnNsYXRpb25zIiwiaW5uZXJIVE1MIiwiZmluZCIsIml0ZW0iLCJpc19kZWZhdWx0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicXR5SW5wdXRDaGFuZ2UiLCJvbk1lYXN1cmVtZW50VW5pdElucHV0Q2hhbmdlIiwib25MZWFkU2FsZXNVbml0U2VsZWN0Q2hhbmdlIiwicXR5SW5TYWxlc1VuaXRzIiwiTnVtYmVyIiwibXVFcnJvciIsInF0eUluQmFzZVVuaXRzIiwibXVsdGlwbHkiLCJjb252ZXJzaW9uIiwiaGlkZU5vdGlmaWNhdGlvbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRRdWFudGl0eUludGVydmFsIiwiZ2V0TWF4UXVhbnRpdHkiLCJpc0Zpbml0ZSIsInNldEF0dHJpYnV0ZSIsInB1RXJyb3IiLCJzaG93Q29ycmVjdElucHV0U3VnZ2VzdGlvbnMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhZGQiLCJtaW5DaG9pY2UiLCJnZXRNaW5DaG9pY2UiLCJtYXhDaG9pY2UiLCJnZXRNYXhDaG9pY2UiLCJ0ZXh0Q29udGVudCIsInJvdW5kIiwiZGVjaW1hbHMiLCJnZXRVbml0TmFtZSIsInByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdCIsImNvZGUiLCJjaG9pY2VFbGVtZW50cyIsInB1c2giLCJjcmVhdGVDaG9pY2VFbGVtZW50IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJ1bmRlZmluZWQiLCJhcHBlbmRDaGlsZCIsImNob2ljZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQiLCJtZWFzdXJlbWVudFNhbGVzVW5pdE5hbWUiLCJtZWFzdXJlbWVudEJhc2VVbml0TmFtZSIsIm9uY2xpY2siLCJjdXJyZW50VGFyZ2V0IiwicXR5SW5CYXNlVW5pdHNWYWx1ZSIsInBhcnNlRmxvYXQiLCJkYXRhc2V0IiwiYmFzZVVuaXRRdHkiLCJxdHlJblNhbGVzVW5pdHNWYWx1ZSIsInNhbGVzVW5pdFF0eSIsInNlbGVjdFF0eSIsInN0eWxlIiwiZGlzcGxheSIsImZsb29yIiwiY2VpbCIsIk1hdGgiLCJwcmVjaXNpb24iLCJhIiwiYiIsInJlc3VsdCIsImhhc093blByb3BlcnR5IiwicXVhbnRpdHlfbWluIiwicXVhbnRpdHlfbWF4IiwicXVhbnRpdHlfaW50ZXJ2YWwiLCJzYWxlc1VuaXRJZCIsInBhcnNlSW50Iiwic2FsZXNVbml0IiwiZ2V0U2FsZXNVbml0QnlJZCIsImtleSIsImFtb3VudERlY2ltYWxzTWF4TGVuZ3RoIiwiUmVnRXhwIiwibnVtYmVyT2ZEZWNpbWFsUGxhY2VzIiwibWF0Y2giLCJyZXBsYWNlIiwiYW1vdW50SW5CYXNlVW5pdHMiLCJ0b0ZpeGVkIiwiZGlzYWJsZWQiLCJpc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbCIsImdldE1pbkFtb3VudCIsImdldE1heEFtb3VudCIsImFza0N1c3RvbWVyRm9yQ29ycmVjdEFtb3VudElucHV0IiwicXVhbnRpdHkiLCJ0b3RhbEFtb3VudCIsImhpZGVQYWNrYWdpbmdVbml0UmVzdHJpY3Rpb25Ob3RpZmljYXRpb25zIiwicHJpY2VDYWxjdWxhdGlvbiIsIml0ZW1CYXNlUHJpY2UiLCJhbW91bnREZWZhdWx0SW5CYXNlVW5pdElucHV0VmFsdWUiLCJuZXdQcmljZSIsInBvdyIsImZhY3RvciIsImRlZ3JlZSIsImFtb3VudEluU2FsZXNVbml0cyIsInB1Q2hvaWNlTGlzdEVsZW1lbnQiLCJwdUN1cnJlbnRDaG9pY2VFbGVtZW50IiwiZ2V0TWluQW1vdW50Q2hvaWNlIiwiZ2V0TWF4QW1vdW50Q2hvaWNlIiwiY3JlYXRlQW1vdW50Q2hvaWNlRWxlbWVudCIsInNhbGVzVW5pdENob2ljZSIsImJhc2VVbml0Q2hvaWNlIiwiYW1vdW50SW5CYXNlVW5pdHNWYWx1ZSIsImJhc2VVbml0QW1vdW50IiwiYW1vdW50SW5TYWxlc1VuaXRzVmFsdWUiLCJzYWxlc1VuaXRBbW91bnQiLCJzZWxlY3RBbW91bnQiLCJnZXRMZWFkU2FsZXNVbml0QnlJZCIsImdldEFtb3VudENvbnZlcnNpb24iLCJhbW91bnRJblNhbGVzVW5pdHNNaW4iLCJtaW4iLCJhbW91bnRJblNhbGVzVW5pdHNNYXgiLCJtYXgiLCJhbW91bnRJblNhbGVzVW5pdHNTdGVwIiwic3RlcCIsImFtb3VudF9taW4iLCJhbW91bnRfbWF4IiwiZ2V0QW1vdW50SW50ZXJ2YWwiLCJhbW91bnRfaW50ZXJ2YWwiLCJpc0Ftb3VudEdyZWF0ZXJUaGFuTWF4QW1vdW50IiwiZ2V0QW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24iLCJuZXh0UG9zc2libGVJbnRlcnZhbCIsImFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24iLCJtaW5BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uIiwiYW1vdW50SW50ZXJ2YWxNdWx0aXBseVRvUHJlY2lzaW9uIiwiY3VycmVudE1pbnVzTWluaW11bUFtb3VudCIsImN1cnJlbnRNaW51c01pbmltdW1BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uIiwiYW1vdW50UGVyY2VudGFnZU9mRGl2aXNp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LFNBRjBCLEVBR2pDbUIsT0FIaUMsQ0FHekIsS0FBS0oscUJBSG9CLENBQW5DO0FBS0EsV0FBT25FLE1BQU0sQ0FBQ3dILDBCQUFELENBQWI7QUFDSDs7QUFFRCxNQUFjcEUsU0FBZCxHQUFrQztBQUM5QixXQUFPcEQsTUFBTSxPQUFLLElBQUl5SCxNQUFKLENBQVcsS0FBS3RELHFCQUFoQixDQUFMLENBQWI7QUFDSDs7QUFFRCxNQUFjM0YsbUJBQWQsR0FBNEM7QUFDeEMsV0FBTyxLQUFLa0osWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0g7O0FBbHdCZ0UsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5wYWNrYWdpbmctdW5pdC1xdWFudGl0eS1zZWxlY3Rvci5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCAqL1xuXG4vKlxuICogQHRhZyBleGFtcGxlIFRoaXMgY29kZSBwcm92aWRlcyBleGFtcGxlIG9mIHVzaW5nIHRoZSBQcm9kdWN0IFBhY2thZ2luZyBVbml0LlxuICovXG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5pbnRlcmZhY2UgVW5pdFRyYW5zbGF0aW9uc0pTT05EYXRhIHtcbiAgICBncmFtOiBzdHJpbmc7XG4gICAgaXRlbTogc3RyaW5nO1xuICAgIGtpbG86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEJhc2VVbml0IHtcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgZGVmYXVsdF9wcmVjaXNpb246IG51bWJlcjtcbiAgICBpZF9wcm9kdWN0X21lYXN1cmVtZW50X3VuaXQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBTYWxlc1VuaXQge1xuICAgIGNvbnZlcnNpb246IG51bWJlcjtcbiAgICBma19wcm9kdWN0OiBudW1iZXI7XG4gICAgZmtfcHJvZHVjdF9tZWFzdXJlbWVudF9iYXNlX3VuaXQ/OiBudW1iZXI7XG4gICAgZmtfcHJvZHVjdF9tZWFzdXJlbWVudF91bml0PzogbnVtYmVyO1xuICAgIGlkX3Byb2R1Y3RfbWVhc3VyZW1lbnRfc2FsZXNfdW5pdDogbnVtYmVyO1xuICAgIGlzX2RlZmF1bHQ6IGJvb2xlYW47XG4gICAgaXNfZGlzcGxheWVkOiBib29sZWFuO1xuICAgIHByZWNpc2lvbjogbnVtYmVyO1xuICAgIHByb2R1Y3RfbWVhc3VyZW1lbnRfYmFzZV91bml0PzogbnVtYmVyO1xuICAgIHByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdDogQmFzZVVuaXQ7XG4gICAgc3RvcmVfcmVsYXRpb24/OiBudW1iZXI7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBQcm9kdWN0UXVhbnRpdHlTdG9yYWdlIHtcbiAgICBpZF9wcm9kdWN0OiBudW1iZXI7XG4gICAgcXVhbnRpdHlfaW50ZXJ2YWw/OiBudW1iZXI7XG4gICAgcXVhbnRpdHlfbWF4PzogbnVtYmVyO1xuICAgIHF1YW50aXR5X21pbj86IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSB7XG4gICAgYW1vdW50X2ludGVydmFsOiBzdHJpbmc7XG4gICAgYW1vdW50X21heDogc3RyaW5nO1xuICAgIGFtb3VudF9taW46IHN0cmluZztcbiAgICBkZWZhdWx0X2Ftb3VudDogc3RyaW5nO1xuICAgIGlkX2xlYWRfcHJvZHVjdDogbnVtYmVyO1xuICAgIGlkX3Byb2R1Y3Q6IG51bWJlcjtcbiAgICBpc19hbW91bnRfdmFyaWFibGU6IGJvb2xlYW47XG4gICAgdHlwZV9uYW1lOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBQYWNrYWdpbmdKU09ORGF0YSB7XG4gICAgYmFzZVVuaXQ6IEJhc2VVbml0O1xuICAgIHNhbGVzVW5pdHM6IFNhbGVzVW5pdFtdO1xuICAgIHByb2R1Y3RRdWFudGl0eVN0b3JhZ2U6IFByb2R1Y3RRdWFudGl0eVN0b3JhZ2U7XG4gICAgaXNBZGRUb0NhcnREaXNhYmxlZDogYm9vbGVhbjtcbiAgICBsZWFkU2FsZXNVbml0czogU2FsZXNVbml0W107XG4gICAgcHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlOiBQcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2U7XG59XG5cbmNvbnN0IEhJRERFTl9DTEFTU19OQU1FID0gJ2lzLWhpZGRlbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2luZ1VuaXRRdWFudGl0eVNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcXR5SW5TYWxlc1VuaXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcXR5SW5CYXNlVW5pdElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBtZWFzdXJlbWVudFVuaXRJbnB1dDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGFkZFRvQ2FydEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGxlYWRTYWxlc1VuaXRTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHByb3RlY3RlZCBiYXNlVW5pdDogQmFzZVVuaXQ7XG4gICAgcHJvdGVjdGVkIHNhbGVzVW5pdHM6IFNhbGVzVW5pdFtdO1xuICAgIHByb3RlY3RlZCBjdXJyZW50U2FsZXNVbml0OiBTYWxlc1VuaXQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RRdWFudGl0eVN0b3JhZ2U6IFByb2R1Y3RRdWFudGl0eVN0b3JhZ2U7XG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uczogVW5pdFRyYW5zbGF0aW9uc0pTT05EYXRhO1xuICAgIHByb3RlY3RlZCBsZWFkU2FsZXNVbml0czogU2FsZXNVbml0W107XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZTogUHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlO1xuICAgIHByb3RlY3RlZCBhbW91bnRJblNhbGVzVW5pdElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBhbW91bnREZWZhdWx0SW5CYXNlVW5pdElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpdGVtQmFzZVByaWNlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGl0ZW1Nb25leVN5bWJvbElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBhbW91bnRJbkJhc2VVbml0SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGN1cnJlbnRMZWFkU2FsZXNVbml0OiBTYWxlc1VuaXQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RQYWNrYWdpbmdOZXdQcmljZUJsb2NrOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlVmFsdWVCbG9jazogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHF1YW50aXR5QmV0d2VlbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBxdWFudGl0eU1pbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBxdWFudGl0eU1heEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBtdUNob2ljZU5vdGlmaWNhdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBtdUNob2ljZUxpc3RFbGVtZW50OiBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHByb3RlY3RlZCBtdUN1cnJlbnRDaG9pY2VFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHB1Q2hvaWNlRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHB1TWluTm90aWZpY2F0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHB1TWF4Tm90aWZpY2F0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHB1SW50ZXJ2YWxOb3RpZmljYXRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaXNBZGRUb0NhcnREaXNhYmxlZDogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgbXVFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBwdUVycm9yOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlY2ltYWxzOiBudW1iZXIgPSA0O1xuICAgIHByb3RlY3RlZCByZWFkb25seSBmYWN0b3I6IG51bWJlciA9IDEwO1xuICAgIHByb3RlY3RlZCBudW1iZXJPZkRlY2ltYWxQbGFjZXM6IG51bWJlciA9IDEwO1xuXG4gICAgLyogdHNsaW50OmRpc2FibGU6IG5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVncmVlOiBudW1iZXJbXSA9IFsyLCAzXTtcblxuICAgIC8qIHRzbGludDplbmFibGU6IG5vLW1hZ2ljLW51bWJlcnMgKi9cblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zYWxlcy11bml0LXF1YW50aXR5YClbMF1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdHlJbkJhc2VVbml0SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19iYXNlLXVuaXQtcXVhbnRpdHlgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm1lYXN1cmVtZW50VW5pdElucHV0ID0gPEhUTUxTZWxlY3RFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NlbGVjdC1tZWFzdXJlbWVudC11bml0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYWRkLXRvLWNhcnQtYnV0dG9uYClbMF07XG4gICAgICAgIHRoaXMubGVhZFNhbGVzVW5pdFNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3QtbGVhZC1tZWFzdXJlbWVudC11bml0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdXNlci1hbW91bnRgKVswXTtcbiAgICAgICAgdGhpcy5hbW91bnREZWZhdWx0SW5CYXNlVW5pdElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZGVmYXVsdC1hbW91bnRgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFtb3VudEluQmFzZVVuaXRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19hbW91bnRgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VCbG9jayA9IDxIVE1MRGl2RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LXBhY2thZ2luZy1uZXctcHJpY2UtYmxvY2tgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdOZXdQcmljZVZhbHVlQmxvY2sgPSA8SFRNTERpdkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvZHVjdC1wYWNrYWdpbmctbmV3LXByaWNlLXZhbHVlLWJsb2NrYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pdGVtQmFzZVByaWNlSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pdGVtLWJhc2UtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5pdGVtTW9uZXlTeW1ib2xJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2l0ZW0tbW9uZXktc3ltYm9sYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eUJldHdlZW5FbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3F1YW50aXR5LWJldHdlZW4tdW5pdHNgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnF1YW50aXR5TWluRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19taW5pbXVtLXF1YW50aXR5YClbMF07XG4gICAgICAgIHRoaXMucXVhbnRpdHlNYXhFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX21heGltdW0tcXVhbnRpdHlgKVswXTtcbiAgICAgICAgdGhpcy5tdUNob2ljZU5vdGlmaWNhdGlvbkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbWVhc3VyZW1lbnQtdW5pdC1jaG9pY2VgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm11Q2hvaWNlTGlzdEVsZW1lbnQgPSA8SFRNTFVMaXN0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLm11Q2hvaWNlTm90aWZpY2F0aW9uRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGlzdGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubXVDdXJyZW50Q2hvaWNlRWxlbWVudCA9IDxIVE1MU3BhbkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5tdUNob2ljZU5vdGlmaWNhdGlvbkVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2N1cnJlbnQtY2hvaWNlYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wdUNob2ljZUVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcGFja2FnaW5nLXVuaXQtY2hvaWNlYClbMF07XG4gICAgICAgIHRoaXMucHVNaW5Ob3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3BhY2thZ2luZy1hbW91bnQtbWluYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wdU1heE5vdGlmaWNhdGlvbkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcGFja2FnaW5nLWFtb3VudC1tYXhgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnB1SW50ZXJ2YWxOb3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3BhY2thZ2luZy1hbW91bnQtaW50ZXJ2YWxgKVswXVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaW5pdEpzb24oKTtcbiAgICAgICAgdGhpcy5pbml0VHJhbnNsYXRpb25zKCk7XG4gICAgICAgIHRoaXMuaW5pdEN1cnJlbnRTYWxlc1VuaXQoKTtcbiAgICAgICAgdGhpcy5pbml0Q3VycmVudExlYWRTYWxlc1VuaXQoKTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybURlZmF1bHRWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5CYXNlVW5pdElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLm9uQW1vdW50SW5wdXRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0SnNvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFja2FnaW5nVW5pdERhdGEgPSA8UGFja2FnaW5nSlNPTkRhdGE+SlNPTi5wYXJzZSh0aGlzLnBhY2thZ2luZ0pTT05TdHJpbmcpO1xuXG4gICAgICAgIHRoaXMuYmFzZVVuaXQgPSBwYWNrYWdpbmdVbml0RGF0YS5iYXNlVW5pdDtcbiAgICAgICAgdGhpcy5zYWxlc1VuaXRzID0gcGFja2FnaW5nVW5pdERhdGEuc2FsZXNVbml0cztcbiAgICAgICAgdGhpcy5sZWFkU2FsZXNVbml0cyA9IHBhY2thZ2luZ1VuaXREYXRhLmxlYWRTYWxlc1VuaXRzO1xuICAgICAgICB0aGlzLmlzQWRkVG9DYXJ0RGlzYWJsZWQgPSBwYWNrYWdpbmdVbml0RGF0YS5pc0FkZFRvQ2FydERpc2FibGVkO1xuICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSA9IHBhY2thZ2luZ1VuaXREYXRhLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZTtcbiAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlID0gcGFja2FnaW5nVW5pdERhdGEucHJvZHVjdFF1YW50aXR5U3RvcmFnZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdEZvcm1EZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYW1vdW50SW5CYXNlVW5pdElucHV0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcodGhpcy5nZXRNaW5RdWFudGl0eSgpKTtcblxuICAgICAgICBpZiAodGhpcy5sZWFkU2FsZXNVbml0U2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmxlYWRTYWxlc1VuaXRTZWxlY3QudmFsdWUgPSBTdHJpbmcodGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdC5pZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWVhc3VyZW1lbnRVbml0SW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMubWVhc3VyZW1lbnRVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcodGhpcy5jdXJyZW50U2FsZXNVbml0LmlkX3Byb2R1Y3RfbWVhc3VyZW1lbnRfc2FsZXNfdW5pdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdFRyYW5zbGF0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbWVhc3VyZW1lbnQtdW5pdC10cmFuc2xhdGlvbmApWzBdLmlubmVySFRNTCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdEN1cnJlbnRTYWxlc1VuaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFNhbGVzVW5pdCA9IHRoaXMuc2FsZXNVbml0cy5maW5kKChpdGVtOiBTYWxlc1VuaXQpID0+IGl0ZW0uaXNfZGVmYXVsdCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5xdHlJbnB1dENoYW5nZSgpKTtcblxuICAgICAgICBpZiAodGhpcy5tZWFzdXJlbWVudFVuaXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5tZWFzdXJlbWVudFVuaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25NZWFzdXJlbWVudFVuaXRJbnB1dENoYW5nZShldmVudCksXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkFtb3VudElucHV0Q2hhbmdlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGVhZFNhbGVzVW5pdFNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5sZWFkU2FsZXNVbml0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxlYWRTYWxlc1VuaXRTZWxlY3RDaGFuZ2UoZXZlbnQpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBxdHlJbnB1dENoYW5nZShxdHlJblNhbGVzVW5pdHM/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBxdHlJblNhbGVzVW5pdHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBxdHlJblNhbGVzVW5pdHMgPSBOdW1iZXIodGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXVFcnJvciA9IGZhbHNlO1xuICAgICAgICBjb25zdCBxdHlJbkJhc2VVbml0cyA9IHRoaXMubXVsdGlwbHkocXR5SW5TYWxlc1VuaXRzLCBOdW1iZXIodGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24pKTtcblxuICAgICAgICBpZiAocXR5SW5CYXNlVW5pdHMgPCB0aGlzLmdldE1pblF1YW50aXR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMubXVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGVOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5TWluRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfSBlbHNlIGlmICgocXR5SW5CYXNlVW5pdHMgLSB0aGlzLmdldE1pblF1YW50aXR5KCkpICUgdGhpcy5nZXRRdWFudGl0eUludGVydmFsKCkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubXVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGVOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5QmV0d2VlbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXRNYXhRdWFudGl0eSgpID4gMCAmJiBxdHlJbkJhc2VVbml0cyA+IHRoaXMuZ2V0TWF4UXVhbnRpdHkoKSkge1xuICAgICAgICAgICAgdGhpcy5tdUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGlkZU5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHlNYXhFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVFcnJvciAmJiAhaXNGaW5pdGUocXR5SW5TYWxlc1VuaXRzKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVFcnJvciB8fCB0aGlzLnB1RXJyb3IgfHwgdGhpcy5pc0FkZFRvQ2FydERpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvQ2FydEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB0aGlzLnNob3dDb3JyZWN0SW5wdXRTdWdnZXN0aW9ucyhxdHlJblNhbGVzVW5pdHMpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF0eUluQmFzZVVuaXRJbnB1dC52YWx1ZSA9IFN0cmluZyhxdHlJbkJhc2VVbml0cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5CYXNlVW5pdElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLm9uQW1vdW50SW5wdXRDaGFuZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy5oaWRlTm90aWZpY2F0aW9ucygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlTm90aWZpY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdUNob2ljZU5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlCZXR3ZWVuRWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eU1pbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlNYXhFbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93Q29ycmVjdElucHV0U3VnZ2VzdGlvbnMocXR5SW5TYWxlc1VuaXRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubXVFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbWluQ2hvaWNlID0gdGhpcy5nZXRNaW5DaG9pY2UocXR5SW5TYWxlc1VuaXRzKTtcbiAgICAgICAgICAgIGNvbnN0IG1heENob2ljZSA9IHRoaXMuZ2V0TWF4Q2hvaWNlKHF0eUluU2FsZXNVbml0cywgbWluQ2hvaWNlKTtcblxuICAgICAgICAgICAgdGhpcy5tdUNob2ljZUxpc3RFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tdUN1cnJlbnRDaG9pY2VFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tdUN1cnJlbnRDaG9pY2VFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGhpcy5yb3VuZChxdHlJblNhbGVzVW5pdHMsIHRoaXMuZGVjaW1hbHMpfSAke3RoaXMuZ2V0VW5pdE5hbWUoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2FsZXNVbml0LnByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdC5jb2RlLFxuICAgICAgICAgICAgKX1gO1xuXG4gICAgICAgICAgICBjb25zdCBjaG9pY2VFbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgY2hvaWNlRWxlbWVudHMucHVzaCh0aGlzLmNyZWF0ZUNob2ljZUVsZW1lbnQobWluQ2hvaWNlKSk7XG5cbiAgICAgICAgICAgIGlmIChtYXhDaG9pY2UgIT09IG1pbkNob2ljZSkge1xuICAgICAgICAgICAgICAgIGNob2ljZUVsZW1lbnRzLnB1c2godGhpcy5jcmVhdGVDaG9pY2VFbGVtZW50KG1heENob2ljZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PlxuICAgICAgICAgICAgICAgIGVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHRoaXMubXVDaG9pY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMubXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNob2ljZUVsZW1lbnQocXR5SW5CYXNlVW5pdHM6IG51bWJlcik6IEhUTUxTcGFuRWxlbWVudCB7XG4gICAgICAgIGlmIChxdHlJbkJhc2VVbml0cyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hvaWNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgcXR5SW5TYWxlc1VuaXRzID0gdGhpcy5jb252ZXJ0QmFzZVVuaXRzQW1vdW50VG9DdXJyZW50U2FsZXNVbml0c0Ftb3VudChxdHlJbkJhc2VVbml0cyk7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVtZW50U2FsZXNVbml0TmFtZSA9IHRoaXMuZ2V0VW5pdE5hbWUodGhpcy5jdXJyZW50U2FsZXNVbml0LnByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdC5jb2RlKTtcbiAgICAgICAgY29uc3QgbWVhc3VyZW1lbnRCYXNlVW5pdE5hbWUgPSB0aGlzLmdldFVuaXROYW1lKHRoaXMuYmFzZVVuaXQuY29kZSk7XG5cbiAgICAgICAgY2hvaWNlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XG4gICAgICAgIGNob2ljZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWJhc2UtdW5pdC1xdHknLCBTdHJpbmcocXR5SW5CYXNlVW5pdHMpKTtcbiAgICAgICAgY2hvaWNlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2FsZXMtdW5pdC1xdHknLCBTdHJpbmcocXR5SW5TYWxlc1VuaXRzKSk7XG4gICAgICAgIGNob2ljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgKCR7dGhpcy5yb3VuZChcbiAgICAgICAgICAgIHF0eUluU2FsZXNVbml0cyxcbiAgICAgICAgICAgIHRoaXMuZGVjaW1hbHMsXG4gICAgICAgICl9ICR7bWVhc3VyZW1lbnRTYWxlc1VuaXROYW1lfSkgPSAoJHtxdHlJbkJhc2VVbml0c30gJHttZWFzdXJlbWVudEJhc2VVbml0TmFtZX0pYDtcbiAgICAgICAgY2hvaWNlRWxlbWVudC5vbmNsaWNrID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgcXR5SW5CYXNlVW5pdHNWYWx1ZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5kYXRhc2V0LmJhc2VVbml0UXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHF0eUluU2FsZXNVbml0c1ZhbHVlID0gcGFyc2VGbG9hdChlbGVtZW50LmRhdGFzZXQuc2FsZXNVbml0UXR5KTtcbiAgICAgICAgICAgIHRoaXMubXVFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RRdHkocXR5SW5CYXNlVW5pdHNWYWx1ZSwgcXR5SW5TYWxlc1VuaXRzVmFsdWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNob2ljZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgcmV0dXJuIGNob2ljZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbGVjdFF0eShxdHlJbkJhc2VVbml0czogbnVtYmVyLCBxdHlJblNhbGVzVW5pdHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnF0eUluQmFzZVVuaXRJbnB1dC52YWx1ZSA9IFN0cmluZyhxdHlJbkJhc2VVbml0cyk7XG4gICAgICAgIHRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dC52YWx1ZSA9IFN0cmluZyh0aGlzLnJvdW5kKHF0eUluU2FsZXNVbml0cywgdGhpcy5kZWNpbWFscykpO1xuICAgICAgICBpZiAoIXRoaXMucHVFcnJvciAmJiAhdGhpcy5pc0FkZFRvQ2FydERpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLnF0eUlucHV0Q2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1pbkNob2ljZShxdHlJblNhbGVzVW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHF0eUluQmFzZVVuaXRzID0gdGhpcy5mbG9vcih0aGlzLm11bHRpcGx5KHF0eUluU2FsZXNVbml0cywgdGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24pKTtcblxuICAgICAgICBpZiAocXR5SW5CYXNlVW5pdHMgPCB0aGlzLmdldE1pblF1YW50aXR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1pblF1YW50aXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAocXR5SW5CYXNlVW5pdHMgLSB0aGlzLmdldE1pblF1YW50aXR5KCkpICUgdGhpcy5nZXRRdWFudGl0eUludGVydmFsKCkgIT09IDAgfHxcbiAgICAgICAgICAgICh0aGlzLmdldE1heFF1YW50aXR5KCkgPiAwICYmIHF0eUluQmFzZVVuaXRzID4gdGhpcy5nZXRNYXhRdWFudGl0eSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1pbkNob2ljZSh0aGlzLmNvbnZlcnRCYXNlVW5pdHNBbW91bnRUb0N1cnJlbnRTYWxlc1VuaXRzQW1vdW50KHF0eUluQmFzZVVuaXRzIC0gMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHF0eUluQmFzZVVuaXRzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNYXhDaG9pY2UocXR5SW5TYWxlc1VuaXRzOiBudW1iZXIsIG1pbkNob2ljZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHF0eUluQmFzZVVuaXRzID0gdGhpcy5jZWlsKHRoaXMubXVsdGlwbHkocXR5SW5TYWxlc1VuaXRzLCB0aGlzLmN1cnJlbnRTYWxlc1VuaXQuY29udmVyc2lvbikpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE1heFF1YW50aXR5KCkgPiAwICYmIHF0eUluQmFzZVVuaXRzID4gdGhpcy5nZXRNYXhRdWFudGl0eSgpKSB7XG4gICAgICAgICAgICBxdHlJbkJhc2VVbml0cyA9IHRoaXMuZ2V0TWF4UXVhbnRpdHkoKTtcblxuICAgICAgICAgICAgaWYgKChxdHlJbkJhc2VVbml0cyAtIHRoaXMuZ2V0TWluUXVhbnRpdHkoKSkgJSB0aGlzLmdldFF1YW50aXR5SW50ZXJ2YWwoKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHF0eUluQmFzZVVuaXRzID1cbiAgICAgICAgICAgICAgICAgICAgcXR5SW5CYXNlVW5pdHMgLSAoKHF0eUluQmFzZVVuaXRzIC0gdGhpcy5nZXRNaW5RdWFudGl0eSgpKSAlIHRoaXMuZ2V0UXVhbnRpdHlJbnRlcnZhbCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHF0eUluQmFzZVVuaXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChxdHlJbkJhc2VVbml0cyAtIHRoaXMuZ2V0TWluUXVhbnRpdHkoKSkgJSB0aGlzLmdldFF1YW50aXR5SW50ZXJ2YWwoKSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWF4Q2hvaWNlKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQoXG4gICAgICAgICAgICAgICAgICAgIChxdHlJbkJhc2VVbml0cyArIDEpIC8gdGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24sXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtaW5DaG9pY2UsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHF0eUluQmFzZVVuaXRzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0QmFzZVVuaXRzQW1vdW50VG9DdXJyZW50U2FsZXNVbml0c0Ftb3VudChxdHlJbkJhc2VVbml0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIE1hdGgucm91bmQoKHF0eUluQmFzZVVuaXRzIC8gdGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24pICogdGhpcy5jdXJyZW50U2FsZXNVbml0LnByZWNpc2lvbikgL1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2FsZXNVbml0LnByZWNpc2lvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmbG9vcih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNlaWwodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3VuZCh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihgJHtNYXRoLnJvdW5kKHBhcnNlRmxvYXQoYCR7dmFsdWV9ZSR7ZGVjaW1hbHN9YCkpfWUtJHtkZWNpbWFsc31gKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbXVsdGlwbHkoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhICogYjtcbiAgICAgICAgY29uc3QgcHJlY2lzaW9uID0gTnVtYmVyKHRoaXMuY3VycmVudFNhbGVzVW5pdC5wcmVjaXNpb24pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHJlc3VsdCAqIHByZWNpc2lvbikgLyBwcmVjaXNpb247XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1pblF1YW50aXR5KCk6IG51bWJlciB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5X21pbicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZS5xdWFudGl0eV9taW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TWF4UXVhbnRpdHkoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgncXVhbnRpdHlfbWF4JykgJiZcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZS5xdWFudGl0eV9tYXggIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlLnF1YW50aXR5X21heDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRRdWFudGl0eUludGVydmFsKCk6IG51bWJlciB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5X2ludGVydmFsJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlLnF1YW50aXR5X2ludGVydmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTWVhc3VyZW1lbnRVbml0SW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNhbGVzVW5pdElkID0gcGFyc2VJbnQoKDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNhbGVzVW5pdCA9IHRoaXMuZ2V0U2FsZXNVbml0QnlJZChzYWxlc1VuaXRJZCk7XG4gICAgICAgIGxldCBxdHlJblNhbGVzVW5pdHMgPSBOdW1iZXIodGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnZhbHVlKTtcbiAgICAgICAgY29uc3QgcXR5SW5CYXNlVW5pdHMgPSB0aGlzLm11bHRpcGx5KHF0eUluU2FsZXNVbml0cywgdGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24pO1xuICAgICAgICB0aGlzLmN1cnJlbnRTYWxlc1VuaXQgPSBzYWxlc1VuaXQ7XG4gICAgICAgIHF0eUluU2FsZXNVbml0cyA9IHRoaXMuY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQocXR5SW5CYXNlVW5pdHMpO1xuXG4gICAgICAgIGlmIChpc0Zpbml0ZShxdHlJblNhbGVzVW5pdHMpKSB7XG4gICAgICAgICAgICB0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcodGhpcy5yb3VuZChxdHlJblNhbGVzVW5pdHMsIHRoaXMuZGVjaW1hbHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXR5SW5wdXRDaGFuZ2UocXR5SW5TYWxlc1VuaXRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U2FsZXNVbml0QnlJZChzYWxlc1VuaXRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbGVzVW5pdHMuZmluZCgoaXRlbTogU2FsZXNVbml0KSA9PiBzYWxlc1VuaXRJZCA9PT0gaXRlbS5pZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRVbml0TmFtZShrZXk6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb25zW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFtb3VudElucHV0Q2hhbmdlKGFtb3VudEluU2FsZXNVbml0SW5wdXQ/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBhbW91bnREZWNpbWFsc01heExlbmd0aCA9IG5ldyBSZWdFeHAoYCgoXFwufFxcLClcXFxcZHske3RoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzfX0pXFxcXGQrYCwgJ2cnKTtcblxuICAgICAgICBpZiAodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnZhbHVlLm1hdGNoKC9bLC5dLykpIHtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC52YWx1ZSA9IHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC52YWx1ZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGFtb3VudERlY2ltYWxzTWF4TGVuZ3RoLFxuICAgICAgICAgICAgICAgICckMScsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhbW91bnRJblNhbGVzVW5pdElucHV0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYW1vdW50SW5TYWxlc1VuaXRJbnB1dCA9IE51bWJlcih0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYW1vdW50SW5CYXNlVW5pdHMgPSBOdW1iZXIoXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgKGFtb3VudEluU2FsZXNVbml0SW5wdXQgKiB0aGlzLnByZWNpc2lvbiAqIE51bWJlcih0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24pKSAvXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVjaXNpb25cbiAgICAgICAgICAgICkudG9GaXhlZCh0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VCbG9jay5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgdGhpcy5wdUVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQW1vdW50TXVsdGlwbGVUb0ludGVydmFsKGFtb3VudEluQmFzZVVuaXRzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wdUludGVydmFsTm90aWZpY2F0aW9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFtb3VudEluQmFzZVVuaXRzIDwgdGhpcy5nZXRNaW5BbW91bnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wdU1pbk5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldE1heEFtb3VudCgpID4gMCAmJiBhbW91bnRJbkJhc2VVbml0cyA+IHRoaXMuZ2V0TWF4QW1vdW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucHVNYXhOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHVFcnJvciB8fCB0aGlzLm11RXJyb3IgfHwgdGhpcy5pc0FkZFRvQ2FydERpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFza0N1c3RvbWVyRm9yQ29ycmVjdEFtb3VudElucHV0KGFtb3VudEluU2FsZXNVbml0SW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBOdW1iZXIodGhpcy5xdHlJbkJhc2VVbml0SW5wdXQudmFsdWUpO1xuICAgICAgICBjb25zdCB0b3RhbEFtb3VudCA9ICgoYW1vdW50SW5CYXNlVW5pdHMgKiB0aGlzLnByZWNpc2lvbiAqIHF1YW50aXR5KSAvIHRoaXMucHJlY2lzaW9uKS50b0ZpeGVkKFxuICAgICAgICAgICAgdGhpcy5udW1iZXJPZkRlY2ltYWxQbGFjZXMsXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hbW91bnRJbkJhc2VVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcocGFyc2VGbG9hdCh0b3RhbEFtb3VudCkpO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRoaXMuaGlkZVBhY2thZ2luZ1VuaXRSZXN0cmljdGlvbk5vdGlmaWNhdGlvbnMoKTtcblxuICAgICAgICB0aGlzLnByaWNlQ2FsY3VsYXRpb24oYW1vdW50SW5CYXNlVW5pdHMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmljZUNhbGN1bGF0aW9uKGFtb3VudEluQmFzZVVuaXRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbUJhc2VQcmljZTogbnVtYmVyID0gTnVtYmVyKHRoaXMuaXRlbUJhc2VQcmljZUlucHV0LnZhbHVlKTtcbiAgICAgICAgY29uc3QgYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dFZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhpcy5hbW91bnREZWZhdWx0SW5CYXNlVW5pdElucHV0LnZhbHVlKTtcblxuICAgICAgICBpZiAoYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dFZhbHVlICE9PSBhbW91bnRJbkJhc2VVbml0cykge1xuICAgICAgICAgICAgbGV0IG5ld1ByaWNlID0gKGFtb3VudEluQmFzZVVuaXRzIC8gYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dFZhbHVlKSAqIGl0ZW1CYXNlUHJpY2U7XG4gICAgICAgICAgICBuZXdQcmljZSA9IChuZXdQcmljZSAqIE51bWJlcih0aGlzLnF0eUluQmFzZVVuaXRJbnB1dC52YWx1ZSkpIC8gTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuZGVncmVlWzBdKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlVmFsdWVCbG9jay5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbU1vbmV5U3ltYm9sSW5wdXQudmFsdWUgKyBuZXdQcmljZS50b0ZpeGVkKHRoaXMuZGVncmVlWzBdKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlQmxvY2suY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXNrQ3VzdG9tZXJGb3JDb3JyZWN0QW1vdW50SW5wdXQoYW1vdW50SW5TYWxlc1VuaXRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcHVDaG9pY2VMaXN0RWxlbWVudCA9IHRoaXMucHVDaG9pY2VFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19saXN0YClbMF07XG4gICAgICAgIGNvbnN0IHB1Q3VycmVudENob2ljZUVsZW1lbnQgPSB0aGlzLnB1Q2hvaWNlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgICAgICAgYCR7dGhpcy5qc05hbWV9X19hbW91bnQtY3VycmVudC1jaG9pY2VgLFxuICAgICAgICApWzBdO1xuXG4gICAgICAgIGlmICh0aGlzLnB1RXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbkNob2ljZSA9IHRoaXMuZ2V0TWluQW1vdW50Q2hvaWNlKGFtb3VudEluU2FsZXNVbml0cyk7XG4gICAgICAgICAgICBjb25zdCBtYXhDaG9pY2UgPSB0aGlzLmdldE1heEFtb3VudENob2ljZShhbW91bnRJblNhbGVzVW5pdHMsIG1pbkNob2ljZSk7XG5cbiAgICAgICAgICAgIHB1Q2hvaWNlTGlzdEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBwdUN1cnJlbnRDaG9pY2VFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcHVDdXJyZW50Q2hvaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RoaXMucm91bmQoYW1vdW50SW5TYWxlc1VuaXRzLCB0aGlzLmRlY2ltYWxzKX0gJHt0aGlzLmdldFVuaXROYW1lKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQucHJvZHVjdF9tZWFzdXJlbWVudF91bml0LmNvZGUsXG4gICAgICAgICAgICApfWA7XG5cbiAgICAgICAgICAgIGNvbnN0IGNob2ljZUVsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgIGlmIChtaW5DaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VFbGVtZW50cy5wdXNoKHRoaXMuY3JlYXRlQW1vdW50Q2hvaWNlRWxlbWVudChtaW5DaG9pY2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1heENob2ljZSAhPT0gbWluQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlRWxlbWVudHMucHVzaCh0aGlzLmNyZWF0ZUFtb3VudENob2ljZUVsZW1lbnQobWF4Q2hvaWNlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+XG4gICAgICAgICAgICAgICAgZWxlbWVudCAhPT0gdW5kZWZpbmVkID8gcHVDaG9pY2VMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMucHVDaG9pY2VFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRDdXJyZW50TGVhZFNhbGVzVW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmxlYWRTYWxlc1VuaXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0ID0gdGhpcy5sZWFkU2FsZXNVbml0cy5maW5kKChpdGVtOiBTYWxlc1VuaXQpID0+IGl0ZW0uaXNfZGVmYXVsdCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUFtb3VudENob2ljZUVsZW1lbnQoYW1vdW50SW5CYXNlVW5pdHM6IG51bWJlcik6IEhUTUxTcGFuRWxlbWVudCB7XG4gICAgICAgIGlmIChhbW91bnRJbkJhc2VVbml0cyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNob2ljZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRJblNhbGVzVW5pdHMgPSAoXG4gICAgICAgICAgICAgICAgKGFtb3VudEluQmFzZVVuaXRzICogdGhpcy5wcmVjaXNpb24pIC9cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24gL1xuICAgICAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uXG4gICAgICAgICAgICApLnRvRml4ZWQodGhpcy5udW1iZXJPZkRlY2ltYWxQbGFjZXMpO1xuICAgICAgICAgICAgY29uc3QgbWVhc3VyZW1lbnRTYWxlc1VuaXROYW1lID0gdGhpcy5nZXRVbml0TmFtZSh0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LnByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdC5jb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IG1lYXN1cmVtZW50QmFzZVVuaXROYW1lID0gdGhpcy5nZXRVbml0TmFtZSh0aGlzLmJhc2VVbml0LmNvZGUpO1xuXG4gICAgICAgICAgICBjb25zdCBzYWxlc1VuaXRDaG9pY2UgPSBgJHtwYXJzZUZsb2F0KGFtb3VudEluU2FsZXNVbml0cyl9ICR7bWVhc3VyZW1lbnRTYWxlc1VuaXROYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBiYXNlVW5pdENob2ljZSA9IGAke2Ftb3VudEluQmFzZVVuaXRzfSAke21lYXN1cmVtZW50QmFzZVVuaXROYW1lfWA7XG5cbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbGluaycpO1xuICAgICAgICAgICAgY2hvaWNlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmFzZS11bml0LWFtb3VudCcsIFN0cmluZyhhbW91bnRJbkJhc2VVbml0cykpO1xuICAgICAgICAgICAgY2hvaWNlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2FsZXMtdW5pdC1hbW91bnQnLCBTdHJpbmcocGFyc2VGbG9hdChhbW91bnRJblNhbGVzVW5pdHMpKSk7XG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50LnRleHRDb250ZW50ID0gYCgke3NhbGVzVW5pdENob2ljZX0pID0gKCR7YmFzZVVuaXRDaG9pY2V9KWA7XG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50Lm9uY2xpY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudEluQmFzZVVuaXRzVmFsdWUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZGF0YXNldC5iYXNlVW5pdEFtb3VudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYW1vdW50SW5TYWxlc1VuaXRzVmFsdWUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZGF0YXNldC5zYWxlc1VuaXRBbW91bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMucHVFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0QW1vdW50KGFtb3VudEluQmFzZVVuaXRzVmFsdWUsIGFtb3VudEluU2FsZXNVbml0c1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgIHJldHVybiBjaG9pY2VFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbGVjdEFtb3VudChhbW91bnRJbkJhc2VVbml0czogbnVtYmVyLCBhbW91bnRJblNhbGVzVW5pdHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcoYW1vdW50SW5TYWxlc1VuaXRzKTtcbiAgICAgICAgdGhpcy5hbW91bnRJbkJhc2VVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcoYW1vdW50SW5CYXNlVW5pdHMpO1xuICAgICAgICBpZiAoIXRoaXMubXVFcnJvciAmJiAhdGhpcy5pc0FkZFRvQ2FydERpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdUNob2ljZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMub25BbW91bnRJbnB1dENoYW5nZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxlYWRTYWxlc1VuaXRTZWxlY3RDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNhbGVzVW5pdElkID0gcGFyc2VJbnQoKDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNhbGVzVW5pdCA9IHRoaXMuZ2V0TGVhZFNhbGVzVW5pdEJ5SWQoc2FsZXNVbml0SWQpO1xuXG4gICAgICAgIGNvbnN0IGFtb3VudEluU2FsZXNVbml0cyA9IHRoaXMuZ2V0QW1vdW50Q29udmVyc2lvbihcbiAgICAgICAgICAgIE51bWJlcih0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUpLFxuICAgICAgICAgICAgc2FsZXNVbml0LmNvbnZlcnNpb24sXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFtb3VudEluU2FsZXNVbml0c01pbiA9IHRoaXMuZ2V0QW1vdW50Q29udmVyc2lvbihcbiAgICAgICAgICAgIE51bWJlcih0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQubWluKSxcbiAgICAgICAgICAgIHNhbGVzVW5pdC5jb252ZXJzaW9uLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhbW91bnRJblNhbGVzVW5pdHNNYXggPSB0aGlzLmdldEFtb3VudENvbnZlcnNpb24oXG4gICAgICAgICAgICBOdW1iZXIodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0Lm1heCksXG4gICAgICAgICAgICBzYWxlc1VuaXQuY29udmVyc2lvbixcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYW1vdW50SW5TYWxlc1VuaXRzU3RlcCA9IHRoaXMuZ2V0QW1vdW50Q29udmVyc2lvbihcbiAgICAgICAgICAgIE51bWJlcih0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQuc3RlcCksXG4gICAgICAgICAgICBzYWxlc1VuaXQuY29udmVyc2lvbixcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0ID0gc2FsZXNVbml0O1xuICAgICAgICB0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcoYW1vdW50SW5TYWxlc1VuaXRzKTtcblxuICAgICAgICBpZiAodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0Lm1pbikge1xuICAgICAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0Lm1pbiA9IFN0cmluZyhhbW91bnRJblNhbGVzVW5pdHNNaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5tYXggPSBTdHJpbmcoYW1vdW50SW5TYWxlc1VuaXRzTWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQuc3RlcCkge1xuICAgICAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnN0ZXAgPSBTdHJpbmcoYW1vdW50SW5TYWxlc1VuaXRzU3RlcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQW1vdW50SW5wdXRDaGFuZ2UoYW1vdW50SW5TYWxlc1VuaXRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZVBhY2thZ2luZ1VuaXRSZXN0cmljdGlvbk5vdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHVDaG9pY2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLnB1TWluTm90aWZpY2F0aW9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgdGhpcy5wdU1heE5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucHVJbnRlcnZhbE5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldExlYWRTYWxlc1VuaXRCeUlkKHNhbGVzVW5pdElkOiBudW1iZXIpOiBTYWxlc1VuaXQge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWFkU2FsZXNVbml0cy5maW5kKChpdGVtOiBTYWxlc1VuaXQpID0+IHNhbGVzVW5pdElkID09PSBpdGVtLmlkX3Byb2R1Y3RfbWVhc3VyZW1lbnRfc2FsZXNfdW5pdCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1pbkFtb3VudCgpOiBudW1iZXIge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnYW1vdW50X21pbicpICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZS5hbW91bnRfbWluICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZS5hbW91bnRfbWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNYXhBbW91bnQoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ2Ftb3VudF9tYXgnKSAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuYW1vdW50X21heCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuYW1vdW50X21heCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QW1vdW50SW50ZXJ2YWwoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ2Ftb3VudF9pbnRlcnZhbCcpICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZS5hbW91bnRfaW50ZXJ2YWwgIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlLmFtb3VudF9pbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TWluQW1vdW50Q2hvaWNlKGFtb3VudEluU2FsZXNVbml0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYW1vdW50SW5CYXNlVW5pdHMgPSBOdW1iZXIoXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgKGFtb3VudEluU2FsZXNVbml0cyAqIHRoaXMucHJlY2lzaW9uICogTnVtYmVyKHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQuY29udmVyc2lvbikpIC9cbiAgICAgICAgICAgICAgICB0aGlzLnByZWNpc2lvblxuICAgICAgICAgICAgKS50b0ZpeGVkKHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzKSxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoYW1vdW50SW5CYXNlVW5pdHMgPCB0aGlzLmdldE1pbkFtb3VudCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5BbW91bnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQW1vdW50R3JlYXRlclRoYW5NYXhBbW91bnQoYW1vdW50SW5CYXNlVW5pdHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQW1vdW50TXVsdGlwbGVUb0ludGVydmFsKGFtb3VudEluQmFzZVVuaXRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluQW1vdW50Q2hvaWNlKFxuICAgICAgICAgICAgICAgIChhbW91bnRJbkJhc2VVbml0cyAtIHRoaXMuZ2V0QW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24oYW1vdW50SW5CYXNlVW5pdHMpKSAvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQuY29udmVyc2lvbixcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW1vdW50SW5CYXNlVW5pdHM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1heEFtb3VudENob2ljZShhbW91bnRJblNhbGVzVW5pdHM6IG51bWJlciwgbWluQ2hvaWNlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgYW1vdW50SW5CYXNlVW5pdHMgPSBOdW1iZXIoXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgKGFtb3VudEluU2FsZXNVbml0cyAqIHRoaXMucHJlY2lzaW9uICogTnVtYmVyKHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQuY29udmVyc2lvbikpIC9cbiAgICAgICAgICAgICAgICB0aGlzLnByZWNpc2lvblxuICAgICAgICAgICAgKS50b0ZpeGVkKHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzKSxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5pc0Ftb3VudEdyZWF0ZXJUaGFuTWF4QW1vdW50KGFtb3VudEluQmFzZVVuaXRzKSkge1xuICAgICAgICAgICAgYW1vdW50SW5CYXNlVW5pdHMgPSB0aGlzLmdldE1heEFtb3VudCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbChhbW91bnRJbkJhc2VVbml0cykpIHtcbiAgICAgICAgICAgICAgICBhbW91bnRJbkJhc2VVbml0cyA9IGFtb3VudEluQmFzZVVuaXRzIC0gdGhpcy5nZXRBbW91bnRQZXJjZW50YWdlT2ZEaXZpc2lvbihhbW91bnRJbkJhc2VVbml0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhbW91bnRJbkJhc2VVbml0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbW91bnRJbkJhc2VVbml0cyA8PSBtaW5DaG9pY2UpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBbW91bnRNdWx0aXBsZVRvSW50ZXJ2YWwoYW1vdW50SW5CYXNlVW5pdHMpKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0UG9zc2libGVJbnRlcnZhbCA9IE51bWJlcihcbiAgICAgICAgICAgICAgICAoKG1pbkNob2ljZSAqIHRoaXMucHJlY2lzaW9uICsgdGhpcy5nZXRBbW91bnRJbnRlcnZhbCgpICogdGhpcy5wcmVjaXNpb24pIC8gdGhpcy5wcmVjaXNpb24pLnRvRml4ZWQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV4dFBvc3NpYmxlSW50ZXJ2YWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW1vdW50SW5CYXNlVW5pdHM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzQW1vdW50R3JlYXRlclRoYW5NYXhBbW91bnQoYW1vdW50SW5CYXNlVW5pdHM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXhBbW91bnQoKSA+IDAgJiYgYW1vdW50SW5CYXNlVW5pdHMgPiB0aGlzLmdldE1heEFtb3VudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbChhbW91bnRJbkJhc2VVbml0czogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFtb3VudFBlcmNlbnRhZ2VPZkRpdmlzaW9uKGFtb3VudEluQmFzZVVuaXRzKSAhPT0gMDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QW1vdW50Q29udmVyc2lvbih2YWx1ZTogbnVtYmVyLCBjb252ZXJzaW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChcbiAgICAgICAgICAgICgodmFsdWUgKiB0aGlzLnByZWNpc2lvbiAqIHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQuY29udmVyc2lvbikgLyBjb252ZXJzaW9uIC8gdGhpcy5wcmVjaXNpb24pLnRvRml4ZWQoXG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJPZkRlY2ltYWxQbGFjZXMsXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRBbW91bnRQZXJjZW50YWdlT2ZEaXZpc2lvbihhbW91bnRJbkJhc2VVbml0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYW1vdW50TXVsdGlwbHlUb1ByZWNpc2lvbiA9IE1hdGgucm91bmQoYW1vdW50SW5CYXNlVW5pdHMgKiB0aGlzLnByZWNpc2lvbik7XG4gICAgICAgIGNvbnN0IG1pbkFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24gPSBNYXRoLnJvdW5kKHRoaXMuZ2V0TWluQW1vdW50KCkgKiB0aGlzLnByZWNpc2lvbik7XG4gICAgICAgIGNvbnN0IGFtb3VudEludGVydmFsTXVsdGlwbHlUb1ByZWNpc2lvbiA9IHRoaXMuZ2V0QW1vdW50SW50ZXJ2YWwoKSAqIHRoaXMucHJlY2lzaW9uO1xuICAgICAgICBjb25zdCBjdXJyZW50TWludXNNaW5pbXVtQW1vdW50ID0gTnVtYmVyKFxuICAgICAgICAgICAgKChhbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uIC0gbWluQW1vdW50TXVsdGlwbHlUb1ByZWNpc2lvbikgLyB0aGlzLnByZWNpc2lvbikudG9GaXhlZChcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNaW51c01pbmltdW1BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uID0gTWF0aC5yb3VuZChjdXJyZW50TWludXNNaW5pbXVtQW1vdW50ICogdGhpcy5wcmVjaXNpb24pO1xuICAgICAgICBjb25zdCBhbW91bnRQZXJjZW50YWdlT2ZEaXZpc2lvbiA9IChcbiAgICAgICAgICAgIChjdXJyZW50TWludXNNaW5pbXVtQW1vdW50TXVsdGlwbHlUb1ByZWNpc2lvbiAlIGFtb3VudEludGVydmFsTXVsdGlwbHlUb1ByZWNpc2lvbikgL1xuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb25cbiAgICAgICAgKS50b0ZpeGVkKHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzKTtcblxuICAgICAgICByZXR1cm4gTnVtYmVyKGFtb3VudFBlcmNlbnRhZ2VPZkRpdmlzaW9uKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByZWNpc2lvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGAxJHsnMCcucmVwZWF0KHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzKX1gKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHBhY2thZ2luZ0pTT05TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdqc29uJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==