'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanStack = exports.updatePopup = exports.hidePopup = exports.showPopup = exports.cleanStackType = exports.updatePopupType = exports.hidePopupType = exports.showPopupType = exports.PopupProvider = undefined;

var _ACTION_HANDLERS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _PopupProvider2 = require('../providers/PopupProvider');

var _PopupProvider3 = _interopRequireDefault(_PopupProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.PopupProvider = _PopupProvider3.default;

// TODO: allow set from outside

var showPopupType = exports.showPopupType = 'MIDDLEWARE/SHOW_POPUP';
var hidePopupType = exports.hidePopupType = 'MIDDLEWARE/HIDE_POPUP';
var updatePopupType = exports.updatePopupType = 'MIDDLEWARE/UPDATE_POPUP';
var cleanStackType = exports.cleanStackType = 'MIDDLEWARE/CLEAN_STACK';

var showPopup = exports.showPopup = function (name, payload) {
  return {
    type: showPopupType,
    name: name, payload: payload
  };
};

var hidePopup = exports.hidePopup = function (name) {
  return {
    type: hidePopupType,
    name: name
  };
};

var updatePopup = exports.updatePopup = function (name, payload) {
  return {
    type: updatePopupType,
    name: name, payload: payload
  };
};

var cleanStack = exports.cleanStack = function () {
  return {
    type: cleanStackType
  };
};

var initialState = [];

var deepCopy = function (state) {
  return state.map(function (popup) {
    return _extends({}, popup);
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
    return _extends({}, popup, {
      params: action.payload
    });
  });

  return newState;
}), _defineProperty(_ACTION_HANDLERS, cleanStackType, function (state, action) {
  return [];
}), _ACTION_HANDLERS);

var reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;