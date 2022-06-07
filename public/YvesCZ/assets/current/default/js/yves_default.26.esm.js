(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[26],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image-ff/lazy-image-ff.ts":
/*!***********************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image-ff/lazy-image-ff.ts ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LazyImageFf; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class LazyImageFf extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "image", void 0);

    _defineProperty(this, "imageSource", void 0);
  }

  readyCallback() {
    this.image = this.getElementsByClassName(this.imageClass)[0];
    this.imageSource = this.image.src;
    this.mapEvents();
  }

  mapEvents() {
    this.removeInvisibleClass();
    this.setCorrectHeightClassForImage(this.imageSource);
  }

  removeInvisibleClass() {
    this.image.classList.remove('is-invisible');
  }

  setCorrectHeightClassForImage(url) {
    this.getWidthAndHeightOfImageFromSrcUrl(url);
  }

  getWidthAndHeightOfImageFromSrcUrl(url) {
    var img = new Image();
    var self = this;
    img.addEventListener("load", function () {
      if (this.width !== this.height) {
        self.removeDefaultHeightAttribute(this.height, this.width);
      }
    });
    img.src = url;
  }

  removeDefaultHeightAttribute(height, width) {
    if (width > height) {
      this.image.parentElement.classList.remove('lazy-image');
    }

    this.image.classList.remove('js-lazy-image__content');
  }

  get imageClass() {
    return this.jsName + "__content";
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbGF6eS1pbWFnZS1mZi9sYXp5LWltYWdlLWZmLnRzIl0sIm5hbWVzIjpbIkxhenlJbWFnZUZmIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImltYWdlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImltYWdlQ2xhc3MiLCJpbWFnZVNvdXJjZSIsInNyYyIsIm1hcEV2ZW50cyIsInJlbW92ZUludmlzaWJsZUNsYXNzIiwic2V0Q29ycmVjdEhlaWdodENsYXNzRm9ySW1hZ2UiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1cmwiLCJnZXRXaWR0aEFuZEhlaWdodE9mSW1hZ2VGcm9tU3JjVXJsIiwiaW1nIiwiSW1hZ2UiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmVtb3ZlRGVmYXVsdEhlaWdodEF0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJqc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsV0FBTixTQUEwQkMsK0RBQTFCLENBQW9DO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUlyQ0MsZUFBVixHQUFnQztBQUM1QixTQUFLQyxLQUFMLEdBQTBCLEtBQUtDLHNCQUFMLENBQTRCLEtBQUtDLFVBQWpDLEVBQTZDLENBQTdDLENBQTFCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFLSCxLQUFMLENBQVdJLEdBQTlCO0FBQ0EsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtDLG9CQUFMO0FBQ0EsU0FBS0MsNkJBQUwsQ0FBbUMsS0FBS0osV0FBeEM7QUFFSDs7QUFFU0csc0JBQVYsR0FBdUM7QUFDbkMsU0FBS04sS0FBTCxDQUFXUSxTQUFYLENBQXFCQyxNQUFyQixDQUE0QixjQUE1QjtBQUNIOztBQUVTRiwrQkFBVixDQUF3Q0csR0FBeEMsRUFDQTtBQUNJLFNBQUtDLGtDQUFMLENBQXdDRCxHQUF4QztBQUNIOztBQUVTQyxvQ0FBVixDQUE2Q0QsR0FBN0MsRUFDQTtBQUNJLFFBQUlFLEdBQUcsR0FBRyxJQUFJQyxLQUFKLEVBQVY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBRixPQUFHLENBQUNHLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQVc7QUFDcEMsVUFBSSxLQUFLQyxLQUFMLEtBQWUsS0FBS0MsTUFBeEIsRUFBK0I7QUFDMUJILFlBQUksQ0FBQ0ksNEJBQUwsQ0FBa0MsS0FBS0QsTUFBdkMsRUFBK0MsS0FBS0QsS0FBcEQ7QUFDSjtBQUNKLEtBSkQ7QUFLQUosT0FBRyxDQUFDUixHQUFKLEdBQVVNLEdBQVY7QUFDSDs7QUFFU1EsOEJBQVYsQ0FBdUNELE1BQXZDLEVBQXVERCxLQUF2RCxFQUEyRTtBQUN2RSxRQUFHQSxLQUFLLEdBQUdDLE1BQVgsRUFDQTtBQUNJLFdBQUtqQixLQUFMLENBQVdtQixhQUFYLENBQXlCWCxTQUF6QixDQUFtQ0MsTUFBbkMsQ0FBMEMsWUFBMUM7QUFDSDs7QUFDRCxTQUFLVCxLQUFMLENBQVdRLFNBQVgsQ0FBcUJDLE1BQXJCLENBQTRCLHdCQUE1QjtBQUNIOztBQUVELE1BQWNQLFVBQWQsR0FBbUM7QUFDL0IsV0FBVSxLQUFLa0IsTUFBZjtBQUNIOztBQS9DOEMsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yNi5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF6eUltYWdlRmYgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBpbWFnZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGltYWdlU291cmNlOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5pbWFnZUNsYXNzKVswXTtcbiAgICAgICAgdGhpcy5pbWFnZVNvdXJjZSA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlSW52aXNpYmxlQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5zZXRDb3JyZWN0SGVpZ2h0Q2xhc3NGb3JJbWFnZSh0aGlzLmltYWdlU291cmNlKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVJbnZpc2libGVDbGFzcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZpc2libGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0Q29ycmVjdEhlaWdodENsYXNzRm9ySW1hZ2UodXJsOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmdldFdpZHRoQW5kSGVpZ2h0T2ZJbWFnZUZyb21TcmNVcmwodXJsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0V2lkdGhBbmRIZWlnaHRPZkltYWdlRnJvbVNyY1VybCh1cmw6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBpZiAodGhpcy53aWR0aCAhPT0gdGhpcy5oZWlnaHQpe1xuICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZURlZmF1bHRIZWlnaHRBdHRyaWJ1dGUodGhpcy5oZWlnaHQsIHRoaXMud2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGVmYXVsdEhlaWdodEF0dHJpYnV0ZShoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcik6IHZvaWR7XG4gICAgICAgIGlmKHdpZHRoID4gaGVpZ2h0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eS1pbWFnZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZSgnanMtbGF6eS1pbWFnZV9fY29udGVudCcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaW1hZ2VDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19jb250ZW50YDtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=