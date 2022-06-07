(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[42],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-parallax/scroll-parallax.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-parallax/scroll-parallax.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollParallax; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var DIRECTIONS = {
  TOP: 'top',
  DOWN: 'down'
};
var THROTTLE_DURATION = 300;
class ScrollParallax extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "wrapper", void 0);

    _defineProperty(this, "windowHeight", void 0);

    _defineProperty(this, "windowWidth", void 0);

    _defineProperty(this, "wrapperHeight", void 0);

    _defineProperty(this, "distanceToWrapper", void 0);

    _defineProperty(this, "initialized", false);
  }

  readyCallback() {}

  init() {
    this.wrapper = document.getElementsByClassName(this.wrapperClassName)[0];
    this.target = this.wrapper.getElementsByClassName(this.targetClassName)[0];
    this.defineDimensions();
    this.mapEvents();
  }

  mapEvents() {
    window.addEventListener('resize', () => setTimeout(() => this.defineDimensions(), THROTTLE_DURATION));
    window.addEventListener('scroll', this.checkBreakpointsToScroll.bind(this));
  }

  defineDimensions() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.wrapperHeight = this.wrapper.offsetHeight;
    this.distanceToWrapper = this.getDistanceToWrapper();
  }

  checkBreakpointsToScroll() {
    if (!isNaN(this.minBreakPoint) && !isNaN(this.maxBreakPoint)) {
      if (this.minBreakPoint < this.windowWidth && this.maxBreakPoint > this.windowWidth) {
        this.moveTarget();
        return;
      }

      this.cleanOffset();
    }
  }

  cleanOffset() {
    if (this.initialized) {
      this.initialized = false;
      this.target.removeAttribute('style');
    }
  }

  moveTarget() {
    var scrollHeight = window.scrollY + this.windowHeight;
    var targetOffset = '';

    if (scrollHeight > this.distanceToWrapper) {
      if (this.motionDirection === DIRECTIONS.TOP) {
        targetOffset = "-" + this.getTargetOffset(scrollHeight);
      }

      if (this.motionDirection === DIRECTIONS.DOWN) {
        targetOffset = this.getTargetOffset(scrollHeight);
      }

      if (targetOffset !== '') {
        this.target.style.transform = "translateY(" + targetOffset + ")";
        this.initialized = true;
      }
    }
  }

  getTargetOffset(scrollHeight) {
    return (scrollHeight - this.distanceToWrapper) / this.motionRatio + "px";
  }

  getDistanceToWrapper() {
    var wrapper = this.wrapper;
    var yPosition = 0;

    while (wrapper) {
      yPosition += wrapper.offsetTop - wrapper.scrollTop + wrapper.clientTop;
      wrapper = wrapper.offsetParent;
    }

    return yPosition;
  }

  get wrapperClassName() {
    return this.getAttribute('wrapper-class-name');
  }

  get targetClassName() {
    return this.getAttribute('target-class-name');
  }

  get motionRatio() {
    return +this.getAttribute('motion-ratio');
  }

  get motionDirection() {
    return this.getAttribute('motion-direction');
  }

  get minBreakPoint() {
    return +this.getAttribute('breakpoint-min');
  }

  get maxBreakPoint() {
    return +this.getAttribute('breakpoint-max');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2Nyb2xsLXBhcmFsbGF4L3Njcm9sbC1wYXJhbGxheC50cyJdLCJuYW1lcyI6WyJESVJFQ1RJT05TIiwiVE9QIiwiRE9XTiIsIlRIUk9UVExFX0RVUkFUSU9OIiwiU2Nyb2xsUGFyYWxsYXgiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIndyYXBwZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NOYW1lIiwiZGVmaW5lRGltZW5zaW9ucyIsIm1hcEV2ZW50cyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiY2hlY2tCcmVha3BvaW50c1RvU2Nyb2xsIiwiYmluZCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0Iiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwid3JhcHBlckhlaWdodCIsIm9mZnNldEhlaWdodCIsImRpc3RhbmNlVG9XcmFwcGVyIiwiZ2V0RGlzdGFuY2VUb1dyYXBwZXIiLCJpc05hTiIsIm1pbkJyZWFrUG9pbnQiLCJtYXhCcmVha1BvaW50IiwibW92ZVRhcmdldCIsImNsZWFuT2Zmc2V0IiwiaW5pdGlhbGl6ZWQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxZIiwidGFyZ2V0T2Zmc2V0IiwibW90aW9uRGlyZWN0aW9uIiwiZ2V0VGFyZ2V0T2Zmc2V0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJtb3Rpb25SYXRpbyIsInlQb3NpdGlvbiIsIm9mZnNldFRvcCIsInNjcm9sbFRvcCIsImNsaWVudFRvcCIsIm9mZnNldFBhcmVudCIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxVQUFV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LEdBQXlDO0FBQ3JDLFFBQUlwQixPQUFvQixHQUFHLEtBQUtBLE9BQWhDO0FBQ0EsUUFBSW9DLFNBQVMsR0FBRyxDQUFoQjs7QUFFQSxXQUFPcEMsT0FBUCxFQUFnQjtBQUNab0MsZUFBUyxJQUFLcEMsT0FBTyxDQUFDcUMsU0FBUixHQUFvQnJDLE9BQU8sQ0FBQ3NDLFNBQTVCLEdBQXdDdEMsT0FBTyxDQUFDdUMsU0FBOUQ7QUFDQXZDLGFBQU8sR0FBZ0JBLE9BQU8sQ0FBQ3dDLFlBQS9CO0FBQ0g7O0FBRUQsV0FBT0osU0FBUDtBQUNIOztBQUVELE1BQWNqQyxnQkFBZCxHQUF5QztBQUNyQyxXQUFPLEtBQUtzQyxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY3BDLGVBQWQsR0FBd0M7QUFDcEMsV0FBTyxLQUFLb0MsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNOLFdBQWQsR0FBb0M7QUFDaEMsV0FBTyxDQUFDLEtBQUtNLFlBQUwsQ0FBa0IsY0FBbEIsQ0FBUjtBQUNIOztBQUVELE1BQWNWLGVBQWQsR0FBd0M7QUFDcEMsV0FBTyxLQUFLVSxZQUFMLENBQWtCLGtCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY25CLGFBQWQsR0FBc0M7QUFDbEMsV0FBTyxDQUFDLEtBQUttQixZQUFMLENBQWtCLGdCQUFsQixDQUFSO0FBQ0g7O0FBRUQsTUFBY2xCLGFBQWQsR0FBc0M7QUFDbEMsV0FBTyxDQUFDLEtBQUtrQixZQUFMLENBQWtCLGdCQUFsQixDQUFSO0FBQ0g7O0FBeEdpRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjQyLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJT05TID0ge1xuICAgIFRPUDogJ3RvcCcsXG4gICAgRE9XTjogJ2Rvd24nXG59O1xuY29uc3QgVEhST1RUTEVfRFVSQVRJT04gPSAzMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbFBhcmFsbGF4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgd3JhcHBlcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHdpbmRvd0hlaWdodDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCB3cmFwcGVySGVpZ2h0OiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIGRpc3RhbmNlVG9XcmFwcGVyOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy53cmFwcGVyQ2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEVsZW1lbnQ+dGhpcy53cmFwcGVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLmRlZmluZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmRlZmluZURpbWVuc2lvbnMoKSwgVEhST1RUTEVfRFVSQVRJT04pKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuY2hlY2tCcmVha3BvaW50c1RvU2Nyb2xsLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkZWZpbmVEaW1lbnNpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLndyYXBwZXJIZWlnaHQgPSB0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLmRpc3RhbmNlVG9XcmFwcGVyID0gdGhpcy5nZXREaXN0YW5jZVRvV3JhcHBlcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja0JyZWFrcG9pbnRzVG9TY3JvbGwoKTogdm9pZCB7XG4gICAgICAgIGlmICghaXNOYU4odGhpcy5taW5CcmVha1BvaW50KSAmJiAhaXNOYU4odGhpcy5tYXhCcmVha1BvaW50KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWluQnJlYWtQb2ludCA8IHRoaXMud2luZG93V2lkdGggJiYgdGhpcy5tYXhCcmVha1BvaW50ID4gdGhpcy53aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRhcmdldCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jbGVhbk9mZnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFuT2Zmc2V0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1vdmVUYXJnZXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodDogbnVtYmVyID0gd2luZG93LnNjcm9sbFkgKyB0aGlzLndpbmRvd0hlaWdodDtcbiAgICAgICAgbGV0IHRhcmdldE9mZnNldCA9ICcnO1xuXG4gICAgICAgIGlmIChzY3JvbGxIZWlnaHQgPiB0aGlzLmRpc3RhbmNlVG9XcmFwcGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3Rpb25EaXJlY3Rpb24gPT09IERJUkVDVElPTlMuVE9QKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0ID0gYC0ke3RoaXMuZ2V0VGFyZ2V0T2Zmc2V0KHNjcm9sbEhlaWdodCl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1vdGlvbkRpcmVjdGlvbiA9PT0gRElSRUNUSU9OUy5ET1dOKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0ID0gdGhpcy5nZXRUYXJnZXRPZmZzZXQoc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXRPZmZzZXQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHt0YXJnZXRPZmZzZXR9KWA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VGFyZ2V0T2Zmc2V0KHNjcm9sbEhlaWdodDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAkeyhzY3JvbGxIZWlnaHQgLSB0aGlzLmRpc3RhbmNlVG9XcmFwcGVyKSAvIHRoaXMubW90aW9uUmF0aW99cHhgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXREaXN0YW5jZVRvV3JhcHBlcigpOiBudW1iZXIge1xuICAgICAgICBsZXQgd3JhcHBlcjogSFRNTEVsZW1lbnQgPSB0aGlzLndyYXBwZXI7XG4gICAgICAgIGxldCB5UG9zaXRpb24gPSAwO1xuXG4gICAgICAgIHdoaWxlICh3cmFwcGVyKSB7XG4gICAgICAgICAgICB5UG9zaXRpb24gKz0gKHdyYXBwZXIub2Zmc2V0VG9wIC0gd3JhcHBlci5zY3JvbGxUb3AgKyB3cmFwcGVyLmNsaWVudFRvcCk7XG4gICAgICAgICAgICB3cmFwcGVyID0gPEhUTUxFbGVtZW50PndyYXBwZXIub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHlQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHdyYXBwZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd3cmFwcGVyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtb3Rpb25SYXRpbygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gK3RoaXMuZ2V0QXR0cmlidXRlKCdtb3Rpb24tcmF0aW8nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG1vdGlvbkRpcmVjdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21vdGlvbi1kaXJlY3Rpb24nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG1pbkJyZWFrUG9pbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZSgnYnJlYWtwb2ludC1taW4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG1heEJyZWFrUG9pbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZSgnYnJlYWtwb2ludC1tYXgnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9