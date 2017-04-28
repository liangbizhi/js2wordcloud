(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Js2WordCloud"] = factory();
	else
		root["Js2WordCloud"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WordCloud = __webpack_require__(1);
	var spinCss = __webpack_require__(2);
	var util = __webpack_require__(6).default;

	var LODAING_WRAPPTER_HTML_PRE = '<div class="__wc_loading_wrapper__">' + '<div style="padding-left: 60px;" class="__wc_loading_wrapper_item__">' + '<div class="__wc_loading_wrapper_item_inner__">';
	var LODAING_WRAPPTER_HTML_END = '</div></div></div>';

	var Js2WordCloud = exports.Js2WordCloud = function () {
	    function Js2WordCloud(element) {
	        _classCallCheck(this, Js2WordCloud);

	        this._container = element;
	        this._wrapper = null;
	        this._canvas = null;
	        this._maskCanvas = null;
	        this._dataMask = null;
	        this._tooltip = null;

	        this._wordcloud2 = null;
	        this._option = null;
	        this._init();
	    }

	    _createClass(Js2WordCloud, [{
	        key: 'setOption',
	        value: function setOption(option) {
	            var _this = this;

	            this._option = util.copy(option, true);
	            var __originHoverCb = this._option.hover;
	            this._option.fontFamily = this._option.fontFamily || 'Microsoft YaHei,Helvetica,Times,serif';
	            this._fixWeightFactor(this._option);
	            this._maskCanvas = null;
	            var hoverCb = function hoverCb(item, dimension, event) {
	                if (item) {
	                    var html = item[0] + ': ' + item[1];
	                    if (typeof _this._option.tooltip.formatter === 'function') {
	                        html = _this._option.tooltip.formatter(item);
	                    }
	                    _this._tooltip.innerHTML = html;
	                    _this._tooltip.style.top = event.offsetY + 10 + 'px';
	                    _this._tooltip.style.left = event.offsetX + 15 + 'px';
	                    _this._tooltip.style.display = 'block';
	                    _this._wrapper.style.cursor = 'pointer';
	                } else {
	                    _this._tooltip.style.display = 'none';
	                    _this._wrapper.style.cursor = 'default';
	                }
	                __originHoverCb && __originHoverCb(item, dimension, event);
	            };
	            if (option.tooltip && option.tooltip.show === true) {
	                if (!this._tooltip) {
	                    this._tooltip = window.document.createElement('div');
	                    this._tooltip.className = "__wc_tooltip__";
	                    this._tooltip.style.backgroundColor = option.tooltip.backgroundColor || 'rgba(0, 0, 0, 0.701961)';
	                    this._tooltip.style.color = '#fff';
	                    this._tooltip.style.padding = '5px';
	                    this._tooltip.style.borderRadius = '5px';
	                    this._tooltip.style.fontSize = '12px';
	                    this._tooltip.style.fontFamily = option.fontFamily || this._option.fontFamily;
	                    this._tooltip.style.lineHeight = 1.4;
	                    this._tooltip.style.webkitTransition = 'left 0.2s, top 0.2s';
	                    this._tooltip.style.mozTransition = 'left 0.2s, top 0.2s';
	                    this._tooltip.style.transition = 'left 0.2s, top 0.2s';
	                    this._tooltip.style.position = 'absolute';
	                    this._tooltip.style.whiteSpace = 'nowrap';
	                    this._tooltip.style.zIndex = 999;
	                    this._tooltip.style.display = 'none';
	                    this._wrapper.appendChild(this._tooltip);
	                    this._container.onmouseout = function () {
	                        _this._tooltip.style.display = 'none';
	                    };
	                }
	                this._option.hover = hoverCb;
	            }
	            _sortWorldCloud(this._option);

	            if (this._option && /\.(jpg|png)$/.test(this._option.imageShape)) {
	                _imageShape.call(this, this._option);
	            } else if (this._option.shape === 'circle') {
	                _circle.call(this, this._option);
	            } else {
	                _renderShape.call(this, this._option);
	            }
	        }
	        /**
	         * 事件绑定
	         * @todo
	         */

	    }, {
	        key: 'on',
	        value: function on() {}
	    }, {
	        key: 'showLoading',
	        value: function showLoading(loadingOption) {
	            var loadingTxt;
	            var DEFAULT_LOADING_TEXT = '正在加载...';
	            var LOADING_LOGO_HTML = '<div class="__wc_loading__">' + '<div></div>' + '<div></div>' + '<div></div>' + '<div></div>' + '<div></div>' + '<div></div>' + '<div></div>' + '<div></div>' + '</div>';
	            if (loadingOption) {
	                if (loadingOption.backgroundColor) {
	                    this._dataMask.style.backgroundColor = loadingOption.backgroundColor;
	                }
	                loadingTxt = loadingOption.text === undefined ? DEFAULT_LOADING_TEXT : loadingOption.text;
	                if (loadingOption.effect === 'spin') {
	                    this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + loadingTxt + LODAING_WRAPPTER_HTML_END);
	                    var dom = this._dataMask.childNodes[0].childNodes[0];
	                    var paddingLeft = dom.style.paddingLeft;
	                    dom.style.paddingLeft = parseInt(paddingLeft) + 45 + 'px';
	                } else {
	                    this._showMask(LODAING_WRAPPTER_HTML_PRE + loadingTxt + LODAING_WRAPPTER_HTML_END);
	                }
	            } else {
	                this._showMask(LODAING_WRAPPTER_HTML_PRE + LOADING_LOGO_HTML + DEFAULT_LOADING_TEXT + LODAING_WRAPPTER_HTML_END);
	            }
	        }
	    }, {
	        key: 'hideLoading',
	        value: function hideLoading() {
	            if (this._dataMask) {
	                this._dataMask.style.display = 'none';
	            }
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            this._canvas.width = this._container.clientWidth;
	            this._canvas.height = this._container.clientHeight;
	            _renderShape.call(this, this._option);
	            // this._wordcloud2 = WordCloud(this._canvas, this._option)
	        }
	    }, {
	        key: '_init',
	        value: function _init() {
	            var width = this._container.clientWidth;
	            var height = this._container.clientHeight;
	            this._container.innerHTML = '';

	            this._wrapper = window.document.createElement('div');
	            this._wrapper.style.position = 'relative';
	            this._wrapper.style.width = '100%';
	            this._wrapper.style.height = 'inherit';

	            this._dataMask = window.document.createElement('div');
	            this._dataMask.height = 'inherit';
	            this._dataMask.style.textAlign = 'center';
	            this._dataMask.style.color = '#888';
	            this._dataMask.style.fontSize = '14px';
	            this._dataMask.style.position = 'absolute';
	            this._dataMask.style.left = '0';
	            this._dataMask.style.right = '0';
	            this._dataMask.style.top = '0';
	            this._dataMask.style.bottom = '0';
	            this._dataMask.style.display = 'none';

	            this._wrapper.appendChild(this._dataMask);
	            this._container.appendChild(this._wrapper);

	            this._canvas = window.document.createElement('canvas');
	            this._canvas.width = width;
	            this._canvas.height = height;
	            this._wrapper.appendChild(this._canvas);
	        }
	    }, {
	        key: '_fixWeightFactor',
	        value: function _fixWeightFactor(option) {
	            option.maxFontSize = typeof option.maxFontSize === 'number' ? option.maxFontSize : 60;
	            option.minFontSize = typeof option.minFontSize === 'number' ? option.minFontSize : 12;
	            if (option.list && option.list.length > 0) {
	                var min = option.list[0][1];
	                var max = 0;
	                for (var i = 0, len = option.list.length; i < len; i++) {
	                    if (min > option.list[i][1]) {
	                        min = option.list[i][1];
	                    }
	                    if (max < option.list[i][1]) {
	                        max = option.list[i][1];
	                    }
	                }

	                //用y=ax^r+b公式确定字体大小
	                if (max > min) {
	                    var r = typeof option.fontSizeFactor === 'number' ? option.fontSizeFactor : 1 / 10;
	                    var a = (option.maxFontSize - option.minFontSize) / (Math.pow(max, r) - Math.pow(min, r));
	                    var b = option.maxFontSize - a * Math.pow(max, r);
	                    // var x = (option.maxFontSize - option.minFontSize) / (1 - min / max)
	                    // var y = option.maxFontSize - x
	                    option.weightFactor = function (size) {
	                        return Math.ceil(a * Math.pow(size, r) + b);
	                        // var s = Math.ceil((size / max) * x + y)
	                        // return s
	                    };
	                } else {
	                    option.weightFactor = function (size) {
	                        return option.minFontSize;
	                    };
	                }
	            }
	        }
	    }, {
	        key: '_showMask',
	        value: function _showMask(innerHTML) {
	            if (this._dataMask) {
	                this._dataMask.innerHTML = innerHTML;
	                if (innerHTML === '') {
	                    this._dataMask.style.display = 'none';
	                } else {
	                    this._dataMask.style.display = 'block';
	                }
	            }
	        }
	    }, {
	        key: '_dataEmpty',
	        value: function _dataEmpty() {
	            return !this._option || !this._option.list || this._option.list.length <= 0;
	        }
	    }]);

	    return Js2WordCloud;
	}();

	function _sortWorldCloud(option) {
	    option.list && option.list.sort(function (a, b) {
	        return b[1] - a[1];
	    });
	}

	function _renderShape(option) {
	    if (this._maskCanvas) {
	        option.clearCanvas = false;

	        /* Determine bgPixel by creating
	         another canvas and fill the specified background color. */
	        var bctx = window.document.createElement('canvas').getContext('2d');

	        bctx.fillStyle = option.backgroundColor || '#fff';
	        bctx.fillRect(0, 0, 1, 1);
	        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

	        var maskCanvasScaled = window.document.createElement('canvas');
	        maskCanvasScaled.width = this._canvas.width;
	        maskCanvasScaled.height = this._canvas.height;
	        var ctx = maskCanvasScaled.getContext('2d');

	        ctx.drawImage(this._maskCanvas, 0, 0, this._maskCanvas.width, this._maskCanvas.height, 0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

	        var imageData = ctx.getImageData(0, 0, maskCanvasScaled.width, maskCanvasScaled.height);
	        var newImageData = ctx.createImageData(imageData);
	        for (var i = 0; i < imageData.data.length; i += 4) {
	            if (imageData.data[i + 3] > 128) {
	                newImageData.data[i] = bgPixel[0];
	                newImageData.data[i + 1] = bgPixel[1];
	                newImageData.data[i + 2] = bgPixel[2];
	                newImageData.data[i + 3] = bgPixel[3];
	            } else {
	                // This color must not be the same w/ the bgPixel.
	                newImageData.data[i] = bgPixel[0];
	                newImageData.data[i + 1] = bgPixel[1];
	                newImageData.data[i + 2] = bgPixel[2];
	                newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 1;
	            }
	        }
	        ctx.putImageData(newImageData, 0, 0);

	        ctx = this._canvas.getContext('2d');
	        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
	        ctx.drawImage(maskCanvasScaled, 0, 0);
	    }

	    if (this._dataEmpty() && option && option.noDataLoadingOption) {
	        var STYLE = '';
	        if (option.noDataLoadingOption.textStyle) {
	            if (typeof option.noDataLoadingOption.textStyle.color === 'string') {
	                STYLE += 'color: ' + option.noDataLoadingOption.textStyle.color + ';';
	            }
	            if (typeof option.noDataLoadingOption.textStyle.fontSize === 'number') {
	                STYLE += 'font-size: ' + option.noDataLoadingOption.textStyle.fontSize + 'px;';
	            }
	        }
	        if (typeof option.noDataLoadingOption.backgroundColor === 'string') {
	            this._dataMask.style.backgroundColor = option.noDataLoadingOption.backgroundColor;
	        }
	        var TEXT = option.noDataLoadingOption.text || '';
	        this._showMask(LODAING_WRAPPTER_HTML_PRE + '<span class="__wc_no_data_text__" style="' + STYLE + '">' + TEXT + '</span>' + LODAING_WRAPPTER_HTML_END);
	    } else {
	        this._showMask('');
	        this._wordcloud2 = WordCloud(this._canvas, option);
	    }
	}

	function _circle(option) {
	    this._maskCanvas = window.document.createElement('canvas');
	    this._maskCanvas.width = 500;
	    this._maskCanvas.height = 500;
	    var ctx = this._maskCanvas.getContext('2d');
	    ctx.fillStyle = '#000000';
	    ctx.beginPath();
	    ctx.arc(250, 250, 240, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fill();

	    var imageData = ctx.getImageData(0, 0, this._maskCanvas.width, this._maskCanvas.height);
	    var newImageData = ctx.createImageData(imageData);

	    for (var i = 0; i < imageData.data.length; i += 4) {
	        var tone = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
	        var alpha = imageData.data[i + 3];

	        if (alpha < 128 || tone > 128 * 3) {
	            // Area not to draw
	            newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 255;
	            newImageData.data[i + 3] = 0;
	        } else {
	            // Area to draw
	            newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 0;
	            newImageData.data[i + 3] = 255;
	        }
	    }
	    ctx.putImageData(newImageData, 0, 0);
	    _renderShape.call(this, option);
	}

	function _imageShape(option) {
	    var _this2 = this;

	    var img = window.document.createElement('img');
	    img.crossOrigin = "Anonymous";
	    img.onload = function () {
	        _this2._maskCanvas = window.document.createElement('canvas');
	        _this2._maskCanvas.width = img.width;
	        _this2._maskCanvas.height = img.height;

	        var ctx = _this2._maskCanvas.getContext('2d');
	        ctx.drawImage(img, 0, 0, img.width, img.height);

	        var imageData = ctx.getImageData(0, 0, _this2._maskCanvas.width, _this2._maskCanvas.height);
	        var newImageData = ctx.createImageData(imageData);

	        for (var i = 0; i < imageData.data.length; i += 4) {
	            var tone = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
	            var alpha = imageData.data[i + 3];

	            if (alpha < 128 || tone > 128 * 3) {
	                // Area not to draw
	                newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 255;
	                newImageData.data[i + 3] = 0;
	            } else {
	                // Area to draw
	                newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 0;
	                newImageData.data[i + 3] = 255;
	            }
	        }
	        ctx.putImageData(newImageData, 0, 0);
	        _renderShape.call(_this2, option);
	    };

	    img.onerror = function () {
	        _renderShape.call(this, option);
	    };
	    img.src = option.imageShape;
	}

	module.exports = Js2WordCloud;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/*** IMPORTS FROM imports-loader ***/
	(function () {

	  /*!
	   * wordcloud2.js
	   * http://timdream.org/wordcloud2.js/
	   *
	   * Copyright 2011 - 2013 Tim Chien
	   * Released under the MIT license
	   */

	  'use strict';

	  // setImmediate

	  if (!window.setImmediate) {
	    window.setImmediate = function setupSetImmediate() {
	      return window.msSetImmediate || window.webkitSetImmediate || window.mozSetImmediate || window.oSetImmediate || function setupSetZeroTimeout() {
	        if (!window.postMessage || !window.addEventListener) {
	          return null;
	        }

	        var callbacks = [undefined];
	        var message = 'zero-timeout-message';

	        // Like setTimeout, but only takes a function argument.  There's
	        // no time argument (always zero) and no arguments (you have to
	        // use a closure).
	        var setZeroTimeout = function setZeroTimeout(callback) {
	          var id = callbacks.length;
	          callbacks.push(callback);
	          window.postMessage(message + id.toString(36), '*');

	          return id;
	        };

	        window.addEventListener('message', function setZeroTimeoutMessage(evt) {
	          // Skipping checking event source, retarded IE confused this window
	          // object with another in the presence of iframe
	          if (typeof evt.data !== 'string' || evt.data.substr(0, message.length) !== message /* ||
	                                                                                             evt.source !== window */) {
	              return;
	            }

	          evt.stopImmediatePropagation();

	          var id = parseInt(evt.data.substr(message.length), 36);
	          if (!callbacks[id]) {
	            return;
	          }

	          callbacks[id]();
	          callbacks[id] = undefined;
	        }, true);

	        /* specify clearImmediate() here since we need the scope */
	        window.clearImmediate = function clearZeroTimeout(id) {
	          if (!callbacks[id]) {
	            return;
	          }

	          callbacks[id] = undefined;
	        };

	        return setZeroTimeout;
	      }() ||
	      // fallback
	      function setImmediateFallback(fn) {
	        window.setTimeout(fn, 0);
	      };
	    }();
	  }

	  if (!window.clearImmediate) {
	    window.clearImmediate = function setupClearImmediate() {
	      return window.msClearImmediate || window.webkitClearImmediate || window.mozClearImmediate || window.oClearImmediate ||
	      // "clearZeroTimeout" is implement on the previous block ||
	      // fallback
	      function clearImmediateFallback(timer) {
	        window.clearTimeout(timer);
	      };
	    }();
	  }

	  (function (global) {

	    // Check if WordCloud can run on this browser
	    var isSupported = function isSupported() {
	      var canvas = document.createElement('canvas');
	      if (!canvas || !canvas.getContext) {
	        return false;
	      }

	      var ctx = canvas.getContext('2d');
	      if (!ctx.getImageData) {
	        return false;
	      }
	      if (!ctx.fillText) {
	        return false;
	      }

	      if (!Array.prototype.some) {
	        return false;
	      }
	      if (!Array.prototype.push) {
	        return false;
	      }

	      return true;
	    }();

	    // Find out if the browser impose minium font size by
	    // drawing small texts on a canvas and measure it's width.
	    var minFontSize = function getMinFontSize() {
	      if (!isSupported) {
	        return;
	      }

	      var ctx = document.createElement('canvas').getContext('2d');

	      // start from 20
	      var size = 20;

	      // two sizes to measure
	      var hanWidth, mWidth;

	      while (size) {
	        ctx.font = size.toString(10) + 'px sans-serif';
	        if (ctx.measureText('\uFF37').width === hanWidth && ctx.measureText('m').width === mWidth) {
	          return size + 1;
	        }

	        hanWidth = ctx.measureText('\uFF37').width;
	        mWidth = ctx.measureText('m').width;

	        size--;
	      }

	      return 0;
	    }();

	    // Based on http://jsfromhell.com/array/shuffle
	    var shuffleArray = function shuffleArray(arr) {
	      for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {}
	      return arr;
	    };

	    var WordCloud = function WordCloud(elements, options) {
	      if (!isSupported) {
	        return;
	      }

	      if (!Array.isArray(elements)) {
	        elements = [elements];
	      }

	      elements.forEach(function (el, i) {
	        if (typeof el === 'string') {
	          elements[i] = document.getElementById(el);
	          if (!elements[i]) {
	            throw 'The element id specified is not found.';
	          }
	        } else if (!el.tagName && !el.appendChild) {
	          throw 'You must pass valid HTML elements, or ID of the element.';
	        }
	      });

	      /* Default values to be overwritten by options object */
	      var settings = {
	        list: [],
	        fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' + '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
	        fontWeight: 'normal',
	        color: 'random-dark',
	        minSize: 0, // 0 to disable
	        weightFactor: 1,
	        clearCanvas: true,
	        backgroundColor: '#fff', // opaque white = rgba(255, 255, 255, 1)

	        gridSize: 8,
	        drawOutOfBound: false,
	        origin: null,

	        drawMask: false,
	        maskColor: 'rgba(255,0,0,0.3)',
	        maskGapWidth: 0.3,

	        wait: 0,
	        abortThreshold: 0, // disabled
	        abort: function noop() {},

	        minRotation: -Math.PI / 2,
	        maxRotation: Math.PI / 2,

	        shuffle: true,
	        rotateRatio: 0.1,

	        shape: 'circle',
	        ellipticity: 0.65,

	        classes: null,

	        hover: null,
	        click: null
	      };

	      if (options) {
	        for (var key in options) {
	          if (key in settings) {
	            settings[key] = options[key];
	          }
	        }
	      }

	      /* Convert weightFactor into a function */
	      if (typeof settings.weightFactor !== 'function') {
	        var factor = settings.weightFactor;
	        settings.weightFactor = function weightFactor(pt) {
	          return pt * factor; //in px
	        };
	      }

	      /* Convert shape into a function */
	      if (typeof settings.shape !== 'function') {
	        switch (settings.shape) {
	          case 'circle':
	          /* falls through */
	          default:
	            // 'circle' is the default and a shortcut in the code loop.
	            settings.shape = 'circle';
	            break;

	          case 'cardioid':
	            settings.shape = function shapeCardioid(theta) {
	              return 1 - Math.sin(theta);
	            };
	            break;

	          /*
	            To work out an X-gon, one has to calculate "m",
	          where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
	          http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
	          2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
	            Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
	          where t' equals to mod(t, 2PI/X);
	            */

	          case 'diamond':
	          case 'square':
	            // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	            // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
	            // +0+..+2*PI
	            settings.shape = function shapeSquare(theta) {
	              var thetaPrime = theta % (2 * Math.PI / 4);
	              return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
	            };
	            break;

	          case 'triangle-forward':
	            // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
	            // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
	            // %29%29%2C+t+%3D+0+..+2*PI
	            settings.shape = function shapeTriangle(theta) {
	              var thetaPrime = theta % (2 * Math.PI / 3);
	              return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
	            };
	            break;

	          case 'triangle':
	          case 'triangle-upright':
	            settings.shape = function shapeTriangle(theta) {
	              var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
	              return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
	            };
	            break;

	          case 'pentagon':
	            settings.shape = function shapePentagon(theta) {
	              var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
	              return 1 / (Math.cos(thetaPrime) + 0.726543 * Math.sin(thetaPrime));
	            };
	            break;

	          case 'star':
	            settings.shape = function shapeStar(theta) {
	              var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
	              if ((theta + 0.955) % (2 * Math.PI / 5) - 2 * Math.PI / 10 >= 0) {
	                return 1 / (Math.cos(2 * Math.PI / 10 - thetaPrime) + 3.07768 * Math.sin(2 * Math.PI / 10 - thetaPrime));
	              } else {
	                return 1 / (Math.cos(thetaPrime) + 3.07768 * Math.sin(thetaPrime));
	              }
	            };
	            break;
	        }
	      }

	      /* Make sure gridSize is a whole number and is not smaller than 4px */
	      settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

	      /* shorthand */
	      var g = settings.gridSize;
	      var maskRectWidth = g - settings.maskGapWidth;

	      /* normalize rotation settings */
	      var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
	      var minRotation = Math.min(settings.maxRotation, settings.minRotation);

	      /* information/object available to all functions, set when start() */
	      var grid, // 2d array containing filling information
	      ngx, ngy, // width and height of the grid
	      center, // position of the center of the cloud
	      maxRadius;

	      /* timestamp for measuring each putWord() action */
	      var escapeTime;

	      /* function for getting the color of the text */
	      var getTextColor;
	      function random_hsl_color(min, max) {
	        return 'hsl(' + (Math.random() * 360).toFixed() + ',' + (Math.random() * 30 + 70).toFixed() + '%,' + (Math.random() * (max - min) + min).toFixed() + '%)';
	      }
	      switch (settings.color) {
	        case 'random-dark':
	          getTextColor = function getRandomDarkColor() {
	            return random_hsl_color(10, 50);
	          };
	          break;

	        case 'random-light':
	          getTextColor = function getRandomLightColor() {
	            return random_hsl_color(50, 90);
	          };
	          break;

	        default:
	          if (typeof settings.color === 'function') {
	            getTextColor = settings.color;
	          }
	          break;
	      }

	      /* function for getting the classes of the text */
	      var getTextClasses = null;
	      if (typeof settings.classes === 'function') {
	        getTextClasses = settings.classes;
	      }

	      /* Interactive */
	      var interactive = false;
	      var infoGrid = [];
	      var hovered;

	      var getInfoGridFromMouseTouchEvent = function getInfoGridFromMouseTouchEvent(evt) {
	        var canvas = evt.currentTarget;
	        var rect = canvas.getBoundingClientRect();
	        var clientX;
	        var clientY;
	        /** Detect if touches are available */
	        if (evt.touches) {
	          clientX = evt.touches[0].clientX;
	          clientY = evt.touches[0].clientY;
	        } else {
	          clientX = evt.clientX;
	          clientY = evt.clientY;
	        }
	        var eventX = clientX - rect.left;
	        var eventY = clientY - rect.top;

	        var x = Math.floor(eventX * (canvas.width / rect.width || 1) / g);
	        var y = Math.floor(eventY * (canvas.height / rect.height || 1) / g);

	        return infoGrid[x][y];
	      };

	      var wordcloudhover = function wordcloudhover(evt) {
	        var info = getInfoGridFromMouseTouchEvent(evt);

	        if (hovered === info) {
	          return;
	        }

	        hovered = info;
	        if (!info) {
	          settings.hover(undefined, undefined, evt);

	          return;
	        }

	        settings.hover(info.item, info.dimension, evt);
	      };

	      var wordcloudclick = function wordcloudclick(evt) {
	        var info = getInfoGridFromMouseTouchEvent(evt);
	        if (!info) {
	          return;
	        }

	        settings.click(info.item, info.dimension, evt);
	        evt.preventDefault();
	      };

	      /* Get points on the grid for a given radius away from the center */
	      var pointsAtRadius = [];
	      var getPointsAtRadius = function getPointsAtRadius(radius) {
	        if (pointsAtRadius[radius]) {
	          return pointsAtRadius[radius];
	        }

	        // Look for these number of points on each radius
	        var T = radius * 8;

	        // Getting all the points at this radius
	        var t = T;
	        var points = [];

	        if (radius === 0) {
	          points.push([center[0], center[1], 0]);
	        }

	        while (t--) {
	          // distort the radius to put the cloud in shape
	          var rx = 1;
	          if (settings.shape !== 'circle') {
	            rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1
	          }

	          // Push [x, y, t]; t is used solely for getTextColor()
	          points.push([center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI), center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) * settings.ellipticity, t / T * 2 * Math.PI]);
	        }

	        pointsAtRadius[radius] = points;
	        return points;
	      };

	      /* Return true if we had spent too much time */
	      var exceedTime = function exceedTime() {
	        return settings.abortThreshold > 0 && new Date().getTime() - escapeTime > settings.abortThreshold;
	      };

	      /* Get the deg of rotation according to settings, and luck. */
	      var getRotateDeg = function getRotateDeg() {
	        if (settings.rotateRatio === 0) {
	          return 0;
	        }

	        if (Math.random() > settings.rotateRatio) {
	          return 0;
	        }

	        if (rotationRange === 0) {
	          return minRotation;
	        }

	        return minRotation + Math.random() * rotationRange;
	      };

	      var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
	        // calculate the acutal font size
	        // fontSize === 0 means weightFactor function wants the text skipped,
	        // and size < minSize means we cannot draw the text.
	        var debug = false;
	        var fontSize = settings.weightFactor(weight);
	        if (fontSize <= settings.minSize) {
	          return false;
	        }

	        // Scale factor here is to make sure fillText is not limited by
	        // the minium font size set by browser.
	        // It will always be 1 or 2n.
	        var mu = 1;
	        if (fontSize < minFontSize) {
	          mu = function calculateScaleFactor() {
	            var mu = 2;
	            while (mu * fontSize < minFontSize) {
	              mu += 2;
	            }
	            return mu;
	          }();
	        }

	        var fcanvas = document.createElement('canvas');
	        var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

	        fctx.font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	        // Estimate the dimension of the text with measureText().
	        var fw = fctx.measureText(word).width / mu;
	        var fh = Math.max(fontSize * mu, fctx.measureText('m').width, fctx.measureText('\uFF37').width) / mu;

	        // Create a boundary box that is larger than our estimates,
	        // so text don't get cut of (it sill might)
	        var boxWidth = fw + fh * 2;
	        var boxHeight = fh * 3;
	        var fgw = Math.ceil(boxWidth / g);
	        var fgh = Math.ceil(boxHeight / g);
	        boxWidth = fgw * g;
	        boxHeight = fgh * g;

	        // Calculate the proper offsets to make the text centered at
	        // the preferred position.

	        // This is simply half of the width.
	        var fillTextOffsetX = -fw / 2;
	        // Instead of moving the box to the exact middle of the preferred
	        // position, for Y-offset we move 0.4 instead, so Latin alphabets look
	        // vertical centered.
	        var fillTextOffsetY = -fh * 0.4;

	        // Calculate the actual dimension of the canvas, considering the rotation.
	        var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) + boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
	        var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) + boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
	        var width = cgw * g;
	        var height = cgh * g;

	        fcanvas.setAttribute('width', width);
	        fcanvas.setAttribute('height', height);

	        if (debug) {
	          // Attach fcanvas to the DOM
	          document.body.appendChild(fcanvas);
	          // Save it's state so that we could restore and draw the grid correctly.
	          fctx.save();
	        }

	        // Scale the canvas with |mu|.
	        fctx.scale(1 / mu, 1 / mu);
	        fctx.translate(width * mu / 2, height * mu / 2);
	        fctx.rotate(-rotateDeg);

	        // Once the width/height is set, ctx info will be reset.
	        // Set it again here.
	        fctx.font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

	        // Fill the text into the fcanvas.
	        // XXX: We cannot because textBaseline = 'top' here because
	        // Firefox and Chrome uses different default line-height for canvas.
	        // Please read https://bugzil.la/737852#c6.
	        // Here, we use textBaseline = 'middle' and draw the text at exactly
	        // 0.5 * fontSize lower.
	        fctx.fillStyle = '#000';
	        fctx.textBaseline = 'middle';
	        fctx.fillText(word, fillTextOffsetX * mu, (fillTextOffsetY + fontSize * 0.5) * mu);

	        // Get the pixels of the text
	        var imageData = fctx.getImageData(0, 0, width, height).data;

	        if (exceedTime()) {
	          return false;
	        }

	        if (debug) {
	          // Draw the box of the original estimation
	          fctx.strokeRect(fillTextOffsetX * mu, fillTextOffsetY, fw * mu, fh * mu);
	          fctx.restore();
	        }

	        // Read the pixels and save the information to the occupied array
	        var occupied = [];
	        var gx = cgw,
	            gy,
	            x,
	            y;
	        var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
	        while (gx--) {
	          gy = cgh;
	          while (gy--) {
	            y = g;
	            singleGridLoop: {
	              while (y--) {
	                x = g;
	                while (x--) {
	                  if (imageData[((gy * g + y) * width + (gx * g + x)) * 4 + 3]) {
	                    occupied.push([gx, gy]);

	                    if (gx < bounds[3]) {
	                      bounds[3] = gx;
	                    }
	                    if (gx > bounds[1]) {
	                      bounds[1] = gx;
	                    }
	                    if (gy < bounds[0]) {
	                      bounds[0] = gy;
	                    }
	                    if (gy > bounds[2]) {
	                      bounds[2] = gy;
	                    }

	                    if (debug) {
	                      fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	                      fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	                    }
	                    break singleGridLoop;
	                  }
	                }
	              }
	              if (debug) {
	                fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
	                fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
	              }
	            }
	          }
	        }

	        if (debug) {
	          fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
	          fctx.fillRect(bounds[3] * g, bounds[0] * g, (bounds[1] - bounds[3] + 1) * g, (bounds[2] - bounds[0] + 1) * g);
	        }

	        // Return information needed to create the text on the real canvas
	        return {
	          mu: mu,
	          occupied: occupied,
	          bounds: bounds,
	          gw: cgw,
	          gh: cgh,
	          fillTextOffsetX: fillTextOffsetX,
	          fillTextOffsetY: fillTextOffsetY,
	          fillTextWidth: fw,
	          fillTextHeight: fh,
	          fontSize: fontSize
	        };
	      };

	      /* Determine if there is room available in the given dimension */
	      var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
	        // Go through the occupied points,
	        // return false if the space is not available.
	        var i = occupied.length;
	        while (i--) {
	          var px = gx + occupied[i][0];
	          var py = gy + occupied[i][1];

	          if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	            if (!settings.drawOutOfBound) {
	              return false;
	            }
	            continue;
	          }

	          if (!grid[px][py]) {
	            return false;
	          }
	        }
	        return true;
	      };

	      /* Actually draw the text on the grid */
	      var drawText = function drawText(gx, gy, info, word, weight, distance, theta, rotateDeg, attributes) {

	        var fontSize = info.fontSize;
	        var color;
	        if (getTextColor) {
	          color = getTextColor(word, weight, fontSize, distance, theta);
	        } else {
	          color = settings.color;
	        }

	        var classes;
	        if (getTextClasses) {
	          classes = getTextClasses(word, weight, fontSize, distance, theta);
	        } else {
	          classes = settings.classes;
	        }

	        var dimension;
	        var bounds = info.bounds;
	        dimension = {
	          x: (gx + bounds[3]) * g,
	          y: (gy + bounds[0]) * g,
	          w: (bounds[1] - bounds[3] + 1) * g,
	          h: (bounds[2] - bounds[0] + 1) * g
	        };

	        elements.forEach(function (el) {
	          if (el.getContext) {
	            var ctx = el.getContext('2d');
	            var mu = info.mu;

	            // Save the current state before messing it
	            ctx.save();
	            ctx.scale(1 / mu, 1 / mu);

	            ctx.font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
	            ctx.fillStyle = color;

	            // Translate the canvas position to the origin coordinate of where
	            // the text should be put.
	            ctx.translate((gx + info.gw / 2) * g * mu, (gy + info.gh / 2) * g * mu);

	            if (rotateDeg !== 0) {
	              ctx.rotate(-rotateDeg);
	            }

	            // Finally, fill the text.

	            // XXX: We cannot because textBaseline = 'top' here because
	            // Firefox and Chrome uses different default line-height for canvas.
	            // Please read https://bugzil.la/737852#c6.
	            // Here, we use textBaseline = 'middle' and draw the text at exactly
	            // 0.5 * fontSize lower.
	            ctx.textBaseline = 'middle';
	            ctx.fillText(word, info.fillTextOffsetX * mu, (info.fillTextOffsetY + fontSize * 0.5) * mu);

	            // The below box is always matches how <span>s are positioned
	            /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
	              info.fillTextWidth, info.fillTextHeight); */

	            // Restore the state.
	            ctx.restore();
	          } else {
	            // drawText on DIV element
	            var span = document.createElement('span');
	            var transformRule = '';
	            transformRule = 'rotate(' + -rotateDeg / Math.PI * 180 + 'deg) ';
	            if (info.mu !== 1) {
	              transformRule += 'translateX(-' + info.fillTextWidth / 4 + 'px) ' + 'scale(' + 1 / info.mu + ')';
	            }
	            var styleRules = {
	              'position': 'absolute',
	              'display': 'block',
	              'font': settings.fontWeight + ' ' + fontSize * info.mu + 'px ' + settings.fontFamily,
	              'left': (gx + info.gw / 2) * g + info.fillTextOffsetX + 'px',
	              'top': (gy + info.gh / 2) * g + info.fillTextOffsetY + 'px',
	              'width': info.fillTextWidth + 'px',
	              'height': info.fillTextHeight + 'px',
	              'lineHeight': fontSize + 'px',
	              'whiteSpace': 'nowrap',
	              'transform': transformRule,
	              'webkitTransform': transformRule,
	              'msTransform': transformRule,
	              'transformOrigin': '50% 40%',
	              'webkitTransformOrigin': '50% 40%',
	              'msTransformOrigin': '50% 40%'
	            };
	            if (color) {
	              styleRules.color = color;
	            }
	            span.textContent = word;
	            for (var cssProp in styleRules) {
	              span.style[cssProp] = styleRules[cssProp];
	            }
	            if (attributes) {
	              for (var attribute in attributes) {
	                span.setAttribute(attribute, attributes[attribute]);
	              }
	            }
	            if (classes) {
	              span.className += classes;
	            }
	            el.appendChild(span);
	          }
	        });
	      };

	      /* Help function to updateGrid */
	      var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
	        if (x >= ngx || y >= ngy || x < 0 || y < 0) {
	          return;
	        }

	        grid[x][y] = false;

	        if (drawMask) {
	          var ctx = elements[0].getContext('2d');
	          ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
	        }

	        if (interactive) {
	          infoGrid[x][y] = { item: item, dimension: dimension };
	        }
	      };

	      /* Update the filling information of the given space with occupied points.
	         Draw the mask on the canvas if necessary. */
	      var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {
	        var occupied = info.occupied;
	        var drawMask = settings.drawMask;
	        var ctx;
	        if (drawMask) {
	          ctx = elements[0].getContext('2d');
	          ctx.save();
	          ctx.fillStyle = settings.maskColor;
	        }

	        var dimension;
	        if (interactive) {
	          var bounds = info.bounds;
	          dimension = {
	            x: (gx + bounds[3]) * g,
	            y: (gy + bounds[0]) * g,
	            w: (bounds[1] - bounds[3] + 1) * g,
	            h: (bounds[2] - bounds[0] + 1) * g
	          };
	        }

	        var i = occupied.length;
	        while (i--) {
	          var px = gx + occupied[i][0];
	          var py = gy + occupied[i][1];

	          if (px >= ngx || py >= ngy || px < 0 || py < 0) {
	            continue;
	          }

	          fillGridAt(px, py, drawMask, dimension, item);
	        }

	        if (drawMask) {
	          ctx.restore();
	        }
	      };

	      /* putWord() processes each item on the list,
	         calculate it's size and determine it's position, and actually
	         put it on the canvas. */
	      var putWord = function putWord(item) {
	        var word, weight, attributes;
	        if (Array.isArray(item)) {
	          word = item[0];
	          weight = item[1];
	        } else {
	          word = item.word;
	          weight = item.weight;
	          attributes = item.attributes;
	        }
	        var rotateDeg = getRotateDeg();

	        // get info needed to put the text onto the canvas
	        var info = getTextInfo(word, weight, rotateDeg);

	        // not getting the info means we shouldn't be drawing this one.
	        if (!info) {
	          return false;
	        }

	        if (exceedTime()) {
	          return false;
	        }

	        // If drawOutOfBound is set to false,
	        // skip the loop if we have already know the bounding box of
	        // word is larger than the canvas.
	        if (!settings.drawOutOfBound) {
	          var bounds = info.bounds;
	          if (bounds[1] - bounds[3] + 1 > ngx || bounds[2] - bounds[0] + 1 > ngy) {
	            return false;
	          }
	        }

	        // Determine the position to put the text by
	        // start looking for the nearest points
	        var r = maxRadius + 1;

	        var tryToPutWordAtPoint = function tryToPutWordAtPoint(gxy) {
	          var gx = Math.floor(gxy[0] - info.gw / 2);
	          var gy = Math.floor(gxy[1] - info.gh / 2);
	          var gw = info.gw;
	          var gh = info.gh;

	          // If we cannot fit the text at this position, return false
	          // and go to the next position.
	          if (!canFitText(gx, gy, gw, gh, info.occupied)) {
	            return false;
	          }

	          // Actually put the text on the canvas
	          drawText(gx, gy, info, word, weight, maxRadius - r, gxy[2], rotateDeg, attributes);

	          // Mark the spaces on the grid as filled
	          updateGrid(gx, gy, gw, gh, info, item);

	          // Return true so some() will stop and also return true.
	          return true;
	        };

	        while (r--) {
	          var points = getPointsAtRadius(maxRadius - r);

	          if (settings.shuffle) {
	            points = [].concat(points);
	            shuffleArray(points);
	          }

	          // Try to fit the words by looking at each point.
	          // array.some() will stop and return true
	          // when putWordAtPoint() returns true.
	          // If all the points returns false, array.some() returns false.
	          var drawn = points.some(tryToPutWordAtPoint);

	          if (drawn) {
	            // leave putWord() and return true
	            return true;
	          }
	        }
	        // we tried all distances but text won't fit, return false
	        return false;
	      };

	      /* Send DOM event to all elements. Will stop sending event and return
	         if the previous one is canceled (for cancelable events). */
	      var sendEvent = function sendEvent(type, cancelable, detail) {
	        if (cancelable) {
	          return !elements.some(function (el) {
	            var evt = document.createEvent('CustomEvent');
	            evt.initCustomEvent(type, true, cancelable, detail || {});
	            return !el.dispatchEvent(evt);
	          }, this);
	        } else {
	          elements.forEach(function (el) {
	            var evt = document.createEvent('CustomEvent');
	            evt.initCustomEvent(type, true, cancelable, detail || {});
	            el.dispatchEvent(evt);
	          }, this);
	        }
	      };

	      /* Start drawing on a canvas */
	      var start = function start() {
	        // For dimensions, clearCanvas etc.,
	        // we only care about the first element.
	        var canvas = elements[0];

	        if (canvas.getContext) {
	          ngx = Math.ceil(canvas.width / g);
	          ngy = Math.ceil(canvas.height / g);
	        } else {
	          var rect = canvas.getBoundingClientRect();
	          ngx = Math.ceil(rect.width / g);
	          ngy = Math.ceil(rect.height / g);
	        }

	        // Sending a wordcloudstart event which cause the previous loop to stop.
	        // Do nothing if the event is canceled.
	        if (!sendEvent('wordcloudstart', true)) {
	          return;
	        }

	        // Determine the center of the word cloud
	        center = settings.origin ? [settings.origin[0] / g, settings.origin[1] / g] : [ngx / 2, ngy / 2];

	        // Maxium radius to look for space
	        maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

	        /* Clear the canvas only if the clearCanvas is set,
	           if not, update the grid to the current canvas state */
	        grid = [];

	        var gx, gy, i;
	        if (!canvas.getContext || settings.clearCanvas) {
	          elements.forEach(function (el) {
	            if (el.getContext) {
	              var ctx = el.getContext('2d');
	              ctx.fillStyle = settings.backgroundColor;
	              ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	              ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
	            } else {
	              el.textContent = '';
	              el.style.backgroundColor = settings.backgroundColor;
	              el.style.position = 'relative';
	            }
	          });

	          /* fill the grid with empty state */
	          gx = ngx;
	          while (gx--) {
	            grid[gx] = [];
	            gy = ngy;
	            while (gy--) {
	              grid[gx][gy] = true;
	            }
	          }
	        } else {
	          /* Determine bgPixel by creating
	             another canvas and fill the specified background color. */
	          var bctx = document.createElement('canvas').getContext('2d');

	          bctx.fillStyle = settings.backgroundColor;
	          bctx.fillRect(0, 0, 1, 1);
	          var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

	          /* Read back the pixels of the canvas we got to tell which part of the
	             canvas is empty.
	             (no clearCanvas only works with a canvas, not divs) */
	          var imageData = canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

	          gx = ngx;
	          var x, y;
	          while (gx--) {
	            grid[gx] = [];
	            gy = ngy;
	            while (gy--) {
	              y = g;
	              singleGridLoop: while (y--) {
	                x = g;
	                while (x--) {
	                  i = 4;
	                  while (i--) {
	                    if (imageData[((gy * g + y) * ngx * g + (gx * g + x)) * 4 + i] !== bgPixel[i]) {
	                      grid[gx][gy] = false;
	                      break singleGridLoop;
	                    }
	                  }
	                }
	              }
	              if (grid[gx][gy] !== false) {
	                grid[gx][gy] = true;
	              }
	            }
	          }

	          imageData = bctx = bgPixel = undefined;
	        }

	        // fill the infoGrid with empty state if we need it
	        if (settings.hover || settings.click) {

	          interactive = true;

	          /* fill the grid with empty state */
	          gx = ngx + 1;
	          while (gx--) {
	            infoGrid[gx] = [];
	          }

	          if (settings.hover) {
	            canvas.addEventListener('mousemove', wordcloudhover);
	          }

	          if (settings.click) {
	            canvas.addEventListener('click', wordcloudclick);
	            canvas.addEventListener('touchstart', wordcloudclick);
	            canvas.addEventListener('touchend', function (e) {
	              e.preventDefault();
	            });
	            canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
	          }

	          canvas.addEventListener('wordcloudstart', function stopInteraction() {
	            canvas.removeEventListener('wordcloudstart', stopInteraction);

	            canvas.removeEventListener('mousemove', wordcloudhover);
	            canvas.removeEventListener('click', wordcloudclick);
	            hovered = undefined;
	          });
	        }

	        i = 0;
	        var loopingFunction, stoppingFunction;
	        if (settings.wait !== 0) {
	          loopingFunction = window.setTimeout;
	          stoppingFunction = window.clearTimeout;
	        } else {
	          loopingFunction = window.setImmediate;
	          stoppingFunction = window.clearImmediate;
	        }

	        var addEventListener = function addEventListener(type, listener) {
	          elements.forEach(function (el) {
	            el.addEventListener(type, listener);
	          }, this);
	        };

	        var removeEventListener = function removeEventListener(type, listener) {
	          elements.forEach(function (el) {
	            el.removeEventListener(type, listener);
	          }, this);
	        };

	        var anotherWordCloudStart = function anotherWordCloudStart() {
	          removeEventListener('wordcloudstart', anotherWordCloudStart);
	          stoppingFunction(timer);
	        };

	        addEventListener('wordcloudstart', anotherWordCloudStart);

	        var timer = loopingFunction(function loop() {
	          if (i >= settings.list.length) {
	            stoppingFunction(timer);
	            sendEvent('wordcloudstop', false);
	            removeEventListener('wordcloudstart', anotherWordCloudStart);

	            return;
	          }
	          escapeTime = new Date().getTime();
	          var drawn = putWord(settings.list[i]);
	          var canceled = !sendEvent('wordclouddrawn', true, {
	            item: settings.list[i], drawn: drawn });
	          if (exceedTime() || canceled) {
	            stoppingFunction(timer);
	            settings.abort();
	            sendEvent('wordcloudabort', false);
	            sendEvent('wordcloudstop', false);
	            removeEventListener('wordcloudstart', anotherWordCloudStart);
	            return;
	          }
	          i++;
	          timer = loopingFunction(loop, settings.wait);
	        }, settings.wait);
	      };

	      // All set, start the drawing
	      start();
	    };

	    WordCloud.isSupported = isSupported;
	    WordCloud.minFontSize = minFontSize;

	    // Expose the library as an AMD module
	    if (true) {
	      global.WordCloud = WordCloud;
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return WordCloud;
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports) {
	      module.exports = WordCloud;
	    } else {
	      global.WordCloud = WordCloud;
	    }
	  })(this); //jshint ignore:line
	}).call(window);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./spin.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./spin.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes __wc_loading_animation__ {\r\n  50% {\r\n    opacity: 0.3;\r\n    -webkit-transform: scale(0.4);\r\n            transform: scale(0.4); }\r\n\r\n  100% {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1); } }\r\n\r\n@keyframes __wc_loading_animation__ {\r\n  50% {\r\n    opacity: 0.3;\r\n    -webkit-transform: scale(0.4);\r\n            transform: scale(0.4); }\r\n\r\n  100% {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1); } }\r\n\r\n.__wc_loading_wrapper__ {\r\n  display: table;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.__wc_loading_wrapper_item__ {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n  text-align: center;\r\n  position: relative;\r\n  padding-right: 60px;\r\n  line-height: 1.4;\r\n}\r\n.__wc_loading_wrapper_item_inner__ {\r\n  position: relative;\r\n  text-align: left;\r\n  display: inline-block;\r\n}\r\n\r\n.__wc_loading__ {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: -40px;\r\n  margin-top: -6px;\r\n}\r\n\r\n  .__wc_loading__ > div:nth-child(1) {\r\n    top: 15px;\r\n    left: 0;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(2) {\r\n    top: 10.22726px;\r\n    left: 10.22726px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.12s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.12s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(3) {\r\n    top: 0;\r\n    left: 15px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.24s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.24s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(4) {\r\n    top: -10.22726px;\r\n    left: 10.22726px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.36s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.36s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(5) {\r\n    top: -15px;\r\n    left: 0;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.48s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.48s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(6) {\r\n    top: -10.22726px;\r\n    left: -10.22726px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.6s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.6s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(7) {\r\n    top: 0;\r\n    left: -15px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.72s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.72s infinite linear; }\r\n  .__wc_loading__ > div:nth-child(8) {\r\n    top: 10.22726px;\r\n    left: -10.22726px;\r\n    -webkit-animation: __wc_loading_animation__ 1s 0.84s infinite linear;\r\n            animation: __wc_loading_animation__ 1s 0.84s infinite linear; }\r\n  .__wc_loading__ > div {\r\n    background-color: #d3d3d3;\r\n    width: 10px;\r\n    height: 10px;\r\n    border-radius: 100%;\r\n    margin: 2px;\r\n    -webkit-animation-fill-mode: both;\r\n            animation-fill-mode: both;\r\n    position: absolute; \r\n  }", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var class2type = {};
	var types = ['Null', 'Undefined', 'Number', 'Boolean', 'String', 'Object', 'Function', 'Array', 'RegExp', 'Date'];
	for (var i = 0; i < types.length; i++) {
		class2type['[object ' + types[i] + ']'] = types[i].toLowerCase();
	}

	function getType(obj) {
		return class2type[Object.prototype.toString.call(obj)] || 'Object';
	}

	function isType(obj, type) {
		return getType(obj) === type;
	}

	exports.default = {
		copy: function copy(obj, deep) {
			if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') {
				return obj;
			}
			var i,
			    target = isType(obj, 'array') ? [] : {},
			    value,
			    valueType;
			for (i in obj) {
				value = obj[i];
				valueType = getType(value);
				if (deep && (valueType === 'array' || valueType === 'object')) {
					target[i] = this.copy(value);
				} else {
					target[i] = value;
				}
			}
			return target;
		}
	};

/***/ })
/******/ ])
});
;