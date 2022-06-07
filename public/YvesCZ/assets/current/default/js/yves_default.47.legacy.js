(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[47],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerAccordion; });
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



var TogglerAccordion = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(TogglerAccordion, _Component);

  var _super = _createSuper(TogglerAccordion);

  function TogglerAccordion() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    return _this;
  }

  var _proto = TogglerAccordion.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggers.forEach(function (trigger) {
      var eventFunction = function eventFunction(e) {
        return _this2.triggerHandler(trigger, e);
      };

      trigger.addEventListener('click', eventFunction.bind(_this2));
    });
  };

  _proto.triggerHandler = function triggerHandler(trigger, event) {
    event.stopImmediatePropagation();
    var togglerContent = document.getElementsByClassName(trigger.getAttribute('data-toggle-target-class-name'))[0];
    trigger.classList.toggle(this.activeClass);
    togglerContent.classList.toggle(this.toggleClass);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(TogglerAccordion, [{
    key: "triggerClassName",
    get: function get() {
      return this.getAttribute('trigger-class-name');
    }
  }, {
    key: "toggleClass",
    get: function get() {
      return this.getAttribute('class-to-toggle');
    }
  }, {
    key: "activeClass",
    get: function get() {
      return this.getAttribute('active-class');
    }
  }]);

  return TogglerAccordion;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1hY2NvcmRpb24vdG9nZ2xlci1hY2NvcmRpb24udHMiXSwibmFtZXMiOlsiVG9nZ2xlckFjY29yZGlvbiIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlcnMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsInRyaWdnZXIiLCJldmVudEZ1bmN0aW9uIiwiZSIsInRyaWdnZXJIYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJldmVudCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRvZ2dsZXJDb250ZW50IiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiYWN0aXZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBSXFCQSxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBR1BDLGEsR0FBVix5QkFBZ0MsQ0FBRSxDOztTQUV4QkMsSSxHQUFWLGdCQUF1QjtBQUNuQixTQUFLQyxRQUFMLEdBQStCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxnQkFBckMsQ0FBWCxDQUEvQjtBQUNBLFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFNBQUtOLFFBQUwsQ0FBY08sT0FBZCxDQUFzQixVQUFBQyxPQUFPLEVBQUk7QUFDN0IsVUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDQyxDQUFEO0FBQUEsZUFBYyxNQUFJLENBQUNDLGNBQUwsQ0FBb0JILE9BQXBCLEVBQTZCRSxDQUE3QixDQUFkO0FBQUEsT0FBdEI7O0FBQ0FGLGFBQU8sQ0FBQ0ksZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0NILGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQixNQUFuQixDQUFsQztBQUNILEtBSEQ7QUFJSCxHOztTQUVTRixjLEdBQVYsd0JBQXlCSCxPQUF6QixFQUErQ00sS0FBL0MsRUFBbUU7QUFDL0RBLFNBQUssQ0FBQ0Msd0JBQU47QUFDQSxRQUFNQyxjQUFjLEdBQUdiLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FDbkJJLE9BQU8sQ0FBQ1MsWUFBUixDQUFxQiwrQkFBckIsQ0FEbUIsRUFFckIsQ0FGcUIsQ0FBdkI7QUFHQVQsV0FBTyxDQUFDVSxTQUFSLENBQWtCQyxNQUFsQixDQUF5QixLQUFLQyxXQUE5QjtBQUNBSixrQkFBYyxDQUFDRSxTQUFmLENBQXlCQyxNQUF6QixDQUFnQyxLQUFLRSxXQUFyQztBQUNILEc7Ozs7d0JBRXdDO0FBQ3JDLGFBQU8sS0FBS0osWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRW1DO0FBQ2hDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRW1DO0FBQ2hDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7Ozs7RUFwQ3lDSywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40Ny5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7ZXZlbnROYW1lc30gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7YXJyYXl9IGZyb20gJ2Zhc3QtZ2xvYi9vdXQvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVyQWNjb3JkaW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmVudEZ1bmN0aW9uID0gKGU6IEV2ZW50KSA9PiB0aGlzLnRyaWdnZXJIYW5kbGVyKHRyaWdnZXIsIGUpO1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50RnVuY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmlnZ2VySGFuZGxlcih0cmlnZ2VyOiBIVE1MRWxlbWVudCwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB0b2dnbGVyQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAgICAgICB0cmlnZ2VyLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdGFyZ2V0LWNsYXNzLW5hbWUnKVxuICAgICAgICApWzBdO1xuICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC50b2dnbGUodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgICAgIHRvZ2dsZXJDb250ZW50LmNsYXNzTGlzdC50b2dnbGUodGhpcy50b2dnbGVDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0b2dnbGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtY2xhc3MnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9