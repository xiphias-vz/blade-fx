(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[11],{

/***/ "./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-details/product-set-details.ts":
/*!********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-details/product-set-details.ts ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductSetDetails; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/components/molecules/product-item/product-item */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var ProductSetDetails = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(ProductSetDetails, _Component);

  var _super = _createSuper(ProductSetDetails);

  function ProductSetDetails() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "productItems", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "targets", void 0);

    return _this;
  }

  var _proto = ProductSetDetails.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.productItems = Array.from(this.getElementsByClassName(this.jsName + "__product-item"));
    this.targets = Array.from(this.getElementsByClassName(this.jsName + "__product-sku-hidden-input"));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    if (!this.productItems) {
      return;
    }

    this.mapProductItemUpdateAddToCartUrlCustomEvent();
  };

  _proto.mapProductItemUpdateAddToCartUrlCustomEvent = function mapProductItemUpdateAddToCartUrlCustomEvent() {
    var _this2 = this;

    this.productItems.forEach(function (element, index) {
      element.addEventListener(ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_6__["EVENT_UPDATE_ADD_TO_CART_URL"], function (event) {
        _this2.updateAddToCartUrls(event.detail.sku, index);
      });
    });
  };

  _proto.updateAddToCartUrls = function updateAddToCartUrls(sku, index) {
    if (this.targets[index]) {
      this.targets[index].value = sku;
    }
  };

  return ProductSetDetails;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: EVENT_UPDATE_RATING, EVENT_UPDATE_LABELS, EVENT_UPDATE_ADD_TO_CART_URL, EVENT_UPDATE_AJAX_ADD_TO_CART_URL, EVENT_UPDATE_ADD_TO_CART_FORM_ACTION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_RATING", function() { return EVENT_UPDATE_RATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_LABELS", function() { return EVENT_UPDATE_LABELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_ADD_TO_CART_URL", function() { return EVENT_UPDATE_ADD_TO_CART_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_AJAX_ADD_TO_CART_URL", function() { return EVENT_UPDATE_AJAX_ADD_TO_CART_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_ADD_TO_CART_FORM_ACTION", function() { return EVENT_UPDATE_ADD_TO_CART_FORM_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductItem; });
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
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* tslint:disable: max-file-line-count */

/**
 * @event updateRating An event emitted when the product rating has been updated.
 * @event updateLabels An event emitted when the product labels has been updated.
 * @event updateAddToCartUrl An event emitted when the product 'add to cart' URL has been updated.
 * @event updateAjaxAddToCartUrl An event emitted when the product AJAX 'add to cart' URL has been updated.
 * @event updateAddToCartFormAction An event emitted when the product 'add to cart' form action has been updated.
 */

var EVENT_UPDATE_RATING = 'updateRating';
var EVENT_UPDATE_LABELS = 'updateLabels';
var EVENT_UPDATE_ADD_TO_CART_URL = 'updateAddToCartUrl';
var EVENT_UPDATE_AJAX_ADD_TO_CART_URL = 'updateAjaxAddToCartUrl';
var EVENT_UPDATE_ADD_TO_CART_FORM_ACTION = 'updateAddToCartFormAction';

var ProductItem = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ProductItem, _Component);

  var _super = _createSuper(ProductItem);

  function ProductItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productImage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productName", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productRating", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productDefaultPrice", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productOriginalPrice", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productLinkDetailPage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productLinkAddToCart", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productAjaxButtonAddToCart", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productFormAddToCart", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "productButtonAddToCart", void 0);

    return _this;
  }

  var _proto = ProductItem.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.productImage = this.getElementsByClassName(this.jsName + "__image")[0];
    this.productName = this.getElementsByClassName(this.jsName + "__name")[0];
    this.productRating = this.getElementsByClassName(this.jsName + "__rating")[0];
    this.productDefaultPrice = this.getElementsByClassName(this.jsName + "__default-price")[0];
    this.productOriginalPrice = this.getElementsByClassName(this.jsName + "__original-price")[0];
    this.productLinkDetailPage = Array.from(this.getElementsByClassName(this.jsName + "__link-detail-page"));
    this.productLinkAddToCart = this.getElementsByClassName(this.jsName + "__link-add-to-cart")[0];
    this.productAjaxButtonAddToCart = this.getElementsByClassName(this.jsName + "__ajax-button-add-to-cart")[0];
    this.productFormAddToCart = this.getElementsByClassName(this.jsName + "__form-add-to-cart")[0];
    this.productButtonAddToCart = this.getElementsByClassName(this.jsName + "__button-add-to-cart")[0];
  }
  /**
   * Sets the product card information.
   * @param data A data object for setting the product card information.
   */
  ;

  _proto.updateProductItemData = function updateProductItemData(data) {
    var _data$ajaxAddToCartUr, _data$addToCartFormAc;

    this.imageUrl = data.imageUrl;
    this.imageAlt = data.name;
    this.labels = data.labels;
    this.productItemName = data.name;
    this.ratingValue = data.ratingValue;
    this.defaultPrice = data.defaultPrice;
    this.originalPrice = data.originalPrice;
    this.detailPageUrl = data.detailPageUrl;
    this.addToCartUrl = data.addToCartUrl;
    this.ajaxAddToCartUrl = (_data$ajaxAddToCartUr = data.ajaxAddToCartUrl) != null ? _data$ajaxAddToCartUr : null;
    this.addToCartFormAction = (_data$addToCartFormAc = data.addToCartFormAction) != null ? _data$addToCartFormAc : null;
  };

  _proto.getSkuFromUrl = function getSkuFromUrl(url) {
    if (!url) {
      return null;
    }

    var lastPartOfUrl = new RegExp("([^\\/])+$", 'g');
    var sku = url.match(lastPartOfUrl);
    return sku[0];
  }
  /**
   * Sets the product card image URL.
   * @param imageUrl A product card image URL.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ProductItem, [{
    key: "imageUrl",
    set: function set(imageUrl) {
      if (this.productImage) {
        this.productImage.src = imageUrl;
      }
    }
    /**
     * Sets the product card image alt.
     * @param imageAlt A product card image alt.
     */
    ,

    /**
     * Gets the product card image URL.
     */
    get: function get() {
      if (this.productImage) {
        return this.productImage.src;
      }
    }
    /**
     * Gets the product card name.
     */

  }, {
    key: "imageAlt",
    set: function set(imageAlt) {
      if (this.productImage) {
        this.productImage.alt = imageAlt;
      }
    }
    /**
     * Sets the product card labels.
     * @param labels An array of product card labels.
     */

  }, {
    key: "labels",
    set: function set(labels) {
      this.dispatchCustomEvent(EVENT_UPDATE_LABELS, {
        labels: labels
      });
    }
    /**
     * Sets the product card name.
     * @param name A product card name.
     */

  }, {
    key: "productItemName",
    set: function set(name) {
      if (this.productName) {
        this.productName.innerText = name;
      }
    }
    /**
     * Sets the product card rating.
     * @param rating A product card rating.
     */
    ,
    get: function get() {
      if (this.productName) {
        return this.productName.innerText;
      }
    }
    /**
     * Gets the product card rating.
     */

  }, {
    key: "ratingValue",
    set: function set(rating) {
      this.dispatchCustomEvent(EVENT_UPDATE_RATING, {
        rating: rating
      });
    }
    /**
     * Sets the product card default price.
     * @param defaultPrice A product card default price.
     */
    ,
    get: function get() {
      if (this.productRating) {
        return Number(this.productRating.value);
      }
    }
    /**
     * Gets the product card default price.
     */

  }, {
    key: "defaultPrice",
    set: function set(defaultPrice) {
      if (this.productDefaultPrice) {
        this.productDefaultPrice.innerText = defaultPrice;
      }
    }
    /**
     * Sets the product card original price.
     * @param originalPrice A product card original price.
     */
    ,
    get: function get() {
      if (this.productDefaultPrice) {
        return this.productDefaultPrice.innerText;
      }
    }
    /**
     * Gets the product card original price.
     */

  }, {
    key: "originalPrice",
    set: function set(originalPrice) {
      if (this.productOriginalPrice) {
        this.productOriginalPrice.innerText = originalPrice;
      }
    }
    /**
     * Sets the product card detail page URL.
     * @param detailPageUrl A product card detail page URL.
     */
    ,
    get: function get() {
      if (this.productOriginalPrice) {
        return this.productOriginalPrice.innerText;
      }
    }
    /**
     * Gets the product card detail page URL.
     */

  }, {
    key: "detailPageUrl",
    set: function set(detailPageUrl) {
      if (this.productLinkDetailPage) {
        this.productLinkDetailPage.forEach(function (element) {
          return element.href = detailPageUrl;
        });
      }
    }
    /**
     * Sets the product card 'add to cart' URL.
     * @param addToCartUrl A product card 'add to cart' URL.
     */
    ,
    get: function get() {
      if (this.productLinkDetailPage) {
        return this.productLinkDetailPage[0].href;
      }
    }
    /**
     * Gets the product card 'add to cart' URL.
     */

  }, {
    key: "addToCartUrl",
    set: function set(addToCartUrl) {
      if (this.productLinkAddToCart) {
        this.productLinkAddToCart.href = addToCartUrl;
      }

      this.dispatchCustomEvent(EVENT_UPDATE_ADD_TO_CART_URL, {
        sku: this.getSkuFromUrl(addToCartUrl)
      });
    }
    /**
     * Sets the product card AJAX 'add to cart' URL.
     * @param ajaxAddToCartUrl A product card AJAX 'add to cart' URL.
     */
    ,
    get: function get() {
      if (this.productLinkAddToCart) {
        return this.productLinkAddToCart.href;
      }
    }
    /**
     * Gets the product card AJAX 'add to cart' URL.
     */

  }, {
    key: "ajaxAddToCartUrl",
    set: function set(ajaxAddToCartUrl) {
      if (this.productAjaxButtonAddToCart) {
        this.productAjaxButtonAddToCart.disabled = !ajaxAddToCartUrl;
        this.productAjaxButtonAddToCart.dataset.url = ajaxAddToCartUrl;
      }

      this.dispatchCustomEvent(EVENT_UPDATE_AJAX_ADD_TO_CART_URL, {
        sku: this.getSkuFromUrl(ajaxAddToCartUrl)
      });
    }
    /**
     * Sets the product card 'add to cart' form action.
     * @param addToCartFormAction A product card 'add to cart' form action.
     */
    ,
    get: function get() {
      if (this.productAjaxButtonAddToCart) {
        return this.productAjaxButtonAddToCart.dataset.url;
      }
    }
    /**
     * Gets the product card 'add to cart' form action.
     */

  }, {
    key: "addToCartFormAction",
    set: function set(addToCartFormAction) {
      if (this.productFormAddToCart) {
        this.productFormAddToCart.action = addToCartFormAction;
      }

      if (this.productButtonAddToCart) {
        this.productButtonAddToCart.dataset.formAction = addToCartFormAction;
      }

      this.dispatchCustomEvent(EVENT_UPDATE_ADD_TO_CART_FORM_ACTION, {
        sku: this.getSkuFromUrl(addToCartFormAction)
      });
    },
    get: function get() {
      if (this.productFormAddToCart) {
        return this.productFormAddToCart.action;
      }

      if (this.productButtonAddToCart) {
        return this.productButtonAddToCart.dataset.formAction;
      }
    }
  }]);

  return ProductItem;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Byb2R1Y3Qtc2V0LXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0U2V0V2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9vcmdhbmlzbXMvcHJvZHVjdC1zZXQtZGV0YWlscy9wcm9kdWN0LXNldC1kZXRhaWxzLnRzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIl0sIm5hbWVzIjpbIlByb2R1Y3RTZXREZXRhaWxzIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJwcm9kdWN0SXRlbXMiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwidGFyZ2V0cyIsIm1hcEV2ZW50cyIsIm1hcFByb2R1Y3RJdGVtVXBkYXRlQWRkVG9DYXJ0VXJsQ3VzdG9tRXZlbnQiLCJmb3JFYWNoIiwiZWxlbWVudCIsImluZGV4IiwiYWRkRXZlbnRMaXN0ZW5lciIsIkVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwiLCJldmVudCIsInVwZGF0ZUFkZFRvQ2FydFVybHMiLCJkZXRhaWwiLCJza3UiLCJ2YWx1ZSIsIkNvbXBvbmVudCIsIkVWRU5UX1VQREFURV9SQVRJTkciLCJFVkVOVF9VUERBVEVfTEFCRUxTIiwiRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OIiwiUHJvZHVjdEl0ZW0iLCJwcm9kdWN0SW1hZ2UiLCJwcm9kdWN0TmFtZSIsInByb2R1Y3RSYXRpbmciLCJwcm9kdWN0RGVmYXVsdFByaWNlIiwicHJvZHVjdE9yaWdpbmFsUHJpY2UiLCJwcm9kdWN0TGlua0RldGFpbFBhZ2UiLCJwcm9kdWN0TGlua0FkZFRvQ2FydCIsInByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0IiwicHJvZHVjdEZvcm1BZGRUb0NhcnQiLCJwcm9kdWN0QnV0dG9uQWRkVG9DYXJ0IiwidXBkYXRlUHJvZHVjdEl0ZW1EYXRhIiwiZGF0YSIsImltYWdlVXJsIiwiaW1hZ2VBbHQiLCJuYW1lIiwibGFiZWxzIiwicHJvZHVjdEl0ZW1OYW1lIiwicmF0aW5nVmFsdWUiLCJkZWZhdWx0UHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiZGV0YWlsUGFnZVVybCIsImFkZFRvQ2FydFVybCIsImFqYXhBZGRUb0NhcnRVcmwiLCJhZGRUb0NhcnRGb3JtQWN0aW9uIiwiZ2V0U2t1RnJvbVVybCIsInVybCIsImxhc3RQYXJ0T2ZVcmwiLCJSZWdFeHAiLCJtYXRjaCIsInNyYyIsImFsdCIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJpbm5lclRleHQiLCJyYXRpbmciLCJOdW1iZXIiLCJocmVmIiwiZGlzYWJsZWQiLCJkYXRhc2V0IiwiYWN0aW9uIiwiZm9ybUFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLFlBQUwsR0FBbUNDLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLG9CQUFYLENBQW5DO0FBQ0EsU0FBS0MsT0FBTCxHQUFtQ0osS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0Msc0JBQUwsQ0FDdkMsS0FBS0MsTUFEa0MsZ0NBQVgsQ0FBbkM7QUFJQSxTQUFLRSxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUN4QixRQUFJLENBQUMsS0FBS04sWUFBVixFQUF3QjtBQUNwQjtBQUNIOztBQUVELFNBQUtPLDJDQUFMO0FBQ0gs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QUEwQjhCLE1BQTFCLEdBQW1DZixtQkFBbkM7QUFDSDs7QUFFRCxVQUFJLEtBQUtkLHNCQUFULEVBQWlDO0FBQzdCLGFBQUtBLHNCQUFMLENBQTRCNEIsT0FBNUIsQ0FBb0NFLFVBQXBDLEdBQWlEaEIsbUJBQWpEO0FBQ0g7O0FBRUQsV0FBS1EsbUJBQUwsQ0FBeUJqQyxvQ0FBekIsRUFBK0Q7QUFDM0ROLFdBQUcsRUFBRSxLQUFLZ0MsYUFBTCxDQUFtQkQsbUJBQW5CO0FBRHNELE9BQS9EO0FBR0gsSzt3QkE2RWlDO0FBQzlCLFVBQUksS0FBS2Ysb0JBQVQsRUFBK0I7QUFDM0IsZUFBTyxLQUFLQSxvQkFBTCxDQUEwQjhCLE1BQWpDO0FBQ0g7O0FBRUQsVUFBSSxLQUFLN0Isc0JBQVQsRUFBaUM7QUFDN0IsZUFBTyxLQUFLQSxzQkFBTCxDQUE0QjRCLE9BQTVCLENBQW9DRSxVQUEzQztBQUNIO0FBQ0o7Ozs7RUExUW9DN0MseUQiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMTEubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgUHJvZHVjdEl0ZW0sIHsgRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCB9IGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdFNldERldGFpbHMgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBwcm9kdWN0SXRlbXM6IFByb2R1Y3RJdGVtW107XG4gICAgcHJvdGVjdGVkIHRhcmdldHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtcyA9IDxQcm9kdWN0SXRlbVtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvZHVjdC1pdGVtYCkpO1xuICAgICAgICB0aGlzLnRhcmdldHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgICAgICAgYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LXNrdS1oaWRkZW4taW5wdXRgXG4gICAgICAgICkpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb2R1Y3RJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBQcm9kdWN0SXRlbVVwZGF0ZUFkZFRvQ2FydFVybEN1c3RvbUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFByb2R1Y3RJdGVtVXBkYXRlQWRkVG9DYXJ0VXJsQ3VzdG9tRXZlbnQoKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1zLmZvckVhY2goKGVsZW1lbnQ6IFByb2R1Y3RJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWRkVG9DYXJ0VXJscygoPEN1c3RvbUV2ZW50PmV2ZW50KS5kZXRhaWwuc2t1LCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUFkZFRvQ2FydFVybHMoc2t1OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0c1tpbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0c1tpbmRleF0udmFsdWUgPSBza3U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCAqL1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlUmF0aW5nIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCByYXRpbmcgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVMYWJlbHMgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0IGxhYmVscyBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFkZFRvQ2FydFVybCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBVUkwgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBamF4QWRkVG9DYXJ0VXJsIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCBBSkFYICdhZGQgdG8gY2FydCcgVVJMIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWRkVG9DYXJ0Rm9ybUFjdGlvbiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICovXG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX1JBVElORyA9ICd1cGRhdGVSYXRpbmcnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9MQUJFTFMgPSAndXBkYXRlTGFiZWxzJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFkZFRvQ2FydFVybCc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFqYXhBZGRUb0NhcnRVcmwnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9GT1JNX0FDVElPTiA9ICd1cGRhdGVBZGRUb0NhcnRGb3JtQWN0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0SXRlbURhdGEge1xuICAgIGltYWdlVXJsOiBzdHJpbmc7XG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcbiAgICBsYWJlbHM6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YVtdO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByYXRpbmdWYWx1ZTogbnVtYmVyO1xuICAgIGRlZmF1bHRQcmljZTogc3RyaW5nO1xuICAgIG9yaWdpbmFsUHJpY2U6IHN0cmluZztcbiAgICBkZXRhaWxQYWdlVXJsOiBzdHJpbmc7XG4gICAgYWRkVG9DYXJ0VXJsOiBzdHJpbmc7XG4gICAgYWpheEFkZFRvQ2FydFVybD86IHN0cmluZztcbiAgICBhZGRUb0NhcnRGb3JtQWN0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJdGVtTGFiZWxzRGF0YSB7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbn1cblxudHlwZSBVcmwgPSBzdHJpbmcgfCBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdE5hbWU6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UmF0aW5nOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0RGVmYXVsdFByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdE9yaWdpbmFsUHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlua0RldGFpbFBhZ2U6IEhUTUxBbmNob3JFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaW5rQWRkVG9DYXJ0OiBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0Rm9ybUFkZFRvQ2FydDogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0QnV0dG9uQWRkVG9DYXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2ltYWdlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdE5hbWUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbmFtZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RSYXRpbmcgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19yYXRpbmdgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2RlZmF1bHQtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19vcmlnaW5hbC1wcmljZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSA9IDxIVE1MQW5jaG9yRWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGluay1kZXRhaWwtcGFnZWApKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0ID0gPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpbmstYWRkLXRvLWNhcnRgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0ID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2FqYXgtYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCA9IDxIVE1MRm9ybUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZm9ybS1hZGQtdG8tY2FydGApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIGRhdGEgQSBkYXRhIG9iamVjdCBmb3Igc2V0dGluZyB0aGUgcHJvZHVjdCBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RJdGVtRGF0YShkYXRhOiBQcm9kdWN0SXRlbURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IGRhdGEuaW1hZ2VVcmw7XG4gICAgICAgIHRoaXMuaW1hZ2VBbHQgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMubGFiZWxzID0gZGF0YS5sYWJlbHM7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1OYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLnJhdGluZ1ZhbHVlID0gZGF0YS5yYXRpbmdWYWx1ZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJpY2UgPSBkYXRhLmRlZmF1bHRQcmljZTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFByaWNlID0gZGF0YS5vcmlnaW5hbFByaWNlO1xuICAgICAgICB0aGlzLmRldGFpbFBhZ2VVcmwgPSBkYXRhLmRldGFpbFBhZ2VVcmw7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0VXJsID0gZGF0YS5hZGRUb0NhcnRVcmw7XG4gICAgICAgIHRoaXMuYWpheEFkZFRvQ2FydFVybCA9IGRhdGEuYWpheEFkZFRvQ2FydFVybCA/PyBudWxsO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydEZvcm1BY3Rpb24gPSBkYXRhLmFkZFRvQ2FydEZvcm1BY3Rpb24gPz8gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U2t1RnJvbVVybCh1cmw6IFVybCk6IFVybCB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhc3RQYXJ0T2ZVcmwgPSBuZXcgUmVnRXhwKGAoW15cXFxcL10pKyRgLCAnZycpO1xuICAgICAgICBjb25zdCBza3UgPSB1cmwubWF0Y2gobGFzdFBhcnRPZlVybCk7XG5cbiAgICAgICAgcmV0dXJuIHNrdVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqIEBwYXJhbSBpbWFnZVVybCBBIHByb2R1Y3QgY2FyZCBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZS5zcmMgPSBpbWFnZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBpbWFnZSBhbHQuXG4gICAgICogQHBhcmFtIGltYWdlQWx0IEEgcHJvZHVjdCBjYXJkIGltYWdlIGFsdC5cbiAgICAgKi9cbiAgICBzZXQgaW1hZ2VBbHQoaW1hZ2VBbHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEltYWdlLmFsdCA9IGltYWdlQWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGxhYmVscy5cbiAgICAgKiBAcGFyYW0gbGFiZWxzIEFuIGFycmF5IG9mIHByb2R1Y3QgY2FyZCBsYWJlbHMuXG4gICAgICovXG4gICAgc2V0IGxhYmVscyhsYWJlbHM6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YVtdKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfTEFCRUxTLCB7IGxhYmVscyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKiBAcGFyYW0gbmFtZSBBIHByb2R1Y3QgY2FyZCBuYW1lLlxuICAgICAqL1xuICAgIHNldCBwcm9kdWN0SXRlbU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3ROYW1lLmlubmVyVGV4dCA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqIEBwYXJhbSByYXRpbmcgQSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIHNldCByYXRpbmdWYWx1ZShyYXRpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX1JBVElORywgeyByYXRpbmcgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICogQHBhcmFtIGRlZmF1bHRQcmljZSBBIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqL1xuICAgIHNldCBkZWZhdWx0UHJpY2UoZGVmYXVsdFByaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlLmlubmVyVGV4dCA9IGRlZmF1bHRQcmljZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxQcmljZSBBIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKi9cbiAgICBzZXQgb3JpZ2luYWxQcmljZShvcmlnaW5hbFByaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UuaW5uZXJUZXh0ID0gb3JpZ2luYWxQcmljZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBkZXRhaWwgcGFnZSBVUkwuXG4gICAgICogQHBhcmFtIGRldGFpbFBhZ2VVcmwgQSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqL1xuICAgIHNldCBkZXRhaWxQYWdlVXJsKGRldGFpbFBhZ2VVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxBbmNob3JFbGVtZW50KSA9PiAoZWxlbWVudC5ocmVmID0gZGV0YWlsUGFnZVVybCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRVcmwgQSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydFVybChhZGRUb0NhcnRVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydC5ocmVmID0gYWRkVG9DYXJ0VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwsIHsgc2t1OiB0aGlzLmdldFNrdUZyb21VcmwoYWRkVG9DYXJ0VXJsKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKiBAcGFyYW0gYWpheEFkZFRvQ2FydFVybCBBIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIHNldCBhamF4QWRkVG9DYXJ0VXJsKGFqYXhBZGRUb0NhcnRVcmw6IFVybCkge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kaXNhYmxlZCA9ICFhamF4QWRkVG9DYXJ0VXJsO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LnVybCA9IGFqYXhBZGRUb0NhcnRVcmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMLCB7IHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFqYXhBZGRUb0NhcnRVcmwpIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRGb3JtQWN0aW9uIEEgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24uXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydEZvcm1BY3Rpb24oYWRkVG9DYXJ0Rm9ybUFjdGlvbjogVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0LmFjdGlvbiA9IGFkZFRvQ2FydEZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQuZGF0YXNldC5mb3JtQWN0aW9uID0gYWRkVG9DYXJ0Rm9ybUFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04sIHtcbiAgICAgICAgICAgIHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFkZFRvQ2FydEZvcm1BY3Rpb24pLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RJbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgcHJvZHVjdEl0ZW1OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TmFtZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIGdldCByYXRpbmdWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0UmF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMucHJvZHVjdFJhdGluZy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqL1xuICAgIGdldCBvcmlnaW5hbFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBkZXRhaWxQYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlWzBdLmhyZWY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgZ2V0IGFkZFRvQ2FydFVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQuaHJlZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIGdldCBhamF4QWRkVG9DYXJ0VXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LnVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBhZGRUb0NhcnRGb3JtQWN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydC5hY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQuZm9ybUFjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=