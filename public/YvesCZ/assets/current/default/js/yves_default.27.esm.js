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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class LazyImage extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      if (this.width != this.height) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbGF6eS1pbWFnZS9sYXp5LWltYWdlLnRzIl0sIm5hbWVzIjpbIkxhenlJbWFnZSIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbWFnZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbWFnZUNsYXNzIiwiaW1hZ2VTb3VyY2UiLCJzcmMiLCJtYXBFdmVudHMiLCJyZW1vdmVJbnZpc2libGVDbGFzcyIsInNldENvcnJlY3RIZWlnaHRDbGFzc0ZvckltYWdlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXJsIiwiZ2V0V2lkdGhBbmRIZWlnaHRPZkltYWdlRnJvbVNyY1VybCIsImltZyIsIkltYWdlIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aWR0aCIsImhlaWdodCIsInJlbW92ZURlZmF1bHRIZWlnaHRBdHRyaWJ1dGUiLCJwYXJlbnRFbGVtZW50IiwianNOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVlLE1BQU1BLFNBQU4sU0FBd0JDLCtEQUF4QixDQUFrQztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFJbkNDLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsS0FBTCxHQUEwQixLQUFLQyxzQkFBTCxDQUE0QixLQUFLQyxVQUFqQyxFQUE2QyxDQUE3QyxDQUExQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBS0gsS0FBTCxDQUFXSSxHQUE5QjtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLQyxvQkFBTDtBQUNBLFNBQUtDLDZCQUFMLENBQW1DLEtBQUtKLFdBQXhDO0FBRUg7O0FBRVNHLHNCQUFWLEdBQXVDO0FBQ25DLFNBQUtOLEtBQUwsQ0FBV1EsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsY0FBNUI7QUFDSDs7QUFFU0YsK0JBQVYsQ0FBd0NHLEdBQXhDLEVBQ0E7QUFDSSxTQUFLQyxrQ0FBTCxDQUF3Q0QsR0FBeEM7QUFDSDs7QUFFU0Msb0NBQVYsQ0FBNkNELEdBQTdDLEVBQ0E7QUFDSSxRQUFJRSxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFWO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQUYsT0FBRyxDQUFDRyxnQkFBSixDQUFxQixNQUFyQixFQUE2QixZQUFXO0FBQ3BDLFVBQUcsS0FBS0MsS0FBTCxJQUFjLEtBQUtDLE1BQXRCLEVBQTZCO0FBQ3hCSCxZQUFJLENBQUNJLDRCQUFMLENBQWtDLEtBQUtELE1BQXZDLEVBQStDLEtBQUtELEtBQXBEO0FBQ0o7QUFDSixLQUpEO0FBS0FKLE9BQUcsQ0FBQ1IsR0FBSixHQUFVTSxHQUFWO0FBQ0g7O0FBRVNRLDhCQUFWLENBQXVDRCxNQUF2QyxFQUF1REQsS0FBdkQsRUFBMkU7QUFDdkUsUUFBR0EsS0FBSyxHQUFHQyxNQUFYLEVBQ0E7QUFDSSxXQUFLakIsS0FBTCxDQUFXbUIsYUFBWCxDQUF5QlgsU0FBekIsQ0FBbUNDLE1BQW5DLENBQTBDLFlBQTFDO0FBQ0g7O0FBQ0QsU0FBS1QsS0FBTCxDQUFXUSxTQUFYLENBQXFCQyxNQUFyQixDQUE0Qix3QkFBNUI7QUFDSDs7QUFFRCxNQUFjUCxVQUFkLEdBQW1DO0FBQy9CLFdBQVUsS0FBS2tCLE1BQWY7QUFDSDs7QUEvQzRDLEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMjcuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhenlJbWFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGltYWdlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaW1hZ2VTb3VyY2U6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmltYWdlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmltYWdlQ2xhc3MpWzBdO1xuICAgICAgICB0aGlzLmltYWdlU291cmNlID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW1vdmVJbnZpc2libGVDbGFzcygpO1xuICAgICAgICB0aGlzLnNldENvcnJlY3RIZWlnaHRDbGFzc0ZvckltYWdlKHRoaXMuaW1hZ2VTb3VyY2UpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUludmlzaWJsZUNsYXNzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmlzaWJsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRDb3JyZWN0SGVpZ2h0Q2xhc3NGb3JJbWFnZSh1cmw6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZ2V0V2lkdGhBbmRIZWlnaHRPZkltYWdlRnJvbVNyY1VybCh1cmwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRXaWR0aEFuZEhlaWdodE9mSW1hZ2VGcm9tU3JjVXJsKHVybDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIGlmKHRoaXMud2lkdGggIT0gdGhpcy5oZWlnaHQpe1xuICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZURlZmF1bHRIZWlnaHRBdHRyaWJ1dGUodGhpcy5oZWlnaHQsIHRoaXMud2lkdGgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVEZWZhdWx0SGVpZ2h0QXR0cmlidXRlKGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTogdm9pZHtcbiAgICAgICAgaWYod2lkdGggPiBoZWlnaHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsYXp5LWltYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdqcy1sYXp5LWltYWdlX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbWFnZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX2NvbnRlbnRgO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==