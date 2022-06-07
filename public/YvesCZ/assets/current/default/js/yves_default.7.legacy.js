(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[7],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form-extended.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form-extended.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutocompleteFormExtended; });
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
/* harmony import */ var ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/components/molecules/autocomplete-form/autocomplete-form */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var AutocompleteFormExtended = /*#__PURE__*/function (_AutocompleteForm) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(AutocompleteFormExtended, _AutocompleteForm);

  var _super = _createSuper(AutocompleteFormExtended);

  function AutocompleteFormExtended() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _AutocompleteForm.call.apply(_AutocompleteForm, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "parentWrap", void 0);

    return _this;
  }

  var _proto = AutocompleteFormExtended.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    if (this.parentWrapClassName) {
      this.parentWrap = document.getElementsByClassName("" + this.parentWrapClassName)[0];
    }

    this.textInput = this.getElementsByClassName(this.jsName + "__input")[0];

    if (this.textInput) {
      this.ajaxProvider = this.getElementsByClassName(this.jsName + "__provider")[0];
      this.valueInput = this.getElementsByClassName(this.jsName + "__input-hidden")[0];
      this.suggestionsContainer = this.getElementsByClassName(this.jsName + "__container")[0];
      this.cleanButton = this.getElementsByClassName(this.jsName + "__clean-button")[0];
      this.mapEvents();
    }

    if (!this.textInput) {
      _AutocompleteForm.prototype.readyCallback.call(this);
    }
  };

  _proto.onBlur = function onBlur() {
    _AutocompleteForm.prototype.onBlur.call(this);

    if (this.parentWrapClassName) {
      this.hideOverlay();
    }
  };

  _proto.onFocus = function onFocus() {
    if (this.parentWrapClassName) {
      this.showOverlay();
    }

    _AutocompleteForm.prototype.onFocus.call(this);
  };

  _proto.showOverlay = function showOverlay() {
    this.parentWrap.classList.add('active');
  };

  _proto.hideOverlay = function hideOverlay() {
    this.parentWrap.classList.remove('active');
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(AutocompleteFormExtended, [{
    key: "parentWrapClassName",
    get: function get() {
      return this.getAttribute('parent-wrap-class-name');
    }
  }]);

  return AutocompleteFormExtended;
}(ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: Events, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutocompleteForm; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* tslint:disable: max-file-line-count */


var Events;
/**
 * @event fetching An event which is triggered when an ajax request is sent to the server.
 * @event fetched An event which is triggered when an ajax request is closed.
 * @event change An event which is triggered when the search field is changed.
 * @event set An event which is triggered when the element of an autocomplete suggestion is selected.
 * @event unset An event which is triggered when the element of an autocomplete suggestion is removed.
 */

(function (Events) {
  Events["FETCHING"] = "fetching";
  Events["FETCHED"] = "fetched";
  Events["CHANGE"] = "change";
  Events["SET"] = "set";
  Events["UNSET"] = "unset";
})(Events || (Events = {}));

var AutocompleteForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6___default()(AutocompleteForm, _Component);

  var _super = _createSuper(AutocompleteForm);

  function AutocompleteForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "ajaxProvider", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "textInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "valueInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "suggestionsContainer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "suggestionItems", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "cleanButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "lastSelectedItem", void 0);

    return _this;
  }

  var _proto = AutocompleteForm.prototype;

  _proto.readyCallback = function readyCallback() {
    this.ajaxProvider = this.getElementsByClassName(this.jsName + "__provider")[0];
    this.textInput = this.getElementsByClassName(this.jsName + "__text-input")[0];
    this.valueInput = this.getElementsByClassName(this.jsName + "__value-input")[0];
    this.suggestionsContainer = this.getElementsByClassName(this.jsName + "__suggestions")[0];
    this.cleanButton = this.getElementsByClassName(this.jsName + "__clean-button")[0];

    if (this.autoInitEnabled) {
      this.autoLoadInit();
    }

    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.textInput.addEventListener('input', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
      return _this2.onInput();
    }, this.debounceDelay));
    this.textInput.addEventListener('blur', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
      return _this2.onBlur();
    }, this.debounceDelay));
    this.textInput.addEventListener('focus', function () {
      return _this2.onFocus();
    });
    this.textInput.addEventListener('keydown', function (event) {
      return _this2.onKeyDown(event);
    });

    if (this.cleanButton) {
      this.cleanButton.addEventListener('click', function () {
        return _this2.onCleanButtonClick();
      });
    }
  };

  _proto.autoLoadInit = function autoLoadInit() {
    this.textInput.focus();
    this.loadSuggestions();
  };

  _proto.onCleanButtonClick = function onCleanButtonClick() {
    this.clean();
    this.dispatchCustomEvent(Events.UNSET);
  };

  _proto.onBlur = function onBlur() {
    this.hideSuggestions();
  };

  _proto.onFocus = function onFocus() {
    if (this.inputText.length < this.minLetters) {
      return;
    }

    this.showSuggestions();
  };

  _proto.onInput = function onInput() {
    this.dispatchCustomEvent(Events.CHANGE);

    if (this.inputText.length >= this.minLetters) {
      this.loadSuggestions();
      return;
    }

    this.hideSuggestions();

    if (!!this.inputValue) {
      this.inputValue = '';
      this.dispatchCustomEvent(Events.UNSET);
    }
  };

  _proto.showSuggestions = function showSuggestions() {
    this.suggestionsContainer.classList.remove('is-hidden');
  };

  _proto.hideSuggestions = function hideSuggestions() {
    this.suggestionsContainer.classList.add('is-hidden');
  }
  /**
   * Sends a request to the server and triggers the custom fetching and fetched events.
   */
  ;

  _proto.loadSuggestions =
  /*#__PURE__*/
  function () {
    var _loadSuggestions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.dispatchCustomEvent(Events.FETCHING);
              this.showSuggestions();
              this.ajaxProvider.queryParams.set(this.queryString, this.inputText);
              _context.next = 5;
              return this.ajaxProvider.fetch();

            case 5:
              /* tslint:disable: deprecation */
              this.suggestionItems = Array.from(this.suggestionsContainer.getElementsByClassName(this.suggestedItemClassName) || this.suggestionsContainer.querySelectorAll(this.suggestedItemSelector));
              /* tslint:enable: deprecation */

              this.lastSelectedItem = this.suggestionItems[0];
              this.mapSuggestionItemsEvents();
              this.dispatchCustomEvent(Events.FETCHED);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadSuggestions() {
      return _loadSuggestions.apply(this, arguments);
    }

    return loadSuggestions;
  }();

  _proto.mapSuggestionItemsEvents = function mapSuggestionItemsEvents() {
    var _this3 = this;

    this.suggestionItems.forEach(function (item) {
      item.addEventListener('click', function () {
        return _this3.onItemClick(item);
      });
      item.addEventListener('mouseover', function () {
        return _this3.onItemSelected(item);
      });
    });
  };

  _proto.onItemClick = function onItemClick(item) {
    this.inputText = item.textContent.trim();
    this.inputValue = item.getAttribute(this.valueAttributeName);
    this.dispatchCustomEvent(Events.SET, {
      text: this.inputText,
      value: this.inputValue
    });
  };

  _proto.onItemSelected = function onItemSelected(item) {
    this.changeSelectedItem(item);
  };

  _proto.changeSelectedItem = function changeSelectedItem(item) {
    this.lastSelectedItem.classList.remove(this.selectedInputClass);
    item.classList.add(this.selectedInputClass);
    this.lastSelectedItem = item;
  };

  _proto.onKeyDown = function onKeyDown(event) {
    if (!this.suggestionItems && this.inputText.length < this.minLetters) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.onKeyDownArrowUp();
        break;

      case 'ArrowDown':
        this.onKeyDownArrowDown();
        break;

      case 'Enter':
        this.onKeyDownEnter(event);
        break;
    }
  };

  _proto.onKeyDownArrowUp = function onKeyDownArrowUp() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex - 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex < 0 ? lastSuggestionItemIndex : elementIndex];
    this.changeSelectedItem(item);
  };

  _proto.onKeyDownArrowDown = function onKeyDownArrowDown() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex + 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex > lastSuggestionItemIndex ? 0 : elementIndex];
    this.changeSelectedItem(item);
  };

  _proto.onKeyDownEnter = function onKeyDownEnter(event) {
    event.preventDefault();
    this.lastSelectedItem.click();
  }
  /**
   * Clears the input value and the typed text.
   */
  ;

  _proto.clean = function clean() {
    this.inputText = '';
    this.inputValue = '';
  }
  /**
   * Gets the css query selector of the selected suggestion items.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AutocompleteForm, [{
    key: "selectedInputClass",
    get: function get() {
      /* tslint:disable: deprecation */
      return this.suggestedItemClassName + "--selected" || false;
      /* tslint:enable: deprecation */
    }
    /**
     * Gets the typed text from the form field.
     */

  }, {
    key: "inputText",
    get: function get() {
      return this.textInput.value.trim();
    }
    /**
     * Sets an input text.
     * @param value A typed text in the input field.
     */
    ,
    set: function set(value) {
      this.textInput.value = value;
    }
    /**
     * Gets the value attribute from the input form field.
     */

  }, {
    key: "inputValue",
    get: function get() {
      return this.valueInput.value;
    }
    /**
     * Sets the input value.
     */
    ,
    set: function set(value) {
      this.valueInput.value = value;
    }
    /**
     * Gets the css query selector for the ajaxProvider configuration.
     */

  }, {
    key: "queryString",
    get: function get() {
      return this.getAttribute('query-string');
    }
    /**
     * Gets the value attribute name for the input element configuration.
     */

  }, {
    key: "valueAttributeName",
    get: function get() {
      return this.getAttribute('value-attribute-name');
    }
    /**
     * Gets the css query selector of the suggestion items.
     *
     * @deprecated Use suggestedItemClassName() instead.
     */

  }, {
    key: "suggestedItemSelector",
    get: function get() {
      return this.getAttribute('suggested-item-selector');
    }
  }, {
    key: "suggestedItemClassName",
    get: function get() {
      return this.getAttribute('suggested-item-class-name');
    }
    /**
     * Gets a time delay for the blur and input events.
     */

  }, {
    key: "debounceDelay",
    get: function get() {
      return Number(this.getAttribute('debounce-delay'));
    }
    /**
     * Gets the number of letters which, upon entering in form field, is sufficient to show, hide or load the
     * suggestions.
     */

  }, {
    key: "minLetters",
    get: function get() {
      return Number(this.getAttribute('min-letters'));
    }
    /**
     * Gets if the auto load of suggestions is enabled.
     */

  }, {
    key: "autoInitEnabled",
    get: function get() {
      return this.hasAttribute('auto-init');
    }
  }]);

  return AutocompleteForm;
}(_models_component__WEBPACK_IMPORTED_MODULE_8__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYXV0b2NvbXBsZXRlLWZvcm0vYXV0b2NvbXBsZXRlLWZvcm0tZXh0ZW5kZWQudHMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2F1dG9jb21wbGV0ZS1mb3JtL2F1dG9jb21wbGV0ZS1mb3JtLnRzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZUZvcm1FeHRlbmRlZCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicGFyZW50V3JhcENsYXNzTmFtZSIsInBhcmVudFdyYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0ZXh0SW5wdXQiLCJqc05hbWUiLCJhamF4UHJvdmlkZXIiLCJ2YWx1ZUlucHV0Iiwic3VnZ2VzdGlvbnNDb250YWluZXIiLCJjbGVhbkJ1dHRvbiIsIm1hcEV2ZW50cyIsIm9uQmx1ciIsImhpZGVPdmVybGF5Iiwib25Gb2N1cyIsInNob3dPdmVybGF5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZ2V0QXR0cmlidXRlIiwiQXV0b2NvbXBsZXRlRm9ybSIsIkV2ZW50cyIsImF1dG9Jbml0RW5hYmxlZCIsImF1dG9Mb2FkSW5pdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZWJvdW5jZSIsIm9uSW5wdXQiLCJkZWJvdW5jZURlbGF5IiwiZXZlbnQiLCJvbktleURvd24iLCJvbkNsZWFuQnV0dG9uQ2xpY2siLCJmb2N1cyIsImxvYWRTdWdnZXN0aW9ucyIsImNsZWFuIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIlVOU0VUIiwiaGlkZVN1Z2dlc3Rpb25zIiwiaW5wdXRUZXh0IiwibGVuZ3RoIiwibWluTGV0dGVycyIsInNob3dTdWdnZXN0aW9ucyIsIkNIQU5HRSIsImlucHV0VmFsdWUiLCJGRVRDSElORyIsInF1ZXJ5UGFyYW1zIiwic2V0IiwicXVlcnlTdHJpbmciLCJmZXRjaCIsInN1Z2dlc3Rpb25JdGVtcyIsIkFycmF5IiwiZnJvbSIsInN1Z2dlc3RlZEl0ZW1DbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3VnZ2VzdGVkSXRlbVNlbGVjdG9yIiwibGFzdFNlbGVjdGVkSXRlbSIsIm1hcFN1Z2dlc3Rpb25JdGVtc0V2ZW50cyIsIkZFVENIRUQiLCJmb3JFYWNoIiwiaXRlbSIsIm9uSXRlbUNsaWNrIiwib25JdGVtU2VsZWN0ZWQiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ2YWx1ZUF0dHJpYnV0ZU5hbWUiLCJTRVQiLCJ0ZXh0IiwidmFsdWUiLCJjaGFuZ2VTZWxlY3RlZEl0ZW0iLCJzZWxlY3RlZElucHV0Q2xhc3MiLCJrZXkiLCJvbktleURvd25BcnJvd1VwIiwib25LZXlEb3duQXJyb3dEb3duIiwib25LZXlEb3duRW50ZXIiLCJsYXN0U2VsZWN0ZWRJdGVtSW5kZXgiLCJpbmRleE9mIiwiZWxlbWVudEluZGV4IiwibGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsImNsaWNrIiwiTnVtYmVyIiwiaGFzQXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFHcUJBLHdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFFBQUksS0FBS0MsbUJBQVQsRUFBNkI7QUFDekIsV0FBS0MsVUFBTCxHQUErQkMsUUFBUSxDQUFDQyxzQkFBVCxNQUFtQyxLQUFLSCxtQkFBeEMsRUFBK0QsQ0FBL0QsQ0FBL0I7QUFDSDs7QUFFRCxTQUFLSSxTQUFMLEdBQW1DLEtBQUtELHNCQUFMLENBQStCLEtBQUtFLE1BQXBDLGNBQXFELENBQXJELENBQW5DOztB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Ozt3QkFHaUM7QUFDN0I7QUFDQSxhQUFVLEtBQUtTLHNCQUFSLG1CQUE4QyxLQUFyRDtBQUNBO0FBQ0g7QUFFRDs7Ozs7O3dCQUd3QjtBQUNwQixhQUFPLEtBQUs5QyxTQUFMLENBQWU2RCxLQUFmLENBQXFCSixJQUFyQixFQUFQO0FBQ0g7QUFFRDs7Ozs7c0JBSWNJLEssRUFBZTtBQUN6QixXQUFLN0QsU0FBTCxDQUFlNkQsS0FBZixHQUF1QkEsS0FBdkI7QUFDSDtBQUVEOzs7Ozs7d0JBR3lCO0FBQ3JCLGFBQU8sS0FBSzFELFVBQUwsQ0FBZ0IwRCxLQUF2QjtBQUNIO0FBRUQ7Ozs7c0JBR2VBLEssRUFBZTtBQUMxQixXQUFLMUQsVUFBTCxDQUFnQjBELEtBQWhCLEdBQXdCQSxLQUF4QjtBQUNIO0FBRUQ7Ozs7Ozt3QkFHMEI7QUFDdEIsYUFBTyxLQUFLL0MsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUdpQztBQUM3QixhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isc0JBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozt3QkFLb0M7QUFDaEMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLHlCQUFsQixDQUFQO0FBQ0g7Ozt3QkFDOEM7QUFDM0MsYUFBTyxLQUFLQSxZQUFMLENBQWtCLDJCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUc0QjtBQUN4QixhQUFPNEQsTUFBTSxDQUFDLEtBQUs1RCxZQUFMLENBQWtCLGdCQUFsQixDQUFELENBQWI7QUFDSDtBQUVEOzs7Ozs7O3dCQUl5QjtBQUNyQixhQUFPNEQsTUFBTSxDQUFDLEtBQUs1RCxZQUFMLENBQWtCLGFBQWxCLENBQUQsQ0FBYjtBQUNIO0FBRUQ7Ozs7Ozt3QkFHK0I7QUFDM0IsYUFBTyxLQUFLNkQsWUFBTCxDQUFrQixXQUFsQixDQUFQO0FBQ0g7Ozs7RUEzUnlDQyx5RCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC43LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXRvY29tcGxldGVGb3JtIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9hdXRvY29tcGxldGUtZm9ybS9hdXRvY29tcGxldGUtZm9ybSc7XG5pbXBvcnQgQWpheFByb3ZpZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LXByb3ZpZGVyL2FqYXgtcHJvdmlkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvY29tcGxldGVGb3JtRXh0ZW5kZWQgZXh0ZW5kcyBBdXRvY29tcGxldGVGb3JtIHtcbiAgICBwcm90ZWN0ZWQgcGFyZW50V3JhcDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50V3JhcENsYXNzTmFtZSl7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFdyYXAgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLnBhcmVudFdyYXBDbGFzc05hbWV9YClbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRleHRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2lucHV0YClbMF07XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmFqYXhQcm92aWRlciA9IDxBamF4UHJvdmlkZXI+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvdmlkZXJgKVswXTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2lucHV0LWhpZGRlbmApWzBdO1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jb250YWluZXJgKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5CdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fY2xlYW4tYnV0dG9uYClbMF07XG4gICAgICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgc3VwZXIucmVhZHlDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25CbHVyKCk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudFdyYXBDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRXcmFwQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25Gb2N1cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93T3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50V3JhcENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC13cmFwLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCAqL1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBBamF4UHJvdmlkZXIgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1wcm92aWRlci9hamF4LXByb3ZpZGVyJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gtZXMvZGVib3VuY2UnO1xuXG5leHBvcnQgZW51bSBFdmVudHMge1xuICAgIEZFVENISU5HID0gJ2ZldGNoaW5nJyxcbiAgICBGRVRDSEVEID0gJ2ZldGNoZWQnLFxuICAgIENIQU5HRSA9ICdjaGFuZ2UnLFxuICAgIFNFVCA9ICdzZXQnLFxuICAgIFVOU0VUID0gJ3Vuc2V0Jyxcbn1cblxuLyoqXG4gKiBAZXZlbnQgZmV0Y2hpbmcgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gYW4gYWpheCByZXF1ZXN0IGlzIHNlbnQgdG8gdGhlIHNlcnZlci5cbiAqIEBldmVudCBmZXRjaGVkIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIGFuIGFqYXggcmVxdWVzdCBpcyBjbG9zZWQuXG4gKiBAZXZlbnQgY2hhbmdlIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBzZWFyY2ggZmllbGQgaXMgY2hhbmdlZC5cbiAqIEBldmVudCBzZXQgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGVsZW1lbnQgb2YgYW4gYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gaXMgc2VsZWN0ZWQuXG4gKiBAZXZlbnQgdW5zZXQgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGVsZW1lbnQgb2YgYW4gYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gaXMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b2NvbXBsZXRlRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIEFqYXggb3BlcmF0aW9ucy5cbiAgICAgKi9cbiAgICBhamF4UHJvdmlkZXI6IEFqYXhQcm92aWRlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0ZXh0IGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgdGV4dElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgdmFsdWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb250YWlucyBvZiB0aGUgc3VnZ2VzdGlvbnMuXG4gICAgICovXG4gICAgc3VnZ2VzdGlvbnNDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgc3VnZ2VzdGlvbnMgaXRlbXMuXG4gICAgICovXG4gICAgc3VnZ2VzdGlvbkl0ZW1zOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRyaWdnZXIgb2YgdGhlIGZvcm0gY2xlYXJpbmcuXG4gICAgICovXG4gICAgY2xlYW5CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgc2VsZWN0ZWQgc2FnZ2VzdGlvbiBpdGVtLlxuICAgICAqL1xuICAgIGxhc3RTZWxlY3RlZEl0ZW06IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWpheFByb3ZpZGVyID0gPEFqYXhQcm92aWRlcj50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm92aWRlcmApWzBdO1xuICAgICAgICB0aGlzLnRleHRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RleHQtaW5wdXRgKVswXTtcbiAgICAgICAgdGhpcy52YWx1ZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdmFsdWUtaW5wdXRgKVswXTtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWdnZXN0aW9uc2ApWzBdO1xuICAgICAgICB0aGlzLmNsZWFuQnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2NsZWFuLWJ1dHRvbmApWzBdO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Jbml0RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvTG9hZEluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgICBkZWJvdW5jZSgoKSA9PiB0aGlzLm9uSW5wdXQoKSwgdGhpcy5kZWJvdW5jZURlbGF5KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdibHVyJyxcbiAgICAgICAgICAgIGRlYm91bmNlKCgpID0+IHRoaXMub25CbHVyKCksIHRoaXMuZGVib3VuY2VEZWxheSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGV4dElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5vbkZvY3VzKCkpO1xuICAgICAgICB0aGlzLnRleHRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgICAgICBpZiAodGhpcy5jbGVhbkJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5jbGVhbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25DbGVhbkJ1dHRvbkNsaWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGF1dG9Mb2FkSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5sb2FkU3VnZ2VzdGlvbnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGVhbkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFuKCk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPCB0aGlzLm1pbkxldHRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklucHV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLkNIQU5HRSk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPj0gdGhpcy5taW5MZXR0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdWdnZXN0aW9ucygpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dTdWdnZXN0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZVN1Z2dlc3Rpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCB0cmlnZ2VycyB0aGUgY3VzdG9tIGZldGNoaW5nIGFuZCBmZXRjaGVkIGV2ZW50cy5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkU3VnZ2VzdGlvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuRkVUQ0hJTkcpO1xuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgICAgICB0aGlzLmFqYXhQcm92aWRlci5xdWVyeVBhcmFtcy5zZXQodGhpcy5xdWVyeVN0cmluZywgdGhpcy5pbnB1dFRleHQpO1xuICAgICAgICBhd2FpdCB0aGlzLmFqYXhQcm92aWRlci5mZXRjaCgpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uSXRlbXMgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnN1Z2dlc3RlZEl0ZW1DbGFzc05hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLnN1Z2dlc3RlZEl0ZW1TZWxlY3RvciksXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbSA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zWzBdO1xuICAgICAgICB0aGlzLm1hcFN1Z2dlc3Rpb25JdGVtc0V2ZW50cygpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLkZFVENIRUQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBTdWdnZXN0aW9uSXRlbXNFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmZvckVhY2goKGl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkl0ZW1DbGljayhpdGVtKSk7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMub25JdGVtU2VsZWN0ZWQoaXRlbSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JdGVtQ2xpY2soaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHQgPSBpdGVtLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUodGhpcy52YWx1ZUF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLlNFVCwgeyB0ZXh0OiB0aGlzLmlucHV0VGV4dCwgdmFsdWU6IHRoaXMuaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JdGVtU2VsZWN0ZWQoaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoYW5nZVNlbGVjdGVkSXRlbShpdGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNlbGVjdGVkSW5wdXRDbGFzcyk7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkSW5wdXRDbGFzcyk7XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3VnZ2VzdGlvbkl0ZW1zICYmIHRoaXMuaW5wdXRUZXh0Lmxlbmd0aCA8IHRoaXMubWluTGV0dGVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5RG93bkFycm93VXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbktleURvd25BcnJvd0Rvd24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5RG93bkVudGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbktleURvd25BcnJvd1VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsYXN0U2VsZWN0ZWRJdGVtSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5pbmRleE9mKHRoaXMubGFzdFNlbGVjdGVkSXRlbSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRJbmRleCA9IGxhc3RTZWxlY3RlZEl0ZW1JbmRleCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RTdWdnZXN0aW9uSXRlbUluZGV4ID0gdGhpcy5zdWdnZXN0aW9uSXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zW2VsZW1lbnRJbmRleCA8IDAgPyBsYXN0U3VnZ2VzdGlvbkl0ZW1JbmRleCA6IGVsZW1lbnRJbmRleF07XG4gICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0ZWRJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbktleURvd25BcnJvd0Rvd24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3RlZEl0ZW1JbmRleCA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmluZGV4T2YodGhpcy5sYXN0U2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgY29uc3QgZWxlbWVudEluZGV4ID0gbGFzdFNlbGVjdGVkSXRlbUluZGV4ICsgMTtcbiAgICAgICAgY29uc3QgbGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdWdnZXN0aW9uSXRlbXNbZWxlbWVudEluZGV4ID4gbGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXggPyAwIDogZWxlbWVudEluZGV4XTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbS5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgaW5wdXQgdmFsdWUgYW5kIHRoZSB0eXBlZCB0ZXh0LlxuICAgICAqL1xuICAgIGNsZWFuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0VGV4dCA9ICcnO1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjc3MgcXVlcnkgc2VsZWN0b3Igb2YgdGhlIHNlbGVjdGVkIHN1Z2dlc3Rpb24gaXRlbXMuXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdGVkSW5wdXRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuc3VnZ2VzdGVkSXRlbUNsYXNzTmFtZX0tLXNlbGVjdGVkYCB8fCBgJHt0aGlzLnN1Z2dlc3RlZEl0ZW1TZWxlY3Rvcn0tLXNlbGVjdGVkYC5zdWJzdHIoMSk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHlwZWQgdGV4dCBmcm9tIHRoZSBmb3JtIGZpZWxkLlxuICAgICAqL1xuICAgIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dElucHV0LnZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIGlucHV0IHRleHQuXG4gICAgICogQHBhcmFtIHZhbHVlIEEgdHlwZWQgdGV4dCBpbiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICovXG4gICAgc2V0IGlucHV0VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGV4dElucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXR0cmlidXRlIGZyb20gdGhlIGlucHV0IGZvcm0gZmllbGQuXG4gICAgICovXG4gICAgZ2V0IGlucHV0VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVJbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgaW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNzcyBxdWVyeSBzZWxlY3RvciBmb3IgdGhlIGFqYXhQcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGdldCBxdWVyeVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3F1ZXJ5LXN0cmluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGF0dHJpYnV0ZSBuYW1lIGZvciB0aGUgaW5wdXQgZWxlbWVudCBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZUF0dHJpYnV0ZU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZS1hdHRyaWJ1dGUtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNzcyBxdWVyeSBzZWxlY3RvciBvZiB0aGUgc3VnZ2VzdGlvbiBpdGVtcy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBzdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgc3VnZ2VzdGVkSXRlbVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3VnZ2VzdGVkLWl0ZW0tc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCBzdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3VnZ2VzdGVkLWl0ZW0tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSB0aW1lIGRlbGF5IGZvciB0aGUgYmx1ciBhbmQgaW5wdXQgZXZlbnRzLlxuICAgICAqL1xuICAgIGdldCBkZWJvdW5jZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYm91bmNlLWRlbGF5JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBsZXR0ZXJzIHdoaWNoLCB1cG9uIGVudGVyaW5nIGluIGZvcm0gZmllbGQsIGlzIHN1ZmZpY2llbnQgdG8gc2hvdywgaGlkZSBvciBsb2FkIHRoZVxuICAgICAqIHN1Z2dlc3Rpb25zLlxuICAgICAqL1xuICAgIGdldCBtaW5MZXR0ZXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ21pbi1sZXR0ZXJzJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGF1dG8gbG9hZCBvZiBzdWdnZXN0aW9ucyBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGdldCBhdXRvSW5pdEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0by1pbml0Jyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==