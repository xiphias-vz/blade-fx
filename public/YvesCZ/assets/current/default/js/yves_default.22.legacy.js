(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[22],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/confirmation-modal/confirmation-modal.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/confirmation-modal/confirmation-modal.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConfirmationModal; });
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



var ConfirmationModal = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ConfirmationModal, _Component);

  var _super = _createSuper(ConfirmationModal);

  function ConfirmationModal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "closeTriggers", void 0);

    return _this;
  }

  var _proto = ConfirmationModal.prototype;

  _proto.readyCallback = function readyCallback() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClass));
    this.closeTriggers = Array.from(this.getElementsByClassName(this.closeTriggerClass));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        return _this2.showModal(event);
      });
    });
    this.closeTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        return _this2.closeModal();
      });
    });
  };

  _proto.showModal = function showModal(event) {
    event.preventDefault();
    this.classList.add(this.activeClass);
    document.body.classList.add('is-not-scrollable');
  };

  _proto.closeModal = function closeModal() {
    this.classList.remove(this.activeClass);
    document.body.classList.remove('is-not-scrollable');
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ConfirmationModal, [{
    key: "triggerClass",
    get: function get() {
      return this.getAttribute('trigger-class');
    }
  }, {
    key: "closeTriggerClass",
    get: function get() {
      return this.jsName + "__close";
    }
  }, {
    key: "activeClass",
    get: function get() {
      return this.name + "--is-open";
    }
  }]);

  return ConfirmationModal;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29uZmlybWF0aW9uLW1vZGFsL2NvbmZpcm1hdGlvbi1tb2RhbC50cyJdLCJuYW1lcyI6WyJDb25maXJtYXRpb25Nb2RhbCIsInJlYWR5Q2FsbGJhY2siLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRyaWdnZXJDbGFzcyIsImNsb3NlVHJpZ2dlcnMiLCJjbG9zZVRyaWdnZXJDbGFzcyIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic2hvd01vZGFsIiwiY2xvc2VNb2RhbCIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYWN0aXZlQ2xhc3MiLCJib2R5IiwicmVtb3ZlIiwiZ2V0QXR0cmlidXRlIiwianNOYW1lIiwibmFtZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJUEMsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxRQUFMLEdBQStCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxZQUFyQyxDQUFYLENBQS9CO0FBQ0EsU0FBS0MsYUFBTCxHQUFvQ0wsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0Usc0JBQUwsQ0FBNEIsS0FBS0csaUJBQWpDLENBQVgsQ0FBcEM7QUFFQSxTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUFBOztBQUN4QixTQUFLUixRQUFMLENBQWNTLE9BQWQsQ0FBc0IsVUFBQUMsT0FBTyxFQUFJO0FBQzdCQSxhQUFPLENBQUNDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFVBQUNDLEtBQUQ7QUFBQSxlQUFrQixNQUFJLENBQUNDLFNBQUwsQ0FBZUQsS0FBZixDQUFsQjtBQUFBLE9BQWxDO0FBQ0gsS0FGRDtBQUdBLFNBQUtOLGFBQUwsQ0FBbUJHLE9BQW5CLENBQTJCLFVBQUFDLE9BQU8sRUFBSTtBQUNsQ0EsYUFBTyxDQUFDQyxnQkFBUixDQUF5QixPQUF6QixFQUFrQztBQUFBLGVBQU0sTUFBSSxDQUFDRyxVQUFMLEVBQU47QUFBQSxPQUFsQztBQUNILEtBRkQ7QUFHSCxHOztTQUVTRCxTLEdBQVYsbUJBQW9CRCxLQUFwQixFQUFrQztBQUM5QkEsU0FBSyxDQUFDRyxjQUFOO0FBQ0EsU0FBS0MsU0FBTCxDQUFlQyxHQUFmLENBQW1CLEtBQUtDLFdBQXhCO0FBQ0FmLFlBQVEsQ0FBQ2dCLElBQVQsQ0FBY0gsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsbUJBQTVCO0FBQ0gsRzs7U0FFU0gsVSxHQUFWLHNCQUF1QjtBQUNuQixTQUFLRSxTQUFMLENBQWVJLE1BQWYsQ0FBc0IsS0FBS0YsV0FBM0I7QUFDQWYsWUFBUSxDQUFDZ0IsSUFBVCxDQUFjSCxTQUFkLENBQXdCSSxNQUF4QixDQUErQixtQkFBL0I7QUFDSCxHOzs7O3dCQUVvQztBQUNqQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsZUFBbEIsQ0FBUDtBQUNIOzs7d0JBRXlDO0FBQ3RDLGFBQVUsS0FBS0MsTUFBZjtBQUNIOzs7d0JBRW1DO0FBQ2hDLGFBQVUsS0FBS0MsSUFBZjtBQUNIOzs7O0VBekMwQ0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMjIubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1hdGlvbk1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGNsb3NlVHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzcykpO1xuICAgICAgICB0aGlzLmNsb3NlVHJpZ2dlcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNsb3NlVHJpZ2dlckNsYXNzKSk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zaG93TW9kYWwoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2xvc2VUcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2VNb2RhbCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNb2RhbChldmVudDogRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKHRoaXMuYWN0aXZlQ2xhc3MpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2lzLW5vdC1zY3JvbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ub3Qtc2Nyb2xsYWJsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlckNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2xvc2VUcmlnZ2VyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fY2xvc2VgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLWlzLW9wZW5gO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=