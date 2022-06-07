(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[44],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/sticky-element/sticky-element.ts":
/*!*************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/sticky-element/sticky-element.ts ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StickyElement; });
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



var StickyElement = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(StickyElement, _Component);

  var _super = _createSuper(StickyElement);

  function StickyElement() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "targets", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "previousScrollPosition", window.pageYOffset);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "windowSize", window.screen.width);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentScrollPosition", void 0);

    return _this;
  }

  var _proto = StickyElement.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.targets = Array.from(document.getElementsByClassName(this.targetClassName));

    if (this.decktopOnly && document.body.classList.contains('touch')) {
      return;
    }

    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.targets.forEach(function (target) {
      window.addEventListener('load', _this2.targetHandler.bind(_this2, target));
      window.addEventListener('scroll', _this2.targetHandler.bind(_this2, target));
    });
  };

  _proto.targetHandler = function targetHandler(target) {
    this.currentScrollPosition = window.pageYOffset;

    if (this.previousScrollPosition > this.currentScrollPosition) {
      target.classList.toggle(this.toggleClass, true);
    } else {
      target.classList.toggle(this.toggleClass, false);
    }

    this.previousScrollPosition = this.currentScrollPosition;
  };

  _proto.getActiveOffset = function getActiveOffset(target) {
    if (this.offset) {
      return this.offset;
    }

    if (this.wrapperClassName) {
      var wrapper = document.getElementsByClassName(this.wrapperClassName)[0];
      return wrapper.offsetTop;
    }

    return target.offsetTop;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(StickyElement, [{
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
  }, {
    key: "toggleClass",
    get: function get() {
      return this.getAttribute('class-to-toggle');
    }
  }, {
    key: "wrapperClassName",
    get: function get() {
      return this.getAttribute('wrapper-class-name');
    }
  }, {
    key: "decktopOnly",
    get: function get() {
      return this.hasAttribute('desktop-only');
    }
  }, {
    key: "offset",
    get: function get() {
      return Number(this.getAttribute('offset'));
    }
  }]);

  return StickyElement;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc3RpY2t5LWVsZW1lbnQvc3RpY2t5LWVsZW1lbnQudHMiXSwibmFtZXMiOlsiU3RpY2t5RWxlbWVudCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0Iiwic2NyZWVuIiwid2lkdGgiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInRhcmdldHMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0YXJnZXRDbGFzc05hbWUiLCJkZWNrdG9wT25seSIsImJvZHkiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0SGFuZGxlciIsImJpbmQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJwcmV2aW91c1Njcm9sbFBvc2l0aW9uIiwidG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJnZXRBY3RpdmVPZmZzZXQiLCJvZmZzZXQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwid3JhcHBlciIsIm9mZnNldFRvcCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIk51bWJlciIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozs7O3VNQUU0QkMsTUFBTSxDQUFDQyxXOzsyTEFDcEJELE1BQU0sQ0FBQ0UsTUFBUCxDQUFjQyxLOzs7Ozs7Ozs7U0FHcENDLGEsR0FBVix5QkFBZ0MsQ0FBRSxDOztTQUV4QkMsSSxHQUFWLGdCQUF1QjtBQUNuQixTQUFLQyxPQUFMLEdBQThCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxlQUFyQyxDQUFYLENBQTlCOztBQUVBLFFBQUksS0FBS0MsV0FBTCxJQUFvQkgsUUFBUSxDQUFDSSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLFFBQXhCLENBQWlDLE9BQWpDLENBQXhCLEVBQW1FO0FBQy9EO0FBQ0g7O0FBRUQsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1YsT0FBTCxDQUFhVyxPQUFiLENBQXFCLFVBQUFDLE1BQU0sRUFBSTtBQUMzQmxCLFlBQU0sQ0FBQ21CLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUksQ0FBQ0MsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0IsTUFBeEIsRUFBOEJILE1BQTlCLENBQWhDO0FBQ0FsQixZQUFNLENBQUNtQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxNQUFJLENBQUNDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLE1BQXhCLEVBQThCSCxNQUE5QixDQUFsQztBQUNILEtBSEQ7QUFJSCxHOztTQUVTRSxhLEdBQVYsdUJBQXdCRixNQUF4QixFQUFtRDtBQUUvQyxTQUFLSSxxQkFBTCxHQUE2QnRCLE1BQU0sQ0FBQ0MsV0FBcEM7O0FBQ0EsUUFBRyxLQUFLc0Isc0JBQUwsR0FBOEIsS0FBS0QscUJBQXRDLEVBQTZEO0FBQ3pESixZQUFNLENBQUNKLFNBQVAsQ0FBaUJVLE1BQWpCLENBQXdCLEtBQUtDLFdBQTdCLEVBQTBDLElBQTFDO0FBQ0gsS0FGRCxNQUdLO0FBQ0RQLFlBQU0sQ0FBQ0osU0FBUCxDQUFpQlUsTUFBakIsQ0FBd0IsS0FBS0MsV0FBN0IsRUFBMEMsS0FBMUM7QUFDSDs7QUFDRCxTQUFLRixzQkFBTCxHQUE4QixLQUFLRCxxQkFBbkM7QUFDSCxHOztTQUVTSSxlLEdBQVYseUJBQTBCUixNQUExQixFQUF1RDtBQUNuRCxRQUFJLEtBQUtTLE1BQVQsRUFBaUI7QUFDYixhQUFPLEtBQUtBLE1BQVo7QUFDSDs7QUFFRCxRQUFJLEtBQUtDLGdCQUFULEVBQTJCO0FBQ3ZCLFVBQU1DLE9BQU8sR0FBZ0JwQixRQUFRLENBQUNDLHNCQUFULENBQWdDLEtBQUtrQixnQkFBckMsRUFBdUQsQ0FBdkQsQ0FBN0I7QUFFQSxhQUFPQyxPQUFPLENBQUNDLFNBQWY7QUFDSDs7QUFFRCxXQUFPWixNQUFNLENBQUNZLFNBQWQ7QUFDSCxHOzs7O3dCQUV1QztBQUNwQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7O3dCQUVtQztBQUNoQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7O3dCQUV3QztBQUNyQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDs7O3dCQUVvQztBQUNqQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsY0FBbEIsQ0FBUDtBQUNIOzs7d0JBRThCO0FBQzNCLGFBQU9DLE1BQU0sQ0FBQyxLQUFLRixZQUFMLENBQWtCLFFBQWxCLENBQUQsQ0FBYjtBQUNIOzs7O0VBckVzQ0csK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNDQubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0aWNreUVsZW1lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCAgcHJldmlvdXNTY3JvbGxQb3NpdGlvbjogbnVtYmVyICA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBwcm90ZWN0ZWQgIHdpbmRvd1NpemU6IG51bWJlciA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gICAgcHJvdGVjdGVkICBjdXJyZW50U2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpKTtcblxuICAgICAgICBpZiAodGhpcy5kZWNrdG9wT25seSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygndG91Y2gnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLnRhcmdldEhhbmRsZXIuYmluZCh0aGlzLCB0YXJnZXQpKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnRhcmdldEhhbmRsZXIuYmluZCh0aGlzLCB0YXJnZXQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRhcmdldEhhbmRsZXIodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBpZih0aGlzLnByZXZpb3VzU2Nyb2xsUG9zaXRpb24gPiB0aGlzLmN1cnJlbnRTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy50b2dnbGVDbGFzcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnRvZ2dsZUNsYXNzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c1Njcm9sbFBvc2l0aW9uID0gdGhpcy5jdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEFjdGl2ZU9mZnNldCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53cmFwcGVyQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy53cmFwcGVyQ2xhc3NOYW1lKVswXTtcblxuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldC5vZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdG9nZ2xlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHdyYXBwZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd3cmFwcGVyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRlY2t0b3BPbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rlc2t0b3Atb25seScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ29mZnNldCcpKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9