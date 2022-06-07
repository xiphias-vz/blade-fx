(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[27],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image/lazy-image.ts":
/*!*****************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image/lazy-image.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LazyImage; });
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



var LazyImage = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(LazyImage, _Component);

  var _super = _createSuper(LazyImage);

  function LazyImage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "image", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "imageSource", void 0);

    return _this;
  }

  var _proto = LazyImage.prototype;

  _proto.readyCallback = function readyCallback() {
    this.image = this.getElementsByClassName(this.imageClass)[0];
    this.imageSource = this.image.src;
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.removeInvisibleClass();
    this.setCorrectHeightClassForImage(this.imageSource);
  };

  _proto.removeInvisibleClass = function removeInvisibleClass() {
    this.image.classList.remove('is-invisible');
  };

  _proto.setCorrectHeightClassForImage = function setCorrectHeightClassForImage(url) {
    this.getWidthAndHeightOfImageFromSrcUrl(url);
  };

  _proto.getWidthAndHeightOfImageFromSrcUrl = function getWidthAndHeightOfImageFromSrcUrl(url) {
    var img = new Image();
    var self = this;
    img.addEventListener("load", function () {
      if (this.width != this.height) {
        self.removeDefaultHeightAttribute(this.height, this.width);
      }
    });
    img.src = url;
  };

  _proto.removeDefaultHeightAttribute = function removeDefaultHeightAttribute(height, width) {
    if (width > height) {
      this.image.parentElement.classList.remove('lazy-image');
    }

    this.image.classList.remove('js-lazy-image__content');
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(LazyImage, [{
    key: "imageClass",
    get: function get() {
      return this.jsName + "__content";
    }
  }]);

  return LazyImage;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbGF6eS1pbWFnZS9sYXp5LWltYWdlLnRzIl0sIm5hbWVzIjpbIkxhenlJbWFnZSIsInJlYWR5Q2FsbGJhY2siLCJpbWFnZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbWFnZUNsYXNzIiwiaW1hZ2VTb3VyY2UiLCJzcmMiLCJtYXBFdmVudHMiLCJyZW1vdmVJbnZpc2libGVDbGFzcyIsInNldENvcnJlY3RIZWlnaHRDbGFzc0ZvckltYWdlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXJsIiwiZ2V0V2lkdGhBbmRIZWlnaHRPZkltYWdlRnJvbVNyY1VybCIsImltZyIsIkltYWdlIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aWR0aCIsImhlaWdodCIsInJlbW92ZURlZmF1bHRIZWlnaHRBdHRyaWJ1dGUiLCJwYXJlbnRFbGVtZW50IiwianNOYW1lIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBSVBDLGEsR0FBVix5QkFBZ0M7QUFDNUIsU0FBS0MsS0FBTCxHQUEwQixLQUFLQyxzQkFBTCxDQUE0QixLQUFLQyxVQUFqQyxFQUE2QyxDQUE3QyxDQUExQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBS0gsS0FBTCxDQUFXSSxHQUE5QjtBQUNBLFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQ3hCLFNBQUtDLG9CQUFMO0FBQ0EsU0FBS0MsNkJBQUwsQ0FBbUMsS0FBS0osV0FBeEM7QUFFSCxHOztTQUVTRyxvQixHQUFWLGdDQUF1QztBQUNuQyxTQUFLTixLQUFMLENBQVdRLFNBQVgsQ0FBcUJDLE1BQXJCLENBQTRCLGNBQTVCO0FBQ0gsRzs7U0FFU0YsNkIsR0FBVix1Q0FBd0NHLEdBQXhDLEVBQ0E7QUFDSSxTQUFLQyxrQ0FBTCxDQUF3Q0QsR0FBeEM7QUFDSCxHOztTQUVTQyxrQyxHQUFWLDRDQUE2Q0QsR0FBN0MsRUFDQTtBQUNJLFFBQUlFLEdBQUcsR0FBRyxJQUFJQyxLQUFKLEVBQVY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBRixPQUFHLENBQUNHLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQVc7QUFDcEMsVUFBRyxLQUFLQyxLQUFMLElBQWMsS0FBS0MsTUFBdEIsRUFBNkI7QUFDeEJILFlBQUksQ0FBQ0ksNEJBQUwsQ0FBa0MsS0FBS0QsTUFBdkMsRUFBK0MsS0FBS0QsS0FBcEQ7QUFDSjtBQUNKLEtBSkQ7QUFLQUosT0FBRyxDQUFDUixHQUFKLEdBQVVNLEdBQVY7QUFDSCxHOztTQUVTUSw0QixHQUFWLHNDQUF1Q0QsTUFBdkMsRUFBdURELEtBQXZELEVBQTJFO0FBQ3ZFLFFBQUdBLEtBQUssR0FBR0MsTUFBWCxFQUNBO0FBQ0ksV0FBS2pCLEtBQUwsQ0FBV21CLGFBQVgsQ0FBeUJYLFNBQXpCLENBQW1DQyxNQUFuQyxDQUEwQyxZQUExQztBQUNIOztBQUNELFNBQUtULEtBQUwsQ0FBV1EsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsd0JBQTVCO0FBQ0gsRzs7Ozt3QkFFa0M7QUFDL0IsYUFBVSxLQUFLVyxNQUFmO0FBQ0g7Ozs7RUEvQ2tDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yNy5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF6eUltYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgaW1hZ2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpbWFnZVNvdXJjZTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuaW1hZ2VDbGFzcylbMF07XG4gICAgICAgIHRoaXMuaW1hZ2VTb3VyY2UgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW92ZUludmlzaWJsZUNsYXNzKCk7XG4gICAgICAgIHRoaXMuc2V0Q29ycmVjdEhlaWdodENsYXNzRm9ySW1hZ2UodGhpcy5pbWFnZVNvdXJjZSk7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlSW52aXNpYmxlQ2xhc3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldENvcnJlY3RIZWlnaHRDbGFzc0ZvckltYWdlKHVybDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5nZXRXaWR0aEFuZEhlaWdodE9mSW1hZ2VGcm9tU3JjVXJsKHVybCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFdpZHRoQW5kSGVpZ2h0T2ZJbWFnZUZyb21TcmNVcmwodXJsOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgaWYodGhpcy53aWR0aCAhPSB0aGlzLmhlaWdodCl7XG4gICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRGVmYXVsdEhlaWdodEF0dHJpYnV0ZSh0aGlzLmhlaWdodCwgdGhpcy53aWR0aClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURlZmF1bHRIZWlnaHRBdHRyaWJ1dGUoaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpOiB2b2lke1xuICAgICAgICBpZih3aWR0aCA+IGhlaWdodClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xhenktaW1hZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2pzLWxhenktaW1hZ2VfX2NvbnRlbnQnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGltYWdlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fY29udGVudGA7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9