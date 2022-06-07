(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[30],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/nav-overlay/nav-overlay.ts":
/*!*******************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/nav-overlay/nav-overlay.ts ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavOverlay; });
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



var NavOverlay = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(NavOverlay, _Component);

  var _super = _createSuper(NavOverlay);

  function NavOverlay() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "classToggle", _this.name + "--active");

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "navigation", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggerClose", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "blocks", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "savedIndex", 0);

    return _this;
  }

  var _proto = NavOverlay.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.navigation = document.getElementsByClassName(this.navClass)[0];
    this.triggers = Array.from(document.getElementsByClassName(this.triggerOpenClassName));
    this.triggerClose = this.getElementsByClassName(this.jsName + "__shadow")[0];
    this.blocks = Array.from(this.getElementsByClassName(this.jsName + "__drop-down-block"));
    this.hideBlocks();
    this.mapEvents();
  };

  _proto.hideBlocks = function hideBlocks() {
    this.blocks.forEach(function (block) {
      return block.classList.add('is-hidden');
    });
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggers.forEach(function (trigger, index) {
      trigger.addEventListener('mouseenter', _this2.triggersHandler.bind(_this2, index));
    });
    this.triggerClose.addEventListener('mouseenter', this.triggerCloseHandler.bind(this));
  };

  _proto.resetTriggersActiveClass = function resetTriggersActiveClass() {
    var _this3 = this;

    this.triggers.forEach(function (trigger) {
      return trigger.classList.remove(_this3.activeTriggerClass);
    });
  };

  _proto.triggersHandler = function triggersHandler(index, event) {
    var eventTarget = event.target;
    event.stopPropagation();

    if (!this.classList.contains(this.classToggle)) {
      this.classList.add(this.classToggle);
      this.blocks[index].classList.remove('is-hidden');
      eventTarget.classList.add(this.activeTriggerClass);
    } else if (this.savedIndex !== index) {
      this.hideBlocks();
      this.resetTriggersActiveClass();
      this.blocks[index].classList.remove('is-hidden');
      eventTarget.classList.add(this.activeTriggerClass);
    }

    this.toggleActiveNavClass(true);
    this.savedIndex = index;
  };

  _proto.triggerCloseHandler = function triggerCloseHandler() {
    this.classList.remove(this.classToggle);
    this.hideBlocks();
    this.resetTriggersActiveClass();
    this.toggleActiveNavClass(false);
  };

  _proto.toggleActiveNavClass = function toggleActiveNavClass(isActive) {
    this.navigation.classList.toggle(this.navActiveClass, isActive);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(NavOverlay, [{
    key: "triggerOpenClassName",
    get: function get() {
      return this.getAttribute('trigger-open-class-name');
    }
  }, {
    key: "activeTriggerClass",
    get: function get() {
      return this.getAttribute('active-link');
    }
  }, {
    key: "navClass",
    get: function get() {
      return this.getAttribute('nav-class');
    }
  }, {
    key: "navActiveClass",
    get: function get() {
      return this.getAttribute('nav-active-class');
    }
  }]);

  return NavOverlay;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbmF2LW92ZXJsYXkvbmF2LW92ZXJsYXkudHMiXSwibmFtZXMiOlsiTmF2T3ZlcmxheSIsIm5hbWUiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIm5hdmlnYXRpb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJuYXZDbGFzcyIsInRyaWdnZXJzIiwiQXJyYXkiLCJmcm9tIiwidHJpZ2dlck9wZW5DbGFzc05hbWUiLCJ0cmlnZ2VyQ2xvc2UiLCJqc05hbWUiLCJibG9ja3MiLCJoaWRlQmxvY2tzIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsImJsb2NrIiwiY2xhc3NMaXN0IiwiYWRkIiwidHJpZ2dlciIsImluZGV4IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXJzSGFuZGxlciIsImJpbmQiLCJ0cmlnZ2VyQ2xvc2VIYW5kbGVyIiwicmVzZXRUcmlnZ2Vyc0FjdGl2ZUNsYXNzIiwicmVtb3ZlIiwiYWN0aXZlVHJpZ2dlckNsYXNzIiwiZXZlbnQiLCJldmVudFRhcmdldCIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRhaW5zIiwiY2xhc3NUb2dnbGUiLCJzYXZlZEluZGV4IiwidG9nZ2xlQWN0aXZlTmF2Q2xhc3MiLCJpc0FjdGl2ZSIsInRvZ2dsZSIsIm5hdkFjdGl2ZUNsYXNzIiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzRMQUNrQixNQUFLQyxJOzs7Ozs7Ozs7OzJMQUtULEM7Ozs7Ozs7U0FFckJDLGEsR0FBVix5QkFBZ0MsQ0FBRSxDOztTQUV4QkMsSSxHQUFWLGdCQUF1QjtBQUNuQixTQUFLQyxVQUFMLEdBQStCQyxRQUFRLENBQUNDLHNCQUFULENB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O3dCQUU0QztBQUN6QyxhQUFPLEtBQUtHLFlBQUwsQ0FBa0IseUJBQWxCLENBQVA7QUFDSDs7O3dCQUUwQztBQUN2QyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBUDtBQUNIOzs7d0JBRWdDO0FBQzdCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixXQUFsQixDQUFQO0FBQ0g7Ozt3QkFFc0M7QUFDbkMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGtCQUFsQixDQUFQO0FBQ0g7Ozs7RUE3RW1DQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4zMC5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2T3ZlcmxheSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGNsYXNzVG9nZ2xlOiBzdHJpbmcgPSBgJHt0aGlzLm5hbWV9LS1hY3RpdmVgO1xuICAgIHByb3RlY3RlZCBuYXZpZ2F0aW9uOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJDbG9zZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGJsb2NrczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgc2F2ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb24gPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLm5hdkNsYXNzKVswXTtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJPcGVuQ2xhc3NOYW1lKSk7XG4gICAgICAgIHRoaXMudHJpZ2dlckNsb3NlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NoYWRvd2ApWzBdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZHJvcC1kb3duLWJsb2NrYCkpO1xuXG4gICAgICAgIHRoaXMuaGlkZUJsb2NrcygpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlQmxvY2tzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLnRyaWdnZXJzSGFuZGxlci5iaW5kKHRoaXMsIGluZGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyaWdnZXJDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy50cmlnZ2VyQ2xvc2VIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXNldFRyaWdnZXJzQWN0aXZlQ2xhc3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZVRyaWdnZXJDbGFzcykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmlnZ2Vyc0hhbmRsZXIoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc1RvZ2dsZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzVG9nZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVUcmlnZ2VyQ2xhc3MpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2F2ZWRJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUJsb2NrcygpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFRyaWdnZXJzQWN0aXZlQ2xhc3MoKTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVUcmlnZ2VyQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlTmF2Q2xhc3ModHJ1ZSk7XG4gICAgICAgIHRoaXMuc2F2ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmlnZ2VyQ2xvc2VIYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc1RvZ2dsZSk7XG4gICAgICAgIHRoaXMuaGlkZUJsb2NrcygpO1xuICAgICAgICB0aGlzLnJlc2V0VHJpZ2dlcnNBY3RpdmVDbGFzcygpO1xuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZU5hdkNsYXNzKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlQWN0aXZlTmF2Q2xhc3MoaXNBY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC50b2dnbGUodGhpcy5uYXZBY3RpdmVDbGFzcywgaXNBY3RpdmUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlck9wZW5DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLW9wZW4tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlVHJpZ2dlckNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYWN0aXZlLWxpbmsnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG5hdkNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbmF2LWNsYXNzJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBuYXZBY3RpdmVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ25hdi1hY3RpdmUtY2xhc3MnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9