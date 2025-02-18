(() => {
  // node_modules/sortablejs/modular/sortable.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var version = "1.15.0";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
    }
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = {
    capture: false,
    passive: false
  };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(el, selector) {
    if (!selector)
      return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }
  function closest(el, selector, ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;
      do {
        if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }
        if (el === ctx)
          break;
      } while (el = getParentOrHost(el));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
      }
    }
  }
  function css(el, prop, val) {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, "transform");
        if (transform && transform !== "none") {
          appliedTransforms = transform + " " + appliedTransforms;
        }
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window)
      return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      container = container || el.parentNode;
      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
            var containerRect = container.getBoundingClientRect();
            top -= containerRect.top + parseInt(css(container, "border-top-width"));
            left -= containerRect.left + parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
        } while (container = container.parentNode);
      }
    }
    if (undoScale && el !== window) {
      var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top,
      left,
      bottom,
      right,
      width,
      height
    };
  }
  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
    while (parent) {
      var parentSideVal = getRect(parent)[parentSide], visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible)
        return parent;
      if (parent === getWindowScrollingElement())
        break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  function getChild(el, childNum, options, includeDragEl) {
    var currentChild = 0, i = 0, children = el.children;
    while (i < children.length) {
      if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }
        currentChild++;
      }
      i++;
    }
    return null;
  }
  function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  function index(el, selector) {
    var index2 = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index2++;
      }
    }
    return index2;
  }
  function getRelativeScrollOffset(el) {
    var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i))
        continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
          return Number(i);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    if (!el || !el.getBoundingClientRect)
      return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css(elem);
        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf)
            return elem;
          gotSelf = true;
        }
      }
    } while (elem = elem.parentNode);
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function() {
      if (!_throttleTimeout) {
        var args = arguments, _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }
  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
  function AnimationStateManager() {
    var animationStates = [], animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation)
          return;
        var children = [].slice.call(this.el.children);
        children.forEach(function(child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });
          var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function")
            callback();
          return;
        }
        var animating = false, animationTime = 0;
        animationStates.forEach(function(state) {
          var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
          if (targetMatrix) {
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          }
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function() {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function")
            callback();
        } else {
          animationCallbackId = setTimeout(function() {
            if (typeof callback === "function")
              callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
          this.forRepaintDummy = repaint(target);
          css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function() {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }
  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      for (var option2 in defaults) {
        if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
          plugin[option2] = defaults[option2];
        }
      }
      plugins.forEach(function(p) {
        if (p.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function() {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName + "Global";
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
            sortable
          }, evt));
        }
        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread2({
            sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
      plugins.forEach(function(plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized;
        _extends(defaults2, initialized.defaults);
      });
      for (var option2 in sortable.options) {
        if (!sortable.options.hasOwnProperty(option2))
          continue;
        var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
        if (typeof modified !== "undefined") {
          sortable.options[option2] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function(plugin) {
        if (typeof plugin.eventProperties !== "function")
          return;
        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function(plugin) {
        if (!sortable[plugin.pluginName])
          return;
        if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl2 && rootEl2[expando];
    if (!sortable)
      return;
    var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl2;
    evt.from = fromEl || rootEl2;
    evt.item = targetEl || rootEl2;
    evt.clone = cloneEl2;
    evt.oldIndex = oldIndex2;
    evt.newIndex = newIndex2;
    evt.oldDraggableIndex = oldDraggableIndex2;
    evt.newDraggableIndex = newDraggableIndex2;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
    var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
    for (var option2 in allEventProperties) {
      evt[option2] = allEventProperties[option2];
    }
    if (rootEl2) {
      rootEl2.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var _excluded = ["evt"];
  var pluginEvent2 = function pluginEvent3(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable,
          name,
          originalEvent
        });
      }
    }, data));
  };
  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread2({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, info));
  }
  var dragEl;
  var parentEl;
  var ghostEl;
  var rootEl;
  var nextEl;
  var lastDownEl;
  var cloneEl;
  var cloneHidden;
  var oldIndex;
  var newIndex;
  var oldDraggableIndex;
  var newDraggableIndex;
  var activeGroup;
  var putSortable;
  var awaitingDragStarted = false;
  var ignoreNextClick = false;
  var sortables = [];
  var tapEvt;
  var touchEvt;
  var lastDx;
  var lastDy;
  var tapDistanceLeft;
  var tapDistanceTop;
  var moved;
  var lastTarget;
  var lastDirection;
  var pastFirstInvertThresh = false;
  var isCircumstantialInvert = false;
  var targetMoveDistance;
  var ghostRelativeParent;
  var ghostRelativeParentInitialScroll = [];
  var _silent = false;
  var savedInputChecked = [];
  var documentExists = typeof document !== "undefined";
  var PositionGhostAbsolutely = IOS;
  var CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float";
  var supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div");
  var supportCssPointerEvents = function() {
    if (!documentExists)
      return;
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement("x");
    el.style.cssText = "pointer-events:auto";
    return el.style.pointerEvents === "auto";
  }();
  var _detectDirection = function _detectDirection2(el, options) {
    var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === "flex") {
      return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    }
    if (elCSS.display === "grid") {
      return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
      var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
      return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
    }
    return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
  };
  var _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  };
  var _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
    var ret;
    sortables.some(function(sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable))
        return;
      var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  };
  var _prepareGroup = function _prepareGroup2(options) {
    function toFn(value, pull) {
      return function(to, from, dragEl2, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === "clone") {
          return value;
        } else if (typeof value === "function") {
          return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != "object") {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  };
  var _hideGhostForTarget = function _hideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "none");
    }
  };
  var _unhideGhostForTarget = function _unhideGhostForTarget2() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, "display", "");
    }
  };
  if (documentExists && !ChromeForAndroid) {
    document.addEventListener("click", function(evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        var event = {};
        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }
    this.el = el;
    this.options = options = _extends({}, options);
    el[expando] = this;
    var defaults2 = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl2) {
        dataTransfer.setData("Text", dragEl2.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults2);
    for (var name in defaults2) {
      !(name in options) && (options[name] = defaults2[name]);
    }
    _prepareGroup(options);
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      this.options.touchStartThreshold = 1;
    }
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el);
    options.store && options.store.get && this.sort(options.store.get(this) || []);
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(evt) {
      if (!evt.cancelable)
        return;
      var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
      _saveInputCheckedState(el);
      if (dragEl) {
        return;
      }
      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return;
      }
      if (originalTarget.isContentEditable) {
        return;
      }
      if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        return;
      }
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable);
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      } else if (filter) {
        filter = filter.split(",").some(function(criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el
            });
            pluginEvent2("filter", _this, {
              evt
            });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return;
        }
      }
      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      }
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(evt, touch, target) {
      var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn2() {
          pluginEvent2("delayEnded", _this, {
            evt
          });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          }
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          }
          _this._triggerDragStart(evt, touch);
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt
          });
          toggleClass(dragEl, options.chosenClass, true);
        };
        options.ignore.split(",").forEach(function(criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent2("delayStart", this, {
          evt
        });
        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
      var touch = e.touches ? e.touches[0] : e;
      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(evt, touch) {
      touch = touch || evt.pointerType == "touch" && evt;
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          _nextTick(function() {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
      }
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent2("dragStarted", this, {
          evt
        });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options;
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost();
        _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent)
            break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target,
                rootEl: parent
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent;
          } while (parent = parent.parentNode);
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      if (tapEvt) {
        var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }
          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
        if (PositionGhostAbsolutely) {
          ghostRelativeParent = container;
          while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl);
        css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function _onDragStart(evt, fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent2("dragStart", this, {
        evt
      });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent2("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.removeAttribute("id");
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      }
      _this.cloneId = _nextTick(function() {
        pluginEvent2("clone", _this);
        if (Sortable.eventCanceled)
          return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({
          sortable: _this,
          name: "clone"
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true);
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this);
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(evt) {
      var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
      if (_silent)
        return;
      function dragOverEvent(name, extra) {
        pluginEvent2(name, _this, _objectSpread2({
          evt,
          isOwner,
          axis: vertical ? "vertical" : "horizontal",
          revert,
          dragRect,
          targetRect,
          canSort,
          fromSortable,
          target,
          completed,
          onMove: function onMove(target2, after2) {
            return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
          },
          changed
        }, extra));
      }
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      }
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", {
          insertion
        });
        if (insertion) {
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          }
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function() {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        }
        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        }
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      }
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex,
          newDraggableIndex,
          originalEvent: evt
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled)
        return completedFired;
      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled)
          return completedFired;
        if (revert) {
          parentEl = rootEl;
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          if (elLastChild === dragEl) {
            return completed(false);
          }
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();
            if (elLastChild && elLastChild.nextSibling) {
              el.insertBefore(dragEl, elLastChild.nextSibling);
            } else {
              el.appendChild(dragEl);
            }
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
          var firstChild = getChild(el, 0, options, true);
          if (firstChild === dragEl) {
            return completed(false);
          }
          target = firstChild;
          targetRect = getRect(target);
          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
            capture();
            el.insertBefore(dragEl, firstChild);
            parentEl = el;
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }
          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;
          if (direction !== 0) {
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
          }
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling, after = false;
          after = direction === 1;
          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            }
            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }
            parentEl = dragEl.parentNode;
            if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(evt) {
      var el = this.el, options = this.options;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent2("drop", this, {
        evt
      });
      parentEl = dragEl && dragEl.parentNode;
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId);
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = "";
          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }
          toggleClass(dragEl, this.options.chosenClass, false);
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }
          if (Sortable.active) {
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt
            });
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent2("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function(el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
      for (; i < n; i++) {
        el = children[i];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order, useAnimation) {
      var items = {}, rootEl2 = this.el;
      this.toArray().forEach(function(id, i) {
        var el = rootEl2.children[i];
        if (closest(el, this.options.draggable, rootEl2, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function(id) {
        if (items[id]) {
          rootEl2.removeChild(items[id]);
          rootEl2.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },
    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent2("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      }
      Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
        el2.removeAttribute("draggable");
      });
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent2("hideClone", this);
        if (Sortable.eventCanceled)
          return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable2) {
      if (putSortable2.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent2("showClone", this);
        if (Sortable.eventCanceled)
          return;
        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    }
  };
  function _globalDragOver(evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl2;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsFirst(evt, vertical, sortable) {
    var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
    var spacer = 10;
    return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }
  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
    if (!invertSwap) {
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
    while (i--) {
      sum += str.charCodeAt(i);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  }
  if (documentExists) {
    on(document, "touchmove", function(evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  }
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild
  };
  Sortable.get = function(element) {
    return element[expando];
  };
  Sortable.mount = function() {
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    if (plugins2[0].constructor === Array)
      plugins2 = plugins2[0];
    plugins2.forEach(function(plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  Sortable.create = function(el, options) {
    return new Sortable(el, options);
  };
  Sortable.version = version;
  var autoScrolls = [];
  var scrollEl;
  var scrollRootEl;
  var scrolling = false;
  var lastAutoScrollX;
  var lastAutoScrollY;
  var touchEvt$1;
  var pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var fn in this) {
        if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
          this[fn] = this[fn].bind(this);
        }
      }
    }
    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;
        if (this.sortable.nativeDraggable) {
          on(document, "dragover", this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, "pointermove", this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, "touchmove", this._handleFallbackAutoScroll);
          } else {
            on(document, "mousemove", this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop3() {
        if (this.sortable.nativeDraggable) {
          off(document, "dragover", this._handleAutoScroll);
        } else {
          off(document, "pointermove", this._handleFallbackAutoScroll);
          off(document, "touchmove", this._handleFallbackAutoScroll);
          off(document, "mousemove", this._handleFallbackAutoScroll);
        }
        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;
        var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt;
        if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback);
          var ogElemScroller = getParentAutoScrollElement(elem, true);
          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval();
            pointerElemChangedInterval = setInterval(function() {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }
              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(autoScroll2) {
      clearInterval(autoScroll2.pid);
    });
    autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
    if (!options.scroll)
      return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
    var scrollThisInstance = false, scrollCustomFn;
    if (scrollRootEl !== rootEl2) {
      scrollRootEl = rootEl2;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;
      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl2, true);
      }
    }
    var layersOut = 0;
    var currentParent = scrollEl;
    do {
      var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
        canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
      }
      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }
      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);
        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          autoScrolls[layersOut].pid = setInterval(function() {
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1);
            }
            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
            if (typeof scrollCustomFn === "function") {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
                return;
              }
            }
            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }
      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
    scrolling = scrollThisInstance;
  }, 30);
  var drop = function drop2(_ref) {
    var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent)
      return;
    var toSortable = putSortable2 || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({
        dragEl: dragEl2,
        putSortable: putSortable2
      });
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex2 = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex2;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable2) {
        putSortable2.captureAnimationState();
      }
      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl2, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl2);
      }
      this.sortable.animateAll();
      if (putSortable2) {
        putSortable2.animateAll();
      }
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function onSpill2(_ref4) {
      var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
      var parentSortable = putSortable2 || this.sortable;
      parentSortable.captureAnimationState();
      dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
      parentSortable.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  var sortable_esm_default = Sortable;

  // packages/heloufir/resources/js/index.js
  document.addEventListener("livewire:initialized", function() {
    const elements = document.querySelectorAll(".kanban-col-container");
    [].forEach.call(elements, (el) => {
      const sortable = sortable_esm_default.create(el, {
        group: {
          name: "status-" + el.dataset.status,
          put: el.dataset.draggable === "1",
          pull: el.dataset.draggable === "1"
        },
        sort: true,
        animation: 200,
        filter: ".disable-draggable",
        onEnd: function(evt) {
          const componentId = document.querySelector(".fi-page").getAttribute("wire:id");
          if (Livewire.find(componentId).get("loadingActivated")) {
            Livewire.find(componentId).set("loading", true);
          }
          const itemEl = evt.item;
          const targetList = evt.to;
          const previousList = evt.from;
          const oldIndex2 = evt.oldIndex;
          const newIndex2 = evt.newIndex;
          if (evt.from.dataset.draggable) {
            const newOrder = document.kanbanUtilities.getNewOrderOfNewStatusRecord(itemEl).concat(sortable.toArray()).filter((value, index2, array) => array.indexOf(value) === index2).filter((item) => item !== "3mu");
            const data = {
              record: parseInt(itemEl.dataset.id) === Number(itemEl.dataset.id) ? +itemEl.dataset.id : itemEl.dataset.id,
              source: parseInt(previousList.dataset.status) === Number(previousList.dataset.status) ? +previousList.dataset.status : previousList.dataset.status,
              target: parseInt(targetList.dataset.status) === Number(targetList.dataset.status) ? +targetList.dataset.status : targetList.dataset.status,
              oldIndex: oldIndex2,
              newIndex: newIndex2,
              newOrder
            };
            let eventName;
            if (previousList !== targetList) {
              eventName = "filament-kanban.record-drag";
            } else {
              eventName = "filament-kanban.record-sort";
            }
            Livewire.dispatch(eventName, data);
          }
        }
      });
    });
  });
  document.kanbanUtilities = {};
  document.kanbanUtilities.getNewOrderOfNewStatusRecord = function(itemEl) {
    const parent = itemEl.parentElement;
    const records = parent.querySelectorAll(".kanban-cel");
    const newOrder = [];
    records.forEach((record) => {
      newOrder.push(record.dataset.id);
    });
    return newOrder;
  };
  document.kanbanUtilities.kanbanResizeHeight = function() {
    const kanban = document.querySelector(".kanban");
    if (kanban) {
      const topPosition = kanban.getBoundingClientRect().top;
      const distanceToBottom = window.innerHeight - topPosition;
      const minHeight = 500;
      const filamentSectionPaddingHeight = "2rem";
      let height = "";
      if (distanceToBottom > minHeight) {
        height = "calc(" + distanceToBottom + "px - " + filamentSectionPaddingHeight + ")";
      } else {
        height = minHeight + "px";
      }
      const styleElement = document.createElement("style");
      styleElement.textContent = `
                        .kanban {
                            height: ${height};
                        }
                    `;
      document.head.appendChild(styleElement);
    }
  };
  document.kanbanUtilities.selectedRecord = function() {
    setTimeout(() => {
      const url = new URL(window.location.href);
      const urlParams = url.searchParams;
      if (urlParams.has("selected")) {
        const selected = urlParams.get("selected");
        const recordTitle = document.querySelector('.kanban-cell[data-id="' + selected + '"] .kanban-cell-title');
        if (recordTitle) {
          recordTitle.click();
        }
      }
    }, 300);
  };
})();
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvcnRhYmxlanMvbW9kdWxhci9zb3J0YWJsZS5lc20uanMiLCAiLi4vLi4vcmVzb3VyY2VzL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiohXG4gKiBTb3J0YWJsZSAxLjE1LjBcbiAqIEBhdXRob3JcdFJ1YmFYYSAgIDx0cmFzaEBydWJheGEub3JnPlxuICogQGF1dGhvclx0b3dlbm0gICAgPG93ZW4yMzM1NUBnbWFpbC5jb20+XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpO1xuXG4gICAgaWYgKGVudW1lcmFibGVPbmx5KSB7XG4gICAgICBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgIGlmIChpICUgMikge1xuICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcblxuICB2YXIgdGFyZ2V0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG5cbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gIHJldHVybiBhcnIyO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG52YXIgdmVyc2lvbiA9IFwiMS4xNS4wXCI7XG5cbmZ1bmN0aW9uIHVzZXJBZ2VudChwYXR0ZXJuKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgcmV0dXJuICEhIC8qQF9fUFVSRV9fKi9uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHBhdHRlcm4pO1xuICB9XG59XG5cbnZhciBJRTExT3JMZXNzID0gdXNlckFnZW50KC8oPzpUcmlkZW50LipydlsgOl0/MTFcXC58bXNpZXxpZW1vYmlsZXxXaW5kb3dzIFBob25lKS9pKTtcbnZhciBFZGdlID0gdXNlckFnZW50KC9FZGdlL2kpO1xudmFyIEZpcmVGb3ggPSB1c2VyQWdlbnQoL2ZpcmVmb3gvaSk7XG52YXIgU2FmYXJpID0gdXNlckFnZW50KC9zYWZhcmkvaSkgJiYgIXVzZXJBZ2VudCgvY2hyb21lL2kpICYmICF1c2VyQWdlbnQoL2FuZHJvaWQvaSk7XG52YXIgSU9TID0gdXNlckFnZW50KC9pUChhZHxvZHxob25lKS9pKTtcbnZhciBDaHJvbWVGb3JBbmRyb2lkID0gdXNlckFnZW50KC9jaHJvbWUvaSkgJiYgdXNlckFnZW50KC9hbmRyb2lkL2kpO1xuXG52YXIgY2FwdHVyZU1vZGUgPSB7XG4gIGNhcHR1cmU6IGZhbHNlLFxuICBwYXNzaXZlOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gb24oZWwsIGV2ZW50LCBmbikge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgIUlFMTFPckxlc3MgJiYgY2FwdHVyZU1vZGUpO1xufVxuXG5mdW5jdGlvbiBvZmYoZWwsIGV2ZW50LCBmbikge1xuICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgIUlFMTFPckxlc3MgJiYgY2FwdHVyZU1vZGUpO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzKFxuLyoqSFRNTEVsZW1lbnQqL1xuZWwsXG4vKipTdHJpbmcqL1xuc2VsZWN0b3IpIHtcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuICBzZWxlY3RvclswXSA9PT0gJz4nICYmIChzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cmluZygxKSk7XG5cbiAgaWYgKGVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudE9ySG9zdChlbCkge1xuICByZXR1cm4gZWwuaG9zdCAmJiBlbCAhPT0gZG9jdW1lbnQgJiYgZWwuaG9zdC5ub2RlVHlwZSA/IGVsLmhvc3QgOiBlbC5wYXJlbnROb2RlO1xufVxuXG5mdW5jdGlvbiBjbG9zZXN0KFxuLyoqSFRNTEVsZW1lbnQqL1xuZWwsXG4vKipTdHJpbmcqL1xuc2VsZWN0b3IsXG4vKipIVE1MRWxlbWVudCovXG5jdHgsIGluY2x1ZGVDVFgpIHtcbiAgaWYgKGVsKSB7XG4gICAgY3R4ID0gY3R4IHx8IGRvY3VtZW50O1xuXG4gICAgZG8ge1xuICAgICAgaWYgKHNlbGVjdG9yICE9IG51bGwgJiYgKHNlbGVjdG9yWzBdID09PSAnPicgPyBlbC5wYXJlbnROb2RlID09PSBjdHggJiYgbWF0Y2hlcyhlbCwgc2VsZWN0b3IpIDogbWF0Y2hlcyhlbCwgc2VsZWN0b3IpKSB8fCBpbmNsdWRlQ1RYICYmIGVsID09PSBjdHgpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwgPT09IGN0eCkgYnJlYWs7XG4gICAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG4gICAgfSB3aGlsZSAoZWwgPSBnZXRQYXJlbnRPckhvc3QoZWwpKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgUl9TUEFDRSA9IC9cXHMrL2c7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsLCBuYW1lLCBzdGF0ZSkge1xuICBpZiAoZWwgJiYgbmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdFtzdGF0ZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykucmVwbGFjZShSX1NQQUNFLCAnICcpLnJlcGxhY2UoJyAnICsgbmFtZSArICcgJywgJyAnKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IChjbGFzc05hbWUgKyAoc3RhdGUgPyAnICcgKyBuYW1lIDogJycpKS5yZXBsYWNlKFJfU1BBQ0UsICcgJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNzcyhlbCwgcHJvcCwgdmFsKSB7XG4gIHZhciBzdHlsZSA9IGVsICYmIGVsLnN0eWxlO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRlZmF1bHRWaWV3ICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgdmFsID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgJycpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgdmFsID0gZWwuY3VycmVudFN0eWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvcCA9PT0gdm9pZCAwID8gdmFsIDogdmFsW3Byb3BdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIShwcm9wIGluIHN0eWxlKSAmJiBwcm9wLmluZGV4T2YoJ3dlYmtpdCcpID09PSAtMSkge1xuICAgICAgICBwcm9wID0gJy13ZWJraXQtJyArIHByb3A7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlW3Byb3BdID0gdmFsICsgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gJycgOiAncHgnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0cml4KGVsLCBzZWxmT25seSkge1xuICB2YXIgYXBwbGllZFRyYW5zZm9ybXMgPSAnJztcblxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIGFwcGxpZWRUcmFuc2Zvcm1zID0gZWw7XG4gIH0gZWxzZSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRyYW5zZm9ybSA9IGNzcyhlbCwgJ3RyYW5zZm9ybScpO1xuXG4gICAgICBpZiAodHJhbnNmb3JtICYmIHRyYW5zZm9ybSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGFwcGxpZWRUcmFuc2Zvcm1zID0gdHJhbnNmb3JtICsgJyAnICsgYXBwbGllZFRyYW5zZm9ybXM7XG4gICAgICB9XG4gICAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgICB9IHdoaWxlICghc2VsZk9ubHkgJiYgKGVsID0gZWwucGFyZW50Tm9kZSkpO1xuICB9XG5cbiAgdmFyIG1hdHJpeEZuID0gd2luZG93LkRPTU1hdHJpeCB8fCB3aW5kb3cuV2ViS2l0Q1NTTWF0cml4IHx8IHdpbmRvdy5DU1NNYXRyaXggfHwgd2luZG93Lk1TQ1NTTWF0cml4O1xuICAvKmpzaGludCAtVzA1NiAqL1xuXG4gIHJldHVybiBtYXRyaXhGbiAmJiBuZXcgbWF0cml4Rm4oYXBwbGllZFRyYW5zZm9ybXMpO1xufVxuXG5mdW5jdGlvbiBmaW5kKGN0eCwgdGFnTmFtZSwgaXRlcmF0b3IpIHtcbiAgaWYgKGN0eCkge1xuICAgIHZhciBsaXN0ID0gY3R4LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgbiA9IGxpc3QubGVuZ3RoO1xuXG4gICAgaWYgKGl0ZXJhdG9yKSB7XG4gICAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgICBpdGVyYXRvcihsaXN0W2ldLCBpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpIHtcbiAgdmFyIHNjcm9sbGluZ0VsZW1lbnQgPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50O1xuXG4gIGlmIChzY3JvbGxpbmdFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBcImJvdW5kaW5nIGNsaWVudCByZWN0XCIgb2YgZ2l2ZW4gZWxlbWVudFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgICAgICAgICAgICAgICAgICAgICBUaGUgZWxlbWVudCB3aG9zZSBib3VuZGluZ0NsaWVudFJlY3QgaXMgd2FudGVkXG4gKiBAcGFyYW0gIHtbQm9vbGVhbl19IHJlbGF0aXZlVG9Db250YWluaW5nQmxvY2sgIFdoZXRoZXIgdGhlIHJlY3Qgc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBjb250YWluaW5nIGJsb2NrIG9mIChpbmNsdWRpbmcpIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSAge1tCb29sZWFuXX0gcmVsYXRpdmVUb05vblN0YXRpY1BhcmVudCAgV2hldGhlciB0aGUgcmVjdCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIHJlbGF0aXZlIHBhcmVudCBvZiAoaW5jbHVkaW5nKSB0aGUgY29udGFpZW5yXG4gKiBAcGFyYW0gIHtbQm9vbGVhbl19IHVuZG9TY2FsZSAgICAgICAgICAgICAgICAgIFdoZXRoZXIgdGhlIGNvbnRhaW5lcidzIHNjYWxlKCkgc2hvdWxkIGJlIHVuZG9uZVxuICogQHBhcmFtICB7W0hUTUxFbGVtZW50XX0gY29udGFpbmVyICAgICAgICAgICAgICBUaGUgcGFyZW50IHRoZSBlbGVtZW50IHdpbGwgYmUgcGxhY2VkIGluXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBib3VuZGluZ0NsaWVudFJlY3Qgb2YgZWwsIHdpdGggc3BlY2lmaWVkIGFkanVzdG1lbnRzXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRSZWN0KGVsLCByZWxhdGl2ZVRvQ29udGFpbmluZ0Jsb2NrLCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50LCB1bmRvU2NhbGUsIGNvbnRhaW5lcikge1xuICBpZiAoIWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAmJiBlbCAhPT0gd2luZG93KSByZXR1cm47XG4gIHZhciBlbFJlY3QsIHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCwgaGVpZ2h0LCB3aWR0aDtcblxuICBpZiAoZWwgIT09IHdpbmRvdyAmJiBlbC5wYXJlbnROb2RlICYmIGVsICE9PSBnZXRXaW5kb3dTY3JvbGxpbmdFbGVtZW50KCkpIHtcbiAgICBlbFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0b3AgPSBlbFJlY3QudG9wO1xuICAgIGxlZnQgPSBlbFJlY3QubGVmdDtcbiAgICBib3R0b20gPSBlbFJlY3QuYm90dG9tO1xuICAgIHJpZ2h0ID0gZWxSZWN0LnJpZ2h0O1xuICAgIGhlaWdodCA9IGVsUmVjdC5oZWlnaHQ7XG4gICAgd2lkdGggPSBlbFJlY3Qud2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgdG9wID0gMDtcbiAgICBsZWZ0ID0gMDtcbiAgICBib3R0b20gPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgcmlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfVxuXG4gIGlmICgocmVsYXRpdmVUb0NvbnRhaW5pbmdCbG9jayB8fCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50KSAmJiBlbCAhPT0gd2luZG93KSB7XG4gICAgLy8gQWRqdXN0IGZvciB0cmFuc2xhdGUoKVxuICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBlbC5wYXJlbnROb2RlOyAvLyBzb2x2ZXMgIzExMjMgKHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3OTUzODA2LzYwODgzMTIpXG4gICAgLy8gTm90IG5lZWRlZCBvbiA8PSBJRTExXG5cbiAgICBpZiAoIUlFMTFPckxlc3MpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICYmIChjc3MoY29udGFpbmVyLCAndHJhbnNmb3JtJykgIT09ICdub25lJyB8fCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50ICYmIGNzcyhjb250YWluZXIsICdwb3NpdGlvbicpICE9PSAnc3RhdGljJykpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy8gU2V0IHJlbGF0aXZlIHRvIGVkZ2VzIG9mIHBhZGRpbmcgYm94IG9mIGNvbnRhaW5lclxuXG4gICAgICAgICAgdG9wIC09IGNvbnRhaW5lclJlY3QudG9wICsgcGFyc2VJbnQoY3NzKGNvbnRhaW5lciwgJ2JvcmRlci10b3Atd2lkdGgnKSk7XG4gICAgICAgICAgbGVmdCAtPSBjb250YWluZXJSZWN0LmxlZnQgKyBwYXJzZUludChjc3MoY29udGFpbmVyLCAnYm9yZGVyLWxlZnQtd2lkdGgnKSk7XG4gICAgICAgICAgYm90dG9tID0gdG9wICsgZWxSZWN0LmhlaWdodDtcbiAgICAgICAgICByaWdodCA9IGxlZnQgKyBlbFJlY3Qud2lkdGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXG4gICAgICB9IHdoaWxlIChjb250YWluZXIgPSBjb250YWluZXIucGFyZW50Tm9kZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHVuZG9TY2FsZSAmJiBlbCAhPT0gd2luZG93KSB7XG4gICAgLy8gQWRqdXN0IGZvciBzY2FsZSgpXG4gICAgdmFyIGVsTWF0cml4ID0gbWF0cml4KGNvbnRhaW5lciB8fCBlbCksXG4gICAgICAgIHNjYWxlWCA9IGVsTWF0cml4ICYmIGVsTWF0cml4LmEsXG4gICAgICAgIHNjYWxlWSA9IGVsTWF0cml4ICYmIGVsTWF0cml4LmQ7XG5cbiAgICBpZiAoZWxNYXRyaXgpIHtcbiAgICAgIHRvcCAvPSBzY2FsZVk7XG4gICAgICBsZWZ0IC89IHNjYWxlWDtcbiAgICAgIHdpZHRoIC89IHNjYWxlWDtcbiAgICAgIGhlaWdodCAvPSBzY2FsZVk7XG4gICAgICBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XG4gICAgICByaWdodCA9IGxlZnQgKyB3aWR0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogdG9wLFxuICAgIGxlZnQ6IGxlZnQsXG4gICAgYm90dG9tOiBib3R0b20sXG4gICAgcmlnaHQ6IHJpZ2h0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufVxuLyoqXG4gKiBDaGVja3MgaWYgYSBzaWRlIG9mIGFuIGVsZW1lbnQgaXMgc2Nyb2xsZWQgcGFzdCBhIHNpZGUgb2YgaXRzIHBhcmVudHNcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgZWwgICAgICAgICAgIFRoZSBlbGVtZW50IHdobydzIHNpZGUgYmVpbmcgc2Nyb2xsZWQgb3V0IG9mIHZpZXcgaXMgaW4gcXVlc3Rpb25cbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgZWxTaWRlICAgICAgIFNpZGUgb2YgdGhlIGVsZW1lbnQgaW4gcXVlc3Rpb24gKCd0b3AnLCAnbGVmdCcsICdyaWdodCcsICdib3R0b20nKVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICBwYXJlbnRTaWRlICAgU2lkZSBvZiB0aGUgcGFyZW50IGluIHF1ZXN0aW9uICgndG9wJywgJ2xlZnQnLCAncmlnaHQnLCAnYm90dG9tJylcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgICAgICAgIFRoZSBwYXJlbnQgc2Nyb2xsIGVsZW1lbnQgdGhhdCB0aGUgZWwncyBzaWRlIGlzIHNjcm9sbGVkIHBhc3QsIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gc3VjaCBlbGVtZW50XG4gKi9cblxuXG5mdW5jdGlvbiBpc1Njcm9sbGVkUGFzdChlbCwgZWxTaWRlLCBwYXJlbnRTaWRlKSB7XG4gIHZhciBwYXJlbnQgPSBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChlbCwgdHJ1ZSksXG4gICAgICBlbFNpZGVWYWwgPSBnZXRSZWN0KGVsKVtlbFNpZGVdO1xuICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIHZhciBwYXJlbnRTaWRlVmFsID0gZ2V0UmVjdChwYXJlbnQpW3BhcmVudFNpZGVdLFxuICAgICAgICB2aXNpYmxlID0gdm9pZCAwO1xuXG4gICAgaWYgKHBhcmVudFNpZGUgPT09ICd0b3AnIHx8IHBhcmVudFNpZGUgPT09ICdsZWZ0Jykge1xuICAgICAgdmlzaWJsZSA9IGVsU2lkZVZhbCA+PSBwYXJlbnRTaWRlVmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aXNpYmxlID0gZWxTaWRlVmFsIDw9IHBhcmVudFNpZGVWYWw7XG4gICAgfVxuXG4gICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gcGFyZW50O1xuICAgIGlmIChwYXJlbnQgPT09IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKSkgYnJlYWs7XG4gICAgcGFyZW50ID0gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQocGFyZW50LCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEdldHMgbnRoIGNoaWxkIG9mIGVsLCBpZ25vcmluZyBoaWRkZW4gY2hpbGRyZW4sIHNvcnRhYmxlJ3MgZWxlbWVudHMgKGRvZXMgbm90IGlnbm9yZSBjbG9uZSBpZiBpdCdzIHZpc2libGUpXG4gKiBhbmQgbm9uLWRyYWdnYWJsZSBlbGVtZW50c1xuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgICAgIFRoZSBwYXJlbnQgZWxlbWVudFxuICogQHBhcmFtICB7TnVtYmVyfSBjaGlsZE51bSAgICAgIFRoZSBpbmRleCBvZiB0aGUgY2hpbGRcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgICAgICBQYXJlbnQgU29ydGFibGUncyBvcHRpb25zXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgVGhlIGNoaWxkIGF0IGluZGV4IGNoaWxkTnVtLCBvciBudWxsIGlmIG5vdCBmb3VuZFxuICovXG5cblxuZnVuY3Rpb24gZ2V0Q2hpbGQoZWwsIGNoaWxkTnVtLCBvcHRpb25zLCBpbmNsdWRlRHJhZ0VsKSB7XG4gIHZhciBjdXJyZW50Q2hpbGQgPSAwLFxuICAgICAgaSA9IDAsXG4gICAgICBjaGlsZHJlbiA9IGVsLmNoaWxkcmVuO1xuXG4gIHdoaWxlIChpIDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgaWYgKGNoaWxkcmVuW2ldLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBjaGlsZHJlbltpXSAhPT0gU29ydGFibGUuZ2hvc3QgJiYgKGluY2x1ZGVEcmFnRWwgfHwgY2hpbGRyZW5baV0gIT09IFNvcnRhYmxlLmRyYWdnZWQpICYmIGNsb3Nlc3QoY2hpbGRyZW5baV0sIG9wdGlvbnMuZHJhZ2dhYmxlLCBlbCwgZmFsc2UpKSB7XG4gICAgICBpZiAoY3VycmVudENoaWxkID09PSBjaGlsZE51bSkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5baV07XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRDaGlsZCsrO1xuICAgIH1cblxuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGNoaWxkIGluIHRoZSBlbCwgaWdub3JpbmcgZ2hvc3RFbCBvciBpbnZpc2libGUgZWxlbWVudHMgKGNsb25lcylcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICAgICBQYXJlbnQgZWxlbWVudFxuICogQHBhcmFtICB7c2VsZWN0b3J9IHNlbGVjdG9yICAgIEFueSBvdGhlciBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSBpZ25vcmVkXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgVGhlIGxhc3QgY2hpbGQsIGlnbm9yaW5nIGdob3N0RWxcbiAqL1xuXG5cbmZ1bmN0aW9uIGxhc3RDaGlsZChlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIGxhc3QgPSBlbC5sYXN0RWxlbWVudENoaWxkO1xuXG4gIHdoaWxlIChsYXN0ICYmIChsYXN0ID09PSBTb3J0YWJsZS5naG9zdCB8fCBjc3MobGFzdCwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnIHx8IHNlbGVjdG9yICYmICFtYXRjaGVzKGxhc3QsIHNlbGVjdG9yKSkpIHtcbiAgICBsYXN0ID0gbGFzdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIGxhc3QgfHwgbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgYW4gZWxlbWVudCB3aXRoaW4gaXRzIHBhcmVudCBmb3IgYSBzZWxlY3RlZCBzZXQgb2ZcbiAqIGVsZW1lbnRzXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxcbiAqIEBwYXJhbSAge3NlbGVjdG9yfSBzZWxlY3RvclxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5cblxuZnVuY3Rpb24gaW5kZXgoZWwsIHNlbGVjdG9yKSB7XG4gIHZhciBpbmRleCA9IDA7XG5cbiAgaWYgKCFlbCB8fCAhZWwucGFyZW50Tm9kZSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cblxuICB3aGlsZSAoZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgaWYgKGVsLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdURU1QTEFURScgJiYgZWwgIT09IFNvcnRhYmxlLmNsb25lICYmICghc2VsZWN0b3IgfHwgbWF0Y2hlcyhlbCwgc2VsZWN0b3IpKSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIGdpdmVuIGVsZW1lbnQsIGFkZGVkIHdpdGggYWxsIHRoZSBzY3JvbGwgb2Zmc2V0cyBvZiBwYXJlbnQgZWxlbWVudHMuXG4gKiBUaGUgdmFsdWUgaXMgcmV0dXJuZWQgaW4gcmVhbCBwaXhlbHMuXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICAgICBPZmZzZXRzIGluIHRoZSBmb3JtYXQgb2YgW2xlZnQsIHRvcF1cbiAqL1xuXG5cbmZ1bmN0aW9uIGdldFJlbGF0aXZlU2Nyb2xsT2Zmc2V0KGVsKSB7XG4gIHZhciBvZmZzZXRMZWZ0ID0gMCxcbiAgICAgIG9mZnNldFRvcCA9IDAsXG4gICAgICB3aW5TY3JvbGxlciA9IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcblxuICBpZiAoZWwpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgZWxNYXRyaXggPSBtYXRyaXgoZWwpLFxuICAgICAgICAgIHNjYWxlWCA9IGVsTWF0cml4LmEsXG4gICAgICAgICAgc2NhbGVZID0gZWxNYXRyaXguZDtcbiAgICAgIG9mZnNldExlZnQgKz0gZWwuc2Nyb2xsTGVmdCAqIHNjYWxlWDtcbiAgICAgIG9mZnNldFRvcCArPSBlbC5zY3JvbGxUb3AgKiBzY2FsZVk7XG4gICAgfSB3aGlsZSAoZWwgIT09IHdpblNjcm9sbGVyICYmIChlbCA9IGVsLnBhcmVudE5vZGUpKTtcbiAgfVxuXG4gIHJldHVybiBbb2Zmc2V0TGVmdCwgb2Zmc2V0VG9wXTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG9iamVjdCB3aXRoaW4gdGhlIGdpdmVuIGFycmF5XG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyICAgQXJyYXkgdGhhdCBtYXkgb3IgbWF5IG5vdCBob2xkIHRoZSBvYmplY3RcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqICBBbiBvYmplY3QgdGhhdCBoYXMgYSBrZXktdmFsdWUgcGFpciB1bmlxdWUgdG8gYW5kIGlkZW50aWNhbCB0byBhIGtleS12YWx1ZSBwYWlyIGluIHRoZSBvYmplY3QgeW91IHdhbnQgdG8gZmluZFxuICogQHJldHVybiB7TnVtYmVyfSAgICAgIFRoZSBpbmRleCBvZiB0aGUgb2JqZWN0IGluIHRoZSBhcnJheSwgb3IgLTFcbiAqL1xuXG5cbmZ1bmN0aW9uIGluZGV4T2ZPYmplY3QoYXJyLCBvYmopIHtcbiAgZm9yICh2YXIgaSBpbiBhcnIpIHtcbiAgICBpZiAoIWFyci5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gPT09IGFycltpXVtrZXldKSByZXR1cm4gTnVtYmVyKGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQoZWwsIGluY2x1ZGVTZWxmKSB7XG4gIC8vIHNraXAgdG8gd2luZG93XG4gIGlmICghZWwgfHwgIWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkgcmV0dXJuIGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbiAgdmFyIGVsZW0gPSBlbDtcbiAgdmFyIGdvdFNlbGYgPSBmYWxzZTtcblxuICBkbyB7XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0byBnZXQgZWxlbSBjc3MgaWYgaXQgaXNuJ3QgZXZlbiBvdmVyZmxvd2luZyBpbiB0aGUgZmlyc3QgcGxhY2UgKHBlcmZvcm1hbmNlKVxuICAgIGlmIChlbGVtLmNsaWVudFdpZHRoIDwgZWxlbS5zY3JvbGxXaWR0aCB8fCBlbGVtLmNsaWVudEhlaWdodCA8IGVsZW0uc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICB2YXIgZWxlbUNTUyA9IGNzcyhlbGVtKTtcblxuICAgICAgaWYgKGVsZW0uY2xpZW50V2lkdGggPCBlbGVtLnNjcm9sbFdpZHRoICYmIChlbGVtQ1NTLm92ZXJmbG93WCA9PSAnYXV0bycgfHwgZWxlbUNTUy5vdmVyZmxvd1ggPT0gJ3Njcm9sbCcpIHx8IGVsZW0uY2xpZW50SGVpZ2h0IDwgZWxlbS5zY3JvbGxIZWlnaHQgJiYgKGVsZW1DU1Mub3ZlcmZsb3dZID09ICdhdXRvJyB8fCBlbGVtQ1NTLm92ZXJmbG93WSA9PSAnc2Nyb2xsJykpIHtcbiAgICAgICAgaWYgKCFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCB8fCBlbGVtID09PSBkb2N1bWVudC5ib2R5KSByZXR1cm4gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpO1xuICAgICAgICBpZiAoZ290U2VsZiB8fCBpbmNsdWRlU2VsZikgcmV0dXJuIGVsZW07XG4gICAgICAgIGdvdFNlbGYgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgfSB3aGlsZSAoZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSk7XG5cbiAgcmV0dXJuIGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKGRzdCwgc3JjKSB7XG4gIGlmIChkc3QgJiYgc3JjKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGRzdFtrZXldID0gc3JjW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRzdDtcbn1cblxuZnVuY3Rpb24gaXNSZWN0RXF1YWwocmVjdDEsIHJlY3QyKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHJlY3QxLnRvcCkgPT09IE1hdGgucm91bmQocmVjdDIudG9wKSAmJiBNYXRoLnJvdW5kKHJlY3QxLmxlZnQpID09PSBNYXRoLnJvdW5kKHJlY3QyLmxlZnQpICYmIE1hdGgucm91bmQocmVjdDEuaGVpZ2h0KSA9PT0gTWF0aC5yb3VuZChyZWN0Mi5oZWlnaHQpICYmIE1hdGgucm91bmQocmVjdDEud2lkdGgpID09PSBNYXRoLnJvdW5kKHJlY3QyLndpZHRoKTtcbn1cblxudmFyIF90aHJvdHRsZVRpbWVvdXQ7XG5cbmZ1bmN0aW9uIHRocm90dGxlKGNhbGxiYWNrLCBtcykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghX3Rocm90dGxlVGltZW91dCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChfdGhpcywgYXJnc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjay5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICB9XG5cbiAgICAgIF90aHJvdHRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3Rocm90dGxlVGltZW91dCA9IHZvaWQgMDtcbiAgICAgIH0sIG1zKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFRocm90dGxlKCkge1xuICBjbGVhclRpbWVvdXQoX3Rocm90dGxlVGltZW91dCk7XG4gIF90aHJvdHRsZVRpbWVvdXQgPSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHNjcm9sbEJ5KGVsLCB4LCB5KSB7XG4gIGVsLnNjcm9sbExlZnQgKz0geDtcbiAgZWwuc2Nyb2xsVG9wICs9IHk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKGVsKSB7XG4gIHZhciBQb2x5bWVyID0gd2luZG93LlBvbHltZXI7XG4gIHZhciAkID0gd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG87XG5cbiAgaWYgKFBvbHltZXIgJiYgUG9seW1lci5kb20pIHtcbiAgICByZXR1cm4gUG9seW1lci5kb20oZWwpLmNsb25lTm9kZSh0cnVlKTtcbiAgfSBlbHNlIGlmICgkKSB7XG4gICAgcmV0dXJuICQoZWwpLmNsb25lKHRydWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0UmVjdChlbCwgcmVjdCkge1xuICBjc3MoZWwsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICBjc3MoZWwsICd0b3AnLCByZWN0LnRvcCk7XG4gIGNzcyhlbCwgJ2xlZnQnLCByZWN0LmxlZnQpO1xuICBjc3MoZWwsICd3aWR0aCcsIHJlY3Qud2lkdGgpO1xuICBjc3MoZWwsICdoZWlnaHQnLCByZWN0LmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIHVuc2V0UmVjdChlbCkge1xuICBjc3MoZWwsICdwb3NpdGlvbicsICcnKTtcbiAgY3NzKGVsLCAndG9wJywgJycpO1xuICBjc3MoZWwsICdsZWZ0JywgJycpO1xuICBjc3MoZWwsICd3aWR0aCcsICcnKTtcbiAgY3NzKGVsLCAnaGVpZ2h0JywgJycpO1xufVxuXG52YXIgZXhwYW5kbyA9ICdTb3J0YWJsZScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuZnVuY3Rpb24gQW5pbWF0aW9uU3RhdGVNYW5hZ2VyKCkge1xuICB2YXIgYW5pbWF0aW9uU3RhdGVzID0gW10sXG4gICAgICBhbmltYXRpb25DYWxsYmFja0lkO1xuICByZXR1cm4ge1xuICAgIGNhcHR1cmVBbmltYXRpb25TdGF0ZTogZnVuY3Rpb24gY2FwdHVyZUFuaW1hdGlvblN0YXRlKCkge1xuICAgICAgYW5pbWF0aW9uU3RhdGVzID0gW107XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmltYXRpb24pIHJldHVybjtcbiAgICAgIHZhciBjaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZHJlbik7XG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAoY3NzKGNoaWxkLCAnZGlzcGxheScpID09PSAnbm9uZScgfHwgY2hpbGQgPT09IFNvcnRhYmxlLmdob3N0KSByZXR1cm47XG4gICAgICAgIGFuaW1hdGlvblN0YXRlcy5wdXNoKHtcbiAgICAgICAgICB0YXJnZXQ6IGNoaWxkLFxuICAgICAgICAgIHJlY3Q6IGdldFJlY3QoY2hpbGQpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBmcm9tUmVjdCA9IF9vYmplY3RTcHJlYWQyKHt9LCBhbmltYXRpb25TdGF0ZXNbYW5pbWF0aW9uU3RhdGVzLmxlbmd0aCAtIDFdLnJlY3QpOyAvLyBJZiBhbmltYXRpbmc6IGNvbXBlbnNhdGUgZm9yIGN1cnJlbnQgYW5pbWF0aW9uXG5cblxuICAgICAgICBpZiAoY2hpbGQudGhpc0FuaW1hdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgdmFyIGNoaWxkTWF0cml4ID0gbWF0cml4KGNoaWxkLCB0cnVlKTtcblxuICAgICAgICAgIGlmIChjaGlsZE1hdHJpeCkge1xuICAgICAgICAgICAgZnJvbVJlY3QudG9wIC09IGNoaWxkTWF0cml4LmY7XG4gICAgICAgICAgICBmcm9tUmVjdC5sZWZ0IC09IGNoaWxkTWF0cml4LmU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGQuZnJvbVJlY3QgPSBmcm9tUmVjdDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYWRkQW5pbWF0aW9uU3RhdGU6IGZ1bmN0aW9uIGFkZEFuaW1hdGlvblN0YXRlKHN0YXRlKSB7XG4gICAgICBhbmltYXRpb25TdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgfSxcbiAgICByZW1vdmVBbmltYXRpb25TdGF0ZTogZnVuY3Rpb24gcmVtb3ZlQW5pbWF0aW9uU3RhdGUodGFyZ2V0KSB7XG4gICAgICBhbmltYXRpb25TdGF0ZXMuc3BsaWNlKGluZGV4T2ZPYmplY3QoYW5pbWF0aW9uU3RhdGVzLCB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICB9KSwgMSk7XG4gICAgfSxcbiAgICBhbmltYXRlQWxsOiBmdW5jdGlvbiBhbmltYXRlQWxsKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGlvbkNhbGxiYWNrSWQpO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBhbmltYXRpbmcgPSBmYWxzZSxcbiAgICAgICAgICBhbmltYXRpb25UaW1lID0gMDtcbiAgICAgIGFuaW1hdGlvblN0YXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB2YXIgdGltZSA9IDAsXG4gICAgICAgICAgICB0YXJnZXQgPSBzdGF0ZS50YXJnZXQsXG4gICAgICAgICAgICBmcm9tUmVjdCA9IHRhcmdldC5mcm9tUmVjdCxcbiAgICAgICAgICAgIHRvUmVjdCA9IGdldFJlY3QodGFyZ2V0KSxcbiAgICAgICAgICAgIHByZXZGcm9tUmVjdCA9IHRhcmdldC5wcmV2RnJvbVJlY3QsXG4gICAgICAgICAgICBwcmV2VG9SZWN0ID0gdGFyZ2V0LnByZXZUb1JlY3QsXG4gICAgICAgICAgICBhbmltYXRpbmdSZWN0ID0gc3RhdGUucmVjdCxcbiAgICAgICAgICAgIHRhcmdldE1hdHJpeCA9IG1hdHJpeCh0YXJnZXQsIHRydWUpO1xuXG4gICAgICAgIGlmICh0YXJnZXRNYXRyaXgpIHtcbiAgICAgICAgICAvLyBDb21wZW5zYXRlIGZvciBjdXJyZW50IGFuaW1hdGlvblxuICAgICAgICAgIHRvUmVjdC50b3AgLT0gdGFyZ2V0TWF0cml4LmY7XG4gICAgICAgICAgdG9SZWN0LmxlZnQgLT0gdGFyZ2V0TWF0cml4LmU7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQudG9SZWN0ID0gdG9SZWN0O1xuXG4gICAgICAgIGlmICh0YXJnZXQudGhpc0FuaW1hdGlvbkR1cmF0aW9uKSB7XG4gICAgICAgICAgLy8gQ291bGQgYWxzbyBjaGVjayBpZiBhbmltYXRpbmdSZWN0IGlzIGJldHdlZW4gZnJvbVJlY3QgYW5kIHRvUmVjdFxuICAgICAgICAgIGlmIChpc1JlY3RFcXVhbChwcmV2RnJvbVJlY3QsIHRvUmVjdCkgJiYgIWlzUmVjdEVxdWFsKGZyb21SZWN0LCB0b1JlY3QpICYmIC8vIE1ha2Ugc3VyZSBhbmltYXRpbmdSZWN0IGlzIG9uIGxpbmUgYmV0d2VlbiB0b1JlY3QgJiBmcm9tUmVjdFxuICAgICAgICAgIChhbmltYXRpbmdSZWN0LnRvcCAtIHRvUmVjdC50b3ApIC8gKGFuaW1hdGluZ1JlY3QubGVmdCAtIHRvUmVjdC5sZWZ0KSA9PT0gKGZyb21SZWN0LnRvcCAtIHRvUmVjdC50b3ApIC8gKGZyb21SZWN0LmxlZnQgLSB0b1JlY3QubGVmdCkpIHtcbiAgICAgICAgICAgIC8vIElmIHJldHVybmluZyB0byBzYW1lIHBsYWNlIGFzIHN0YXJ0ZWQgZnJvbSBhbmltYXRpb24gYW5kIG9uIHNhbWUgYXhpc1xuICAgICAgICAgICAgdGltZSA9IGNhbGN1bGF0ZVJlYWxUaW1lKGFuaW1hdGluZ1JlY3QsIHByZXZGcm9tUmVjdCwgcHJldlRvUmVjdCwgX3RoaXMub3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIGlmIGZyb21SZWN0ICE9IHRvUmVjdDogYW5pbWF0ZVxuXG5cbiAgICAgICAgaWYgKCFpc1JlY3RFcXVhbCh0b1JlY3QsIGZyb21SZWN0KSkge1xuICAgICAgICAgIHRhcmdldC5wcmV2RnJvbVJlY3QgPSBmcm9tUmVjdDtcbiAgICAgICAgICB0YXJnZXQucHJldlRvUmVjdCA9IHRvUmVjdDtcblxuICAgICAgICAgIGlmICghdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IF90aGlzLm9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzLmFuaW1hdGUodGFyZ2V0LCBhbmltYXRpbmdSZWN0LCB0b1JlY3QsIHRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICBhbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgIGFuaW1hdGlvblRpbWUgPSBNYXRoLm1heChhbmltYXRpb25UaW1lLCB0aW1lKTtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGFyZ2V0LmFuaW1hdGlvblJlc2V0VGltZXIpO1xuICAgICAgICAgIHRhcmdldC5hbmltYXRpb25SZXNldFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXQuYW5pbWF0aW9uVGltZSA9IDA7XG4gICAgICAgICAgICB0YXJnZXQucHJldkZyb21SZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIHRhcmdldC5mcm9tUmVjdCA9IG51bGw7XG4gICAgICAgICAgICB0YXJnZXQucHJldlRvUmVjdCA9IG51bGw7XG4gICAgICAgICAgICB0YXJnZXQudGhpc0FuaW1hdGlvbkR1cmF0aW9uID0gbnVsbDtcbiAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICB0YXJnZXQudGhpc0FuaW1hdGlvbkR1cmF0aW9uID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjbGVhclRpbWVvdXQoYW5pbWF0aW9uQ2FsbGJhY2tJZCk7XG5cbiAgICAgIGlmICghYW5pbWF0aW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRpb25DYWxsYmFja0lkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgfSwgYW5pbWF0aW9uVGltZSk7XG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGlvblN0YXRlcyA9IFtdO1xuICAgIH0sXG4gICAgYW5pbWF0ZTogZnVuY3Rpb24gYW5pbWF0ZSh0YXJnZXQsIGN1cnJlbnRSZWN0LCB0b1JlY3QsIGR1cmF0aW9uKSB7XG4gICAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgICAgY3NzKHRhcmdldCwgJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICAgIGNzcyh0YXJnZXQsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgICAgIHZhciBlbE1hdHJpeCA9IG1hdHJpeCh0aGlzLmVsKSxcbiAgICAgICAgICAgIHNjYWxlWCA9IGVsTWF0cml4ICYmIGVsTWF0cml4LmEsXG4gICAgICAgICAgICBzY2FsZVkgPSBlbE1hdHJpeCAmJiBlbE1hdHJpeC5kLFxuICAgICAgICAgICAgdHJhbnNsYXRlWCA9IChjdXJyZW50UmVjdC5sZWZ0IC0gdG9SZWN0LmxlZnQpIC8gKHNjYWxlWCB8fCAxKSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSAoY3VycmVudFJlY3QudG9wIC0gdG9SZWN0LnRvcCkgLyAoc2NhbGVZIHx8IDEpO1xuICAgICAgICB0YXJnZXQuYW5pbWF0aW5nWCA9ICEhdHJhbnNsYXRlWDtcbiAgICAgICAgdGFyZ2V0LmFuaW1hdGluZ1kgPSAhIXRyYW5zbGF0ZVk7XG4gICAgICAgIGNzcyh0YXJnZXQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAncHgsJyArIHRyYW5zbGF0ZVkgKyAncHgsMCknKTtcbiAgICAgICAgdGhpcy5mb3JSZXBhaW50RHVtbXkgPSByZXBhaW50KHRhcmdldCk7IC8vIHJlcGFpbnRcblxuICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNpdGlvbicsICd0cmFuc2Zvcm0gJyArIGR1cmF0aW9uICsgJ21zJyArICh0aGlzLm9wdGlvbnMuZWFzaW5nID8gJyAnICsgdGhpcy5vcHRpb25zLmVhc2luZyA6ICcnKSk7XG4gICAgICAgIGNzcyh0YXJnZXQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMCwwLDApJyk7XG4gICAgICAgIHR5cGVvZiB0YXJnZXQuYW5pbWF0ZWQgPT09ICdudW1iZXInICYmIGNsZWFyVGltZW91dCh0YXJnZXQuYW5pbWF0ZWQpO1xuICAgICAgICB0YXJnZXQuYW5pbWF0ZWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNpdGlvbicsICcnKTtcbiAgICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJycpO1xuICAgICAgICAgIHRhcmdldC5hbmltYXRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRhcmdldC5hbmltYXRpbmdYID0gZmFsc2U7XG4gICAgICAgICAgdGFyZ2V0LmFuaW1hdGluZ1kgPSBmYWxzZTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVwYWludCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5vZmZzZXRXaWR0aDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlUmVhbFRpbWUoYW5pbWF0aW5nUmVjdCwgZnJvbVJlY3QsIHRvUmVjdCwgb3B0aW9ucykge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KGZyb21SZWN0LnRvcCAtIGFuaW1hdGluZ1JlY3QudG9wLCAyKSArIE1hdGgucG93KGZyb21SZWN0LmxlZnQgLSBhbmltYXRpbmdSZWN0LmxlZnQsIDIpKSAvIE1hdGguc3FydChNYXRoLnBvdyhmcm9tUmVjdC50b3AgLSB0b1JlY3QudG9wLCAyKSArIE1hdGgucG93KGZyb21SZWN0LmxlZnQgLSB0b1JlY3QubGVmdCwgMikpICogb3B0aW9ucy5hbmltYXRpb247XG59XG5cbnZhciBwbHVnaW5zID0gW107XG52YXIgZGVmYXVsdHMgPSB7XG4gIGluaXRpYWxpemVCeURlZmF1bHQ6IHRydWVcbn07XG52YXIgUGx1Z2luTWFuYWdlciA9IHtcbiAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KHBsdWdpbikge1xuICAgIC8vIFNldCBkZWZhdWx0IHN0YXRpYyBwcm9wZXJ0aWVzXG4gICAgZm9yICh2YXIgb3B0aW9uIGluIGRlZmF1bHRzKSB7XG4gICAgICBpZiAoZGVmYXVsdHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSAmJiAhKG9wdGlvbiBpbiBwbHVnaW4pKSB7XG4gICAgICAgIHBsdWdpbltvcHRpb25dID0gZGVmYXVsdHNbb3B0aW9uXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIGlmIChwLnBsdWdpbk5hbWUgPT09IHBsdWdpbi5wbHVnaW5OYW1lKSB7XG4gICAgICAgIHRocm93IFwiU29ydGFibGU6IENhbm5vdCBtb3VudCBwbHVnaW4gXCIuY29uY2F0KHBsdWdpbi5wbHVnaW5OYW1lLCBcIiBtb3JlIHRoYW4gb25jZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgfSxcbiAgcGx1Z2luRXZlbnQ6IGZ1bmN0aW9uIHBsdWdpbkV2ZW50KGV2ZW50TmFtZSwgc29ydGFibGUsIGV2dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLmV2ZW50Q2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIGV2dC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5ldmVudENhbmNlbGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGV2ZW50TmFtZUdsb2JhbCA9IGV2ZW50TmFtZSArICdHbG9iYWwnO1xuICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICBpZiAoIXNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXSkgcmV0dXJuOyAvLyBGaXJlIGdsb2JhbCBldmVudHMgaWYgaXQgZXhpc3RzIGluIHRoaXMgc29ydGFibGVcblxuICAgICAgaWYgKHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXVtldmVudE5hbWVHbG9iYWxdKSB7XG4gICAgICAgIHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXVtldmVudE5hbWVHbG9iYWxdKF9vYmplY3RTcHJlYWQyKHtcbiAgICAgICAgICBzb3J0YWJsZTogc29ydGFibGVcbiAgICAgICAgfSwgZXZ0KSk7XG4gICAgICB9IC8vIE9ubHkgZmlyZSBwbHVnaW4gZXZlbnQgaWYgcGx1Z2luIGlzIGVuYWJsZWQgaW4gdGhpcyBzb3J0YWJsZSxcbiAgICAgIC8vIGFuZCBwbHVnaW4gaGFzIGV2ZW50IGRlZmluZWRcblxuXG4gICAgICBpZiAoc29ydGFibGUub3B0aW9uc1twbHVnaW4ucGx1Z2luTmFtZV0gJiYgc29ydGFibGVbcGx1Z2luLnBsdWdpbk5hbWVdW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgc29ydGFibGVbcGx1Z2luLnBsdWdpbk5hbWVdW2V2ZW50TmFtZV0oX29iamVjdFNwcmVhZDIoe1xuICAgICAgICAgIHNvcnRhYmxlOiBzb3J0YWJsZVxuICAgICAgICB9LCBldnQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgaW5pdGlhbGl6ZVBsdWdpbnM6IGZ1bmN0aW9uIGluaXRpYWxpemVQbHVnaW5zKHNvcnRhYmxlLCBlbCwgZGVmYXVsdHMsIG9wdGlvbnMpIHtcbiAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgdmFyIHBsdWdpbk5hbWUgPSBwbHVnaW4ucGx1Z2luTmFtZTtcbiAgICAgIGlmICghc29ydGFibGUub3B0aW9uc1twbHVnaW5OYW1lXSAmJiAhcGx1Z2luLmluaXRpYWxpemVCeURlZmF1bHQpIHJldHVybjtcbiAgICAgIHZhciBpbml0aWFsaXplZCA9IG5ldyBwbHVnaW4oc29ydGFibGUsIGVsLCBzb3J0YWJsZS5vcHRpb25zKTtcbiAgICAgIGluaXRpYWxpemVkLnNvcnRhYmxlID0gc29ydGFibGU7XG4gICAgICBpbml0aWFsaXplZC5vcHRpb25zID0gc29ydGFibGUub3B0aW9ucztcbiAgICAgIHNvcnRhYmxlW3BsdWdpbk5hbWVdID0gaW5pdGlhbGl6ZWQ7IC8vIEFkZCBkZWZhdWx0IG9wdGlvbnMgZnJvbSBwbHVnaW5cblxuICAgICAgX2V4dGVuZHMoZGVmYXVsdHMsIGluaXRpYWxpemVkLmRlZmF1bHRzKTtcbiAgICB9KTtcblxuICAgIGZvciAodmFyIG9wdGlvbiBpbiBzb3J0YWJsZS5vcHRpb25zKSB7XG4gICAgICBpZiAoIXNvcnRhYmxlLm9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkgY29udGludWU7XG4gICAgICB2YXIgbW9kaWZpZWQgPSB0aGlzLm1vZGlmeU9wdGlvbihzb3J0YWJsZSwgb3B0aW9uLCBzb3J0YWJsZS5vcHRpb25zW29wdGlvbl0pO1xuXG4gICAgICBpZiAodHlwZW9mIG1vZGlmaWVkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzb3J0YWJsZS5vcHRpb25zW29wdGlvbl0gPSBtb2RpZmllZDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGdldEV2ZW50UHJvcGVydGllczogZnVuY3Rpb24gZ2V0RXZlbnRQcm9wZXJ0aWVzKG5hbWUsIHNvcnRhYmxlKSB7XG4gICAgdmFyIGV2ZW50UHJvcGVydGllcyA9IHt9O1xuICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbi5ldmVudFByb3BlcnRpZXMgIT09ICdmdW5jdGlvbicpIHJldHVybjtcblxuICAgICAgX2V4dGVuZHMoZXZlbnRQcm9wZXJ0aWVzLCBwbHVnaW4uZXZlbnRQcm9wZXJ0aWVzLmNhbGwoc29ydGFibGVbcGx1Z2luLnBsdWdpbk5hbWVdLCBuYW1lKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGV2ZW50UHJvcGVydGllcztcbiAgfSxcbiAgbW9kaWZ5T3B0aW9uOiBmdW5jdGlvbiBtb2RpZnlPcHRpb24oc29ydGFibGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1vZGlmaWVkVmFsdWU7XG4gICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgIC8vIFBsdWdpbiBtdXN0IGV4aXN0IG9uIHRoZSBTb3J0YWJsZVxuICAgICAgaWYgKCFzb3J0YWJsZVtwbHVnaW4ucGx1Z2luTmFtZV0pIHJldHVybjsgLy8gSWYgc3RhdGljIG9wdGlvbiBsaXN0ZW5lciBleGlzdHMgZm9yIHRoaXMgb3B0aW9uLCBjYWxsIGluIHRoZSBjb250ZXh0IG9mIHRoZSBTb3J0YWJsZSdzIGluc3RhbmNlIG9mIHRoaXMgcGx1Z2luXG5cbiAgICAgIGlmIChwbHVnaW4ub3B0aW9uTGlzdGVuZXJzICYmIHR5cGVvZiBwbHVnaW4ub3B0aW9uTGlzdGVuZXJzW25hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1vZGlmaWVkVmFsdWUgPSBwbHVnaW4ub3B0aW9uTGlzdGVuZXJzW25hbWVdLmNhbGwoc29ydGFibGVbcGx1Z2luLnBsdWdpbk5hbWVdLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vZGlmaWVkVmFsdWU7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoX3JlZikge1xuICB2YXIgc29ydGFibGUgPSBfcmVmLnNvcnRhYmxlLFxuICAgICAgcm9vdEVsID0gX3JlZi5yb290RWwsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgdGFyZ2V0RWwgPSBfcmVmLnRhcmdldEVsLFxuICAgICAgY2xvbmVFbCA9IF9yZWYuY2xvbmVFbCxcbiAgICAgIHRvRWwgPSBfcmVmLnRvRWwsXG4gICAgICBmcm9tRWwgPSBfcmVmLmZyb21FbCxcbiAgICAgIG9sZEluZGV4ID0gX3JlZi5vbGRJbmRleCxcbiAgICAgIG5ld0luZGV4ID0gX3JlZi5uZXdJbmRleCxcbiAgICAgIG9sZERyYWdnYWJsZUluZGV4ID0gX3JlZi5vbGREcmFnZ2FibGVJbmRleCxcbiAgICAgIG5ld0RyYWdnYWJsZUluZGV4ID0gX3JlZi5uZXdEcmFnZ2FibGVJbmRleCxcbiAgICAgIG9yaWdpbmFsRXZlbnQgPSBfcmVmLm9yaWdpbmFsRXZlbnQsXG4gICAgICBwdXRTb3J0YWJsZSA9IF9yZWYucHV0U29ydGFibGUsXG4gICAgICBleHRyYUV2ZW50UHJvcGVydGllcyA9IF9yZWYuZXh0cmFFdmVudFByb3BlcnRpZXM7XG4gIHNvcnRhYmxlID0gc29ydGFibGUgfHwgcm9vdEVsICYmIHJvb3RFbFtleHBhbmRvXTtcbiAgaWYgKCFzb3J0YWJsZSkgcmV0dXJuO1xuICB2YXIgZXZ0LFxuICAgICAgb3B0aW9ucyA9IHNvcnRhYmxlLm9wdGlvbnMsXG4gICAgICBvbk5hbWUgPSAnb24nICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc3Vic3RyKDEpOyAvLyBTdXBwb3J0IGZvciBuZXcgQ3VzdG9tRXZlbnQgZmVhdHVyZVxuXG4gIGlmICh3aW5kb3cuQ3VzdG9tRXZlbnQgJiYgIUlFMTFPckxlc3MgJiYgIUVkZ2UpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuICB9XG5cbiAgZXZ0LnRvID0gdG9FbCB8fCByb290RWw7XG4gIGV2dC5mcm9tID0gZnJvbUVsIHx8IHJvb3RFbDtcbiAgZXZ0Lml0ZW0gPSB0YXJnZXRFbCB8fCByb290RWw7XG4gIGV2dC5jbG9uZSA9IGNsb25lRWw7XG4gIGV2dC5vbGRJbmRleCA9IG9sZEluZGV4O1xuICBldnQubmV3SW5kZXggPSBuZXdJbmRleDtcbiAgZXZ0Lm9sZERyYWdnYWJsZUluZGV4ID0gb2xkRHJhZ2dhYmxlSW5kZXg7XG4gIGV2dC5uZXdEcmFnZ2FibGVJbmRleCA9IG5ld0RyYWdnYWJsZUluZGV4O1xuICBldnQub3JpZ2luYWxFdmVudCA9IG9yaWdpbmFsRXZlbnQ7XG4gIGV2dC5wdWxsTW9kZSA9IHB1dFNvcnRhYmxlID8gcHV0U29ydGFibGUubGFzdFB1dE1vZGUgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGFsbEV2ZW50UHJvcGVydGllcyA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYUV2ZW50UHJvcGVydGllcyksIFBsdWdpbk1hbmFnZXIuZ2V0RXZlbnRQcm9wZXJ0aWVzKG5hbWUsIHNvcnRhYmxlKSk7XG5cbiAgZm9yICh2YXIgb3B0aW9uIGluIGFsbEV2ZW50UHJvcGVydGllcykge1xuICAgIGV2dFtvcHRpb25dID0gYWxsRXZlbnRQcm9wZXJ0aWVzW29wdGlvbl07XG4gIH1cblxuICBpZiAocm9vdEVsKSB7XG4gICAgcm9vdEVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxuXG4gIGlmIChvcHRpb25zW29uTmFtZV0pIHtcbiAgICBvcHRpb25zW29uTmFtZV0uY2FsbChzb3J0YWJsZSwgZXZ0KTtcbiAgfVxufVxuXG52YXIgX2V4Y2x1ZGVkID0gW1wiZXZ0XCJdO1xuXG52YXIgcGx1Z2luRXZlbnQgPSBmdW5jdGlvbiBwbHVnaW5FdmVudChldmVudE5hbWUsIHNvcnRhYmxlKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICAgIG9yaWdpbmFsRXZlbnQgPSBfcmVmLmV2dCxcbiAgICAgIGRhdGEgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgX2V4Y2x1ZGVkKTtcblxuICBQbHVnaW5NYW5hZ2VyLnBsdWdpbkV2ZW50LmJpbmQoU29ydGFibGUpKGV2ZW50TmFtZSwgc29ydGFibGUsIF9vYmplY3RTcHJlYWQyKHtcbiAgICBkcmFnRWw6IGRyYWdFbCxcbiAgICBwYXJlbnRFbDogcGFyZW50RWwsXG4gICAgZ2hvc3RFbDogZ2hvc3RFbCxcbiAgICByb290RWw6IHJvb3RFbCxcbiAgICBuZXh0RWw6IG5leHRFbCxcbiAgICBsYXN0RG93bkVsOiBsYXN0RG93bkVsLFxuICAgIGNsb25lRWw6IGNsb25lRWwsXG4gICAgY2xvbmVIaWRkZW46IGNsb25lSGlkZGVuLFxuICAgIGRyYWdTdGFydGVkOiBtb3ZlZCxcbiAgICBwdXRTb3J0YWJsZTogcHV0U29ydGFibGUsXG4gICAgYWN0aXZlU29ydGFibGU6IFNvcnRhYmxlLmFjdGl2ZSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbEV2ZW50LFxuICAgIG9sZEluZGV4OiBvbGRJbmRleCxcbiAgICBvbGREcmFnZ2FibGVJbmRleDogb2xkRHJhZ2dhYmxlSW5kZXgsXG4gICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgIG5ld0RyYWdnYWJsZUluZGV4OiBuZXdEcmFnZ2FibGVJbmRleCxcbiAgICBoaWRlR2hvc3RGb3JUYXJnZXQ6IF9oaWRlR2hvc3RGb3JUYXJnZXQsXG4gICAgdW5oaWRlR2hvc3RGb3JUYXJnZXQ6IF91bmhpZGVHaG9zdEZvclRhcmdldCxcbiAgICBjbG9uZU5vd0hpZGRlbjogZnVuY3Rpb24gY2xvbmVOb3dIaWRkZW4oKSB7XG4gICAgICBjbG9uZUhpZGRlbiA9IHRydWU7XG4gICAgfSxcbiAgICBjbG9uZU5vd1Nob3duOiBmdW5jdGlvbiBjbG9uZU5vd1Nob3duKCkge1xuICAgICAgY2xvbmVIaWRkZW4gPSBmYWxzZTtcbiAgICB9LFxuICAgIGRpc3BhdGNoU29ydGFibGVFdmVudDogZnVuY3Rpb24gZGlzcGF0Y2hTb3J0YWJsZUV2ZW50KG5hbWUpIHtcbiAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgc29ydGFibGU6IHNvcnRhYmxlLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbEV2ZW50XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIGRhdGEpKTtcbn07XG5cbmZ1bmN0aW9uIF9kaXNwYXRjaEV2ZW50KGluZm8pIHtcbiAgZGlzcGF0Y2hFdmVudChfb2JqZWN0U3ByZWFkMih7XG4gICAgcHV0U29ydGFibGU6IHB1dFNvcnRhYmxlLFxuICAgIGNsb25lRWw6IGNsb25lRWwsXG4gICAgdGFyZ2V0RWw6IGRyYWdFbCxcbiAgICByb290RWw6IHJvb3RFbCxcbiAgICBvbGRJbmRleDogb2xkSW5kZXgsXG4gICAgb2xkRHJhZ2dhYmxlSW5kZXg6IG9sZERyYWdnYWJsZUluZGV4LFxuICAgIG5ld0luZGV4OiBuZXdJbmRleCxcbiAgICBuZXdEcmFnZ2FibGVJbmRleDogbmV3RHJhZ2dhYmxlSW5kZXhcbiAgfSwgaW5mbykpO1xufVxuXG52YXIgZHJhZ0VsLFxuICAgIHBhcmVudEVsLFxuICAgIGdob3N0RWwsXG4gICAgcm9vdEVsLFxuICAgIG5leHRFbCxcbiAgICBsYXN0RG93bkVsLFxuICAgIGNsb25lRWwsXG4gICAgY2xvbmVIaWRkZW4sXG4gICAgb2xkSW5kZXgsXG4gICAgbmV3SW5kZXgsXG4gICAgb2xkRHJhZ2dhYmxlSW5kZXgsXG4gICAgbmV3RHJhZ2dhYmxlSW5kZXgsXG4gICAgYWN0aXZlR3JvdXAsXG4gICAgcHV0U29ydGFibGUsXG4gICAgYXdhaXRpbmdEcmFnU3RhcnRlZCA9IGZhbHNlLFxuICAgIGlnbm9yZU5leHRDbGljayA9IGZhbHNlLFxuICAgIHNvcnRhYmxlcyA9IFtdLFxuICAgIHRhcEV2dCxcbiAgICB0b3VjaEV2dCxcbiAgICBsYXN0RHgsXG4gICAgbGFzdER5LFxuICAgIHRhcERpc3RhbmNlTGVmdCxcbiAgICB0YXBEaXN0YW5jZVRvcCxcbiAgICBtb3ZlZCxcbiAgICBsYXN0VGFyZ2V0LFxuICAgIGxhc3REaXJlY3Rpb24sXG4gICAgcGFzdEZpcnN0SW52ZXJ0VGhyZXNoID0gZmFsc2UsXG4gICAgaXNDaXJjdW1zdGFudGlhbEludmVydCA9IGZhbHNlLFxuICAgIHRhcmdldE1vdmVEaXN0YW5jZSxcbiAgICAvLyBGb3IgcG9zaXRpb25pbmcgZ2hvc3QgYWJzb2x1dGVseVxuZ2hvc3RSZWxhdGl2ZVBhcmVudCxcbiAgICBnaG9zdFJlbGF0aXZlUGFyZW50SW5pdGlhbFNjcm9sbCA9IFtdLFxuICAgIC8vIChsZWZ0LCB0b3ApXG5fc2lsZW50ID0gZmFsc2UsXG4gICAgc2F2ZWRJbnB1dENoZWNrZWQgPSBbXTtcbi8qKiBAY29uc3QgKi9cblxudmFyIGRvY3VtZW50RXhpc3RzID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyxcbiAgICBQb3NpdGlvbkdob3N0QWJzb2x1dGVseSA9IElPUyxcbiAgICBDU1NGbG9hdFByb3BlcnR5ID0gRWRnZSB8fCBJRTExT3JMZXNzID8gJ2Nzc0Zsb2F0JyA6ICdmbG9hdCcsXG4gICAgLy8gVGhpcyB3aWxsIG5vdCBwYXNzIGZvciBJRTksIGJlY2F1c2UgSUU5IERuRCBvbmx5IHdvcmtzIG9uIGFuY2hvcnNcbnN1cHBvcnREcmFnZ2FibGUgPSBkb2N1bWVudEV4aXN0cyAmJiAhQ2hyb21lRm9yQW5kcm9pZCAmJiAhSU9TICYmICdkcmFnZ2FibGUnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIHN1cHBvcnRDc3NQb2ludGVyRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIWRvY3VtZW50RXhpc3RzKSByZXR1cm47IC8vIGZhbHNlIHdoZW4gPD0gSUUxMVxuXG4gIGlmIChJRTExT3JMZXNzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgneCcpO1xuICBlbC5zdHlsZS5jc3NUZXh0ID0gJ3BvaW50ZXItZXZlbnRzOmF1dG8nO1xuICByZXR1cm4gZWwuc3R5bGUucG9pbnRlckV2ZW50cyA9PT0gJ2F1dG8nO1xufSgpLFxuICAgIF9kZXRlY3REaXJlY3Rpb24gPSBmdW5jdGlvbiBfZGV0ZWN0RGlyZWN0aW9uKGVsLCBvcHRpb25zKSB7XG4gIHZhciBlbENTUyA9IGNzcyhlbCksXG4gICAgICBlbFdpZHRoID0gcGFyc2VJbnQoZWxDU1Mud2lkdGgpIC0gcGFyc2VJbnQoZWxDU1MucGFkZGluZ0xlZnQpIC0gcGFyc2VJbnQoZWxDU1MucGFkZGluZ1JpZ2h0KSAtIHBhcnNlSW50KGVsQ1NTLmJvcmRlckxlZnRXaWR0aCkgLSBwYXJzZUludChlbENTUy5ib3JkZXJSaWdodFdpZHRoKSxcbiAgICAgIGNoaWxkMSA9IGdldENoaWxkKGVsLCAwLCBvcHRpb25zKSxcbiAgICAgIGNoaWxkMiA9IGdldENoaWxkKGVsLCAxLCBvcHRpb25zKSxcbiAgICAgIGZpcnN0Q2hpbGRDU1MgPSBjaGlsZDEgJiYgY3NzKGNoaWxkMSksXG4gICAgICBzZWNvbmRDaGlsZENTUyA9IGNoaWxkMiAmJiBjc3MoY2hpbGQyKSxcbiAgICAgIGZpcnN0Q2hpbGRXaWR0aCA9IGZpcnN0Q2hpbGRDU1MgJiYgcGFyc2VJbnQoZmlyc3RDaGlsZENTUy5tYXJnaW5MZWZ0KSArIHBhcnNlSW50KGZpcnN0Q2hpbGRDU1MubWFyZ2luUmlnaHQpICsgZ2V0UmVjdChjaGlsZDEpLndpZHRoLFxuICAgICAgc2Vjb25kQ2hpbGRXaWR0aCA9IHNlY29uZENoaWxkQ1NTICYmIHBhcnNlSW50KHNlY29uZENoaWxkQ1NTLm1hcmdpbkxlZnQpICsgcGFyc2VJbnQoc2Vjb25kQ2hpbGRDU1MubWFyZ2luUmlnaHQpICsgZ2V0UmVjdChjaGlsZDIpLndpZHRoO1xuXG4gIGlmIChlbENTUy5kaXNwbGF5ID09PSAnZmxleCcpIHtcbiAgICByZXR1cm4gZWxDU1MuZmxleERpcmVjdGlvbiA9PT0gJ2NvbHVtbicgfHwgZWxDU1MuZmxleERpcmVjdGlvbiA9PT0gJ2NvbHVtbi1yZXZlcnNlJyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gIH1cblxuICBpZiAoZWxDU1MuZGlzcGxheSA9PT0gJ2dyaWQnKSB7XG4gICAgcmV0dXJuIGVsQ1NTLmdyaWRUZW1wbGF0ZUNvbHVtbnMuc3BsaXQoJyAnKS5sZW5ndGggPD0gMSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gIH1cblxuICBpZiAoY2hpbGQxICYmIGZpcnN0Q2hpbGRDU1NbXCJmbG9hdFwiXSAmJiBmaXJzdENoaWxkQ1NTW1wiZmxvYXRcIl0gIT09ICdub25lJykge1xuICAgIHZhciB0b3VjaGluZ1NpZGVDaGlsZDIgPSBmaXJzdENoaWxkQ1NTW1wiZmxvYXRcIl0gPT09ICdsZWZ0JyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgcmV0dXJuIGNoaWxkMiAmJiAoc2Vjb25kQ2hpbGRDU1MuY2xlYXIgPT09ICdib3RoJyB8fCBzZWNvbmRDaGlsZENTUy5jbGVhciA9PT0gdG91Y2hpbmdTaWRlQ2hpbGQyKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gIH1cblxuICByZXR1cm4gY2hpbGQxICYmIChmaXJzdENoaWxkQ1NTLmRpc3BsYXkgPT09ICdibG9jaycgfHwgZmlyc3RDaGlsZENTUy5kaXNwbGF5ID09PSAnZmxleCcgfHwgZmlyc3RDaGlsZENTUy5kaXNwbGF5ID09PSAndGFibGUnIHx8IGZpcnN0Q2hpbGRDU1MuZGlzcGxheSA9PT0gJ2dyaWQnIHx8IGZpcnN0Q2hpbGRXaWR0aCA+PSBlbFdpZHRoICYmIGVsQ1NTW0NTU0Zsb2F0UHJvcGVydHldID09PSAnbm9uZScgfHwgY2hpbGQyICYmIGVsQ1NTW0NTU0Zsb2F0UHJvcGVydHldID09PSAnbm9uZScgJiYgZmlyc3RDaGlsZFdpZHRoICsgc2Vjb25kQ2hpbGRXaWR0aCA+IGVsV2lkdGgpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbn0sXG4gICAgX2RyYWdFbEluUm93Q29sdW1uID0gZnVuY3Rpb24gX2RyYWdFbEluUm93Q29sdW1uKGRyYWdSZWN0LCB0YXJnZXRSZWN0LCB2ZXJ0aWNhbCkge1xuICB2YXIgZHJhZ0VsUzFPcHAgPSB2ZXJ0aWNhbCA/IGRyYWdSZWN0LmxlZnQgOiBkcmFnUmVjdC50b3AsXG4gICAgICBkcmFnRWxTMk9wcCA9IHZlcnRpY2FsID8gZHJhZ1JlY3QucmlnaHQgOiBkcmFnUmVjdC5ib3R0b20sXG4gICAgICBkcmFnRWxPcHBMZW5ndGggPSB2ZXJ0aWNhbCA/IGRyYWdSZWN0LndpZHRoIDogZHJhZ1JlY3QuaGVpZ2h0LFxuICAgICAgdGFyZ2V0UzFPcHAgPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3QubGVmdCA6IHRhcmdldFJlY3QudG9wLFxuICAgICAgdGFyZ2V0UzJPcHAgPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3QucmlnaHQgOiB0YXJnZXRSZWN0LmJvdHRvbSxcbiAgICAgIHRhcmdldE9wcExlbmd0aCA9IHZlcnRpY2FsID8gdGFyZ2V0UmVjdC53aWR0aCA6IHRhcmdldFJlY3QuaGVpZ2h0O1xuICByZXR1cm4gZHJhZ0VsUzFPcHAgPT09IHRhcmdldFMxT3BwIHx8IGRyYWdFbFMyT3BwID09PSB0YXJnZXRTMk9wcCB8fCBkcmFnRWxTMU9wcCArIGRyYWdFbE9wcExlbmd0aCAvIDIgPT09IHRhcmdldFMxT3BwICsgdGFyZ2V0T3BwTGVuZ3RoIC8gMjtcbn0sXG5cbi8qKlxyXG4gKiBEZXRlY3RzIGZpcnN0IG5lYXJlc3QgZW1wdHkgc29ydGFibGUgdG8gWCBhbmQgWSBwb3NpdGlvbiB1c2luZyBlbXB0eUluc2VydFRocmVzaG9sZC5cclxuICogQHBhcmFtICB7TnVtYmVyfSB4ICAgICAgWCBwb3NpdGlvblxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHkgICAgICBZIHBvc2l0aW9uXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgIEVsZW1lbnQgb2YgdGhlIGZpcnN0IGZvdW5kIG5lYXJlc3QgU29ydGFibGVcclxuICovXG5fZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUgPSBmdW5jdGlvbiBfZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUoeCwgeSkge1xuICB2YXIgcmV0O1xuICBzb3J0YWJsZXMuc29tZShmdW5jdGlvbiAoc29ydGFibGUpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gc29ydGFibGVbZXhwYW5kb10ub3B0aW9ucy5lbXB0eUluc2VydFRocmVzaG9sZDtcbiAgICBpZiAoIXRocmVzaG9sZCB8fCBsYXN0Q2hpbGQoc29ydGFibGUpKSByZXR1cm47XG4gICAgdmFyIHJlY3QgPSBnZXRSZWN0KHNvcnRhYmxlKSxcbiAgICAgICAgaW5zaWRlSG9yaXpvbnRhbGx5ID0geCA+PSByZWN0LmxlZnQgLSB0aHJlc2hvbGQgJiYgeCA8PSByZWN0LnJpZ2h0ICsgdGhyZXNob2xkLFxuICAgICAgICBpbnNpZGVWZXJ0aWNhbGx5ID0geSA+PSByZWN0LnRvcCAtIHRocmVzaG9sZCAmJiB5IDw9IHJlY3QuYm90dG9tICsgdGhyZXNob2xkO1xuXG4gICAgaWYgKGluc2lkZUhvcml6b250YWxseSAmJiBpbnNpZGVWZXJ0aWNhbGx5KSB7XG4gICAgICByZXR1cm4gcmV0ID0gc29ydGFibGU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldDtcbn0sXG4gICAgX3ByZXBhcmVHcm91cCA9IGZ1bmN0aW9uIF9wcmVwYXJlR3JvdXAob3B0aW9ucykge1xuICBmdW5jdGlvbiB0b0ZuKHZhbHVlLCBwdWxsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0bywgZnJvbSwgZHJhZ0VsLCBldnQpIHtcbiAgICAgIHZhciBzYW1lR3JvdXAgPSB0by5vcHRpb25zLmdyb3VwLm5hbWUgJiYgZnJvbS5vcHRpb25zLmdyb3VwLm5hbWUgJiYgdG8ub3B0aW9ucy5ncm91cC5uYW1lID09PSBmcm9tLm9wdGlvbnMuZ3JvdXAubmFtZTtcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwgJiYgKHB1bGwgfHwgc2FtZUdyb3VwKSkge1xuICAgICAgICAvLyBEZWZhdWx0IHB1bGwgdmFsdWVcbiAgICAgICAgLy8gRGVmYXVsdCBwdWxsIGFuZCBwdXQgdmFsdWUgaWYgc2FtZSBncm91cFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChwdWxsICYmIHZhbHVlID09PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0b0ZuKHZhbHVlKHRvLCBmcm9tLCBkcmFnRWwsIGV2dCksIHB1bGwpKHRvLCBmcm9tLCBkcmFnRWwsIGV2dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3RoZXJHcm91cCA9IChwdWxsID8gdG8gOiBmcm9tKS5vcHRpb25zLmdyb3VwLm5hbWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlID09PSBvdGhlckdyb3VwIHx8IHZhbHVlLmpvaW4gJiYgdmFsdWUuaW5kZXhPZihvdGhlckdyb3VwKSA+IC0xO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgZ3JvdXAgPSB7fTtcbiAgdmFyIG9yaWdpbmFsR3JvdXAgPSBvcHRpb25zLmdyb3VwO1xuXG4gIGlmICghb3JpZ2luYWxHcm91cCB8fCBfdHlwZW9mKG9yaWdpbmFsR3JvdXApICE9ICdvYmplY3QnKSB7XG4gICAgb3JpZ2luYWxHcm91cCA9IHtcbiAgICAgIG5hbWU6IG9yaWdpbmFsR3JvdXBcbiAgICB9O1xuICB9XG5cbiAgZ3JvdXAubmFtZSA9IG9yaWdpbmFsR3JvdXAubmFtZTtcbiAgZ3JvdXAuY2hlY2tQdWxsID0gdG9GbihvcmlnaW5hbEdyb3VwLnB1bGwsIHRydWUpO1xuICBncm91cC5jaGVja1B1dCA9IHRvRm4ob3JpZ2luYWxHcm91cC5wdXQpO1xuICBncm91cC5yZXZlcnRDbG9uZSA9IG9yaWdpbmFsR3JvdXAucmV2ZXJ0Q2xvbmU7XG4gIG9wdGlvbnMuZ3JvdXAgPSBncm91cDtcbn0sXG4gICAgX2hpZGVHaG9zdEZvclRhcmdldCA9IGZ1bmN0aW9uIF9oaWRlR2hvc3RGb3JUYXJnZXQoKSB7XG4gIGlmICghc3VwcG9ydENzc1BvaW50ZXJFdmVudHMgJiYgZ2hvc3RFbCkge1xuICAgIGNzcyhnaG9zdEVsLCAnZGlzcGxheScsICdub25lJyk7XG4gIH1cbn0sXG4gICAgX3VuaGlkZUdob3N0Rm9yVGFyZ2V0ID0gZnVuY3Rpb24gX3VuaGlkZUdob3N0Rm9yVGFyZ2V0KCkge1xuICBpZiAoIXN1cHBvcnRDc3NQb2ludGVyRXZlbnRzICYmIGdob3N0RWwpIHtcbiAgICBjc3MoZ2hvc3RFbCwgJ2Rpc3BsYXknLCAnJyk7XG4gIH1cbn07IC8vICMxMTg0IGZpeCAtIFByZXZlbnQgY2xpY2sgZXZlbnQgb24gZmFsbGJhY2sgaWYgZHJhZ2dlZCBidXQgaXRlbSBub3QgY2hhbmdlZCBwb3NpdGlvblxuXG5cbmlmIChkb2N1bWVudEV4aXN0cyAmJiAhQ2hyb21lRm9yQW5kcm9pZCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAoaWdub3JlTmV4dENsaWNrKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24gJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAmJiBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBpZ25vcmVOZXh0Q2xpY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHRydWUpO1xufVxuXG52YXIgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQgPSBmdW5jdGlvbiBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudChldnQpIHtcbiAgaWYgKGRyYWdFbCkge1xuICAgIGV2dCA9IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQ7XG5cbiAgICB2YXIgbmVhcmVzdCA9IF9kZXRlY3ROZWFyZXN0RW1wdHlTb3J0YWJsZShldnQuY2xpZW50WCwgZXZ0LmNsaWVudFkpO1xuXG4gICAgaWYgKG5lYXJlc3QpIHtcbiAgICAgIC8vIENyZWF0ZSBpbWl0YXRpb24gZXZlbnRcbiAgICAgIHZhciBldmVudCA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBpIGluIGV2dCkge1xuICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgZXZlbnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQucm9vdEVsID0gbmVhcmVzdDtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gdm9pZCAwO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gdm9pZCAwO1xuXG4gICAgICBuZWFyZXN0W2V4cGFuZG9dLl9vbkRyYWdPdmVyKGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBfY2hlY2tPdXRzaWRlVGFyZ2V0RWwgPSBmdW5jdGlvbiBfY2hlY2tPdXRzaWRlVGFyZ2V0RWwoZXZ0KSB7XG4gIGlmIChkcmFnRWwpIHtcbiAgICBkcmFnRWwucGFyZW50Tm9kZVtleHBhbmRvXS5faXNPdXRzaWRlVGhpc0VsKGV2dC50YXJnZXQpO1xuICB9XG59O1xuLyoqXHJcbiAqIEBjbGFzcyAgU29ydGFibGVcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICBlbFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIFtvcHRpb25zXVxyXG4gKi9cblxuXG5mdW5jdGlvbiBTb3J0YWJsZShlbCwgb3B0aW9ucykge1xuICBpZiAoIShlbCAmJiBlbC5ub2RlVHlwZSAmJiBlbC5ub2RlVHlwZSA9PT0gMSkpIHtcbiAgICB0aHJvdyBcIlNvcnRhYmxlOiBgZWxgIG11c3QgYmUgYW4gSFRNTEVsZW1lbnQsIG5vdCBcIi5jb25jYXQoe30udG9TdHJpbmcuY2FsbChlbCkpO1xuICB9XG5cbiAgdGhpcy5lbCA9IGVsOyAvLyByb290IGVsZW1lbnRcblxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnMpOyAvLyBFeHBvcnQgaW5zdGFuY2VcblxuICBlbFtleHBhbmRvXSA9IHRoaXM7XG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBncm91cDogbnVsbCxcbiAgICBzb3J0OiB0cnVlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBzdG9yZTogbnVsbCxcbiAgICBoYW5kbGU6IG51bGwsXG4gICAgZHJhZ2dhYmxlOiAvXlt1b11sJC9pLnRlc3QoZWwubm9kZU5hbWUpID8gJz5saScgOiAnPionLFxuICAgIHN3YXBUaHJlc2hvbGQ6IDEsXG4gICAgLy8gcGVyY2VudGFnZTsgMCA8PSB4IDw9IDFcbiAgICBpbnZlcnRTd2FwOiBmYWxzZSxcbiAgICAvLyBpbnZlcnQgYWx3YXlzXG4gICAgaW52ZXJ0ZWRTd2FwVGhyZXNob2xkOiBudWxsLFxuICAgIC8vIHdpbGwgYmUgc2V0IHRvIHNhbWUgYXMgc3dhcFRocmVzaG9sZCBpZiBkZWZhdWx0XG4gICAgcmVtb3ZlQ2xvbmVPbkhpZGU6IHRydWUsXG4gICAgZGlyZWN0aW9uOiBmdW5jdGlvbiBkaXJlY3Rpb24oKSB7XG4gICAgICByZXR1cm4gX2RldGVjdERpcmVjdGlvbihlbCwgdGhpcy5vcHRpb25zKTtcbiAgICB9LFxuICAgIGdob3N0Q2xhc3M6ICdzb3J0YWJsZS1naG9zdCcsXG4gICAgY2hvc2VuQ2xhc3M6ICdzb3J0YWJsZS1jaG9zZW4nLFxuICAgIGRyYWdDbGFzczogJ3NvcnRhYmxlLWRyYWcnLFxuICAgIGlnbm9yZTogJ2EsIGltZycsXG4gICAgZmlsdGVyOiBudWxsLFxuICAgIHByZXZlbnRPbkZpbHRlcjogdHJ1ZSxcbiAgICBhbmltYXRpb246IDAsXG4gICAgZWFzaW5nOiBudWxsLFxuICAgIHNldERhdGE6IGZ1bmN0aW9uIHNldERhdGEoZGF0YVRyYW5zZmVyLCBkcmFnRWwpIHtcbiAgICAgIGRhdGFUcmFuc2Zlci5zZXREYXRhKCdUZXh0JywgZHJhZ0VsLnRleHRDb250ZW50KTtcbiAgICB9LFxuICAgIGRyb3BCdWJibGU6IGZhbHNlLFxuICAgIGRyYWdvdmVyQnViYmxlOiBmYWxzZSxcbiAgICBkYXRhSWRBdHRyOiAnZGF0YS1pZCcsXG4gICAgZGVsYXk6IDAsXG4gICAgZGVsYXlPblRvdWNoT25seTogZmFsc2UsXG4gICAgdG91Y2hTdGFydFRocmVzaG9sZDogKE51bWJlci5wYXJzZUludCA/IE51bWJlciA6IHdpbmRvdykucGFyc2VJbnQod2luZG93LmRldmljZVBpeGVsUmF0aW8sIDEwKSB8fCAxLFxuICAgIGZvcmNlRmFsbGJhY2s6IGZhbHNlLFxuICAgIGZhbGxiYWNrQ2xhc3M6ICdzb3J0YWJsZS1mYWxsYmFjaycsXG4gICAgZmFsbGJhY2tPbkJvZHk6IGZhbHNlLFxuICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAwLFxuICAgIGZhbGxiYWNrT2Zmc2V0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgc3VwcG9ydFBvaW50ZXI6IFNvcnRhYmxlLnN1cHBvcnRQb2ludGVyICE9PSBmYWxzZSAmJiAnUG9pbnRlckV2ZW50JyBpbiB3aW5kb3cgJiYgIVNhZmFyaSxcbiAgICBlbXB0eUluc2VydFRocmVzaG9sZDogNVxuICB9O1xuICBQbHVnaW5NYW5hZ2VyLmluaXRpYWxpemVQbHVnaW5zKHRoaXMsIGVsLCBkZWZhdWx0cyk7IC8vIFNldCBkZWZhdWx0IG9wdGlvbnNcblxuICBmb3IgKHZhciBuYW1lIGluIGRlZmF1bHRzKSB7XG4gICAgIShuYW1lIGluIG9wdGlvbnMpICYmIChvcHRpb25zW25hbWVdID0gZGVmYXVsdHNbbmFtZV0pO1xuICB9XG5cbiAgX3ByZXBhcmVHcm91cChvcHRpb25zKTsgLy8gQmluZCBhbGwgcHJpdmF0ZSBtZXRob2RzXG5cblxuICBmb3IgKHZhciBmbiBpbiB0aGlzKSB7XG4gICAgaWYgKGZuLmNoYXJBdCgwKSA9PT0gJ18nICYmIHR5cGVvZiB0aGlzW2ZuXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1tmbl0gPSB0aGlzW2ZuXS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgfSAvLyBTZXR1cCBkcmFnIG1vZGVcblxuXG4gIHRoaXMubmF0aXZlRHJhZ2dhYmxlID0gb3B0aW9ucy5mb3JjZUZhbGxiYWNrID8gZmFsc2UgOiBzdXBwb3J0RHJhZ2dhYmxlO1xuXG4gIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgIC8vIFRvdWNoIHN0YXJ0IHRocmVzaG9sZCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIHRoZSBuYXRpdmUgZHJhZ3N0YXJ0IHRocmVzaG9sZFxuICAgIHRoaXMub3B0aW9ucy50b3VjaFN0YXJ0VGhyZXNob2xkID0gMTtcbiAgfSAvLyBCaW5kIGV2ZW50c1xuXG5cbiAgaWYgKG9wdGlvbnMuc3VwcG9ydFBvaW50ZXIpIHtcbiAgICBvbihlbCwgJ3BvaW50ZXJkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG4gIH0gZWxzZSB7XG4gICAgb24oZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vblRhcFN0YXJ0KTtcbiAgICBvbihlbCwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRhcFN0YXJ0KTtcbiAgfVxuXG4gIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgIG9uKGVsLCAnZHJhZ292ZXInLCB0aGlzKTtcbiAgICBvbihlbCwgJ2RyYWdlbnRlcicsIHRoaXMpO1xuICB9XG5cbiAgc29ydGFibGVzLnB1c2godGhpcy5lbCk7IC8vIFJlc3RvcmUgc29ydGluZ1xuXG4gIG9wdGlvbnMuc3RvcmUgJiYgb3B0aW9ucy5zdG9yZS5nZXQgJiYgdGhpcy5zb3J0KG9wdGlvbnMuc3RvcmUuZ2V0KHRoaXMpIHx8IFtdKTsgLy8gQWRkIGFuaW1hdGlvbiBzdGF0ZSBtYW5hZ2VyXG5cbiAgX2V4dGVuZHModGhpcywgQW5pbWF0aW9uU3RhdGVNYW5hZ2VyKCkpO1xufVxuXG5Tb3J0YWJsZS5wcm90b3R5cGUgPVxuLyoqIEBsZW5kcyBTb3J0YWJsZS5wcm90b3R5cGUgKi9cbntcbiAgY29uc3RydWN0b3I6IFNvcnRhYmxlLFxuICBfaXNPdXRzaWRlVGhpc0VsOiBmdW5jdGlvbiBfaXNPdXRzaWRlVGhpc0VsKHRhcmdldCkge1xuICAgIGlmICghdGhpcy5lbC5jb250YWlucyh0YXJnZXQpICYmIHRhcmdldCAhPT0gdGhpcy5lbCkge1xuICAgICAgbGFzdFRhcmdldCA9IG51bGw7XG4gICAgfVxuICB9LFxuICBfZ2V0RGlyZWN0aW9uOiBmdW5jdGlvbiBfZ2V0RGlyZWN0aW9uKGV2dCwgdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSAnZnVuY3Rpb24nID8gdGhpcy5vcHRpb25zLmRpcmVjdGlvbi5jYWxsKHRoaXMsIGV2dCwgdGFyZ2V0LCBkcmFnRWwpIDogdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgfSxcbiAgX29uVGFwU3RhcnQ6IGZ1bmN0aW9uIF9vblRhcFN0YXJ0KFxuICAvKiogRXZlbnR8VG91Y2hFdmVudCAqL1xuICBldnQpIHtcbiAgICBpZiAoIWV2dC5jYW5jZWxhYmxlKSByZXR1cm47XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBlbCA9IHRoaXMuZWwsXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIHByZXZlbnRPbkZpbHRlciA9IG9wdGlvbnMucHJldmVudE9uRmlsdGVyLFxuICAgICAgICB0eXBlID0gZXZ0LnR5cGUsXG4gICAgICAgIHRvdWNoID0gZXZ0LnRvdWNoZXMgJiYgZXZ0LnRvdWNoZXNbMF0gfHwgZXZ0LnBvaW50ZXJUeXBlICYmIGV2dC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJyAmJiBldnQsXG4gICAgICAgIHRhcmdldCA9ICh0b3VjaCB8fCBldnQpLnRhcmdldCxcbiAgICAgICAgb3JpZ2luYWxUYXJnZXQgPSBldnQudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgKGV2dC5wYXRoICYmIGV2dC5wYXRoWzBdIHx8IGV2dC5jb21wb3NlZFBhdGggJiYgZXZ0LmNvbXBvc2VkUGF0aCgpWzBdKSB8fCB0YXJnZXQsXG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuXG4gICAgX3NhdmVJbnB1dENoZWNrZWRTdGF0ZShlbCk7IC8vIERvbid0IHRyaWdnZXIgc3RhcnQgZXZlbnQgd2hlbiBhbiBlbGVtZW50IGlzIGJlZW4gZHJhZ2dlZCwgb3RoZXJ3aXNlIHRoZSBldnQub2xkaW5kZXggYWx3YXlzIHdyb25nIHdoZW4gc2V0IG9wdGlvbi5ncm91cC5cblxuXG4gICAgaWYgKGRyYWdFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgvbW91c2Vkb3dufHBvaW50ZXJkb3duLy50ZXN0KHR5cGUpICYmIGV2dC5idXR0b24gIT09IDAgfHwgb3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuOyAvLyBvbmx5IGxlZnQgYnV0dG9uIGFuZCBlbmFibGVkXG4gICAgfSAvLyBjYW5jZWwgZG5kIGlmIG9yaWdpbmFsIHRhcmdldCBpcyBjb250ZW50IGVkaXRhYmxlXG5cblxuICAgIGlmIChvcmlnaW5hbFRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gU2FmYXJpIGlnbm9yZXMgZnVydGhlciBldmVudCBoYW5kbGluZyBhZnRlciBtb3VzZWRvd25cblxuXG4gICAgaWYgKCF0aGlzLm5hdGl2ZURyYWdnYWJsZSAmJiBTYWZhcmkgJiYgdGFyZ2V0ICYmIHRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTRUxFQ1QnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gY2xvc2VzdCh0YXJnZXQsIG9wdGlvbnMuZHJhZ2dhYmxlLCBlbCwgZmFsc2UpO1xuXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuYW5pbWF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobGFzdERvd25FbCA9PT0gdGFyZ2V0KSB7XG4gICAgICAvLyBJZ25vcmluZyBkdXBsaWNhdGUgYGRvd25gXG4gICAgICByZXR1cm47XG4gICAgfSAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBkcmFnZ2VkIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnRcblxuXG4gICAgb2xkSW5kZXggPSBpbmRleCh0YXJnZXQpO1xuICAgIG9sZERyYWdnYWJsZUluZGV4ID0gaW5kZXgodGFyZ2V0LCBvcHRpb25zLmRyYWdnYWJsZSk7IC8vIENoZWNrIGZpbHRlclxuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChmaWx0ZXIuY2FsbCh0aGlzLCBldnQsIHRhcmdldCwgdGhpcykpIHtcbiAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgIHNvcnRhYmxlOiBfdGhpcyxcbiAgICAgICAgICByb290RWw6IG9yaWdpbmFsVGFyZ2V0LFxuICAgICAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgICAgIHRhcmdldEVsOiB0YXJnZXQsXG4gICAgICAgICAgdG9FbDogZWwsXG4gICAgICAgICAgZnJvbUVsOiBlbFxuICAgICAgICB9KTtcblxuICAgICAgICBwbHVnaW5FdmVudCgnZmlsdGVyJywgX3RoaXMsIHtcbiAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICB9KTtcbiAgICAgICAgcHJldmVudE9uRmlsdGVyICYmIGV2dC5jYW5jZWxhYmxlICYmIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47IC8vIGNhbmNlbCBkbmRcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGZpbHRlcikge1xuICAgICAgZmlsdGVyID0gZmlsdGVyLnNwbGl0KCcsJykuc29tZShmdW5jdGlvbiAoY3JpdGVyaWEpIHtcbiAgICAgICAgY3JpdGVyaWEgPSBjbG9zZXN0KG9yaWdpbmFsVGFyZ2V0LCBjcml0ZXJpYS50cmltKCksIGVsLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKGNyaXRlcmlhKSB7XG4gICAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgc29ydGFibGU6IF90aGlzLFxuICAgICAgICAgICAgcm9vdEVsOiBjcml0ZXJpYSxcbiAgICAgICAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgICAgICAgdGFyZ2V0RWw6IHRhcmdldCxcbiAgICAgICAgICAgIGZyb21FbDogZWwsXG4gICAgICAgICAgICB0b0VsOiBlbFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcGx1Z2luRXZlbnQoJ2ZpbHRlcicsIF90aGlzLCB7XG4gICAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICBwcmV2ZW50T25GaWx0ZXIgJiYgZXZ0LmNhbmNlbGFibGUgJiYgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjsgLy8gY2FuY2VsIGRuZFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmhhbmRsZSAmJiAhY2xvc2VzdChvcmlnaW5hbFRhcmdldCwgb3B0aW9ucy5oYW5kbGUsIGVsLCBmYWxzZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFByZXBhcmUgYGRyYWdzdGFydGBcblxuXG4gICAgdGhpcy5fcHJlcGFyZURyYWdTdGFydChldnQsIHRvdWNoLCB0YXJnZXQpO1xuICB9LFxuICBfcHJlcGFyZURyYWdTdGFydDogZnVuY3Rpb24gX3ByZXBhcmVEcmFnU3RhcnQoXG4gIC8qKiBFdmVudCAqL1xuICBldnQsXG4gIC8qKiBUb3VjaCAqL1xuICB0b3VjaCxcbiAgLyoqIEhUTUxFbGVtZW50ICovXG4gIHRhcmdldCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGVsID0gX3RoaXMuZWwsXG4gICAgICAgIG9wdGlvbnMgPSBfdGhpcy5vcHRpb25zLFxuICAgICAgICBvd25lckRvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudCxcbiAgICAgICAgZHJhZ1N0YXJ0Rm47XG5cbiAgICBpZiAodGFyZ2V0ICYmICFkcmFnRWwgJiYgdGFyZ2V0LnBhcmVudE5vZGUgPT09IGVsKSB7XG4gICAgICB2YXIgZHJhZ1JlY3QgPSBnZXRSZWN0KHRhcmdldCk7XG4gICAgICByb290RWwgPSBlbDtcbiAgICAgIGRyYWdFbCA9IHRhcmdldDtcbiAgICAgIHBhcmVudEVsID0gZHJhZ0VsLnBhcmVudE5vZGU7XG4gICAgICBuZXh0RWwgPSBkcmFnRWwubmV4dFNpYmxpbmc7XG4gICAgICBsYXN0RG93bkVsID0gdGFyZ2V0O1xuICAgICAgYWN0aXZlR3JvdXAgPSBvcHRpb25zLmdyb3VwO1xuICAgICAgU29ydGFibGUuZHJhZ2dlZCA9IGRyYWdFbDtcbiAgICAgIHRhcEV2dCA9IHtcbiAgICAgICAgdGFyZ2V0OiBkcmFnRWwsXG4gICAgICAgIGNsaWVudFg6ICh0b3VjaCB8fCBldnQpLmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6ICh0b3VjaCB8fCBldnQpLmNsaWVudFlcbiAgICAgIH07XG4gICAgICB0YXBEaXN0YW5jZUxlZnQgPSB0YXBFdnQuY2xpZW50WCAtIGRyYWdSZWN0LmxlZnQ7XG4gICAgICB0YXBEaXN0YW5jZVRvcCA9IHRhcEV2dC5jbGllbnRZIC0gZHJhZ1JlY3QudG9wO1xuICAgICAgdGhpcy5fbGFzdFggPSAodG91Y2ggfHwgZXZ0KS5jbGllbnRYO1xuICAgICAgdGhpcy5fbGFzdFkgPSAodG91Y2ggfHwgZXZ0KS5jbGllbnRZO1xuICAgICAgZHJhZ0VsLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJ2FsbCc7XG5cbiAgICAgIGRyYWdTdGFydEZuID0gZnVuY3Rpb24gZHJhZ1N0YXJ0Rm4oKSB7XG4gICAgICAgIHBsdWdpbkV2ZW50KCdkZWxheUVuZGVkJywgX3RoaXMsIHtcbiAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgICAgIF90aGlzLl9vbkRyb3AoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBEZWxheWVkIGRyYWcgaGFzIGJlZW4gdHJpZ2dlcmVkXG4gICAgICAgIC8vIHdlIGNhbiByZS1lbmFibGUgdGhlIGV2ZW50czogdG91Y2htb3ZlL21vdXNlbW92ZVxuXG5cbiAgICAgICAgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmICghRmlyZUZveCAmJiBfdGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAgICAgICBkcmFnRWwuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSAvLyBCaW5kIHRoZSBldmVudHM6IGRyYWdzdGFydC9kcmFnZW5kXG5cblxuICAgICAgICBfdGhpcy5fdHJpZ2dlckRyYWdTdGFydChldnQsIHRvdWNoKTsgLy8gRHJhZyBzdGFydCBldmVudFxuXG5cbiAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgIHNvcnRhYmxlOiBfdGhpcyxcbiAgICAgICAgICBuYW1lOiAnY2hvb3NlJyxcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgfSk7IC8vIENob3NlbiBpdGVtXG5cblxuICAgICAgICB0b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuY2hvc2VuQ2xhc3MsIHRydWUpO1xuICAgICAgfTsgLy8gRGlzYWJsZSBcImRyYWdnYWJsZVwiXG5cblxuICAgICAgb3B0aW9ucy5pZ25vcmUuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjcml0ZXJpYSkge1xuICAgICAgICBmaW5kKGRyYWdFbCwgY3JpdGVyaWEudHJpbSgpLCBfZGlzYWJsZURyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIG9uKG93bmVyRG9jdW1lbnQsICdkcmFnb3ZlcicsIG5lYXJlc3RFbXB0eUluc2VydERldGVjdEV2ZW50KTtcbiAgICAgIG9uKG93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudCk7XG4gICAgICBvbihvd25lckRvY3VtZW50LCAndG91Y2htb3ZlJywgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQpO1xuICAgICAgb24ob3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCBfdGhpcy5fb25Ecm9wKTtcbiAgICAgIG9uKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9vbkRyb3ApO1xuICAgICAgb24ob3duZXJEb2N1bWVudCwgJ3RvdWNoY2FuY2VsJywgX3RoaXMuX29uRHJvcCk7IC8vIE1ha2UgZHJhZ0VsIGRyYWdnYWJsZSAobXVzdCBiZSBiZWZvcmUgZGVsYXkgZm9yIEZpcmVGb3gpXG5cbiAgICAgIGlmIChGaXJlRm94ICYmIHRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFN0YXJ0VGhyZXNob2xkID0gNDtcbiAgICAgICAgZHJhZ0VsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHBsdWdpbkV2ZW50KCdkZWxheVN0YXJ0JywgdGhpcywge1xuICAgICAgICBldnQ6IGV2dFxuICAgICAgfSk7IC8vIERlbGF5IGlzIGltcG9zc2libGUgZm9yIG5hdGl2ZSBEbkQgaW4gRWRnZSBvciBJRVxuXG4gICAgICBpZiAob3B0aW9ucy5kZWxheSAmJiAoIW9wdGlvbnMuZGVsYXlPblRvdWNoT25seSB8fCB0b3VjaCkgJiYgKCF0aGlzLm5hdGl2ZURyYWdnYWJsZSB8fCAhKEVkZ2UgfHwgSUUxMU9yTGVzcykpKSB7XG4gICAgICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSB7XG4gICAgICAgICAgdGhpcy5fb25Ecm9wKCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gSWYgdGhlIHVzZXIgbW92ZXMgdGhlIHBvaW50ZXIgb3IgbGV0IGdvIHRoZSBjbGljayBvciB0b3VjaFxuICAgICAgICAvLyBiZWZvcmUgdGhlIGRlbGF5IGhhcyBiZWVuIHJlYWNoZWQ6XG4gICAgICAgIC8vIGRpc2FibGUgdGhlIGRlbGF5ZWQgZHJhZ1xuXG5cbiAgICAgICAgb24ob3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCBfdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcbiAgICAgICAgb24ob3duZXJEb2N1bWVudCwgJ3RvdWNoZW5kJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG4gICAgICAgIG9uKG93bmVyRG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuICAgICAgICBvbihvd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgX3RoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICAgIG9uKG93bmVyRG9jdW1lbnQsICd0b3VjaG1vdmUnLCBfdGhpcy5fZGVsYXllZERyYWdUb3VjaE1vdmVIYW5kbGVyKTtcbiAgICAgICAgb3B0aW9ucy5zdXBwb3J0UG9pbnRlciAmJiBvbihvd25lckRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCBfdGhpcy5fZGVsYXllZERyYWdUb3VjaE1vdmVIYW5kbGVyKTtcbiAgICAgICAgX3RoaXMuX2RyYWdTdGFydFRpbWVyID0gc2V0VGltZW91dChkcmFnU3RhcnRGbiwgb3B0aW9ucy5kZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFnU3RhcnRGbigpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcjogZnVuY3Rpb24gX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcihcbiAgLyoqIFRvdWNoRXZlbnR8UG9pbnRlckV2ZW50ICoqL1xuICBlKSB7XG4gICAgdmFyIHRvdWNoID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdIDogZTtcblxuICAgIGlmIChNYXRoLm1heChNYXRoLmFicyh0b3VjaC5jbGllbnRYIC0gdGhpcy5fbGFzdFgpLCBNYXRoLmFicyh0b3VjaC5jbGllbnRZIC0gdGhpcy5fbGFzdFkpKSA+PSBNYXRoLmZsb29yKHRoaXMub3B0aW9ucy50b3VjaFN0YXJ0VGhyZXNob2xkIC8gKHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpKSkge1xuICAgICAgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKCk7XG4gICAgfVxuICB9LFxuICBfZGlzYWJsZURlbGF5ZWREcmFnOiBmdW5jdGlvbiBfZGlzYWJsZURlbGF5ZWREcmFnKCkge1xuICAgIGRyYWdFbCAmJiBfZGlzYWJsZURyYWdnYWJsZShkcmFnRWwpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9kcmFnU3RhcnRUaW1lcik7XG5cbiAgICB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKTtcbiAgfSxcbiAgX2Rpc2FibGVEZWxheWVkRHJhZ0V2ZW50czogZnVuY3Rpb24gX2Rpc2FibGVEZWxheWVkRHJhZ0V2ZW50cygpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IHRoaXMuZWwub3duZXJEb2N1bWVudDtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuICAgIG9mZihvd25lckRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuICAgIG9mZihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuICAgIG9mZihvd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5fZGVsYXllZERyYWdUb3VjaE1vdmVIYW5kbGVyKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICdwb2ludGVybW92ZScsIHRoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gIH0sXG4gIF90cmlnZ2VyRHJhZ1N0YXJ0OiBmdW5jdGlvbiBfdHJpZ2dlckRyYWdTdGFydChcbiAgLyoqIEV2ZW50ICovXG4gIGV2dCxcbiAgLyoqIFRvdWNoICovXG4gIHRvdWNoKSB7XG4gICAgdG91Y2ggPSB0b3VjaCB8fCBldnQucG9pbnRlclR5cGUgPT0gJ3RvdWNoJyAmJiBldnQ7XG5cbiAgICBpZiAoIXRoaXMubmF0aXZlRHJhZ2dhYmxlIHx8IHRvdWNoKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnN1cHBvcnRQb2ludGVyKSB7XG4gICAgICAgIG9uKGRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgICB9IGVsc2UgaWYgKHRvdWNoKSB7XG4gICAgICAgIG9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uKGRyYWdFbCwgJ2RyYWdlbmQnLCB0aGlzKTtcbiAgICAgIG9uKHJvb3RFbCwgJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgICAgICAvLyBUaW1lb3V0IG5lY2Nlc3NhcnkgZm9yIElFOVxuICAgICAgICBfbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHt9XG4gIH0sXG4gIF9kcmFnU3RhcnRlZDogZnVuY3Rpb24gX2RyYWdTdGFydGVkKGZhbGxiYWNrLCBldnQpIHtcblxuICAgIGF3YWl0aW5nRHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIGlmIChyb290RWwgJiYgZHJhZ0VsKSB7XG4gICAgICBwbHVnaW5FdmVudCgnZHJhZ1N0YXJ0ZWQnLCB0aGlzLCB7XG4gICAgICAgIGV2dDogZXZ0XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICAgIG9uKGRvY3VtZW50LCAnZHJhZ292ZXInLCBfY2hlY2tPdXRzaWRlVGFyZ2V0RWwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uczsgLy8gQXBwbHkgZWZmZWN0XG5cbiAgICAgICFmYWxsYmFjayAmJiB0b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuZHJhZ0NsYXNzLCBmYWxzZSk7XG4gICAgICB0b2dnbGVDbGFzcyhkcmFnRWwsIG9wdGlvbnMuZ2hvc3RDbGFzcywgdHJ1ZSk7XG4gICAgICBTb3J0YWJsZS5hY3RpdmUgPSB0aGlzO1xuICAgICAgZmFsbGJhY2sgJiYgdGhpcy5fYXBwZW5kR2hvc3QoKTsgLy8gRHJhZyBzdGFydCBldmVudFxuXG4gICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICBuYW1lOiAnc3RhcnQnLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9udWxsaW5nKCk7XG4gICAgfVxuICB9LFxuICBfZW11bGF0ZURyYWdPdmVyOiBmdW5jdGlvbiBfZW11bGF0ZURyYWdPdmVyKCkge1xuICAgIGlmICh0b3VjaEV2dCkge1xuICAgICAgdGhpcy5fbGFzdFggPSB0b3VjaEV2dC5jbGllbnRYO1xuICAgICAgdGhpcy5fbGFzdFkgPSB0b3VjaEV2dC5jbGllbnRZO1xuXG4gICAgICBfaGlkZUdob3N0Rm9yVGFyZ2V0KCk7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoRXZ0LmNsaWVudFgsIHRvdWNoRXZ0LmNsaWVudFkpO1xuICAgICAgdmFyIHBhcmVudCA9IHRhcmdldDtcblxuICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQuc2hhZG93Um9vdCkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuc2hhZG93Um9vdC5lbGVtZW50RnJvbVBvaW50KHRvdWNoRXZ0LmNsaWVudFgsIHRvdWNoRXZ0LmNsaWVudFkpO1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBwYXJlbnQpIGJyZWFrO1xuICAgICAgICBwYXJlbnQgPSB0YXJnZXQ7XG4gICAgICB9XG5cbiAgICAgIGRyYWdFbC5wYXJlbnROb2RlW2V4cGFuZG9dLl9pc091dHNpZGVUaGlzRWwodGFyZ2V0KTtcblxuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgaWYgKHBhcmVudFtleHBhbmRvXSkge1xuICAgICAgICAgICAgdmFyIGluc2VydGVkID0gdm9pZCAwO1xuICAgICAgICAgICAgaW5zZXJ0ZWQgPSBwYXJlbnRbZXhwYW5kb10uX29uRHJhZ092ZXIoe1xuICAgICAgICAgICAgICBjbGllbnRYOiB0b3VjaEV2dC5jbGllbnRYLFxuICAgICAgICAgICAgICBjbGllbnRZOiB0b3VjaEV2dC5jbGllbnRZLFxuICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgcm9vdEVsOiBwYXJlbnRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaW5zZXJ0ZWQgJiYgIXRoaXMub3B0aW9ucy5kcmFnb3ZlckJ1YmJsZSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YXJnZXQgPSBwYXJlbnQ7IC8vIHN0b3JlIGxhc3QgZWxlbWVudFxuICAgICAgICB9XG4gICAgICAgIC8qIGpzaGludCBib3NzOnRydWUgKi9cbiAgICAgICAgd2hpbGUgKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKTtcbiAgICAgIH1cblxuICAgICAgX3VuaGlkZUdob3N0Rm9yVGFyZ2V0KCk7XG4gICAgfVxuICB9LFxuICBfb25Ub3VjaE1vdmU6IGZ1bmN0aW9uIF9vblRvdWNoTW92ZShcbiAgLyoqVG91Y2hFdmVudCovXG4gIGV2dCkge1xuICAgIGlmICh0YXBFdnQpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGZhbGxiYWNrVG9sZXJhbmNlID0gb3B0aW9ucy5mYWxsYmFja1RvbGVyYW5jZSxcbiAgICAgICAgICBmYWxsYmFja09mZnNldCA9IG9wdGlvbnMuZmFsbGJhY2tPZmZzZXQsXG4gICAgICAgICAgdG91Y2ggPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0LFxuICAgICAgICAgIGdob3N0TWF0cml4ID0gZ2hvc3RFbCAmJiBtYXRyaXgoZ2hvc3RFbCwgdHJ1ZSksXG4gICAgICAgICAgc2NhbGVYID0gZ2hvc3RFbCAmJiBnaG9zdE1hdHJpeCAmJiBnaG9zdE1hdHJpeC5hLFxuICAgICAgICAgIHNjYWxlWSA9IGdob3N0RWwgJiYgZ2hvc3RNYXRyaXggJiYgZ2hvc3RNYXRyaXguZCxcbiAgICAgICAgICByZWxhdGl2ZVNjcm9sbE9mZnNldCA9IFBvc2l0aW9uR2hvc3RBYnNvbHV0ZWx5ICYmIGdob3N0UmVsYXRpdmVQYXJlbnQgJiYgZ2V0UmVsYXRpdmVTY3JvbGxPZmZzZXQoZ2hvc3RSZWxhdGl2ZVBhcmVudCksXG4gICAgICAgICAgZHggPSAodG91Y2guY2xpZW50WCAtIHRhcEV2dC5jbGllbnRYICsgZmFsbGJhY2tPZmZzZXQueCkgLyAoc2NhbGVYIHx8IDEpICsgKHJlbGF0aXZlU2Nyb2xsT2Zmc2V0ID8gcmVsYXRpdmVTY3JvbGxPZmZzZXRbMF0gLSBnaG9zdFJlbGF0aXZlUGFyZW50SW5pdGlhbFNjcm9sbFswXSA6IDApIC8gKHNjYWxlWCB8fCAxKSxcbiAgICAgICAgICBkeSA9ICh0b3VjaC5jbGllbnRZIC0gdGFwRXZ0LmNsaWVudFkgKyBmYWxsYmFja09mZnNldC55KSAvIChzY2FsZVkgfHwgMSkgKyAocmVsYXRpdmVTY3JvbGxPZmZzZXQgPyByZWxhdGl2ZVNjcm9sbE9mZnNldFsxXSAtIGdob3N0UmVsYXRpdmVQYXJlbnRJbml0aWFsU2Nyb2xsWzFdIDogMCkgLyAoc2NhbGVZIHx8IDEpOyAvLyBvbmx5IHNldCB0aGUgc3RhdHVzIHRvIGRyYWdnaW5nLCB3aGVuIHdlIGFyZSBhY3R1YWxseSBkcmFnZ2luZ1xuXG4gICAgICBpZiAoIVNvcnRhYmxlLmFjdGl2ZSAmJiAhYXdhaXRpbmdEcmFnU3RhcnRlZCkge1xuICAgICAgICBpZiAoZmFsbGJhY2tUb2xlcmFuY2UgJiYgTWF0aC5tYXgoTWF0aC5hYnModG91Y2guY2xpZW50WCAtIHRoaXMuX2xhc3RYKSwgTWF0aC5hYnModG91Y2guY2xpZW50WSAtIHRoaXMuX2xhc3RZKSkgPCBmYWxsYmFja1RvbGVyYW5jZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2dCwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnaG9zdEVsKSB7XG4gICAgICAgIGlmIChnaG9zdE1hdHJpeCkge1xuICAgICAgICAgIGdob3N0TWF0cml4LmUgKz0gZHggLSAobGFzdER4IHx8IDApO1xuICAgICAgICAgIGdob3N0TWF0cml4LmYgKz0gZHkgLSAobGFzdER5IHx8IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdob3N0TWF0cml4ID0ge1xuICAgICAgICAgICAgYTogMSxcbiAgICAgICAgICAgIGI6IDAsXG4gICAgICAgICAgICBjOiAwLFxuICAgICAgICAgICAgZDogMSxcbiAgICAgICAgICAgIGU6IGR4LFxuICAgICAgICAgICAgZjogZHlcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzc01hdHJpeCA9IFwibWF0cml4KFwiLmNvbmNhdChnaG9zdE1hdHJpeC5hLCBcIixcIikuY29uY2F0KGdob3N0TWF0cml4LmIsIFwiLFwiKS5jb25jYXQoZ2hvc3RNYXRyaXguYywgXCIsXCIpLmNvbmNhdChnaG9zdE1hdHJpeC5kLCBcIixcIikuY29uY2F0KGdob3N0TWF0cml4LmUsIFwiLFwiKS5jb25jYXQoZ2hvc3RNYXRyaXguZiwgXCIpXCIpO1xuICAgICAgICBjc3MoZ2hvc3RFbCwgJ3dlYmtpdFRyYW5zZm9ybScsIGNzc01hdHJpeCk7XG4gICAgICAgIGNzcyhnaG9zdEVsLCAnbW96VHJhbnNmb3JtJywgY3NzTWF0cml4KTtcbiAgICAgICAgY3NzKGdob3N0RWwsICdtc1RyYW5zZm9ybScsIGNzc01hdHJpeCk7XG4gICAgICAgIGNzcyhnaG9zdEVsLCAndHJhbnNmb3JtJywgY3NzTWF0cml4KTtcbiAgICAgICAgbGFzdER4ID0gZHg7XG4gICAgICAgIGxhc3REeSA9IGR5O1xuICAgICAgICB0b3VjaEV2dCA9IHRvdWNoO1xuICAgICAgfVxuXG4gICAgICBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sXG4gIF9hcHBlbmRHaG9zdDogZnVuY3Rpb24gX2FwcGVuZEdob3N0KCkge1xuICAgIC8vIEJ1ZyBpZiB1c2luZyBzY2FsZSgpOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNjM3MDU4XG4gICAgLy8gTm90IGJlaW5nIGFkanVzdGVkIGZvclxuICAgIGlmICghZ2hvc3RFbCkge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMub3B0aW9ucy5mYWxsYmFja09uQm9keSA/IGRvY3VtZW50LmJvZHkgOiByb290RWwsXG4gICAgICAgICAgcmVjdCA9IGdldFJlY3QoZHJhZ0VsLCB0cnVlLCBQb3NpdGlvbkdob3N0QWJzb2x1dGVseSwgdHJ1ZSwgY29udGFpbmVyKSxcbiAgICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zOyAvLyBQb3NpdGlvbiBhYnNvbHV0ZWx5XG5cbiAgICAgIGlmIChQb3NpdGlvbkdob3N0QWJzb2x1dGVseSkge1xuICAgICAgICAvLyBHZXQgcmVsYXRpdmVseSBwb3NpdGlvbmVkIHBhcmVudFxuICAgICAgICBnaG9zdFJlbGF0aXZlUGFyZW50ID0gY29udGFpbmVyO1xuXG4gICAgICAgIHdoaWxlIChjc3MoZ2hvc3RSZWxhdGl2ZVBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnICYmIGNzcyhnaG9zdFJlbGF0aXZlUGFyZW50LCAndHJhbnNmb3JtJykgPT09ICdub25lJyAmJiBnaG9zdFJlbGF0aXZlUGFyZW50ICE9PSBkb2N1bWVudCkge1xuICAgICAgICAgIGdob3N0UmVsYXRpdmVQYXJlbnQgPSBnaG9zdFJlbGF0aXZlUGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2hvc3RSZWxhdGl2ZVBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSAmJiBnaG9zdFJlbGF0aXZlUGFyZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoZ2hvc3RSZWxhdGl2ZVBhcmVudCA9PT0gZG9jdW1lbnQpIGdob3N0UmVsYXRpdmVQYXJlbnQgPSBnZXRXaW5kb3dTY3JvbGxpbmdFbGVtZW50KCk7XG4gICAgICAgICAgcmVjdC50b3AgKz0gZ2hvc3RSZWxhdGl2ZVBhcmVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgcmVjdC5sZWZ0ICs9IGdob3N0UmVsYXRpdmVQYXJlbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnaG9zdFJlbGF0aXZlUGFyZW50ID0gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2hvc3RSZWxhdGl2ZVBhcmVudEluaXRpYWxTY3JvbGwgPSBnZXRSZWxhdGl2ZVNjcm9sbE9mZnNldChnaG9zdFJlbGF0aXZlUGFyZW50KTtcbiAgICAgIH1cblxuICAgICAgZ2hvc3RFbCA9IGRyYWdFbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0b2dnbGVDbGFzcyhnaG9zdEVsLCBvcHRpb25zLmdob3N0Q2xhc3MsIGZhbHNlKTtcbiAgICAgIHRvZ2dsZUNsYXNzKGdob3N0RWwsIG9wdGlvbnMuZmFsbGJhY2tDbGFzcywgdHJ1ZSk7XG4gICAgICB0b2dnbGVDbGFzcyhnaG9zdEVsLCBvcHRpb25zLmRyYWdDbGFzcywgdHJ1ZSk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ3RyYW5zZm9ybScsICcnKTtcbiAgICAgIGNzcyhnaG9zdEVsLCAnYm94LXNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ21hcmdpbicsIDApO1xuICAgICAgY3NzKGdob3N0RWwsICd0b3AnLCByZWN0LnRvcCk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ2xlZnQnLCByZWN0LmxlZnQpO1xuICAgICAgY3NzKGdob3N0RWwsICd3aWR0aCcsIHJlY3Qud2lkdGgpO1xuICAgICAgY3NzKGdob3N0RWwsICdoZWlnaHQnLCByZWN0LmhlaWdodCk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ29wYWNpdHknLCAnMC44Jyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ3Bvc2l0aW9uJywgUG9zaXRpb25HaG9zdEFic29sdXRlbHkgPyAnYWJzb2x1dGUnIDogJ2ZpeGVkJyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ3pJbmRleCcsICcxMDAwMDAnKTtcbiAgICAgIGNzcyhnaG9zdEVsLCAncG9pbnRlckV2ZW50cycsICdub25lJyk7XG4gICAgICBTb3J0YWJsZS5naG9zdCA9IGdob3N0RWw7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2hvc3RFbCk7IC8vIFNldCB0cmFuc2Zvcm0tb3JpZ2luXG5cbiAgICAgIGNzcyhnaG9zdEVsLCAndHJhbnNmb3JtLW9yaWdpbicsIHRhcERpc3RhbmNlTGVmdCAvIHBhcnNlSW50KGdob3N0RWwuc3R5bGUud2lkdGgpICogMTAwICsgJyUgJyArIHRhcERpc3RhbmNlVG9wIC8gcGFyc2VJbnQoZ2hvc3RFbC5zdHlsZS5oZWlnaHQpICogMTAwICsgJyUnKTtcbiAgICB9XG4gIH0sXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KFxuICAvKipFdmVudCovXG4gIGV2dCxcbiAgLyoqYm9vbGVhbiovXG4gIGZhbGxiYWNrKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBkYXRhVHJhbnNmZXIgPSBldnQuZGF0YVRyYW5zZmVyO1xuICAgIHZhciBvcHRpb25zID0gX3RoaXMub3B0aW9ucztcbiAgICBwbHVnaW5FdmVudCgnZHJhZ1N0YXJ0JywgdGhpcywge1xuICAgICAgZXZ0OiBldnRcbiAgICB9KTtcblxuICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSB7XG4gICAgICB0aGlzLl9vbkRyb3AoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBsdWdpbkV2ZW50KCdzZXR1cENsb25lJywgdGhpcyk7XG5cbiAgICBpZiAoIVNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHtcbiAgICAgIGNsb25lRWwgPSBjbG9uZShkcmFnRWwpO1xuICAgICAgY2xvbmVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgIGNsb25lRWwuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICBjbG9uZUVsLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJyc7XG5cbiAgICAgIHRoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICB0b2dnbGVDbGFzcyhjbG9uZUVsLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsIGZhbHNlKTtcbiAgICAgIFNvcnRhYmxlLmNsb25lID0gY2xvbmVFbDtcbiAgICB9IC8vICMxMTQzOiBJRnJhbWUgc3VwcG9ydCB3b3JrYXJvdW5kXG5cblxuICAgIF90aGlzLmNsb25lSWQgPSBfbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgcGx1Z2luRXZlbnQoJ2Nsb25lJywgX3RoaXMpO1xuICAgICAgaWYgKFNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHJldHVybjtcblxuICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlKSB7XG4gICAgICAgIHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmVFbCwgZHJhZ0VsKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHNvcnRhYmxlOiBfdGhpcyxcbiAgICAgICAgbmFtZTogJ2Nsb25lJ1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgIWZhbGxiYWNrICYmIHRvZ2dsZUNsYXNzKGRyYWdFbCwgb3B0aW9ucy5kcmFnQ2xhc3MsIHRydWUpOyAvLyBTZXQgcHJvcGVyIGRyb3AgZXZlbnRzXG5cbiAgICBpZiAoZmFsbGJhY2spIHtcbiAgICAgIGlnbm9yZU5leHRDbGljayA9IHRydWU7XG4gICAgICBfdGhpcy5fbG9vcElkID0gc2V0SW50ZXJ2YWwoX3RoaXMuX2VtdWxhdGVEcmFnT3ZlciwgNTApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVbmRvIHdoYXQgd2FzIHNldCBpbiBfcHJlcGFyZURyYWdTdGFydCBiZWZvcmUgZHJhZyBzdGFydGVkXG4gICAgICBvZmYoZG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX29uRHJvcCk7XG4gICAgICBvZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9vbkRyb3ApO1xuICAgICAgb2ZmKGRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fb25Ecm9wKTtcblxuICAgICAgaWYgKGRhdGFUcmFuc2Zlcikge1xuICAgICAgICBkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgb3B0aW9ucy5zZXREYXRhICYmIG9wdGlvbnMuc2V0RGF0YS5jYWxsKF90aGlzLCBkYXRhVHJhbnNmZXIsIGRyYWdFbCk7XG4gICAgICB9XG5cbiAgICAgIG9uKGRvY3VtZW50LCAnZHJvcCcsIF90aGlzKTsgLy8gIzEyNzYgZml4OlxuXG4gICAgICBjc3MoZHJhZ0VsLCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVooMCknKTtcbiAgICB9XG5cbiAgICBhd2FpdGluZ0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICBfdGhpcy5fZHJhZ1N0YXJ0SWQgPSBfbmV4dFRpY2soX3RoaXMuX2RyYWdTdGFydGVkLmJpbmQoX3RoaXMsIGZhbGxiYWNrLCBldnQpKTtcbiAgICBvbihkb2N1bWVudCwgJ3NlbGVjdHN0YXJ0JywgX3RoaXMpO1xuICAgIG1vdmVkID0gdHJ1ZTtcblxuICAgIGlmIChTYWZhcmkpIHtcbiAgICAgIGNzcyhkb2N1bWVudC5ib2R5LCAndXNlci1zZWxlY3QnLCAnbm9uZScpO1xuICAgIH1cbiAgfSxcbiAgLy8gUmV0dXJucyB0cnVlIC0gaWYgbm8gZnVydGhlciBhY3Rpb24gaXMgbmVlZGVkIChlaXRoZXIgaW5zZXJ0ZWQgb3IgYW5vdGhlciBjb25kaXRpb24pXG4gIF9vbkRyYWdPdmVyOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihcbiAgLyoqRXZlbnQqL1xuICBldnQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLmVsLFxuICAgICAgICB0YXJnZXQgPSBldnQudGFyZ2V0LFxuICAgICAgICBkcmFnUmVjdCxcbiAgICAgICAgdGFyZ2V0UmVjdCxcbiAgICAgICAgcmV2ZXJ0LFxuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBncm91cCA9IG9wdGlvbnMuZ3JvdXAsXG4gICAgICAgIGFjdGl2ZVNvcnRhYmxlID0gU29ydGFibGUuYWN0aXZlLFxuICAgICAgICBpc093bmVyID0gYWN0aXZlR3JvdXAgPT09IGdyb3VwLFxuICAgICAgICBjYW5Tb3J0ID0gb3B0aW9ucy5zb3J0LFxuICAgICAgICBmcm9tU29ydGFibGUgPSBwdXRTb3J0YWJsZSB8fCBhY3RpdmVTb3J0YWJsZSxcbiAgICAgICAgdmVydGljYWwsXG4gICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgY29tcGxldGVkRmlyZWQgPSBmYWxzZTtcblxuICAgIGlmIChfc2lsZW50KSByZXR1cm47XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckV2ZW50KG5hbWUsIGV4dHJhKSB7XG4gICAgICBwbHVnaW5FdmVudChuYW1lLCBfdGhpcywgX29iamVjdFNwcmVhZDIoe1xuICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgaXNPd25lcjogaXNPd25lcixcbiAgICAgICAgYXhpczogdmVydGljYWwgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnLFxuICAgICAgICByZXZlcnQ6IHJldmVydCxcbiAgICAgICAgZHJhZ1JlY3Q6IGRyYWdSZWN0LFxuICAgICAgICB0YXJnZXRSZWN0OiB0YXJnZXRSZWN0LFxuICAgICAgICBjYW5Tb3J0OiBjYW5Tb3J0LFxuICAgICAgICBmcm9tU29ydGFibGU6IGZyb21Tb3J0YWJsZSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbXBsZXRlZDogY29tcGxldGVkLFxuICAgICAgICBvbk1vdmU6IGZ1bmN0aW9uIG9uTW92ZSh0YXJnZXQsIGFmdGVyKSB7XG4gICAgICAgICAgcmV0dXJuIF9vbk1vdmUocm9vdEVsLCBlbCwgZHJhZ0VsLCBkcmFnUmVjdCwgdGFyZ2V0LCBnZXRSZWN0KHRhcmdldCksIGV2dCwgYWZ0ZXIpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VkOiBjaGFuZ2VkXG4gICAgICB9LCBleHRyYSkpO1xuICAgIH0gLy8gQ2FwdHVyZSBhbmltYXRpb24gc3RhdGVcblxuXG4gICAgZnVuY3Rpb24gY2FwdHVyZSgpIHtcbiAgICAgIGRyYWdPdmVyRXZlbnQoJ2RyYWdPdmVyQW5pbWF0aW9uQ2FwdHVyZScpO1xuXG4gICAgICBfdGhpcy5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcblxuICAgICAgaWYgKF90aGlzICE9PSBmcm9tU29ydGFibGUpIHtcbiAgICAgICAgZnJvbVNvcnRhYmxlLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGludm9jYXRpb24gd2hlbiBkcmFnRWwgaXMgaW5zZXJ0ZWQgKG9yIGNvbXBsZXRlZClcblxuXG4gICAgZnVuY3Rpb24gY29tcGxldGVkKGluc2VydGlvbikge1xuICAgICAgZHJhZ092ZXJFdmVudCgnZHJhZ092ZXJDb21wbGV0ZWQnLCB7XG4gICAgICAgIGluc2VydGlvbjogaW5zZXJ0aW9uXG4gICAgICB9KTtcblxuICAgICAgaWYgKGluc2VydGlvbikge1xuICAgICAgICAvLyBDbG9uZXMgbXVzdCBiZSBoaWRkZW4gYmVmb3JlIGZvbGRpbmcgYW5pbWF0aW9uIHRvIGNhcHR1cmUgZHJhZ1JlY3RBYnNvbHV0ZSBwcm9wZXJseVxuICAgICAgICBpZiAoaXNPd25lcikge1xuICAgICAgICAgIGFjdGl2ZVNvcnRhYmxlLl9oaWRlQ2xvbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVTb3J0YWJsZS5fc2hvd0Nsb25lKF90aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpcyAhPT0gZnJvbVNvcnRhYmxlKSB7XG4gICAgICAgICAgLy8gU2V0IGdob3N0IGNsYXNzIHRvIG5ldyBzb3J0YWJsZSdzIGdob3N0IGNsYXNzXG4gICAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBwdXRTb3J0YWJsZSA/IHB1dFNvcnRhYmxlLm9wdGlvbnMuZ2hvc3RDbGFzcyA6IGFjdGl2ZVNvcnRhYmxlLm9wdGlvbnMuZ2hvc3RDbGFzcywgZmFsc2UpO1xuICAgICAgICAgIHRvZ2dsZUNsYXNzKGRyYWdFbCwgb3B0aW9ucy5naG9zdENsYXNzLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwdXRTb3J0YWJsZSAhPT0gX3RoaXMgJiYgX3RoaXMgIT09IFNvcnRhYmxlLmFjdGl2ZSkge1xuICAgICAgICAgIHB1dFNvcnRhYmxlID0gX3RoaXM7XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoaXMgPT09IFNvcnRhYmxlLmFjdGl2ZSAmJiBwdXRTb3J0YWJsZSkge1xuICAgICAgICAgIHB1dFNvcnRhYmxlID0gbnVsbDtcbiAgICAgICAgfSAvLyBBbmltYXRpb25cblxuXG4gICAgICAgIGlmIChmcm9tU29ydGFibGUgPT09IF90aGlzKSB7XG4gICAgICAgICAgX3RoaXMuX2lnbm9yZVdoaWxlQW5pbWF0aW5nID0gdGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuYW5pbWF0ZUFsbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZHJhZ092ZXJFdmVudCgnZHJhZ092ZXJBbmltYXRpb25Db21wbGV0ZScpO1xuICAgICAgICAgIF90aGlzLl9pZ25vcmVXaGlsZUFuaW1hdGluZyA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChfdGhpcyAhPT0gZnJvbVNvcnRhYmxlKSB7XG4gICAgICAgICAgZnJvbVNvcnRhYmxlLmFuaW1hdGVBbGwoKTtcbiAgICAgICAgICBmcm9tU29ydGFibGUuX2lnbm9yZVdoaWxlQW5pbWF0aW5nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOdWxsIGxhc3RUYXJnZXQgaWYgaXQgaXMgbm90IGluc2lkZSBhIHByZXZpb3VzbHkgc3dhcHBlZCBlbGVtZW50XG5cblxuICAgICAgaWYgKHRhcmdldCA9PT0gZHJhZ0VsICYmICFkcmFnRWwuYW5pbWF0ZWQgfHwgdGFyZ2V0ID09PSBlbCAmJiAhdGFyZ2V0LmFuaW1hdGVkKSB7XG4gICAgICAgIGxhc3RUYXJnZXQgPSBudWxsO1xuICAgICAgfSAvLyBubyBidWJibGluZyBhbmQgbm90IGZhbGxiYWNrXG5cblxuICAgICAgaWYgKCFvcHRpb25zLmRyYWdvdmVyQnViYmxlICYmICFldnQucm9vdEVsICYmIHRhcmdldCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgZHJhZ0VsLnBhcmVudE5vZGVbZXhwYW5kb10uX2lzT3V0c2lkZVRoaXNFbChldnQudGFyZ2V0KTsgLy8gRG8gbm90IGRldGVjdCBmb3IgZW1wdHkgaW5zZXJ0IGlmIGFscmVhZHkgaW5zZXJ0ZWRcblxuXG4gICAgICAgICFpbnNlcnRpb24gJiYgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQoZXZ0KTtcbiAgICAgIH1cblxuICAgICAgIW9wdGlvbnMuZHJhZ292ZXJCdWJibGUgJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbiAmJiBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm4gY29tcGxldGVkRmlyZWQgPSB0cnVlO1xuICAgIH0gLy8gQ2FsbCB3aGVuIGRyYWdFbCBoYXMgYmVlbiBpbnNlcnRlZFxuXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VkKCkge1xuICAgICAgbmV3SW5kZXggPSBpbmRleChkcmFnRWwpO1xuICAgICAgbmV3RHJhZ2dhYmxlSW5kZXggPSBpbmRleChkcmFnRWwsIG9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICBzb3J0YWJsZTogX3RoaXMsXG4gICAgICAgIG5hbWU6ICdjaGFuZ2UnLFxuICAgICAgICB0b0VsOiBlbCxcbiAgICAgICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgICAgICBuZXdEcmFnZ2FibGVJbmRleDogbmV3RHJhZ2dhYmxlSW5kZXgsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2dC5wcmV2ZW50RGVmYXVsdCAhPT0gdm9pZCAwKSB7XG4gICAgICBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBjbG9zZXN0KHRhcmdldCwgb3B0aW9ucy5kcmFnZ2FibGUsIGVsLCB0cnVlKTtcbiAgICBkcmFnT3ZlckV2ZW50KCdkcmFnT3ZlcicpO1xuICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSByZXR1cm4gY29tcGxldGVkRmlyZWQ7XG5cbiAgICBpZiAoZHJhZ0VsLmNvbnRhaW5zKGV2dC50YXJnZXQpIHx8IHRhcmdldC5hbmltYXRlZCAmJiB0YXJnZXQuYW5pbWF0aW5nWCAmJiB0YXJnZXQuYW5pbWF0aW5nWSB8fCBfdGhpcy5faWdub3JlV2hpbGVBbmltYXRpbmcgPT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgfVxuXG4gICAgaWdub3JlTmV4dENsaWNrID0gZmFsc2U7XG5cbiAgICBpZiAoYWN0aXZlU29ydGFibGUgJiYgIW9wdGlvbnMuZGlzYWJsZWQgJiYgKGlzT3duZXIgPyBjYW5Tb3J0IHx8IChyZXZlcnQgPSBwYXJlbnRFbCAhPT0gcm9vdEVsKSAvLyBSZXZlcnRpbmcgaXRlbSBpbnRvIHRoZSBvcmlnaW5hbCBsaXN0XG4gICAgOiBwdXRTb3J0YWJsZSA9PT0gdGhpcyB8fCAodGhpcy5sYXN0UHV0TW9kZSA9IGFjdGl2ZUdyb3VwLmNoZWNrUHVsbCh0aGlzLCBhY3RpdmVTb3J0YWJsZSwgZHJhZ0VsLCBldnQpKSAmJiBncm91cC5jaGVja1B1dCh0aGlzLCBhY3RpdmVTb3J0YWJsZSwgZHJhZ0VsLCBldnQpKSkge1xuICAgICAgdmVydGljYWwgPSB0aGlzLl9nZXREaXJlY3Rpb24oZXZ0LCB0YXJnZXQpID09PSAndmVydGljYWwnO1xuICAgICAgZHJhZ1JlY3QgPSBnZXRSZWN0KGRyYWdFbCk7XG4gICAgICBkcmFnT3ZlckV2ZW50KCdkcmFnT3ZlclZhbGlkJyk7XG4gICAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkgcmV0dXJuIGNvbXBsZXRlZEZpcmVkO1xuXG4gICAgICBpZiAocmV2ZXJ0KSB7XG4gICAgICAgIHBhcmVudEVsID0gcm9vdEVsOyAvLyBhY3R1YWxpemF0aW9uXG5cbiAgICAgICAgY2FwdHVyZSgpO1xuXG4gICAgICAgIHRoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICAgIGRyYWdPdmVyRXZlbnQoJ3JldmVydCcpO1xuXG4gICAgICAgIGlmICghU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgICAgIGlmIChuZXh0RWwpIHtcbiAgICAgICAgICAgIHJvb3RFbC5pbnNlcnRCZWZvcmUoZHJhZ0VsLCBuZXh0RWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcGxldGVkKHRydWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxMYXN0Q2hpbGQgPSBsYXN0Q2hpbGQoZWwsIG9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKCFlbExhc3RDaGlsZCB8fCBfZ2hvc3RJc0xhc3QoZXZ0LCB2ZXJ0aWNhbCwgdGhpcykgJiYgIWVsTGFzdENoaWxkLmFuaW1hdGVkKSB7XG4gICAgICAgIC8vIEluc2VydCB0byBlbmQgb2YgbGlzdFxuICAgICAgICAvLyBJZiBhbHJlYWR5IGF0IGVuZCBvZiBsaXN0OiBEbyBub3QgaW5zZXJ0XG4gICAgICAgIGlmIChlbExhc3RDaGlsZCA9PT0gZHJhZ0VsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgICAgIH0gLy8gaWYgdGhlcmUgaXMgYSBsYXN0IGVsZW1lbnQsIGl0IGlzIHRoZSB0YXJnZXRcblxuXG4gICAgICAgIGlmIChlbExhc3RDaGlsZCAmJiBlbCA9PT0gZXZ0LnRhcmdldCkge1xuICAgICAgICAgIHRhcmdldCA9IGVsTGFzdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIHRhcmdldFJlY3QgPSBnZXRSZWN0KHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX29uTW92ZShyb290RWwsIGVsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXQsIHRhcmdldFJlY3QsIGV2dCwgISF0YXJnZXQpICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNhcHR1cmUoKTtcblxuICAgICAgICAgIGlmIChlbExhc3RDaGlsZCAmJiBlbExhc3RDaGlsZC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgLy8gdGhlIGxhc3QgZHJhZ2dhYmxlIGVsZW1lbnQgaXMgbm90IHRoZSBsYXN0IG5vZGVcbiAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShkcmFnRWwsIGVsTGFzdENoaWxkLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJlbnRFbCA9IGVsOyAvLyBhY3R1YWxpemF0aW9uXG5cbiAgICAgICAgICBjaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbExhc3RDaGlsZCAmJiBfZ2hvc3RJc0ZpcnN0KGV2dCwgdmVydGljYWwsIHRoaXMpKSB7XG4gICAgICAgIC8vIEluc2VydCB0byBzdGFydCBvZiBsaXN0XG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gZ2V0Q2hpbGQoZWwsIDAsIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgICAgIGlmIChmaXJzdENoaWxkID09PSBkcmFnRWwpIHtcbiAgICAgICAgICByZXR1cm4gY29tcGxldGVkKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldCA9IGZpcnN0Q2hpbGQ7XG4gICAgICAgIHRhcmdldFJlY3QgPSBnZXRSZWN0KHRhcmdldCk7XG5cbiAgICAgICAgaWYgKF9vbk1vdmUocm9vdEVsLCBlbCwgZHJhZ0VsLCBkcmFnUmVjdCwgdGFyZ2V0LCB0YXJnZXRSZWN0LCBldnQsIGZhbHNlKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjYXB0dXJlKCk7XG4gICAgICAgICAgZWwuaW5zZXJ0QmVmb3JlKGRyYWdFbCwgZmlyc3RDaGlsZCk7XG4gICAgICAgICAgcGFyZW50RWwgPSBlbDsgLy8gYWN0dWFsaXphdGlvblxuXG4gICAgICAgICAgY2hhbmdlZCgpO1xuICAgICAgICAgIHJldHVybiBjb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnBhcmVudE5vZGUgPT09IGVsKSB7XG4gICAgICAgIHRhcmdldFJlY3QgPSBnZXRSZWN0KHRhcmdldCk7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSAwLFxuICAgICAgICAgICAgdGFyZ2V0QmVmb3JlRmlyc3RTd2FwLFxuICAgICAgICAgICAgZGlmZmVyZW50TGV2ZWwgPSBkcmFnRWwucGFyZW50Tm9kZSAhPT0gZWwsXG4gICAgICAgICAgICBkaWZmZXJlbnRSb3dDb2wgPSAhX2RyYWdFbEluUm93Q29sdW1uKGRyYWdFbC5hbmltYXRlZCAmJiBkcmFnRWwudG9SZWN0IHx8IGRyYWdSZWN0LCB0YXJnZXQuYW5pbWF0ZWQgJiYgdGFyZ2V0LnRvUmVjdCB8fCB0YXJnZXRSZWN0LCB2ZXJ0aWNhbCksXG4gICAgICAgICAgICBzaWRlMSA9IHZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsXG4gICAgICAgICAgICBzY3JvbGxlZFBhc3RUb3AgPSBpc1Njcm9sbGVkUGFzdCh0YXJnZXQsICd0b3AnLCAndG9wJykgfHwgaXNTY3JvbGxlZFBhc3QoZHJhZ0VsLCAndG9wJywgJ3RvcCcpLFxuICAgICAgICAgICAgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsZWRQYXN0VG9wID8gc2Nyb2xsZWRQYXN0VG9wLnNjcm9sbFRvcCA6IHZvaWQgMDtcblxuICAgICAgICBpZiAobGFzdFRhcmdldCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgdGFyZ2V0QmVmb3JlRmlyc3RTd2FwID0gdGFyZ2V0UmVjdFtzaWRlMV07XG4gICAgICAgICAgcGFzdEZpcnN0SW52ZXJ0VGhyZXNoID0gZmFsc2U7XG4gICAgICAgICAgaXNDaXJjdW1zdGFudGlhbEludmVydCA9ICFkaWZmZXJlbnRSb3dDb2wgJiYgb3B0aW9ucy5pbnZlcnRTd2FwIHx8IGRpZmZlcmVudExldmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlyZWN0aW9uID0gX2dldFN3YXBEaXJlY3Rpb24oZXZ0LCB0YXJnZXQsIHRhcmdldFJlY3QsIHZlcnRpY2FsLCBkaWZmZXJlbnRSb3dDb2wgPyAxIDogb3B0aW9ucy5zd2FwVGhyZXNob2xkLCBvcHRpb25zLmludmVydGVkU3dhcFRocmVzaG9sZCA9PSBudWxsID8gb3B0aW9ucy5zd2FwVGhyZXNob2xkIDogb3B0aW9ucy5pbnZlcnRlZFN3YXBUaHJlc2hvbGQsIGlzQ2lyY3Vtc3RhbnRpYWxJbnZlcnQsIGxhc3RUYXJnZXQgPT09IHRhcmdldCk7XG4gICAgICAgIHZhciBzaWJsaW5nO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gIT09IDApIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0YXJnZXQgaXMgYmVzaWRlIGRyYWdFbCBpbiByZXNwZWN0aXZlIGRpcmVjdGlvbiAoaWdub3JpbmcgaGlkZGVuIGVsZW1lbnRzKVxuICAgICAgICAgIHZhciBkcmFnSW5kZXggPSBpbmRleChkcmFnRWwpO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZHJhZ0luZGV4IC09IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnRFbC5jaGlsZHJlbltkcmFnSW5kZXhdO1xuICAgICAgICAgIH0gd2hpbGUgKHNpYmxpbmcgJiYgKGNzcyhzaWJsaW5nLCAnZGlzcGxheScpID09PSAnbm9uZScgfHwgc2libGluZyA9PT0gZ2hvc3RFbCkpO1xuICAgICAgICB9IC8vIElmIGRyYWdFbCBpcyBhbHJlYWR5IGJlc2lkZSB0YXJnZXQ6IERvIG5vdCBpbnNlcnRcblxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDAgfHwgc2libGluZyA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0VGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBsYXN0RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgYWZ0ZXIgPSBmYWxzZTtcbiAgICAgICAgYWZ0ZXIgPSBkaXJlY3Rpb24gPT09IDE7XG5cbiAgICAgICAgdmFyIG1vdmVWZWN0b3IgPSBfb25Nb3ZlKHJvb3RFbCwgZWwsIGRyYWdFbCwgZHJhZ1JlY3QsIHRhcmdldCwgdGFyZ2V0UmVjdCwgZXZ0LCBhZnRlcik7XG5cbiAgICAgICAgaWYgKG1vdmVWZWN0b3IgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKG1vdmVWZWN0b3IgPT09IDEgfHwgbW92ZVZlY3RvciA9PT0gLTEpIHtcbiAgICAgICAgICAgIGFmdGVyID0gbW92ZVZlY3RvciA9PT0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KF91bnNpbGVudCwgMzApO1xuICAgICAgICAgIGNhcHR1cmUoKTtcblxuICAgICAgICAgIGlmIChhZnRlciAmJiAhbmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGRyYWdFbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcmFnRWwsIGFmdGVyID8gbmV4dFNpYmxpbmcgOiB0YXJnZXQpO1xuICAgICAgICAgIH0gLy8gVW5kbyBjaHJvbWUncyBzY3JvbGwgYWRqdXN0bWVudCAoaGFzIG5vIGVmZmVjdCBvbiBvdGhlciBicm93c2VycylcblxuXG4gICAgICAgICAgaWYgKHNjcm9sbGVkUGFzdFRvcCkge1xuICAgICAgICAgICAgc2Nyb2xsQnkoc2Nyb2xsZWRQYXN0VG9wLCAwLCBzY3JvbGxCZWZvcmUgLSBzY3JvbGxlZFBhc3RUb3Auc2Nyb2xsVG9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJlbnRFbCA9IGRyYWdFbC5wYXJlbnROb2RlOyAvLyBhY3R1YWxpemF0aW9uXG4gICAgICAgICAgLy8gbXVzdCBiZSBkb25lIGJlZm9yZSBhbmltYXRpb25cblxuICAgICAgICAgIGlmICh0YXJnZXRCZWZvcmVGaXJzdFN3YXAgIT09IHVuZGVmaW5lZCAmJiAhaXNDaXJjdW1zdGFudGlhbEludmVydCkge1xuICAgICAgICAgICAgdGFyZ2V0TW92ZURpc3RhbmNlID0gTWF0aC5hYnModGFyZ2V0QmVmb3JlRmlyc3RTd2FwIC0gZ2V0UmVjdCh0YXJnZXQpW3NpZGUxXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hhbmdlZCgpO1xuICAgICAgICAgIHJldHVybiBjb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVsLmNvbnRhaW5zKGRyYWdFbCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBfaWdub3JlV2hpbGVBbmltYXRpbmc6IG51bGwsXG4gIF9vZmZNb3ZlRXZlbnRzOiBmdW5jdGlvbiBfb2ZmTW92ZUV2ZW50cygpIHtcbiAgICBvZmYoZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgb2ZmKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgIG9mZihkb2N1bWVudCwgJ3BvaW50ZXJtb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgIG9mZihkb2N1bWVudCwgJ2RyYWdvdmVyJywgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQpO1xuICAgIG9mZihkb2N1bWVudCwgJ21vdXNlbW92ZScsIG5lYXJlc3RFbXB0eUluc2VydERldGVjdEV2ZW50KTtcbiAgICBvZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudCk7XG4gIH0sXG4gIF9vZmZVcEV2ZW50czogZnVuY3Rpb24gX29mZlVwRXZlbnRzKCkge1xuICAgIHZhciBvd25lckRvY3VtZW50ID0gdGhpcy5lbC5vd25lckRvY3VtZW50O1xuICAgIG9mZihvd25lckRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuX29uRHJvcCk7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uRHJvcCk7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICdwb2ludGVydXAnLCB0aGlzLl9vbkRyb3ApO1xuICAgIG9mZihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCB0aGlzLl9vbkRyb3ApO1xuICAgIG9mZihkb2N1bWVudCwgJ3NlbGVjdHN0YXJ0JywgdGhpcyk7XG4gIH0sXG4gIF9vbkRyb3A6IGZ1bmN0aW9uIF9vbkRyb3AoXG4gIC8qKkV2ZW50Ki9cbiAgZXZ0KSB7XG4gICAgdmFyIGVsID0gdGhpcy5lbCxcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9uczsgLy8gR2V0IHRoZSBpbmRleCBvZiB0aGUgZHJhZ2dlZCBlbGVtZW50IHdpdGhpbiBpdHMgcGFyZW50XG5cbiAgICBuZXdJbmRleCA9IGluZGV4KGRyYWdFbCk7XG4gICAgbmV3RHJhZ2dhYmxlSW5kZXggPSBpbmRleChkcmFnRWwsIG9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICBwbHVnaW5FdmVudCgnZHJvcCcsIHRoaXMsIHtcbiAgICAgIGV2dDogZXZ0XG4gICAgfSk7XG4gICAgcGFyZW50RWwgPSBkcmFnRWwgJiYgZHJhZ0VsLnBhcmVudE5vZGU7IC8vIEdldCBhZ2FpbiBhZnRlciBwbHVnaW4gZXZlbnRcblxuICAgIG5ld0luZGV4ID0gaW5kZXgoZHJhZ0VsKTtcbiAgICBuZXdEcmFnZ2FibGVJbmRleCA9IGluZGV4KGRyYWdFbCwgb3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgaWYgKFNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHtcbiAgICAgIHRoaXMuX251bGxpbmcoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0aW5nRHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBpc0NpcmN1bXN0YW50aWFsSW52ZXJ0ID0gZmFsc2U7XG4gICAgcGFzdEZpcnN0SW52ZXJ0VGhyZXNoID0gZmFsc2U7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9sb29wSWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9kcmFnU3RhcnRUaW1lcik7XG5cbiAgICBfY2FuY2VsTmV4dFRpY2sodGhpcy5jbG9uZUlkKTtcblxuICAgIF9jYW5jZWxOZXh0VGljayh0aGlzLl9kcmFnU3RhcnRJZCk7IC8vIFVuYmluZCBldmVudHNcblxuXG4gICAgaWYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICBvZmYoZG9jdW1lbnQsICdkcm9wJywgdGhpcyk7XG4gICAgICBvZmYoZWwsICdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCk7XG4gICAgfVxuXG4gICAgdGhpcy5fb2ZmTW92ZUV2ZW50cygpO1xuXG4gICAgdGhpcy5fb2ZmVXBFdmVudHMoKTtcblxuICAgIGlmIChTYWZhcmkpIHtcbiAgICAgIGNzcyhkb2N1bWVudC5ib2R5LCAndXNlci1zZWxlY3QnLCAnJyk7XG4gICAgfVxuXG4gICAgY3NzKGRyYWdFbCwgJ3RyYW5zZm9ybScsICcnKTtcblxuICAgIGlmIChldnQpIHtcbiAgICAgIGlmIChtb3ZlZCkge1xuICAgICAgICBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgIW9wdGlvbnMuZHJvcEJ1YmJsZSAmJiBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGdob3N0RWwgJiYgZ2hvc3RFbC5wYXJlbnROb2RlICYmIGdob3N0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnaG9zdEVsKTtcblxuICAgICAgaWYgKHJvb3RFbCA9PT0gcGFyZW50RWwgfHwgcHV0U29ydGFibGUgJiYgcHV0U29ydGFibGUubGFzdFB1dE1vZGUgIT09ICdjbG9uZScpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNsb25lKHMpXG4gICAgICAgIGNsb25lRWwgJiYgY2xvbmVFbC5wYXJlbnROb2RlICYmIGNsb25lRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZUVsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRyYWdFbCkge1xuICAgICAgICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAgICAgICBvZmYoZHJhZ0VsLCAnZHJhZ2VuZCcsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2Rpc2FibGVEcmFnZ2FibGUoZHJhZ0VsKTtcblxuICAgICAgICBkcmFnRWwuc3R5bGVbJ3dpbGwtY2hhbmdlJ10gPSAnJzsgLy8gUmVtb3ZlIGNsYXNzZXNcbiAgICAgICAgLy8gZ2hvc3RDbGFzcyBpcyBhZGRlZCBpbiBkcmFnU3RhcnRlZFxuXG4gICAgICAgIGlmIChtb3ZlZCAmJiAhYXdhaXRpbmdEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRvZ2dsZUNsYXNzKGRyYWdFbCwgcHV0U29ydGFibGUgPyBwdXRTb3J0YWJsZS5vcHRpb25zLmdob3N0Q2xhc3MgOiB0aGlzLm9wdGlvbnMuZ2hvc3RDbGFzcywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsIGZhbHNlKTsgLy8gRHJhZyBzdG9wIGV2ZW50XG5cbiAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICAgIG5hbWU6ICd1bmNob29zZScsXG4gICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgbmV3SW5kZXg6IG51bGwsXG4gICAgICAgICAgbmV3RHJhZ2dhYmxlSW5kZXg6IG51bGwsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyb290RWwgIT09IHBhcmVudEVsKSB7XG4gICAgICAgICAgaWYgKG5ld0luZGV4ID49IDApIHtcbiAgICAgICAgICAgIC8vIEFkZCBldmVudFxuICAgICAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICByb290RWw6IHBhcmVudEVsLFxuICAgICAgICAgICAgICBuYW1lOiAnYWRkJyxcbiAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIGZyb21FbDogcm9vdEVsLFxuICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgIH0pOyAvLyBSZW1vdmUgZXZlbnRcblxuXG4gICAgICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlJyxcbiAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgICAgICAgfSk7IC8vIGRyYWcgZnJvbSBvbmUgbGlzdCBhbmQgZHJvcCBpbnRvIGFub3RoZXJcblxuXG4gICAgICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgIHJvb3RFbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIG5hbWU6ICdzb3J0JyxcbiAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIGZyb21FbDogcm9vdEVsLFxuICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICAgICAgICBuYW1lOiAnc29ydCcsXG4gICAgICAgICAgICAgIHRvRWw6IHBhcmVudEVsLFxuICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHB1dFNvcnRhYmxlICYmIHB1dFNvcnRhYmxlLnNhdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobmV3SW5kZXggIT09IG9sZEluZGV4KSB7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAvLyBkcmFnICYgZHJvcCB3aXRoaW4gdGhlIHNhbWUgbGlzdFxuICAgICAgICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnc29ydCcsXG4gICAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTb3J0YWJsZS5hY3RpdmUpIHtcbiAgICAgICAgICAvKiBqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgICAgICAgICBpZiAobmV3SW5kZXggPT0gbnVsbCB8fCBuZXdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIG5ld0luZGV4ID0gb2xkSW5kZXg7XG4gICAgICAgICAgICBuZXdEcmFnZ2FibGVJbmRleCA9IG9sZERyYWdnYWJsZUluZGV4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICAgICAgbmFtZTogJ2VuZCcsXG4gICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgICAgIH0pOyAvLyBTYXZlIHNvcnRpbmdcblxuXG4gICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9udWxsaW5nKCk7XG4gIH0sXG4gIF9udWxsaW5nOiBmdW5jdGlvbiBfbnVsbGluZygpIHtcbiAgICBwbHVnaW5FdmVudCgnbnVsbGluZycsIHRoaXMpO1xuICAgIHJvb3RFbCA9IGRyYWdFbCA9IHBhcmVudEVsID0gZ2hvc3RFbCA9IG5leHRFbCA9IGNsb25lRWwgPSBsYXN0RG93bkVsID0gY2xvbmVIaWRkZW4gPSB0YXBFdnQgPSB0b3VjaEV2dCA9IG1vdmVkID0gbmV3SW5kZXggPSBuZXdEcmFnZ2FibGVJbmRleCA9IG9sZEluZGV4ID0gb2xkRHJhZ2dhYmxlSW5kZXggPSBsYXN0VGFyZ2V0ID0gbGFzdERpcmVjdGlvbiA9IHB1dFNvcnRhYmxlID0gYWN0aXZlR3JvdXAgPSBTb3J0YWJsZS5kcmFnZ2VkID0gU29ydGFibGUuZ2hvc3QgPSBTb3J0YWJsZS5jbG9uZSA9IFNvcnRhYmxlLmFjdGl2ZSA9IG51bGw7XG4gICAgc2F2ZWRJbnB1dENoZWNrZWQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLmNoZWNrZWQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHNhdmVkSW5wdXRDaGVja2VkLmxlbmd0aCA9IGxhc3REeCA9IGxhc3REeSA9IDA7XG4gIH0sXG4gIGhhbmRsZUV2ZW50OiBmdW5jdGlvbiBoYW5kbGVFdmVudChcbiAgLyoqRXZlbnQqL1xuICBldnQpIHtcbiAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICBjYXNlICdkcm9wJzpcbiAgICAgIGNhc2UgJ2RyYWdlbmQnOlxuICAgICAgICB0aGlzLl9vbkRyb3AoZXZ0KTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcbiAgICAgIGNhc2UgJ2RyYWdvdmVyJzpcbiAgICAgICAgaWYgKGRyYWdFbCkge1xuICAgICAgICAgIHRoaXMuX29uRHJhZ092ZXIoZXZ0KTtcblxuICAgICAgICAgIF9nbG9iYWxEcmFnT3ZlcihldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3NlbGVjdHN0YXJ0JzpcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcblxuICAvKipcclxuICAgKiBTZXJpYWxpemVzIHRoZSBpdGVtIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nLlxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmdbXX1cclxuICAgKi9cbiAgdG9BcnJheTogZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICB2YXIgb3JkZXIgPSBbXSxcbiAgICAgICAgZWwsXG4gICAgICAgIGNoaWxkcmVuID0gdGhpcy5lbC5jaGlsZHJlbixcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIG4gPSBjaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgZWwgPSBjaGlsZHJlbltpXTtcblxuICAgICAgaWYgKGNsb3Nlc3QoZWwsIG9wdGlvbnMuZHJhZ2dhYmxlLCB0aGlzLmVsLCBmYWxzZSkpIHtcbiAgICAgICAgb3JkZXIucHVzaChlbC5nZXRBdHRyaWJ1dGUob3B0aW9ucy5kYXRhSWRBdHRyKSB8fCBfZ2VuZXJhdGVJZChlbCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcmRlcjtcbiAgfSxcblxuICAvKipcclxuICAgKiBTb3J0cyB0aGUgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBhcnJheS5cclxuICAgKiBAcGFyYW0gIHtTdHJpbmdbXX0gIG9yZGVyICBvcmRlciBvZiB0aGUgaXRlbXNcclxuICAgKi9cbiAgc29ydDogZnVuY3Rpb24gc29ydChvcmRlciwgdXNlQW5pbWF0aW9uKSB7XG4gICAgdmFyIGl0ZW1zID0ge30sXG4gICAgICAgIHJvb3RFbCA9IHRoaXMuZWw7XG4gICAgdGhpcy50b0FycmF5KCkuZm9yRWFjaChmdW5jdGlvbiAoaWQsIGkpIHtcbiAgICAgIHZhciBlbCA9IHJvb3RFbC5jaGlsZHJlbltpXTtcblxuICAgICAgaWYgKGNsb3Nlc3QoZWwsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHJvb3RFbCwgZmFsc2UpKSB7XG4gICAgICAgIGl0ZW1zW2lkXSA9IGVsO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIHVzZUFuaW1hdGlvbiAmJiB0aGlzLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgIG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgICBpZiAoaXRlbXNbaWRdKSB7XG4gICAgICAgIHJvb3RFbC5yZW1vdmVDaGlsZChpdGVtc1tpZF0pO1xuICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQoaXRlbXNbaWRdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1c2VBbmltYXRpb24gJiYgdGhpcy5hbmltYXRlQWxsKCk7XG4gIH0sXG5cbiAgLyoqXHJcbiAgICogU2F2ZSB0aGUgY3VycmVudCBzb3J0aW5nXHJcbiAgICovXG4gIHNhdmU6IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgdmFyIHN0b3JlID0gdGhpcy5vcHRpb25zLnN0b3JlO1xuICAgIHN0b3JlICYmIHN0b3JlLnNldCAmJiBzdG9yZS5zZXQodGhpcyk7XG4gIH0sXG5cbiAgLyoqXHJcbiAgICogRm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgc2V0LCBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvciBieSB0ZXN0aW5nIHRoZSBlbGVtZW50IGl0c2VsZiBhbmQgdHJhdmVyc2luZyB1cCB0aHJvdWdoIGl0cyBhbmNlc3RvcnMgaW4gdGhlIERPTSB0cmVlLlxyXG4gICAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gIGVsXHJcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgW3NlbGVjdG9yXSAgZGVmYXVsdDogYG9wdGlvbnMuZHJhZ2dhYmxlYFxyXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxudWxsfVxyXG4gICAqL1xuICBjbG9zZXN0OiBmdW5jdGlvbiBjbG9zZXN0JDEoZWwsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGNsb3Nlc3QoZWwsIHNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwsIGZhbHNlKTtcbiAgfSxcblxuICAvKipcclxuICAgKiBTZXQvZ2V0IG9wdGlvblxyXG4gICAqIEBwYXJhbSAgIHtzdHJpbmd9IG5hbWVcclxuICAgKiBAcGFyYW0gICB7Kn0gICAgICBbdmFsdWVdXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICovXG4gIG9wdGlvbjogZnVuY3Rpb24gb3B0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnNbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtb2RpZmllZFZhbHVlID0gUGx1Z2luTWFuYWdlci5tb2RpZnlPcHRpb24odGhpcywgbmFtZSwgdmFsdWUpO1xuXG4gICAgICBpZiAodHlwZW9mIG1vZGlmaWVkVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnNbbmFtZV0gPSBtb2RpZmllZFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9uc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmFtZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBfcHJlcGFyZUdyb3VwKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcclxuICAgKiBEZXN0cm95XHJcbiAgICovXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcGx1Z2luRXZlbnQoJ2Rlc3Ryb3knLCB0aGlzKTtcbiAgICB2YXIgZWwgPSB0aGlzLmVsO1xuICAgIGVsW2V4cGFuZG9dID0gbnVsbDtcbiAgICBvZmYoZWwsICdtb3VzZWRvd24nLCB0aGlzLl9vblRhcFN0YXJ0KTtcbiAgICBvZmYoZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25UYXBTdGFydCk7XG4gICAgb2ZmKGVsLCAncG9pbnRlcmRvd24nLCB0aGlzLl9vblRhcFN0YXJ0KTtcblxuICAgIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgICAgb2ZmKGVsLCAnZHJhZ292ZXInLCB0aGlzKTtcbiAgICAgIG9mZihlbCwgJ2RyYWdlbnRlcicsIHRoaXMpO1xuICAgIH0gLy8gUmVtb3ZlIGRyYWdnYWJsZSBhdHRyaWJ1dGVzXG5cblxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgnW2RyYWdnYWJsZV0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb25Ecm9wKCk7XG5cbiAgICB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKTtcblxuICAgIHNvcnRhYmxlcy5zcGxpY2Uoc29ydGFibGVzLmluZGV4T2YodGhpcy5lbCksIDEpO1xuICAgIHRoaXMuZWwgPSBlbCA9IG51bGw7XG4gIH0sXG4gIF9oaWRlQ2xvbmU6IGZ1bmN0aW9uIF9oaWRlQ2xvbmUoKSB7XG4gICAgaWYgKCFjbG9uZUhpZGRlbikge1xuICAgICAgcGx1Z2luRXZlbnQoJ2hpZGVDbG9uZScsIHRoaXMpO1xuICAgICAgaWYgKFNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHJldHVybjtcbiAgICAgIGNzcyhjbG9uZUVsLCAnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlQ2xvbmVPbkhpZGUgJiYgY2xvbmVFbC5wYXJlbnROb2RlKSB7XG4gICAgICAgIGNsb25lRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZUVsKTtcbiAgICAgIH1cblxuICAgICAgY2xvbmVIaWRkZW4gPSB0cnVlO1xuICAgIH1cbiAgfSxcbiAgX3Nob3dDbG9uZTogZnVuY3Rpb24gX3Nob3dDbG9uZShwdXRTb3J0YWJsZSkge1xuICAgIGlmIChwdXRTb3J0YWJsZS5sYXN0UHV0TW9kZSAhPT0gJ2Nsb25lJykge1xuICAgICAgdGhpcy5faGlkZUNsb25lKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2xvbmVIaWRkZW4pIHtcbiAgICAgIHBsdWdpbkV2ZW50KCdzaG93Q2xvbmUnLCB0aGlzKTtcbiAgICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSByZXR1cm47IC8vIHNob3cgY2xvbmUgYXQgZHJhZ0VsIG9yIG9yaWdpbmFsIHBvc2l0aW9uXG5cbiAgICAgIGlmIChkcmFnRWwucGFyZW50Tm9kZSA9PSByb290RWwgJiYgIXRoaXMub3B0aW9ucy5ncm91cC5yZXZlcnRDbG9uZSkge1xuICAgICAgICByb290RWwuaW5zZXJ0QmVmb3JlKGNsb25lRWwsIGRyYWdFbCk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRFbCkge1xuICAgICAgICByb290RWwuaW5zZXJ0QmVmb3JlKGNsb25lRWwsIG5leHRFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQoY2xvbmVFbCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JvdXAucmV2ZXJ0Q2xvbmUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlKGRyYWdFbCwgY2xvbmVFbCk7XG4gICAgICB9XG5cbiAgICAgIGNzcyhjbG9uZUVsLCAnZGlzcGxheScsICcnKTtcbiAgICAgIGNsb25lSGlkZGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBfZ2xvYmFsRHJhZ092ZXIoXG4vKipFdmVudCovXG5ldnQpIHtcbiAgaWYgKGV2dC5kYXRhVHJhbnNmZXIpIHtcbiAgICBldnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gIH1cblxuICBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gX29uTW92ZShmcm9tRWwsIHRvRWwsIGRyYWdFbCwgZHJhZ1JlY3QsIHRhcmdldEVsLCB0YXJnZXRSZWN0LCBvcmlnaW5hbEV2ZW50LCB3aWxsSW5zZXJ0QWZ0ZXIpIHtcbiAgdmFyIGV2dCxcbiAgICAgIHNvcnRhYmxlID0gZnJvbUVsW2V4cGFuZG9dLFxuICAgICAgb25Nb3ZlRm4gPSBzb3J0YWJsZS5vcHRpb25zLm9uTW92ZSxcbiAgICAgIHJldFZhbDsgLy8gU3VwcG9ydCBmb3IgbmV3IEN1c3RvbUV2ZW50IGZlYXR1cmVcblxuICBpZiAod2luZG93LkN1c3RvbUV2ZW50ICYmICFJRTExT3JMZXNzICYmICFFZGdlKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KCdtb3ZlJywge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KCdtb3ZlJywgdHJ1ZSwgdHJ1ZSk7XG4gIH1cblxuICBldnQudG8gPSB0b0VsO1xuICBldnQuZnJvbSA9IGZyb21FbDtcbiAgZXZ0LmRyYWdnZWQgPSBkcmFnRWw7XG4gIGV2dC5kcmFnZ2VkUmVjdCA9IGRyYWdSZWN0O1xuICBldnQucmVsYXRlZCA9IHRhcmdldEVsIHx8IHRvRWw7XG4gIGV2dC5yZWxhdGVkUmVjdCA9IHRhcmdldFJlY3QgfHwgZ2V0UmVjdCh0b0VsKTtcbiAgZXZ0LndpbGxJbnNlcnRBZnRlciA9IHdpbGxJbnNlcnRBZnRlcjtcbiAgZXZ0Lm9yaWdpbmFsRXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xuICBmcm9tRWwuZGlzcGF0Y2hFdmVudChldnQpO1xuXG4gIGlmIChvbk1vdmVGbikge1xuICAgIHJldFZhbCA9IG9uTW92ZUZuLmNhbGwoc29ydGFibGUsIGV2dCwgb3JpZ2luYWxFdmVudCk7XG4gIH1cblxuICByZXR1cm4gcmV0VmFsO1xufVxuXG5mdW5jdGlvbiBfZGlzYWJsZURyYWdnYWJsZShlbCkge1xuICBlbC5kcmFnZ2FibGUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gX3Vuc2lsZW50KCkge1xuICBfc2lsZW50ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF9naG9zdElzRmlyc3QoZXZ0LCB2ZXJ0aWNhbCwgc29ydGFibGUpIHtcbiAgdmFyIHJlY3QgPSBnZXRSZWN0KGdldENoaWxkKHNvcnRhYmxlLmVsLCAwLCBzb3J0YWJsZS5vcHRpb25zLCB0cnVlKSk7XG4gIHZhciBzcGFjZXIgPSAxMDtcbiAgcmV0dXJuIHZlcnRpY2FsID8gZXZ0LmNsaWVudFggPCByZWN0LmxlZnQgLSBzcGFjZXIgfHwgZXZ0LmNsaWVudFkgPCByZWN0LnRvcCAmJiBldnQuY2xpZW50WCA8IHJlY3QucmlnaHQgOiBldnQuY2xpZW50WSA8IHJlY3QudG9wIC0gc3BhY2VyIHx8IGV2dC5jbGllbnRZIDwgcmVjdC5ib3R0b20gJiYgZXZ0LmNsaWVudFggPCByZWN0LmxlZnQ7XG59XG5cbmZ1bmN0aW9uIF9naG9zdElzTGFzdChldnQsIHZlcnRpY2FsLCBzb3J0YWJsZSkge1xuICB2YXIgcmVjdCA9IGdldFJlY3QobGFzdENoaWxkKHNvcnRhYmxlLmVsLCBzb3J0YWJsZS5vcHRpb25zLmRyYWdnYWJsZSkpO1xuICB2YXIgc3BhY2VyID0gMTA7XG4gIHJldHVybiB2ZXJ0aWNhbCA/IGV2dC5jbGllbnRYID4gcmVjdC5yaWdodCArIHNwYWNlciB8fCBldnQuY2xpZW50WCA8PSByZWN0LnJpZ2h0ICYmIGV2dC5jbGllbnRZID4gcmVjdC5ib3R0b20gJiYgZXZ0LmNsaWVudFggPj0gcmVjdC5sZWZ0IDogZXZ0LmNsaWVudFggPiByZWN0LnJpZ2h0ICYmIGV2dC5jbGllbnRZID4gcmVjdC50b3AgfHwgZXZ0LmNsaWVudFggPD0gcmVjdC5yaWdodCAmJiBldnQuY2xpZW50WSA+IHJlY3QuYm90dG9tICsgc3BhY2VyO1xufVxuXG5mdW5jdGlvbiBfZ2V0U3dhcERpcmVjdGlvbihldnQsIHRhcmdldCwgdGFyZ2V0UmVjdCwgdmVydGljYWwsIHN3YXBUaHJlc2hvbGQsIGludmVydGVkU3dhcFRocmVzaG9sZCwgaW52ZXJ0U3dhcCwgaXNMYXN0VGFyZ2V0KSB7XG4gIHZhciBtb3VzZU9uQXhpcyA9IHZlcnRpY2FsID8gZXZ0LmNsaWVudFkgOiBldnQuY2xpZW50WCxcbiAgICAgIHRhcmdldExlbmd0aCA9IHZlcnRpY2FsID8gdGFyZ2V0UmVjdC5oZWlnaHQgOiB0YXJnZXRSZWN0LndpZHRoLFxuICAgICAgdGFyZ2V0UzEgPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3QudG9wIDogdGFyZ2V0UmVjdC5sZWZ0LFxuICAgICAgdGFyZ2V0UzIgPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3QuYm90dG9tIDogdGFyZ2V0UmVjdC5yaWdodCxcbiAgICAgIGludmVydCA9IGZhbHNlO1xuXG4gIGlmICghaW52ZXJ0U3dhcCkge1xuICAgIC8vIE5ldmVyIGludmVydCBvciBjcmVhdGUgZHJhZ0VsIHNoYWRvdyB3aGVuIHRhcmdldCBtb3ZlbWVuZXQgY2F1c2VzIG1vdXNlIHRvIG1vdmUgcGFzdCB0aGUgZW5kIG9mIHJlZ3VsYXIgc3dhcFRocmVzaG9sZFxuICAgIGlmIChpc0xhc3RUYXJnZXQgJiYgdGFyZ2V0TW92ZURpc3RhbmNlIDwgdGFyZ2V0TGVuZ3RoICogc3dhcFRocmVzaG9sZCkge1xuICAgICAgLy8gbXVsdGlwbGllZCBvbmx5IGJ5IHN3YXBUaHJlc2hvbGQgYmVjYXVzZSBtb3VzZSB3aWxsIGFscmVhZHkgYmUgaW5zaWRlIHRhcmdldCBieSAoMSAtIHRocmVzaG9sZCkgKiB0YXJnZXRMZW5ndGggLyAyXG4gICAgICAvLyBjaGVjayBpZiBwYXN0IGZpcnN0IGludmVydCB0aHJlc2hvbGQgb24gc2lkZSBvcHBvc2l0ZSBvZiBsYXN0RGlyZWN0aW9uXG4gICAgICBpZiAoIXBhc3RGaXJzdEludmVydFRocmVzaCAmJiAobGFzdERpcmVjdGlvbiA9PT0gMSA/IG1vdXNlT25BeGlzID4gdGFyZ2V0UzEgKyB0YXJnZXRMZW5ndGggKiBpbnZlcnRlZFN3YXBUaHJlc2hvbGQgLyAyIDogbW91c2VPbkF4aXMgPCB0YXJnZXRTMiAtIHRhcmdldExlbmd0aCAqIGludmVydGVkU3dhcFRocmVzaG9sZCAvIDIpKSB7XG4gICAgICAgIC8vIHBhc3QgZmlyc3QgaW52ZXJ0IHRocmVzaG9sZCwgZG8gbm90IHJlc3RyaWN0IGludmVydGVkIHRocmVzaG9sZCB0byBkcmFnRWwgc2hhZG93XG4gICAgICAgIHBhc3RGaXJzdEludmVydFRocmVzaCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFzdEZpcnN0SW52ZXJ0VGhyZXNoKSB7XG4gICAgICAgIC8vIGRyYWdFbCBzaGFkb3cgKHRhcmdldCBtb3ZlIGRpc3RhbmNlIHNoYWRvdylcbiAgICAgICAgaWYgKGxhc3REaXJlY3Rpb24gPT09IDEgPyBtb3VzZU9uQXhpcyA8IHRhcmdldFMxICsgdGFyZ2V0TW92ZURpc3RhbmNlIC8vIG92ZXIgZHJhZ0VsIHNoYWRvd1xuICAgICAgICA6IG1vdXNlT25BeGlzID4gdGFyZ2V0UzIgLSB0YXJnZXRNb3ZlRGlzdGFuY2UpIHtcbiAgICAgICAgICByZXR1cm4gLWxhc3REaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmVydCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlZ3VsYXJcbiAgICAgIGlmIChtb3VzZU9uQXhpcyA+IHRhcmdldFMxICsgdGFyZ2V0TGVuZ3RoICogKDEgLSBzd2FwVGhyZXNob2xkKSAvIDIgJiYgbW91c2VPbkF4aXMgPCB0YXJnZXRTMiAtIHRhcmdldExlbmd0aCAqICgxIC0gc3dhcFRocmVzaG9sZCkgLyAyKSB7XG4gICAgICAgIHJldHVybiBfZ2V0SW5zZXJ0RGlyZWN0aW9uKHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW52ZXJ0ID0gaW52ZXJ0IHx8IGludmVydFN3YXA7XG5cbiAgaWYgKGludmVydCkge1xuICAgIC8vIEludmVydCBvZiByZWd1bGFyXG4gICAgaWYgKG1vdXNlT25BeGlzIDwgdGFyZ2V0UzEgKyB0YXJnZXRMZW5ndGggKiBpbnZlcnRlZFN3YXBUaHJlc2hvbGQgLyAyIHx8IG1vdXNlT25BeGlzID4gdGFyZ2V0UzIgLSB0YXJnZXRMZW5ndGggKiBpbnZlcnRlZFN3YXBUaHJlc2hvbGQgLyAyKSB7XG4gICAgICByZXR1cm4gbW91c2VPbkF4aXMgPiB0YXJnZXRTMSArIHRhcmdldExlbmd0aCAvIDIgPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG4vKipcclxuICogR2V0cyB0aGUgZGlyZWN0aW9uIGRyYWdFbCBtdXN0IGJlIHN3YXBwZWQgcmVsYXRpdmUgdG8gdGFyZ2V0IGluIG9yZGVyIHRvIG1ha2UgaXRcclxuICogc2VlbSB0aGF0IGRyYWdFbCBoYXMgYmVlbiBcImluc2VydGVkXCIgaW50byB0aGF0IGVsZW1lbnQncyBwb3NpdGlvblxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gdGFyZ2V0ICAgICAgIFRoZSB0YXJnZXQgd2hvc2UgcG9zaXRpb24gZHJhZ0VsIGlzIGJlaW5nIGluc2VydGVkIGF0XHJcbiAqIEByZXR1cm4ge051bWJlcn0gICAgICAgICAgICAgICAgICAgRGlyZWN0aW9uIGRyYWdFbCBtdXN0IGJlIHN3YXBwZWRcclxuICovXG5cblxuZnVuY3Rpb24gX2dldEluc2VydERpcmVjdGlvbih0YXJnZXQpIHtcbiAgaWYgKGluZGV4KGRyYWdFbCkgPCBpbmRleCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG59XG4vKipcclxuICogR2VuZXJhdGUgaWRcclxuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBlbFxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cblxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJZChlbCkge1xuICB2YXIgc3RyID0gZWwudGFnTmFtZSArIGVsLmNsYXNzTmFtZSArIGVsLnNyYyArIGVsLmhyZWYgKyBlbC50ZXh0Q29udGVudCxcbiAgICAgIGkgPSBzdHIubGVuZ3RoLFxuICAgICAgc3VtID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgc3VtICs9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG5cbiAgcmV0dXJuIHN1bS50b1N0cmluZygzNik7XG59XG5cbmZ1bmN0aW9uIF9zYXZlSW5wdXRDaGVja2VkU3RhdGUocm9vdCkge1xuICBzYXZlZElucHV0Q2hlY2tlZC5sZW5ndGggPSAwO1xuICB2YXIgaW5wdXRzID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcbiAgdmFyIGlkeCA9IGlucHV0cy5sZW5ndGg7XG5cbiAgd2hpbGUgKGlkeC0tKSB7XG4gICAgdmFyIGVsID0gaW5wdXRzW2lkeF07XG4gICAgZWwuY2hlY2tlZCAmJiBzYXZlZElucHV0Q2hlY2tlZC5wdXNoKGVsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfbmV4dFRpY2soZm4pIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIDApO1xufVxuXG5mdW5jdGlvbiBfY2FuY2VsTmV4dFRpY2soaWQpIHtcbiAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG59IC8vIEZpeGVkICM5NzM6XG5cblxuaWYgKGRvY3VtZW50RXhpc3RzKSB7XG4gIG9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGlmICgoU29ydGFibGUuYWN0aXZlIHx8IGF3YWl0aW5nRHJhZ1N0YXJ0ZWQpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSAvLyBFeHBvcnQgdXRpbHNcblxuXG5Tb3J0YWJsZS51dGlscyA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZixcbiAgY3NzOiBjc3MsXG4gIGZpbmQ6IGZpbmQsXG4gIGlzOiBmdW5jdGlvbiBpcyhlbCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gISFjbG9zZXN0KGVsLCBzZWxlY3RvciwgZWwsIGZhbHNlKTtcbiAgfSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRocm90dGxlOiB0aHJvdHRsZSxcbiAgY2xvc2VzdDogY2xvc2VzdCxcbiAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxuICBjbG9uZTogY2xvbmUsXG4gIGluZGV4OiBpbmRleCxcbiAgbmV4dFRpY2s6IF9uZXh0VGljayxcbiAgY2FuY2VsTmV4dFRpY2s6IF9jYW5jZWxOZXh0VGljayxcbiAgZGV0ZWN0RGlyZWN0aW9uOiBfZGV0ZWN0RGlyZWN0aW9uLFxuICBnZXRDaGlsZDogZ2V0Q2hpbGRcbn07XG4vKipcclxuICogR2V0IHRoZSBTb3J0YWJsZSBpbnN0YW5jZSBvZiBhbiBlbGVtZW50XHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge1NvcnRhYmxlfHVuZGVmaW5lZH0gICAgICAgICBUaGUgaW5zdGFuY2Ugb2YgU29ydGFibGVcclxuICovXG5cblNvcnRhYmxlLmdldCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50W2V4cGFuZG9dO1xufTtcbi8qKlxyXG4gKiBNb3VudCBhIHBsdWdpbiB0byBTb3J0YWJsZVxyXG4gKiBAcGFyYW0gIHsuLi5Tb3J0YWJsZVBsdWdpbnxTb3J0YWJsZVBsdWdpbltdfSBwbHVnaW5zICAgICAgIFBsdWdpbnMgYmVpbmcgbW91bnRlZFxyXG4gKi9cblxuXG5Tb3J0YWJsZS5tb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBsdWdpbnMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgcGx1Z2luc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChwbHVnaW5zWzBdLmNvbnN0cnVjdG9yID09PSBBcnJheSkgcGx1Z2lucyA9IHBsdWdpbnNbMF07XG4gIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgaWYgKCFwbHVnaW4ucHJvdG90eXBlIHx8ICFwbHVnaW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBcIlNvcnRhYmxlOiBNb3VudGVkIHBsdWdpbiBtdXN0IGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sIG5vdCBcIi5jb25jYXQoe30udG9TdHJpbmcuY2FsbChwbHVnaW4pKTtcbiAgICB9XG5cbiAgICBpZiAocGx1Z2luLnV0aWxzKSBTb3J0YWJsZS51dGlscyA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBTb3J0YWJsZS51dGlscyksIHBsdWdpbi51dGlscyk7XG4gICAgUGx1Z2luTWFuYWdlci5tb3VudChwbHVnaW4pO1xuICB9KTtcbn07XG4vKipcclxuICogQ3JlYXRlIHNvcnRhYmxlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9ICBlbFxyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0aW9uc11cclxuICovXG5cblxuU29ydGFibGUuY3JlYXRlID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU29ydGFibGUoZWwsIG9wdGlvbnMpO1xufTsgLy8gRXhwb3J0XG5cblxuU29ydGFibGUudmVyc2lvbiA9IHZlcnNpb247XG5cbnZhciBhdXRvU2Nyb2xscyA9IFtdLFxuICAgIHNjcm9sbEVsLFxuICAgIHNjcm9sbFJvb3RFbCxcbiAgICBzY3JvbGxpbmcgPSBmYWxzZSxcbiAgICBsYXN0QXV0b1Njcm9sbFgsXG4gICAgbGFzdEF1dG9TY3JvbGxZLFxuICAgIHRvdWNoRXZ0JDEsXG4gICAgcG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWw7XG5cbmZ1bmN0aW9uIEF1dG9TY3JvbGxQbHVnaW4oKSB7XG4gIGZ1bmN0aW9uIEF1dG9TY3JvbGwoKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgIGZvcmNlQXV0b1Njcm9sbEZhbGxiYWNrOiBmYWxzZSxcbiAgICAgIHNjcm9sbFNlbnNpdGl2aXR5OiAzMCxcbiAgICAgIHNjcm9sbFNwZWVkOiAxMCxcbiAgICAgIGJ1YmJsZVNjcm9sbDogdHJ1ZVxuICAgIH07IC8vIEJpbmQgYWxsIHByaXZhdGUgbWV0aG9kc1xuXG4gICAgZm9yICh2YXIgZm4gaW4gdGhpcykge1xuICAgICAgaWYgKGZuLmNoYXJBdCgwKSA9PT0gJ18nICYmIHR5cGVvZiB0aGlzW2ZuXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzW2ZuXSA9IHRoaXNbZm5dLmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQXV0b1Njcm9sbC5wcm90b3R5cGUgPSB7XG4gICAgZHJhZ1N0YXJ0ZWQ6IGZ1bmN0aW9uIGRyYWdTdGFydGVkKF9yZWYpIHtcbiAgICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gX3JlZi5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICBpZiAodGhpcy5zb3J0YWJsZS5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAgICAgb24oZG9jdW1lbnQsICdkcmFnb3ZlcicsIHRoaXMuX2hhbmRsZUF1dG9TY3JvbGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0UG9pbnRlcikge1xuICAgICAgICAgIG9uKGRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKG9yaWdpbmFsRXZlbnQudG91Y2hlcykge1xuICAgICAgICAgIG9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRyYWdPdmVyQ29tcGxldGVkOiBmdW5jdGlvbiBkcmFnT3ZlckNvbXBsZXRlZChfcmVmMikge1xuICAgICAgdmFyIG9yaWdpbmFsRXZlbnQgPSBfcmVmMi5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICAvLyBGb3Igd2hlbiBidWJibGluZyBpcyBjYW5jZWxlZCBhbmQgdXNpbmcgZmFsbGJhY2sgKGZhbGxiYWNrICd0b3VjaG1vdmUnIGFsd2F5cyByZWFjaGVkKVxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZHJhZ092ZXJCdWJibGUgJiYgIW9yaWdpbmFsRXZlbnQucm9vdEVsKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUF1dG9TY3JvbGwob3JpZ2luYWxFdmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkcm9wOiBmdW5jdGlvbiBkcm9wKCkge1xuICAgICAgaWYgKHRoaXMuc29ydGFibGUubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICAgIG9mZihkb2N1bWVudCwgJ2RyYWdvdmVyJywgdGhpcy5faGFuZGxlQXV0b1Njcm9sbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmYoZG9jdW1lbnQsICdwb2ludGVybW92ZScsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgICAgIG9mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgICAgIG9mZihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyUG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWwoKTtcbiAgICAgIGNsZWFyQXV0b1Njcm9sbHMoKTtcbiAgICAgIGNhbmNlbFRocm90dGxlKCk7XG4gICAgfSxcbiAgICBudWxsaW5nOiBmdW5jdGlvbiBudWxsaW5nKCkge1xuICAgICAgdG91Y2hFdnQkMSA9IHNjcm9sbFJvb3RFbCA9IHNjcm9sbEVsID0gc2Nyb2xsaW5nID0gcG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWwgPSBsYXN0QXV0b1Njcm9sbFggPSBsYXN0QXV0b1Njcm9sbFkgPSBudWxsO1xuICAgICAgYXV0b1Njcm9sbHMubGVuZ3RoID0gMDtcbiAgICB9LFxuICAgIF9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGw6IGZ1bmN0aW9uIF9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwoZXZ0KSB7XG4gICAgICB0aGlzLl9oYW5kbGVBdXRvU2Nyb2xsKGV2dCwgdHJ1ZSk7XG4gICAgfSxcbiAgICBfaGFuZGxlQXV0b1Njcm9sbDogZnVuY3Rpb24gX2hhbmRsZUF1dG9TY3JvbGwoZXZ0LCBmYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHggPSAoZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dCkuY2xpZW50WCxcbiAgICAgICAgICB5ID0gKGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQpLmNsaWVudFksXG4gICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgICB0b3VjaEV2dCQxID0gZXZ0OyAvLyBJRSBkb2VzIG5vdCBzZWVtIHRvIGhhdmUgbmF0aXZlIGF1dG9zY3JvbGwsXG4gICAgICAvLyBFZGdlJ3MgYXV0b3Njcm9sbCBzZWVtcyB0b28gY29uZGl0aW9uYWwsXG4gICAgICAvLyBNQUNPUyBTYWZhcmkgZG9lcyBub3QgaGF2ZSBhdXRvc2Nyb2xsLFxuICAgICAgLy8gRmlyZWZveCBhbmQgQ2hyb21lIGFyZSBnb29kXG5cbiAgICAgIGlmIChmYWxsYmFjayB8fCB0aGlzLm9wdGlvbnMuZm9yY2VBdXRvU2Nyb2xsRmFsbGJhY2sgfHwgRWRnZSB8fCBJRTExT3JMZXNzIHx8IFNhZmFyaSkge1xuICAgICAgICBhdXRvU2Nyb2xsKGV2dCwgdGhpcy5vcHRpb25zLCBlbGVtLCBmYWxsYmFjayk7IC8vIExpc3RlbmVyIGZvciBwb2ludGVyIGVsZW1lbnQgY2hhbmdlXG5cbiAgICAgICAgdmFyIG9nRWxlbVNjcm9sbGVyID0gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQoZWxlbSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbGluZyAmJiAoIXBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsIHx8IHggIT09IGxhc3RBdXRvU2Nyb2xsWCB8fCB5ICE9PSBsYXN0QXV0b1Njcm9sbFkpKSB7XG4gICAgICAgICAgcG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWwgJiYgY2xlYXJQb2ludGVyRWxlbUNoYW5nZWRJbnRlcnZhbCgpOyAvLyBEZXRlY3QgZm9yIHBvaW50ZXIgZWxlbSBjaGFuZ2UsIGVtdWxhdGluZyBuYXRpdmUgRG5EIGJlaGF2aW91clxuXG4gICAgICAgICAgcG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3RWxlbSA9IGdldFBhcmVudEF1dG9TY3JvbGxFbGVtZW50KGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSksIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAobmV3RWxlbSAhPT0gb2dFbGVtU2Nyb2xsZXIpIHtcbiAgICAgICAgICAgICAgb2dFbGVtU2Nyb2xsZXIgPSBuZXdFbGVtO1xuICAgICAgICAgICAgICBjbGVhckF1dG9TY3JvbGxzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF1dG9TY3JvbGwoZXZ0LCBfdGhpcy5vcHRpb25zLCBuZXdFbGVtLCBmYWxsYmFjayk7XG4gICAgICAgICAgfSwgMTApO1xuICAgICAgICAgIGxhc3RBdXRvU2Nyb2xsWCA9IHg7XG4gICAgICAgICAgbGFzdEF1dG9TY3JvbGxZID0geTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgRG5EIGlzIGVuYWJsZWQgKGFuZCBicm93c2VyIGhhcyBnb29kIGF1dG9zY3JvbGxpbmcpLCBmaXJzdCBhdXRvc2Nyb2xsIHdpbGwgYWxyZWFkeSBzY3JvbGwsIHNvIGdldCBwYXJlbnQgYXV0b3Njcm9sbCBvZiBmaXJzdCBhdXRvc2Nyb2xsXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmJ1YmJsZVNjcm9sbCB8fCBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChlbGVtLCB0cnVlKSA9PT0gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpKSB7XG4gICAgICAgICAgY2xlYXJBdXRvU2Nyb2xscygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9TY3JvbGwoZXZ0LCB0aGlzLm9wdGlvbnMsIGdldFBhcmVudEF1dG9TY3JvbGxFbGVtZW50KGVsZW0sIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzKEF1dG9TY3JvbGwsIHtcbiAgICBwbHVnaW5OYW1lOiAnc2Nyb2xsJyxcbiAgICBpbml0aWFsaXplQnlEZWZhdWx0OiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhckF1dG9TY3JvbGxzKCkge1xuICBhdXRvU2Nyb2xscy5mb3JFYWNoKGZ1bmN0aW9uIChhdXRvU2Nyb2xsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChhdXRvU2Nyb2xsLnBpZCk7XG4gIH0pO1xuICBhdXRvU2Nyb2xscyA9IFtdO1xufVxuXG5mdW5jdGlvbiBjbGVhclBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsKCkge1xuICBjbGVhckludGVydmFsKHBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsKTtcbn1cblxudmFyIGF1dG9TY3JvbGwgPSB0aHJvdHRsZShmdW5jdGlvbiAoZXZ0LCBvcHRpb25zLCByb290RWwsIGlzRmFsbGJhY2spIHtcbiAgLy8gQnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01MDU1MjFcbiAgaWYgKCFvcHRpb25zLnNjcm9sbCkgcmV0dXJuO1xuICB2YXIgeCA9IChldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KS5jbGllbnRYLFxuICAgICAgeSA9IChldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KS5jbGllbnRZLFxuICAgICAgc2VucyA9IG9wdGlvbnMuc2Nyb2xsU2Vuc2l0aXZpdHksXG4gICAgICBzcGVlZCA9IG9wdGlvbnMuc2Nyb2xsU3BlZWQsXG4gICAgICB3aW5TY3JvbGxlciA9IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbiAgdmFyIHNjcm9sbFRoaXNJbnN0YW5jZSA9IGZhbHNlLFxuICAgICAgc2Nyb2xsQ3VzdG9tRm47IC8vIE5ldyBzY3JvbGwgcm9vdCwgc2V0IHNjcm9sbEVsXG5cbiAgaWYgKHNjcm9sbFJvb3RFbCAhPT0gcm9vdEVsKSB7XG4gICAgc2Nyb2xsUm9vdEVsID0gcm9vdEVsO1xuICAgIGNsZWFyQXV0b1Njcm9sbHMoKTtcbiAgICBzY3JvbGxFbCA9IG9wdGlvbnMuc2Nyb2xsO1xuICAgIHNjcm9sbEN1c3RvbUZuID0gb3B0aW9ucy5zY3JvbGxGbjtcblxuICAgIGlmIChzY3JvbGxFbCA9PT0gdHJ1ZSkge1xuICAgICAgc2Nyb2xsRWwgPSBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChyb290RWwsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsYXllcnNPdXQgPSAwO1xuICB2YXIgY3VycmVudFBhcmVudCA9IHNjcm9sbEVsO1xuXG4gIGRvIHtcbiAgICB2YXIgZWwgPSBjdXJyZW50UGFyZW50LFxuICAgICAgICByZWN0ID0gZ2V0UmVjdChlbCksXG4gICAgICAgIHRvcCA9IHJlY3QudG9wLFxuICAgICAgICBib3R0b20gPSByZWN0LmJvdHRvbSxcbiAgICAgICAgbGVmdCA9IHJlY3QubGVmdCxcbiAgICAgICAgcmlnaHQgPSByZWN0LnJpZ2h0LFxuICAgICAgICB3aWR0aCA9IHJlY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IHJlY3QuaGVpZ2h0LFxuICAgICAgICBjYW5TY3JvbGxYID0gdm9pZCAwLFxuICAgICAgICBjYW5TY3JvbGxZID0gdm9pZCAwLFxuICAgICAgICBzY3JvbGxXaWR0aCA9IGVsLnNjcm9sbFdpZHRoLFxuICAgICAgICBzY3JvbGxIZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGVsQ1NTID0gY3NzKGVsKSxcbiAgICAgICAgc2Nyb2xsUG9zWCA9IGVsLnNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFBvc1kgPSBlbC5zY3JvbGxUb3A7XG5cbiAgICBpZiAoZWwgPT09IHdpblNjcm9sbGVyKSB7XG4gICAgICBjYW5TY3JvbGxYID0gd2lkdGggPCBzY3JvbGxXaWR0aCAmJiAoZWxDU1Mub3ZlcmZsb3dYID09PSAnYXV0bycgfHwgZWxDU1Mub3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBlbENTUy5vdmVyZmxvd1ggPT09ICd2aXNpYmxlJyk7XG4gICAgICBjYW5TY3JvbGxZID0gaGVpZ2h0IDwgc2Nyb2xsSGVpZ2h0ICYmIChlbENTUy5vdmVyZmxvd1kgPT09ICdhdXRvJyB8fCBlbENTUy5vdmVyZmxvd1kgPT09ICdzY3JvbGwnIHx8IGVsQ1NTLm92ZXJmbG93WSA9PT0gJ3Zpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FuU2Nyb2xsWCA9IHdpZHRoIDwgc2Nyb2xsV2lkdGggJiYgKGVsQ1NTLm92ZXJmbG93WCA9PT0gJ2F1dG8nIHx8IGVsQ1NTLm92ZXJmbG93WCA9PT0gJ3Njcm9sbCcpO1xuICAgICAgY2FuU2Nyb2xsWSA9IGhlaWdodCA8IHNjcm9sbEhlaWdodCAmJiAoZWxDU1Mub3ZlcmZsb3dZID09PSAnYXV0bycgfHwgZWxDU1Mub3ZlcmZsb3dZID09PSAnc2Nyb2xsJyk7XG4gICAgfVxuXG4gICAgdmFyIHZ4ID0gY2FuU2Nyb2xsWCAmJiAoTWF0aC5hYnMocmlnaHQgLSB4KSA8PSBzZW5zICYmIHNjcm9sbFBvc1ggKyB3aWR0aCA8IHNjcm9sbFdpZHRoKSAtIChNYXRoLmFicyhsZWZ0IC0geCkgPD0gc2VucyAmJiAhIXNjcm9sbFBvc1gpO1xuICAgIHZhciB2eSA9IGNhblNjcm9sbFkgJiYgKE1hdGguYWJzKGJvdHRvbSAtIHkpIDw9IHNlbnMgJiYgc2Nyb2xsUG9zWSArIGhlaWdodCA8IHNjcm9sbEhlaWdodCkgLSAoTWF0aC5hYnModG9wIC0geSkgPD0gc2VucyAmJiAhIXNjcm9sbFBvc1kpO1xuXG4gICAgaWYgKCFhdXRvU2Nyb2xsc1tsYXllcnNPdXRdKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsYXllcnNPdXQ7IGkrKykge1xuICAgICAgICBpZiAoIWF1dG9TY3JvbGxzW2ldKSB7XG4gICAgICAgICAgYXV0b1Njcm9sbHNbaV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhdXRvU2Nyb2xsc1tsYXllcnNPdXRdLnZ4ICE9IHZ4IHx8IGF1dG9TY3JvbGxzW2xheWVyc091dF0udnkgIT0gdnkgfHwgYXV0b1Njcm9sbHNbbGF5ZXJzT3V0XS5lbCAhPT0gZWwpIHtcbiAgICAgIGF1dG9TY3JvbGxzW2xheWVyc091dF0uZWwgPSBlbDtcbiAgICAgIGF1dG9TY3JvbGxzW2xheWVyc091dF0udnggPSB2eDtcbiAgICAgIGF1dG9TY3JvbGxzW2xheWVyc091dF0udnkgPSB2eTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYXV0b1Njcm9sbHNbbGF5ZXJzT3V0XS5waWQpO1xuXG4gICAgICBpZiAodnggIT0gMCB8fCB2eSAhPSAwKSB7XG4gICAgICAgIHNjcm9sbFRoaXNJbnN0YW5jZSA9IHRydWU7XG4gICAgICAgIC8qIGpzaGludCBsb29wZnVuYzp0cnVlICovXG5cbiAgICAgICAgYXV0b1Njcm9sbHNbbGF5ZXJzT3V0XS5waWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gZW11bGF0ZSBkcmFnIG92ZXIgZHVyaW5nIGF1dG9zY3JvbGwgKGZhbGxiYWNrKSwgZW11bGF0aW5nIG5hdGl2ZSBEbkQgYmVoYXZpb3VyXG4gICAgICAgICAgaWYgKGlzRmFsbGJhY2sgJiYgdGhpcy5sYXllciA9PT0gMCkge1xuICAgICAgICAgICAgU29ydGFibGUuYWN0aXZlLl9vblRvdWNoTW92ZSh0b3VjaEV2dCQxKTsgLy8gVG8gbW92ZSBnaG9zdCBpZiBpdCBpcyBwb3NpdGlvbmVkIGFic29sdXRlbHlcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzY3JvbGxPZmZzZXRZID0gYXV0b1Njcm9sbHNbdGhpcy5sYXllcl0udnkgPyBhdXRvU2Nyb2xsc1t0aGlzLmxheWVyXS52eSAqIHNwZWVkIDogMDtcbiAgICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0WCA9IGF1dG9TY3JvbGxzW3RoaXMubGF5ZXJdLnZ4ID8gYXV0b1Njcm9sbHNbdGhpcy5sYXllcl0udnggKiBzcGVlZCA6IDA7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHNjcm9sbEN1c3RvbUZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsQ3VzdG9tRm4uY2FsbChTb3J0YWJsZS5kcmFnZ2VkLnBhcmVudE5vZGVbZXhwYW5kb10sIHNjcm9sbE9mZnNldFgsIHNjcm9sbE9mZnNldFksIGV2dCwgdG91Y2hFdnQkMSwgYXV0b1Njcm9sbHNbdGhpcy5sYXllcl0uZWwpICE9PSAnY29udGludWUnKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY3JvbGxCeShhdXRvU2Nyb2xsc1t0aGlzLmxheWVyXS5lbCwgc2Nyb2xsT2Zmc2V0WCwgc2Nyb2xsT2Zmc2V0WSk7XG4gICAgICAgIH0uYmluZCh7XG4gICAgICAgICAgbGF5ZXI6IGxheWVyc091dFxuICAgICAgICB9KSwgMjQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxheWVyc091dCsrO1xuICB9IHdoaWxlIChvcHRpb25zLmJ1YmJsZVNjcm9sbCAmJiBjdXJyZW50UGFyZW50ICE9PSB3aW5TY3JvbGxlciAmJiAoY3VycmVudFBhcmVudCA9IGdldFBhcmVudEF1dG9TY3JvbGxFbGVtZW50KGN1cnJlbnRQYXJlbnQsIGZhbHNlKSkpO1xuXG4gIHNjcm9sbGluZyA9IHNjcm9sbFRoaXNJbnN0YW5jZTsgLy8gaW4gY2FzZSBhbm90aGVyIGZ1bmN0aW9uIGNhdGNoZXMgc2Nyb2xsaW5nIGFzIGZhbHNlIGluIGJldHdlZW4gd2hlbiBpdCBpcyBub3Rcbn0sIDMwKTtcblxudmFyIGRyb3AgPSBmdW5jdGlvbiBkcm9wKF9yZWYpIHtcbiAgdmFyIG9yaWdpbmFsRXZlbnQgPSBfcmVmLm9yaWdpbmFsRXZlbnQsXG4gICAgICBwdXRTb3J0YWJsZSA9IF9yZWYucHV0U29ydGFibGUsXG4gICAgICBkcmFnRWwgPSBfcmVmLmRyYWdFbCxcbiAgICAgIGFjdGl2ZVNvcnRhYmxlID0gX3JlZi5hY3RpdmVTb3J0YWJsZSxcbiAgICAgIGRpc3BhdGNoU29ydGFibGVFdmVudCA9IF9yZWYuZGlzcGF0Y2hTb3J0YWJsZUV2ZW50LFxuICAgICAgaGlkZUdob3N0Rm9yVGFyZ2V0ID0gX3JlZi5oaWRlR2hvc3RGb3JUYXJnZXQsXG4gICAgICB1bmhpZGVHaG9zdEZvclRhcmdldCA9IF9yZWYudW5oaWRlR2hvc3RGb3JUYXJnZXQ7XG4gIGlmICghb3JpZ2luYWxFdmVudCkgcmV0dXJuO1xuICB2YXIgdG9Tb3J0YWJsZSA9IHB1dFNvcnRhYmxlIHx8IGFjdGl2ZVNvcnRhYmxlO1xuICBoaWRlR2hvc3RGb3JUYXJnZXQoKTtcbiAgdmFyIHRvdWNoID0gb3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBvcmlnaW5hbEV2ZW50O1xuICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZKTtcbiAgdW5oaWRlR2hvc3RGb3JUYXJnZXQoKTtcblxuICBpZiAodG9Tb3J0YWJsZSAmJiAhdG9Tb3J0YWJsZS5lbC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgZGlzcGF0Y2hTb3J0YWJsZUV2ZW50KCdzcGlsbCcpO1xuICAgIHRoaXMub25TcGlsbCh7XG4gICAgICBkcmFnRWw6IGRyYWdFbCxcbiAgICAgIHB1dFNvcnRhYmxlOiBwdXRTb3J0YWJsZVxuICAgIH0pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBSZXZlcnQoKSB7fVxuXG5SZXZlcnQucHJvdG90eXBlID0ge1xuICBzdGFydEluZGV4OiBudWxsLFxuICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIGRyYWdTdGFydChfcmVmMikge1xuICAgIHZhciBvbGREcmFnZ2FibGVJbmRleCA9IF9yZWYyLm9sZERyYWdnYWJsZUluZGV4O1xuICAgIHRoaXMuc3RhcnRJbmRleCA9IG9sZERyYWdnYWJsZUluZGV4O1xuICB9LFxuICBvblNwaWxsOiBmdW5jdGlvbiBvblNwaWxsKF9yZWYzKSB7XG4gICAgdmFyIGRyYWdFbCA9IF9yZWYzLmRyYWdFbCxcbiAgICAgICAgcHV0U29ydGFibGUgPSBfcmVmMy5wdXRTb3J0YWJsZTtcbiAgICB0aGlzLnNvcnRhYmxlLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuXG4gICAgaWYgKHB1dFNvcnRhYmxlKSB7XG4gICAgICBwdXRTb3J0YWJsZS5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFNpYmxpbmcgPSBnZXRDaGlsZCh0aGlzLnNvcnRhYmxlLmVsLCB0aGlzLnN0YXJ0SW5kZXgsIHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAobmV4dFNpYmxpbmcpIHtcbiAgICAgIHRoaXMuc29ydGFibGUuZWwuaW5zZXJ0QmVmb3JlKGRyYWdFbCwgbmV4dFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvcnRhYmxlLmVsLmFwcGVuZENoaWxkKGRyYWdFbCk7XG4gICAgfVxuXG4gICAgdGhpcy5zb3J0YWJsZS5hbmltYXRlQWxsKCk7XG5cbiAgICBpZiAocHV0U29ydGFibGUpIHtcbiAgICAgIHB1dFNvcnRhYmxlLmFuaW1hdGVBbGwoKTtcbiAgICB9XG4gIH0sXG4gIGRyb3A6IGRyb3Bcbn07XG5cbl9leHRlbmRzKFJldmVydCwge1xuICBwbHVnaW5OYW1lOiAncmV2ZXJ0T25TcGlsbCdcbn0pO1xuXG5mdW5jdGlvbiBSZW1vdmUoKSB7fVxuXG5SZW1vdmUucHJvdG90eXBlID0ge1xuICBvblNwaWxsOiBmdW5jdGlvbiBvblNwaWxsKF9yZWY0KSB7XG4gICAgdmFyIGRyYWdFbCA9IF9yZWY0LmRyYWdFbCxcbiAgICAgICAgcHV0U29ydGFibGUgPSBfcmVmNC5wdXRTb3J0YWJsZTtcbiAgICB2YXIgcGFyZW50U29ydGFibGUgPSBwdXRTb3J0YWJsZSB8fCB0aGlzLnNvcnRhYmxlO1xuICAgIHBhcmVudFNvcnRhYmxlLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgIGRyYWdFbC5wYXJlbnROb2RlICYmIGRyYWdFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdFbCk7XG4gICAgcGFyZW50U29ydGFibGUuYW5pbWF0ZUFsbCgpO1xuICB9LFxuICBkcm9wOiBkcm9wXG59O1xuXG5fZXh0ZW5kcyhSZW1vdmUsIHtcbiAgcGx1Z2luTmFtZTogJ3JlbW92ZU9uU3BpbGwnXG59KTtcblxudmFyIGxhc3RTd2FwRWw7XG5cbmZ1bmN0aW9uIFN3YXBQbHVnaW4oKSB7XG4gIGZ1bmN0aW9uIFN3YXAoKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHN3YXBDbGFzczogJ3NvcnRhYmxlLXN3YXAtaGlnaGxpZ2h0J1xuICAgIH07XG4gIH1cblxuICBTd2FwLnByb3RvdHlwZSA9IHtcbiAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIGRyYWdTdGFydChfcmVmKSB7XG4gICAgICB2YXIgZHJhZ0VsID0gX3JlZi5kcmFnRWw7XG4gICAgICBsYXN0U3dhcEVsID0gZHJhZ0VsO1xuICAgIH0sXG4gICAgZHJhZ092ZXJWYWxpZDogZnVuY3Rpb24gZHJhZ092ZXJWYWxpZChfcmVmMikge1xuICAgICAgdmFyIGNvbXBsZXRlZCA9IF9yZWYyLmNvbXBsZXRlZCxcbiAgICAgICAgICB0YXJnZXQgPSBfcmVmMi50YXJnZXQsXG4gICAgICAgICAgb25Nb3ZlID0gX3JlZjIub25Nb3ZlLFxuICAgICAgICAgIGFjdGl2ZVNvcnRhYmxlID0gX3JlZjIuYWN0aXZlU29ydGFibGUsXG4gICAgICAgICAgY2hhbmdlZCA9IF9yZWYyLmNoYW5nZWQsXG4gICAgICAgICAgY2FuY2VsID0gX3JlZjIuY2FuY2VsO1xuICAgICAgaWYgKCFhY3RpdmVTb3J0YWJsZS5vcHRpb25zLnN3YXApIHJldHVybjtcbiAgICAgIHZhciBlbCA9IHRoaXMuc29ydGFibGUuZWwsXG4gICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICAgIHZhciBwcmV2U3dhcEVsID0gbGFzdFN3YXBFbDtcblxuICAgICAgICBpZiAob25Nb3ZlKHRhcmdldCkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdG9nZ2xlQ2xhc3ModGFyZ2V0LCBvcHRpb25zLnN3YXBDbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgbGFzdFN3YXBFbCA9IHRhcmdldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0U3dhcEVsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2U3dhcEVsICYmIHByZXZTd2FwRWwgIT09IGxhc3RTd2FwRWwpIHtcbiAgICAgICAgICB0b2dnbGVDbGFzcyhwcmV2U3dhcEVsLCBvcHRpb25zLnN3YXBDbGFzcywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoYW5nZWQoKTtcbiAgICAgIGNvbXBsZXRlZCh0cnVlKTtcbiAgICAgIGNhbmNlbCgpO1xuICAgIH0sXG4gICAgZHJvcDogZnVuY3Rpb24gZHJvcChfcmVmMykge1xuICAgICAgdmFyIGFjdGl2ZVNvcnRhYmxlID0gX3JlZjMuYWN0aXZlU29ydGFibGUsXG4gICAgICAgICAgcHV0U29ydGFibGUgPSBfcmVmMy5wdXRTb3J0YWJsZSxcbiAgICAgICAgICBkcmFnRWwgPSBfcmVmMy5kcmFnRWw7XG4gICAgICB2YXIgdG9Tb3J0YWJsZSA9IHB1dFNvcnRhYmxlIHx8IHRoaXMuc29ydGFibGU7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGxhc3RTd2FwRWwgJiYgdG9nZ2xlQ2xhc3MobGFzdFN3YXBFbCwgb3B0aW9ucy5zd2FwQ2xhc3MsIGZhbHNlKTtcblxuICAgICAgaWYgKGxhc3RTd2FwRWwgJiYgKG9wdGlvbnMuc3dhcCB8fCBwdXRTb3J0YWJsZSAmJiBwdXRTb3J0YWJsZS5vcHRpb25zLnN3YXApKSB7XG4gICAgICAgIGlmIChkcmFnRWwgIT09IGxhc3RTd2FwRWwpIHtcbiAgICAgICAgICB0b1NvcnRhYmxlLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgICAgICAgIGlmICh0b1NvcnRhYmxlICE9PSBhY3RpdmVTb3J0YWJsZSkgYWN0aXZlU29ydGFibGUuY2FwdHVyZUFuaW1hdGlvblN0YXRlKCk7XG4gICAgICAgICAgc3dhcE5vZGVzKGRyYWdFbCwgbGFzdFN3YXBFbCk7XG4gICAgICAgICAgdG9Tb3J0YWJsZS5hbmltYXRlQWxsKCk7XG4gICAgICAgICAgaWYgKHRvU29ydGFibGUgIT09IGFjdGl2ZVNvcnRhYmxlKSBhY3RpdmVTb3J0YWJsZS5hbmltYXRlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG51bGxpbmc6IGZ1bmN0aW9uIG51bGxpbmcoKSB7XG4gICAgICBsYXN0U3dhcEVsID0gbnVsbDtcbiAgICB9XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcyhTd2FwLCB7XG4gICAgcGx1Z2luTmFtZTogJ3N3YXAnLFxuICAgIGV2ZW50UHJvcGVydGllczogZnVuY3Rpb24gZXZlbnRQcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3dhcEl0ZW06IGxhc3RTd2FwRWxcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc3dhcE5vZGVzKG4xLCBuMikge1xuICB2YXIgcDEgPSBuMS5wYXJlbnROb2RlLFxuICAgICAgcDIgPSBuMi5wYXJlbnROb2RlLFxuICAgICAgaTEsXG4gICAgICBpMjtcbiAgaWYgKCFwMSB8fCAhcDIgfHwgcDEuaXNFcXVhbE5vZGUobjIpIHx8IHAyLmlzRXF1YWxOb2RlKG4xKSkgcmV0dXJuO1xuICBpMSA9IGluZGV4KG4xKTtcbiAgaTIgPSBpbmRleChuMik7XG5cbiAgaWYgKHAxLmlzRXF1YWxOb2RlKHAyKSAmJiBpMSA8IGkyKSB7XG4gICAgaTIrKztcbiAgfVxuXG4gIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcbiAgcDIuaW5zZXJ0QmVmb3JlKG4xLCBwMi5jaGlsZHJlbltpMl0pO1xufVxuXG52YXIgbXVsdGlEcmFnRWxlbWVudHMgPSBbXSxcbiAgICBtdWx0aURyYWdDbG9uZXMgPSBbXSxcbiAgICBsYXN0TXVsdGlEcmFnU2VsZWN0LFxuICAgIC8vIGZvciBzZWxlY3Rpb24gd2l0aCBtb2RpZmllciBrZXkgZG93biAoU0hJRlQpXG5tdWx0aURyYWdTb3J0YWJsZSxcbiAgICBpbml0aWFsRm9sZGluZyA9IGZhbHNlLFxuICAgIC8vIEluaXRpYWwgbXVsdGktZHJhZyBmb2xkIHdoZW4gZHJhZyBzdGFydGVkXG5mb2xkaW5nID0gZmFsc2UsXG4gICAgLy8gRm9sZGluZyBhbnkgb3RoZXIgdGltZVxuZHJhZ1N0YXJ0ZWQgPSBmYWxzZSxcbiAgICBkcmFnRWwkMSxcbiAgICBjbG9uZXNGcm9tUmVjdCxcbiAgICBjbG9uZXNIaWRkZW47XG5cbmZ1bmN0aW9uIE11bHRpRHJhZ1BsdWdpbigpIHtcbiAgZnVuY3Rpb24gTXVsdGlEcmFnKHNvcnRhYmxlKSB7XG4gICAgLy8gQmluZCBhbGwgcHJpdmF0ZSBtZXRob2RzXG4gICAgZm9yICh2YXIgZm4gaW4gdGhpcykge1xuICAgICAgaWYgKGZuLmNoYXJBdCgwKSA9PT0gJ18nICYmIHR5cGVvZiB0aGlzW2ZuXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzW2ZuXSA9IHRoaXNbZm5dLmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFzb3J0YWJsZS5vcHRpb25zLmF2b2lkSW1wbGljaXREZXNlbGVjdCkge1xuICAgICAgaWYgKHNvcnRhYmxlLm9wdGlvbnMuc3VwcG9ydFBvaW50ZXIpIHtcbiAgICAgICAgb24oZG9jdW1lbnQsICdwb2ludGVydXAnLCB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZyk7XG4gICAgICAgIG9uKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb24oZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fY2hlY2tLZXlEb3duKTtcbiAgICBvbihkb2N1bWVudCwgJ2tleXVwJywgdGhpcy5fY2hlY2tLZXlVcCk7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNlbGVjdGVkQ2xhc3M6ICdzb3J0YWJsZS1zZWxlY3RlZCcsXG4gICAgICBtdWx0aURyYWdLZXk6IG51bGwsXG4gICAgICBhdm9pZEltcGxpY2l0RGVzZWxlY3Q6IGZhbHNlLFxuICAgICAgc2V0RGF0YTogZnVuY3Rpb24gc2V0RGF0YShkYXRhVHJhbnNmZXIsIGRyYWdFbCkge1xuICAgICAgICB2YXIgZGF0YSA9ICcnO1xuXG4gICAgICAgIGlmIChtdWx0aURyYWdFbGVtZW50cy5sZW5ndGggJiYgbXVsdGlEcmFnU29ydGFibGUgPT09IHNvcnRhYmxlKSB7XG4gICAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobXVsdGlEcmFnRWxlbWVudCwgaSkge1xuICAgICAgICAgICAgZGF0YSArPSAoIWkgPyAnJyA6ICcsICcpICsgbXVsdGlEcmFnRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhID0gZHJhZ0VsLnRleHRDb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgTXVsdGlEcmFnLnByb3RvdHlwZSA9IHtcbiAgICBtdWx0aURyYWdLZXlEb3duOiBmYWxzZSxcbiAgICBpc011bHRpRHJhZzogZmFsc2UsXG4gICAgZGVsYXlTdGFydEdsb2JhbDogZnVuY3Rpb24gZGVsYXlTdGFydEdsb2JhbChfcmVmKSB7XG4gICAgICB2YXIgZHJhZ2dlZCA9IF9yZWYuZHJhZ0VsO1xuICAgICAgZHJhZ0VsJDEgPSBkcmFnZ2VkO1xuICAgIH0sXG4gICAgZGVsYXlFbmRlZDogZnVuY3Rpb24gZGVsYXlFbmRlZCgpIHtcbiAgICAgIHRoaXMuaXNNdWx0aURyYWcgPSB+bXVsdGlEcmFnRWxlbWVudHMuaW5kZXhPZihkcmFnRWwkMSk7XG4gICAgfSxcbiAgICBzZXR1cENsb25lOiBmdW5jdGlvbiBzZXR1cENsb25lKF9yZWYyKSB7XG4gICAgICB2YXIgc29ydGFibGUgPSBfcmVmMi5zb3J0YWJsZSxcbiAgICAgICAgICBjYW5jZWwgPSBfcmVmMi5jYW5jZWw7XG4gICAgICBpZiAoIXRoaXMuaXNNdWx0aURyYWcpIHJldHVybjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdWx0aURyYWdFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtdWx0aURyYWdDbG9uZXMucHVzaChjbG9uZShtdWx0aURyYWdFbGVtZW50c1tpXSkpO1xuICAgICAgICBtdWx0aURyYWdDbG9uZXNbaV0uc29ydGFibGVJbmRleCA9IG11bHRpRHJhZ0VsZW1lbnRzW2ldLnNvcnRhYmxlSW5kZXg7XG4gICAgICAgIG11bHRpRHJhZ0Nsb25lc1tpXS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgbXVsdGlEcmFnQ2xvbmVzW2ldLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJyc7XG4gICAgICAgIHRvZ2dsZUNsYXNzKG11bHRpRHJhZ0Nsb25lc1tpXSwgdGhpcy5vcHRpb25zLnNlbGVjdGVkQ2xhc3MsIGZhbHNlKTtcbiAgICAgICAgbXVsdGlEcmFnRWxlbWVudHNbaV0gPT09IGRyYWdFbCQxICYmIHRvZ2dsZUNsYXNzKG11bHRpRHJhZ0Nsb25lc1tpXSwgdGhpcy5vcHRpb25zLmNob3NlbkNsYXNzLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHNvcnRhYmxlLl9oaWRlQ2xvbmUoKTtcblxuICAgICAgY2FuY2VsKCk7XG4gICAgfSxcbiAgICBjbG9uZTogZnVuY3Rpb24gY2xvbmUoX3JlZjMpIHtcbiAgICAgIHZhciBzb3J0YWJsZSA9IF9yZWYzLnNvcnRhYmxlLFxuICAgICAgICAgIHJvb3RFbCA9IF9yZWYzLnJvb3RFbCxcbiAgICAgICAgICBkaXNwYXRjaFNvcnRhYmxlRXZlbnQgPSBfcmVmMy5kaXNwYXRjaFNvcnRhYmxlRXZlbnQsXG4gICAgICAgICAgY2FuY2VsID0gX3JlZjMuY2FuY2VsO1xuICAgICAgaWYgKCF0aGlzLmlzTXVsdGlEcmFnKSByZXR1cm47XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlKSB7XG4gICAgICAgIGlmIChtdWx0aURyYWdFbGVtZW50cy5sZW5ndGggJiYgbXVsdGlEcmFnU29ydGFibGUgPT09IHNvcnRhYmxlKSB7XG4gICAgICAgICAgaW5zZXJ0TXVsdGlEcmFnQ2xvbmVzKHRydWUsIHJvb3RFbCk7XG4gICAgICAgICAgZGlzcGF0Y2hTb3J0YWJsZUV2ZW50KCdjbG9uZScpO1xuICAgICAgICAgIGNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93Q2xvbmU6IGZ1bmN0aW9uIHNob3dDbG9uZShfcmVmNCkge1xuICAgICAgdmFyIGNsb25lTm93U2hvd24gPSBfcmVmNC5jbG9uZU5vd1Nob3duLFxuICAgICAgICAgIHJvb3RFbCA9IF9yZWY0LnJvb3RFbCxcbiAgICAgICAgICBjYW5jZWwgPSBfcmVmNC5jYW5jZWw7XG4gICAgICBpZiAoIXRoaXMuaXNNdWx0aURyYWcpIHJldHVybjtcbiAgICAgIGluc2VydE11bHRpRHJhZ0Nsb25lcyhmYWxzZSwgcm9vdEVsKTtcbiAgICAgIG11bHRpRHJhZ0Nsb25lcy5mb3JFYWNoKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBjc3MoY2xvbmUsICdkaXNwbGF5JywgJycpO1xuICAgICAgfSk7XG4gICAgICBjbG9uZU5vd1Nob3duKCk7XG4gICAgICBjbG9uZXNIaWRkZW4gPSBmYWxzZTtcbiAgICAgIGNhbmNlbCgpO1xuICAgIH0sXG4gICAgaGlkZUNsb25lOiBmdW5jdGlvbiBoaWRlQ2xvbmUoX3JlZjUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBzb3J0YWJsZSA9IF9yZWY1LnNvcnRhYmxlLFxuICAgICAgICAgIGNsb25lTm93SGlkZGVuID0gX3JlZjUuY2xvbmVOb3dIaWRkZW4sXG4gICAgICAgICAgY2FuY2VsID0gX3JlZjUuY2FuY2VsO1xuICAgICAgaWYgKCF0aGlzLmlzTXVsdGlEcmFnKSByZXR1cm47XG4gICAgICBtdWx0aURyYWdDbG9uZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgY3NzKGNsb25lLCAnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMucmVtb3ZlQ2xvbmVPbkhpZGUgJiYgY2xvbmUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGNsb25lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNsb25lTm93SGlkZGVuKCk7XG4gICAgICBjbG9uZXNIaWRkZW4gPSB0cnVlO1xuICAgICAgY2FuY2VsKCk7XG4gICAgfSxcbiAgICBkcmFnU3RhcnRHbG9iYWw6IGZ1bmN0aW9uIGRyYWdTdGFydEdsb2JhbChfcmVmNikge1xuICAgICAgdmFyIHNvcnRhYmxlID0gX3JlZjYuc29ydGFibGU7XG5cbiAgICAgIGlmICghdGhpcy5pc011bHRpRHJhZyAmJiBtdWx0aURyYWdTb3J0YWJsZSkge1xuICAgICAgICBtdWx0aURyYWdTb3J0YWJsZS5tdWx0aURyYWcuX2Rlc2VsZWN0TXVsdGlEcmFnKCk7XG4gICAgICB9XG5cbiAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG11bHRpRHJhZ0VsZW1lbnQpIHtcbiAgICAgICAgbXVsdGlEcmFnRWxlbWVudC5zb3J0YWJsZUluZGV4ID0gaW5kZXgobXVsdGlEcmFnRWxlbWVudCk7XG4gICAgICB9KTsgLy8gU29ydCBtdWx0aS1kcmFnIGVsZW1lbnRzXG5cbiAgICAgIG11bHRpRHJhZ0VsZW1lbnRzID0gbXVsdGlEcmFnRWxlbWVudHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5zb3J0YWJsZUluZGV4IC0gYi5zb3J0YWJsZUluZGV4O1xuICAgICAgfSk7XG4gICAgICBkcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgfSxcbiAgICBkcmFnU3RhcnRlZDogZnVuY3Rpb24gZHJhZ1N0YXJ0ZWQoX3JlZjcpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgc29ydGFibGUgPSBfcmVmNy5zb3J0YWJsZTtcbiAgICAgIGlmICghdGhpcy5pc011bHRpRHJhZykgcmV0dXJuO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNvcnQpIHtcbiAgICAgICAgLy8gQ2FwdHVyZSByZWN0cyxcbiAgICAgICAgLy8gaGlkZSBtdWx0aSBkcmFnIGVsZW1lbnRzIChieSBwb3NpdGlvbmluZyB0aGVtIGFic29sdXRlKSxcbiAgICAgICAgLy8gc2V0IG11bHRpIGRyYWcgZWxlbWVudHMgcmVjdHMgdG8gZHJhZ1JlY3QsXG4gICAgICAgIC8vIHNob3cgbXVsdGkgZHJhZyBlbGVtZW50cyxcbiAgICAgICAgLy8gYW5pbWF0ZSB0byByZWN0cyxcbiAgICAgICAgLy8gdW5zZXQgcmVjdHMgJiByZW1vdmUgZnJvbSBET01cbiAgICAgICAgc29ydGFibGUuY2FwdHVyZUFuaW1hdGlvblN0YXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAobXVsdGlEcmFnRWxlbWVudCA9PT0gZHJhZ0VsJDEpIHJldHVybjtcbiAgICAgICAgICAgIGNzcyhtdWx0aURyYWdFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgZHJhZ1JlY3QgPSBnZXRSZWN0KGRyYWdFbCQxLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobXVsdGlEcmFnRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKG11bHRpRHJhZ0VsZW1lbnQgPT09IGRyYWdFbCQxKSByZXR1cm47XG4gICAgICAgICAgICBzZXRSZWN0KG11bHRpRHJhZ0VsZW1lbnQsIGRyYWdSZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb2xkaW5nID0gdHJ1ZTtcbiAgICAgICAgICBpbml0aWFsRm9sZGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc29ydGFibGUuYW5pbWF0ZUFsbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgaW5pdGlhbEZvbGRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoX3RoaXMyLm9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobXVsdGlEcmFnRWxlbWVudCkge1xuICAgICAgICAgICAgdW5zZXRSZWN0KG11bHRpRHJhZ0VsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IC8vIFJlbW92ZSBhbGwgYXV4aWxpYXJ5IG11bHRpZHJhZyBpdGVtcyBmcm9tIGVsLCBpZiBzb3J0aW5nIGVuYWJsZWRcblxuXG4gICAgICAgIGlmIChfdGhpczIub3B0aW9ucy5zb3J0KSB7XG4gICAgICAgICAgcmVtb3ZlTXVsdGlEcmFnRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBkcmFnT3ZlcjogZnVuY3Rpb24gZHJhZ092ZXIoX3JlZjgpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBfcmVmOC50YXJnZXQsXG4gICAgICAgICAgY29tcGxldGVkID0gX3JlZjguY29tcGxldGVkLFxuICAgICAgICAgIGNhbmNlbCA9IF9yZWY4LmNhbmNlbDtcblxuICAgICAgaWYgKGZvbGRpbmcgJiYgfm11bHRpRHJhZ0VsZW1lbnRzLmluZGV4T2YodGFyZ2V0KSkge1xuICAgICAgICBjb21wbGV0ZWQoZmFsc2UpO1xuICAgICAgICBjYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJldmVydDogZnVuY3Rpb24gcmV2ZXJ0KF9yZWY5KSB7XG4gICAgICB2YXIgZnJvbVNvcnRhYmxlID0gX3JlZjkuZnJvbVNvcnRhYmxlLFxuICAgICAgICAgIHJvb3RFbCA9IF9yZWY5LnJvb3RFbCxcbiAgICAgICAgICBzb3J0YWJsZSA9IF9yZWY5LnNvcnRhYmxlLFxuICAgICAgICAgIGRyYWdSZWN0ID0gX3JlZjkuZHJhZ1JlY3Q7XG5cbiAgICAgIGlmIChtdWx0aURyYWdFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIC8vIFNldHVwIHVuZm9sZCBhbmltYXRpb25cbiAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAobXVsdGlEcmFnRWxlbWVudCkge1xuICAgICAgICAgIHNvcnRhYmxlLmFkZEFuaW1hdGlvblN0YXRlKHtcbiAgICAgICAgICAgIHRhcmdldDogbXVsdGlEcmFnRWxlbWVudCxcbiAgICAgICAgICAgIHJlY3Q6IGZvbGRpbmcgPyBnZXRSZWN0KG11bHRpRHJhZ0VsZW1lbnQpIDogZHJhZ1JlY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1bnNldFJlY3QobXVsdGlEcmFnRWxlbWVudCk7XG4gICAgICAgICAgbXVsdGlEcmFnRWxlbWVudC5mcm9tUmVjdCA9IGRyYWdSZWN0O1xuICAgICAgICAgIGZyb21Tb3J0YWJsZS5yZW1vdmVBbmltYXRpb25TdGF0ZShtdWx0aURyYWdFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgaW5zZXJ0TXVsdGlEcmFnRWxlbWVudHMoIXRoaXMub3B0aW9ucy5yZW1vdmVDbG9uZU9uSGlkZSwgcm9vdEVsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRyYWdPdmVyQ29tcGxldGVkOiBmdW5jdGlvbiBkcmFnT3ZlckNvbXBsZXRlZChfcmVmMTApIHtcbiAgICAgIHZhciBzb3J0YWJsZSA9IF9yZWYxMC5zb3J0YWJsZSxcbiAgICAgICAgICBpc093bmVyID0gX3JlZjEwLmlzT3duZXIsXG4gICAgICAgICAgaW5zZXJ0aW9uID0gX3JlZjEwLmluc2VydGlvbixcbiAgICAgICAgICBhY3RpdmVTb3J0YWJsZSA9IF9yZWYxMC5hY3RpdmVTb3J0YWJsZSxcbiAgICAgICAgICBwYXJlbnRFbCA9IF9yZWYxMC5wYXJlbnRFbCxcbiAgICAgICAgICBwdXRTb3J0YWJsZSA9IF9yZWYxMC5wdXRTb3J0YWJsZTtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICBpZiAoaW5zZXJ0aW9uKSB7XG4gICAgICAgIC8vIENsb25lcyBtdXN0IGJlIGhpZGRlbiBiZWZvcmUgZm9sZGluZyBhbmltYXRpb24gdG8gY2FwdHVyZSBkcmFnUmVjdEFic29sdXRlIHByb3Blcmx5XG4gICAgICAgIGlmIChpc093bmVyKSB7XG4gICAgICAgICAgYWN0aXZlU29ydGFibGUuX2hpZGVDbG9uZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdGlhbEZvbGRpbmcgPSBmYWxzZTsgLy8gSWYgbGVhdmluZyBzb3J0OmZhbHNlIHJvb3QsIG9yIGFscmVhZHkgZm9sZGluZyAtIEZvbGQgdG8gbmV3IGxvY2F0aW9uXG5cbiAgICAgICAgaWYgKG9wdGlvbnMuYW5pbWF0aW9uICYmIG11bHRpRHJhZ0VsZW1lbnRzLmxlbmd0aCA+IDEgJiYgKGZvbGRpbmcgfHwgIWlzT3duZXIgJiYgIWFjdGl2ZVNvcnRhYmxlLm9wdGlvbnMuc29ydCAmJiAhcHV0U29ydGFibGUpKSB7XG4gICAgICAgICAgLy8gRm9sZDogU2V0IGFsbCBtdWx0aSBkcmFnIGVsZW1lbnRzJ3MgcmVjdHMgdG8gZHJhZ0VsJ3MgcmVjdCB3aGVuIG11bHRpLWRyYWcgZWxlbWVudHMgYXJlIGludmlzaWJsZVxuICAgICAgICAgIHZhciBkcmFnUmVjdEFic29sdXRlID0gZ2V0UmVjdChkcmFnRWwkMSwgZmFsc2UsIHRydWUsIHRydWUpO1xuICAgICAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG11bHRpRHJhZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChtdWx0aURyYWdFbGVtZW50ID09PSBkcmFnRWwkMSkgcmV0dXJuO1xuICAgICAgICAgICAgc2V0UmVjdChtdWx0aURyYWdFbGVtZW50LCBkcmFnUmVjdEFic29sdXRlKTsgLy8gTW92ZSBlbGVtZW50KHMpIHRvIGVuZCBvZiBwYXJlbnRFbCBzbyB0aGF0IGl0IGRvZXMgbm90IGludGVyZmVyZSB3aXRoIG11bHRpLWRyYWcgY2xvbmVzIGluc2VydGlvbiBpZiB0aGV5IGFyZSBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gd2hpbGUgZm9sZGluZywgYW5kIHNvIHRoYXQgd2UgY2FuIGNhcHR1cmUgdGhlbSBhZ2FpbiBiZWNhdXNlIG9sZCBzb3J0YWJsZSB3aWxsIG5vIGxvbmdlciBiZSBmcm9tU29ydGFibGVcblxuICAgICAgICAgICAgcGFyZW50RWwuYXBwZW5kQ2hpbGQobXVsdGlEcmFnRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9sZGluZyA9IHRydWU7XG4gICAgICAgIH0gLy8gQ2xvbmVzIG11c3QgYmUgc2hvd24gKGFuZCBjaGVjayB0byByZW1vdmUgbXVsdGkgZHJhZ3MpIGFmdGVyIGZvbGRpbmcgd2hlbiBpbnRlcmZlcmluZyBtdWx0aURyYWdFbGVtZW50cyBhcmUgbW92ZWQgb3V0XG5cblxuICAgICAgICBpZiAoIWlzT3duZXIpIHtcbiAgICAgICAgICAvLyBPbmx5IHJlbW92ZSBpZiBub3QgZm9sZGluZyAoZm9sZGluZyB3aWxsIHJlbW92ZSB0aGVtIGFueXdheXMpXG4gICAgICAgICAgaWYgKCFmb2xkaW5nKSB7XG4gICAgICAgICAgICByZW1vdmVNdWx0aURyYWdFbGVtZW50cygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtdWx0aURyYWdFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVzSGlkZGVuQmVmb3JlID0gY2xvbmVzSGlkZGVuO1xuXG4gICAgICAgICAgICBhY3RpdmVTb3J0YWJsZS5fc2hvd0Nsb25lKHNvcnRhYmxlKTsgLy8gVW5mb2xkIGFuaW1hdGlvbiBmb3IgY2xvbmVzIGlmIHNob3dpbmcgZnJvbSBoaWRkZW5cblxuXG4gICAgICAgICAgICBpZiAoYWN0aXZlU29ydGFibGUub3B0aW9ucy5hbmltYXRpb24gJiYgIWNsb25lc0hpZGRlbiAmJiBjbG9uZXNIaWRkZW5CZWZvcmUpIHtcbiAgICAgICAgICAgICAgbXVsdGlEcmFnQ2xvbmVzLmZvckVhY2goZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU29ydGFibGUuYWRkQW5pbWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBjbG9uZSxcbiAgICAgICAgICAgICAgICAgIHJlY3Q6IGNsb25lc0Zyb21SZWN0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2xvbmUuZnJvbVJlY3QgPSBjbG9uZXNGcm9tUmVjdDtcbiAgICAgICAgICAgICAgICBjbG9uZS50aGlzQW5pbWF0aW9uRHVyYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlU29ydGFibGUuX3Nob3dDbG9uZShzb3J0YWJsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkcmFnT3ZlckFuaW1hdGlvbkNhcHR1cmU6IGZ1bmN0aW9uIGRyYWdPdmVyQW5pbWF0aW9uQ2FwdHVyZShfcmVmMTEpIHtcbiAgICAgIHZhciBkcmFnUmVjdCA9IF9yZWYxMS5kcmFnUmVjdCxcbiAgICAgICAgICBpc093bmVyID0gX3JlZjExLmlzT3duZXIsXG4gICAgICAgICAgYWN0aXZlU29ydGFibGUgPSBfcmVmMTEuYWN0aXZlU29ydGFibGU7XG4gICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgIG11bHRpRHJhZ0VsZW1lbnQudGhpc0FuaW1hdGlvbkR1cmF0aW9uID0gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoYWN0aXZlU29ydGFibGUub3B0aW9ucy5hbmltYXRpb24gJiYgIWlzT3duZXIgJiYgYWN0aXZlU29ydGFibGUubXVsdGlEcmFnLmlzTXVsdGlEcmFnKSB7XG4gICAgICAgIGNsb25lc0Zyb21SZWN0ID0gX2V4dGVuZHMoe30sIGRyYWdSZWN0KTtcbiAgICAgICAgdmFyIGRyYWdNYXRyaXggPSBtYXRyaXgoZHJhZ0VsJDEsIHRydWUpO1xuICAgICAgICBjbG9uZXNGcm9tUmVjdC50b3AgLT0gZHJhZ01hdHJpeC5mO1xuICAgICAgICBjbG9uZXNGcm9tUmVjdC5sZWZ0IC09IGRyYWdNYXRyaXguZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRyYWdPdmVyQW5pbWF0aW9uQ29tcGxldGU6IGZ1bmN0aW9uIGRyYWdPdmVyQW5pbWF0aW9uQ29tcGxldGUoKSB7XG4gICAgICBpZiAoZm9sZGluZykge1xuICAgICAgICBmb2xkaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbW92ZU11bHRpRHJhZ0VsZW1lbnRzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkcm9wOiBmdW5jdGlvbiBkcm9wKF9yZWYxMikge1xuICAgICAgdmFyIGV2dCA9IF9yZWYxMi5vcmlnaW5hbEV2ZW50LFxuICAgICAgICAgIHJvb3RFbCA9IF9yZWYxMi5yb290RWwsXG4gICAgICAgICAgcGFyZW50RWwgPSBfcmVmMTIucGFyZW50RWwsXG4gICAgICAgICAgc29ydGFibGUgPSBfcmVmMTIuc29ydGFibGUsXG4gICAgICAgICAgZGlzcGF0Y2hTb3J0YWJsZUV2ZW50ID0gX3JlZjEyLmRpc3BhdGNoU29ydGFibGVFdmVudCxcbiAgICAgICAgICBvbGRJbmRleCA9IF9yZWYxMi5vbGRJbmRleCxcbiAgICAgICAgICBwdXRTb3J0YWJsZSA9IF9yZWYxMi5wdXRTb3J0YWJsZTtcbiAgICAgIHZhciB0b1NvcnRhYmxlID0gcHV0U29ydGFibGUgfHwgdGhpcy5zb3J0YWJsZTtcbiAgICAgIGlmICghZXZ0KSByZXR1cm47XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBjaGlsZHJlbiA9IHBhcmVudEVsLmNoaWxkcmVuOyAvLyBNdWx0aS1kcmFnIHNlbGVjdGlvblxuXG4gICAgICBpZiAoIWRyYWdTdGFydGVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm11bHRpRHJhZ0tleSAmJiAhdGhpcy5tdWx0aURyYWdLZXlEb3duKSB7XG4gICAgICAgICAgdGhpcy5fZGVzZWxlY3RNdWx0aURyYWcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZUNsYXNzKGRyYWdFbCQxLCBvcHRpb25zLnNlbGVjdGVkQ2xhc3MsICF+bXVsdGlEcmFnRWxlbWVudHMuaW5kZXhPZihkcmFnRWwkMSkpO1xuXG4gICAgICAgIGlmICghfm11bHRpRHJhZ0VsZW1lbnRzLmluZGV4T2YoZHJhZ0VsJDEpKSB7XG4gICAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMucHVzaChkcmFnRWwkMSk7XG4gICAgICAgICAgZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICBzb3J0YWJsZTogc29ydGFibGUsXG4gICAgICAgICAgICByb290RWw6IHJvb3RFbCxcbiAgICAgICAgICAgIG5hbWU6ICdzZWxlY3QnLFxuICAgICAgICAgICAgdGFyZ2V0RWw6IGRyYWdFbCQxLFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgICAgfSk7IC8vIE1vZGlmaWVyIGFjdGl2YXRlZCwgc2VsZWN0IGZyb20gbGFzdCB0byBkcmFnRWxcblxuICAgICAgICAgIGlmIChldnQuc2hpZnRLZXkgJiYgbGFzdE11bHRpRHJhZ1NlbGVjdCAmJiBzb3J0YWJsZS5lbC5jb250YWlucyhsYXN0TXVsdGlEcmFnU2VsZWN0KSkge1xuICAgICAgICAgICAgdmFyIGxhc3RJbmRleCA9IGluZGV4KGxhc3RNdWx0aURyYWdTZWxlY3QpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGluZGV4KGRyYWdFbCQxKTtcblxuICAgICAgICAgICAgaWYgKH5sYXN0SW5kZXggJiYgfmN1cnJlbnRJbmRleCAmJiBsYXN0SW5kZXggIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgICAvLyBNdXN0IGluY2x1ZGUgbGFzdE11bHRpRHJhZ1NlbGVjdCAoc2VsZWN0IGl0KSwgaW4gY2FzZSBtb2RpZmllZCBzZWxlY3Rpb24gZnJvbSBubyBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgLy8gKGJ1dCBwcmV2aW91cyBzZWxlY3Rpb24gZXhpc3RlZClcbiAgICAgICAgICAgICAgdmFyIG4sIGk7XG5cbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgIGkgPSBsYXN0SW5kZXg7XG4gICAgICAgICAgICAgICAgbiA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpID0gY3VycmVudEluZGV4O1xuICAgICAgICAgICAgICAgIG4gPSBsYXN0SW5kZXggKyAxO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAofm11bHRpRHJhZ0VsZW1lbnRzLmluZGV4T2YoY2hpbGRyZW5baV0pKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhjaGlsZHJlbltpXSwgb3B0aW9ucy5zZWxlY3RlZENsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBtdWx0aURyYWdFbGVtZW50cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBzb3J0YWJsZSxcbiAgICAgICAgICAgICAgICAgIHJvb3RFbDogcm9vdEVsLFxuICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRFbDogY2hpbGRyZW5baV0sXG4gICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0TXVsdGlEcmFnU2VsZWN0ID0gZHJhZ0VsJDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbXVsdGlEcmFnU29ydGFibGUgPSB0b1NvcnRhYmxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLnNwbGljZShtdWx0aURyYWdFbGVtZW50cy5pbmRleE9mKGRyYWdFbCQxKSwgMSk7XG4gICAgICAgICAgbGFzdE11bHRpRHJhZ1NlbGVjdCA9IG51bGw7XG4gICAgICAgICAgZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICBzb3J0YWJsZTogc29ydGFibGUsXG4gICAgICAgICAgICByb290RWw6IHJvb3RFbCxcbiAgICAgICAgICAgIG5hbWU6ICdkZXNlbGVjdCcsXG4gICAgICAgICAgICB0YXJnZXRFbDogZHJhZ0VsJDEsXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBNdWx0aS1kcmFnIGRyb3BcblxuXG4gICAgICBpZiAoZHJhZ1N0YXJ0ZWQgJiYgdGhpcy5pc011bHRpRHJhZykge1xuICAgICAgICBmb2xkaW5nID0gZmFsc2U7IC8vIERvIG5vdCBcInVuZm9sZFwiIGFmdGVyIGFyb3VuZCBkcmFnRWwgaWYgcmV2ZXJ0ZWRcblxuICAgICAgICBpZiAoKHBhcmVudEVsW2V4cGFuZG9dLm9wdGlvbnMuc29ydCB8fCBwYXJlbnRFbCAhPT0gcm9vdEVsKSAmJiBtdWx0aURyYWdFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdmFyIGRyYWdSZWN0ID0gZ2V0UmVjdChkcmFnRWwkMSksXG4gICAgICAgICAgICAgIG11bHRpRHJhZ0luZGV4ID0gaW5kZXgoZHJhZ0VsJDEsICc6bm90KC4nICsgdGhpcy5vcHRpb25zLnNlbGVjdGVkQ2xhc3MgKyAnKScpO1xuICAgICAgICAgIGlmICghaW5pdGlhbEZvbGRpbmcgJiYgb3B0aW9ucy5hbmltYXRpb24pIGRyYWdFbCQxLnRoaXNBbmltYXRpb25EdXJhdGlvbiA9IG51bGw7XG4gICAgICAgICAgdG9Tb3J0YWJsZS5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcblxuICAgICAgICAgIGlmICghaW5pdGlhbEZvbGRpbmcpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICBkcmFnRWwkMS5mcm9tUmVjdCA9IGRyYWdSZWN0O1xuICAgICAgICAgICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbXVsdGlEcmFnRWxlbWVudC50aGlzQW5pbWF0aW9uRHVyYXRpb24gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpRHJhZ0VsZW1lbnQgIT09IGRyYWdFbCQxKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVjdCA9IGZvbGRpbmcgPyBnZXRSZWN0KG11bHRpRHJhZ0VsZW1lbnQpIDogZHJhZ1JlY3Q7XG4gICAgICAgICAgICAgICAgICBtdWx0aURyYWdFbGVtZW50LmZyb21SZWN0ID0gcmVjdDsgLy8gUHJlcGFyZSB1bmZvbGQgYW5pbWF0aW9uXG5cbiAgICAgICAgICAgICAgICAgIHRvU29ydGFibGUuYWRkQW5pbWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG11bHRpRHJhZ0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHJlY3Q6IHJlY3RcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IC8vIE11bHRpIGRyYWcgZWxlbWVudHMgYXJlIG5vdCBuZWNlc3NhcmlseSByZW1vdmVkIGZyb20gdGhlIERPTSBvbiBkcm9wLCBzbyB0byByZWluc2VydFxuICAgICAgICAgICAgLy8gcHJvcGVybHkgdGhleSBtdXN0IGFsbCBiZSByZW1vdmVkXG5cblxuICAgICAgICAgICAgcmVtb3ZlTXVsdGlEcmFnRWxlbWVudHMoKTtcbiAgICAgICAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG11bHRpRHJhZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW211bHRpRHJhZ0luZGV4XSkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsLmluc2VydEJlZm9yZShtdWx0aURyYWdFbGVtZW50LCBjaGlsZHJlblttdWx0aURyYWdJbmRleF0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKG11bHRpRHJhZ0VsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbXVsdGlEcmFnSW5kZXgrKztcbiAgICAgICAgICAgIH0pOyAvLyBJZiBpbml0aWFsIGZvbGRpbmcgaXMgZG9uZSwgdGhlIGVsZW1lbnRzIG1heSBoYXZlIGNoYW5nZWQgcG9zaXRpb24gYmVjYXVzZSB0aGV5IGFyZSBub3dcbiAgICAgICAgICAgIC8vIHVuZm9sZGluZyBhcm91bmQgZHJhZ0VsLCBldmVuIHRob3VnaCBkcmFnRWwgbWF5IG5vdCBoYXZlIGhpcyBpbmRleCBjaGFuZ2VkLCBzbyB1cGRhdGUgZXZlbnRcbiAgICAgICAgICAgIC8vIG11c3QgYmUgZmlyZWQgaGVyZSBhcyBTb3J0YWJsZSB3aWxsIG5vdC5cblxuICAgICAgICAgICAgaWYgKG9sZEluZGV4ID09PSBpbmRleChkcmFnRWwkMSkpIHtcbiAgICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11bHRpRHJhZ0VsZW1lbnQuc29ydGFibGVJbmRleCAhPT0gaW5kZXgobXVsdGlEcmFnRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hTb3J0YWJsZUV2ZW50KCd1cGRhdGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gTXVzdCBiZSBkb25lIGFmdGVyIGNhcHR1cmluZyBpbmRpdmlkdWFsIHJlY3RzIChzY3JvbGwgYmFyKVxuXG5cbiAgICAgICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgICAgICB1bnNldFJlY3QobXVsdGlEcmFnRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdG9Tb3J0YWJsZS5hbmltYXRlQWxsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBtdWx0aURyYWdTb3J0YWJsZSA9IHRvU29ydGFibGU7XG4gICAgICB9IC8vIFJlbW92ZSBjbG9uZXMgaWYgbmVjZXNzYXJ5XG5cblxuICAgICAgaWYgKHJvb3RFbCA9PT0gcGFyZW50RWwgfHwgcHV0U29ydGFibGUgJiYgcHV0U29ydGFibGUubGFzdFB1dE1vZGUgIT09ICdjbG9uZScpIHtcbiAgICAgICAgbXVsdGlEcmFnQ2xvbmVzLmZvckVhY2goZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgICAgY2xvbmUucGFyZW50Tm9kZSAmJiBjbG9uZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBudWxsaW5nR2xvYmFsOiBmdW5jdGlvbiBudWxsaW5nR2xvYmFsKCkge1xuICAgICAgdGhpcy5pc011bHRpRHJhZyA9IGRyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICBtdWx0aURyYWdDbG9uZXMubGVuZ3RoID0gMDtcbiAgICB9LFxuICAgIGRlc3Ryb3lHbG9iYWw6IGZ1bmN0aW9uIGRlc3Ryb3lHbG9iYWwoKSB7XG4gICAgICB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZygpO1xuXG4gICAgICBvZmYoZG9jdW1lbnQsICdwb2ludGVydXAnLCB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZyk7XG4gICAgICBvZmYoZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5fZGVzZWxlY3RNdWx0aURyYWcpO1xuICAgICAgb2ZmKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9kZXNlbGVjdE11bHRpRHJhZyk7XG4gICAgICBvZmYoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5fY2hlY2tLZXlEb3duKTtcbiAgICAgIG9mZihkb2N1bWVudCwgJ2tleXVwJywgdGhpcy5fY2hlY2tLZXlVcCk7XG4gICAgfSxcbiAgICBfZGVzZWxlY3RNdWx0aURyYWc6IGZ1bmN0aW9uIF9kZXNlbGVjdE11bHRpRHJhZyhldnQpIHtcbiAgICAgIGlmICh0eXBlb2YgZHJhZ1N0YXJ0ZWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZHJhZ1N0YXJ0ZWQpIHJldHVybjsgLy8gT25seSBkZXNlbGVjdCBpZiBzZWxlY3Rpb24gaXMgaW4gdGhpcyBzb3J0YWJsZVxuXG4gICAgICBpZiAobXVsdGlEcmFnU29ydGFibGUgIT09IHRoaXMuc29ydGFibGUpIHJldHVybjsgLy8gT25seSBkZXNlbGVjdCBpZiB0YXJnZXQgaXMgbm90IGl0ZW0gaW4gdGhpcyBzb3J0YWJsZVxuXG4gICAgICBpZiAoZXZ0ICYmIGNsb3Nlc3QoZXZ0LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSwgdGhpcy5zb3J0YWJsZS5lbCwgZmFsc2UpKSByZXR1cm47IC8vIE9ubHkgZGVzZWxlY3QgaWYgbGVmdCBjbGlja1xuXG4gICAgICBpZiAoZXZ0ICYmIGV2dC5idXR0b24gIT09IDApIHJldHVybjtcblxuICAgICAgd2hpbGUgKG11bHRpRHJhZ0VsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB2YXIgZWwgPSBtdWx0aURyYWdFbGVtZW50c1swXTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMub3B0aW9ucy5zZWxlY3RlZENsYXNzLCBmYWxzZSk7XG4gICAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLnNoaWZ0KCk7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLnNvcnRhYmxlLFxuICAgICAgICAgIHJvb3RFbDogdGhpcy5zb3J0YWJsZS5lbCxcbiAgICAgICAgICBuYW1lOiAnZGVzZWxlY3QnLFxuICAgICAgICAgIHRhcmdldEVsOiBlbCxcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBfY2hlY2tLZXlEb3duOiBmdW5jdGlvbiBfY2hlY2tLZXlEb3duKGV2dCkge1xuICAgICAgaWYgKGV2dC5rZXkgPT09IHRoaXMub3B0aW9ucy5tdWx0aURyYWdLZXkpIHtcbiAgICAgICAgdGhpcy5tdWx0aURyYWdLZXlEb3duID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIF9jaGVja0tleVVwOiBmdW5jdGlvbiBfY2hlY2tLZXlVcChldnQpIHtcbiAgICAgIGlmIChldnQua2V5ID09PSB0aGlzLm9wdGlvbnMubXVsdGlEcmFnS2V5KSB7XG4gICAgICAgIHRoaXMubXVsdGlEcmFnS2V5RG93biA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzKE11bHRpRHJhZywge1xuICAgIC8vIFN0YXRpYyBtZXRob2RzICYgcHJvcGVydGllc1xuICAgIHBsdWdpbk5hbWU6ICdtdWx0aURyYWcnLFxuICAgIHV0aWxzOiB7XG4gICAgICAvKipcclxuICAgICAgICogU2VsZWN0cyB0aGUgcHJvdmlkZWQgbXVsdGktZHJhZyBpdGVtXHJcbiAgICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBUaGUgZWxlbWVudCB0byBiZSBzZWxlY3RlZFxyXG4gICAgICAgKi9cbiAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGVsKSB7XG4gICAgICAgIHZhciBzb3J0YWJsZSA9IGVsLnBhcmVudE5vZGVbZXhwYW5kb107XG4gICAgICAgIGlmICghc29ydGFibGUgfHwgIXNvcnRhYmxlLm9wdGlvbnMubXVsdGlEcmFnIHx8IH5tdWx0aURyYWdFbGVtZW50cy5pbmRleE9mKGVsKSkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChtdWx0aURyYWdTb3J0YWJsZSAmJiBtdWx0aURyYWdTb3J0YWJsZSAhPT0gc29ydGFibGUpIHtcbiAgICAgICAgICBtdWx0aURyYWdTb3J0YWJsZS5tdWx0aURyYWcuX2Rlc2VsZWN0TXVsdGlEcmFnKCk7XG5cbiAgICAgICAgICBtdWx0aURyYWdTb3J0YWJsZSA9IHNvcnRhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHNvcnRhYmxlLm9wdGlvbnMuc2VsZWN0ZWRDbGFzcywgdHJ1ZSk7XG4gICAgICAgIG11bHRpRHJhZ0VsZW1lbnRzLnB1c2goZWwpO1xuICAgICAgfSxcblxuICAgICAgLyoqXHJcbiAgICAgICAqIERlc2VsZWN0cyB0aGUgcHJvdmlkZWQgbXVsdGktZHJhZyBpdGVtXHJcbiAgICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBUaGUgZWxlbWVudCB0byBiZSBkZXNlbGVjdGVkXHJcbiAgICAgICAqL1xuICAgICAgZGVzZWxlY3Q6IGZ1bmN0aW9uIGRlc2VsZWN0KGVsKSB7XG4gICAgICAgIHZhciBzb3J0YWJsZSA9IGVsLnBhcmVudE5vZGVbZXhwYW5kb10sXG4gICAgICAgICAgICBpbmRleCA9IG11bHRpRHJhZ0VsZW1lbnRzLmluZGV4T2YoZWwpO1xuICAgICAgICBpZiAoIXNvcnRhYmxlIHx8ICFzb3J0YWJsZS5vcHRpb25zLm11bHRpRHJhZyB8fCAhfmluZGV4KSByZXR1cm47XG4gICAgICAgIHRvZ2dsZUNsYXNzKGVsLCBzb3J0YWJsZS5vcHRpb25zLnNlbGVjdGVkQ2xhc3MsIGZhbHNlKTtcbiAgICAgICAgbXVsdGlEcmFnRWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV2ZW50UHJvcGVydGllczogZnVuY3Rpb24gZXZlbnRQcm9wZXJ0aWVzKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBvbGRJbmRpY2llcyA9IFtdLFxuICAgICAgICAgIG5ld0luZGljaWVzID0gW107XG4gICAgICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50KSB7XG4gICAgICAgIG9sZEluZGljaWVzLnB1c2goe1xuICAgICAgICAgIG11bHRpRHJhZ0VsZW1lbnQ6IG11bHRpRHJhZ0VsZW1lbnQsXG4gICAgICAgICAgaW5kZXg6IG11bHRpRHJhZ0VsZW1lbnQuc29ydGFibGVJbmRleFxuICAgICAgICB9KTsgLy8gbXVsdGlEcmFnRWxlbWVudHMgd2lsbCBhbHJlYWR5IGJlIHNvcnRlZCBpZiBmb2xkaW5nXG5cbiAgICAgICAgdmFyIG5ld0luZGV4O1xuXG4gICAgICAgIGlmIChmb2xkaW5nICYmIG11bHRpRHJhZ0VsZW1lbnQgIT09IGRyYWdFbCQxKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChmb2xkaW5nKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBpbmRleChtdWx0aURyYWdFbGVtZW50LCAnOm5vdCguJyArIF90aGlzMy5vcHRpb25zLnNlbGVjdGVkQ2xhc3MgKyAnKScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0luZGV4ID0gaW5kZXgobXVsdGlEcmFnRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdJbmRpY2llcy5wdXNoKHtcbiAgICAgICAgICBtdWx0aURyYWdFbGVtZW50OiBtdWx0aURyYWdFbGVtZW50LFxuICAgICAgICAgIGluZGV4OiBuZXdJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IF90b0NvbnN1bWFibGVBcnJheShtdWx0aURyYWdFbGVtZW50cyksXG4gICAgICAgIGNsb25lczogW10uY29uY2F0KG11bHRpRHJhZ0Nsb25lcyksXG4gICAgICAgIG9sZEluZGljaWVzOiBvbGRJbmRpY2llcyxcbiAgICAgICAgbmV3SW5kaWNpZXM6IG5ld0luZGljaWVzXG4gICAgICB9O1xuICAgIH0sXG4gICAgb3B0aW9uTGlzdGVuZXJzOiB7XG4gICAgICBtdWx0aURyYWdLZXk6IGZ1bmN0aW9uIG11bHRpRHJhZ0tleShrZXkpIHtcbiAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ2N0cmwnKSB7XG4gICAgICAgICAga2V5ID0gJ0NvbnRyb2wnO1xuICAgICAgICB9IGVsc2UgaWYgKGtleS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAga2V5ID0ga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0TXVsdGlEcmFnRWxlbWVudHMoY2xvbmVzSW5zZXJ0ZWQsIHJvb3RFbCkge1xuICBtdWx0aURyYWdFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChtdWx0aURyYWdFbGVtZW50LCBpKSB7XG4gICAgdmFyIHRhcmdldCA9IHJvb3RFbC5jaGlsZHJlblttdWx0aURyYWdFbGVtZW50LnNvcnRhYmxlSW5kZXggKyAoY2xvbmVzSW5zZXJ0ZWQgPyBOdW1iZXIoaSkgOiAwKV07XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByb290RWwuaW5zZXJ0QmVmb3JlKG11bHRpRHJhZ0VsZW1lbnQsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZChtdWx0aURyYWdFbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuLyoqXHJcbiAqIEluc2VydCBtdWx0aS1kcmFnIGNsb25lc1xyXG4gKiBAcGFyYW0gIHtbQm9vbGVhbl19IGVsZW1lbnRzSW5zZXJ0ZWQgIFdoZXRoZXIgdGhlIG11bHRpLWRyYWcgZWxlbWVudHMgYXJlIGluc2VydGVkXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSByb290RWxcclxuICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0TXVsdGlEcmFnQ2xvbmVzKGVsZW1lbnRzSW5zZXJ0ZWQsIHJvb3RFbCkge1xuICBtdWx0aURyYWdDbG9uZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xvbmUsIGkpIHtcbiAgICB2YXIgdGFyZ2V0ID0gcm9vdEVsLmNoaWxkcmVuW2Nsb25lLnNvcnRhYmxlSW5kZXggKyAoZWxlbWVudHNJbnNlcnRlZCA/IE51bWJlcihpKSA6IDApXTtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTXVsdGlEcmFnRWxlbWVudHMoKSB7XG4gIG11bHRpRHJhZ0VsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKG11bHRpRHJhZ0VsZW1lbnQpIHtcbiAgICBpZiAobXVsdGlEcmFnRWxlbWVudCA9PT0gZHJhZ0VsJDEpIHJldHVybjtcbiAgICBtdWx0aURyYWdFbGVtZW50LnBhcmVudE5vZGUgJiYgbXVsdGlEcmFnRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG11bHRpRHJhZ0VsZW1lbnQpO1xuICB9KTtcbn1cblxuU29ydGFibGUubW91bnQobmV3IEF1dG9TY3JvbGxQbHVnaW4oKSk7XG5Tb3J0YWJsZS5tb3VudChSZW1vdmUsIFJldmVydCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNvcnRhYmxlO1xuZXhwb3J0IHsgTXVsdGlEcmFnUGx1Z2luIGFzIE11bHRpRHJhZywgU29ydGFibGUsIFN3YXBQbHVnaW4gYXMgU3dhcCB9O1xuIiwgImltcG9ydCBTb3J0YWJsZSBmcm9tIFwic29ydGFibGVqc1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsaXZld2lyZTppbml0aWFsaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5rYW5iYW4tY29sLWNvbnRhaW5lcicpO1xuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50cywgKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHNvcnRhYmxlID0gU29ydGFibGUuY3JlYXRlKGVsLCB7XG4gICAgICAgICAgICBncm91cDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdGF0dXMtJyArIGVsLmRhdGFzZXQuc3RhdHVzLFxuICAgICAgICAgICAgICAgIHB1dDogZWwuZGF0YXNldC5kcmFnZ2FibGUgPT09IFwiMVwiLFxuICAgICAgICAgICAgICAgIHB1bGw6IGVsLmRhdGFzZXQuZHJhZ2dhYmxlID09PSBcIjFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvcnQ6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRpb246IDIwMCxcbiAgICAgICAgICAgIGZpbHRlcjogXCIuZGlzYWJsZS1kcmFnZ2FibGVcIixcblxuICAgICAgICAgICAgb25FbmQ6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maS1wYWdlJykuZ2V0QXR0cmlidXRlKCd3aXJlOmlkJyk7XG4gICAgICAgICAgICAgICAgaWYgKExpdmV3aXJlLmZpbmQoY29tcG9uZW50SWQpLmdldCgnbG9hZGluZ0FjdGl2YXRlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIExpdmV3aXJlLmZpbmQoY29tcG9uZW50SWQpLnNldCgnbG9hZGluZycsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtRWwgPSBldnQuaXRlbTsgIC8vIGRyYWdnZWQgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRMaXN0ID0gZXZ0LnRvOyAgICAvLyB0YXJnZXQgbGlzdFxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzTGlzdCA9IGV2dC5mcm9tOyAgLy8gcHJldmlvdXMgbGlzdFxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEluZGV4ID0gZXZ0Lm9sZEluZGV4OyAgLy8gZWxlbWVudCdzIG9sZCBpbmRleCB3aXRoaW4gb2xkIHBhcmVudFxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gZXZ0Lm5ld0luZGV4OyAgLy8gZWxlbWVudCdzIG5ldyBpbmRleCB3aXRoaW4gbmV3IHBhcmVudFxuICAgICAgICAgICAgICAgIGlmIChldnQuZnJvbS5kYXRhc2V0LmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdPcmRlciA9IGRvY3VtZW50LmthbmJhblV0aWxpdGllcy5nZXROZXdPcmRlck9mTmV3U3RhdHVzUmVjb3JkKGl0ZW1FbCkuY29uY2F0KHNvcnRhYmxlLnRvQXJyYXkoKSkuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IFwiM211XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkOiBwYXJzZUludChpdGVtRWwuZGF0YXNldC5pZCkgPT09IE51bWJlcihpdGVtRWwuZGF0YXNldC5pZCkgPyAraXRlbUVsLmRhdGFzZXQuaWQgOiBpdGVtRWwuZGF0YXNldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogcGFyc2VJbnQocHJldmlvdXNMaXN0LmRhdGFzZXQuc3RhdHVzKSA9PT0gTnVtYmVyKHByZXZpb3VzTGlzdC5kYXRhc2V0LnN0YXR1cykgPyArcHJldmlvdXNMaXN0LmRhdGFzZXQuc3RhdHVzIDogcHJldmlvdXNMaXN0LmRhdGFzZXQuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBwYXJzZUludCh0YXJnZXRMaXN0LmRhdGFzZXQuc3RhdHVzKSA9PT0gTnVtYmVyKHRhcmdldExpc3QuZGF0YXNldC5zdGF0dXMpID8gK3RhcmdldExpc3QuZGF0YXNldC5zdGF0dXMgOiB0YXJnZXRMaXN0LmRhdGFzZXQuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkSW5kZXg6IG9sZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T3JkZXI6IG5ld09yZGVyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0xpc3QgIT09IHRhcmdldExpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdmaWxhbWVudC1rYW5iYW4ucmVjb3JkLWRyYWcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gJ2ZpbGFtZW50LWthbmJhbi5yZWNvcmQtc29ydCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgTGl2ZXdpcmUuZGlzcGF0Y2goZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG5kb2N1bWVudC5rYW5iYW5VdGlsaXRpZXMgPSB7fTtcblxuLyoqXG4gKiBHZXQgcmVjb3JkcyBvcmRlciBpbiBhIHN0YXR1cyBjb2x1bW4gYmFzZWQgb24gYSByZWNvcmQgZWxlbWVudFxuICogQHBhcmFtIGl0ZW1FbFxuICogQHJldHVybnMgeypbXX1cbiAqL1xuZG9jdW1lbnQua2FuYmFuVXRpbGl0aWVzLmdldE5ld09yZGVyT2ZOZXdTdGF0dXNSZWNvcmQgPSBmdW5jdGlvbihpdGVtRWwpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBpdGVtRWwucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCByZWNvcmRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5rYW5iYW4tY2VsJyk7XG4gICAgY29uc3QgbmV3T3JkZXIgPSBbXTtcbiAgICByZWNvcmRzLmZvckVhY2goKHJlY29yZCkgPT4ge1xuICAgICAgICBuZXdPcmRlci5wdXNoKHJlY29yZC5kYXRhc2V0LmlkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3T3JkZXI7XG59XG5cbmRvY3VtZW50LmthbmJhblV0aWxpdGllcy5rYW5iYW5SZXNpemVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qga2FuYmFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmthbmJhbicpO1xuICAgIGlmIChrYW5iYW4pIHtcbiAgICAgICAgY29uc3QgdG9wUG9zaXRpb24gPSBrYW5iYW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBjb25zdCBkaXN0YW5jZVRvQm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wUG9zaXRpb247XG4gICAgICAgIGNvbnN0IG1pbkhlaWdodCA9IDUwMDtcbiAgICAgICAgY29uc3QgZmlsYW1lbnRTZWN0aW9uUGFkZGluZ0hlaWdodCA9ICcycmVtJztcbiAgICAgICAgbGV0IGhlaWdodCA9ICcnO1xuICAgICAgICBpZiAoZGlzdGFuY2VUb0JvdHRvbSA+IG1pbkhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gJ2NhbGMoJyArIGRpc3RhbmNlVG9Cb3R0b20gKyAncHggLSAnICsgZmlsYW1lbnRTZWN0aW9uUGFkZGluZ0hlaWdodCArICcpJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCA9IG1pbkhlaWdodCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgLmthbmJhbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG59XG5cbmRvY3VtZW50LmthbmJhblV0aWxpdGllcy5zZWxlY3RlZFJlY29yZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcblxuICAgICAgICBpZiAodXJsUGFyYW1zLmhhcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB1cmxQYXJhbXMuZ2V0KCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcua2FuYmFuLWNlbGxbZGF0YS1pZD1cIicgKyBzZWxlY3RlZCArICdcIl0gLmthbmJhbi1jZWxsLXRpdGxlJyk7XG4gICAgICAgICAgICBpZiAocmVjb3JkVGl0bGUpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRUaXRsZS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LCAzMDApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFNQSxXQUFTLFFBQVEsUUFBUSxnQkFBZ0I7QUFDdkMsUUFBSSxPQUFPLE9BQU8sS0FBSyxNQUFNO0FBRTdCLFFBQUksT0FBTyx1QkFBdUI7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Q0o7QUFFQSxXQUFTLGdCQUFnQixpQkFBaUIsV0FBWTtBQUNsRCxlQUFXLE1BQU07QUFFYixZQUFNLE1BQU0sSUFBSSxJQUFJLE9BQU8sU0FBUyxJQUFJO0FBQ3hDLFlBQU0sWUFBWSxJQUFJO0FBRXRCLFVBQUksVUFBVSxJQUFJLFVBQVUsR0FBRztBQUMzQixjQUFNLFdBQVcsVUFBVSxJQUFJLFVBQVU7QUFDekMsY0FBTSxjQUFjLFNBQVMsY0FBYywyQkFBMkIsV0FBVyx1QkFBdUI7QUFDeEcsWUFBSSxhQUFhO0FBQ2Isc0JBQVksTUFBTTtBQUFBLFFBQ3RCO0FBQUEsTUFDSjtBQUFBLElBRUosR0FBRyxHQUFHO0FBQUEsRUFDVjsiLAogICJuYW1lcyI6IFsib2JqIiwgImluZGV4IiwgIm9wdGlvbiIsICJkZWZhdWx0cyIsICJyb290RWwiLCAiY2xvbmVFbCIsICJvbGRJbmRleCIsICJuZXdJbmRleCIsICJvbGREcmFnZ2FibGVJbmRleCIsICJuZXdEcmFnZ2FibGVJbmRleCIsICJwdXRTb3J0YWJsZSIsICJwbHVnaW5FdmVudCIsICJfZGV0ZWN0RGlyZWN0aW9uIiwgIl9kcmFnRWxJblJvd0NvbHVtbiIsICJfZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUiLCAiX3ByZXBhcmVHcm91cCIsICJkcmFnRWwiLCAiX2hpZGVHaG9zdEZvclRhcmdldCIsICJfdW5oaWRlR2hvc3RGb3JUYXJnZXQiLCAibmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQiLCAiX2NoZWNrT3V0c2lkZVRhcmdldEVsIiwgImRyYWdTdGFydEZuIiwgInRhcmdldCIsICJhZnRlciIsICJlbCIsICJwbHVnaW5zIiwgImRyb3AiLCAiYXV0b1Njcm9sbCIsICJvblNwaWxsIiwgIm9sZEluZGV4IiwgIm5ld0luZGV4IiwgImluZGV4Il0KfQo=
