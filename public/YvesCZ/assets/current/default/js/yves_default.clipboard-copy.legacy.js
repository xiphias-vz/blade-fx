(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["clipboard-copy"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClipboardCopy; });
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


var EVENT_COPY = 'copyToClipboard';
/**
 * @event copyToClipboard An event emitted when the component performs a copy.
 */

var ClipboardCopy = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ClipboardCopy, _Component);

  var _super = _createSuper(ClipboardCopy);

  function ClipboardCopy() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "target", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "trigger", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "successCopyMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "errorCopyMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "durationTimeoutId", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "defaultDuration", 5000);

    return _this;
  }

  var _proto = ClipboardCopy.prototype;

  _proto.readyCallback = function readyCallback() {
    /* tslint:disable: deprecation */
    this.trigger = this.triggerClassName ? document.getElementsByClassName(this.triggerClassName)[0] : document.querySelector(this.triggerSelector);
    this.target = this.targetClassName ? document.getElementsByClassName(this.targetClassName)[0] : document.querySelector(this.targetSelector);
    /* tslint:enable: deprecation */

    this.successCopyMessage = this.getElementsByClassName(this.jsName + "__success-message")[0];
    this.errorCopyMessage = this.getElementsByClassName(this.jsName + "__error-message")[0];
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.trigger.addEventListener('click', function (event) {
      return _this2.onClick(event);
    });
  };

  _proto.onClick = function onClick(event) {
    this.copyToClipboard();
  }
  /**
   * Performs the copy to the clipboard and tells the component to show the message.
   */
  ;

  _proto.copyToClipboard = function copyToClipboard() {
    if (!this.isCopyCommandSupported) {
      this.showMessage(this.errorCopyMessage, this.defaultDuration);
      return;
    }

    this.target.select();
    document.execCommand('copy');
    this.showMessage(this.successCopyMessage, this.defaultDuration);
    this.dispatchCustomEvent(EVENT_COPY);
  }
  /**
   * Shows the message during the time set.
   * @param message A HTMLElement which contains the text message.
   * @param duration A number value which defines the period of time for which the message is shown.
   */
  ;

  _proto.showMessage = function showMessage(message, duration) {
    var _this3 = this;

    message.classList.remove(this.hideClassName);
    this.durationTimeoutId = window.setTimeout(function () {
      return _this3.hideMessage(message);
    }, duration);
  }
  /**
   * Hides the message.
   * @param message A HTMLElement which contains the text message.
   */
  ;

  _proto.hideMessage = function hideMessage(message) {
    clearTimeout(this.durationTimeoutId);
    message.classList.add(this.hideClassName);
  }
  /**
   * Gets a css query selector to address the html element that will trigger the copy to clipboard.
   *
   * @deprecated Use triggerClassName() instead.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ClipboardCopy, [{
    key: "triggerSelector",
    get: function get() {
      return this.getAttribute('trigger-selector');
    }
  }, {
    key: "triggerClassName",
    get: function get() {
      return this.getAttribute('trigger-class-name');
    }
    /**
     * Gets a css query selector to address the html element containing the text to copy.
     *
     * @deprecated Use targetClassName() instead.
     */

  }, {
    key: "targetSelector",
    get: function get() {
      return this.getAttribute('target-selector');
    }
  }, {
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
    /**
     * Gets if a browser supports the automatically copy to clipboard feature.
     */

  }, {
    key: "isCopyCommandSupported",
    get: function get() {
      return document.queryCommandSupported('copy');
    }
    /**
     * Gets a css class name for toggling an element.
     */

  }, {
    key: "hideClassName",
    get: function get() {
      return this.getAttribute('class-to-toggle');
    }
  }]);

  return ClipboardCopy;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY2xpcGJvYXJkLWNvcHkvY2xpcGJvYXJkLWNvcHkudHMiXSwibmFtZXMiOlsiRVZFTlRfQ09QWSIsIkNsaXBib2FyZENvcHkiLCJyZWFkeUNhbGxiYWNrIiwidHJpZ2dlciIsInRyaWdnZXJDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yIiwidHJpZ2dlclNlbGVjdG9yIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NOYW1lIiwidGFyZ2V0U2VsZWN0b3IiLCJzdWNjZXNzQ29weU1lc3NhZ2UiLCJqc05hbWUiLCJlcnJvckNvcHlNZXNzYWdlIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25DbGljayIsImNvcHlUb0NsaXBib2FyZCIsImlzQ29weUNvbW1hbmRTdXBwb3J0ZWQiLCJzaG93TWVzc2FnZSIsImRlZmF1bHREdXJhdGlvbiIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIm1lc3NhZ2UiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVDbGFzc05hbWUiLCJkdXJhdGlvblRpbWVvdXRJZCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJoaWRlTWVzc2FnZSIsImNsZWFyVGltZW91dCIsImFkZCIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxVQUFVLEdBQUcsaUJBQW5CO0FBRUE7Ozs7SUFHcUJDLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnTUFVa0IsSTs7Ozs7OztTQUV6QkMsYSxHQUFWLHlCQUFnQztBQUM1QjtBQUNBLFNBQUtDLE9BQUwsR0FDSyxLQUFLQyxnQkFBTCxHQUNLQyxRQUFRLENBQUNDLHNCQUFULENBQWdDLEtBQUtGLGdCQUFyQyxFQUF1RCxDQUF2RCxDQURMLEdBRUtDLFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixLQUFLQyxlQUE1QixDQUhWO0FBS0EsU0FBS0MsTUFBTCxHQUNLLEtBQUtDLGVBQUwsR0FDS0wsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLSSxlQUFyQyxFQUFzRCxDQUF0RCxDQURMLEdBRUtMLFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixLQUFLSSxjQUE1QixDQUhWO0FBS0E7O0FBQ0EsU0FBS0Msa0JBQUwsR0FBdUMsS0FBS04sc0JBQUwsQ0FBK0IsS0FBS08sTUFBcEMsd0JBQStELENBQS9ELENBQXZDO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBcUMsS0FBS1Isc0JBQUwsQ0FBK0IsS0FBS08sTUFBcEMsc0JBQTZELENBQTdELENBQXJDO0FBQ0EsU0FBS0UsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1osT0FBTCxDQUFhYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFDQyxLQUFEO0FBQUEsYUFBa0IsTUFBSSxDQUFDQyxPQUFMLENBQWFELEtBQWIsQ0FBbEI7QUFBQSxLQUF2QztBQUNILEc7O1NBRVNDLE8sR0FBVixpQkFBa0JELEtBQWxCLEVBQXNDO0FBQ2xDLFNBQUtFLGVBQUw7QUFDSDtBQUVEOzs7OztTQUdBQSxlLEdBQUEsMkJBQXdCO0FBQ3BCLFFBQUksQ0FBQyxLQUFLQyxzQkFBVixFQUFrQztBQUM5QixXQUFLQyxXQUFMLENBQWlCLEtBQUtQLGdCQUF0QixFQUF3QyxLQUFLUSxlQUE3QztBQUVBO0FBQ0g7O0FBRUQsU0FBS2IsTUFBTCxDQUFZYyxNQUFaO0FBQ0FsQixZQUFRLENBQUNtQixXQUFULENBQXFCLE1BQXJCO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQixLQUFLVCxrQkFBdEIsRUFBMEMsS0FBS1UsZUFBL0M7QUFDQSxTQUFLRyxtQkFBTCxDQUF5QnpCLFVBQXpCO0FBQ0g7QUFFRDs7Ozs7OztTQUtBcUIsVyxHQUFBLHFCQUFZSyxPQUFaLEVBQWtDQyxRQUFsQyxFQUEwRDtBQUFBOztBQUN0REQsV0FBTyxDQUFDRSxTQUFSLENBQWtCQyxNQUFsQixDQUF5QixLQUFLQyxhQUE5QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQyxNQUFNLENBQUNDLFVBQVAsQ0FBa0I7QUFBQSxhQUFNLE1BQUksQ0FBQ0MsV0FBTCxDQUFpQlIsT0FBakIsQ0FBTjtBQUFBLEtBQWxCLEVBQW1EQyxRQUFuRCxDQUF6QjtBQUNIO0FBRUQ7Ozs7OztTQUlBTyxXLEdBQUEscUJBQVlSLE9BQVosRUFBd0M7QUFDcENTLGdCQUFZLENBQUMsS0FBS0osaUJBQU4sQ0FBWjtBQUNBTCxXQUFPLENBQUNFLFNBQVIsQ0FBa0JRLEdBQWxCLENBQXNCLEtBQUtOLGFBQTNCO0FBQ0g7QUFFRDs7Ozs7Ozs7O3dCQUs4QjtBQUMxQixhQUFPLEtBQUtPLFlBQUwsQ0FBa0Isa0JBQWxCLENBQVA7QUFDSDs7O3dCQUN3QztBQUNyQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozt3QkFLNkI7QUFDekIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7Ozt3QkFDdUM7QUFDcEMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUdzQztBQUNsQyxhQUFPaEMsUUFBUSxDQUFDaUMscUJBQVQsQ0FBK0IsTUFBL0IsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozt3QkFHNEI7QUFDeEIsYUFBTyxLQUFLRCxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7Ozs7RUE3R3NDRSwrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5jbGlwYm9hcmQtY29weS5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgRVZFTlRfQ09QWSA9ICdjb3B5VG9DbGlwYm9hcmQnO1xuXG4vKipcbiAqIEBldmVudCBjb3B5VG9DbGlwYm9hcmQgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgcGVyZm9ybXMgYSBjb3B5LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlwYm9hcmRDb3B5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHN1Y2Nlc3NDb3B5TWVzc2FnZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGVycm9yQ29weU1lc3NhZ2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBkdXJhdGlvblRpbWVvdXRJZDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBtZXNzYWdlIHNob3cgZHVyYXRpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgZGVmYXVsdER1cmF0aW9uOiBudW1iZXIgPSA1MDAwO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOiBkZXByZWNhdGlvbiAqL1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgKHRoaXMudHJpZ2dlckNsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpWzBdXG4gICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudHJpZ2dlclNlbGVjdG9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFxuICAgICAgICAgICAgKHRoaXMudGFyZ2V0Q2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldFNlbGVjdG9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy5zdWNjZXNzQ29weU1lc3NhZ2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc3VjY2Vzcy1tZXNzYWdlYClbMF07XG4gICAgICAgIHRoaXMuZXJyb3JDb3B5TWVzc2FnZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19lcnJvci1tZXNzYWdlYClbMF07XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkNsaWNrKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNvcHkgdG8gdGhlIGNsaXBib2FyZCBhbmQgdGVsbHMgdGhlIGNvbXBvbmVudCB0byBzaG93IHRoZSBtZXNzYWdlLlxuICAgICAqL1xuICAgIGNvcHlUb0NsaXBib2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29weUNvbW1hbmRTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UodGhpcy5lcnJvckNvcHlNZXNzYWdlLCB0aGlzLmRlZmF1bHREdXJhdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0LnNlbGVjdCgpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKHRoaXMuc3VjY2Vzc0NvcHlNZXNzYWdlLCB0aGlzLmRlZmF1bHREdXJhdGlvbik7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9DT1BZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgbWVzc2FnZSBkdXJpbmcgdGhlIHRpbWUgc2V0LlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIEEgSFRNTEVsZW1lbnQgd2hpY2ggY29udGFpbnMgdGhlIHRleHQgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gZHVyYXRpb24gQSBudW1iZXIgdmFsdWUgd2hpY2ggZGVmaW5lcyB0aGUgcGVyaW9kIG9mIHRpbWUgZm9yIHdoaWNoIHRoZSBtZXNzYWdlIGlzIHNob3duLlxuICAgICAqL1xuICAgIHNob3dNZXNzYWdlKG1lc3NhZ2U6IEhUTUxFbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmhpZGVDbGFzc05hbWUpO1xuICAgICAgICB0aGlzLmR1cmF0aW9uVGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlTWVzc2FnZShtZXNzYWdlKSwgZHVyYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIEEgSFRNTEVsZW1lbnQgd2hpY2ggY29udGFpbnMgdGhlIHRleHQgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBoaWRlTWVzc2FnZShtZXNzYWdlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kdXJhdGlvblRpbWVvdXRJZCk7XG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCh0aGlzLmhpZGVDbGFzc05hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBjc3MgcXVlcnkgc2VsZWN0b3IgdG8gYWRkcmVzcyB0aGUgaHRtbCBlbGVtZW50IHRoYXQgd2lsbCB0cmlnZ2VyIHRoZSBjb3B5IHRvIGNsaXBib2FyZC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0cmlnZ2VyQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY3NzIHF1ZXJ5IHNlbGVjdG9yIHRvIGFkZHJlc3MgdGhlIGh0bWwgZWxlbWVudCBjb250YWluaW5nIHRoZSB0ZXh0IHRvIGNvcHkuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0Q2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgYSBicm93c2VyIHN1cHBvcnRzIHRoZSBhdXRvbWF0aWNhbGx5IGNvcHkgdG8gY2xpcGJvYXJkIGZlYXR1cmUuXG4gICAgICovXG4gICAgZ2V0IGlzQ29weUNvbW1hbmRTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoJ2NvcHknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY3NzIGNsYXNzIG5hbWUgZm9yIHRvZ2dsaW5nIGFuIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGhpZGVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9