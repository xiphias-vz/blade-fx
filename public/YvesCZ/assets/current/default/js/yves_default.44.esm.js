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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class StickyElement extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "targets", void 0);

    _defineProperty(this, "previousScrollPosition", window.pageYOffset);

    _defineProperty(this, "windowSize", window.screen.width);

    _defineProperty(this, "currentScrollPosition", void 0);
  }

  readyCallback() {}

  init() {
    this.targets = Array.from(document.getElementsByClassName(this.targetClassName));

    if (this.decktopOnly && document.body.classList.contains('touch')) {
      return;
    }

    this.mapEvents();
  }

  mapEvents() {
    this.targets.forEach(target => {
      window.addEventListener('load', this.targetHandler.bind(this, target));
      window.addEventListener('scroll', this.targetHandler.bind(this, target));
    });
  }

  targetHandler(target) {
    this.currentScrollPosition = window.pageYOffset;

    if (this.previousScrollPosition > this.currentScrollPosition) {
      target.classList.toggle(this.toggleClass, true);
    } else {
      target.classList.toggle(this.toggleClass, false);
    }

    this.previousScrollPosition = this.currentScrollPosition;
  }

  getActiveOffset(target) {
    if (this.offset) {
      return this.offset;
    }

    if (this.wrapperClassName) {
      var wrapper = document.getElementsByClassName(this.wrapperClassName)[0];
      return wrapper.offsetTop;
    }

    return target.offsetTop;
  }

  get targetClassName() {
    return this.getAttribute('target-class-name');
  }

  get toggleClass() {
    return this.getAttribute('class-to-toggle');
  }

  get wrapperClassName() {
    return this.getAttribute('wrapper-class-name');
  }

  get decktopOnly() {
    return this.hasAttribute('desktop-only');
  }

  get offset() {
    return Number(this.getAttribute('offset'));
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc3RpY2t5LWVsZW1lbnQvc3RpY2t5LWVsZW1lbnQudHMiXSwibmFtZXMiOlsiU3RpY2t5RWxlbWVudCIsIkNvbXBvbmVudCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0Iiwic2NyZWVuIiwid2lkdGgiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInRhcmdldHMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0YXJnZXRDbGFzc05hbWUiLCJkZWNrdG9wT25seSIsImJvZHkiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0SGFuZGxlciIsImJpbmQiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJwcmV2aW91c1Njcm9sbFBvc2l0aW9uIiwidG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJnZXRBY3RpdmVPZmZzZXQiLCJvZmZzZXQiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwid3JhcHBlciIsIm9mZnNldFRvcCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIk51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxhQUFOLFNBQTRCQywrREFBNUIsQ0FBc0M7QUFBQTtBQUFBOztBQUFBOztBQUFBLG9EQUVKQyxNQUFNLENBQUNDLFdBRkg7O0FBQUEsd0NBR2pCRCxNQUFNLENBQUNFLE1BQVAsQ0FBY0MsS0FIRzs7QUFBQTtBQUFBOztBQU12Q0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxPQUFMLEdBQThCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxlQUFyQyxDQUFYLENBQTlCOztBQUVBLFFBQUksS0FBS0MsV0FBTCxJQUFvQkgsUUFBUSxDQUFDSSxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLFFBQXhCLENBQWlDLE9BQWpDLENBQXhCLEVBQW1FO0FBQy9EO0FBQ0g7O0FBRUQsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtWLE9BQUwsQ0FBYVcsT0FBYixDQUFxQkMsTUFBTSxJQUFJO0FBQzNCbEIsWUFBTSxDQUFDbUIsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsS0FBS0MsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJILE1BQTlCLENBQWhDO0FBQ0FsQixZQUFNLENBQUNtQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxLQUFLQyxhQUFMLENBQW1CQyxJQUFuQixDQUF3QixJQUF4QixFQUE4QkgsTUFBOUIsQ0FBbEM7QUFDSCxLQUhEO0FBSUg7O0FBRVNFLGVBQVYsQ0FBd0JGLE1BQXhCLEVBQW1EO0FBRS9DLFNBQUtJLHFCQUFMLEdBQTZCdEIsTUFBTSxDQUFDQyxXQUFwQzs7QUFDQSxRQUFHLEtBQUtzQixzQkFBTCxHQUE4QixLQUFLRCxxQkFBdEMsRUFBNkQ7QUFDekRKLFlBQU0sQ0FBQ0osU0FBUCxDQUFpQlUsTUFBakIsQ0FBd0IsS0FBS0MsV0FBN0IsRUFBMEMsSUFBMUM7QUFDSCxLQUZELE1BR0s7QUFDRFAsWUFBTSxDQUFDSixTQUFQLENBQWlCVSxNQUFqQixDQUF3QixLQUFLQyxXQUE3QixFQUEwQyxLQUExQztBQUNIOztBQUNELFNBQUtGLHNCQUFMLEdBQThCLEtBQUtELHFCQUFuQztBQUNIOztBQUVTSSxpQkFBVixDQUEwQlIsTUFBMUIsRUFBdUQ7QUFDbkQsUUFBSSxLQUFLUyxNQUFULEVBQWlCO0FBQ2IsYUFBTyxLQUFLQSxNQUFaO0FBQ0g7O0FBRUQsUUFBSSxLQUFLQyxnQkFBVCxFQUEyQjtBQUN2QixVQUFNQyxPQUFPLEdBQWdCcEIsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLa0IsZ0JBQXJDLEVBQXVELENBQXZELENBQTdCO0FBRUEsYUFBT0MsT0FBTyxDQUFDQyxTQUFmO0FBQ0g7O0FBRUQsV0FBT1osTUFBTSxDQUFDWSxTQUFkO0FBQ0g7O0FBRUQsTUFBY25CLGVBQWQsR0FBd0M7QUFDcEMsV0FBTyxLQUFLb0IsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNOLFdBQWQsR0FBb0M7QUFDaEMsV0FBTyxLQUFLTSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0gsZ0JBQWQsR0FBeUM7QUFDckMsV0FBTyxLQUFLRyxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY25CLFdBQWQsR0FBcUM7QUFDakMsV0FBTyxLQUFLb0IsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0wsTUFBZCxHQUErQjtBQUMzQixXQUFPTSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixRQUFsQixDQUFELENBQWI7QUFDSDs7QUFyRWdELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNDQuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0aWNreUVsZW1lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCAgcHJldmlvdXNTY3JvbGxQb3NpdGlvbjogbnVtYmVyICA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBwcm90ZWN0ZWQgIHdpbmRvd1NpemU6IG51bWJlciA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gICAgcHJvdGVjdGVkICBjdXJyZW50U2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpKTtcblxuICAgICAgICBpZiAodGhpcy5kZWNrdG9wT25seSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygndG91Y2gnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aGlzLnRhcmdldEhhbmRsZXIuYmluZCh0aGlzLCB0YXJnZXQpKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnRhcmdldEhhbmRsZXIuYmluZCh0aGlzLCB0YXJnZXQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRhcmdldEhhbmRsZXIodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBpZih0aGlzLnByZXZpb3VzU2Nyb2xsUG9zaXRpb24gPiB0aGlzLmN1cnJlbnRTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy50b2dnbGVDbGFzcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnRvZ2dsZUNsYXNzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c1Njcm9sbFBvc2l0aW9uID0gdGhpcy5jdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEFjdGl2ZU9mZnNldCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53cmFwcGVyQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy53cmFwcGVyQ2xhc3NOYW1lKVswXTtcblxuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIub2Zmc2V0VG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldC5vZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdG9nZ2xlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHdyYXBwZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd3cmFwcGVyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRlY2t0b3BPbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rlc2t0b3Atb25seScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ29mZnNldCcpKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9