;(function(root) {
  'use strict';

  function TextTicker(element, options) {
    if (!(this instanceof TextTicker)) {
      return new TextTicker(element, options);
    }

    if (!element) return element;
    this._element = element;

    options = options || {};

    this._text = options.text || element.innerText;
    element.innerHTML = '';

    var duration = options.duration || 50;
    var leadChar = options.leadChar || '';
    var leadCharBlink = isExisty(options.leadCharBlink) ? options.leadCharBlink : 1e3;
    var leadCharMaxBlinks = isExisty(options.leadCharMaxBlinks) ? options.leadCharMaxBlinks : Infinity;
    var leadCharKeep = options.leadCharKeep || false;
    var startImediately = isExisty(options.startImediately) ? options.startImediately : true;
    var onDone = options.onDone || function() {};

    this._blinkInterval = null;
    this._tickTimeouts = [];

    var leadCharOpacity = 1;
    var leadCharEl = document.createElement('span');

    element.style.display = 'inherit';

    if (leadChar) {
      leadCharEl.appendChild(document.createTextNode(leadChar));
    }

    this._ticker = function() {
      var textLength = this._text.length;
      leadCharOpacity = 1;
      leadCharEl.style.opacity = 1;
      clearInterval(this._blinkInterval);
      var totalDuration = 0;
      for (var i = 0; i < textLength; i++) {
        totalDuration += result(duration);
        (function(i, t) {
          this._tickTimeouts.push(setTimeout(function() {
            clearContent();
            appendString(this._text.substr(0,i+1));
            if (leadCharEl) {
              appendEl(leadCharEl);
            }
            if (i === textLength - 1) {
              done.call(this);
            }
            this._tickTimeouts.splice(i, 1);
          }.bind(this), t));
        }.bind(this))(i, totalDuration);
      }
    }.bind(this);

    if (startImediately) {
      this.start();
    }

    function done() {
      if (!leadCharKeep) {
        removeEl(leadCharEl);
      }
      if (leadChar && leadCharBlink) {
        var nBlinks = 0;
        this._blinkInterval = setInterval(function() {
          if (nBlinks <= leadCharMaxBlinks) {
            leadCharEl.style.opacity = (leadCharOpacity = Number(!leadCharOpacity));
            nBlinks++;
          } else {
            clearInterval(this._blinkInterval);
          }
        }, leadCharBlink);
      }
      onDone(this._text);
    }

    function isExisty(v) {
      return !(v === null || v === undefined);
    }

    function appendString(string) {
      element.appendChild(document.createTextNode(string));
    }

    function appendEl(el) {
      element.appendChild(el);
    }

    function removeEl(el) {
      element.removeChild(el);
    }

    function clearContent() {
      element.innerHTML = '';
    }

    function result(o) {
      return typeof o === 'function' ? o() : o;
    }
  }

  TextTicker.prototype.start = function() {
    this.reload();
  };

  TextTicker.prototype.reload = function() {
    this._ticker();
  };

  TextTicker.prototype.setText = function(text) {
    this._text = text;
  };

  TextTicker.prototype.destroy = function() {
    clearInterval(this._blinkInterval);
    this._tickTimeouts.forEach(function(timeout) {
      clearTimeout(timeout);
      this._tickTimeouts = [];
    }.bind(this));
    this._element.innerHTML = this._text;
    this._ticker = function() {};
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = TextTicker;
    }
    gxports.TextTicker = TextTicker;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return TextTicker;
    });
  } else {
    root.TextTicker = TextTicker;
  }
})(window);
