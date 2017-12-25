/**
 * Copyright (c) 2015 wangfan
 * Licensed under the MIT license
 */
'use strict';
+function(root, factory) {

  // CommonJS
  if (typeof exports == 'object') {
    module.exports = factory();
  }
  // AMD module
  else if (typeof define == 'function' && define.amd) {
    define(factory);
  }
  // Browser global
  else {
    root.SliderValidator = factory();
  }

}
(this, function() {

  var jQuery = ((typeof window.jQuery === 'undefined') ? undefined : window.jQuery);

  /*
   * construct the instance
   * */
  function Constructor(el, option) {

    // make sure to get an instance
    if (!this || this.constructor !== Constructor) {
      return new Constructor(el, option);
    }

    //console.log('this: ', this)

    this.option = {
      validActive: true,
      sliderContent: '&gt;'
      //sliderContent: '123321'
    };


    if (option) {
      for (var i in option) {
        this.option[i] = option[i];
      }
    }

    el.classList.add('slider-container');
    this.container = el;

    var slided = document.createElement('div');
    slided.classList.add('slided');
    el.appendChild(slided);
    this.slided = slided;

    var slider = document.createElement('div');
    slider.classList.add('slider');
    slider.innerHTML = this.option.sliderContent;

    this.start = start.bind(this);

    slider.addEventListener('mousedown', this.start, false);
    slider.addEventListener('touchstart', this.start, false);

    el.appendChild(slider);
    this.slider = slider;
    var area = document.createElement('div');
    this.area = area;
    area.classList.add('valid-area');
    el.appendChild(area);
    generateRandomPosition(area);

    return this;
  };

  /*
   * make the valid-area position at more than half width of the container
   * */
  function generateRandomPosition(el) {
    var random = Math.random();
    if (random < 0.5) {
      random = random + 0.5;
    }
    var left = (el.parentNode.clientWidth - el.clientWidth) * random;
    el.style.left = left + 'px';
  }

  /*
   * clean up event listeners and restore the element
   * */
  Constructor.prototype.destroy = function() {
    this.slider.removeEventListener('mousedown', this.start);
    this.slider.removeEventListener('touchstart', this.start);
    this.container.removeChild(this.slider);
    this.container.removeChild(this.area);
    this.container.classList.remove('slider-container');
  };

  /*
   * get clientX from destop or mobile browser
   * */
  function getClientX(e) {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientX;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientX;
    }
  }

  /*
   * when first click, remember the x position
   * */
  function start(e) {
    e.preventDefault();


    this.slided.style.transition = '';
    this.originX = getClientX(e);
    this.originSliderLeft = this.slider.offsetLeft;
    this.container.classList.add('moving');

    console.log(this.originX)


    if (!this.move) {
      this.move = move.bind(this);
    }
    document.addEventListener('mousemove', this.move, false);
    document.addEventListener('touchmove', this.move, false);

    if (!this.end) {
      this.end = end.bind(this);
    }
    document.addEventListener('mouseup', this.end, false);
    document.addEventListener('touchend', this.end, false);
  }

  /*
   * when mouseup or touchend, place slider in area or back to start place
   * */
  function end() {
    this.container.classList.remove('moving');
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);

    document.removeEventListener('mouseup', this.end);
    document.removeEventListener('touchend', this.end);
    var eventName = 'slider.';
    if (inValidDistance(this.slider, this.area, this.option.validDistance)) {
      eventName += 'success';
      this.slider.style.left = this.area.offsetLeft + 2 + 'px';
      this.slided.style.width = this.slider.style.left;
    } else {
      eventName += 'failure';
      this.slider.removeAttribute('style');
      generateRandomPosition(this.area);
      this.slided.style.width = '0px';
      var transitionDuration = getComputedStyle(this.slider).transitionDuration;
      this.slided.style.transition = 'width ' + transitionDuration;
    }
    var event = new Event(eventName);
    this.container.dispatchEvent(event);
    if (jQuery) {
      jQuery(this.container).trigger(eventName);
    }
  }

  /*
   * compare tow elements distance is less than 10 pixy
   * */
  function inValidDistance(e1, e2, validDistance) {
    return Math.abs(e1.offsetLeft - e2.offsetLeft) < (validDistance || 10);
  }

  /*
   * move the slider
   * */
  function move(e) {
    e.preventDefault();
    var clientX = getClientX(e);
    var offsetX = clientX - this.originX + this.originSliderLeft;
    if (offsetX < 0 || offsetX > this.container.clientWidth - this.slider.offsetWidth) {
      return false;
    }
    this.slider.style.left = offsetX + 'px';
    this.slided.style.width = offsetX + 'px';

    if (this.option.validActive) {
      if (inValidDistance(this.slider, this.area, this.option.validDistance)) {
        this.area.classList.add('active');
      } else {
        this.area.classList.remove('active');
      }
    }
  }

  return {
    create: Constructor
  };

});
