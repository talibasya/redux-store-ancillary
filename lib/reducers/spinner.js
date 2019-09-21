"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.hideSpinner = exports.showSpinner = exports.hideSpinnerType = exports.showSpinnerType = void 0;

var _ACTION_HANDLERS;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var showSpinnerType = 'MIDDLEWARE/SHOW_SPINNER';
exports.showSpinnerType = showSpinnerType;
var hideSpinnerType = 'MIDDLEWARE/HIDE_SPINNER';
exports.hideSpinnerType = hideSpinnerType;

var showSpinner = function (payload) {
  return {
    type: showSpinnerType,
    payload: payload
  };
};

exports.showSpinner = showSpinner;

var hideSpinner = function (payload) {
  return {
    type: hideSpinnerType,
    payload: payload
  };
};

exports.hideSpinner = hideSpinner;
var initialState = {
  list: [],
  rendering: null
};

var deepCopy = function (state) {
  return _objectSpread({}, state, {
    list: _toConsumableArray(state.list)
  });
};

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, showSpinnerType, function (state, action) {
  var newState = deepCopy(state);

  if (action.payload && action.payload.id) {
    newState.list.push({
      params: action.payload,
      id: action.payload.id
    });
  } else {
    newState.rendering = {
      params: action.payload
    };
  }

  return newState;
}), _defineProperty(_ACTION_HANDLERS, hideSpinnerType, function (state, action) {
  var newState = deepCopy(state);

  if (action.payload && action.payload.id) {
    newState.list = newState.list.filter(function (spinnerItem) {
      return spinnerItem.id !== action.payload.id;
    });
  } else {
    newState.rendering = null;
  }

  return newState;
}), _ACTION_HANDLERS);

var reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

var _default = reducer;
exports.default = _default;