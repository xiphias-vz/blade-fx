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
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* tslint:disable: max-file-line-count */

/*
 * @tag example This code provides example of using the Product Packaging Unit.
 */

var HIDDEN_CLASS_NAME = 'is-hidden';

var PackagingUnitQuantitySelector = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PackagingUnitQuantitySelector, _Component);

  var _super = _createSuper(PackagingUnitQuantitySelector);

  function PackagingUnitQuantitySelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "qtyInSalesUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "qtyInBaseUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "measurementUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "addToCartButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "leadSalesUnitSelect", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "baseUnit", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "salesUnits", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentSalesUnit", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productQuantityStorage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "translations", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "leadSalesUnits", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productPackagingUnitStorage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "amountInSalesUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "amountDefaultInBaseUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "itemBasePriceInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "itemMoneySymbolInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "amountInBaseUnitInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentLeadSalesUnit", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productPackagingNewPriceBlock", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productPackagingNewPriceValueBlock", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "quantityBetweenElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "quantityMinElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "quantityMaxElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "muChoiceNotificationElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "muChoiceListElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "muCurrentChoiceElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "puChoiceElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "puMinNotificationElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "puMaxNotificationElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "puIntervalNotificationElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isAddToCartDisabled", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "muError", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "puError", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "decimals", 4);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "factor", 10);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "numberOfDecimalPlaces", 10);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "degree", [2, 3]);

    return _this;
  }

  var _proto = PackagingUnitQuantitySelector.prototype;

  /* tslint:enable: no-magic-numbers */
  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
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
  };

  _proto.initJson = function initJson() {
    var packagingUnitData = JSON.parse(this.packagingJSONString);
    this.baseUnit = packagingUnitData.baseUnit;
    this.salesUnits = packagingUnitData.salesUnits;
    this.leadSalesUnits = packagingUnitData.leadSalesUnits;
    this.isAddToCartDisabled = packagingUnitData.isAddToCartDisabled;
    this.productPackagingUnitStorage = packagingUnitData.productPackagingUnitStorage;
    this.productQuantityStorage = packagingUnitData.productQuantityStorage;
  };

  _proto.initFormDefaultValues = function initFormDefaultValues() {
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
  };

  _proto.initTranslations = function initTranslations() {
    this.translations = JSON.parse(this.getElementsByClassName(this.jsName + "__measurement-unit-translation")[0].innerHTML);
  };

  _proto.initCurrentSalesUnit = function initCurrentSalesUnit() {
    this.currentSalesUnit = this.salesUnits.find(function (item) {
      return item.is_default;
    });
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.qtyInSalesUnitInput.addEventListener('input', function (event) {
      return _this2.qtyInputChange();
    });

    if (this.measurementUnitInput) {
      this.measurementUnitInput.addEventListener('change', function (event) {
        return _this2.onMeasurementUnitInputChange(event);
      });
    }

    if (this.amountInSalesUnitInput) {
      this.amountInSalesUnitInput.addEventListener('input', function (event) {
        return _this2.onAmountInputChange();
      });
    }

    if (this.leadSalesUnitSelect) {
      this.leadSalesUnitSelect.addEventListener('change', function (event) {
        return _this2.onLeadSalesUnitSelectChange(event);
      });
    }
  };

  _proto.qtyInputChange = function qtyInputChange(qtyInSalesUnits) {
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
  };

  _proto.hideNotifications = function hideNotifications() {
    this.muChoiceNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityBetweenElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityMinElement.classList.add(HIDDEN_CLASS_NAME);
    this.quantityMaxElement.classList.add(HIDDEN_CLASS_NAME);
  };

  _proto.showCorrectInputSuggestions = function showCorrectInputSuggestions(qtyInSalesUnits) {
    var _this3 = this;

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

      choiceElements.forEach(function (element) {
        return element !== undefined ? _this3.muChoiceListElement.appendChild(element) : undefined;
      });
      this.muChoiceNotificationElement.classList.remove(HIDDEN_CLASS_NAME);
    }
  };

  _proto.createChoiceElement = function createChoiceElement(qtyInBaseUnits) {
    var _this4 = this;

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

    choiceElement.onclick = function (event) {
      var element = event.currentTarget;
      var qtyInBaseUnitsValue = parseFloat(element.dataset.baseUnitQty);
      var qtyInSalesUnitsValue = parseFloat(element.dataset.salesUnitQty);
      _this4.muError = false;

      _this4.selectQty(qtyInBaseUnitsValue, qtyInSalesUnitsValue);
    };

    choiceElement.style.display = 'block';
    return choiceElement;
  };

  _proto.selectQty = function selectQty(qtyInBaseUnits, qtyInSalesUnits) {
    this.qtyInBaseUnitInput.value = String(qtyInBaseUnits);
    this.qtyInSalesUnitInput.value = String(this.round(qtyInSalesUnits, this.decimals));

    if (!this.puError && !this.isAddToCartDisabled) {
      this.addToCartButton.removeAttribute('disabled');
      this.qtyInSalesUnitInput.removeAttribute('disabled');
    }

    this.muChoiceNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.qtyInputChange();
  };

  _proto.getMinChoice = function getMinChoice(qtyInSalesUnits) {
    var qtyInBaseUnits = this.floor(this.multiply(qtyInSalesUnits, this.currentSalesUnit.conversion));

    if (qtyInBaseUnits < this.getMinQuantity()) {
      return this.getMinQuantity();
    }

    if ((qtyInBaseUnits - this.getMinQuantity()) % this.getQuantityInterval() !== 0 || this.getMaxQuantity() > 0 && qtyInBaseUnits > this.getMaxQuantity()) {
      return this.getMinChoice(this.convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits - 1));
    }

    return qtyInBaseUnits;
  };

  _proto.getMaxChoice = function getMaxChoice(qtyInSalesUnits, minChoice) {
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
  };

  _proto.convertBaseUnitsAmountToCurrentSalesUnitsAmount = function convertBaseUnitsAmountToCurrentSalesUnitsAmount(qtyInBaseUnits) {
    return Math.round(qtyInBaseUnits / this.currentSalesUnit.conversion * this.currentSalesUnit.precision) / this.currentSalesUnit.precision;
  };

  _proto.floor = function floor(value) {
    if (Math.floor(value) > 0) {
      return Math.floor(value);
    }

    return Math.ceil(value);
  };

  _proto.ceil = function ceil(value) {
    return Math.ceil(value);
  };

  _proto.round = function round(value, decimals) {
    return Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);
  };

  _proto.multiply = function multiply(a, b) {
    var result = a * b;
    var precision = Number(this.currentSalesUnit.precision);
    return Math.round(result * precision) / precision;
  };

  _proto.getMinQuantity = function getMinQuantity() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_min')) {
      return this.productQuantityStorage.quantity_min;
    }

    return 1;
  };

  _proto.getMaxQuantity = function getMaxQuantity() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_max') && this.productQuantityStorage.quantity_max !== null) {
      return this.productQuantityStorage.quantity_max;
    }

    return 0;
  };

  _proto.getQuantityInterval = function getQuantityInterval() {
    if (typeof this.productQuantityStorage !== 'undefined' && this.productQuantityStorage.hasOwnProperty('quantity_interval')) {
      return this.productQuantityStorage.quantity_interval;
    }

    return 1;
  };

  _proto.onMeasurementUnitInputChange = function onMeasurementUnitInputChange(event) {
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
  };

  _proto.getSalesUnitById = function getSalesUnitById(salesUnitId) {
    return this.salesUnits.find(function (item) {
      return salesUnitId === item.id_product_measurement_sales_unit;
    });
  };

  _proto.getUnitName = function getUnitName(key) {
    if (this.translations.hasOwnProperty(key)) {
      return this.translations[key];
    }

    return key;
  };

  _proto.onAmountInputChange = function onAmountInputChange(amountInSalesUnitInput) {
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
  };

  _proto.priceCalculation = function priceCalculation(amountInBaseUnits) {
    var itemBasePrice = Number(this.itemBasePriceInput.value);
    var amountDefaultInBaseUnitInputValue = Number(this.amountDefaultInBaseUnitInput.value);

    if (amountDefaultInBaseUnitInputValue !== amountInBaseUnits) {
      var newPrice = amountInBaseUnits / amountDefaultInBaseUnitInputValue * itemBasePrice;
      newPrice = newPrice * Number(this.qtyInBaseUnitInput.value) / Math.pow(this.factor, this.degree[0]);
      this.productPackagingNewPriceValueBlock.innerHTML = this.itemMoneySymbolInput.value + newPrice.toFixed(this.degree[0]);
      this.productPackagingNewPriceBlock.classList.remove(HIDDEN_CLASS_NAME);
    }
  };

  _proto.askCustomerForCorrectAmountInput = function askCustomerForCorrectAmountInput(amountInSalesUnits) {
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

      choiceElements.forEach(function (element) {
        return element !== undefined ? puChoiceListElement.appendChild(element) : undefined;
      });
      this.puChoiceElement.classList.remove(HIDDEN_CLASS_NAME);
    }
  };

  _proto.initCurrentLeadSalesUnit = function initCurrentLeadSalesUnit() {
    if (!this.leadSalesUnits) {
      return;
    }

    this.currentLeadSalesUnit = this.leadSalesUnits.find(function (item) {
      return item.is_default;
    });
  };

  _proto.createAmountChoiceElement = function createAmountChoiceElement(amountInBaseUnits) {
    var _this5 = this;

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

      choiceElement.onclick = function (event) {
        var element = event.currentTarget;
        var amountInBaseUnitsValue = parseFloat(element.dataset.baseUnitAmount);
        var amountInSalesUnitsValue = parseFloat(element.dataset.salesUnitAmount);
        _this5.puError = false;

        _this5.selectAmount(amountInBaseUnitsValue, amountInSalesUnitsValue);
      };

      choiceElement.style.display = 'block';
      return choiceElement;
    }
  };

  _proto.selectAmount = function selectAmount(amountInBaseUnits, amountInSalesUnits) {
    this.amountInSalesUnitInput.value = String(amountInSalesUnits);
    this.amountInBaseUnitInput.value = String(amountInBaseUnits);

    if (!this.muError && !this.isAddToCartDisabled) {
      this.addToCartButton.removeAttribute('disabled');
    }

    this.puChoiceElement.classList.add(HIDDEN_CLASS_NAME);
    this.onAmountInputChange();
  };

  _proto.onLeadSalesUnitSelectChange = function onLeadSalesUnitSelectChange(event) {
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
  };

  _proto.hidePackagingUnitRestrictionNotifications = function hidePackagingUnitRestrictionNotifications() {
    this.puChoiceElement.classList.add(HIDDEN_CLASS_NAME);
    this.puMinNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.puMaxNotificationElement.classList.add(HIDDEN_CLASS_NAME);
    this.puIntervalNotificationElement.classList.add(HIDDEN_CLASS_NAME);
  };

  _proto.getLeadSalesUnitById = function getLeadSalesUnitById(salesUnitId) {
    return this.leadSalesUnits.find(function (item) {
      return salesUnitId === item.id_product_measurement_sales_unit;
    });
  };

  _proto.getMinAmount = function getMinAmount() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_min') && this.productPackagingUnitStorage.amount_min !== null) {
      return Number(this.productPackagingUnitStorage.amount_min);
    }

    return 1;
  };

  _proto.getMaxAmount = function getMaxAmount() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_max') && this.productPackagingUnitStorage.amount_max !== null) {
      return Number(this.productPackagingUnitStorage.amount_max);
    }

    return 0;
  };

  _proto.getAmountInterval = function getAmountInterval() {
    if (typeof this.productPackagingUnitStorage !== 'undefined' && this.productPackagingUnitStorage.hasOwnProperty('amount_interval') && this.productPackagingUnitStorage.amount_interval !== null) {
      return Number(this.productPackagingUnitStorage.amount_interval);
    }

    return 1;
  };

  _proto.getMinAmountChoice = function getMinAmountChoice(amountInSalesUnits) {
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
  };

  _proto.getMaxAmountChoice = function getMaxAmountChoice(amountInSalesUnits, minChoice) {
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
  };

  _proto.isAmountGreaterThanMaxAmount = function isAmountGreaterThanMaxAmount(amountInBaseUnits) {
    return this.getMaxAmount() > 0 && amountInBaseUnits > this.getMaxAmount();
  };

  _proto.isAmountMultipleToInterval = function isAmountMultipleToInterval(amountInBaseUnits) {
    return this.getAmountPercentageOfDivision(amountInBaseUnits) !== 0;
  };

  _proto.getAmountConversion = function getAmountConversion(value, conversion) {
    return parseFloat((value * this.precision * this.currentLeadSalesUnit.conversion / conversion / this.precision).toFixed(this.numberOfDecimalPlaces));
  };

  _proto.getAmountPercentageOfDivision = function getAmountPercentageOfDivision(amountInBaseUnits) {
    var amountMultiplyToPrecision = Math.round(amountInBaseUnits * this.precision);
    var minAmountMultiplyToPrecision = Math.round(this.getMinAmount() * this.precision);
    var amountIntervalMultiplyToPrecision = this.getAmountInterval() * this.precision;
    var currentMinusMinimumAmount = Number(((amountMultiplyToPrecision - minAmountMultiplyToPrecision) / this.precision).toFixed(this.numberOfDecimalPlaces));
    var currentMinusMinimumAmountMultiplyToPrecision = Math.round(currentMinusMinimumAmount * this.precision);
    var amountPercentageOfDivision = (currentMinusMinimumAmountMultiplyToPrecision % amountIntervalMultiplyToPrecision / this.precision).toFixed(this.numberOfDecimalPlaces);
    return Number(amountPercentageOfDivision);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PackagingUnitQuantitySelector, [{
    key: "precision",
    get: function get() {
      return Number("1" + '0'.repeat(this.numberOfDecimalPlaces));
    }
  }, {
    key: "packagingJSONString",
    get: function get() {
      return this.getAttribute('json');
    }
  }]);

  return PackagingUnitQuantitySelector;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Byb2R1Y3QtcGFja2FnaW5nLXVuaXQtd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Byb2R1Y3RQYWNrYWdpbmdVbml0V2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFja2FnaW5nLXVuaXQtcXVhbnRpdHktc2VsZWN0b3IvcGFja2FnaW5nLXVuaXQtcXVhbnRpdHktc2VsZWN0b3IudHMiXSwibmFtZXMiOlsiSElEREVOX0NMQVNTX05BTUUiLCJQYWNrYWdpbmdVbml0UXVhbnRpdHlTZWxlY3RvciIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXR5SW5TYWxlc1VuaXRJbnB1dCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJxdHlJbkJhc2VVbml0SW5wdXQiLCJtZWFzdXJlbWVudFVuaXRJbnB1dCIsImFkZFRvQ2FydEJ1dHRvbiIsImxlYWRTYWxlc1VuaXRTZWxlY3QiLCJhbW91bnRJblNhbGVzVW5pdElucHV0IiwiYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dCIsImFtb3VudEluQmFzZVVuaXRJbnB1dCIsImRvY3VtZW50IiwicHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlQmxvY2siLCJwcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VWYWx1ZUJsb2NrIiwiaXRlbUJhc2VQcmljZUlucHV0IiwiaXRlbU1vbmV5U3ltYm9sSW5wdXQiLCJxdWFudGl0eUJldHdlZW5FbGVtZW50IiwicXVhbnRpdHlNaW5FbGVtZW50IiwicXVhbnRpdHlNYXhFbGVtZW50IiwibXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50IiwibXVDaG9pY2VMaXN0RWxlbWVudCIsIm11Q3VycmVudENob2ljZUVsZW1lbnQiLCJwdUNob2ljZUVsZW1lbnQiLCJwdU1pbk5vdGlmaWNhdGlvbkVsZW1lbnQiLCJwdU1heE5vdGlmaWNhdGlvbkVsZW1lbnQiLCJwdUludGVydmFsTm90aWZpY2F0aW9uRWxlbWVudCIsImluaXRKc29uIiwiaW5pdFRyYW5zbGF0aW9ucyIsImluaXRDdXJyZW50U2FsZXNVbml0IiwiaW5pdEN1cnJlbnRMZWFkU2FsZXNVbml0IiwiaW5pdEZvcm1EZWZhdWx0VmFsdWVzIiwibWFwRXZlbnRzIiwib25BbW91bnRJbnB1dENoYW5nZSIsInBhY2thZ2luZ1VuaXREYXRhIiwiSlNPTiIsInBhcnNlIiwicGFja2FnaW5nSlNPTlN0cmluZyIsImJhc2VVbml0Iiwic2FsZXNVbml0cyIsImxlYWRTYWxlc1VuaXRzIiwiaXNBZGRUb0NhcnREaXNhYmxlZCIsInByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSIsInByb2R1Y3RRdWFudGl0eVN0b3JhZ2UiLCJ2YWx1ZSIsIlN0cmluZyIsImdldE1pblF1YW50aXR5IiwiY3VycmVudExlYWRTYWxlc1VuaXQiLCJpZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQiLCJjdXJyZW50U2FsZXNVbml0IiwidHJhbnNsYXRpb25zIiwiaW5uZXJIVE1MIiwiZmluZCIsIml0ZW0iLCJpc19kZWZhdWx0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicXR5SW5wdXRDaGFuZ2UiLCJvbk1lYXN1cmVtZW50VW5pdElucHV0Q2hhbmdlIiwib25MZWFkU2FsZXNVbml0U2VsZWN0Q2hhbmdlIiwicXR5SW5TYWxlc1VuaXRzIiwiTnVtYmVyIiwibXVFcnJvciIsInF0eUluQmFzZVVuaXRzIiwibXVsdGlwbHkiLCJjb252ZXJzaW9uIiwiaGlkZU5vdGlmaWNhdGlvbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRRdWFudGl0eUludGVydmFsIiwiZ2V0TWF4UXVhbnRpdHkiLCJpc0Zpbml0ZSIsInNldEF0dHJpYnV0ZSIsInB1RXJyb3IiLCJzaG93Q29ycmVjdElucHV0U3VnZ2VzdGlvbnMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhZGQiLCJtaW5DaG9pY2UiLCJnZXRNaW5DaG9pY2UiLCJtYXhDaG9pY2UiLCJnZXRNYXhDaG9pY2UiLCJ0ZXh0Q29udGVudCIsInJvdW5kIiwiZGVjaW1hbHMiLCJnZXRVbml0TmFtZSIsInByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdCIsImNvZGUiLCJjaG9pY2VFbGVtZW50cyIsInB1c2giLCJjcmVhdGVDaG9pY2VFbGVtZW50IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJ1bmRlZmluZWQiLCJhcHBlbmRDaGlsZCIsImNob2ljZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQiLCJtZWFzdXJlbWVudFNhbGVzVW5pdE5hbWUiLCJtZWFzdXJlbWVudEJhc2VVbml0TmFtZSIsIm9uY2xpY2siLCJjdXJyZW50VGFyZ2V0IiwicXR5SW5CYXNlVW5pdHNWYWx1ZSIsInBhcnNlRmxvYXQiLCJkYXRhc2V0IiwiYmFzZVVuaXRRdHkiLCJxdHlJblNhbGVzVW5pdHNWYWx1ZSIsInNhbGVzVW5pdFF0eSIsInNlbGVjdFF0eSIsInN0eWxlIiwiZGlzcGxheSIsImZsb29yIiwiY2VpbCIsIk1hdGgiLCJwcmVjaXNpb24iLCJhIiwiYiIsInJlc3VsdCIsImhhc093blByb3BlcnR5IiwicXVhbnRpdHlfbWluIiwicXVhbnRpdHlfbWF4IiwicXVhbnRpdHlfaW50ZXJ2YWwiLCJzYWxlc1VuaXRJZCIsInBhcnNlSW50Iiwic2FsZXNVbml0IiwiZ2V0U2FsZXNVbml0QnlJZCIsImtleSIsImFtb3VudERlY2ltYWxzTWF4TGVuZ3RoIiwiUmVnRXhwIiwibnVtYmVyT2ZEZWNpbWFsUGxhY2VzIiwibWF0Y2giLCJyZXBsYWNlIiwiYW1vdW50SW5CYXNlVW5pdHMiLCJ0b0ZpeGVkIiwiZGlzYWJsZWQiLCJpc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbCIsImdldE1pbkFtb3VudCIsImdldE1heEFtb3VudCIsImFza0N1c3RvbWVyRm9yQ29ycmVjdEFtb3VudElucHV0IiwicXVhbnRpdHkiLCJ0b3RhbEFtb3VudCIsImhpZGVQYWNrYWdpbmdVbml0UmVzdHJpY3Rpb25Ob3RpZmljYXRpb25zIiwicHJpY2VDYWxjdWxhdGlvbiIsIml0ZW1CYXNlUHJpY2UiLCJhbW91bnREZWZhdWx0SW5CYXNlVW5pdElucHV0VmFsdWUiLCJuZXdQcmljZSIsInBvdyIsImZhY3RvciIsImRlZ3JlZSIsImFtb3VudEluU2FsZXNVbml0cyIsInB1Q2hvaWNlTGlzdEVsZW1lbnQiLCJwdUN1cnJlbnRDaG9pY2VFbGVtZW50IiwiZ2V0TWluQW1vdW50Q2hvaWNlIiwiZ2V0TWF4QW1vdW50Q2hvaWNlIiwiY3JlYXRlQW1vdW50Q2hvaWNlRWxlbWVudCIsInNhbGVzVW5pdENob2ljZSIsImJhc2VVbml0Q2hvaWNlIiwiYW1vdW50SW5CYXNlVW5pdHNWYWx1ZSIsImJhc2VVbml0QW1vdW50IiwiYW1vdW50SW5TYWxlc1VuaXRzVmFsdWUiLCJzYWxlc1VuaXRBbW91bnQiLCJzZWxlY3RBbW91bnQiLCJnZXRMZWFkU2FsZXNVbml0QnlJZCIsImdldEFtb3VudENvbnZlcnNpb24iLCJhbW91bnRJblNhbGVzVW5pdHNNaW4iLCJtaW4iLCJhbW91bnRJblNhbGVzVW5pdHNNYXgiLCJtYXgiLCJhbW91bnRJblNhbGVzVW5pdHNTdGVwIiwic3RlcCIsImFtb3VudF9taW4iLCJhbW91bnRfbWF4IiwiZ2V0QW1vdW50SW50ZXJ2YWwiLCJhbW91bnRfaW50ZXJ2YWwiLCJpc0Ftb3VudEdyZWF0ZXJUaGFuTWF4QW1vdW50IiwiZ2V0QW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24iLCJuZXh0UG9zc2libGVJbnRlcnZhbCIsImFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24iLCJtaW5BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uIiwiYW1vdW50SW50ZXJ2YWxNdWx0aXBseVRvUHJlY2lzaW9uIiwiY3VycmVudE1pbnVzTWluaW11bUFtb3VudCIsImN1cnJlbnRNaW51c01pbmltdW1BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uIiwiYW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24iLCJyZXBlYXQi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UCxpQkFBTCxLQUEyQixLQUFLMUQsU0FBMUU7QUFDQSxRQUFNa0UseUJBQXlCLEdBQUd0SCxNQUFNLENBQ3BDLENBQUMsQ0FBQ21ILHlCQUF5QixHQUFHQyw0QkFBN0IsSUFBNkQsS0FBS2hFLFNBQW5FLEVBQThFbUIsT0FBOUUsQ0FDSSxLQUFLSixxQkFEVCxDQURvQyxDQUF4QztBQUtBLFFBQU1vRCw0Q0FBNEMsR0FBR3BFLElBQUksQ0FBQzlCLEtBQUwsQ0FBV2lHLHlCQUF5QixHQUFHLEtBQUtsRSxTQUE1QyxDQUFyRDtBQUNBLFFBQU1vRSwwQkFBMEIsR0FBRyxDQUM5QkQsNENBQTRDLEdBQUdGLGlDQUFoRCxHQUNBLEtBQUtqRSxTQUYwQixFQUdqQ21CLE9BSGlDLENBR3pCLEtBQUtKLHFCQUhvQixDQUFuQztBQUtBLFdBQU9uRSxNQUFNLENBQUN3SCwwQkFBRCxDQUFiO0FBQ0gsRzs7Ozt3QkFFaUM7QUFDOUIsYUFBT3hILE1BQU0sT0FBSyxJQUFJeUgsTUFBSixDQUFXLEtBQUt0RCxxQkFBaEIsQ0FBTCxDQUFiO0FBQ0g7Ozt3QkFFMkM7QUFDeEMsYUFBTyxLQUFLdUQsWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0g7Ozs7RUFsd0JzREMsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucGFja2FnaW5nLXVuaXQtcXVhbnRpdHktc2VsZWN0b3IubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6IG1heC1maWxlLWxpbmUtY291bnQgKi9cblxuLypcbiAqIEB0YWcgZXhhbXBsZSBUaGlzIGNvZGUgcHJvdmlkZXMgZXhhbXBsZSBvZiB1c2luZyB0aGUgUHJvZHVjdCBQYWNrYWdpbmcgVW5pdC5cbiAqL1xuXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuaW50ZXJmYWNlIFVuaXRUcmFuc2xhdGlvbnNKU09ORGF0YSB7XG4gICAgZ3JhbTogc3RyaW5nO1xuICAgIGl0ZW06IHN0cmluZztcbiAgICBraWxvOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBCYXNlVW5pdCB7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIGRlZmF1bHRfcHJlY2lzaW9uOiBudW1iZXI7XG4gICAgaWRfcHJvZHVjdF9tZWFzdXJlbWVudF91bml0OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgU2FsZXNVbml0IHtcbiAgICBjb252ZXJzaW9uOiBudW1iZXI7XG4gICAgZmtfcHJvZHVjdDogbnVtYmVyO1xuICAgIGZrX3Byb2R1Y3RfbWVhc3VyZW1lbnRfYmFzZV91bml0PzogbnVtYmVyO1xuICAgIGZrX3Byb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdD86IG51bWJlcjtcbiAgICBpZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQ6IG51bWJlcjtcbiAgICBpc19kZWZhdWx0OiBib29sZWFuO1xuICAgIGlzX2Rpc3BsYXllZDogYm9vbGVhbjtcbiAgICBwcmVjaXNpb246IG51bWJlcjtcbiAgICBwcm9kdWN0X21lYXN1cmVtZW50X2Jhc2VfdW5pdD86IG51bWJlcjtcbiAgICBwcm9kdWN0X21lYXN1cmVtZW50X3VuaXQ6IEJhc2VVbml0O1xuICAgIHN0b3JlX3JlbGF0aW9uPzogbnVtYmVyO1xuICAgIHZhbHVlPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUHJvZHVjdFF1YW50aXR5U3RvcmFnZSB7XG4gICAgaWRfcHJvZHVjdDogbnVtYmVyO1xuICAgIHF1YW50aXR5X2ludGVydmFsPzogbnVtYmVyO1xuICAgIHF1YW50aXR5X21heD86IG51bWJlcjtcbiAgICBxdWFudGl0eV9taW4/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBQcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2Uge1xuICAgIGFtb3VudF9pbnRlcnZhbDogc3RyaW5nO1xuICAgIGFtb3VudF9tYXg6IHN0cmluZztcbiAgICBhbW91bnRfbWluOiBzdHJpbmc7XG4gICAgZGVmYXVsdF9hbW91bnQ6IHN0cmluZztcbiAgICBpZF9sZWFkX3Byb2R1Y3Q6IG51bWJlcjtcbiAgICBpZF9wcm9kdWN0OiBudW1iZXI7XG4gICAgaXNfYW1vdW50X3ZhcmlhYmxlOiBib29sZWFuO1xuICAgIHR5cGVfbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUGFja2FnaW5nSlNPTkRhdGEge1xuICAgIGJhc2VVbml0OiBCYXNlVW5pdDtcbiAgICBzYWxlc1VuaXRzOiBTYWxlc1VuaXRbXTtcbiAgICBwcm9kdWN0UXVhbnRpdHlTdG9yYWdlOiBQcm9kdWN0UXVhbnRpdHlTdG9yYWdlO1xuICAgIGlzQWRkVG9DYXJ0RGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgbGVhZFNhbGVzVW5pdHM6IFNhbGVzVW5pdFtdO1xuICAgIHByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZTogUHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlO1xufVxuXG5jb25zdCBISURERU5fQ0xBU1NfTkFNRSA9ICdpcy1oaWRkZW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdpbmdVbml0UXVhbnRpdHlTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHF0eUluU2FsZXNVbml0SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHF0eUluQmFzZVVuaXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgbWVhc3VyZW1lbnRVbml0SW5wdXQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHByb3RlY3RlZCBhZGRUb0NhcnRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBsZWFkU2FsZXNVbml0U2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYmFzZVVuaXQ6IEJhc2VVbml0O1xuICAgIHByb3RlY3RlZCBzYWxlc1VuaXRzOiBTYWxlc1VuaXRbXTtcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNhbGVzVW5pdDogU2FsZXNVbml0O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UXVhbnRpdHlTdG9yYWdlOiBQcm9kdWN0UXVhbnRpdHlTdG9yYWdlO1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvbnM6IFVuaXRUcmFuc2xhdGlvbnNKU09ORGF0YTtcbiAgICBwcm90ZWN0ZWQgbGVhZFNhbGVzVW5pdHM6IFNhbGVzVW5pdFtdO1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2U6IFByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZTtcbiAgICBwcm90ZWN0ZWQgYW1vdW50SW5TYWxlc1VuaXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaXRlbUJhc2VQcmljZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpdGVtTW9uZXlTeW1ib2xJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYW1vdW50SW5CYXNlVW5pdElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBjdXJyZW50TGVhZFNhbGVzVW5pdDogU2FsZXNVbml0O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VCbG9jazogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RQYWNrYWdpbmdOZXdQcmljZVZhbHVlQmxvY2s6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBxdWFudGl0eUJldHdlZW5FbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlNaW5FbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlNYXhFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgbXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgbXVDaG9pY2VMaXN0RWxlbWVudDogSFRNTFVMaXN0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgbXVDdXJyZW50Q2hvaWNlRWxlbWVudDogSFRNTFNwYW5FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwdUNob2ljZUVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwdU1pbk5vdGlmaWNhdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwdU1heE5vdGlmaWNhdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwdUludGVydmFsTm90aWZpY2F0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGlzQWRkVG9DYXJ0RGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIG11RXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgcHVFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBkZWNpbWFsczogbnVtYmVyID0gNDtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZmFjdG9yOiBudW1iZXIgPSAxMDtcbiAgICBwcm90ZWN0ZWQgbnVtYmVyT2ZEZWNpbWFsUGxhY2VzOiBudW1iZXIgPSAxMDtcblxuICAgIC8qIHRzbGludDpkaXNhYmxlOiBuby1tYWdpYy1udW1iZXJzICovXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlZ3JlZTogbnVtYmVyW10gPSBbMiwgM107XG5cbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBuby1tYWdpYy1udW1iZXJzICovXG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2FsZXMtdW5pdC1xdWFudGl0eWApWzBdXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXR5SW5CYXNlVW5pdElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYmFzZS11bml0LXF1YW50aXR5YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlbWVudFVuaXRJbnB1dCA9IDxIVE1MU2VsZWN0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3QtbWVhc3VyZW1lbnQtdW5pdGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2FkZC10by1jYXJ0LWJ1dHRvbmApWzBdO1xuICAgICAgICB0aGlzLmxlYWRTYWxlc1VuaXRTZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2VsZWN0LWxlYWQtbWVhc3VyZW1lbnQtdW5pdGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3VzZXItYW1vdW50YClbMF07XG4gICAgICAgIHRoaXMuYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2RlZmF1bHQtYW1vdW50YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hbW91bnRJbkJhc2VVbml0SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYW1vdW50YClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlQmxvY2sgPSA8SFRNTERpdkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvZHVjdC1wYWNrYWdpbmctbmV3LXByaWNlLWJsb2NrYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nTmV3UHJpY2VWYWx1ZUJsb2NrID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3Byb2R1Y3QtcGFja2FnaW5nLW5ldy1wcmljZS12YWx1ZS1ibG9ja2ApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaXRlbUJhc2VQcmljZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faXRlbS1iYXNlLXByaWNlYClbMF07XG4gICAgICAgIHRoaXMuaXRlbU1vbmV5U3ltYm9sSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pdGVtLW1vbmV5LXN5bWJvbGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlCZXR3ZWVuRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19xdWFudGl0eS1iZXR3ZWVuLXVuaXRzYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eU1pbkVsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbWluaW11bS1xdWFudGl0eWApWzBdO1xuICAgICAgICB0aGlzLnF1YW50aXR5TWF4RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19tYXhpbXVtLXF1YW50aXR5YClbMF07XG4gICAgICAgIHRoaXMubXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX21lYXN1cmVtZW50LXVuaXQtY2hvaWNlYClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tdUNob2ljZUxpc3RFbGVtZW50ID0gPEhUTUxVTGlzdEVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5tdUNob2ljZU5vdGlmaWNhdGlvbkVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpc3RgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm11Q3VycmVudENob2ljZUVsZW1lbnQgPSA8SFRNTFNwYW5FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMubXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jdXJyZW50LWNob2ljZWApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHVDaG9pY2VFbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3BhY2thZ2luZy11bml0LWNob2ljZWApWzBdO1xuICAgICAgICB0aGlzLnB1TWluTm90aWZpY2F0aW9uRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wYWNrYWdpbmctYW1vdW50LW1pbmApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHVNYXhOb3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxEaXZFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3BhY2thZ2luZy1hbW91bnQtbWF4YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wdUludGVydmFsTm90aWZpY2F0aW9uRWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wYWNrYWdpbmctYW1vdW50LWludGVydmFsYClbMF1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluaXRKc29uKCk7XG4gICAgICAgIHRoaXMuaW5pdFRyYW5zbGF0aW9ucygpO1xuICAgICAgICB0aGlzLmluaXRDdXJyZW50U2FsZXNVbml0KCk7XG4gICAgICAgIHRoaXMuaW5pdEN1cnJlbnRMZWFkU2FsZXNVbml0KCk7XG4gICAgICAgIHRoaXMuaW5pdEZvcm1EZWZhdWx0VmFsdWVzKCk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgIGlmICh0aGlzLmFtb3VudEluQmFzZVVuaXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5vbkFtb3VudElucHV0Q2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdEpzb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhY2thZ2luZ1VuaXREYXRhID0gPFBhY2thZ2luZ0pTT05EYXRhPkpTT04ucGFyc2UodGhpcy5wYWNrYWdpbmdKU09OU3RyaW5nKTtcblxuICAgICAgICB0aGlzLmJhc2VVbml0ID0gcGFja2FnaW5nVW5pdERhdGEuYmFzZVVuaXQ7XG4gICAgICAgIHRoaXMuc2FsZXNVbml0cyA9IHBhY2thZ2luZ1VuaXREYXRhLnNhbGVzVW5pdHM7XG4gICAgICAgIHRoaXMubGVhZFNhbGVzVW5pdHMgPSBwYWNrYWdpbmdVbml0RGF0YS5sZWFkU2FsZXNVbml0cztcbiAgICAgICAgdGhpcy5pc0FkZFRvQ2FydERpc2FibGVkID0gcGFja2FnaW5nVW5pdERhdGEuaXNBZGRUb0NhcnREaXNhYmxlZDtcbiAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UgPSBwYWNrYWdpbmdVbml0RGF0YS5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2U7XG4gICAgICAgIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZSA9IHBhY2thZ2luZ1VuaXREYXRhLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRGb3JtRGVmYXVsdFZhbHVlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmFtb3VudEluQmFzZVVuaXRJbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKHRoaXMuZ2V0TWluUXVhbnRpdHkoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGVhZFNhbGVzVW5pdFNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5sZWFkU2FsZXNVbml0U2VsZWN0LnZhbHVlID0gU3RyaW5nKHRoaXMuY3VycmVudExlYWRTYWxlc1VuaXQuaWRfcHJvZHVjdF9tZWFzdXJlbWVudF9zYWxlc191bml0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1lYXN1cmVtZW50VW5pdElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLm1lYXN1cmVtZW50VW5pdElucHV0LnZhbHVlID0gU3RyaW5nKHRoaXMuY3VycmVudFNhbGVzVW5pdC5pZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRUcmFuc2xhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX21lYXN1cmVtZW50LXVuaXQtdHJhbnNsYXRpb25gKVswXS5pbm5lckhUTUwsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRDdXJyZW50U2FsZXNVbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRTYWxlc1VuaXQgPSB0aGlzLnNhbGVzVW5pdHMuZmluZCgoaXRlbTogU2FsZXNVbml0KSA9PiBpdGVtLmlzX2RlZmF1bHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudDogRXZlbnQpID0+IHRoaXMucXR5SW5wdXRDaGFuZ2UoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMubWVhc3VyZW1lbnRVbml0SW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMubWVhc3VyZW1lbnRVbml0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVhc3VyZW1lbnRVbml0SW5wdXRDaGFuZ2UoZXZlbnQpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25BbW91bnRJbnB1dENoYW5nZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxlYWRTYWxlc1VuaXRTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMubGVhZFNhbGVzVW5pdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25MZWFkU2FsZXNVbml0U2VsZWN0Q2hhbmdlKGV2ZW50KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcXR5SW5wdXRDaGFuZ2UocXR5SW5TYWxlc1VuaXRzPzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2YgcXR5SW5TYWxlc1VuaXRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcXR5SW5TYWxlc1VuaXRzID0gTnVtYmVyKHRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm11RXJyb3IgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgcXR5SW5CYXNlVW5pdHMgPSB0aGlzLm11bHRpcGx5KHF0eUluU2FsZXNVbml0cywgTnVtYmVyKHRoaXMuY3VycmVudFNhbGVzVW5pdC5jb252ZXJzaW9uKSk7XG5cbiAgICAgICAgaWYgKHF0eUluQmFzZVVuaXRzIDwgdGhpcy5nZXRNaW5RdWFudGl0eSgpKSB7XG4gICAgICAgICAgICB0aGlzLm11RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oaWRlTm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eU1pbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHF0eUluQmFzZVVuaXRzIC0gdGhpcy5nZXRNaW5RdWFudGl0eSgpKSAlIHRoaXMuZ2V0UXVhbnRpdHlJbnRlcnZhbCgpICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm11RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oaWRlTm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eUJldHdlZW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0TWF4UXVhbnRpdHkoKSA+IDAgJiYgcXR5SW5CYXNlVW5pdHMgPiB0aGlzLmdldE1heFF1YW50aXR5KCkpIHtcbiAgICAgICAgICAgIHRoaXMubXVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGVOb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5TWF4RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11RXJyb3IgJiYgIWlzRmluaXRlKHF0eUluU2FsZXNVbml0cykpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11RXJyb3IgfHwgdGhpcy5wdUVycm9yIHx8IHRoaXMuaXNBZGRUb0NhcnREaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy5zaG93Q29ycmVjdElucHV0U3VnZ2VzdGlvbnMocXR5SW5TYWxlc1VuaXRzKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdHlJbkJhc2VVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcocXR5SW5CYXNlVW5pdHMpO1xuXG4gICAgICAgIGlmICh0aGlzLmFtb3VudEluQmFzZVVuaXRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5vbkFtb3VudElucHV0Q2hhbmdlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHRoaXMuaGlkZU5vdGlmaWNhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZU5vdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubXVDaG9pY2VOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLnF1YW50aXR5QmV0d2VlbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlNaW5FbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLnF1YW50aXR5TWF4RWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd0NvcnJlY3RJbnB1dFN1Z2dlc3Rpb25zKHF0eUluU2FsZXNVbml0czogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm11RXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbkNob2ljZSA9IHRoaXMuZ2V0TWluQ2hvaWNlKHF0eUluU2FsZXNVbml0cyk7XG4gICAgICAgICAgICBjb25zdCBtYXhDaG9pY2UgPSB0aGlzLmdldE1heENob2ljZShxdHlJblNhbGVzVW5pdHMsIG1pbkNob2ljZSk7XG5cbiAgICAgICAgICAgIHRoaXMubXVDaG9pY2VMaXN0RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMubXVDdXJyZW50Q2hvaWNlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMubXVDdXJyZW50Q2hvaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RoaXMucm91bmQocXR5SW5TYWxlc1VuaXRzLCB0aGlzLmRlY2ltYWxzKX0gJHt0aGlzLmdldFVuaXROYW1lKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNhbGVzVW5pdC5wcm9kdWN0X21lYXN1cmVtZW50X3VuaXQuY29kZSxcbiAgICAgICAgICAgICl9YDtcblxuICAgICAgICAgICAgY29uc3QgY2hvaWNlRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnRzLnB1c2godGhpcy5jcmVhdGVDaG9pY2VFbGVtZW50KG1pbkNob2ljZSkpO1xuXG4gICAgICAgICAgICBpZiAobWF4Q2hvaWNlICE9PSBtaW5DaG9pY2UpIHtcbiAgICAgICAgICAgICAgICBjaG9pY2VFbGVtZW50cy5wdXNoKHRoaXMuY3JlYXRlQ2hvaWNlRWxlbWVudChtYXhDaG9pY2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hvaWNlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT5cbiAgICAgICAgICAgICAgICBlbGVtZW50ICE9PSB1bmRlZmluZWQgPyB0aGlzLm11Q2hvaWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLm11Q2hvaWNlTm90aWZpY2F0aW9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVDaG9pY2VFbGVtZW50KHF0eUluQmFzZVVuaXRzOiBudW1iZXIpOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICBpZiAocXR5SW5CYXNlVW5pdHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNob2ljZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IHF0eUluU2FsZXNVbml0cyA9IHRoaXMuY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQocXR5SW5CYXNlVW5pdHMpO1xuICAgICAgICBjb25zdCBtZWFzdXJlbWVudFNhbGVzVW5pdE5hbWUgPSB0aGlzLmdldFVuaXROYW1lKHRoaXMuY3VycmVudFNhbGVzVW5pdC5wcm9kdWN0X21lYXN1cmVtZW50X3VuaXQuY29kZSk7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVtZW50QmFzZVVuaXROYW1lID0gdGhpcy5nZXRVbml0TmFtZSh0aGlzLmJhc2VVbml0LmNvZGUpO1xuXG4gICAgICAgIGNob2ljZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbGluaycpO1xuICAgICAgICBjaG9pY2VFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1iYXNlLXVuaXQtcXR5JywgU3RyaW5nKHF0eUluQmFzZVVuaXRzKSk7XG4gICAgICAgIGNob2ljZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXNhbGVzLXVuaXQtcXR5JywgU3RyaW5nKHF0eUluU2FsZXNVbml0cykpO1xuICAgICAgICBjaG9pY2VFbGVtZW50LnRleHRDb250ZW50ID0gYCgke3RoaXMucm91bmQoXG4gICAgICAgICAgICBxdHlJblNhbGVzVW5pdHMsXG4gICAgICAgICAgICB0aGlzLmRlY2ltYWxzLFxuICAgICAgICApfSAke21lYXN1cmVtZW50U2FsZXNVbml0TmFtZX0pID0gKCR7cXR5SW5CYXNlVW5pdHN9ICR7bWVhc3VyZW1lbnRCYXNlVW5pdE5hbWV9KWA7XG4gICAgICAgIGNob2ljZUVsZW1lbnQub25jbGljayA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IHF0eUluQmFzZVVuaXRzVmFsdWUgPSBwYXJzZUZsb2F0KGVsZW1lbnQuZGF0YXNldC5iYXNlVW5pdFF0eSk7XG4gICAgICAgICAgICBjb25zdCBxdHlJblNhbGVzVW5pdHNWYWx1ZSA9IHBhcnNlRmxvYXQoZWxlbWVudC5kYXRhc2V0LnNhbGVzVW5pdFF0eSk7XG4gICAgICAgICAgICB0aGlzLm11RXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UXR5KHF0eUluQmFzZVVuaXRzVmFsdWUsIHF0eUluU2FsZXNVbml0c1ZhbHVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjaG9pY2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHJldHVybiBjaG9pY2VFbGVtZW50O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZWxlY3RRdHkocXR5SW5CYXNlVW5pdHM6IG51bWJlciwgcXR5SW5TYWxlc1VuaXRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdHlJbkJhc2VVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcocXR5SW5CYXNlVW5pdHMpO1xuICAgICAgICB0aGlzLnF0eUluU2FsZXNVbml0SW5wdXQudmFsdWUgPSBTdHJpbmcodGhpcy5yb3VuZChxdHlJblNhbGVzVW5pdHMsIHRoaXMuZGVjaW1hbHMpKTtcbiAgICAgICAgaWYgKCF0aGlzLnB1RXJyb3IgJiYgIXRoaXMuaXNBZGRUb0NhcnREaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm11Q2hvaWNlTm90aWZpY2F0aW9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgdGhpcy5xdHlJbnB1dENoYW5nZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNaW5DaG9pY2UocXR5SW5TYWxlc1VuaXRzOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBxdHlJbkJhc2VVbml0cyA9IHRoaXMuZmxvb3IodGhpcy5tdWx0aXBseShxdHlJblNhbGVzVW5pdHMsIHRoaXMuY3VycmVudFNhbGVzVW5pdC5jb252ZXJzaW9uKSk7XG5cbiAgICAgICAgaWYgKHF0eUluQmFzZVVuaXRzIDwgdGhpcy5nZXRNaW5RdWFudGl0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5RdWFudGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHF0eUluQmFzZVVuaXRzIC0gdGhpcy5nZXRNaW5RdWFudGl0eSgpKSAlIHRoaXMuZ2V0UXVhbnRpdHlJbnRlcnZhbCgpICE9PSAwIHx8XG4gICAgICAgICAgICAodGhpcy5nZXRNYXhRdWFudGl0eSgpID4gMCAmJiBxdHlJbkJhc2VVbml0cyA+IHRoaXMuZ2V0TWF4UXVhbnRpdHkoKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRNaW5DaG9pY2UodGhpcy5jb252ZXJ0QmFzZVVuaXRzQW1vdW50VG9DdXJyZW50U2FsZXNVbml0c0Ftb3VudChxdHlJbkJhc2VVbml0cyAtIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdHlJbkJhc2VVbml0cztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TWF4Q2hvaWNlKHF0eUluU2FsZXNVbml0czogbnVtYmVyLCBtaW5DaG9pY2U6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBxdHlJbkJhc2VVbml0cyA9IHRoaXMuY2VpbCh0aGlzLm11bHRpcGx5KHF0eUluU2FsZXNVbml0cywgdGhpcy5jdXJyZW50U2FsZXNVbml0LmNvbnZlcnNpb24pKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRNYXhRdWFudGl0eSgpID4gMCAmJiBxdHlJbkJhc2VVbml0cyA+IHRoaXMuZ2V0TWF4UXVhbnRpdHkoKSkge1xuICAgICAgICAgICAgcXR5SW5CYXNlVW5pdHMgPSB0aGlzLmdldE1heFF1YW50aXR5KCk7XG5cbiAgICAgICAgICAgIGlmICgocXR5SW5CYXNlVW5pdHMgLSB0aGlzLmdldE1pblF1YW50aXR5KCkpICUgdGhpcy5nZXRRdWFudGl0eUludGVydmFsKCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBxdHlJbkJhc2VVbml0cyA9XG4gICAgICAgICAgICAgICAgICAgIHF0eUluQmFzZVVuaXRzIC0gKChxdHlJbkJhc2VVbml0cyAtIHRoaXMuZ2V0TWluUXVhbnRpdHkoKSkgJSB0aGlzLmdldFF1YW50aXR5SW50ZXJ2YWwoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxdHlJbkJhc2VVbml0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocXR5SW5CYXNlVW5pdHMgLSB0aGlzLmdldE1pblF1YW50aXR5KCkpICUgdGhpcy5nZXRRdWFudGl0eUludGVydmFsKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1heENob2ljZShcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRCYXNlVW5pdHNBbW91bnRUb0N1cnJlbnRTYWxlc1VuaXRzQW1vdW50KFxuICAgICAgICAgICAgICAgICAgICAocXR5SW5CYXNlVW5pdHMgKyAxKSAvIHRoaXMuY3VycmVudFNhbGVzVW5pdC5jb252ZXJzaW9uLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbWluQ2hvaWNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBxdHlJbkJhc2VVbml0cztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydEJhc2VVbml0c0Ftb3VudFRvQ3VycmVudFNhbGVzVW5pdHNBbW91bnQocXR5SW5CYXNlVW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLnJvdW5kKChxdHlJbkJhc2VVbml0cyAvIHRoaXMuY3VycmVudFNhbGVzVW5pdC5jb252ZXJzaW9uKSAqIHRoaXMuY3VycmVudFNhbGVzVW5pdC5wcmVjaXNpb24pIC9cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNhbGVzVW5pdC5wcmVjaXNpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmxvb3IodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjZWlsKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcm91bmQodmFsdWU6IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoYCR7TWF0aC5yb3VuZChwYXJzZUZsb2F0KGAke3ZhbHVlfWUke2RlY2ltYWxzfWApKX1lLSR7ZGVjaW1hbHN9YCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG11bHRpcGx5KGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYSAqIGI7XG4gICAgICAgIGNvbnN0IHByZWNpc2lvbiA9IE51bWJlcih0aGlzLmN1cnJlbnRTYWxlc1VuaXQucHJlY2lzaW9uKTtcblxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChyZXN1bHQgKiBwcmVjaXNpb24pIC8gcHJlY2lzaW9uO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNaW5RdWFudGl0eSgpOiBudW1iZXIge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlLmhhc093blByb3BlcnR5KCdxdWFudGl0eV9taW4nKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UucXVhbnRpdHlfbWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1heFF1YW50aXR5KCk6IG51bWJlciB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ3F1YW50aXR5X21heCcpICYmXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RRdWFudGl0eVN0b3JhZ2UucXVhbnRpdHlfbWF4ICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZS5xdWFudGl0eV9tYXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0UXVhbnRpdHlJbnRlcnZhbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UXVhbnRpdHlTdG9yYWdlLmhhc093blByb3BlcnR5KCdxdWFudGl0eV9pbnRlcnZhbCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFF1YW50aXR5U3RvcmFnZS5xdWFudGl0eV9pbnRlcnZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1lYXN1cmVtZW50VW5pdElucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzYWxlc1VuaXRJZCA9IHBhcnNlSW50KCg8SFRNTFNlbGVjdEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldCkudmFsdWUpO1xuICAgICAgICBjb25zdCBzYWxlc1VuaXQgPSB0aGlzLmdldFNhbGVzVW5pdEJ5SWQoc2FsZXNVbml0SWQpO1xuICAgICAgICBsZXQgcXR5SW5TYWxlc1VuaXRzID0gTnVtYmVyKHRoaXMucXR5SW5TYWxlc1VuaXRJbnB1dC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHF0eUluQmFzZVVuaXRzID0gdGhpcy5tdWx0aXBseShxdHlJblNhbGVzVW5pdHMsIHRoaXMuY3VycmVudFNhbGVzVW5pdC5jb252ZXJzaW9uKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2FsZXNVbml0ID0gc2FsZXNVbml0O1xuICAgICAgICBxdHlJblNhbGVzVW5pdHMgPSB0aGlzLmNvbnZlcnRCYXNlVW5pdHNBbW91bnRUb0N1cnJlbnRTYWxlc1VuaXRzQW1vdW50KHF0eUluQmFzZVVuaXRzKTtcblxuICAgICAgICBpZiAoaXNGaW5pdGUocXR5SW5TYWxlc1VuaXRzKSkge1xuICAgICAgICAgICAgdGhpcy5xdHlJblNhbGVzVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKHRoaXMucm91bmQocXR5SW5TYWxlc1VuaXRzLCB0aGlzLmRlY2ltYWxzKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF0eUlucHV0Q2hhbmdlKHF0eUluU2FsZXNVbml0cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFNhbGVzVW5pdEJ5SWQoc2FsZXNVbml0SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zYWxlc1VuaXRzLmZpbmQoKGl0ZW06IFNhbGVzVW5pdCkgPT4gc2FsZXNVbml0SWQgPT09IGl0ZW0uaWRfcHJvZHVjdF9tZWFzdXJlbWVudF9zYWxlc191bml0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VW5pdE5hbWUoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0aW9uc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BbW91bnRJbnB1dENoYW5nZShhbW91bnRJblNhbGVzVW5pdElucHV0PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYW1vdW50RGVjaW1hbHNNYXhMZW5ndGggPSBuZXcgUmVnRXhwKGAoKFxcLnxcXCwpXFxcXGR7JHt0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlc319KVxcXFxkK2AsICdnJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC52YWx1ZS5tYXRjaCgvWywuXS8pKSB7XG4gICAgICAgICAgICB0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUgPSB0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQudmFsdWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBhbW91bnREZWNpbWFsc01heExlbmd0aCxcbiAgICAgICAgICAgICAgICAnJDEnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYW1vdW50SW5TYWxlc1VuaXRJbnB1dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFtb3VudEluU2FsZXNVbml0SW5wdXQgPSBOdW1iZXIodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFtb3VudEluQmFzZVVuaXRzID0gTnVtYmVyKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIChhbW91bnRJblNhbGVzVW5pdElucHV0ICogdGhpcy5wcmVjaXNpb24gKiBOdW1iZXIodGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdC5jb252ZXJzaW9uKSkgL1xuICAgICAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uXG4gICAgICAgICAgICApLnRvRml4ZWQodGhpcy5udW1iZXJPZkRlY2ltYWxQbGFjZXMpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ05ld1ByaWNlQmxvY2suY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucHVFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbChhbW91bnRJbkJhc2VVbml0cykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucHVJbnRlcnZhbE5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbW91bnRJbkJhc2VVbml0cyA8IHRoaXMuZ2V0TWluQW1vdW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucHVNaW5Ob3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRNYXhBbW91bnQoKSA+IDAgJiYgYW1vdW50SW5CYXNlVW5pdHMgPiB0aGlzLmdldE1heEFtb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1TWF4Tm90aWZpY2F0aW9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnB1RXJyb3IgfHwgdGhpcy5tdUVycm9yIHx8IHRoaXMuaXNBZGRUb0NhcnREaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hc2tDdXN0b21lckZvckNvcnJlY3RBbW91bnRJbnB1dChhbW91bnRJblNhbGVzVW5pdElucHV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9DYXJ0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gTnVtYmVyKHRoaXMucXR5SW5CYXNlVW5pdElucHV0LnZhbHVlKTtcbiAgICAgICAgY29uc3QgdG90YWxBbW91bnQgPSAoKGFtb3VudEluQmFzZVVuaXRzICogdGhpcy5wcmVjaXNpb24gKiBxdWFudGl0eSkgLyB0aGlzLnByZWNpc2lvbikudG9GaXhlZChcbiAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYW1vdW50SW5CYXNlVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKHBhcnNlRmxvYXQodG90YWxBbW91bnQpKTtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB0aGlzLmhpZGVQYWNrYWdpbmdVbml0UmVzdHJpY3Rpb25Ob3RpZmljYXRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5wcmljZUNhbGN1bGF0aW9uKGFtb3VudEluQmFzZVVuaXRzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJpY2VDYWxjdWxhdGlvbihhbW91bnRJbkJhc2VVbml0czogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0ZW1CYXNlUHJpY2U6IG51bWJlciA9IE51bWJlcih0aGlzLml0ZW1CYXNlUHJpY2VJbnB1dC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGFtb3VudERlZmF1bHRJbkJhc2VVbml0SW5wdXRWYWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoaXMuYW1vdW50RGVmYXVsdEluQmFzZVVuaXRJbnB1dC52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGFtb3VudERlZmF1bHRJbkJhc2VVbml0SW5wdXRWYWx1ZSAhPT0gYW1vdW50SW5CYXNlVW5pdHMpIHtcbiAgICAgICAgICAgIGxldCBuZXdQcmljZSA9IChhbW91bnRJbkJhc2VVbml0cyAvIGFtb3VudERlZmF1bHRJbkJhc2VVbml0SW5wdXRWYWx1ZSkgKiBpdGVtQmFzZVByaWNlO1xuICAgICAgICAgICAgbmV3UHJpY2UgPSAobmV3UHJpY2UgKiBOdW1iZXIodGhpcy5xdHlJbkJhc2VVbml0SW5wdXQudmFsdWUpKSAvIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmRlZ3JlZVswXSk7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdOZXdQcmljZVZhbHVlQmxvY2suaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1Nb25leVN5bWJvbElucHV0LnZhbHVlICsgbmV3UHJpY2UudG9GaXhlZCh0aGlzLmRlZ3JlZVswXSk7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RQYWNrYWdpbmdOZXdQcmljZUJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFza0N1c3RvbWVyRm9yQ29ycmVjdEFtb3VudElucHV0KGFtb3VudEluU2FsZXNVbml0czogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHB1Q2hvaWNlTGlzdEVsZW1lbnQgPSB0aGlzLnB1Q2hvaWNlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGlzdGApWzBdO1xuICAgICAgICBjb25zdCBwdUN1cnJlbnRDaG9pY2VFbGVtZW50ID0gdGhpcy5wdUNob2ljZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgIGAke3RoaXMuanNOYW1lfV9fYW1vdW50LWN1cnJlbnQtY2hvaWNlYCxcbiAgICAgICAgKVswXTtcblxuICAgICAgICBpZiAodGhpcy5wdUVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtaW5DaG9pY2UgPSB0aGlzLmdldE1pbkFtb3VudENob2ljZShhbW91bnRJblNhbGVzVW5pdHMpO1xuICAgICAgICAgICAgY29uc3QgbWF4Q2hvaWNlID0gdGhpcy5nZXRNYXhBbW91bnRDaG9pY2UoYW1vdW50SW5TYWxlc1VuaXRzLCBtaW5DaG9pY2UpO1xuXG4gICAgICAgICAgICBwdUNob2ljZUxpc3RFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcHVDdXJyZW50Q2hvaWNlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHB1Q3VycmVudENob2ljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0aGlzLnJvdW5kKGFtb3VudEluU2FsZXNVbml0cywgdGhpcy5kZWNpbWFscyl9ICR7dGhpcy5nZXRVbml0TmFtZShcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LnByb2R1Y3RfbWVhc3VyZW1lbnRfdW5pdC5jb2RlLFxuICAgICAgICAgICAgKX1gO1xuXG4gICAgICAgICAgICBjb25zdCBjaG9pY2VFbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAobWluQ2hvaWNlKSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlRWxlbWVudHMucHVzaCh0aGlzLmNyZWF0ZUFtb3VudENob2ljZUVsZW1lbnQobWluQ2hvaWNlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXhDaG9pY2UgIT09IG1pbkNob2ljZSkge1xuICAgICAgICAgICAgICAgIGNob2ljZUVsZW1lbnRzLnB1c2godGhpcy5jcmVhdGVBbW91bnRDaG9pY2VFbGVtZW50KG1heENob2ljZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PlxuICAgICAgICAgICAgICAgIGVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IHB1Q2hvaWNlTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnB1Q2hvaWNlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0Q3VycmVudExlYWRTYWxlc1VuaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5sZWFkU2FsZXNVbml0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdCA9IHRoaXMubGVhZFNhbGVzVW5pdHMuZmluZCgoaXRlbTogU2FsZXNVbml0KSA9PiBpdGVtLmlzX2RlZmF1bHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVBbW91bnRDaG9pY2VFbGVtZW50KGFtb3VudEluQmFzZVVuaXRzOiBudW1iZXIpOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICBpZiAoYW1vdW50SW5CYXNlVW5pdHMgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50SW5TYWxlc1VuaXRzID0gKFxuICAgICAgICAgICAgICAgIChhbW91bnRJbkJhc2VVbml0cyAqIHRoaXMucHJlY2lzaW9uKSAvXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdC5jb252ZXJzaW9uIC9cbiAgICAgICAgICAgICAgICB0aGlzLnByZWNpc2lvblxuICAgICAgICAgICAgKS50b0ZpeGVkKHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzKTtcbiAgICAgICAgICAgIGNvbnN0IG1lYXN1cmVtZW50U2FsZXNVbml0TmFtZSA9IHRoaXMuZ2V0VW5pdE5hbWUodGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdC5wcm9kdWN0X21lYXN1cmVtZW50X3VuaXQuY29kZSk7XG4gICAgICAgICAgICBjb25zdCBtZWFzdXJlbWVudEJhc2VVbml0TmFtZSA9IHRoaXMuZ2V0VW5pdE5hbWUodGhpcy5iYXNlVW5pdC5jb2RlKTtcblxuICAgICAgICAgICAgY29uc3Qgc2FsZXNVbml0Q2hvaWNlID0gYCR7cGFyc2VGbG9hdChhbW91bnRJblNhbGVzVW5pdHMpfSAke21lYXN1cmVtZW50U2FsZXNVbml0TmFtZX1gO1xuICAgICAgICAgICAgY29uc3QgYmFzZVVuaXRDaG9pY2UgPSBgJHthbW91bnRJbkJhc2VVbml0c30gJHttZWFzdXJlbWVudEJhc2VVbml0TmFtZX1gO1xuXG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWJhc2UtdW5pdC1hbW91bnQnLCBTdHJpbmcoYW1vdW50SW5CYXNlVW5pdHMpKTtcbiAgICAgICAgICAgIGNob2ljZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXNhbGVzLXVuaXQtYW1vdW50JywgU3RyaW5nKHBhcnNlRmxvYXQoYW1vdW50SW5TYWxlc1VuaXRzKSkpO1xuICAgICAgICAgICAgY2hvaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAoJHtzYWxlc1VuaXRDaG9pY2V9KSA9ICgke2Jhc2VVbml0Q2hvaWNlfSlgO1xuICAgICAgICAgICAgY2hvaWNlRWxlbWVudC5vbmNsaWNrID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnRJbkJhc2VVbml0c1ZhbHVlID0gcGFyc2VGbG9hdChlbGVtZW50LmRhdGFzZXQuYmFzZVVuaXRBbW91bnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudEluU2FsZXNVbml0c1ZhbHVlID0gcGFyc2VGbG9hdChlbGVtZW50LmRhdGFzZXQuc2FsZXNVbml0QW1vdW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1RXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFtb3VudChhbW91bnRJbkJhc2VVbml0c1ZhbHVlLCBhbW91bnRJblNhbGVzVW5pdHNWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICByZXR1cm4gY2hvaWNlRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZWxlY3RBbW91bnQoYW1vdW50SW5CYXNlVW5pdHM6IG51bWJlciwgYW1vdW50SW5TYWxlc1VuaXRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKGFtb3VudEluU2FsZXNVbml0cyk7XG4gICAgICAgIHRoaXMuYW1vdW50SW5CYXNlVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKGFtb3VudEluQmFzZVVuaXRzKTtcbiAgICAgICAgaWYgKCF0aGlzLm11RXJyb3IgJiYgIXRoaXMuaXNBZGRUb0NhcnREaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0NhcnRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVDaG9pY2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLm9uQW1vdW50SW5wdXRDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MZWFkU2FsZXNVbml0U2VsZWN0Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzYWxlc1VuaXRJZCA9IHBhcnNlSW50KCg8SFRNTFNlbGVjdEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldCkudmFsdWUpO1xuICAgICAgICBjb25zdCBzYWxlc1VuaXQgPSB0aGlzLmdldExlYWRTYWxlc1VuaXRCeUlkKHNhbGVzVW5pdElkKTtcblxuICAgICAgICBjb25zdCBhbW91bnRJblNhbGVzVW5pdHMgPSB0aGlzLmdldEFtb3VudENvbnZlcnNpb24oXG4gICAgICAgICAgICBOdW1iZXIodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnZhbHVlKSxcbiAgICAgICAgICAgIHNhbGVzVW5pdC5jb252ZXJzaW9uLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhbW91bnRJblNhbGVzVW5pdHNNaW4gPSB0aGlzLmdldEFtb3VudENvbnZlcnNpb24oXG4gICAgICAgICAgICBOdW1iZXIodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0Lm1pbiksXG4gICAgICAgICAgICBzYWxlc1VuaXQuY29udmVyc2lvbixcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYW1vdW50SW5TYWxlc1VuaXRzTWF4ID0gdGhpcy5nZXRBbW91bnRDb252ZXJzaW9uKFxuICAgICAgICAgICAgTnVtYmVyKHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5tYXgpLFxuICAgICAgICAgICAgc2FsZXNVbml0LmNvbnZlcnNpb24sXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFtb3VudEluU2FsZXNVbml0c1N0ZXAgPSB0aGlzLmdldEFtb3VudENvbnZlcnNpb24oXG4gICAgICAgICAgICBOdW1iZXIodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnN0ZXApLFxuICAgICAgICAgICAgc2FsZXNVbml0LmNvbnZlcnNpb24sXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TGVhZFNhbGVzVW5pdCA9IHNhbGVzVW5pdDtcbiAgICAgICAgdGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnZhbHVlID0gU3RyaW5nKGFtb3VudEluU2FsZXNVbml0cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5taW4pIHtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5taW4gPSBTdHJpbmcoYW1vdW50SW5TYWxlc1VuaXRzTWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmFtb3VudEluU2FsZXNVbml0SW5wdXQubWF4ID0gU3RyaW5nKGFtb3VudEluU2FsZXNVbml0c01heCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hbW91bnRJblNhbGVzVW5pdElucHV0LnN0ZXApIHtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50SW5TYWxlc1VuaXRJbnB1dC5zdGVwID0gU3RyaW5nKGFtb3VudEluU2FsZXNVbml0c1N0ZXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkFtb3VudElucHV0Q2hhbmdlKGFtb3VudEluU2FsZXNVbml0cyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhpZGVQYWNrYWdpbmdVbml0UmVzdHJpY3Rpb25Ob3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnB1Q2hvaWNlRWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICAgICAgdGhpcy5wdU1pbk5vdGlmaWNhdGlvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIHRoaXMucHVNYXhOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgICAgICB0aGlzLnB1SW50ZXJ2YWxOb3RpZmljYXRpb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRMZWFkU2FsZXNVbml0QnlJZChzYWxlc1VuaXRJZDogbnVtYmVyKTogU2FsZXNVbml0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhZFNhbGVzVW5pdHMuZmluZCgoaXRlbTogU2FsZXNVbml0KSA9PiBzYWxlc1VuaXRJZCA9PT0gaXRlbS5pZF9wcm9kdWN0X21lYXN1cmVtZW50X3NhbGVzX3VuaXQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNaW5BbW91bnQoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ2Ftb3VudF9taW4nKSAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuYW1vdW50X21pbiAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuYW1vdW50X21pbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0TWF4QW1vdW50KCk6IG51bWJlciB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlLmhhc093blByb3BlcnR5KCdhbW91bnRfbWF4JykgJiZcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlLmFtb3VudF9tYXggIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlLmFtb3VudF9tYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEFtb3VudEludGVydmFsKCk6IG51bWJlciB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFBhY2thZ2luZ1VuaXRTdG9yYWdlLmhhc093blByb3BlcnR5KCdhbW91bnRfaW50ZXJ2YWwnKSAmJlxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0UGFja2FnaW5nVW5pdFN0b3JhZ2UuYW1vdW50X2ludGVydmFsICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLnByb2R1Y3RQYWNrYWdpbmdVbml0U3RvcmFnZS5hbW91bnRfaW50ZXJ2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldE1pbkFtb3VudENob2ljZShhbW91bnRJblNhbGVzVW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGFtb3VudEluQmFzZVVuaXRzID0gTnVtYmVyKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIChhbW91bnRJblNhbGVzVW5pdHMgKiB0aGlzLnByZWNpc2lvbiAqIE51bWJlcih0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24pKSAvXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVjaXNpb25cbiAgICAgICAgICAgICkudG9GaXhlZCh0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyksXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGFtb3VudEluQmFzZVVuaXRzIDwgdGhpcy5nZXRNaW5BbW91bnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWluQW1vdW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0Ftb3VudEdyZWF0ZXJUaGFuTWF4QW1vdW50KGFtb3VudEluQmFzZVVuaXRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0Ftb3VudE11bHRpcGxlVG9JbnRlcnZhbChhbW91bnRJbkJhc2VVbml0cykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1pbkFtb3VudENob2ljZShcbiAgICAgICAgICAgICAgICAoYW1vdW50SW5CYXNlVW5pdHMgLSB0aGlzLmdldEFtb3VudFBlcmNlbnRhZ2VPZkRpdmlzaW9uKGFtb3VudEluQmFzZVVuaXRzKSkgL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24sXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFtb3VudEluQmFzZVVuaXRzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRNYXhBbW91bnRDaG9pY2UoYW1vdW50SW5TYWxlc1VuaXRzOiBudW1iZXIsIG1pbkNob2ljZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGFtb3VudEluQmFzZVVuaXRzID0gTnVtYmVyKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIChhbW91bnRJblNhbGVzVW5pdHMgKiB0aGlzLnByZWNpc2lvbiAqIE51bWJlcih0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24pKSAvXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVjaXNpb25cbiAgICAgICAgICAgICkudG9GaXhlZCh0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyksXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBbW91bnRHcmVhdGVyVGhhbk1heEFtb3VudChhbW91bnRJbkJhc2VVbml0cykpIHtcbiAgICAgICAgICAgIGFtb3VudEluQmFzZVVuaXRzID0gdGhpcy5nZXRNYXhBbW91bnQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbW91bnRNdWx0aXBsZVRvSW50ZXJ2YWwoYW1vdW50SW5CYXNlVW5pdHMpKSB7XG4gICAgICAgICAgICAgICAgYW1vdW50SW5CYXNlVW5pdHMgPSBhbW91bnRJbkJhc2VVbml0cyAtIHRoaXMuZ2V0QW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24oYW1vdW50SW5CYXNlVW5pdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYW1vdW50SW5CYXNlVW5pdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW1vdW50SW5CYXNlVW5pdHMgPD0gbWluQ2hvaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQW1vdW50TXVsdGlwbGVUb0ludGVydmFsKGFtb3VudEluQmFzZVVuaXRzKSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvc3NpYmxlSW50ZXJ2YWwgPSBOdW1iZXIoXG4gICAgICAgICAgICAgICAgKChtaW5DaG9pY2UgKiB0aGlzLnByZWNpc2lvbiArIHRoaXMuZ2V0QW1vdW50SW50ZXJ2YWwoKSAqIHRoaXMucHJlY2lzaW9uKSAvIHRoaXMucHJlY2lzaW9uKS50b0ZpeGVkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5leHRQb3NzaWJsZUludGVydmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFtb3VudEluQmFzZVVuaXRzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpc0Ftb3VudEdyZWF0ZXJUaGFuTWF4QW1vdW50KGFtb3VudEluQmFzZVVuaXRzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWF4QW1vdW50KCkgPiAwICYmIGFtb3VudEluQmFzZVVuaXRzID4gdGhpcy5nZXRNYXhBbW91bnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNBbW91bnRNdWx0aXBsZVRvSW50ZXJ2YWwoYW1vdW50SW5CYXNlVW5pdHM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbW91bnRQZXJjZW50YWdlT2ZEaXZpc2lvbihhbW91bnRJbkJhc2VVbml0cykgIT09IDA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEFtb3VudENvbnZlcnNpb24odmFsdWU6IG51bWJlciwgY29udmVyc2lvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoXG4gICAgICAgICAgICAoKHZhbHVlICogdGhpcy5wcmVjaXNpb24gKiB0aGlzLmN1cnJlbnRMZWFkU2FsZXNVbml0LmNvbnZlcnNpb24pIC8gY29udmVyc2lvbiAvIHRoaXMucHJlY2lzaW9uKS50b0ZpeGVkKFxuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZEZWNpbWFsUGxhY2VzLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24oYW1vdW50SW5CYXNlVW5pdHM6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24gPSBNYXRoLnJvdW5kKGFtb3VudEluQmFzZVVuaXRzICogdGhpcy5wcmVjaXNpb24pO1xuICAgICAgICBjb25zdCBtaW5BbW91bnRNdWx0aXBseVRvUHJlY2lzaW9uID0gTWF0aC5yb3VuZCh0aGlzLmdldE1pbkFtb3VudCgpICogdGhpcy5wcmVjaXNpb24pO1xuICAgICAgICBjb25zdCBhbW91bnRJbnRlcnZhbE11bHRpcGx5VG9QcmVjaXNpb24gPSB0aGlzLmdldEFtb3VudEludGVydmFsKCkgKiB0aGlzLnByZWNpc2lvbjtcbiAgICAgICAgY29uc3QgY3VycmVudE1pbnVzTWluaW11bUFtb3VudCA9IE51bWJlcihcbiAgICAgICAgICAgICgoYW1vdW50TXVsdGlwbHlUb1ByZWNpc2lvbiAtIG1pbkFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24pIC8gdGhpcy5wcmVjaXNpb24pLnRvRml4ZWQoXG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJPZkRlY2ltYWxQbGFjZXMsXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjdXJyZW50TWludXNNaW5pbXVtQW1vdW50TXVsdGlwbHlUb1ByZWNpc2lvbiA9IE1hdGgucm91bmQoY3VycmVudE1pbnVzTWluaW11bUFtb3VudCAqIHRoaXMucHJlY2lzaW9uKTtcbiAgICAgICAgY29uc3QgYW1vdW50UGVyY2VudGFnZU9mRGl2aXNpb24gPSAoXG4gICAgICAgICAgICAoY3VycmVudE1pbnVzTWluaW11bUFtb3VudE11bHRpcGx5VG9QcmVjaXNpb24gJSBhbW91bnRJbnRlcnZhbE11bHRpcGx5VG9QcmVjaXNpb24pIC9cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uXG4gICAgICAgICkudG9GaXhlZCh0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyk7XG5cbiAgICAgICAgcmV0dXJuIE51bWJlcihhbW91bnRQZXJjZW50YWdlT2ZEaXZpc2lvbik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwcmVjaXNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihgMSR7JzAnLnJlcGVhdCh0aGlzLm51bWJlck9mRGVjaW1hbFBsYWNlcyl9YCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwYWNrYWdpbmdKU09OU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnanNvbicpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=