import {
  __commonJS,
  __toESM,
  require_react
} from "./chunk-QSQYAWSL.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      var nativeCodeString = "[native code]";
      function classNames() {
        var classes = [];
        for (var i2 = 0; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/react-tooltip/dist/react-tooltip.min.mjs
var import_react = __toESM(require_react(), 1);
var import_classnames = __toESM(require_classnames(), 1);

// node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
      continue;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x: x2,
    y: y2
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var min = Math.min;
var max = Math.max;
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max3 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min$1, center, max3);
    const shouldAddOffset = getAlignment(placement) != null && center != offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max3 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 + alignmentOffset
      }
    };
  }
});
var sides = ["top", "right", "bottom", "left"];
var allPlacements = sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y3
            } = _ref;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min3 = mainAxisCoord + overflow[minSide];
        const max3 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min3, mainAxisCoord, max3);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min3 = crossAxisCoord + overflow[minSide];
        const max3 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min3, crossAxisCoord, max3);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs
function getWindow(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const safari = isSafari();
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || !safari && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !safari && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function isSafari() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
var min2 = Math.min;
var max2 = Math.max;
var round = Math.round;
var createEmptyCoords = (v) => ({
  x: v,
  y: v
});
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createEmptyCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x2 = ($ ? round(rect.width) : rect.width) / width;
  let y2 = ($ ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
var noOffsets = createEmptyCoords(0);
function getVisualOffsets(element, isFixed, floatingOffsetParent) {
  var _win$visualViewport, _win$visualViewport2;
  if (isFixed === void 0) {
    isFixed = true;
  }
  if (!isSafari()) {
    return noOffsets;
  }
  const win = element ? getWindow(element) : window;
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== win) {
    return noOffsets;
  }
  return {
    x: ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0,
    y: ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0
  };
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createEmptyCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = getVisualOffsets(domElement, isFixedStrategy, offsetParent);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createEmptyCoords(1);
  const offsets = createEmptyCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max2(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max2(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x2 += max2(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isSafari();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createEmptyCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createEmptyCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
var platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  async getElementRects(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(floating)
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/react-tooltip/dist/react-tooltip.min.mjs
function f(e2, t2) {
  void 0 === t2 && (t2 = {});
  var r2 = t2.insertAt;
  if (e2 && "undefined" != typeof document) {
    var o2 = document.head || document.getElementsByTagName("head")[0], l2 = document.createElement("style");
    l2.type = "text/css", "top" === r2 && o2.firstChild ? o2.insertBefore(l2, o2.firstChild) : o2.appendChild(l2), l2.styleSheet ? l2.styleSheet.cssText = e2 : l2.appendChild(document.createTextNode(e2));
  }
}
f(":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9}");
var h = (e2, t2, r2) => {
  let o2 = null;
  return function(...l2) {
    const n2 = () => {
      o2 = null, r2 || e2.apply(this, l2);
    };
    r2 && !o2 && (e2.apply(this, l2), o2 = setTimeout(n2, t2)), r2 || (o2 && clearTimeout(o2), o2 = setTimeout(n2, t2));
  };
};
var y = "DEFAULT_TOOLTIP_ID";
var w = { anchorRefs: /* @__PURE__ */ new Set(), activeAnchor: { current: null }, attach: () => {
}, detach: () => {
}, setActiveAnchor: () => {
} };
var _ = (0, import_react.createContext)({ getTooltipData: () => w });
var b = ({ children: t2 }) => {
  const [n2, c2] = (0, import_react.useState)({ [y]: /* @__PURE__ */ new Set() }), [i2, a2] = (0, import_react.useState)({ [y]: { current: null } }), s2 = (e2, ...t3) => {
    c2((r2) => {
      var o2;
      const l2 = null !== (o2 = r2[e2]) && void 0 !== o2 ? o2 : /* @__PURE__ */ new Set();
      return t3.forEach((e3) => l2.add(e3)), { ...r2, [e2]: new Set(l2) };
    });
  }, u = (e2, ...t3) => {
    c2((r2) => {
      const o2 = r2[e2];
      return o2 ? (t3.forEach((e3) => o2.delete(e3)), { ...r2 }) : r2;
    });
  }, d = (0, import_react.useCallback)((e2 = y) => {
    var t3, r2;
    return { anchorRefs: null !== (t3 = n2[e2]) && void 0 !== t3 ? t3 : /* @__PURE__ */ new Set(), activeAnchor: null !== (r2 = i2[e2]) && void 0 !== r2 ? r2 : { current: null }, attach: (...t4) => s2(e2, ...t4), detach: (...t4) => u(e2, ...t4), setActiveAnchor: (t4) => ((e3, t5) => {
      a2((r3) => {
        var o2;
        return (null === (o2 = r3[e3]) || void 0 === o2 ? void 0 : o2.current) === t5.current ? r3 : { ...r3, [e3]: t5 };
      });
    })(e2, t4) };
  }, [n2, i2, s2, u]), p = (0, import_react.useMemo)(() => ({ getTooltipData: d }), [d]);
  return import_react.default.createElement(_.Provider, { value: p }, t2);
};
function g(e2 = y) {
  return (0, import_react.useContext)(_).getTooltipData(e2);
}
var S = ({ tooltipId: t2, children: r2, className: o2, place: l2, content: n2, html: a2, variant: u, offset: d, wrapper: p, events: v, positionStrategy: m, delayShow: f2, delayHide: h2 }) => {
  const { attach: y2, detach: w2 } = g(t2), _2 = (0, import_react.useRef)(null);
  return (0, import_react.useEffect)(() => (y2(_2), () => {
    w2(_2);
  }), []), import_react.default.createElement("span", { ref: _2, className: (0, import_classnames.default)("react-tooltip-wrapper", o2), "data-tooltip-place": l2, "data-tooltip-content": n2, "data-tooltip-html": a2, "data-tooltip-variant": u, "data-tooltip-offset": d, "data-tooltip-wrapper": p, "data-tooltip-events": v, "data-tooltip-position-strategy": m, "data-tooltip-delay-show": f2, "data-tooltip-delay-hide": h2 }, r2);
};
var E = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect;
var A = (e2) => {
  if (!(e2 instanceof HTMLElement || e2 instanceof SVGElement))
    return false;
  const t2 = getComputedStyle(e2);
  return ["overflow", "overflow-x", "overflow-y"].some((e3) => {
    const r2 = t2.getPropertyValue(e3);
    return "auto" === r2 || "scroll" === r2;
  });
};
var k = (e2) => {
  if (!e2)
    return null;
  let t2 = e2.parentElement;
  for (; t2; ) {
    if (A(t2))
      return t2;
    t2 = t2.parentElement;
  }
  return document.scrollingElement || document.documentElement;
};
var T = async ({ elementReference: e2 = null, tooltipReference: t2 = null, tooltipArrowReference: r2 = null, place: o2 = "top", offset: l2 = 10, strategy: n2 = "absolute", middlewares: c2 = [offset(Number(l2)), flip(), shift({ padding: 5 })] }) => {
  if (!e2)
    return { tooltipStyles: {}, tooltipArrowStyles: {}, place: o2 };
  if (null === t2)
    return { tooltipStyles: {}, tooltipArrowStyles: {}, place: o2 };
  const i2 = c2;
  return r2 ? (i2.push(arrow({ element: r2, padding: 5 })), computePosition2(e2, t2, { placement: o2, strategy: n2, middleware: i2 }).then(({ x: e3, y: t3, placement: r3, middlewareData: o3 }) => {
    var l3, n3;
    const c3 = { left: `${e3}px`, top: `${t3}px` }, { x: i3, y: a2 } = null !== (l3 = o3.arrow) && void 0 !== l3 ? l3 : { x: 0, y: 0 };
    return { tooltipStyles: c3, tooltipArrowStyles: { left: null != i3 ? `${i3}px` : "", top: null != a2 ? `${a2}px` : "", right: "", bottom: "", [null !== (n3 = { top: "bottom", right: "left", bottom: "top", left: "right" }[r3.split("-")[0]]) && void 0 !== n3 ? n3 : "bottom"]: "-4px" }, place: r3 };
  })) : computePosition2(e2, t2, { placement: "bottom", strategy: n2, middleware: i2 }).then(({ x: e3, y: t3, placement: r3 }) => ({ tooltipStyles: { left: `${e3}px`, top: `${t3}px` }, tooltipArrowStyles: {}, place: r3 }));
};
var x = { tooltip: "styles-module_tooltip__mnnfp", fixed: "styles-module_fixed__7ciUi", arrow: "styles-module_arrow__K0L3T", noArrow: "styles-module_noArrow__T8y2L", clickable: "styles-module_clickable__Bv9o7", show: "styles-module_show__2NboJ", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
f(".styles-module_tooltip__mnnfp{border-radius:3px;font-size:90%;left:0;opacity:0;padding:8px 16px;pointer-events:none;position:absolute;top:0;transition:opacity .3s ease-out;visibility:hidden;width:max-content;will-change:opacity,visibility}.styles-module_fixed__7ciUi{position:fixed}.styles-module_arrow__K0L3T{background:inherit;height:8px;position:absolute;transform:rotate(45deg);width:8px}.styles-module_noArrow__T8y2L{display:none}.styles-module_clickable__Bv9o7{pointer-events:auto}.styles-module_show__2NboJ{opacity:var(--rt-opacity);visibility:visible}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}");
var O = ({ id: t2, className: o2, classNameArrow: l2, variant: n2 = "dark", anchorId: a2, anchorSelect: u, place: d = "top", offset: p = 10, events: v = ["hover"], openOnClick: m = false, positionStrategy: f2 = "absolute", middlewares: y2, wrapper: w2, delayShow: _2 = 0, delayHide: b2 = 0, float: S2 = false, hidden: A2 = false, noArrow: O2 = false, clickable: L2 = false, closeOnEsc: N2 = false, closeOnScroll: R = false, closeOnResize: $ = false, style: C, position: H, afterShow: I, afterHide: W, content: j, contentWrapperRef: q, isOpen: z, setIsOpen: D, activeAnchor: B, setActiveAnchor: K }) => {
  const M = (0, import_react.useRef)(null), X = (0, import_react.useRef)(null), J = (0, import_react.useRef)(null), P = (0, import_react.useRef)(null), [U, F] = (0, import_react.useState)(d), [V, Z] = (0, import_react.useState)({}), [G, Y] = (0, import_react.useState)({}), [Q, ee] = (0, import_react.useState)(false), [te, re] = (0, import_react.useState)(false), oe = (0, import_react.useRef)(false), le = (0, import_react.useRef)(null), { anchorRefs: ne, setActiveAnchor: ce } = g(t2), ie = (0, import_react.useRef)(false), [ae, se] = (0, import_react.useState)([]), ue = (0, import_react.useRef)(false), de = m || v.includes("click");
  E(() => (ue.current = true, () => {
    ue.current = false;
  }), []), (0, import_react.useEffect)(() => {
    if (!Q) {
      const e2 = setTimeout(() => {
        re(false);
      }, 150);
      return () => {
        clearTimeout(e2);
      };
    }
    return () => null;
  }, [Q]);
  const pe = (e2) => {
    ue.current && (e2 && re(true), setTimeout(() => {
      ue.current && (null == D || D(e2), void 0 === z && ee(e2));
    }, 10));
  };
  (0, import_react.useEffect)(() => {
    if (void 0 === z)
      return () => null;
    z && re(true);
    const e2 = setTimeout(() => {
      ee(z);
    }, 10);
    return () => {
      clearTimeout(e2);
    };
  }, [z]), (0, import_react.useEffect)(() => {
    Q !== oe.current && (oe.current = Q, Q ? null == I || I() : null == W || W());
  }, [Q]);
  const ve = (e2 = b2) => {
    P.current && clearTimeout(P.current), P.current = setTimeout(() => {
      ie.current || pe(false);
    }, e2);
  }, me = (e2) => {
    var t3;
    if (!e2)
      return;
    const r2 = null !== (t3 = e2.currentTarget) && void 0 !== t3 ? t3 : e2.target;
    if (!(null == r2 ? void 0 : r2.isConnected))
      return K(null), void ce({ current: null });
    _2 ? (J.current && clearTimeout(J.current), J.current = setTimeout(() => {
      pe(true);
    }, _2)) : pe(true), K(r2), ce({ current: r2 }), P.current && clearTimeout(P.current);
  }, fe = () => {
    L2 ? ve(b2 || 100) : b2 ? ve() : pe(false), J.current && clearTimeout(J.current);
  }, he = ({ x: e2, y: t3 }) => {
    T({ place: d, offset: p, elementReference: { getBoundingClientRect: () => ({ x: e2, y: t3, width: 0, height: 0, top: t3, left: e2, right: e2, bottom: t3 }) }, tooltipReference: M.current, tooltipArrowReference: X.current, strategy: f2, middlewares: y2 }).then((e3) => {
      Object.keys(e3.tooltipStyles).length && Z(e3.tooltipStyles), Object.keys(e3.tooltipArrowStyles).length && Y(e3.tooltipArrowStyles), F(e3.place);
    });
  }, ye = (e2) => {
    if (!e2)
      return;
    const t3 = e2, r2 = { x: t3.clientX, y: t3.clientY };
    he(r2), le.current = r2;
  }, we = (e2) => {
    me(e2), b2 && ve();
  }, _e = (e2) => {
    var t3;
    [document.querySelector(`[id='${a2}']`), ...ae].some((t4) => null == t4 ? void 0 : t4.contains(e2.target)) || (null === (t3 = M.current) || void 0 === t3 ? void 0 : t3.contains(e2.target)) || (pe(false), J.current && clearTimeout(J.current));
  }, be = h(me, 50, true), ge = h(fe, 50, true);
  (0, import_react.useEffect)(() => {
    var e2, t3;
    const r2 = new Set(ne);
    ae.forEach((e3) => {
      r2.add({ current: e3 });
    });
    const o3 = document.querySelector(`[id='${a2}']`);
    o3 && r2.add({ current: o3 });
    const l3 = () => {
      pe(false);
    }, n3 = k(B), c2 = k(M.current);
    R && (window.addEventListener("scroll", l3), null == n3 || n3.addEventListener("scroll", l3), null == c2 || c2.addEventListener("scroll", l3)), $ && window.addEventListener("resize", l3);
    const i2 = (e3) => {
      "Escape" === e3.key && pe(false);
    };
    N2 && window.addEventListener("keydown", i2);
    const s2 = [];
    de ? (window.addEventListener("click", _e), s2.push({ event: "click", listener: we })) : (s2.push({ event: "mouseenter", listener: be }, { event: "mouseleave", listener: ge }, { event: "focus", listener: be }, { event: "blur", listener: ge }), S2 && s2.push({ event: "mousemove", listener: ye }));
    const u2 = () => {
      ie.current = true;
    }, d2 = () => {
      ie.current = false, fe();
    };
    return L2 && !de && (null === (e2 = M.current) || void 0 === e2 || e2.addEventListener("mouseenter", u2), null === (t3 = M.current) || void 0 === t3 || t3.addEventListener("mouseleave", d2)), s2.forEach(({ event: e3, listener: t4 }) => {
      r2.forEach((r3) => {
        var o4;
        null === (o4 = r3.current) || void 0 === o4 || o4.addEventListener(e3, t4);
      });
    }), () => {
      var e3, t4;
      R && (window.removeEventListener("scroll", l3), null == n3 || n3.removeEventListener("scroll", l3), null == c2 || c2.removeEventListener("scroll", l3)), $ && window.removeEventListener("resize", l3), de && window.removeEventListener("click", _e), N2 && window.removeEventListener("keydown", i2), L2 && !de && (null === (e3 = M.current) || void 0 === e3 || e3.removeEventListener("mouseenter", u2), null === (t4 = M.current) || void 0 === t4 || t4.removeEventListener("mouseleave", d2)), s2.forEach(({ event: e4, listener: t5 }) => {
        r2.forEach((r3) => {
          var o4;
          null === (o4 = r3.current) || void 0 === o4 || o4.removeEventListener(e4, t5);
        });
      });
    };
  }, [te, ne, ae, N2, v]), (0, import_react.useEffect)(() => {
    let e2 = null != u ? u : "";
    !e2 && t2 && (e2 = `[data-tooltip-id='${t2}']`);
    const r2 = new MutationObserver((r3) => {
      const o3 = [];
      r3.forEach((r4) => {
        if ("attributes" === r4.type && "data-tooltip-id" === r4.attributeName) {
          r4.target.getAttribute("data-tooltip-id") === t2 && o3.push(r4.target);
        }
        if ("childList" === r4.type && (B && [...r4.removedNodes].some((e3) => {
          var t3;
          return !!(null === (t3 = null == e3 ? void 0 : e3.contains) || void 0 === t3 ? void 0 : t3.call(e3, B)) && (re(false), pe(false), K(null), J.current && clearTimeout(J.current), P.current && clearTimeout(P.current), true);
        }), e2))
          try {
            const t3 = [...r4.addedNodes].filter((e3) => 1 === e3.nodeType);
            o3.push(...t3.filter((t4) => t4.matches(e2))), o3.push(...t3.flatMap((t4) => [...t4.querySelectorAll(e2)]));
          } catch (e3) {
          }
      }), o3.length && se((e3) => [...e3, ...o3]);
    });
    return r2.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"] }), () => {
      r2.disconnect();
    };
  }, [t2, u, B]);
  const Se = () => {
    H ? he(H) : S2 ? le.current && he(le.current) : T({ place: d, offset: p, elementReference: B, tooltipReference: M.current, tooltipArrowReference: X.current, strategy: f2, middlewares: y2 }).then((e2) => {
      ue.current && (Object.keys(e2.tooltipStyles).length && Z(e2.tooltipStyles), Object.keys(e2.tooltipArrowStyles).length && Y(e2.tooltipArrowStyles), F(e2.place));
    });
  };
  (0, import_react.useEffect)(() => {
    Se();
  }, [Q, B, j, C, d, p, f2, H]), (0, import_react.useEffect)(() => {
    if (!(null == q ? void 0 : q.current))
      return () => null;
    const e2 = new ResizeObserver(() => {
      Se();
    });
    return e2.observe(q.current), () => {
      e2.disconnect();
    };
  }, [j, null == q ? void 0 : q.current]), (0, import_react.useEffect)(() => {
    var e2;
    const t3 = document.querySelector(`[id='${a2}']`), r2 = [...ae, t3];
    B && r2.includes(B) || K(null !== (e2 = ae[0]) && void 0 !== e2 ? e2 : t3);
  }, [a2, ae, B]), (0, import_react.useEffect)(() => () => {
    J.current && clearTimeout(J.current), P.current && clearTimeout(P.current);
  }, []), (0, import_react.useEffect)(() => {
    let e2 = u;
    if (!e2 && t2 && (e2 = `[data-tooltip-id='${t2}']`), e2)
      try {
        const t3 = Array.from(document.querySelectorAll(e2));
        se(t3);
      } catch (e3) {
        se([]);
      }
  }, [t2, u]);
  const Ee = !A2 && j && Q && Object.keys(V).length > 0;
  return te ? import_react.default.createElement(w2, { id: t2, role: "tooltip", className: (0, import_classnames.default)("react-tooltip", x.tooltip, x[n2], o2, `react-tooltip__place-${U}`, { [x.show]: Ee, [x.fixed]: "fixed" === f2, [x.clickable]: L2 }), style: { ...C, ...V }, ref: M }, j, import_react.default.createElement(w2, { className: (0, import_classnames.default)("react-tooltip-arrow", x.arrow, l2, { [x.noArrow]: O2 }), style: G, ref: X })) : null;
};
var L = ({ content: t2 }) => import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: t2 } });
var N = ({ id: t2, anchorId: o2, anchorSelect: l2, content: n2, html: a2, render: s2, className: u, classNameArrow: d, variant: p = "dark", place: v = "top", offset: m = 10, wrapper: f2 = "div", children: h2 = null, events: y2 = ["hover"], openOnClick: w2 = false, positionStrategy: _2 = "absolute", middlewares: b2, delayShow: S2 = 0, delayHide: E2 = 0, float: A2 = false, hidden: k2 = false, noArrow: T2 = false, clickable: x2 = false, closeOnEsc: N2 = false, closeOnScroll: R = false, closeOnResize: $ = false, style: C, position: H, isOpen: I, setIsOpen: W, afterShow: j, afterHide: q }) => {
  const [z, D] = (0, import_react.useState)(n2), [B, K] = (0, import_react.useState)(a2), [M, X] = (0, import_react.useState)(v), [J, P] = (0, import_react.useState)(p), [U, F] = (0, import_react.useState)(m), [V, Z] = (0, import_react.useState)(S2), [G, Y] = (0, import_react.useState)(E2), [Q, ee] = (0, import_react.useState)(A2), [te, re] = (0, import_react.useState)(k2), [oe, le] = (0, import_react.useState)(f2), [ne, ce] = (0, import_react.useState)(y2), [ie, ae] = (0, import_react.useState)(_2), [se, ue] = (0, import_react.useState)(null), { anchorRefs: de, activeAnchor: pe } = g(t2), ve = (e2) => null == e2 ? void 0 : e2.getAttributeNames().reduce((t3, r2) => {
    var o3;
    if (r2.startsWith("data-tooltip-")) {
      t3[r2.replace(/^data-tooltip-/, "")] = null !== (o3 = null == e2 ? void 0 : e2.getAttribute(r2)) && void 0 !== o3 ? o3 : null;
    }
    return t3;
  }, {}), me = (e2) => {
    const t3 = { place: (e3) => {
      var t4;
      X(null !== (t4 = e3) && void 0 !== t4 ? t4 : v);
    }, content: (e3) => {
      D(null != e3 ? e3 : n2);
    }, html: (e3) => {
      K(null != e3 ? e3 : a2);
    }, variant: (e3) => {
      var t4;
      P(null !== (t4 = e3) && void 0 !== t4 ? t4 : p);
    }, offset: (e3) => {
      F(null === e3 ? m : Number(e3));
    }, wrapper: (e3) => {
      var t4;
      le(null !== (t4 = e3) && void 0 !== t4 ? t4 : f2);
    }, events: (e3) => {
      const t4 = null == e3 ? void 0 : e3.split(" ");
      ce(null != t4 ? t4 : y2);
    }, "position-strategy": (e3) => {
      var t4;
      ae(null !== (t4 = e3) && void 0 !== t4 ? t4 : _2);
    }, "delay-show": (e3) => {
      Z(null === e3 ? S2 : Number(e3));
    }, "delay-hide": (e3) => {
      Y(null === e3 ? E2 : Number(e3));
    }, float: (e3) => {
      ee(null === e3 ? A2 : "true" === e3);
    }, hidden: (e3) => {
      re(null === e3 ? k2 : "true" === e3);
    } };
    Object.values(t3).forEach((e3) => e3(null)), Object.entries(e2).forEach(([e3, r2]) => {
      var o3;
      null === (o3 = t3[e3]) || void 0 === o3 || o3.call(t3, r2);
    });
  };
  (0, import_react.useEffect)(() => {
    D(n2);
  }, [n2]), (0, import_react.useEffect)(() => {
    K(a2);
  }, [a2]), (0, import_react.useEffect)(() => {
    X(v);
  }, [v]), (0, import_react.useEffect)(() => {
    P(p);
  }, [p]), (0, import_react.useEffect)(() => {
    F(m);
  }, [m]), (0, import_react.useEffect)(() => {
    Z(S2);
  }, [S2]), (0, import_react.useEffect)(() => {
    Y(E2);
  }, [E2]), (0, import_react.useEffect)(() => {
    ee(A2);
  }, [A2]), (0, import_react.useEffect)(() => {
    re(k2);
  }, [k2]), (0, import_react.useEffect)(() => {
    ae(_2);
  }, [_2]), (0, import_react.useEffect)(() => {
    var e2;
    const r2 = new Set(de);
    let n3 = l2;
    if (!n3 && t2 && (n3 = `[data-tooltip-id='${t2}']`), n3)
      try {
        document.querySelectorAll(n3).forEach((e3) => {
          r2.add({ current: e3 });
        });
      } catch (e3) {
        console.warn(`[react-tooltip] "${n3}" is not a valid CSS selector`);
      }
    const c2 = document.querySelector(`[id='${o2}']`);
    if (c2 && r2.add({ current: c2 }), !r2.size)
      return () => null;
    const i2 = null !== (e2 = null != se ? se : c2) && void 0 !== e2 ? e2 : pe.current, a3 = new MutationObserver((e3) => {
      e3.forEach((e4) => {
        var t3;
        if (!i2 || "attributes" !== e4.type || !(null === (t3 = e4.attributeName) || void 0 === t3 ? void 0 : t3.startsWith("data-tooltip-")))
          return;
        const r3 = ve(i2);
        me(r3);
      });
    }), s3 = { attributes: true, childList: false, subtree: false };
    if (i2) {
      const e3 = ve(i2);
      me(e3), a3.observe(i2, s3);
    }
    return () => {
      a3.disconnect();
    };
  }, [de, pe, se, o2, l2]);
  let fe = h2;
  const he = (0, import_react.useRef)(null);
  if (s2) {
    const t3 = s2({ content: null != z ? z : null, activeAnchor: se });
    fe = t3 ? import_react.default.createElement("div", { ref: he, className: "react-tooltip-content-wrapper" }, t3) : null;
  } else
    z && (fe = z);
  B && (fe = import_react.default.createElement(L, { content: B }));
  const ye = { id: t2, anchorId: o2, anchorSelect: l2, className: u, classNameArrow: d, content: fe, contentWrapperRef: he, place: M, variant: J, offset: U, wrapper: oe, events: ne, openOnClick: w2, positionStrategy: ie, middlewares: b2, delayShow: V, delayHide: G, float: Q, hidden: te, noArrow: T2, clickable: x2, closeOnEsc: N2, closeOnScroll: R, closeOnResize: $, style: C, position: H, isOpen: I, setIsOpen: W, afterShow: j, afterHide: q, activeAnchor: se, setActiveAnchor: (e2) => ue(e2) };
  return import_react.default.createElement(O, { ...ye });
};
export {
  N as Tooltip,
  b as TooltipProvider,
  S as TooltipWrapper
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

react-tooltip/dist/react-tooltip.min.mjs:
  (*
  * React Tooltip
  * {@link https://github.com/ReactTooltip/react-tooltip}
  * @copyright ReactTooltip Team
  * @license MIT
  *)
*/
//# sourceMappingURL=react-tooltip.js.map
