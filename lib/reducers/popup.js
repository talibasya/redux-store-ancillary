"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PopupProvider", {
  enumerable: true,
  get: function () {
    return _PopupProvider2.default;
  }
});
exports.default = exports.cleanStack = exports.updatePopup = exports.hidePopup = exports.showPopup = exports.cleanStackType = exports.updatePopupType = exports.hidePopupType = exports.showPopupType = void 0;

var _PopupProvider2 = _interopRequireDefault(require("../providers/PopupProvider"));

var _ACTION_HANDLERS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: allow set from outside
var showPopupType = 'MIDDLEWARE/SHOW_POPUP';
exports.showPopupType = showPopupType;
var hidePopupType = 'MIDDLEWARE/HIDE_POPUP';
exports.hidePopupType = hidePopupType;
var updatePopupType = 'MIDDLEWARE/UPDATE_POPUP';
exports.updatePopupType = updatePopupType;
var cleanStackType = 'MIDDLEWARE/CLEAN_STACK';
exports.cleanStackType = cleanStackType;

var showPopup = function (name, payload) {
  return {
    type: showPopupType,
    name: name,
    payload: payload
  };
};

exports.showPopup = showPopup;

var hidePopup = function (name) {
  return {
    type: hidePopupType,
    name: name
  };
};

exports.hidePopup = hidePopup;

var updatePopup = function (name, payload) {
  return {
    type: updatePopupType,
    name: name,
    payload: payload
  };
};

exports.updatePopup = updatePopup;

var cleanStack = function () {
  return {
    type: cleanStackType
  };
};

exports.cleanStack = cleanStack;
var initialState = [];

var deepCopy = function (state) {
  return state.map(function (popup) {
    return _objectSpread({}, popup);
  });
};

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, showPopupType, function (state, action) {
  var newState = deepCopy(state);

  if (!newState.some(function (popup) {
    return popup.name === action.name;
  })) {
    newState.push({
      name: action.name,
      params: action.payload
    });
  }

  return newState;
}), _defineProperty(_ACTION_HANDLERS, hidePopupType, function (state, action) {
  var newState = deepCopy(state);
  newState = newState.filter(function (popupItem) {
    return popupItem.name !== action.name;
  });
  return newState;
}), _defineProperty(_ACTION_HANDLERS, updatePopupType, function (state, action) {
  var copyState = deepCopy(state);
  var newState = copyState.map(function (popup) {
    if (popup.name !== action.name) return popup;
    return _objectSpread({}, popup, {
      params: action.payload
    });
  });
  return newState;
}), _defineProperty(_ACTION_HANDLERS, cleanStackType, function (state, action) {
  return [];
}), _ACTION_HANDLERS);

var reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

var _default = reducer;
exports.default = _default;