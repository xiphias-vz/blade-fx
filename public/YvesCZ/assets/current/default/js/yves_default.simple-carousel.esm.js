(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["simple-carousel"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleCarousel; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class SimpleCarousel extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Switches a slide to a previous one.
   */

  /**
   * Switches a slide to a next one.
   */

  /**
   * The current slider.
   */

  /**
   * The number of the slides.
   */

  /**
   * The slider width.
   */

  /**
   * Thr dot-switch elements below the slides.
   */

  /**
   * The number of views.
   */

  /**
   * The index of the active slide.
   */

  /**
   * Dot element selector.
   */

  /**
   * Dot element "is current" modifier.
   */
  constructor() {
    super();

    _defineProperty(this, "triggerPrev", void 0);

    _defineProperty(this, "triggerNext", void 0);

    _defineProperty(this, "slider", void 0);

    _defineProperty(this, "slidesCount", void 0);

    _defineProperty(this, "slideWidth", void 0);

    _defineProperty(this, "dots", void 0);

    _defineProperty(this, "viewsCount", void 0);

    _defineProperty(this, "viewCurrentIndex", 0);

    _defineProperty(this, "dotSelector", void 0);

    _defineProperty(this, "dotCurrentModifier", void 0);

    _defineProperty(this, "fullSliderWidth", 100);

    this.dotSelector = this.jsName + "__dot";
    this.dotCurrentModifier = this.name + "__dot--current";
  }

  readyCallback() {
    this.slidesCount = this.getElementsByClassName(this.jsName + "__slide").length;

    if (this.slidesCount <= 1) {
      return;
    }

    this.triggerPrev = this.getElementsByClassName(this.jsName + "__prev")[0];
    this.triggerNext = this.getElementsByClassName(this.jsName + "__next")[0];
    this.slider = this.getElementsByClassName(this.jsName + "__slider")[0];
    this.slideWidth = this.fullSliderWidth / this.slidesToShow;
    this.dots = Array.from(this.getElementsByClassName(this.dotSelector));
    this.viewsCount = this.getViewsCount();
    this.mapEvents();
  }
  /**
   * Gets the number of slides.
   */


  getViewsCount() {
    return Math.ceil((this.slidesCount - this.slidesToShow) / this.slidesToScroll) + 1;
  }

  mapEvents() {
    this.triggerPrev.addEventListener('click', event => this.onPrevClick(event));
    this.triggerNext.addEventListener('click', event => this.onNextClick(event));
    this.dots.forEach(dot => {
      dot.addEventListener('click', event => this.onDotClick(event));
    });
  }

  onPrevClick(event) {
    event.preventDefault();
    this.loadPrevViewIndex();
    this.slide();
    this.updateCurrentDot();
  }

  onNextClick(event) {
    event.preventDefault();
    this.loadNextViewIndex();
    this.slide();
    this.updateCurrentDot();
  }

  onDotClick(event) {
    event.preventDefault();
    this.loadViewIndexFromDot(event.target);
    this.slide();
    this.updateCurrentDot();
  }
  /**
   * Switches the current slide to the previous one.
   */


  loadPrevViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex - 1;

    if (this.viewCurrentIndex < 0) {
      this.viewCurrentIndex = this.viewsCount - 1;
    }
  }
  /**
   * Switches the current slide to the next one.
   */


  loadNextViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex + 1;

    if (this.viewCurrentIndex >= this.viewsCount) {
      this.viewCurrentIndex = 0;
    }
  }
  /**
   * Switches to the slide based on the provided dot element.
   * @param dot HTMLElement corresponding to the new target slide that has to be loaded.
   */


  loadViewIndexFromDot(dot) {
    this.viewCurrentIndex = this.dots.indexOf(dot);

    if (this.viewCurrentIndex === -1) {
      this.viewCurrentIndex = 0;
    }
  }
  /**
   * Performs sliding of slider items.
   */


  slide() {
    var slidesToSlide = this.slidesToScroll * this.viewCurrentIndex;

    if (this.slidesToScroll + slidesToSlide > this.slidesCount) {
      slidesToSlide = slidesToSlide - (this.slidesCount - slidesToSlide);
    }

    var offset = -(slidesToSlide * this.slideWidth);
    this.slider.style.transform = "translateX(" + offset + "%)";
  }
  /**
   * Toggles the active class and the modifier on the current dot.
   */


  updateCurrentDot() {
    if (this.dots.length === 0) {
      return;
    }

    this.querySelector("." + this.dotSelector + "." + this.dotCurrentModifier).classList.remove(this.dotCurrentModifier);
    this.dots[this.viewCurrentIndex].classList.add(this.dotCurrentModifier);
  }
  /**
   * Gets the number of slides to be shown.
   */


  get slidesToShow() {
    return parseInt(this.getAttribute('slides-to-show') || '0');
  }
  /**
   * Gets the number of slides to be scrolled by an interaction.
   */


  get slidesToScroll() {
    return parseInt(this.getAttribute('slides-to-scroll') || '0');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2ltcGxlLWNhcm91c2VsL3NpbXBsZS1jYXJvdXNlbC50cyJdLCJuYW1lcyI6WyJTaW1wbGVDYXJvdXNlbCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwiZG90U2VsZWN0b3IiLCJqc05hbWUiLCJkb3RDdXJyZW50TW9kaWZpZXIiLCJuYW1lIiwicmVhZHlDYWxsYmFjayIsInNsaWRlc0NvdW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxlbmd0aCIsInRyaWdnZXJQcmV2IiwidHJpZ2dlck5leHQiLCJzbGlkZXIiLCJzbGlkZVdpZHRoIiwiZnVsbFNsaWRlcldpZHRoIiwic2xpZGVzVG9TaG93IiwiZG90cyIsIkFycmF5IiwiZnJvbSIsInZpZXdzQ291bnQiLCJnZXRWaWV3c0NvdW50IiwibWFwRXZlbnRzIiwiTWF0aCIsImNlaWwiLCJzbGlkZXNUb1Njcm9sbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uUHJldkNsaWNrIiwib25OZXh0Q2xpY2siLCJmb3JFYWNoIiwiZG90Iiwib25Eb3RDbGljayIsInByZXZlbnREZWZhdWx0IiwibG9hZFByZXZWaWV3SW5kZXgiLCJzbGlkZSIsInVwZGF0ZUN1cnJlbnREb3QiLCJsb2FkTmV4dFZpZXdJbmRleCIsImxvYWRWaWV3SW5kZXhGcm9tRG90IiwidGFyZ2V0Iiwidmlld0N1cnJlbnRJbmRleCIsImluZGV4T2YiLCJzbGlkZXNUb1NsaWRlIiwib2Zmc2V0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsY0FB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QUVBLFNBQUtZLElBQUwsQ0FBVSxLQUFLdUIsZ0JBQWYsRUFBaUNPLFNBQWpDLENBQTJDRSxHQUEzQyxDQUErQyxLQUFLNUMsa0JBQXBEO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJVyxZQUFKLEdBQTJCO0FBQ3ZCLFdBQU9rQyxRQUFRLENBQUMsS0FBS0MsWUFBTCxDQUFrQixnQkFBbEIsS0FBdUMsR0FBeEMsQ0FBZjtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSTFCLGNBQUosR0FBNkI7QUFDekIsV0FBT3lCLFFBQVEsQ0FBQyxLQUFLQyxZQUFMLENBQWtCLGtCQUFsQixLQUF5QyxHQUExQyxDQUFmO0FBQ0g7O0FBekxpRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnNpbXBsZS1jYXJvdXNlbC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVDYXJvdXNlbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgYSBzbGlkZSB0byBhIHByZXZpb3VzIG9uZS5cbiAgICAgKi9cbiAgICB0cmlnZ2VyUHJldjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyBhIHNsaWRlIHRvIGEgbmV4dCBvbmUuXG4gICAgICovXG4gICAgdHJpZ2dlck5leHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc2xpZGVyLlxuICAgICAqL1xuICAgIHNsaWRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICovXG4gICAgc2xpZGVzQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzbGlkZXIgd2lkdGguXG4gICAgICovXG4gICAgc2xpZGVXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhyIGRvdC1zd2l0Y2ggZWxlbWVudHMgYmVsb3cgdGhlIHNsaWRlcy5cbiAgICAgKi9cbiAgICBkb3RzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB2aWV3cy5cbiAgICAgKi9cbiAgICB2aWV3c0NvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBzbGlkZS5cbiAgICAgKi9cbiAgICB2aWV3Q3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogRG90IGVsZW1lbnQgc2VsZWN0b3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgZG90U2VsZWN0b3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERvdCBlbGVtZW50IFwiaXMgY3VycmVudFwiIG1vZGlmaWVyLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRvdEN1cnJlbnRNb2RpZmllcjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBmdWxsU2xpZGVyV2lkdGg6IG51bWJlciA9IDEwMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZG90U2VsZWN0b3IgPSBgJHt0aGlzLmpzTmFtZX1fX2RvdGA7XG4gICAgICAgIHRoaXMuZG90Q3VycmVudE1vZGlmaWVyID0gYCR7dGhpcy5uYW1lfV9fZG90LS1jdXJyZW50YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zbGlkZXNDb3VudCA9IHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NsaWRlYCkubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0aGlzLnNsaWRlc0NvdW50IDw9IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclByZXYgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJldmApWzBdO1xuICAgICAgICB0aGlzLnRyaWdnZXJOZXh0ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX25leHRgKVswXTtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2xpZGVyYClbMF07XG4gICAgICAgIHRoaXMuc2xpZGVXaWR0aCA9IHRoaXMuZnVsbFNsaWRlcldpZHRoIC8gdGhpcy5zbGlkZXNUb1Nob3c7XG4gICAgICAgIHRoaXMuZG90cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZG90U2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy52aWV3c0NvdW50ID0gdGhpcy5nZXRWaWV3c0NvdW50KCk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2Ygc2xpZGVzLlxuICAgICAqL1xuICAgIGdldFZpZXdzQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCgodGhpcy5zbGlkZXNDb3VudCAtIHRoaXMuc2xpZGVzVG9TaG93KSAvIHRoaXMuc2xpZGVzVG9TY3JvbGwpICsgMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJQcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblByZXZDbGljayhldmVudCkpO1xuICAgICAgICB0aGlzLnRyaWdnZXJOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbk5leHRDbGljayhldmVudCkpO1xuICAgICAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZG90OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkRvdENsaWNrKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblByZXZDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkUHJldlZpZXdJbmRleCgpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk5leHRDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkTmV4dFZpZXdJbmRleCgpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRvdENsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmxvYWRWaWV3SW5kZXhGcm9tRG90KDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIHRoZSBjdXJyZW50IHNsaWRlIHRvIHRoZSBwcmV2aW91cyBvbmUuXG4gICAgICovXG4gICAgbG9hZFByZXZWaWV3SW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld0N1cnJlbnRJbmRleCAtIDE7XG5cbiAgICAgICAgaWYgKHRoaXMudmlld0N1cnJlbnRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld3NDb3VudCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0aGUgY3VycmVudCBzbGlkZSB0byB0aGUgbmV4dCBvbmUuXG4gICAgICovXG4gICAgbG9hZE5leHRWaWV3SW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld0N1cnJlbnRJbmRleCArIDE7XG5cbiAgICAgICAgaWYgKHRoaXMudmlld0N1cnJlbnRJbmRleCA+PSB0aGlzLnZpZXdzQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0byB0aGUgc2xpZGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRvdCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBkb3QgSFRNTEVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgbmV3IHRhcmdldCBzbGlkZSB0aGF0IGhhcyB0byBiZSBsb2FkZWQuXG4gICAgICovXG4gICAgbG9hZFZpZXdJbmRleEZyb21Eb3QoZG90OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLmRvdHMuaW5kZXhPZihkb3QpO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc2xpZGluZyBvZiBzbGlkZXIgaXRlbXMuXG4gICAgICovXG4gICAgc2xpZGUoKTogdm9pZCB7XG4gICAgICAgIGxldCBzbGlkZXNUb1NsaWRlID0gdGhpcy5zbGlkZXNUb1Njcm9sbCAqIHRoaXMudmlld0N1cnJlbnRJbmRleDtcblxuICAgICAgICBpZiAodGhpcy5zbGlkZXNUb1Njcm9sbCArIHNsaWRlc1RvU2xpZGUgPiB0aGlzLnNsaWRlc0NvdW50KSB7XG4gICAgICAgICAgICBzbGlkZXNUb1NsaWRlID0gc2xpZGVzVG9TbGlkZSAtICh0aGlzLnNsaWRlc0NvdW50IC0gc2xpZGVzVG9TbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSAtKHNsaWRlc1RvU2xpZGUgKiB0aGlzLnNsaWRlV2lkdGgpO1xuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH0lKWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgYWN0aXZlIGNsYXNzIGFuZCB0aGUgbW9kaWZpZXIgb24gdGhlIGN1cnJlbnQgZG90LlxuICAgICAqL1xuICAgIHVwZGF0ZUN1cnJlbnREb3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRvdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoYC4ke3RoaXMuZG90U2VsZWN0b3J9LiR7dGhpcy5kb3RDdXJyZW50TW9kaWZpZXJ9YCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRvdEN1cnJlbnRNb2RpZmllcik7XG5cbiAgICAgICAgdGhpcy5kb3RzW3RoaXMudmlld0N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmRvdEN1cnJlbnRNb2RpZmllcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHNsaWRlcyB0byBiZSBzaG93bi5cbiAgICAgKi9cbiAgICBnZXQgc2xpZGVzVG9TaG93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnc2xpZGVzLXRvLXNob3cnKSB8fCAnMCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBzbGlkZXMgdG8gYmUgc2Nyb2xsZWQgYnkgYW4gaW50ZXJhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IHNsaWRlc1RvU2Nyb2xsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnc2xpZGVzLXRvLXNjcm9sbCcpIHx8ICcwJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==