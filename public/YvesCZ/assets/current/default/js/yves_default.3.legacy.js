(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[3],{

/***/ "./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowLocationApplicator; });
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
/* harmony import */ var CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! CatalogPage/components/molecules/window-location-applicator/window-location-applicator */ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var WindowLocationApplicator = /*#__PURE__*/function (_WindowLocationApplic) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(WindowLocationApplicator, _WindowLocationApplic);

  var _super = _createSuper(WindowLocationApplicator);

  function WindowLocationApplicator() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _WindowLocationApplic.call.apply(_WindowLocationApplic, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "sortTriggers", void 0);

    return _this;
  }

  var _proto = WindowLocationApplicator.prototype;

  _proto.init = function init() {
    this.sortTriggers = Array.from(document.getElementsByClassName(this.sortTriggerClassName));

    _WindowLocationApplic.prototype.init.call(this);
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.sortTriggers.forEach(function (element) {
      element.addEventListener('change', function (event) {
        return _this2.onTriggerEvent(event);
      });
    });

    _WindowLocationApplic.prototype.mapEvents.call(this);
  };

  _proto.getQueryString = function getQueryString(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var formData = new FormData(this.form);
    var data = new URLSearchParams(formData);
    formData.forEach(function (value, key) {
      if (value.length) {
        return;
      }

      data.delete(key);
    });
    var handledData = data.toString();
    this.setWindowLocation(categoryUrl, handledData);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(WindowLocationApplicator, [{
    key: "sortTriggerClassName",
    get: function get() {
      return this.getAttribute('sort-trigger-class-name');
    }
  }]);

  return WindowLocationApplicator;
}(CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowLocationApplicator; });
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



var WindowLocationApplicator = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(WindowLocationApplicator, _Component);

  var _super = _createSuper(WindowLocationApplicator);

  function WindowLocationApplicator() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "form", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    return _this;
  }

  var _proto = WindowLocationApplicator.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.form = document.getElementsByClassName(this.formClassName)[0];
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggers.forEach(function (element) {
      element.addEventListener('click', function (event) {
        return _this2.onTriggerEvent(event);
      });
    });
  };

  _proto.onTriggerEvent = function onTriggerEvent(event) {
    var categoryUrl = event.currentTarget.getAttribute('data-url');
    /* tslint:disable: no-unbound-method */

    var isFormData = typeof FormData !== 'undefined' && typeof FormData.prototype.get !== 'undefined';
    var isURLSearchParams = typeof URLSearchParams !== 'undefined' && typeof URLSearchParams.prototype.get !== 'undefined';
    /* tslint:enable: no-unbound-method */

    if (isFormData && isURLSearchParams) {
      this.getQueryString(categoryUrl ? categoryUrl : '');
      return;
    }

    this.getQueryStringAlternative(categoryUrl ? categoryUrl : '');
  };

  _proto.getQueryString = function getQueryString(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var formData = new FormData(this.form);
    var data = new URLSearchParams(formData);
    formData.forEach(function (value, key) {
      if (value.length) {
        return;
      }

      data.delete(key);
    });
    this.setWindowLocation(categoryUrl, data.toString());
  };

  _proto.getQueryStringAlternative = function getQueryStringAlternative(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var inputFields = Array.from(this.form.getElementsByTagName('input'));
    var selectFields = Array.from(this.form.getElementsByTagName('select'));
    var filteredInputFields = inputFields.filter(function (input) {
      return (input.checked || input.type === 'number' || input.type === 'hidden') && !input.disabled;
    });
    var formFields = [].concat(filteredInputFields, selectFields);
    var data = formFields.reduce(function (accumulator, field) {
      if (field.name && field.value) {
        accumulator += "&" + field.name + "=" + field.value;
      }

      return accumulator;
    }, '').slice(1);
    this.setWindowLocation(categoryUrl, encodeURI(data));
  };

  _proto.setWindowLocation = function setWindowLocation(categoryUrl, data) {
    window.location.href = categoryUrl + "?" + data;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(WindowLocationApplicator, [{
    key: "formClassName",
    get: function get() {
      return this.getAttribute('form-class-name');
    }
  }, {
    key: "triggerClassName",
    get: function get() {
      return this.getAttribute('trigger-class-name');
    }
  }]);

  return WindowLocationApplicator;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ2F0YWxvZ1BhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy93aW5kb3ctbG9jYXRpb24tYXBwbGljYXRvci93aW5kb3ctbG9jYXRpb24tYXBwbGljYXRvci50cyIsIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NhdGFsb2ctcGFnZS9zcmMvU3ByeWtlclNob3AvWXZlcy9DYXRhbG9nUGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yLnRzIl0sIm5hbWVzIjpbIldpbmRvd0xvY2F0aW9uQXBwbGljYXRvciIsImluaXQiLCJzb3J0VHJpZ2dlcnMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzb3J0VHJpZ2dlckNsYXNzTmFtZSIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25UcmlnZ2VyRXZlbnQiLCJnZXRRdWVyeVN0cmluZyIsImNhdGVnb3J5VXJsIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJmb3JtIiwiZGF0YSIsIlVSTFNlYXJjaFBhcmFtcyIsInZhbHVlIiwia2V5IiwibGVuZ3RoIiwiZGVsZXRlIiwiaGFuZGxlZERhdGEiLCJ0b1N0cmluZyIsInNldFdpbmRvd0xvY2F0aW9uIiwiZ2V0QXR0cmlidXRlIiwiV2luZG93TG9jYXRpb25BcHBsaWNhdG9yQ29yZSIsInJlYWR5Q2FsbGJhY2siLCJmb3JtQ2xhc3NOYW1lIiwidHJpZ2dlcnMiLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwiY3VycmVudFRhcmdldCIsImlzRm9ybURhdGEiLCJwcm90b3R5cGUiLCJnZXQiLCJpc1VSTFNlYXJjaFBhcmFtcyIsImdldFF1ZXJ5U3RyaW5nQWx0ZXJuYXRpdmUiLCJpbnB1dEZpZWxkcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic2VsZWN0RmllbGRzIiwiZmlsdGVyZWRJbnB1dEZpZWxkcyIsImZpbHRlciIsImlucHV0IiwiY2hlY2tlZCIsInR5cGUiLCJkaXNhYmxlZCIsImZvcm1GaWVsZHMiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImZpZWxkIiwibmFtZSIsInNsaWNlIiwiZW5jb2RlVVJJIiwiaHJlZiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBR1BDLEksR0FBVixnQkFBdUI7QUFDbkIsU0FBS0MsWUFBTCxHQUF5Q0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0Msb0JBQXJDLENBQVgsQ0FBekM7O0FBRUEsb0NBQU1OLElBQU47QUFDSCxHOztTQUVTTyxTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFNBQUtOLFlBQUwsQ0FBa0JPLE9BQWxCLENBQTBCLFVBQUNDLE9BQUQsRUFBZ0M7QUFDdERBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUMsVUFBQ0MsS0FBRDtBQUFBLGVBQWtCLE1BQUksQ0FBQ0MsY0FBTCxDQUFvQkQsS0FBcEIsQ0FBbEI7QUFBQSxPQUFuQztBQUNILEtBRkQ7O0FBSUEsb0NBQU1KLFNBQU47QUFDSCxHOztTQU1TTSxjLEdBQVYsd0JBQXlCQyxXQUF6QixFQUErRTtBQUFBLFFBQXREQSxXQUFzRDtBQUF0REEsaUJBQXNELEdBQWhDQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQWdCO0FBQUE7O0FBQzNFLFFBQU1DLFFBQVEsR0FBRyxJQUFJQyxRQUFKLENBQWEsS0FBS0MsSUFBbEIsQ0FBakI7QUFDQSxRQUFNQyxJQUFJLEdBQUcsSUFBSUMsZUFBSixDQUFxQ0osUUFBckMs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Q2pFTixVQUFNLENBQUNDLFFBQVAsQ0FBZ0IwQyxJQUFoQixHQUEwQjVDLFdBQTFCLFNBQXlDTyxJQUF6QztBQUNILEc7Ozs7d0JBRXFDO0FBQ2xDLGFBQU8sS0FBS1MsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRXdDO0FBQ3JDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7O0VBbEZpRDZCLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdpbmRvd0xvY2F0aW9uQXBwbGljYXRvckNvcmUgZnJvbSAnQ2F0YWxvZ1BhZ2UvY29tcG9uZW50cy9tb2xlY3VsZXMvd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3Ivd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3IgZXh0ZW5kcyBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3JDb3JlIHtcbiAgICBwcm90ZWN0ZWQgc29ydFRyaWdnZXJzOiBIVE1MU2VsZWN0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc29ydFRyaWdnZXJzID0gPEhUTUxTZWxlY3RFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc29ydFRyaWdnZXJDbGFzc05hbWUpKTtcblxuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zb3J0VHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJFdmVudChldmVudCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlci5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHNvcnRUcmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc29ydC10cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0UXVlcnlTdHJpbmcoY2F0ZWdvcnlVcmw6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZvcm0pO1xuICAgICAgICBjb25zdCBkYXRhID0gbmV3IFVSTFNlYXJjaFBhcmFtcyg8VVJMU2VhcmNoUGFyYW1zPmZvcm1EYXRhKTtcbiAgICAgICAgZm9ybURhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaGFuZGxlZERhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zZXRXaW5kb3dMb2NhdGlvbihjYXRlZ29yeVVybCwgaGFuZGxlZERhdGEpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmRvd0xvY2F0aW9uQXBwbGljYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGZvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxCdXR0b25FbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZm9ybUNsYXNzTmFtZSlbMF07XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEJ1dHRvbkVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJFdmVudChldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5VXJsID0gKDxIVE1MQnV0dG9uRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJyk7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOiBuby11bmJvdW5kLW1ldGhvZCAqL1xuICAgICAgICBjb25zdCBpc0Zvcm1EYXRhID0gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRm9ybURhdGEucHJvdG90eXBlLmdldCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID1cbiAgICAgICAgICAgIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmdldCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IG5vLXVuYm91bmQtbWV0aG9kICovXG5cbiAgICAgICAgaWYgKGlzRm9ybURhdGEgJiYgaXNVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UXVlcnlTdHJpbmcoY2F0ZWdvcnlVcmwgPyBjYXRlZ29yeVVybCA6ICcnKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRRdWVyeVN0cmluZ0FsdGVybmF0aXZlKGNhdGVnb3J5VXJsID8gY2F0ZWdvcnlVcmwgOiAnJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFF1ZXJ5U3RyaW5nKGNhdGVnb3J5VXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoPFVSTFNlYXJjaFBhcmFtcz5mb3JtRGF0YSk7XG5cbiAgICAgICAgZm9ybURhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2V0V2luZG93TG9jYXRpb24oY2F0ZWdvcnlVcmwsIGRhdGEudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFF1ZXJ5U3RyaW5nQWx0ZXJuYXRpdmUoY2F0ZWdvcnlVcmw6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbnB1dEZpZWxkcyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykpO1xuICAgICAgICBjb25zdCBzZWxlY3RGaWVsZHMgPSA8SFRNTFNlbGVjdEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JykpO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkSW5wdXRGaWVsZHMgPSBpbnB1dEZpZWxkcy5maWx0ZXIoKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGlucHV0LmNoZWNrZWQgfHwgaW5wdXQudHlwZSA9PT0gJ251bWJlcicgfHwgaW5wdXQudHlwZSA9PT0gJ2hpZGRlbicpICYmICFpbnB1dC5kaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZvcm1GaWVsZHMgPSBbLi4uZmlsdGVyZWRJbnB1dEZpZWxkcywgLi4uc2VsZWN0RmllbGRzXTtcbiAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID0gZm9ybUZpZWxkc1xuICAgICAgICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3I6IHN0cmluZywgZmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5uYW1lICYmIGZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yICs9IGAmJHtmaWVsZC5uYW1lfT0ke2ZpZWxkLnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgICAgICAgfSwgJycpXG4gICAgICAgICAgICAuc2xpY2UoMSk7XG5cbiAgICAgICAgdGhpcy5zZXRXaW5kb3dMb2NhdGlvbihjYXRlZ29yeVVybCwgZW5jb2RlVVJJKGRhdGEpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0V2luZG93TG9jYXRpb24oY2F0ZWdvcnlVcmw6IHN0cmluZywgZGF0YTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7Y2F0ZWdvcnlVcmx9PyR7ZGF0YX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZm9ybUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zvcm0tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=