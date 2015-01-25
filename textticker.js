;(function(root) {
  'use strict';

  var text,
      textLength,
      ticker,
      duration,
      leadChar,
      leadCharBlink,
      leadCharKeep,
      leadCharOpacity,
      leadCharEl,
      blinkInterval,
      onDone;

  function TextTicker(element, options) {
    if (!(this instanceof TextTicker)) {
      return new TextTicker(element, options);
    }

    options = options || {};

    text = options.text || element.innerText;

    duration = options.duration || 50;
    leadChar = options.leadChar || '';
    leadCharBlink = isExisty(options.leadCharBlink) ? options.leadCharBlink : 1000;
    leadCharKeep = options.leadCharKeep || false;
    onDone = options.onDone || function() {};

    leadCharOpacity = 1;
    leadCharEl = document.createElement('span');

    element.style.display = 'inherit';

    if (leadChar) {
      leadCharEl.appendChild(document.createTextNode(leadChar));
    }

    ticker = function() {
      textLength = text.length;
      leadCharOpacity = 1;
      leadCharEl.style.opacity = 1;
      clearInterval(blinkInterval);
      for (var i = 0; i < textLength; i++) {
        (function(i, t) {
          setTimeout(function() {
            clearContent();
            appendString(text.substr(0,i+1));
            if (leadCharEl) {
              appendEl(leadCharEl);
            }
            if (i === textLength - 1) {
              done();
            }
          }, t);
        })(i, duration * i);
      }
    };

    ticker();

    function done() {
      if (!leadCharKeep) {
        removeEl(leadCharEl);
      }
      if (leadChar && leadCharBlink) {
        blinkInterval = setInterval(function() {
          leadCharEl.style.opacity = (leadCharOpacity = Number(!leadCharOpacity));
        }, leadCharBlink);
      }
      onDone(text);
    }

    function isExisty(v) {
      return v !== null || v !== undefined;
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
  }

  TextTicker.prototype.reload = function() {
    ticker();
  };

  TextTicker.prototype.setText = function(txt) {
    text = txt;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = TextTicker;
    }
    exports.TextTicker = TextTicker;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return TextTicker;
    });
  } else {
    root.TextTicker = TextTicker;
  }
})(window);
