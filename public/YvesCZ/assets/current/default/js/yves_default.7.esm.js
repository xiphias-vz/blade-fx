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
/* harmony import */ var ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/autocomplete-form/autocomplete-form */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class AutocompleteFormExtended extends ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "parentWrap", void 0);
  }

  readyCallback() {}

  init() {
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
      super.readyCallback();
    }
  }

  onBlur() {
    super.onBlur();

    if (this.parentWrapClassName) {
      this.hideOverlay();
    }
  }

  onFocus() {
    if (this.parentWrapClassName) {
      this.showOverlay();
    }

    super.onFocus();
  }

  showOverlay() {
    this.parentWrap.classList.add('active');
  }

  hideOverlay() {
    this.parentWrap.classList.remove('active');
  }

  get parentWrapClassName() {
    return this.getAttribute('parent-wrap-class-name');
  }

}

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
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

class AutocompleteForm extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "ajaxProvider", void 0);

    _defineProperty(this, "textInput", void 0);

    _defineProperty(this, "valueInput", void 0);

    _defineProperty(this, "suggestionsContainer", void 0);

    _defineProperty(this, "suggestionItems", void 0);

    _defineProperty(this, "cleanButton", void 0);

    _defineProperty(this, "lastSelectedItem", void 0);
  }

  readyCallback() {
    this.ajaxProvider = this.getElementsByClassName(this.jsName + "__provider")[0];
    this.textInput = this.getElementsByClassName(this.jsName + "__text-input")[0];
    this.valueInput = this.getElementsByClassName(this.jsName + "__value-input")[0];
    this.suggestionsContainer = this.getElementsByClassName(this.jsName + "__suggestions")[0];
    this.cleanButton = this.getElementsByClassName(this.jsName + "__clean-button")[0];

    if (this.autoInitEnabled) {
      this.autoLoadInit();
    }

    this.mapEvents();
  }

  mapEvents() {
    this.textInput.addEventListener('input', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__["default"])(() => this.onInput(), this.debounceDelay));
    this.textInput.addEventListener('blur', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__["default"])(() => this.onBlur(), this.debounceDelay));
    this.textInput.addEventListener('focus', () => this.onFocus());
    this.textInput.addEventListener('keydown', event => this.onKeyDown(event));

    if (this.cleanButton) {
      this.cleanButton.addEventListener('click', () => this.onCleanButtonClick());
    }
  }

  autoLoadInit() {
    this.textInput.focus();
    this.loadSuggestions();
  }

  onCleanButtonClick() {
    this.clean();
    this.dispatchCustomEvent(Events.UNSET);
  }

  onBlur() {
    this.hideSuggestions();
  }

  onFocus() {
    if (this.inputText.length < this.minLetters) {
      return;
    }

    this.showSuggestions();
  }

  onInput() {
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
  }

  showSuggestions() {
    this.suggestionsContainer.classList.remove('is-hidden');
  }

  hideSuggestions() {
    this.suggestionsContainer.classList.add('is-hidden');
  }
  /**
   * Sends a request to the server and triggers the custom fetching and fetched events.
   */


  loadSuggestions() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.dispatchCustomEvent(Events.FETCHING);

      _this.showSuggestions();

      _this.ajaxProvider.queryParams.set(_this.queryString, _this.inputText);

      yield _this.ajaxProvider.fetch();
      /* tslint:disable: deprecation */

      _this.suggestionItems = Array.from(_this.suggestionsContainer.getElementsByClassName(_this.suggestedItemClassName) || _this.suggestionsContainer.querySelectorAll(_this.suggestedItemSelector));
      /* tslint:enable: deprecation */

      _this.lastSelectedItem = _this.suggestionItems[0];

      _this.mapSuggestionItemsEvents();

      _this.dispatchCustomEvent(Events.FETCHED);
    })();
  }

  mapSuggestionItemsEvents() {
    this.suggestionItems.forEach(item => {
      item.addEventListener('click', () => this.onItemClick(item));
      item.addEventListener('mouseover', () => this.onItemSelected(item));
    });
  }

  onItemClick(item) {
    this.inputText = item.textContent.trim();
    this.inputValue = item.getAttribute(this.valueAttributeName);
    this.dispatchCustomEvent(Events.SET, {
      text: this.inputText,
      value: this.inputValue
    });
  }

  onItemSelected(item) {
    this.changeSelectedItem(item);
  }

  changeSelectedItem(item) {
    this.lastSelectedItem.classList.remove(this.selectedInputClass);
    item.classList.add(this.selectedInputClass);
    this.lastSelectedItem = item;
  }

  onKeyDown(event) {
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
  }

  onKeyDownArrowUp() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex - 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex < 0 ? lastSuggestionItemIndex : elementIndex];
    this.changeSelectedItem(item);
  }

  onKeyDownArrowDown() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex + 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex > lastSuggestionItemIndex ? 0 : elementIndex];
    this.changeSelectedItem(item);
  }

  onKeyDownEnter(event) {
    event.preventDefault();
    this.lastSelectedItem.click();
  }
  /**
   * Clears the input value and the typed text.
   */


  clean() {
    this.inputText = '';
    this.inputValue = '';
  }
  /**
   * Gets the css query selector of the selected suggestion items.
   */


  get selectedInputClass() {
    /* tslint:disable: deprecation */
    return this.suggestedItemClassName + "--selected" || false;
    /* tslint:enable: deprecation */
  }
  /**
   * Gets the typed text from the form field.
   */


  get inputText() {
    return this.textInput.value.trim();
  }
  /**
   * Sets an input text.
   * @param value A typed text in the input field.
   */


  set inputText(value) {
    this.textInput.value = value;
  }
  /**
   * Gets the value attribute from the input form field.
   */


  get inputValue() {
    return this.valueInput.value;
  }
  /**
   * Sets the input value.
   */


  set inputValue(value) {
    this.valueInput.value = value;
  }
  /**
   * Gets the css query selector for the ajaxProvider configuration.
   */


  get queryString() {
    return this.getAttribute('query-string');
  }
  /**
   * Gets the value attribute name for the input element configuration.
   */


  get valueAttributeName() {
    return this.getAttribute('value-attribute-name');
  }
  /**
   * Gets the css query selector of the suggestion items.
   *
   * @deprecated Use suggestedItemClassName() instead.
   */


  get suggestedItemSelector() {
    return this.getAttribute('suggested-item-selector');
  }

  get suggestedItemClassName() {
    return this.getAttribute('suggested-item-class-name');
  }
  /**
   * Gets a time delay for the blur and input events.
   */


  get debounceDelay() {
    return Number(this.getAttribute('debounce-delay'));
  }
  /**
   * Gets the number of letters which, upon entering in form field, is sufficient to show, hide or load the
   * suggestions.
   */


  get minLetters() {
    return Number(this.getAttribute('min-letters'));
  }
  /**
   * Gets if the auto load of suggestions is enabled.
   */


  get autoInitEnabled() {
    return this.hasAttribute('auto-init');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYXV0b2NvbXBsZXRlLWZvcm0vYXV0b2NvbXBsZXRlLWZvcm0tZXh0ZW5kZWQudHMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2F1dG9jb21wbGV0ZS1mb3JtL2F1dG9jb21wbGV0ZS1mb3JtLnRzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZUZvcm1FeHRlbmRlZCIsIkF1dG9jb21wbGV0ZUZvcm0iLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInBhcmVudFdyYXBDbGFzc05hbWUiLCJwYXJlbnRXcmFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGV4dElucHV0IiwianNOYW1lIiwiYWpheFByb3ZpZGVyIiwidmFsdWVJbnB1dCIsInN1Z2dlc3Rpb25zQ29udGFpbmVyIiwiY2xlYW5CdXR0b24iLCJtYXBFdmVudHMiLCJvbkJsdXIiLCJoaWRlT3ZlcmxheSIsIm9uRm9jdXMiLCJzaG93T3ZlcmxheSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImdldEF0dHJpYnV0ZSIsIkV2ZW50cyIsIkNvbXBvbmVudCIsImF1dG9Jbml0RW5hYmxlZCIsImF1dG9Mb2FkSW5pdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZWJvdW5jZSIsIm9uSW5wdXQiLCJkZWJvdW5jZURlbGF5IiwiZXZlbnQiLCJvbktleURvd24iLCJvbkNsZWFuQnV0dG9uQ2xpY2siLCJmb2N1cyIsImxvYWRTdWdnZXN0aW9ucyIsImNsZWFuIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIlVOU0VUIiwiaGlkZVN1Z2dlc3Rpb25zIiwiaW5wdXRUZXh0IiwibGVuZ3RoIiwibWluTGV0dGVycyIsInNob3dTdWdnZXN0aW9ucyIsIkNIQU5HRSIsImlucHV0VmFsdWUiLCJGRVRDSElORyIsInF1ZXJ5UGFyYW1zIiwic2V0IiwicXVlcnlTdHJpbmciLCJmZXRjaCIsInN1Z2dlc3Rpb25JdGVtcyIsIkFycmF5IiwiZnJvbSIsInN1Z2dlc3RlZEl0ZW1DbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3VnZ2VzdGVkSXRlbVNlbGVjdG9yIiwibGFzdFNlbGVjdGVkSXRlbSIsIm1hcFN1Z2dlc3Rpb25JdGVtc0V2ZW50cyIsIkZFVENIRUQiLCJmb3JFYWNoIiwiaXRlbSIsIm9uSXRlbUNsaWNrIiwib25JdGVtU2VsZWN0ZWQiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ2YWx1ZUF0dHJpYnV0ZU5hbWUiLCJTRVQiLCJ0ZXh0IiwidmFsdWUiLCJjaGFuZ2VTZWxlY3RlZEl0ZW0iLCJzZWxlY3RlZElucHV0Q2xhc3MiLCJrZXkiLCJvbktleURvd25BcnJvd1VwIiwib25LZXlEb3duQXJyb3dEb3duIiwib25LZXlEb3duRW50ZXIiLCJsYXN0U2VsZWN0ZWRJdGVtSW5kZXgiLCJpbmRleE9mIiwiZWxlbWVudEluZGV4IiwibGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsImNsaWNrIiwiTnVtYmVyIiwiaGFzQXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdlLE1BQU1BLHdCQUFOLFNBQXVDQyx1R0FBdkMsQ0FBd0Q7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBR3pEQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFFBQUksS0FBS0MsbUJBQVQsRUFBNkI7QUFDekIsV0FBS0MsVUFBTCxHQUErQkMsUUFBUSxDQUFDQyxzQkFBVCxNQUFtQyxLQUFLSCxtQkFBeEMsRUFBK0QsQ0FBL0QsQ0FBL0I7QUFDSDs7QUFFRCxTQUFLSSxTQUFMLEdBQW1DLEtBQUtELHNCQUFMLENBQStCLEtBQUtFLE1BQXBDLGNBQXFELENBQXJELENBQW5DOztB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QUFkLEVBQTZCO0FBQ3pCLFNBQUs3RCxTQUFMLENBQWU2RCxLQUFmLEdBQXVCQSxLQUF2QjtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSXhCLFVBQUosR0FBeUI7QUFDckIsV0FBTyxLQUFLbEMsVUFBTCxDQUFnQjBELEtBQXZCO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJeEIsVUFBSixDQUFld0IsS0FBZixFQUE4QjtBQUMxQixTQUFLMUQsVUFBTCxDQUFnQjBELEtBQWhCLEdBQXdCQSxLQUF4QjtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSXBCLFdBQUosR0FBMEI7QUFDdEIsV0FBTyxLQUFLM0IsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJNEMsa0JBQUosR0FBaUM7QUFDN0IsV0FBTyxLQUFLNUMsWUFBTCxDQUFrQixzQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxNQUFJa0MscUJBQUosR0FBb0M7QUFDaEMsV0FBTyxLQUFLbEMsWUFBTCxDQUFrQix5QkFBbEIsQ0FBUDtBQUNIOztBQUNELE1BQWNnQyxzQkFBZCxHQUErQztBQUMzQyxXQUFPLEtBQUtoQyxZQUFMLENBQWtCLDJCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJUSxhQUFKLEdBQTRCO0FBQ3hCLFdBQU9vRCxNQUFNLENBQUMsS0FBSzVELFlBQUwsQ0FBa0IsZ0JBQWxCLENBQUQsQ0FBYjtBQUNIO0FBRUQ7Ozs7OztBQUlBLE1BQUlvQixVQUFKLEdBQXlCO0FBQ3JCLFdBQU93QyxNQUFNLENBQUMsS0FBSzVELFlBQUwsQ0FBa0IsYUFBbEIsQ0FBRCxDQUFiO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRyxlQUFKLEdBQStCO0FBQzNCLFdBQU8sS0FBSzBELFlBQUwsQ0FBa0IsV0FBbEIsQ0FBUDtBQUNIOztBQTNSbUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC43LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXRvY29tcGxldGVGb3JtIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9hdXRvY29tcGxldGUtZm9ybS9hdXRvY29tcGxldGUtZm9ybSc7XG5pbXBvcnQgQWpheFByb3ZpZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LXByb3ZpZGVyL2FqYXgtcHJvdmlkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvY29tcGxldGVGb3JtRXh0ZW5kZWQgZXh0ZW5kcyBBdXRvY29tcGxldGVGb3JtIHtcbiAgICBwcm90ZWN0ZWQgcGFyZW50V3JhcDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50V3JhcENsYXNzTmFtZSl7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFdyYXAgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLnBhcmVudFdyYXBDbGFzc05hbWV9YClbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRleHRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2lucHV0YClbMF07XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmFqYXhQcm92aWRlciA9IDxBamF4UHJvdmlkZXI+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvdmlkZXJgKVswXTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2lucHV0LWhpZGRlbmApWzBdO1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jb250YWluZXJgKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5CdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fY2xlYW4tYnV0dG9uYClbMF07XG4gICAgICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgc3VwZXIucmVhZHlDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25CbHVyKCk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudFdyYXBDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRXcmFwQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25Gb2N1cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93T3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50V3JhcENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC13cmFwLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCAqL1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBBamF4UHJvdmlkZXIgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1wcm92aWRlci9hamF4LXByb3ZpZGVyJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gtZXMvZGVib3VuY2UnO1xuXG5leHBvcnQgZW51bSBFdmVudHMge1xuICAgIEZFVENISU5HID0gJ2ZldGNoaW5nJyxcbiAgICBGRVRDSEVEID0gJ2ZldGNoZWQnLFxuICAgIENIQU5HRSA9ICdjaGFuZ2UnLFxuICAgIFNFVCA9ICdzZXQnLFxuICAgIFVOU0VUID0gJ3Vuc2V0Jyxcbn1cblxuLyoqXG4gKiBAZXZlbnQgZmV0Y2hpbmcgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gYW4gYWpheCByZXF1ZXN0IGlzIHNlbnQgdG8gdGhlIHNlcnZlci5cbiAqIEBldmVudCBmZXRjaGVkIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIGFuIGFqYXggcmVxdWVzdCBpcyBjbG9zZWQuXG4gKiBAZXZlbnQgY2hhbmdlIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBzZWFyY2ggZmllbGQgaXMgY2hhbmdlZC5cbiAqIEBldmVudCBzZXQgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGVsZW1lbnQgb2YgYW4gYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gaXMgc2VsZWN0ZWQuXG4gKiBAZXZlbnQgdW5zZXQgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGVsZW1lbnQgb2YgYW4gYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb24gaXMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b2NvbXBsZXRlRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIEFqYXggb3BlcmF0aW9ucy5cbiAgICAgKi9cbiAgICBhamF4UHJvdmlkZXI6IEFqYXhQcm92aWRlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0ZXh0IGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgdGV4dElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgdmFsdWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb250YWlucyBvZiB0aGUgc3VnZ2VzdGlvbnMuXG4gICAgICovXG4gICAgc3VnZ2VzdGlvbnNDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgc3VnZ2VzdGlvbnMgaXRlbXMuXG4gICAgICovXG4gICAgc3VnZ2VzdGlvbkl0ZW1zOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRyaWdnZXIgb2YgdGhlIGZvcm0gY2xlYXJpbmcuXG4gICAgICovXG4gICAgY2xlYW5CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxhc3Qgc2VsZWN0ZWQgc2FnZ2VzdGlvbiBpdGVtLlxuICAgICAqL1xuICAgIGxhc3RTZWxlY3RlZEl0ZW06IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWpheFByb3ZpZGVyID0gPEFqYXhQcm92aWRlcj50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm92aWRlcmApWzBdO1xuICAgICAgICB0aGlzLnRleHRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RleHQtaW5wdXRgKVswXTtcbiAgICAgICAgdGhpcy52YWx1ZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdmFsdWUtaW5wdXRgKVswXTtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWdnZXN0aW9uc2ApWzBdO1xuICAgICAgICB0aGlzLmNsZWFuQnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2NsZWFuLWJ1dHRvbmApWzBdO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Jbml0RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvTG9hZEluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgICBkZWJvdW5jZSgoKSA9PiB0aGlzLm9uSW5wdXQoKSwgdGhpcy5kZWJvdW5jZURlbGF5KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdibHVyJyxcbiAgICAgICAgICAgIGRlYm91bmNlKCgpID0+IHRoaXMub25CbHVyKCksIHRoaXMuZGVib3VuY2VEZWxheSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGV4dElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5vbkZvY3VzKCkpO1xuICAgICAgICB0aGlzLnRleHRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgICAgICBpZiAodGhpcy5jbGVhbkJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5jbGVhbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25DbGVhbkJ1dHRvbkNsaWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGF1dG9Mb2FkSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5sb2FkU3VnZ2VzdGlvbnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGVhbkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFuKCk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPCB0aGlzLm1pbkxldHRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklucHV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLkNIQU5HRSk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPj0gdGhpcy5taW5MZXR0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdWdnZXN0aW9ucygpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dTdWdnZXN0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZVN1Z2dlc3Rpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCB0cmlnZ2VycyB0aGUgY3VzdG9tIGZldGNoaW5nIGFuZCBmZXRjaGVkIGV2ZW50cy5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkU3VnZ2VzdGlvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuRkVUQ0hJTkcpO1xuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgICAgICB0aGlzLmFqYXhQcm92aWRlci5xdWVyeVBhcmFtcy5zZXQodGhpcy5xdWVyeVN0cmluZywgdGhpcy5pbnB1dFRleHQpO1xuICAgICAgICBhd2FpdCB0aGlzLmFqYXhQcm92aWRlci5mZXRjaCgpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uSXRlbXMgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnN1Z2dlc3RlZEl0ZW1DbGFzc05hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLnN1Z2dlc3RlZEl0ZW1TZWxlY3RvciksXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbSA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zWzBdO1xuICAgICAgICB0aGlzLm1hcFN1Z2dlc3Rpb25JdGVtc0V2ZW50cygpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLkZFVENIRUQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBTdWdnZXN0aW9uSXRlbXNFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmZvckVhY2goKGl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkl0ZW1DbGljayhpdGVtKSk7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMub25JdGVtU2VsZWN0ZWQoaXRlbSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JdGVtQ2xpY2soaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHQgPSBpdGVtLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUodGhpcy52YWx1ZUF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLlNFVCwgeyB0ZXh0OiB0aGlzLmlucHV0VGV4dCwgdmFsdWU6IHRoaXMuaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JdGVtU2VsZWN0ZWQoaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoYW5nZVNlbGVjdGVkSXRlbShpdGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNlbGVjdGVkSW5wdXRDbGFzcyk7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkSW5wdXRDbGFzcyk7XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3VnZ2VzdGlvbkl0ZW1zICYmIHRoaXMuaW5wdXRUZXh0Lmxlbmd0aCA8IHRoaXMubWluTGV0dGVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5RG93bkFycm93VXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbktleURvd25BcnJvd0Rvd24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5RG93bkVudGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbktleURvd25BcnJvd1VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsYXN0U2VsZWN0ZWRJdGVtSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5pbmRleE9mKHRoaXMubGFzdFNlbGVjdGVkSXRlbSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRJbmRleCA9IGxhc3RTZWxlY3RlZEl0ZW1JbmRleCAtIDE7XG4gICAgICAgIGNvbnN0IGxhc3RTdWdnZXN0aW9uSXRlbUluZGV4ID0gdGhpcy5zdWdnZXN0aW9uSXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zW2VsZW1lbnRJbmRleCA8IDAgPyBsYXN0U3VnZ2VzdGlvbkl0ZW1JbmRleCA6IGVsZW1lbnRJbmRleF07XG4gICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0ZWRJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbktleURvd25BcnJvd0Rvd24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3RlZEl0ZW1JbmRleCA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmluZGV4T2YodGhpcy5sYXN0U2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgY29uc3QgZWxlbWVudEluZGV4ID0gbGFzdFNlbGVjdGVkSXRlbUluZGV4ICsgMTtcbiAgICAgICAgY29uc3QgbGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdWdnZXN0aW9uSXRlbXNbZWxlbWVudEluZGV4ID4gbGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXggPyAwIDogZWxlbWVudEluZGV4XTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbS5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgaW5wdXQgdmFsdWUgYW5kIHRoZSB0eXBlZCB0ZXh0LlxuICAgICAqL1xuICAgIGNsZWFuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0VGV4dCA9ICcnO1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjc3MgcXVlcnkgc2VsZWN0b3Igb2YgdGhlIHNlbGVjdGVkIHN1Z2dlc3Rpb24gaXRlbXMuXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdGVkSW5wdXRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuc3VnZ2VzdGVkSXRlbUNsYXNzTmFtZX0tLXNlbGVjdGVkYCB8fCBgJHt0aGlzLnN1Z2dlc3RlZEl0ZW1TZWxlY3Rvcn0tLXNlbGVjdGVkYC5zdWJzdHIoMSk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHlwZWQgdGV4dCBmcm9tIHRoZSBmb3JtIGZpZWxkLlxuICAgICAqL1xuICAgIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dElucHV0LnZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIGlucHV0IHRleHQuXG4gICAgICogQHBhcmFtIHZhbHVlIEEgdHlwZWQgdGV4dCBpbiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICovXG4gICAgc2V0IGlucHV0VGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGV4dElucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXR0cmlidXRlIGZyb20gdGhlIGlucHV0IGZvcm0gZmllbGQuXG4gICAgICovXG4gICAgZ2V0IGlucHV0VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVJbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgaW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNzcyBxdWVyeSBzZWxlY3RvciBmb3IgdGhlIGFqYXhQcm92aWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGdldCBxdWVyeVN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3F1ZXJ5LXN0cmluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGF0dHJpYnV0ZSBuYW1lIGZvciB0aGUgaW5wdXQgZWxlbWVudCBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZUF0dHJpYnV0ZU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZS1hdHRyaWJ1dGUtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNzcyBxdWVyeSBzZWxlY3RvciBvZiB0aGUgc3VnZ2VzdGlvbiBpdGVtcy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBzdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgc3VnZ2VzdGVkSXRlbVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3VnZ2VzdGVkLWl0ZW0tc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCBzdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3VnZ2VzdGVkLWl0ZW0tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSB0aW1lIGRlbGF5IGZvciB0aGUgYmx1ciBhbmQgaW5wdXQgZXZlbnRzLlxuICAgICAqL1xuICAgIGdldCBkZWJvdW5jZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYm91bmNlLWRlbGF5JykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBsZXR0ZXJzIHdoaWNoLCB1cG9uIGVudGVyaW5nIGluIGZvcm0gZmllbGQsIGlzIHN1ZmZpY2llbnQgdG8gc2hvdywgaGlkZSBvciBsb2FkIHRoZVxuICAgICAqIHN1Z2dlc3Rpb25zLlxuICAgICAqL1xuICAgIGdldCBtaW5MZXR0ZXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ21pbi1sZXR0ZXJzJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGF1dG8gbG9hZCBvZiBzdWdnZXN0aW9ucyBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGdldCBhdXRvSW5pdEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0by1pbml0Jyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==